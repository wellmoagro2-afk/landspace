import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { loginPortal, createPortalSession } from '@/lib/portal-auth';
import { getClientIP } from '@/lib/rate-limit/utils';
import { getRequestId, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { portalLoginSchema } from '@/lib/schemas';
import { withRateLimit } from '@/lib/security/rateLimit';
import { jsonOk, jsonError } from '@/lib/api-response';

async function handlePortalLogin(request: NextRequest) {
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

    const validation = portalLoginSchema.safeParse(body);
    if (!validation.success) {
      logStructured('warn', 'Portal login: validação falhou', {
        requestId,
        action: 'portal_login',
        ipAddress: clientIP,
        issues: validation.error.issues.map(issue => ({
          path: issue.path,
          code: issue.code,
          message: issue.message,
        })),
      });
      return jsonError(request, {
        status: 400,
        code: 'invalid_input',
        message: 'Dados inválidos',
      });
    }

    const { protocol, pin } = validation.data;

    // Log seguro (sem expor PIN)
    logStructured('info', 'Portal login: tentativa', {
      requestId,
      protocol,
      ipAddress: clientIP,
      // PIN não é logado por segurança
    });

    const loginResult = await loginPortal(protocol, pin);

    // Log seguro (sem expor dados sensíveis)
    logStructured(
      loginResult.success ? 'info' : 'warn',
      `Portal login: ${loginResult.success ? 'sucesso' : 'falha'}`,
      {
        requestId,
        success: loginResult.success,
        error: loginResult.error,
        protocol: loginResult.projectProtocol,
      }
    );

    if (!loginResult.success) {
      let errorMessage = 'Erro ao fazer login';
      
      if (loginResult.error === 'PROTOCOL_NOT_FOUND') {
        errorMessage = 'Protocolo não encontrado. Verifique se o protocolo está correto.';
      } else if (loginResult.error === 'INVALID_PIN') {
        errorMessage = 'PIN incorreto. Verifique se o PIN está correto.';
      } else {
        errorMessage = 'Erro ao fazer login. Tente novamente.';
      }

      logStructured('warn', 'Portal login: credenciais inválidas', {
        requestId,
        action: AuditActions.PORTAL_LOGIN_FAILED,
        protocol,
        errorType: loginResult.error,
        ipAddress: clientIP,
      });

      await auditLog({
        requestId,
        protocol,
        action: AuditActions.PORTAL_LOGIN_FAILED,
        ipAddress: clientIP,
        userAgent,
        success: false,
        errorMessage,
        metadata: {
          errorType: loginResult.error,
        },
      });

      return jsonError(request, {
        status: 401,
        code: 'unauthorized',
        message: errorMessage,
        details: {
          errorType: loginResult.error, // Para o frontend saber qual campo está errado
        },
      });
    }

    // Usar o protocol do resultado (pode ser diferente se foi encontrado por case-insensitive)
    const finalProtocol = loginResult.projectProtocol || protocol;

    logStructured('info', 'Portal login: sucesso', {
      requestId,
      action: AuditActions.PORTAL_LOGIN_SUCCESS,
      protocol: finalProtocol,
      ipAddress: clientIP,
    });

    await auditLog({
      requestId,
      protocol: finalProtocol,
      action: AuditActions.PORTAL_LOGIN_SUCCESS,
      ipAddress: clientIP,
      userAgent,
      success: true,
    });

    const token = await createPortalSession(finalProtocol);
    const cookieStore = await cookies();

    cookieStore.set('ls_portal_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    return jsonOk(request, {
      success: true,
      protocol: finalProtocol,
    });
  } catch (error) {
    logStructured('error', 'Portal login: erro interno', {
      requestId,
      action: 'portal_login',
      error: error instanceof Error ? error.message : 'Unknown error',
      ipAddress: clientIP,
    });

    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao fazer login',
    });
  }
}

// Aplicar rate limiting: 30 tentativas por IP (60s), 5 tentativas por IP+Protocol (60s)
export const POST = withRateLimit(handlePortalLogin, {
  scope: 'login',
  ipLimit: 30,
  ipWindowMs: 60000, // 60s
  identityLimit: 5,
  identityWindowMs: 60000, // 60s
});
