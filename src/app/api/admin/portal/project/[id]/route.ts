import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, generatePin, hashPin } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { recalculateProjectBalance } from '@/lib/portal-utils';
import { Decimal } from '@prisma/client/runtime/library';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { updateProjectSchema } from '@/lib/schemas';

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
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        ),
        requestId
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

    const validation = updateProjectSchema.safeParse(body);
    if (!validation.success) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const validatedData = validation.data;
    const updateData: any = {};

    if (validatedData.clientName) updateData.clientName = validatedData.clientName;
    if (validatedData.clientEmail !== undefined) updateData.clientEmail = validatedData.clientEmail || null;
    if (validatedData.clientPhone !== undefined) updateData.clientPhone = validatedData.clientPhone || null;
    if (validatedData.serviceType) updateData.serviceType = validatedData.serviceType;
    if (validatedData.status) updateData.status = validatedData.status;
    if (validatedData.totalValue !== undefined) updateData.totalValue = new Decimal(validatedData.totalValue);
    if (validatedData.entryValue !== undefined) updateData.entryValue = new Decimal(validatedData.entryValue);
    if (validatedData.finalRelease !== undefined) {
      updateData.finalRelease = validatedData.finalRelease;
    }

    // Buscar projeto primeiro
    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          { protocol: id },
        ],
      },
    });

    if (!existingProject) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Projeto não encontrado' },
          { status: 404 }
        ),
        requestId
      );
    }

    // Log de liberação final antes de atualizar
    if (body.finalRelease !== undefined && body.finalRelease === true) {
      await auditLog({
        requestId,
        protocol: existingProject.protocol,
        action: AuditActions.ADMIN_FINAL_RELEASE,
        entityType: 'Project',
        entityId: existingProject.id,
        ipAddress: clientIP,
        userAgent,
        metadata: {
          previousStatus: existingProject.status,
          balanceValue: existingProject.balanceValue.toString(),
        },
        success: true,
      });
    }

    const project = await prisma.project.update({
      where: { id: existingProject.id },
      data: updateData,
    });

    // Recalcular balance se valores financeiros mudaram
    if (validatedData.totalValue !== undefined || validatedData.entryValue !== undefined) {
      await recalculateProjectBalance(project.id);
    }

    // Registrar auditoria de atualização
    if (Object.keys(updateData).length > 0) {
      await auditLog({
        requestId,
        protocol: existingProject.protocol,
        action: AuditActions.ADMIN_PROJECT_UPDATE,
        entityType: 'Project',
        entityId: existingProject.id,
        ipAddress: clientIP,
        userAgent,
        metadata: {
          updatedFields: Object.keys(updateData),
        },
        success: true,
      });
    }

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        project,
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin Update Project: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });
    
    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao atualizar projeto' },
        { status: 500 }
      ),
      requestId
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = getRequestId(request);
  
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

    const { id } = await params;

    // Buscar por ID ou protocol
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          { protocol: id },
        ],
      },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
        files: {
          orderBy: { uploadedAt: 'desc' },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
        },
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

    // Serializar Decimal para number
    return addRequestIdHeader(
      NextResponse.json({ 
        project: {
          ...project,
          totalValue: parseFloat(project.totalValue.toString()),
          entryValue: parseFloat(project.entryValue.toString()),
          paidValue: parseFloat(project.paidValue.toString()),
          balanceValue: parseFloat(project.balanceValue.toString()),
          payments: project.payments.map(p => ({
            ...p,
            amount: parseFloat(p.amount.toString()),
          })),
        }
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin Get Project: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });
    
    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao buscar projeto' },
        { status: 500 }
      ),
      requestId
    );
  }
}

// Reset PIN
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    if (body.action === 'reset-pin') {
      const pin = generatePin();
      const pinHash = await hashPin(pin);

      const existingProject = await prisma.project.findFirst({
        where: {
          OR: [
            { id },
            { protocol: id },
          ],
        },
      });

      if (!existingProject) {
        return NextResponse.json(
          { error: 'Projeto não encontrado' },
          { status: 404 }
        );
      }

      await prisma.project.update({
        where: { id: existingProject.id },
        data: { pinHash },
      });

      const requestId = getRequestId(request);
      const clientIP = getClientIP(request);
      const userAgent = request.headers.get('user-agent') || undefined;

      logStructured('info', 'Admin PIN reset: sucesso', {
        requestId,
        action: AuditActions.ADMIN_PIN_RESET,
        protocol: existingProject.protocol,
      });

      await auditLog({
        requestId,
        protocol: existingProject.protocol,
        action: AuditActions.ADMIN_PIN_RESET,
        entityType: 'Project',
        entityId: existingProject.id,
        ipAddress: clientIP,
        userAgent,
        success: true,
      });

      return NextResponse.json({
        success: true,
        pin, // Retornar novo PIN apenas no reset
      });
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Admin Reset PIN] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao resetar PIN' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir projeto
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
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        ),
        requestId
      );
    }

    const { id } = await params;

    // Buscar projeto por ID ou protocol
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          { protocol: id },
        ],
      },
      include: {
        files: true,
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

    // Registrar auditoria antes de excluir
    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_PROJECT_DELETE,
      entityType: 'Project',
      entityId: project.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        clientName: project.clientName,
        protocol: project.protocol,
      },
      success: true,
    });

    // Excluir arquivos físicos
    const { unlink, rmdir } = await import('fs/promises');
    const { resolve, join } = await import('path');
    
    for (const file of project.files) {
      try {
        const filePath = resolve(process.cwd(), file.storagePath);
        await unlink(filePath);
      } catch (err) {
        // Ignorar erros de arquivo não encontrado
        logStructured('warn', 'Admin delete project: arquivo não encontrado', {
          requestId,
          filePath: file.storagePath,
        });
      }
    }

    // Tentar remover diretório do projeto (se estiver vazio)
    try {
      const projectDir = resolve(process.cwd(), 'uploads', 'portal', project.protocol);
      await rmdir(projectDir);
    } catch (err) {
      // Ignorar se diretório não estiver vazio ou não existir
    }

    // Excluir projeto (cascata excluirá steps, payments, files)
    await prisma.project.delete({
      where: { id: project.id },
    });

    logStructured('info', 'Admin delete project: sucesso', {
      requestId,
      protocol: project.protocol,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        message: 'Projeto excluído com sucesso',
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin delete project: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao excluir projeto' },
        { status: 500 }
      ),
      requestId
    );
  }
}
