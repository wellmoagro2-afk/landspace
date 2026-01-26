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
      include: {
        steps: {
          select: {
            stepKey: true,
            state: true,
          },
        },
      },
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

    // Passar steps para verificar se estão concluídos antes de liberar arquivos
    // IMPORTANTE: Não há mais arquivos PREVIEW - todos são FINAL agora
    const canFinal = canDownloadFinal(project, project.steps);

    // IMPORTANTE: Mostrar TODOS os arquivos para o cliente (liberados ou bloqueados)
    // O cliente vê todos os arquivos, mas só pode baixar os que estão liberados
    // Não filtrar por isLocked - mostrar todos os arquivos FINAL
    const allFiles = files.filter((f) => f.kind === 'FINAL');

    // Nunca expor storagePath no front
    return NextResponse.json({
      preview: {
        canDownload: false, // Não há mais preview
        files: [], // Sempre vazio
      },
      final: {
        canDownload: canFinal,
        // Mostrar TODOS os arquivos (liberados ou bloqueados)
        // O frontend controla se o botão de download está habilitado baseado em canDownload
        files: allFiles.map(f => ({
          id: f.id,
          kind: f.kind,
          filename: f.filename,
          version: f.version, // Nome do projeto (ex: Projeto Final, Projeto Final R1, etc)
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
