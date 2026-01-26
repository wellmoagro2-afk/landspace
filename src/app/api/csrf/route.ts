import { NextRequest } from 'next/server';
import { base64url } from 'jose';
import { cookies } from 'next/headers';
import { isProduction } from '@/lib/env';
import { jsonOk, jsonError } from '@/lib/api-response';

/**
 * Endpoint para obter token CSRF
 * GET /api/csrf
 * Retorna token que deve ser enviado em header x-csrf-token em requisições mutáveis
 * 
 * Anti-cache: força geração dinâmica e não permite cache
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    return jsonOk(request, { token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao gerar token CSRF:', errorMessage);
    
    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao gerar token CSRF',
    });
  }
}
