import { NextRequest, NextResponse } from 'next/server';
import { getPortalSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';

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

    const steps = await prisma.projectStep.findMany({
      where: { projectId: project.id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ steps });
  } catch (error) {
    console.error('[Portal Steps] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar steps' },
      { status: 500 }
    );
  }
}
