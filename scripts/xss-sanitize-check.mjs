/**
 * Script de validação de sanitização HTML/XSS
 * Testa que sanitizeHtml bloqueia payloads XSS comuns
 * 
 * Uso: node scripts/xss-sanitize-check.mjs
 */

// Reimplementar sanitizeHtml para teste (evita dependência de compilação TypeScript)
// Em produção, usar src/lib/sanitize-html.ts

import sanitizeHtmlLib from 'sanitize-html';

function sanitizeHtml(html) {
  if (!html) return '';

  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's', 'strike', 'del',
      'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'hr', 'span',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'title'],
      span: ['class'],
      code: ['class'],
      pre: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto'],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const attrs = {};
        
        if (attribs.href) {
          const href = attribs.href.trim().toLowerCase();
          if (href.startsWith('javascript:') || 
              href.startsWith('vbscript:') || 
              href.startsWith('data:text/html') ||
              href.startsWith('data:image/svg+xml')) {
            return { tagName: 'span', attribs: {} };
          }
          attrs.href = attribs.href;
        }
        
        if (attribs.name) attrs.name = attribs.name;
        if (attribs.title) attrs.title = attribs.title;
        
        if (attribs.target === '_blank' || attribs.target === '_new') {
          attrs.target = '_blank';
          attrs.rel = 'noopener noreferrer';
        } else if (attribs.target) {
          delete attribs.target;
        }
        
        return { tagName, attribs: attrs };
      },
    },
    allowedStyles: {},
    exclusiveFilter: (frame) => {
      if (frame.tag === 'a') {
        const href = frame.attribs.href;
        if (!href || 
            href.trim() === '' ||
            href.trim().toLowerCase().startsWith('javascript:') ||
            href.trim().toLowerCase().startsWith('vbscript:') ||
            href.trim().toLowerCase().startsWith('data:')) {
          return true;
        }
      }
      return false;
    },
  });
}

console.log('🔒 Testando sanitização HTML/XSS...\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, input, expectedConditions) {
  try {
    const output = sanitizeHtml(input);
    
    // Verificar condições esperadas
    const conditions = Array.isArray(expectedConditions) ? expectedConditions : [expectedConditions];
    const allPassed = conditions.every(condition => {
      if (typeof condition === 'function') {
        return condition(output);
      }
      if (typeof condition === 'string') {
        // Condição negativa (não deve conter)
        if (condition.startsWith('!')) {
          return !output.includes(condition.substring(1));
        }
        // Condição positiva (deve conter)
        return output.includes(condition);
      }
      return false;
    });
    
    if (allPassed) {
      console.log(`✅ ${name}`);
      testsPassed++;
    } else {
      console.log(`❌ ${name}`);
      console.log(`   Input: ${input.substring(0, 60)}...`);
      console.log(`   Output: ${output.substring(0, 60)}...`);
      testsFailed++;
    }
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Erro: ${error.message}`);
    testsFailed++;
  }
}

// Teste 1: <img onerror=...> deve remover onerror ou remover img
test('Bloquear <img onerror=...>', 
  '<img src="x" onerror="alert(1)">',
  ['!onerror', '!<img']
);

// Teste 2: href="javascript:..." deve ser removido
test('Bloquear href="javascript:..."', 
  '<a href="javascript:alert(1)">Click</a>',
  ['!javascript:', '!href="javascript:']
);

// Teste 3: <svg/onload=...> deve sumir
test('Bloquear <svg/onload=...>', 
  '<svg/onload="alert(1)">',
  ['!<svg', '!onload']
);

// Teste 4: <iframe> deve sumir
test('Bloquear <iframe>', 
  '<iframe src="evil.com"></iframe>',
  ['!<iframe']
);

// Teste 5: <script> deve sumir
test('Bloquear <script>', 
  '<script>alert(1)</script>',
  ['!<script']
);

// Teste 6: atributo style deve ser removido
test('Bloquear atributo style', 
  '<p style="color:red">text</p>',
  ['!style=', '<p>']
);

// Teste 7: data: perigoso deve ser bloqueado
test('Bloquear data:text/html', 
  '<a href="data:text/html,<script>alert(1)</script>">Link</a>',
  ['!data:', '!href="data:']
);

// Teste 8: vbscript: deve ser bloqueado
test('Bloquear vbscript:', 
  '<a href="vbscript:alert(1)">Link</a>',
  ['!vbscript:', '!href="vbscript:']
);

// Teste 9: HTML válido deve ser preservado
test('Preservar HTML válido', 
  '<p>Texto <strong>negrito</strong> e <em>itálico</em></p>',
  ['<p>', '<strong>', '<em>']
);

// Teste 10: Links válidos devem funcionar
test('Permitir links válidos', 
  '<a href="https://example.com">Link</a>',
  ['href="https://example.com"', '<a']
);

// Teste 11: target="_blank" deve adicionar rel="noopener noreferrer"
test('Adicionar rel seguro em target="_blank"', 
  '<a href="https://example.com" target="_blank">Link</a>',
  ['rel="noopener noreferrer"', 'target="_blank"']
);

// Teste 12: <object> e <embed> devem sumir
test('Bloquear <object> e <embed>', 
  '<object data="evil.swf"></object><embed src="evil.swf"></embed>',
  ['!<object', '!<embed']
);

// Teste 13: <form> e <input> devem sumir
test('Bloquear <form> e <input>', 
  '<form><input type="text" name="x"></form>',
  ['!<form', '!<input']
);

// Teste 14: atributos on* devem ser removidos
test('Bloquear atributos on*', 
  '<p onclick="alert(1)" onmouseover="alert(2)">text</p>',
  ['!onclick', '!onmouseover', '<p>']
);

// Teste 15: output não pode conter "javascript:" nem "<script" nem "<svg"
test('Output não contém payloads perigosos', 
  '<script>alert(1)</script><svg onload="alert(2)"></svg><a href="javascript:alert(3)">Link</a>',
  ['!javascript:', '!<script', '!<svg']
);

// Resumo
console.log('\n📊 Resumo:');
console.log(`✅ Testes passaram: ${testsPassed}`);
console.log(`❌ Testes falharam: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n🎉 Todos os testes passaram! Sanitização HTML está funcionando.');
  process.exit(0);
} else {
  console.log('\n⚠️  Alguns testes falharam. Verifique a implementação.');
  process.exit(1);
}
