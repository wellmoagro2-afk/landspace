import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { recalculateProjectBalance } from '@/lib/portal-utils';
import { Decimal } from '@prisma/client/runtime/library';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { createPaymentSchema, updatePaymentSchema } from '@/lib/schemas';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

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

/**
 * Atualizar pagamento existente
 */
export async function PATCH(
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

    // Extrair paymentId do body
    const { paymentId, ...updateData } = body;
    if (!paymentId) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'paymentId é obrigatório' }, { status: 400 }),
        requestId
      );
    }

    const validation = updatePaymentSchema.safeParse(updateData);
    if (!validation.success) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    // Buscar projeto e pagamento
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

    const existingPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        projectId: project.id,
      },
    });

    if (!existingPayment) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Pagamento não encontrado' },
          { status: 404 }
        ),
        requestId
      );
    }

    // Preparar dados de atualização
    const updatePayload: {
      method?: PaymentMethod;
      amount?: Decimal;
      note?: string | null;
      status?: PaymentStatus;
      confirmedAt?: Date | null;
    } = {};
    if (validation.data.method && (validation.data.method === 'PIX' || validation.data.method === 'BOLETO' || validation.data.method === 'CARTAO' || validation.data.method === 'AJUSTE')) {
      updatePayload.method = validation.data.method as PaymentMethod;
    }
    if (validation.data.amount !== undefined) updatePayload.amount = new Decimal(validation.data.amount);
    if (validation.data.note !== undefined) updatePayload.note = validation.data.note || null;
    if (validation.data.status && (validation.data.status === 'PENDING' || validation.data.status === 'CONFIRMED' || validation.data.status === 'CANCELED')) {
      updatePayload.status = validation.data.status as PaymentStatus;
      updatePayload.confirmedAt = validation.data.status === 'CONFIRMED' ? new Date() : null;
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: updatePayload,
    });

    // Recalcular valores do projeto
    await recalculateProjectBalance(project.id);

    // Registrar auditoria
    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_PAYMENT_UPDATE,
      entityType: 'Payment',
      entityId: updatedPayment.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        method: updatedPayment.method,
        amount: updatedPayment.amount.toString(),
        status: updatedPayment.status,
        previousAmount: existingPayment.amount.toString(),
        previousStatus: existingPayment.status,
      },
      success: true,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        payment: {
          ...updatedPayment,
          amount: parseFloat(updatedPayment.amount.toString()),
        },
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin payment update: erro', {
      requestId,
      action: AuditActions.ADMIN_PAYMENT_UPDATE,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao atualizar pagamento' },
        { status: 500 }
      ),
      requestId
    );
  }
}

/**
 * Excluir pagamento
 */
export async function DELETE(
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
    const searchParams = request.nextUrl.searchParams;
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'paymentId é obrigatório' }, { status: 400 }),
        requestId
      );
    }

    // Buscar projeto e pagamento
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

    const existingPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        projectId: project.id,
      },
    });

    if (!existingPayment) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Pagamento não encontrado' },
          { status: 404 }
        ),
        requestId
      );
    }

    // Registrar auditoria ANTES de excluir
    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_PAYMENT_DELETE,
      entityType: 'Payment',
      entityId: existingPayment.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        method: existingPayment.method,
        amount: existingPayment.amount.toString(),
        status: existingPayment.status,
      },
      success: true,
    });

    // Excluir pagamento
    await prisma.payment.delete({
      where: { id: paymentId },
    });

    // Recalcular valores do projeto
    await recalculateProjectBalance(project.id);

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin payment delete: erro', {
      requestId,
      action: AuditActions.ADMIN_PAYMENT_DELETE,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao excluir pagamento' },
        { status: 500 }
      ),
      requestId
    );
  }
}
