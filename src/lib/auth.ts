/**
 * Autenticação Admin Strategy (JWT unificado)
 * Migrado de iron-session para JWT para compatibilidade com Edge runtime
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify, SignJWT } from 'jose';
import { ENV, isProduction } from './env';
import { verifyAdminPassword } from './admin-config';

const ADMIN_SESSION_COOKIE = 'ls_admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias

interface AdminJwtPayload {
  authenticated: boolean;
  exp: number;
  nonce: string;
  iat?: number;
}

interface AdminSession {
  authenticated: boolean;
  exp: number;
  nonce: string;
}

/**
 * Obter token JWT admin dos cookies
 */
async function getAdminJwtFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value || null;
}

/**
 * Verificar token JWT admin
 */
async function verifyAdminJwt(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(ENV.SESSION_SECRET)
    );

    const jwtPayload = payload as unknown as AdminJwtPayload;

    // Validar expiração
    const now = Math.floor(Date.now() / 1000);
    if (!jwtPayload.exp || jwtPayload.exp < now || !jwtPayload.authenticated) {
      return null;
    }

    // Mapear explicitamente para AdminSession
    const session: AdminSession = {
      authenticated: jwtPayload.authenticated,
      exp: jwtPayload.exp,
      nonce: jwtPayload.nonce,
    };

    return session;
  } catch {
    return null;
  }
}

/**
 * Criar sessão admin JWT
 */
export async function createAdminJwtSession(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + (SESSION_DURATION / 1000);
  const nonce = crypto.randomUUID();
  
  const payload: AdminJwtPayload = {
    authenticated: true,
    exp,
    nonce,
  };

  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(ENV.SESSION_SECRET));

  return token;
}

/**
 * Requerir admin para páginas (redirect se não autenticado)
 */
export async function requireAdminPage() {
  const token = await getAdminJwtFromCookies();
  
  if (!token) {
    redirect('/strategy/admin/login');
  }

  const session = await verifyAdminJwt(token);
  if (!session) {
    redirect('/strategy/admin/login');
  }
}

/**
 * Requerir admin para APIs (retorna boolean)
 */
export async function requireAdminApi(): Promise<boolean> {
  const token = await getAdminJwtFromCookies();
  
  if (!token) {
    return false;
  }

  const session = await verifyAdminJwt(token);
  return !!session;
}

/**
 * Requerir admin (compatibilidade com código existente)
 */
export async function requireAdmin() {
  await requireAdminPage();
}

/**
 * Login admin
 * Retorna false para credenciais inválidas (sem lançar exceção)
 * Lança exceção apenas para erros reais (DB, JWT, cookies)
 */
export async function login(password: string): Promise<boolean> {
  // Validar senha usando admin-config (banco ou env fallback)
  // verifyAdminPassword retorna false para credenciais inválidas (não lança exceção)
  const isValid = await verifyAdminPassword(password);
  
  if (!isValid) {
    // Credenciais inválidas - retornar false (caso esperado, não é erro)
    return false;
  }

  // Credenciais válidas - criar sessão
  // Se houver erro ao criar sessão (JWT, cookies), deixar propagar (erro real)
  try {
    const token = await createAdminJwtSession();
    const cookieStore = await cookies();
    
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    return true;
  } catch (sessionError) {
    // Erro ao criar sessão (JWT, cookies) - tratar como erro interno
    // Logar mas relançar para ser tratado como 500
    console.error('[login] Erro ao criar sessão admin:', {
      error: sessionError instanceof Error ? sessionError.message : 'Unknown error',
    });
    throw sessionError;
  }
}

/**
 * Logout admin
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
