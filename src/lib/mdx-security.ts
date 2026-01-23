/**
 * MDX Security - Hardening contra XSS, JSX arbitrário e ESM
 * 
 * Proteções:
 * - Bloqueia import/export (mdxjsEsm)
 * - Bloqueia expressões MDX ({...})
 * - Bloqueia JSX arbitrário perigoso (script, iframe, svg, etc)
 * - Bloqueia atributos de evento (on*)
 * - Bloqueia URLs perigosas (javascript:, vbscript:, data:text/html)
 * - Limite de tamanho para prevenir DoS (200KB)
 */

/**
 * Remove code blocks (fenced e inline) do conteúdo MDX
 * Isso reduz falsos positivos ao validar código legítimo dentro de code blocks
 * 
 * @param source - Conteúdo MDX
 * @returns Conteúdo sem code blocks (fenced e inline)
 */
function stripCode(source: string): string {
  let stripped = source;

  // Remover fenced code blocks (```...``` e ~~~...~~~)
  // Suporta múltiplas linhas e linguagens opcionais
  stripped = stripped.replace(/```[\s\S]*?```/g, '');
  stripped = stripped.replace(/~~~[\s\S]*?~~~/g, '');

  // Remover inline code (`...`)
  // Evitar remover backticks dentro de strings ou outros contextos
  stripped = stripped.replace(/`[^`]*`/g, '');

  return stripped;
}

/**
 * Valida se o conteúdo MDX é seguro (fail-fast)
 * 
 * @param source - Conteúdo MDX a ser validado
 * @throws Error com código específico se conteúdo não for seguro
 */
export function assertSafeMdx(source: string): void {
  if (!source || typeof source !== 'string') {
    return; // Vazio ou não string é considerado seguro (será ignorado)
  }

  // 0. Verificar limite de tamanho (DoS protection)
  if (source.length > 200_000) {
    const error = new Error('MDX_TOO_LARGE');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = `Conteúdo MDX excede limite de 200KB (${Math.round(source.length / 1024)}KB)`;
    }
    throw error;
  }

  // Strip code blocks antes de validar (reduz falsos positivos)
  const scan = stripCode(source);

  // 1. Bloquear import/export (mdxjsEsm) - validar em scan (sem code blocks)
  const importPattern = /(^|\n)\s*import\s+/m;
  const exportPattern = /(^|\n)\s*export\s+/m;
  
  if (importPattern.test(scan)) {
    const error = new Error('MDX_EVAL_NOT_ALLOWED');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = 'Import statements não são permitidos em MDX';
    }
    throw error;
  }
  
  if (exportPattern.test(scan)) {
    const error = new Error('MDX_EVAL_NOT_ALLOWED');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = 'Export statements não são permitidos em MDX';
    }
    throw error;
  }

  // 2. Bloquear URLs perigosas em href/src (antes de verificar tags, para detectar data:text/html)
  // Validar em scan (sem code blocks)
  const dangerousUrlPattern = /(javascript:|vbscript:|data:text\/html|data:image\/svg\+xml)/i;
  if (dangerousUrlPattern.test(scan)) {
    const error = new Error('MDX_DANGEROUS_URL');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = 'URLs perigosas (javascript:, vbscript:, data:text/html, data:image/svg+xml) não são permitidas';
    }
    throw error;
  }

  // 3. Bloquear tags HTML perigosas (incluindo style, link, meta) - ANTES de expressões
  // Validar em scan (sem code blocks)
  // Ordem importante: tags antes de expressões para evitar falsos positivos com CSS/JS dentro de tags
  const dangerousTagsPattern = /<\s*(script|iframe|svg|math|object|embed|form|input|button|select|textarea|style|link|meta)\b/i;
  if (dangerousTagsPattern.test(scan)) {
    const error = new Error('MDX_HTML_TAG_NOT_ALLOWED');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = 'Tags HTML perigosas não são permitidas em MDX';
    }
    throw error;
  }

  // 4. Bloquear expressões MDX ({...})
  // Permitir apenas expressões simples como {variable} se necessário no futuro
  // Por padrão, bloquear todas as expressões para máxima segurança
  // Validar em scan (sem code blocks)
  // Nota: após verificar tags, para evitar falsos positivos com CSS dentro de <style>
  const expressionPattern = /\{[^}]*\}/;
  if (expressionPattern.test(scan)) {
    const error = new Error('MDX_EXPRESSIONS_NOT_ALLOWED');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = 'Expressões MDX ({...}) não são permitidas';
    }
    throw error;
  }

  // 5. Bloquear atributos de evento (on*)
  // Validar em scan (sem code blocks)
  const eventAttrPattern = /on\w+\s*=/i;
  if (eventAttrPattern.test(scan)) {
    const error = new Error('MDX_EVENT_ATTR_NOT_ALLOWED');
    if (process.env.NODE_ENV === 'development') {
      (error as any).details = 'Atributos de evento (on*) não são permitidos em MDX';
    }
    throw error;
  }
}

/**
 * Opções MDX seguras (para uso futuro com plugins remark/rehype)
 * Por enquanto, a validação é feita via assertSafeMdx (fail-fast)
 */
export const safeMdxOptions = {
  // Placeholder para opções futuras (remark/rehype plugins)
  // Por enquanto, confiamos em assertSafeMdx + componentes seguros
};
