/**
 * Proxy Next.js 16 - Interceptação de requests
 * 
 * Combina:
 * - Maintenance Gate (Basic Auth quando MAINTENANCE_MODE=1)
 * - Autenticação Admin para APIs (/api/admin/*)
 * - CSP Headers (Content Security Policy)
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { applyCSPHeaders } from './lib/security/csp';
import { shouldApplyCSP } from './lib/csp';

const ADMIN_SESSION_COOKIE = 'ls_admin_session';

interface AdminJwtPayload {
  authenticated: boolean;
  exp: number;
  nonce: string;
}

/**
 * Verificar token JWT admin (Edge-safe)
 */
async function verifyAdminJwtEdge(token: string, secret: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    const jwtPayload = payload as unknown as AdminJwtPayload;

    // Validar expiração
    const now = Math.floor(Date.now() / 1000);
    if (!jwtPayload.exp || jwtPayload.exp < now || !jwtPayload.authenticated) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Obter ou criar Request ID (Edge-safe)
 */
function getOrCreateRequestId(req: NextRequest): string {
  const existingId = req.headers.get('x-request-id');
  if (existingId && existingId.trim().length > 0) {
    return existingId.trim();
  }
  // Edge-safe: usar crypto.randomUUID() (disponível em Edge runtime)
  return crypto.randomUUID();
}

/**
 * Maintenance Gate - Bloqueio temporário com Basic Auth
 * Executa ANTES de qualquer outra lógica do proxy
 */
function checkMaintenanceMode(request: NextRequest): NextResponse | null {
  const mode = process.env.MAINTENANCE_MODE;
  if (mode !== "1") return null;

  const pathname = request.nextUrl.pathname;

  // allowlist mínima
  const isAllowed =
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/icon-192.png" ||
    pathname === "/icon-512.png" ||
    pathname === "/site.webmanifest" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/api/health" ||
    pathname === "/api/ready";

  if (isAllowed) return null;

  const expectedUser = process.env.MAINTENANCE_USER ?? "";
  const expectedPass = process.env.MAINTENANCE_PASS ?? "";

  const auth = request.headers.get("authorization") || "";
  if (!auth.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="LandSpace (maintenance)"',
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  let decoded = "";
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="LandSpace (maintenance)"',
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const i = decoded.indexOf(":");
  const user = i >= 0 ? decoded.slice(0, i) : "";
  const pass = i >= 0 ? decoded.slice(i + 1) : "";

  if (user !== expectedUser || pass !== expectedPass) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="LandSpace (maintenance)"',
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return null;
}

export async function proxy(request: NextRequest) {
  // MAINTENANCE GATE - Executar ANTES de qualquer outra lógica
  const maintenanceResponse = checkMaintenanceMode(request);
  if (maintenanceResponse) return maintenanceResponse;

  // ROOT CAUSE FIX: Gerar nonce UMA ÚNICA VEZ no início do proxy (single source of truth)
  // Este nonce será usado em:
  // - header CSP (quando aplicável)
  // - request header x-nonce (lido por layout via headers())
  // - atributo nonce em <Script> (via layout)
  // 
  // IMPORTANTE: Gerar nonce ANTES de qualquer branch para garantir consistência.
  // Mesmo para requests que não aplicam CSP (APIs, assets), o nonce deve estar disponível
  // nos request headers para evitar hydration mismatch durante navegação client-side.
  const { generateNonce } = await import('./lib/csp');
  const nonce = generateNonce();
  
  // Criar request headers com nonce injetado (sempre, para todas as requests)
  // O layout.tsx lê x-nonce via headers(), que acessa REQUEST headers, não response headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  
  // Manter x-request-id se existir
  const requestId = getOrCreateRequestId(request);
  if (!requestHeaders.has('x-request-id')) {
    requestHeaders.set('x-request-id', requestId);
  }

  const { pathname } = request.nextUrl;

  // Autenticação Admin para APIs (/api/admin/*)
  if (pathname.startsWith('/api/admin/') || pathname === '/api/admin') {
    // Allowlist: rotas que não precisam de sessão prévia
    // /api/admin/login - endpoint de autenticação (precisa ser acessível sem sessão)
    // /api/admin/logout - endpoint de logout (pode ser acessível sem sessão para limpar cookie)
    // /api/admin/portal/login - endpoint de autenticação do portal (precisa ser acessível sem sessão)
    // /api/admin/portal/logout - endpoint de logout do portal (pode ser acessível sem sessão para limpar cookie)
    if (
      pathname === '/api/admin/login' ||
      pathname === '/api/admin/logout' ||
      pathname === '/api/admin/portal/login' ||
      pathname === '/api/admin/portal/logout'
    ) {
      // Bypass: deixar passar sem verificar sessão
      // A segurança continua sendo garantida pelas rotas (ADMIN_KEY, rate limiting, etc.)
      // Continuar para aplicar CSP se necessário
    } else {
      // Obter token do cookie
      const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

      if (!token) {
        // Não autenticado - retornar JSON 401 (não redirect)
        // Manter nonce nos headers mesmo em erro (consistência)
        const errorResponse = NextResponse.json(
          { error: 'unauthorized', requestId },
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'x-request-id': requestId,
              'x-nonce': nonce, // Manter nonce mesmo em erro
            },
          }
        );
        return errorResponse;
      }

      // Verificar token (Edge-safe)
      // Obter SESSION_SECRET do env (Edge runtime tem acesso a process.env)
      const sessionSecret = process.env.SESSION_SECRET;
      if (!sessionSecret) {
        // Se SESSION_SECRET não estiver disponível, deixar passar (será tratado na rota)
        // Continuar para aplicar CSP se necessário
      } else {
        const isValid = await verifyAdminJwtEdge(token, sessionSecret);
        if (!isValid) {
          // Token inválido/expirado - retornar JSON 401
          // Manter nonce nos headers mesmo em erro (consistência)
          const errorResponse = NextResponse.json(
            { error: 'unauthorized', requestId },
            {
              status: 401,
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
                'Pragma': 'no-cache',
                'x-request-id': requestId,
                'x-nonce': nonce, // Manter nonce mesmo em erro
              },
            }
          );
          return errorResponse;
        }
      }
    }
  }

  // CSP Headers - Aplicar para requisições HTML (não para APIs, assets, etc)
  // IMPORTANTE: Aplicar CSP em TODAS as requisições HTML, incluindo navegação client-side
  // O Next.js faz requests internas durante navegação que também precisam de nonce
  if (shouldApplyCSP(request)) {
    // Passar nonce já gerado e requestHeaders já com x-nonce injetado
    // Isso garante que o mesmo nonce seja usado em CSP e em x-nonce
    const { response } = applyCSPHeaders(request, nonce, requestHeaders);
    return response;
  }

  // Para outras requisições (APIs, assets, etc), retornar next
  // IMPORTANTE: Mesmo para requests que não aplicam CSP, o nonce JÁ está nos request headers
  // (injetado no início do proxy). Isso garante que o layout sempre tenha nonce disponível
  // via headers(), evitando hydration mismatch durante navegação client-side.
  // 
  // Prefetch requests e RSC payloads também recebem nonce nos request headers,
  // garantindo consistência entre SSR e CSR.
  const response = NextResponse.next({
    request: {
      headers: requestHeaders, // requestHeaders já tem x-nonce injetado
    },
  });
  
  // Adicionar nonce também nos response headers (para consistência e debugging)
  response.headers.set('x-nonce', nonce);
  
  return response;
}

export const config = {
  matcher: [
    // Aplicar em todas as rotas (exceto assets do Next)
    // IMPORTANTE: Incluir requests de navegação client-side e prefetch para garantir nonce sempre disponível
    // Isso evita hydration mismatch porque o nonce estará disponível em TODAS as requests que participam do pipeline de render/hydration
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
