/**
 * CSRF Protection Guard
 * Valida tokens CSRF para rotas de estado (POST/PATCH/DELETE)
 * Edge-safe (sem Node APIs)
 */

import { NextRequest } from 'next/server';
import { isProduction } from './env';

/**
 * Métodos HTTP seguros (não requerem CSRF)
 */
const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

/**
 * Comparação timing-safe de strings (Edge-safe, sem Node crypto)
 * Usa XOR em charCodeAt para evitar timing attacks
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Validar proteção CSRF para requisições mutáveis
 * Retorna null se válido, ou objeto de erro se inválido
 */
export function validateCSRF(request: NextRequest): { error: string; status: number } | null {
  const method = request.method.toUpperCase();
  
  // Métodos seguros não requerem CSRF
  if (SAFE_METHODS.includes(method)) {
    return null;
  }

  // Obter headers e cookies
  const csrfToken = request.headers.get('x-csrf-token');
  const csrfCookie = request.cookies.get('ls_csrf')?.value;
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost || request.headers.get('host');

  // Validar Origin/Referer (Same-Origin check) em produção
  if (isProduction && host) {
    const expectedOrigin = `${forwardedProto}://${host}`;
    let requestOrigin: string | null = null;
    
    if (origin) {
      requestOrigin = origin;
    } else if (referer) {
      try {
        requestOrigin = new URL(referer).origin;
      } catch {
        // Referer inválido, tratar como sem origem válida
        return {
          error: 'Origin inválido',
          status: 403,
        };
      }
    }
    
    if (!requestOrigin || requestOrigin !== expectedOrigin) {
      return {
        error: 'Origin inválido',
        status: 403,
      };
    }
  }

  // Validar token CSRF
  if (!csrfToken || !csrfCookie) {
    return {
      error: 'Token CSRF ausente',
      status: 403,
    };
  }

  // Comparar token do header com cookie (timing-safe)
  if (!constantTimeEqual(csrfToken, csrfCookie)) {
    return {
      error: 'Token CSRF inválido',
      status: 403,
    };
  }

  return null;
}
