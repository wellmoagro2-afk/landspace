import { NextRequest, NextResponse } from 'next/server';
import { getPortalSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { getProjectProgress } from '@/lib/portal-utils';

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
          orderBy: { order: 'asc' },
        },
        payments: {
          where: {
            status: 'CONFIRMED',
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    const progress = await getProjectProgress(project.id);

    // Serializar Decimal para number (fixo 2 casas)
    return NextResponse.json({
      project: {
        id: project.id,
        protocol: project.protocol,
        clientName: project.clientName,
        clientEmail: project.clientEmail,
        clientPhone: project.clientPhone,
        serviceType: project.serviceType,
        status: project.status,
        totalValue: parseFloat(project.totalValue.toString()),
        entryValue: parseFloat(project.entryValue.toString()),
        paidValue: parseFloat(project.paidValue.toString()),
        balanceValue: parseFloat(project.balanceValue.toString()),
        finalRelease: project.finalRelease,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        progress,
      },
      steps: project.steps,
      payments: project.payments.map(p => ({
        ...p,
        amount: parseFloat(p.amount.toString()),
      })),
    });
  } catch (error) {
    console.error('[Portal Project] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projeto' },
      { status: 500 }
    );
  }
}
