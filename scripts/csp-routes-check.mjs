import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || process.env.CSP_CHECK_URL || 'http://localhost:3000';

const ROUTES = [
  '/',
  '/tech',
  '/studio',
  '/strategy',
  '/academy',
  '/labs',
];

const CSP_VIOLATION_KEYWORDS = [
  'Content Security Policy',
  'violates the following Content Security Policy directive',
  'Refused to execute',
  'Refused to apply',
  'was blocked',
];

function isCSPViolation(message) {
  const lowerMessage = message.toLowerCase();
  return CSP_VIOLATION_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
}

/**
 * Extrai hashes permitidos do directive style-src-attr do CSP
 */
function extractStyleSrcAttrHashes(cspHeader) {
  const hashes = [];
  // Buscar style-src-attr (pode estar em qualquer lugar do CSP)
  const styleSrcAttrMatch = cspHeader.match(/style-src-attr\s+([^;]+)/i);
  
  if (styleSrcAttrMatch) {
    const directive = styleSrcAttrMatch[1];
    // Extrair todos os hashes sha256- (Base64 padrão: A-Za-z0-9+/=)
    const hashMatches = directive.match(/sha256-[A-Za-z0-9+/=]+/g);
    if (hashMatches) {
      hashes.push(...hashMatches);
    }
  }
  
  return hashes;
}

