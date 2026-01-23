/**
 * Helper para gerar e validar briefingId (LS-STR-YYYY-NNN)
 */

/**
 * Gera um briefingId determinístico baseado no slug e ano
 * Formato: LS-STR-YYYY-NNN (onde NNN é um código baseado no slug)
 * Ano padrão: 2026 (ano inicial das publicações)
 */
export function generateBriefingId(slug: string, year?: number): string {
  const yyyy = year || 2026; // 2026 é o ano padrão das publicações
  
  // Gerar código numérico simples baseado no hash do slug
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Converter para número positivo de 3 dígitos
  const code = Math.abs(hash) % 1000;
  const nnn = String(code).padStart(3, '0');
  
  return `LS-STR-${yyyy}-${nnn}`;
}

/**
 * Valida se um briefingId está no formato correto
 */
export function isValidBriefingId(id: string): boolean {
  return /^LS-STR-\d{4}-\d{3}$/.test(id);
}
