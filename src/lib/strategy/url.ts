/**
 * Helper para gerar URLs canônicas do Strategy Editorial
 */
import { ENV } from '@/lib/env';

/**
 * Gera a URL canônica de um briefing
 * Usa NEXT_PUBLIC_SITE_URL se disponível, senão usa fallback de produção
 * NUNCA retorna localhost
 */
export function getCanonicalBriefingUrl(slug: string, baseUrl?: string): string {
  // Se baseUrl foi fornecido (server-side), usar apenas se não for localhost
  if (baseUrl && !baseUrl.includes('localhost')) {
    return `${baseUrl}/strategy/briefings/${slug}`;
  }

  // Client-side: usar variável de ambiente (não usar window.location.origin se for localhost)
  if (typeof window !== 'undefined') {
    const siteUrl = ENV.NEXT_PUBLIC_SITE_URL;
    if (siteUrl && !siteUrl.includes('localhost')) {
      return `${siteUrl}/strategy/briefings/${slug}`;
    }
    // Se não houver URL de produção, retornar apenas o path
    return `/strategy/briefings/${slug}`;
  }

  // Fallback server-side sem baseUrl
  const siteUrl = ENV.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && !siteUrl.includes('localhost')) {
    return `${siteUrl}/strategy/briefings/${slug}`;
  }
  
  // Fallback final: usar domínio de produção padrão
  return `https://landspace.io/strategy/briefings/${slug}`;
}
