/**
 * Utilitários para rate limiting
 * Fonte única para getClientIP
 */

import type { NextRequest } from 'next/server';

/**
 * Obter IP do cliente a partir do NextRequest
 * 
 * Prioridade:
 * 1. x-forwarded-for (primeiro IP da lista)
 * 2. x-real-ip
 * 3. cf-connecting-ip (Cloudflare)
 * 4. unknown (fallback)
 * 
 * Nunca lança exceção - sempre retorna string
 */
export function getClientIP(request: NextRequest): string {
  try {
    // Prioridade 1: x-forwarded-for (primeiro IP da lista)
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      const firstIP = forwarded.split(',')[0].trim();
      if (firstIP) {
        return firstIP;
      }
    }
    
    // Prioridade 2: x-real-ip
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
      return realIP.trim();
    }
    
    // Prioridade 3: cf-connecting-ip (Cloudflare)
    const cfIP = request.headers.get('cf-connecting-ip');
    if (cfIP) {
      return cfIP.trim();
    }
    
    // Fallback
    return 'unknown';
  } catch {
    // Nunca lançar exceção
    return 'unknown';
  }
}
