import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { generateProtocol, generatePin, hashPin } from '@/lib/portal-auth';
import { createDefaultSteps } from '@/lib/portal-utils';
import { Decimal } from '@prisma/client/runtime/library';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { createProjectSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
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

    const body = await request.json().catch(() => null);
    if (!body) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const {
      clientName,
      clientEmail,
      clientPhone,
      serviceType,
      totalValue,
      entryValue,
    } = validation.data;

    const protocol = generateProtocol().toUpperCase().trim(); // Garantir maiúsculas
    const pin = generatePin();
    const pinHash = await hashPin(pin);

    // Log seguro (não expõe PIN)
    logStructured('info', 'Admin Create Project: protocol gerado', {
      requestId,
      protocol,
      // PIN não é logado por segurança
    });

    const project = await prisma.project.create({
      data: {
        protocol,
        pinHash,
        clientName,
        clientEmail,
        clientPhone,
        serviceType,
        totalValue: new Decimal(totalValue),
        entryValue: new Decimal(entryValue),
        paidValue: new Decimal(0),
        balanceValue: new Decimal(totalValue),
        status: 'TRIAGEM',
      },
    });

    // Criar steps padrão
    await createDefaultSteps(project.id);

    logStructured('info', 'Admin project create: sucesso', {
      requestId,
      action: AuditActions.ADMIN_PROJECT_CREATE,
      protocol: project.protocol,
    });

    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_PROJECT_CREATE,
      entityType: 'Project',
      entityId: project.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        clientName: project.clientName,
        serviceType: project.serviceType,
        totalValue: project.totalValue.toString(),
      },
      success: true,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        project: {
          id: project.id,
          protocol: project.protocol,
          pin, // Retornar PIN apenas na criação
        },
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin project create: erro', {
      requestId,
      action: AuditActions.ADMIN_PROJECT_CREATE,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao criar projeto' },
        { status: 500 }
      ),
      requestId
    );
  }
}
