/**
 * Rate Limiting in-memory (fallback)
 * Usado quando Redis não está disponível
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// Limpar entradas expiradas periodicamente
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  });
}, 60000); // Limpar a cada minuto

/**
 * Rate limit por chave (IP, IP+protocol, etc)
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store[key];

  if (!entry || entry.resetAt < now) {
    // Nova janela
    store[key] = {
      count: 1,
      resetAt: now + windowMs,
    };
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetAt: now + windowMs,
    };
  }

  if (entry.count >= maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    resetAt: entry.resetAt,
  };
}

// getClientIP foi movido para src/lib/rate-limit/utils.ts
// Use: import { getClientIP } from '@/lib/rate-limit';
