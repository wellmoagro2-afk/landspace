import { base64url } from 'jose';
import { isProduction, isDevelopment } from './env';

/**
 * Gera um nonce Base64URL seguro para CSP (Edge-safe)
 */
export function generateNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64url.encode(bytes);
}

/**
 * Constrói CSP strict com nonce (sem 'unsafe-inline' em style-src/style-src-elem)
 * 
 * style-src-attr permite 'unsafe-inline' apenas para atributos style="", mantendo hardening
 * em elementos <style> via nonce em style-src/style-src-elem.
 */
export function buildCSP(nonce: string): string {
  const isDev = isDevelopment;
  const isProd = isProduction;

  const csp = `
    default-src 'self';
    base-uri 'self';
    object-src 'none';
    frame-ancestors 'none';
    form-action 'self';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    connect-src 'self' https: ${isDev ? 'ws:' : ''} wss:;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ''};
    script-src-elem 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ''};
    style-src 'self' 'nonce-${nonce}' 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-dP00IR03GcdTorqXcUpuqfKlgJ11kk5AcCicYjZqTN8=';
    style-src-elem 'self' 'nonce-${nonce}';
    style-src-attr 'unsafe-inline';
    ${isProd ? 'upgrade-insecure-requests;' : ''}
  `.replace(/\s{2,}/g, ' ').trim();

  return csp;
}

/**
 * Verifica se CSP deve ser aplicado para esta requisição
 * Exclui APIs, assets estáticos
 * 
 * IMPORTANTE: NÃO excluir prefetch requests durante navegação client-side,
 * pois eles também precisam de nonce para evitar hydration mismatch.
 * O Next.js faz requests internas durante navegação que precisam de nonce consistente.
 */
export function shouldApplyCSP(request: Request): boolean {
  const url = new URL(request.url);
  const method = request.method;
  const accept = request.headers.get('accept') ?? '';

  return (
    (method === 'GET' || method === 'HEAD') &&
    !url.pathname.startsWith('/api') &&
    !url.pathname.startsWith('/_next/static') &&
    !url.pathname.startsWith('/_next/image') &&
    url.pathname !== '/favicon.ico' &&
    accept.includes('text/html')
    // REMOVIDO: !isPrefetch - prefetch requests também precisam de nonce para evitar hydration mismatch
  );
}
