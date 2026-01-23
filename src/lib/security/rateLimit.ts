/**
 * Rate Limiting + Brute-Force Protection
 * 
 * Estratégia: Fixed window (janela de tempo) com Map in-memory
 * Persistência em dev: usa globalThis para sobreviver a HMR
 * 
 * Compatível com Windows e sem dependência de Redis (in-memory por enquanto)
 * Com opção futura de plugar store compartilhado
 */

import { NextRequest, NextResponse } from 'next/server';
import { setNoStore } from '@/lib/http/request-id';

// Tipo para entrada do rate limit store
interface RateLimitEntry {
  count: number;
  resetAt: number; // Timestamp em ms
}

// Tipo para resultado do rate limit check
interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterMs: number;
}

// Store global para rate limiting (persiste em HMR via globalThis)
declare global {
  // eslint-disable-next-line no-var
  var __lsRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

// Inicializar store (usar globalThis em dev para sobreviver HMR)
function getStore(): Map<string, RateLimitEntry> {
  if (typeof globalThis !== 'undefined') {
    if (!globalThis.__lsRateLimitStore) {
      globalThis.__lsRateLimitStore = new Map<string, RateLimitEntry>();
    }
    return globalThis.__lsRateLimitStore;
  }
  // Fallback para ambientes sem globalThis
  return new Map<string, RateLimitEntry>();
}

// Limpeza periódica de entradas expiradas
let cleanupInterval: NodeJS.Timeout | null = null;

function startCleanupInterval() {
  if (cleanupInterval) {
    return; // Já está rodando
  }

  cleanupInterval = setInterval(() => {
    const store = getStore();
    const now = Date.now();
    
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) {
        store.delete(key);
      }
    }
  }, 60000); // Limpar a cada minuto
}

// Iniciar limpeza automática
if (typeof process !== 'undefined') {
  startCleanupInterval();
}

/**
 * Extrai o IP do cliente da requisição
 * Prioriza headers: x-forwarded-for (primeiro IP), x-real-ip, cf-connecting-ip
 * Fallback: "unknown"
 */
export function getClientIp(req: Request): string {
  // Tentar x-forwarded-for primeiro (pode ter múltiplos IPs separados por vírgula)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Pegar o primeiro IP (o IP original do cliente)
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  // Tentar x-real-ip
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Tentar cf-connecting-ip (Cloudflare)
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  // Fallback
  return 'unknown';
}

/**
 * Normaliza identidade (trim + lowercase)
 */