async function testRoute(context, route) {
  const page = await context.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  const cspViolations = [];

  // Capturar mensagens do console
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    
    if (type === 'warning' || type === 'error') {
      consoleMessages.push({ type, text });
      
      if (isCSPViolation(text)) {
        cspViolations.push({ source: 'console', type, message: text });
      }
    }
  });

  // Capturar erros de página
  page.on('pageerror', (error) => {
    const message = error.message;
    pageErrors.push({ message, stack: error.stack });
    
    if (isCSPViolation(message)) {
      cspViolations.push({ source: 'pageerror', type: 'error', message });
    }
  });

  let response;
  let status = 0;
  let cspHeader = '';
  let nonceHeader = '';
  let hasUnsafeInline = false;
  let nonceInCSP = false;
  
  // Inicializar variáveis de inline styles (sempre definidas)
  let inlineStyleEntries = [];
  let missingAttrHashes = [];

  try {
    response = await page.goto(BASE_URL + route, {
      waitUntil: 'networkidle',
      timeout: 15000,
    });

    if (response) {
      status = response.status();
      
      // Obter headers do response
      const headers = response.headers();
      cspHeader = String(headers['content-security-policy'] || headers['Content-Security-Policy'] || '');
      nonceHeader = String(headers['x-nonce'] || headers['X-Nonce'] || '');

      // Validar CSP
      if (cspHeader) {
        // Verificar unsafe-inline apenas em script-src, style-src e style-src-elem (não em style-src-attr)
        // Regex precisa evitar capturar script-src-elem e style-src-attr
        const scriptSrcMatch = cspHeader.match(/script-src\s+([^;]+)/i);
        const styleSrcMatch = cspHeader.match(/style-src\s+([^;]+)/i);
        const styleSrcElemMatch = cspHeader.match(/style-src-elem\s+([^;]+)/i);
        
        const scriptSrcValue = scriptSrcMatch ? scriptSrcMatch[1] : '';
        const styleSrcValue = styleSrcMatch ? styleSrcMatch[1] : '';
        const styleSrcElemValue = styleSrcElemMatch ? styleSrcElemMatch[1] : '';
        
        hasUnsafeInline = 
          (scriptSrcValue.includes("'unsafe-inline'") || scriptSrcValue.includes('unsafe-inline')) ||
          (styleSrcValue.includes("'unsafe-inline'") || styleSrcValue.includes('unsafe-inline')) ||
          (styleSrcElemValue.includes("'unsafe-inline'") || styleSrcElemValue.includes('unsafe-inline'));
        
        if (nonceHeader) {
          const noncePattern = `nonce-${nonceHeader}`;
          nonceInCSP = 
            cspHeader.includes(`script-src`) && 
            (cspHeader.includes(`script-src 'self' '${noncePattern}'`) ||
             cspHeader.includes(`script-src-elem 'self' '${noncePattern}'`) ||
             cspHeader.includes(`'${noncePattern}'`)) &&
            cspHeader.includes(`style-src`) &&
            (cspHeader.includes(`style-src 'self' '${noncePattern}'`) ||
             cspHeader.includes(`style-src-elem 'self' '${noncePattern}'`) ||
             cspHeader.includes(`'${noncePattern}'`));
        }
      }

      // Aguardar logs pós-hidratação
      await page.waitForTimeout(1500);

      // Detectar inline style attributes e validar hashes
      inlineStyleEntries = await page.evaluate(async () => {
        const styles = Array.from(document.querySelectorAll('[style]'))
          .map(el => el.getAttribute('style') || '')
          .filter(Boolean);
        const uniq = Array.from(new Set(styles));

        async function sha256Base64(str) {
          const data = new TextEncoder().encode(str);
          const hashBuf = await crypto.subtle.digest('SHA-256', data);
          const bytes = new Uint8Array(hashBuf);
          let bin = '';
          for (const b of bytes) bin += String.fromCharCode(b);
          return btoa(bin);
        }

        const out = [];
        for (const s of uniq) {
          out.push({ style: s, hash: 'sha256-' + (await sha256Base64(s)) });
        }
        return out;
      });
      
      // Extrair hashes permitidos do CSP style-src-attr
      if (cspHeader) {
        // Se style-src-attr contém 'unsafe-inline', não há hashes faltantes
        const styleSrcAttrMatch = cspHeader.match(/style-src-attr\s+([^;]+)/i);
        if (styleSrcAttrMatch) {
          const styleSrcAttrValue = styleSrcAttrMatch[1];
          if (styleSrcAttrValue.includes("'unsafe-inline'") || styleSrcAttrValue.includes('unsafe-inline')) {
            // style-src-attr permite tudo via unsafe-inline, então missing = 0
            missingAttrHashes = [];
          } else {
            // Caso contrário, verificar hashes específicos
            const allowedHashes = extractStyleSrcAttrHashes(cspHeader);
            const allowedAttrHashes = new Set(allowedHashes);
            missingAttrHashes = inlineStyleEntries.filter(x => !allowedAttrHashes.has(x.hash));
          }
        }
      }
    }
  } catch (error) {
    if (error.message.includes('net::ERR_CONNECTION_REFUSED') || 
        error.message.includes('Navigation timeout')) {
      throw new Error(`Não foi possível conectar ao servidor em ${BASE_URL}. Certifique-se de que o servidor está rodando: npm.cmd run start`);
    }
    throw error;
  } finally {
    await page.close();
  }

  // Verificar redirects
  let location = '';
  if (response && (status >= 300 && status < 400)) {
    location = response.headers()['location'] || response.headers()['Location'] || '';
  }

  return {
    route,
    status,
    location,
    hasCSP: !!cspHeader,
    hasNonce: !!nonceHeader,
    hasUnsafeInline,
    nonceInCSP,
    consoleMessages: consoleMessages.length,
    cspViolations: cspViolations.length,
    pageErrors: pageErrors.length,
    inlineStylesCount: inlineStyleEntries.length,
    missingStyleHashes: missingAttrHashes.length,
    details: {
      cspHeader: cspHeader.substring(0, 200) + (cspHeader.length > 200 ? '...' : ''),
      nonceHeader,
      consoleMessages: consoleMessages.slice(0, 5),
      cspViolations: cspViolations.slice(0, 5),
      pageErrors: pageErrors.slice(0, 5),
      missingStyleHashes: missingAttrHashes,
    },
  };
}

function hasFailure(result) {
  return (
    result.status !== 200 ||
    !result.hasCSP ||
    !result.hasNonce ||
    result.hasUnsafeInline ||
    !result.nonceInCSP ||
    result.cspViolations > 0 ||
    result.pageErrors > 0 ||
    (result.missingStyleHashes || 0) > 0
  );
}

