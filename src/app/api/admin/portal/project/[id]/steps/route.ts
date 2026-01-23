import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateStepSchema = z.object({
  stepId: z.string().min(1, 'stepId é obrigatório'),
  state: z.enum(['PENDING', 'ACTIVE', 'DONE']),
  startedAt: z.string().datetime().nullable().optional(),
  finishedAt: z.string().datetime().nullable().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    const validation = updateStepSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    const { stepId, state, startedAt, finishedAt } = validation.data;

    const updateData: any = {
      state,
    };

    if (state === 'ACTIVE' && !startedAt) {
      updateData.startedAt = new Date();
    }

    if (state === 'DONE' && !finishedAt) {
      updateData.finishedAt = new Date();
    }

    if (startedAt) updateData.startedAt = new Date(startedAt);
    if (finishedAt) updateData.finishedAt = new Date(finishedAt);

    const step = await prisma.projectStep.update({
      where: { id: stepId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      step,
    });
  } catch (error) {
    console.error('[Admin Update Step] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar step' },
      { status: 500 }
    );
  }
}