export function normalizeIdentity(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * Tenta extrair identidade (email/username/user/login) do body da requisição
 * Retorna null se não encontrar ou se houver erro
 */
export async function parseIdentityFromBody(req: Request): Promise<string | null> {
  try {
    // Clonar request para não consumir o body original
    const clonedReq = req.clone();
    const body = await clonedReq.json().catch(() => null);
    
    if (!body || typeof body !== 'object') {
      return null;
    }

    // Tentar campos comuns de identidade
    const identityFields = ['email', 'username', 'user', 'login', 'protocol', 'adminKey'];
    
    for (const field of identityFields) {
      if (body[field] && typeof body[field] === 'string') {
        return normalizeIdentity(body[field]);
      }
    }

    return null;
  } catch (error) {
    // Erro ao parsear body - retornar null
    return null;
  }
}

/**
 * Verifica rate limit para uma chave específica
 * 
 * @param key - Chave única para o rate limit (ex: "login:ip:127.0.0.1")
 * @param limit - Número máximo de tentativas permitidas
 * @param windowMs - Janela de tempo em milissegundos
 * @returns Resultado com allowed, remaining, resetAt, retryAfterMs
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const store = getStore();
  const now = Date.now();
  
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // Nova janela ou janela expirada
    const resetAt = now + windowMs;
    store.set(key, {
      count: 1,
      resetAt,
    });
    
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt,
      retryAfterMs: windowMs,
    };
  }

  // Janela ativa
  if (entry.count >= limit) {
    // Limite excedido
    const retryAfterMs = Math.max(0, entry.resetAt - now);
    
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterMs,
    };
  }

  // Incrementar contador
  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  const retryAfterMs = Math.max(0, entry.resetAt - now);

  return {
    allowed: true,
    remaining,
    resetAt: entry.resetAt,
    retryAfterMs,
  };
}

/**
 * Opções para o wrapper withRateLimit
 */
interface RateLimitOptions {
  scope: string; // Escopo do rate limit (ex: "login")
  ipLimit?: number; // Limite por IP (padrão: 30)
  ipWindowMs?: number; // Janela por IP em ms (padrão: 60000 = 60s)
  identityLimit?: number; // Limite por IP+Identidade (padrão: 5)
  identityWindowMs?: number; // Janela por IP+Identidade em ms (padrão: 60000 = 60s)
}

/**
 * Wrapper para aplicar rate limiting em handlers de API
 * 
 * Aplica duas chaves de rate limit:
 * 1. Por IP: ipLimit tentativas por ipWindowMs
 * 2. Por IP+Identidade (quando disponível): identityLimit tentativas por identityWindowMs
 * 
 * Bypass determinístico: se QA_CSP=1 e NODE_ENV !== "production", não bloqueia (apenas log opcional)
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<Response>,
  options: RateLimitOptions
): (req: NextRequest) => Promise<Response> {
  const {
    scope,
    ipLimit = 30,
    ipWindowMs = 60000, // 60s
    identityLimit = 5,
    identityWindowMs = 60000, // 60s
  } = options;

  // Bypass para QA_CSP=1 em dev
  const shouldBypass = 
    process.env.QA_CSP === '1' && 
    process.env.NODE_ENV !== 'production';

  return async (req: NextRequest): Promise<Response> => {
    // Obter ou criar Request ID (para incluir em todas as respostas)
    const { randomUUID } = await import('crypto');
    const requestId = req.headers.get('x-request-id') ?? randomUUID();

    // Bypass determinístico (QA)
    if (shouldBypass) {
      // Log opcional (apenas em dev)
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Rate Limit] Bypass ativo para QA_CSP=1 (scope: ${scope})`);
      }
      const response = await handler(req);
      // Garantir x-request-id mesmo no bypass
      if (!response.headers.has('x-request-id')) {
        response.headers.set('x-request-id', requestId);
      }
      return response;
    }

    // Extrair IP do cliente
    const clientIp = getClientIp(req);
    
    // Chave 1: Por IP
    const ipKey = `${scope}:ip:${clientIp}`;
    const ipCheck = checkRateLimit(ipKey, ipLimit, ipWindowMs);

    if (!ipCheck.allowed) {
      const retryAfterSeconds = Math.ceil(ipCheck.retryAfterMs / 1000);
      
      const response = NextResponse.json(
        {
          ok: false,
          error: 'rate_limited',
          scope,
          retryAfterMs: ipCheck.retryAfterMs,
          ts: new Date().toISOString(),
          requestId, // Incluir requestId no body de erro
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfterSeconds.toString(),
            'X-RateLimit-Limit': ipLimit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(ipCheck.resetAt / 1000).toString(),
            'x-request-id': requestId, // Sempre incluir x-request-id
          },
        }
      );
      setNoStore(response);
      return response;
    }

    // Chave 2: Por IP+Identidade (se disponível)
    const identity = await parseIdentityFromBody(req);
    
    if (identity) {
      const identityKey = `${scope}:ipid:${clientIp}:${identity}`;
      const identityCheck = checkRateLimit(identityKey, identityLimit, identityWindowMs);

      if (!identityCheck.allowed) {
        const retryAfterSeconds = Math.ceil(identityCheck.retryAfterMs / 1000);
        
        const response = NextResponse.json(
          {
            ok: false,
            error: 'rate_limited',
            scope,
            retryAfterMs: identityCheck.retryAfterMs,
            ts: new Date().toISOString(),
            requestId, // Incluir requestId no body de erro
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfterSeconds.toString(),
              'X-RateLimit-Limit': ipLimit.toString(), // Sempre mostrar ipLimit (limite principal)
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': Math.ceil(identityCheck.resetAt / 1000).toString(),
              'x-request-id': requestId, // Sempre incluir x-request-id
            },
          }
        );
        setNoStore(response);
        return response;
      }
    }

    // Rate limit passou - executar handler original
    const response = await handler(req);

    // Garantir x-request-id no header (se handler não adicionou)
    if (!response.headers.has('x-request-id')) {
      response.headers.set('x-request-id', requestId);
    }

    // Adicionar headers de rate limit na resposta
    // Sempre mostrar o limite principal (ipLimit) nos headers
    // O identityLimit é uma camada adicional de proteção, mas não é o limite principal
    let finalRemaining: number;
    let finalResetAt: number;

    if (identity) {
      // Re-verificar identity check para obter valores atualizados após o handler
      const identityKey = `${scope}:ipid:${clientIp}:${identity}`;
      const identityCheckAfter = checkRateLimit(identityKey, identityLimit, identityWindowMs);
      
      // Usar o mais restritivo entre IP e IP+Identity para remaining
      finalRemaining = Math.min(ipCheck.remaining, identityCheckAfter.remaining);
      finalResetAt = Math.min(ipCheck.resetAt, identityCheckAfter.resetAt);
    } else {
      finalRemaining = ipCheck.remaining;
      finalResetAt = ipCheck.resetAt;
    }

    // Sempre mostrar ipLimit nos headers (limite principal por IP)
    response.headers.set('X-RateLimit-Limit', ipLimit.toString());
    response.headers.set('X-RateLimit-Remaining', finalRemaining.toString());
    response.headers.set('X-RateLimit-Reset', Math.ceil(finalResetAt / 1000).toString());

    return response;
  };
}
