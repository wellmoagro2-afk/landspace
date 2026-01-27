import { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { setAdminPassword, isFirstTimeSetup, hasAdminPassword, verifyAdminPassword } from '@/lib/admin-config';
import { getRequestId, logStructured } from '@/lib/observability';
import { auditLog } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { z } from 'zod';
import { jsonOk, jsonError } from '@/lib/api-response';

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

    return jsonOk(request, {
      isFirstTime,
      hasPassword,
    });
  } catch (error) {
    logStructured('error', 'Admin password check: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao verificar configuração',
    });
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
      return jsonError(request, {
        status: 400,
        code: 'invalid_input',
        message: 'Dados inválidos',
      });
    }

    const validation = passwordUpdateSchema.safeParse(body);
    if (!validation.success) {
      return jsonError(request, {
        status: 400,
        code: 'invalid_input',
        message: 'Dados inválidos',
      });
    }

    const { password, currentPassword } = validation.data;

    const isFirstTime = await isFirstTimeSetup();
    const isAdmin = await getAdminSession();

    // Se não é primeiro acesso, requer sessão admin E senha atual
    if (!isFirstTime) {
      if (!isAdmin) {
        return jsonError(request, {
          status: 401,
          code: 'unauthorized',
          message: 'Não autorizado. É necessário estar logado para alterar a senha.',
        });
      }

      if (!currentPassword) {
        return jsonError(request, {
          status: 400,
          code: 'invalid_input',
          message: 'Senha atual é obrigatória para alterar a senha',
        });
      }

      // Verificar senha atual
      const isValid = await verifyAdminPassword(currentPassword!);

      if (!isValid) {
        return jsonError(request, {
          status: 401,
          code: 'unauthorized',
          message: 'Senha atual incorreta',
        });
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

    return jsonOk(request, {
      success: true,
      message: isFirstTime 
        ? 'Senha configurada com sucesso. Você pode fazer login agora.' 
        : 'Senha alterada com sucesso.',
    });
  } catch (error) {
    logStructured('error', 'Admin password set: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao configurar senha',
    });
  }
}
