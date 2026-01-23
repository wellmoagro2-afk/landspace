import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { FileKind } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import { join, resolve, normalize } from 'path';
import { validateFileExtension, validateFileSize, generateSafeFilename } from '@/lib/upload-validation';
import { scanFile } from '@/lib/virus-scan';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { uploadFileSchema } from '@/lib/schemas';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const rawKind = formData.get('kind') as string | null;
    const rawVersion = formData.get('version') as string | null;

    if (!file || !rawKind) {
      return NextResponse.json(
        { error: 'invalid_input' },
        { status: 400 }
      );
    }

    // Validar kind e version com Zod
    const validation = uploadFileSchema.safeParse({ 
      kind: rawKind, 
      version: rawVersion || 'v1' 
    });
    if (!validation.success) {
      return NextResponse.json(
        { error: 'invalid_input' },
        { status: 400 }
      );
    }

    const { kind, version } = validation.data;

    // Validar extensão
    const extensionCheck = validateFileExtension(file.name);
    if (!extensionCheck.valid) {
      console.warn(`[Upload] Extensão bloqueada: ${extensionCheck.extension} (${file.name})`);
      return NextResponse.json(
        { error: `Tipo de arquivo não permitido: ${extensionCheck.extension || 'sem extensão'}` },
        { status: 400 }
      );
    }

    // Validar tamanho
    if (!validateFileSize(file.size)) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 100 MB' },
        { status: 400 }
      );
    }

    // Buscar projeto por ID ou protocol
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          { protocol: id },
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

    // Criar diretório de uploads se não existir
    const uploadsBaseDir = resolve(process.cwd(), 'uploads', 'portal');
    const projectDir = join(uploadsBaseDir, project.protocol);
    await mkdir(projectDir, { recursive: true });

    // Gerar nome seguro (prevenir path traversal)
    const safeFilename = generateSafeFilename(file.name, version, kind);
    const storagePath = join('uploads', 'portal', project.protocol, safeFilename);
    const fullPath = resolve(process.cwd(), storagePath);

    // Validar que o caminho está dentro do diretório permitido (prevenir path traversal)
    if (!fullPath.startsWith(uploadsBaseDir)) {
      console.error(`[Upload] Tentativa de path traversal detectada: ${fullPath}`);
      return NextResponse.json(
        { error: 'Caminho inválido' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Salvar temporariamente para scan
    const tempPath = join(projectDir, `temp_${Date.now()}_${safeFilename}`);
    await writeFile(tempPath, buffer);

    // Scan de vírus (opcional) - antes de mover para local final
    const scanResult = await scanFile(tempPath);
    if (!scanResult.clean) {
      // Limpar arquivo temporário
      try {
        const { unlink } = await import('fs/promises');
        await unlink(tempPath);
      } catch {}

      logStructured('error', 'Admin file upload: vírus detectado', {
        requestId,
        action: AuditActions.ADMIN_FILE_UPLOAD,
        protocol: project.protocol,
        filename: file.name,
        virus: scanResult.virus,
      });

      await auditLog({
        requestId,
        protocol: project.protocol,
        action: AuditActions.ADMIN_FILE_UPLOAD,
        entityType: 'ProjectFile',
        ipAddress: clientIP,
        userAgent,
        success: false,
        errorMessage: `Vírus detectado: ${scanResult.virus}`,
        metadata: { filename: file.name, kind },
      });

      return addRequestIdHeader(
        NextResponse.json(
          { error: `Arquivo infectado detectado: ${scanResult.virus}` },
          { status: 400 }
        ),
        requestId
      );
    }

    // Mover arquivo temporário para local final
    const { rename } = await import('fs/promises');
    await rename(tempPath, fullPath);

    // Determinar se arquivo FINAL está bloqueado
    const hasBalance = project.balanceValue.gt(0);
    const isLocked = kind === FileKind.FINAL && (hasBalance || !project.finalRelease);

    // Salvar no banco usando o ID real do projeto
    const projectFile = await prisma.projectFile.create({
      data: {
        projectId: project.id, // Usar o ID real do projeto
        kind,
        filename: file.name, // Nome original para exibição
        storagePath,
        version,
        isLocked,
      },
    });

    // Log e auditoria de upload
    logStructured('info', 'Admin file upload: sucesso', {
      requestId,
      action: AuditActions.ADMIN_FILE_UPLOAD,
      protocol: project.protocol,
      fileId: projectFile.id,
      filename: file.name,
      kind,
    });

    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_FILE_UPLOAD,
      entityType: 'ProjectFile',
      entityId: projectFile.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        filename: file.name,
        kind,
        version,
        size: file.size,
      },
      success: true,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        file: {
          ...projectFile,
          storagePath: undefined, // Nunca expor storagePath
        },
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin file upload: erro interno', {
      requestId,
      action: AuditActions.ADMIN_FILE_UPLOAD,
      error: error instanceof Error ? error.message : 'Unknown',
      ipAddress: clientIP,
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao fazer upload' },
        { status: 500 }
      ),
      requestId
    );
  }
}
