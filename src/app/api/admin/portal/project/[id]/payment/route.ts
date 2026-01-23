import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { recalculateProjectBalance } from '@/lib/portal-utils';
import { Decimal } from '@prisma/client/runtime/library';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { createPaymentSchema } from '@/lib/schemas';

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
    const body = await request.json().catch(() => null);
    if (!body) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const validation = createPaymentSchema.safeParse(body);
    if (!validation.success) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const { method, amount, status, note } = validation.data;

    // Buscar projeto por ID ou protocol antes de criar pagamento
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

    const payment = await prisma.payment.create({
      data: {
        projectId: project.id, // Usar o ID real do projeto
        method,
        amount: new Decimal(amount),
        status,
        note,
        confirmedAt: status === 'CONFIRMED' ? new Date() : null,
      },
    });

    // Recalcular valores do projeto usando o ID real
    await recalculateProjectBalance(project.id);

    // Registrar auditoria (project já foi buscado acima)
    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_PAYMENT_CREATE,
      entityType: 'Payment',
      entityId: payment.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        method: payment.method,
        amount: payment.amount.toString(),
        status: payment.status,
      },
      success: true,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        payment: {
          ...payment,
          amount: parseFloat(payment.amount.toString()),
        },
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin payment create: erro', {
      requestId,
      action: AuditActions.ADMIN_PAYMENT_CREATE,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao registrar pagamento' },
        { status: 500 }
      ),
      requestId
    );
  }
}
