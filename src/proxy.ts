import { NextRequest, NextResponse } from 'next/server';
import { applyCSPHeaders } from './lib/security/csp';
import { shouldApplyCSP } from './lib/csp';

/**
 * Proxy do Next.js 16 para aplicar CSP headers
 * Segue o padrão oficial do Next.js para proxy
 */
export function proxy(request: NextRequest) {
  // Aplicar CSP apenas para requisições HTML (não para APIs, assets, etc)
  if (shouldApplyCSP(request)) {
    const { response } = applyCSPHeaders(request);
    return response;
  }

  // Para outras requisições, retornar next sem CSP
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
