import { NextRequest, NextResponse } from 'next/server';
import { generateNonce } from '../csp';
import { isProduction, isDevelopment } from '../env';

/**
 * Proxy helper para CSP seguindo guia oficial do Next.js
 * Aplica CSP nos headers usando um nonce já gerado (single source of truth)
 * 
 * IMPORTANTE: O nonce deve ser gerado UMA vez no proxy e passado aqui.
 * Isso garante que o mesmo nonce seja usado em:
 * - header CSP
 * - request header x-nonce (lido por layout via headers())
 * - atributo nonce em <Script>
 * 
 * @param request - NextRequest original
 * @param nonce - Nonce já gerado (não gerar novo)
 * @param requestHeaders - Headers do request já com x-nonce injetado
 */
export function applyCSPHeaders(
  request: NextRequest,
  nonce: string,
  requestHeaders: Headers
): {
  response: NextResponse;
} {
  // Nonce já foi gerado no proxy - usar o mesmo para garantir consistência
  
  const isDev = isDevelopment;
  const isProd = isProduction;

  // Construir CSP por ambiente
  // DEV: permissivo apenas em script-src (unsafe-eval para HMR)
  // PROD: strict com nonce
  const scriptSrc = isProd
    ? `'self' 'nonce-${nonce}' 'strict-dynamic'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`;

  // style-src sempre strict com nonce (sem unsafe-inline)
  const styleSrc = `'self' 'nonce-${nonce}'`;

  const csp = `
    default-src 'self';
    base-uri 'self';
    object-src 'none';
    frame-ancestors 'none';
    form-action 'self';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    connect-src 'self' https: ${isDev ? 'ws:' : ''} wss:;
    script-src ${scriptSrc};
    script-src-elem ${scriptSrc};
    style-src ${styleSrc};
    style-src-attr 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-32t0bJPIyxns/QqsW8RE3JGUERKnHL5RygHBgJvEanc=' 'sha256-biLFinpqYMtWHmXfkA1BPeCY0/fNt46SAZ+BBk5YUog=' 'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc=' 'sha256-hLxczD9PCKPEEV+LvIFdbcD3OrE6XeeF5ALg0tJCTcg=' 'sha256-jzCR8mn6AeeyaSpQm87jZTnCoCkdUe5csSmAGFGrMDA=' 'sha256-BIF8g/Yy8tQWDAZx7+G+OOOOtshfGzffchW3VfILKJE=' 'sha256-AR6+SB6vXqI9ZnmFvzPZfnCWxZN0sWZ+p+jIVwvhjFk=';
    ${isProd ? 'upgrade-insecure-requests;' : ''}
  `.replace(/\s{2,}/g, ' ').trim();

  // requestHeaders já tem x-nonce injetado pelo proxy
  // Apenas adicionar CSP ao request header (para consistência)
  requestHeaders.set('Content-Security-Policy', csp);

  // Criar response com CSP e nonce nos headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Aplicar CSP e nonce nos response headers
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-nonce', nonce);

  return {
    response,
  };
}
