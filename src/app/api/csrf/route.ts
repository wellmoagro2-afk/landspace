import { NextRequest, NextResponse } from 'next/server';
import { base64url } from 'jose';
import { cookies } from 'next/headers';
import { isProduction } from '@/lib/env';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

/**
 * Endpoint para obter token CSRF
 * GET /api/csrf
 * Retorna token que deve ser enviado em header x-csrf-token em requisições mutáveis
 * 
 * Anti-cache: força geração dinâmica e não permite cache
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  
  try {
    // Gerar token forte usando Web Crypto
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const token = base64url.encode(bytes);

    // Setar cookie httpOnly com token
    const cookieStore = await cookies();
    cookieStore.set('ls_csrf', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 30, // 30 minutos (reduzido de 1h para maior segurança)
      path: '/',
    });

    // Headers anti-cache explícitos
    return jsonWithRequestId(
      { token },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      },
      requestId
    );
  } catch (error) {
    console.error('Erro ao gerar token CSRF:', error instanceof Error ? error.message : 'Erro desconhecido', { requestId });
    return jsonWithRequestId(
      { error: 'Erro ao gerar token CSRF' },
      { status: 500 },
      requestId
    );
  }
}