async function main() {
  let browser;
  try {
    console.log('=== CSP Routes Check (Playwright) ===');
    console.log('BASE_URL:', BASE_URL);
    console.log('Rotas a testar:', ROUTES.join(', '));
    console.log('');

    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext();
    const results = [];

    for (const route of ROUTES) {
      console.log(`Testando rota: ${route}`);
      
      try {
        const result = await testRoute(context, route);
        results.push(result);

        // Relatório por rota
        console.log(`  Status: ${result.status}${result.location ? ` (redirect para: ${result.location})` : ''}`);
        console.log(`  Tem CSP?: ${result.hasCSP ? '✅' : '❌'}`);
        console.log(`  Tem x-nonce?: ${result.hasNonce ? '✅' : '❌'}`);
        console.log(`  unsafe-inline?: ${result.hasUnsafeInline ? '❌ SIM' : '✅ NÃO'}`);
        console.log(`  Nonce do header encontrado no CSP?: ${result.nonceInCSP ? '✅' : '❌'}`);
        console.log(`  Console warnings/errors: ${result.consoleMessages}`);
        console.log(`  CSP violations: ${result.cspViolations}`);
        console.log(`  Page errors: ${result.pageErrors}`);
        console.log(`  Inline style attrs (unique): ${result.inlineStylesCount}`);
        console.log(`  Missing style-src-attr hashes: ${result.missingStyleHashes}`);

        if (result.missingStyleHashes > 0) {
          console.log(`  ⚠️  Hashes de style="" não permitidos no CSP:`);
          result.details.missingStyleHashes.forEach((item) => {
            const stylePreview = item.style.length > 120 
              ? item.style.slice(0, 120) 
              : item.style;
            console.log(`     - ${item.hash}  style="${stylePreview}"`);
          });
        }

        if (result.cspViolations > 0) {
          console.log(`  ⚠️  Violações de CSP detectadas:`);
          result.details.cspViolations.forEach((v, idx) => {
            console.log(`     [${idx + 1}] ${v.source.toUpperCase()} (${v.type}): ${v.message.substring(0, 100)}`);
          });
        }

        if (result.pageErrors > 0) {
          console.log(`  ⚠️  Erros de página:`);
          result.details.pageErrors.forEach((e, idx) => {
            console.log(`     [${idx + 1}] ${e.message.substring(0, 100)}`);
          });
        }

        console.log('');
      } catch (error) {
        console.error(`  ❌ ERRO ao testar ${route}:`, error.message);
        results.push({
          route,
          status: 0,
          hasCSP: false,
          hasNonce: false,
          hasUnsafeInline: false,
          nonceInCSP: false,
          consoleMessages: 0,
          cspViolations: 0,
          pageErrors: 0,
          inlineStylesCount: 0,
          missingStyleHashes: 0,
          error: error.message,
          details: {
            cspHeader: '',
            nonceHeader: '',
            consoleMessages: [],
            cspViolations: [],
            pageErrors: [],
            missingStyleHashes: [],
          },
        });
        console.log('');
      }
    }

    await browser.close();

    // Resumo final
    console.log('='.repeat(60));
    console.log('RESUMO FINAL');
    console.log('='.repeat(60));
    console.log(`Total de rotas testadas: ${results.length}`);
    
    const passed = results.filter(r => !hasFailure(r)).length;
    const failed = results.filter(r => hasFailure(r)).length;
    
    console.log(`Rotas que passaram: ${passed}`);
    console.log(`Rotas que falharam: ${failed}`);

    if (failed > 0) {
      console.log('');
      console.log('Rotas com problemas:');
      results.filter(r => hasFailure(r)).forEach(r => {
        const issues = [];
        if (r.status !== 200) issues.push(`status=${r.status}`);
        if (!r.hasCSP) issues.push('sem CSP');
        if (!r.hasNonce) issues.push('sem x-nonce');
        if (r.hasUnsafeInline) issues.push('unsafe-inline');
        if (!r.nonceInCSP) issues.push('nonce não bate');
        if (r.cspViolations > 0) issues.push(`${r.cspViolations} CSP violations`);
        if (r.pageErrors > 0) issues.push(`${r.pageErrors} page errors`);
        if ((r.missingStyleHashes || 0) > 0) issues.push(`${r.missingStyleHashes} missing style hashes`);
        if (r.error) issues.push(`erro: ${r.error}`);
        
        console.log(`  ❌ ${r.route}: ${issues.join(', ')}`);
      });
    }

    console.log('='.repeat(60));

    if (failed > 0) {
      console.log('RESULT: ❌ Algumas rotas falharam na verificação de CSP');
      process.exitCode = 1;
    } else {
      console.log('RESULT: ✅ Todas as rotas passaram na verificação de CSP');
      process.exitCode = 0;
    }
  } catch (error) {
    console.error('ERROR:', error?.message || error);
    if (browser) {
      await browser.close();
    }
    process.exitCode = 1;
  }
}

main();
