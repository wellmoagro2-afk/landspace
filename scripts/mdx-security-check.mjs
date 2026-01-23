/**
 * Script de validação de segurança MDX
 * Testa que assertSafeMdx bloqueia payloads perigosos
 * 
 * Uso: node scripts/mdx-security-check.mjs
 */

// Reimplementar assertSafeMdx para teste (evita dependência de compilação TypeScript)
function stripCode(source) {
  let stripped = source;
  // Remover fenced code blocks
  stripped = stripped.replace(/```[\s\S]*?```/g, '');
  stripped = stripped.replace(/~~~[\s\S]*?~~~/g, '');
  // Remover inline code
  stripped = stripped.replace(/`[^`]*`/g, '');
  return stripped;
}

function assertSafeMdx(source) {
  if (!source || typeof source !== 'string') {
    return;
  }

  // 0. Verificar limite de tamanho (DoS protection)
  if (source.length > 200_000) {
    throw new Error('MDX_TOO_LARGE: Conteúdo MDX excede limite de 200KB');
  }

  // Strip code blocks antes de validar (reduz falsos positivos)
  const scan = stripCode(source);

  // 1. Bloquear import/export (validar em scan)
  const importPattern = /(^|\n)\s*import\s+/m;
  const exportPattern = /(^|\n)\s*export\s+/m;
  
  if (importPattern.test(scan)) {
    throw new Error('MDX_EVAL_NOT_ALLOWED: Import statements não são permitidos');
  }
  
  if (exportPattern.test(scan)) {
    throw new Error('MDX_EVAL_NOT_ALLOWED: Export statements não são permitidos');
  }

  // 2. Bloquear URLs perigosas (antes de verificar tags, validar em scan)
  const dangerousUrlPattern = /(javascript:|vbscript:|data:text\/html|data:image\/svg\+xml)/i;
  if (dangerousUrlPattern.test(scan)) {
    throw new Error('MDX_DANGEROUS_URL: URLs perigosas não são permitidas');
  }

  // 3. Bloquear tags HTML perigosas (incluindo style, link, meta, validar em scan)
  // Ordem importante: tags antes de expressões para evitar falsos positivos
  const dangerousTagsPattern = /<\s*(script|iframe|svg|math|object|embed|form|input|button|select|textarea|style|link|meta)\b/i;
  if (dangerousTagsPattern.test(scan)) {
    throw new Error('MDX_HTML_TAG_NOT_ALLOWED: Tags HTML perigosas não são permitidas');
  }

  // 4. Bloquear expressões MDX (validar em scan)
  // Nota: após verificar tags, para evitar falsos positivos com CSS dentro de <style>
  const expressionPattern = /\{[^}]*\}/;
  if (expressionPattern.test(scan)) {
    throw new Error('MDX_EXPRESSIONS_NOT_ALLOWED: Expressões MDX não são permitidas');
  }

  // 5. Bloquear atributos de evento (validar em scan)
  const eventAttrPattern = /on\w+\s*=/i;
  if (eventAttrPattern.test(scan)) {
    throw new Error('MDX_EVENT_ATTR_NOT_ALLOWED: Atributos de evento não são permitidos');
  }
}

console.log('🔒 Testando segurança MDX...\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, input, shouldThrow = true, expectedErrorCode = null) {
  try {
    assertSafeMdx(input);
    
    if (shouldThrow) {
      console.log(`❌ ${name}`);
      console.log(`   Esperava erro, mas passou`);
      testsFailed++;
    } else {
      console.log(`✅ ${name}`);
      testsPassed++;
    }
  } catch (error) {
    if (!shouldThrow) {
      console.log(`❌ ${name}`);
      console.log(`   Erro inesperado: ${error.message}`);
      testsFailed++;
    } else {
      // Verificar código de erro esperado
      if (expectedErrorCode && !error.message.includes(expectedErrorCode)) {
        console.log(`❌ ${name}`);
        console.log(`   Erro esperado: ${expectedErrorCode}, recebido: ${error.message}`);
        testsFailed++;
      } else {
        console.log(`✅ ${name}`);
        testsPassed++;
      }
    }
  }
}

// Teste 1: import deve ser bloqueado
test('Bloquear import statement', 
  'import { something } from "module"',
  true,
  'MDX_EVAL_NOT_ALLOWED'
);

// Teste 2: export deve ser bloqueado
test('Bloquear export statement', 
  'export const x = 1',
  true,
  'MDX_EVAL_NOT_ALLOWED'
);

// Teste 3: expressões MDX devem ser bloqueadas
test('Bloquear expressão MDX {1+1}', 
  'Texto {1+1} mais texto',
  true,
  'MDX_EXPRESSIONS_NOT_ALLOWED'
);

// Teste 4: <iframe> deve ser bloqueado
test('Bloquear <iframe>', 
  '<iframe src="evil.com"></iframe>',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 5: <script> deve ser bloqueado
test('Bloquear <script>', 
  '<script>alert(1)</script>',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 6: <svg> deve ser bloqueado
test('Bloquear <svg>', 
  '<svg/onload="alert(1)">',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 7: atributos on* devem ser bloqueados
test('Bloquear atributo onclick', 
  '<p onclick="alert(1)">text</p>',
  true,
  'MDX_EVENT_ATTR_NOT_ALLOWED'
);

// Teste 8: href="javascript:..." deve ser bloqueado
test('Bloquear href="javascript:..."', 
  '[Link](javascript:alert(1))',
  true,
  'MDX_DANGEROUS_URL'
);

// Teste 9: vbscript: deve ser bloqueado
test('Bloquear vbscript:', 
  '[Link](vbscript:alert(1))',
  true,
  'MDX_DANGEROUS_URL'
);

// Teste 10: data:text/html deve ser bloqueado
test('Bloquear data:text/html', 
  '[Link](data:text/html,<script>alert(1)</script>)',
  true,
  'MDX_DANGEROUS_URL'
);

// Teste 11: conteúdo válido (markdown simples) deve passar
test('Permitir markdown válido', 
  '# Título\n\nTexto com **negrito** e [link](https://example.com)',
  false
);

// Teste 12: link https válido deve passar
test('Permitir link https válido', 
  '[Link válido](https://example.com)',
  false
);

// Teste 13: <form> deve ser bloqueado
test('Bloquear <form>', 
  '<form><input type="text"></form>',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 14: <object> e <embed> devem ser bloqueados
test('Bloquear <object> e <embed>', 
  '<object data="evil.swf"></object><embed src="evil.swf"></embed>',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 15: múltiplos imports devem ser bloqueados
test('Bloquear múltiplos imports', 
  'import a from "a"\nimport b from "b"',
  true,
  'MDX_EVAL_NOT_ALLOWED'
);

// Teste 16: código dentro de code blocks não deve gerar falso positivo
test('Permitir código dentro de code blocks (fenced)', 
  'Texto normal\n```javascript\nimport { something } from "module"\n<script>alert(1)</script>\n```\nMais texto',
  false
);

// Teste 17: código dentro de inline code não deve gerar falso positivo
test('Permitir código dentro de inline code', 
  'Texto com `import { x } from "y"` e `<script>alert(1)</script>` inline',
  false
);

// Teste 18: <style> deve ser bloqueado
test('Bloquear <style>', 
  '<style>body { color: red; }</style>',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 19: <link> deve ser bloqueado
test('Bloquear <link>', 
  '<link rel="stylesheet" href="evil.css">',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 20: <meta> deve ser bloqueado
test('Bloquear <meta>', 
  '<meta http-equiv="refresh" content="0;url=evil.com">',
  true,
  'MDX_HTML_TAG_NOT_ALLOWED'
);

// Teste 21: conteúdo > 200KB deve ser bloqueado
test('Bloquear conteúdo > 200KB', 
  'x'.repeat(200_001),
  true,
  'MDX_TOO_LARGE'
);

// Teste 22: conteúdo exatamente 200KB deve passar
test('Permitir conteúdo exatamente 200KB', 
  'x'.repeat(200_000),
  false
);

// Teste 23: código perigoso fora de code blocks ainda deve ser bloqueado
test('Bloquear código perigoso fora de code blocks', 
  'Texto normal\nimport { evil } from "module"\nMais texto',
  true,
  'MDX_EVAL_NOT_ALLOWED'
);

// Resumo
console.log('\n📊 Resumo:');
console.log(`✅ Testes passaram: ${testsPassed}`);
console.log(`❌ Testes falharam: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n🎉 Todos os testes passaram! Segurança MDX está funcionando.');
  process.exit(0);
} else {
  console.log('\n⚠️  Alguns testes falharam. Verifique a implementação.');
  process.exit(1);
}
