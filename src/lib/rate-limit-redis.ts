/**
 * Rate Limiting com Redis (opcional)
 * Fallback para in-memory se Redis não estiver disponível
 */

import Redis from 'ioredis';
import { checkRateLimit } from './rate-limit/core';

// Re-exportar getClientIP do módulo consolidado (compatibilidade)
export { getClientIP } from './rate-limit';

let redisClient: Redis | null = null;

/**
 * Inicializar cliente Redis
 */
export function initRedis(): Redis | null {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    return null;
  }

  try {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          return null; // Parar tentativas
        }
        return Math.min(times * 50, 2000);
      },
    });

    redisClient.on('error', (err) => {
      console.warn('[Redis] Erro de conexão, usando fallback in-memory:', err.message);
      redisClient = null;
    });

    redisClient.on('connect', () => {
      console.log('[Redis] Conectado com sucesso');
    });

    return redisClient;
  } catch (error) {
    console.warn('[Redis] Falha ao conectar, usando fallback in-memory:', error);
    return null;
  }
}

/**
 * Rate limit com Redis (fallback para in-memory)
 */
export async function checkRateLimitRedis(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const client = initRedis();

  // Se Redis não estiver disponível, usar fallback in-memory
  if (!client) {
    return checkRateLimit(key, maxAttempts, windowMs);
  }

  try {
    const now = Date.now();
    const windowKey = `ratelimit:${key}`;
    const resetAt = now + windowMs;

    // Obter contagem atual
    const count = await client.incr(windowKey);
    
    // Se é a primeira requisição nesta janela, definir TTL
    if (count === 1) {
      await client.pexpire(windowKey, windowMs);
    }

    const remaining = Math.max(0, maxAttempts - count);
    const allowed = count <= maxAttempts;

    if (!allowed) {
      // Obter TTL restante
      const ttl = await client.pttl(windowKey);
      const resetAtFromRedis = now + (ttl > 0 ? ttl : windowMs);
      
      return {
        allowed: false,
        remaining: 0,
        resetAt: resetAtFromRedis,
      };
    }

    return {
      allowed: true,
      remaining,
      resetAt,
    };
  } catch (error) {
    // Em caso de erro no Redis, usar fallback
    console.warn('[Redis Rate Limit] Erro, usando fallback:', error);
    return checkRateLimit(key, maxAttempts, windowMs);
  }
}

/**
 * Limpar rate limit (útil para testes)
 */
export async function clearRateLimit(key: string): Promise<void> {
  const client = initRedis();
  if (client) {
    try {
      await client.del(`ratelimit:${key}`);
    } catch (error) {
      console.warn('[Redis] Erro ao limpar rate limit:', error);
    }
  }
}
