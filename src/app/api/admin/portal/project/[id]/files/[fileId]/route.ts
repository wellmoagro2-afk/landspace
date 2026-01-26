import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { resolve } from 'path';
import { unlink } from 'fs/promises';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';

/**
 * DELETE - Excluir arquivo do projeto
 * 
 * Segurança:
 * - Requer autenticação admin
 * - Valida que o arquivo pertence ao projeto
 * - Remove arquivo físico do sistema de arquivos
 * - Registra auditoria da exclusão
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; fileId: string }> }
) {
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        ),
        requestId
      );
    }

    const { id: projectIdOrProtocol, fileId } = await params;

    // Buscar arquivo com projeto associado
    const file = await prisma.projectFile.findUnique({
      where: { id: fileId },
      include: {
        project: true,
      },
    });

    if (!file) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Arquivo não encontrado' },
          { status: 404 }
        ),
        requestId
      );
    }

    // Buscar projeto por ID ou protocol para validar
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id: projectIdOrProtocol },
          { protocol: projectIdOrProtocol },
        ],
      },
    });

    if (!project) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Projeto não encontrado' },
          { status: 404 }
        ),
        requestId
      );
    }

    // Validar que o arquivo pertence ao projeto
    if (file.projectId !== project.id) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Arquivo não pertence a este projeto' },
          { status: 403 }
        ),
        requestId
      );
    }

    // Registrar auditoria antes de excluir
    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_FILE_DELETE,
      entityType: 'ProjectFile',
      entityId: file.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        filename: file.filename,
        kind: file.kind,
        version: file.version,
        projectProtocol: project.protocol,
      },
      success: true,
    });

    // Excluir arquivo físico do sistema de arquivos
    try {
      const filePath = resolve(process.cwd(), file.storagePath);
      const uploadsBaseDir = resolve(process.cwd(), 'uploads', 'portal');
      
      // Validar que o arquivo está dentro do diretório permitido (prevenir path traversal)
      if (!filePath.startsWith(uploadsBaseDir)) {
        logStructured('warn', 'Admin file delete: caminho inválido', {
          requestId,
          filePath: file.storagePath,
          protocol: project.protocol,
        });
      } else {
        await unlink(filePath);
        logStructured('info', 'Admin file delete: arquivo físico removido', {
          requestId,
          filePath: file.storagePath,
          protocol: project.protocol,
        });
      }
    } catch (fileError) {
      // Logar mas não bloquear exclusão do registro no banco
      logStructured('warn', 'Admin file delete: erro ao remover arquivo físico', {
        requestId,
        filePath: file.storagePath,
        protocol: project.protocol,
        error: fileError instanceof Error ? fileError.message : 'Unknown',
      });
    }

    // Excluir registro do banco de dados
    await prisma.projectFile.delete({
      where: { id: fileId },
    });

    logStructured('info', 'Admin file delete: sucesso', {
      requestId,
      protocol: project.protocol,
      fileId: file.id,
      filename: file.filename,
      kind: file.kind,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        message: 'Arquivo excluído com sucesso',
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin file delete: erro interno', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
      ipAddress: clientIP,
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao excluir arquivo' },
        { status: 500 }
      ),
      requestId
    );
  }
}
