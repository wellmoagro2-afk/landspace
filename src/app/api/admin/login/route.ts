import { NextRequest, NextResponse } from 'next/server';
import { createAdminJwtSession } from '@/lib/auth';
import { logSafe } from '@/lib/logger';
import { withRateLimit } from '@/lib/security/rateLimit';
import { randomUUID } from 'crypto';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { isProduction } from '@/lib/env';
import { setNoStore } from '@/lib/http/request-id';

// Forçar runtime Node.js para garantir acesso a process.env
export const runtime = 'nodejs';

/**
 * Comparação em tempo constante (mitiga timing attacks)
 */
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

async function handleAdminLogin(request: NextRequest): Promise<NextResponse> {
  // Reutilizar x-request-id do cliente se presente, senão gerar novo
  const requestId = request.headers.get('x-request-id') ?? randomUUID();

  // Instrumentação de diagnóstico (dev-only)
  if (process.env.NODE_ENV !== 'production') {
    const contentType = request.headers.get('content-type') || 'not-set';
    const contentLength = request.headers.get('content-length') || 'not-set';
    console.log('[admin-login] Diagnóstico:', {
      method: request.method,
      contentType,
      contentLength,
      requestId,
    });
  }

  try {
    // 1. Ler body como texto (robusto)
    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch (textError) {
      // Erro ao ler body (ex: body já consumido, stream fechado)
      if (process.env.NODE_ENV !== 'production') {
        console.error('[admin-login] Erro ao ler body como texto:', {
          error: textError instanceof Error ? textError.message : 'Unknown error',
          requestId,
        });
      }
      const response = NextResponse.json(
        { error: 'bad_request', requestId },
        { status: 400 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }

    // Diagnóstico (dev-only): tamanho e se parece JSON
    if (process.env.NODE_ENV !== 'production') {
      const looksLikeJson = rawBody.trim().startsWith('{') && rawBody.trim().endsWith('}');
      console.log('[admin-login] Body diagnóstico:', {
        size: rawBody.length,
        looksLikeJson,
        requestId,
      });
    }

    // 2. Validar Content-Type (deve ser JSON)
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const response = NextResponse.json(
        { error: 'bad_request', requestId },
        { status: 400 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }

    // 3. Parse JSON
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      // JSON inválido
      if (process.env.NODE_ENV !== 'production') {
        console.error('[admin-login] Erro ao parsear JSON:', {
          error: parseError instanceof Error ? parseError.message : 'Unknown error',
          requestId,
        });
      }
      const response = NextResponse.json(
        { error: 'bad_request', requestId },
        { status: 400 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }

    // 4. Validar password (ausente ou não-string -> 400; string válida -> prosseguir para auth)
    if (typeof body.password !== 'string') {
      const response = NextResponse.json(
        { error: 'bad_request', requestId },
        { status: 400 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }

    const password = body.password;

    // 5. Ler senha do env (ADMIN_PASSWORD)
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('[admin-login] missing ADMIN_PASSWORD');
      const response = NextResponse.json(
        { error: 'server_misconfigured', requestId },
        { status: 500 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }

    // 6. Comparação em tempo constante
    const isValid = safeEqual(password, adminPassword);

    if (!isValid) {
      // Credenciais inválidas (caso esperado, não é erro)
      logSafe('warn', 'Admin login: credenciais inválidas', { requestId });
      const response = NextResponse.json(
        { error: 'Credenciais inválidas', requestId },
        { status: 401 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }

    // 7. Senha válida - criar sessão
    try {
      const token = await createAdminJwtSession();
      const cookieStore = await cookies();
      
      cookieStore.set('ls_admin_session', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 dias
        path: '/api/admin',
      });

      logSafe('info', 'Admin login: success', { requestId });
      const response = NextResponse.json({ success: true });
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    } catch (sessionError) {
      // Erro ao criar sessão (JWT, cookies) - tratar como erro interno
      console.error('[admin-login] Erro ao criar sessão:', {
        error: sessionError instanceof Error ? sessionError.message : 'Unknown error',
        requestId,
      });
      logSafe('error', 'Admin login: erro ao criar sessão', {
        requestId,
        error: sessionError instanceof Error ? sessionError.message : 'Unknown error',
      });
      const response = NextResponse.json(
        { error: 'Erro ao fazer login', requestId },
        { status: 500 }
      );
      response.headers.set('x-request-id', requestId);
      setNoStore(response);
      return response;
    }
  } catch (error) {
    // 8. Erro inesperado (exceção não prevista -> 500 com requestId)
    console.error(`[Admin Login] Erro inesperado (requestId: ${requestId}):`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    logSafe('error', 'Admin login: erro interno', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    const response = NextResponse.json(
      { 
        error: 'Erro ao fazer login',
        requestId,
      },
      { status: 500 }
    );
    response.headers.set('x-request-id', requestId);
    return response;
  }
}

// Aplicar rate limiting específico para /api/admin/login: 5 tentativas por minuto por IP
export const POST = withRateLimit(handleAdminLogin, {
  scope: 'admin-login',
  ipLimit: 5,
  ipWindowMs: 60000, // 60s (1 minuto)
});
