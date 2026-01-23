/**
 * Autenticação do Portal do Cliente
 * Sistema HMAC para sessões seguras
 */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { ENV } from './env';

const SESSION_SECRET = ENV.SESSION_SECRET;
const PORTAL_SESSION_COOKIE = 'ls_portal_session';
const ADMIN_SESSION_COOKIE = 'ls_admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias

interface PortalJwtPayload {
  protocol: string;
  exp: number;
  nonce: string;
  iat?: number;
}

interface PortalSession {
  protocol: string;
  exp: number;
  nonce: string;
}

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
 * Gerar hash do PIN
 */
export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

/**
 * Verificar PIN
 */
export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

/**
 * Gerar protocolo único (ex: LS-2026-000123)
 */
export function generateProtocol(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  // Garantir que sempre retorna em maiúsculas e sem espaços
  return `LS-${year}-${random}`.toUpperCase().trim();
}

/**
 * Gerar PIN aleatório (6 dígitos)
 */
export function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Criar sessão do portal
 */
export async function createPortalSession(protocol: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + (SESSION_DURATION / 1000);
  const nonce = crypto.randomUUID();
  
  const payload: PortalJwtPayload = {
    protocol,
    exp,
    nonce,
  };

  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(SESSION_SECRET));

  return token;
}

/**
 * Verificar e obter sessão do portal
 */
export async function getPortalSession(): Promise<PortalSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SESSION_SECRET)
    );

    const jwtPayload = payload as unknown as PortalJwtPayload;

    // Validar expiração (exp está em segundos Unix)
    if (!jwtPayload.exp || jwtPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    // Mapear explicitamente para PortalSession
    const session: PortalSession = {
      protocol: jwtPayload.protocol,
      exp: jwtPayload.exp,
      nonce: jwtPayload.nonce,
    };

    return session;
  } catch {
    return null;
  }
}

/**
 * Criar sessão admin
 */
export async function createAdminSession(): Promise<string> {
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
    .sign(new TextEncoder().encode(SESSION_SECRET));

  return token;
}

/**
 * Verificar sessão admin
 */
export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SESSION_SECRET)
    );

    const jwtPayload = payload as unknown as AdminJwtPayload;

    // Validar expiração (exp está em segundos Unix)
    if (!jwtPayload.exp || jwtPayload.exp < Math.floor(Date.now() / 1000) || !jwtPayload.authenticated) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Remover sessão do portal
 */
export async function clearPortalSession() {
  const cookieStore = await cookies();
  cookieStore.delete(PORTAL_SESSION_COOKIE);
}

/**
 * Remover sessão admin
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

/**
 * Resultado do login do portal com detalhes do erro
 */
export interface LoginResult {
  success: boolean;
  error?: 'PROTOCOL_NOT_FOUND' | 'INVALID_PIN' | 'UNKNOWN_ERROR';
  projectProtocol?: string;
}

/**
 * Login do portal (verificar protocol + PIN)
 * Retorna detalhes do erro para melhor feedback ao usuário
 */
export async function loginPortal(protocol: string, pin: string): Promise<LoginResult> {
  try {
    // Normalizar protocol (trim + uppercase) e PIN (trim apenas)
    const normalizedProtocol = protocol.trim().toUpperCase();
    const normalizedPin = pin.trim();

    // Debug: log temporário (remover em produção)
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Portal Login Debug]', {
        protocolOriginal: protocol,
        protocolNormalized: normalizedProtocol,
        pinLength: normalizedPin.length,
        pinFirstChar: normalizedPin.charAt(0),
        pinLastChar: normalizedPin.charAt(normalizedPin.length - 1),
      });
    }

    // Buscar projeto - tentar findUnique primeiro, depois findFirst como fallback
    let project = await prisma.project.findUnique({
      where: { protocol: normalizedProtocol },
    });

    // Fallback: buscar por qualquer protocol que contenha o valor (case insensitive)
    if (!project) {
      const allProjects = await prisma.project.findMany({
        select: { protocol: true, id: true },
      });
      
      // Log seguro (sem dados sensíveis)
      
      // Tentar encontrar por case-insensitive
      const foundProject = allProjects.find(
        p => p.protocol.toUpperCase() === normalizedProtocol
      );
      
      if (foundProject) {
        project = await prisma.project.findUnique({
          where: { id: foundProject.id },
        });
      }
    }

    if (!project) {
      return {
        success: false,
        error: 'PROTOCOL_NOT_FOUND',
      };
    }

    const isValid = await verifyPin(normalizedPin, project.pinHash);
    
    if (!isValid) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Portal Login Debug] PIN inválido para projeto:', project.protocol);
      }
      return {
        success: false,
        error: 'INVALID_PIN',
        projectProtocol: project.protocol,
      };
    }

    return {
      success: true,
      projectProtocol: project.protocol,
    };
  } catch (error) {
    console.error('[Portal Login] Erro inesperado:', error);
    return {
      success: false,
      error: 'UNKNOWN_ERROR',
    };
  }
}
