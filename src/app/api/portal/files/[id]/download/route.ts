import { NextRequest, NextResponse } from 'next/server';
import { getPortalSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { canDownloadPreview, canDownloadFinal } from '@/lib/portal-utils';
import { createReadStream } from 'fs';
import { join, resolve, normalize } from 'path';
import { stat } from 'fs/promises';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const session = await getPortalSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const file = await prisma.projectFile.findUnique({
      where: { id },
      include: {
        project: {
          include: {
            steps: {
              select: {
                stepKey: true,
                state: true,
              },
            },
          },
        },
      },
    });

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se o protocolo corresponde
    if (file.project.protocol !== session.protocol) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      );
    }

    // Verificar permissões de download
    // IMPORTANTE: Não há mais arquivos PREVIEW - todos são FINAL agora
    // Passar steps para verificar se estão concluídos antes de liberar
    if (file.kind === 'FINAL') {
      if (!canDownloadFinal(file.project, file.project.steps) || file.isLocked) {
        await auditLog({
          requestId,
          protocol: session.protocol,
          action: AuditActions.PORTAL_FILE_DOWNLOAD_BLOCKED,
          entityType: 'ProjectFile',
          entityId: file.id,
          ipAddress: clientIP,
          userAgent,
          success: false,
          errorMessage: 'Saldo pendente, arquivo bloqueado ou step Final Pronto não concluído',
          metadata: { kind: 'FINAL' },
        });

        return addRequestIdHeader(
          NextResponse.json(
            { error: 'Download não autorizado. Saldo pendente, arquivo bloqueado ou step não concluído (Final Pronto ou Revisão).' },
            { status: 403 }
          ),
          requestId
        );
      }
    }

    // Servir arquivo via streaming (nunca expor storagePath)
    // Validar path traversal
    const uploadsBaseDir = resolve(process.cwd(), 'uploads', 'portal');
    const filePath = resolve(process.cwd(), file.storagePath);

    // Validar que o arquivo está dentro do diretório permitido
    if (!filePath.startsWith(uploadsBaseDir)) {
      console.error(`[Download] Tentativa de path traversal: ${filePath}`);
      return NextResponse.json(
        { error: 'Caminho inválido' },
        { status: 400 }
      );
    }

    // Validar que o arquivo pertence ao protocolo correto
    const expectedPath = resolve(uploadsBaseDir, session.protocol);
    if (!filePath.startsWith(expectedPath)) {
      console.warn(`[Download] Tentativa de acesso a arquivo de outro projeto: ${filePath} (protocol: ${session.protocol})`);
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      );
    }

    try {
      // Verificar se arquivo existe
      await stat(filePath);
      
      const fileExtension = file.filename.split('.').pop()?.toLowerCase();
      const contentType = {
        pdf: 'application/pdf',
        zip: 'application/zip',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        geojson: 'application/geo+json',
        shp: 'application/octet-stream',
      }[fileExtension || ''] || 'application/octet-stream';

      // Filename seguro para Content-Disposition
      const safeFilename = file.filename.replace(/[^a-zA-Z0-9._-]/g, '_');

      // Stream do arquivo
      const fileStream = createReadStream(filePath);

      // Log e auditoria de download
      logStructured('info', 'Portal file download', {
        requestId,
        action: AuditActions.PORTAL_FILE_DOWNLOAD,
        protocol: session.protocol,
        fileId: file.id,
        fileKind: file.kind,
        filename: file.filename,
      });

      await auditLog({
        requestId,
        protocol: session.protocol,
        action: AuditActions.PORTAL_FILE_DOWNLOAD,
        entityType: 'ProjectFile',
        entityId: file.id,
        ipAddress: clientIP,
        userAgent,
        metadata: {
          filename: file.filename,
          kind: file.kind,
          version: file.version,
        },
        success: true,
      });
      
      return addRequestIdHeader(
        new NextResponse(fileStream as any, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }),
      requestId
      );
    } catch (fileError) {
      logStructured('error', 'Portal file download: arquivo não encontrado', {
        requestId,
        action: 'portal_file_download',
        fileId: id,
        error: fileError instanceof Error ? fileError.message : 'Unknown',
      });

      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Arquivo não encontrado no servidor' },
          { status: 404 }
        ),
        requestId
      );
    }
  } catch (error) {
    logStructured('error', 'Portal file download: erro interno', {
      requestId,
      action: 'portal_file_download',
      error: error instanceof Error ? error.message : 'Unknown',
      ipAddress: clientIP,
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao fazer download' },
        { status: 500 }
      ),
      requestId
    );
  }
}
