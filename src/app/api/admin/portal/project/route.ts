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
      title,
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

    // Preparar dados para criação
    const projectData: any = {
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
    };

    // Adicionar title apenas se a migration foi aplicada
    // Se não foi aplicada, o erro será capturado e tratado
    if (title !== undefined) {
      projectData.title = title && title.trim() ? title.trim() : null;
    }

    let project;
    try {
      project = await prisma.project.create({
        data: projectData,
      });
    } catch (createError: any) {
      // Se o erro for relacionado ao campo title não existir, tentar criar sem ele
      const errorMessage = (createError?.message || '').toLowerCase();
      const errorCode = createError?.code || '';
      
      const isColumnNotFoundError = 
        errorCode === 'P2021' ||
        errorCode === '42703' ||
        errorCode === 'P2011' ||
        errorMessage.includes('unknown column') ||
        errorMessage.includes('column "title"') ||
        errorMessage.includes('column title') ||
        errorMessage.includes('does not exist') ||
        errorMessage.includes('column not found') ||
        errorMessage.includes('no such column') ||
        (errorMessage.includes('title') && 
         (errorMessage.includes('not found') || 
          errorMessage.includes('unknown')));
      
      if (isColumnNotFoundError && projectData.title !== undefined) {
        logStructured('warn', 'Admin Create Project: campo title não existe, criando sem title', {
          requestId,
          error: errorMessage,
          errorCode,
        });
        
        // Remover title e tentar criar novamente
        const { title: _, ...projectDataWithoutTitle } = projectData;
        project = await prisma.project.create({
          data: projectDataWithoutTitle,
        });
        
        // Retornar sucesso com aviso
        await createDefaultSteps(project.id);
        
        logStructured('info', 'Admin project create: sucesso (sem title)', {
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
            warning: 'Campo title não disponível - migration não aplicada',
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
            warning: 'Projeto criado com sucesso, mas o campo "title" não está disponível. Execute a migration primeiro para habilitar títulos.',
          }),
          requestId
        );
      }
      
      // Se não for erro de coluna não encontrada, propagar
      throw createError;
    }

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown';
    const errorCode = (error as any)?.code || 'N/A';
    
    logStructured('error', 'Admin project create: erro geral', {
      requestId,
      action: AuditActions.ADMIN_PROJECT_CREATE,
      error: errorMessage,
      errorCode,
      errorName: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack?.substring(0, 500) : undefined,
    });
    
    // Se o erro for relacionado ao campo title, retornar mensagem mais específica
    const errorMsgLower = errorMessage.toLowerCase();
    if (errorMsgLower.includes('title') || 
        errorMsgLower.includes('column') || 
        errorMsgLower.includes('migration') ||
        errorCode === '42703' || 
        errorCode === 'P2021') {
      return addRequestIdHeader(
        NextResponse.json(
          { 
            error: 'Campo "title" ainda não está disponível no banco de dados. Por favor, execute a migration primeiro.',
            hint: 'Execute: npm run db:migrate ou npx prisma migrate deploy'
          },
          { status: 400 }
        ),
        requestId
      );
    }

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao criar projeto' },
        { status: 500 }
      ),
      requestId
    );
  }
}
