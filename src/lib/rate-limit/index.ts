/**
 * Rate Limiting - Entry Point
 * API pública consolidada para rate limiting e utilitários relacionados
 */

// Re-exportar funções de rate limiting in-memory
export { checkRateLimit } from './core';

// Re-exportar utilitários
export { getClientIP } from './utils';

// Re-exportar Redis rate limiting (se disponível)
export { checkRateLimitRedis, clearRateLimit } from '../rate-limit-redis';
