import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminSession } from '@/lib/portal-auth';
import { getClientIP } from '@/lib/rate-limit/utils';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { verifyAdminPassword } from '@/lib/admin-config';
import { adminLoginSchema } from '@/lib/schemas';
import { withRateLimit } from '@/lib/security/rateLimit';

async function handleAdminPortalLogin(request: NextRequest) {
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

    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const { adminKey } = validation.data;

    // Verificar senha (banco ou env fallback)
    const isValid = await verifyAdminPassword(adminKey);

    if (!isValid) {
      logStructured('warn', 'Admin login: senha inválida', {
        requestId,
        action: AuditActions.ADMIN_LOGIN_FAILED,
        ipAddress: clientIP,
      });

      await auditLog({
        requestId,
        action: AuditActions.ADMIN_LOGIN_FAILED,
        ipAddress: clientIP,
        userAgent,
        success: false,
        errorMessage: 'Senha inválida',
      });

      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Senha inválida' },
          { status: 401 }
        ),
        requestId
      );
    }

    const token = await createAdminSession();
    const cookieStore = await cookies();

    cookieStore.set('ls_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    logStructured('info', 'Admin login: sucesso', {
      requestId,
      action: AuditActions.ADMIN_LOGIN_SUCCESS,
      ipAddress: clientIP,
    });

    await auditLog({
      requestId,
      action: AuditActions.ADMIN_LOGIN_SUCCESS,
      ipAddress: clientIP,
      userAgent,
      success: true,
    });

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin login: erro interno', {
      requestId,
      action: 'admin_login',
      error: error instanceof Error ? error.message : 'Unknown',
      ipAddress: clientIP,
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao fazer login' },
        { status: 500 }
      ),
      requestId
    );
  }
}

// Aplicar rate limiting: 30 tentativas por IP (60s), 5 tentativas por IP+AdminKey (60s)
export const POST = withRateLimit(handleAdminPortalLogin, {
  scope: 'login',
  ipLimit: 30,
  ipWindowMs: 60000, // 60s
  identityLimit: 5,
  identityWindowMs: 60000, // 60s
});
