/**
 * Sanitização robusta de HTML para prevenir XSS
 * Usa sanitize-html com allowlist estrita
 * 
 * Proteções:
 * - Bloqueia javascript:, vbscript:, data: perigosos
 * - Remove tags perigosas (script, iframe, object, embed, svg, math, form, input, etc)
 * - Remove atributos perigosos (on*, style, srcdoc, formaction, xlink:href)
 * - Garante rel="noopener noreferrer" em links com target=_blank
 */

import sanitizeHtmlLib from 'sanitize-html';

/**
 * Sanitiza HTML com allowlist estrita
 * 
 * @param html - HTML a ser sanitizado
 * @returns HTML sanitizado e seguro
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  return sanitizeHtmlLib(html, {
    // Tags permitidas (allowlist)
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's', 'strike', 'del',
      'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'hr', 'span',
      // Adicionar 'img' apenas se necessário (tratar em item separado)
    ],
    
    // Atributos permitidos por tag
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'title'],
      span: ['class'], // Permitir classes para estilização via CSS
      code: ['class'],
      pre: ['class'],
      // Adicionar img quando necessário
      // img: ['src', 'alt', 'title', 'width', 'height'],
    },
    
    // Esquemas permitidos em URLs (href, src, etc)
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto'],
      // img: ['http', 'https', 'data'], // Quando adicionar img
    },
    
    // Não permitir protocol-relative URLs (//example.com)
    allowProtocolRelative: false,
    
    // Transformar tags (adicionar rel seguro em links)
    transformTags: {
      a: (tagName, attribs) => {
        const attrs: Record<string, string> = {};
        
        // Copiar atributos permitidos
        if (attribs.href) {
          // Validar href não é javascript: ou data: perigoso
          const href = attribs.href.trim().toLowerCase();
          if (href.startsWith('javascript:') || 
              href.startsWith('vbscript:') || 
              href.startsWith('data:text/html') ||
              href.startsWith('data:image/svg+xml')) {
            // Remover href perigoso
            return { tagName: 'span', attribs: {} };
          }
          attrs.href = attribs.href;
        }
        
        if (attribs.name) attrs.name = attribs.name;
        if (attribs.title) attrs.title = attribs.title;
        
        // Se tem target, garantir rel seguro
        if (attribs.target === '_blank' || attribs.target === '_new') {
          attrs.target = '_blank';
          // Adicionar rel seguro (noopener noreferrer)
          attrs.rel = 'noopener noreferrer';
        } else if (attribs.target) {
          // Remover target estranho
          delete attribs.target;
        }
        
        return { tagName, attribs: attrs };
      },
    },
    
    // Não permitir estilos inline
    allowedStyles: {},
    
    // Filtro exclusivo: remover links sem href ou com href proibido
    exclusiveFilter: (frame) => {
      // Remover tags <a> sem href válido ou com href perigoso
      if (frame.tag === 'a') {
        const href = frame.attribs.href;
        if (!href || 
            href.trim() === '' ||
            href.trim().toLowerCase().startsWith('javascript:') ||
            href.trim().toLowerCase().startsWith('vbscript:') ||
            href.trim().toLowerCase().startsWith('data:')) {
          return true; // Remover
        }
      }
      return false;
    },
  });
}
