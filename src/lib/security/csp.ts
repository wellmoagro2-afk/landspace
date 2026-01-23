import { NextRequest, NextResponse } from 'next/server';
import { generateNonce } from '../csp';
import { isProduction, isDevelopment } from '../env';

/**
 * Proxy helper para CSP seguindo guia oficial do Next.js
 * Gera nonce por request e aplica CSP nos headers
 */
export function applyCSPHeaders(request: NextRequest): {
  requestHeaders: Headers;
  response: NextResponse;
  nonce: string;
} {
  // Gerar nonce por request
  const nonce = generateNonce();
  
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

  // Criar request headers com CSP e nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  // Criar response com CSP e nonce nos headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-nonce', nonce);

  return {
    requestHeaders,
    response,
    nonce,
  };
}
