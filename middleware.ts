/**
 * Middleware Next.js - Autenticação Admin para APIs
 * 
 * Intercepta rotas /api/admin/* e retorna JSON 401 (não redirect) quando não autenticado
 * Mantém redirect para rotas de UI (/strategy/admin/*)
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Interceptar apenas rotas /api/admin/* e /api/admin
  if (pathname.startsWith('/api/admin/') || pathname === '/api/admin') {
    // Allowlist: rotas que não precisam de sessão prévia
    // /api/admin/login - endpoint de autenticação (precisa ser acessível sem sessão)
    // /api/admin/logout - endpoint de logout (pode ser acessível sem sessão para limpar cookie)
    if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
      // Bypass: deixar passar sem verificar sessão
      // A segurança continua sendo garantida pelas rotas (ADMIN_KEY, rate limiting, etc.)
      return NextResponse.next();
    }

    // Obter token do cookie
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (!token) {
      // Não autenticado - retornar JSON 401 (não redirect)
      const requestId = getOrCreateRequestId(request);
      return NextResponse.json(
        { error: 'unauthorized', requestId },
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'x-request-id': requestId,
          },
        }
      );
    }

    // Verificar token (Edge-safe)
    // Obter SESSION_SECRET do env (Edge runtime tem acesso a process.env)
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
      // Se SESSION_SECRET não estiver disponível, deixar passar (será tratado na rota)
      return NextResponse.next();
    }

    const isValid = await verifyAdminJwtEdge(token, sessionSecret);
    if (!isValid) {
      // Token inválido/expirado - retornar JSON 401
      const requestId = getOrCreateRequestId(request);
      return NextResponse.json(
        { error: 'unauthorized', requestId },
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'x-request-id': requestId,
          },
        }
      );
    }

    // Autenticado - continuar
    return NextResponse.next();
  }

  // Para outras rotas, não fazer nada (deixar passar)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplicar apenas em rotas /api/admin/*
    '/api/admin/:path*',
  ],
};
