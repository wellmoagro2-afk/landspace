import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { setAdminPassword, isFirstTimeSetup, hasAdminPassword, verifyAdminPassword } from '@/lib/admin-config';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { z } from 'zod';

const passwordUpdateSchema = z.object({
  password: z.string().min(24, 'Senha deve ter no mínimo 24 caracteres'),
  currentPassword: z.string().optional(),
});

/**
 * GET - Verificar se senha está configurada (para primeiro acesso)
 */
export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const isFirstTime = await isFirstTimeSetup();
    const hasPassword = await hasAdminPassword();

    return addRequestIdHeader(
      NextResponse.json({
        isFirstTime,
        hasPassword,
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin password check: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao verificar configuração' },
        { status: 500 }
      ),
      requestId
    );
  }
}

/**
 * POST - Definir/atualizar senha admin
 * Requer sessão admin OU primeiro acesso (sem senha configurada)
 */
export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const validation = passwordUpdateSchema.safeParse(body);
    if (!validation.success) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const { password, currentPassword } = validation.data;

    const isFirstTime = await isFirstTimeSetup();
    const isAdmin = await getAdminSession();

    // Se não é primeiro acesso, requer sessão admin E senha atual
    if (!isFirstTime) {
      if (!isAdmin) {
        return addRequestIdHeader(
          NextResponse.json(
            { error: 'Não autorizado. É necessário estar logado para alterar a senha.' },
            { status: 401 }
          ),
          requestId
        );
      }

      if (!currentPassword) {
        return addRequestIdHeader(
          NextResponse.json(
            { error: 'Senha atual é obrigatória para alterar a senha' },
            { status: 400 }
          ),
          requestId
        );
      }

      // Verificar senha atual
      const isValid = await verifyAdminPassword(currentPassword!);

      if (!isValid) {
        return addRequestIdHeader(
          NextResponse.json(
            { error: 'Senha atual incorreta' },
            { status: 401 }
          ),
          requestId
        );
      }
    }

    // Definir nova senha
    await setAdminPassword(password, `IP: ${clientIP}`);

    logStructured('info', 'Admin password: atualizada', {
      requestId,
      action: 'admin_password_set',
      isFirstTime,
      ipAddress: clientIP,
    });

    await auditLog({
      requestId,
      action: 'admin_password_set',
      ipAddress: clientIP,
      userAgent,
      metadata: {
        isFirstTime,
      },
      success: true,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        message: isFirstTime 
          ? 'Senha configurada com sucesso. Você pode fazer login agora.' 
          : 'Senha alterada com sucesso.',
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin password set: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao configurar senha' },
        { status: 500 }
      ),
      requestId
    );
  }
}
