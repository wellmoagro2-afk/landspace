import { NextRequest, NextResponse } from 'next/server';
import { getPortalSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { canDownloadPreview, canDownloadFinal } from '@/lib/portal-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ protocol: string }> }
) {
  const { protocol } = await params;
  try {
    const session = await getPortalSession();

    if (!session || session.protocol !== protocol) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { protocol },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    const files = await prisma.projectFile.findMany({
      where: { projectId: project.id },
      orderBy: { uploadedAt: 'desc' },
    });

    const canPreview = canDownloadPreview(project);
    const canFinal = canDownloadFinal(project);

    const previewFiles = files.filter((f) => f.kind === 'PREVIEW' && canPreview);
    const finalFiles = files.filter((f) => f.kind === 'FINAL' && canFinal && !f.isLocked);

    // Nunca expor storagePath no front
    return NextResponse.json({
      preview: {
        canDownload: canPreview,
        files: previewFiles.map(f => ({
          id: f.id,
          kind: f.kind,
          filename: f.filename,
          version: f.version,
          uploadedAt: f.uploadedAt,
          // storagePath nunca exposto
        })),
      },
      final: {
        canDownload: canFinal,
        files: finalFiles.map(f => ({
          id: f.id,
          kind: f.kind,
          filename: f.filename,
          version: f.version,
          uploadedAt: f.uploadedAt,
          // storagePath nunca exposto
        })),
      },
    });
  } catch (error) {
    console.error('[Portal Files] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar arquivos' },
      { status: 500 }
    );
  }
}
