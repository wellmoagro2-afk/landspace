import { chromium } from 'playwright';

const URL = process.env.BASE_URL || process.env.CSP_CHECK_URL || 'http://localhost:3000/';

const CSP_VIOLATION_KEYWORDS = [
  'Content Security Policy',
  'violates the following Content Security Policy directive',
  'Refused to execute script',
  'Refused to apply style',
  'Applying inline style violates',
];

async function main() {
  let browser;
  try {
    console.log('=== CSP Console Check (Playwright) ===');
    console.log('URL:', URL);
    console.log('Abrindo Chromium...\n');

    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleMessages = [];
    const pageErrors = [];

    // Capturar mensagens do console
    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      
      if (type === 'warning' || type === 'error') {
        consoleMessages.push({
          type,
          text,
        });
      }
    });

    // Capturar erros de página
    page.on('pageerror', (error) => {
      pageErrors.push({
        message: error.message,
        stack: error.stack,
      });
    });

    // Navegar para a URL
    try {
      await page.goto(URL, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      // Aguardar logs pós-hidratação
      await page.waitForTimeout(1500);
    } catch (error) {
      if (error.message.includes('net::ERR_CONNECTION_REFUSED') || 
          error.message.includes('Navigation timeout')) {
        console.error('ERRO: Não foi possível conectar ao servidor.');
        console.error('Certifique-se de que o servidor está rodando: npm.cmd run start');
        process.exitCode = 1;
        return;
      }
      throw error;
    }

    // Verificar violações de CSP
    const cspViolations = [];

    // Verificar mensagens do console
    for (const msg of consoleMessages) {
      const text = msg.text.toLowerCase();
      if (CSP_VIOLATION_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()))) {
        cspViolations.push({
          source: 'console',
          type: msg.type,
          message: msg.text,
        });
      }
    }

    // Verificar erros de página
    for (const error of pageErrors) {
      const message = error.message.toLowerCase();
      if (CSP_VIOLATION_KEYWORDS.some(keyword => message.includes(keyword.toLowerCase()))) {
        cspViolations.push({
          source: 'pageerror',
          type: 'error',
          message: error.message,
        });
      }
    }

    // Relatório
    console.log('Mensagens do console (warnings/errors):', consoleMessages.length);
    console.log('Erros de página:', pageErrors.length);
    console.log('Violações de CSP detectadas:', cspViolations.length);
    console.log('');

    if (cspViolations.length > 0) {
      console.log('⚠️  VIOLAÇÕES DE CSP DETECTADAS:');
      console.log('='.repeat(60));
      
      const reportLines = cspViolations.slice(0, 20).map((violation, idx) => {
        return `[${idx + 1}] ${violation.source.toUpperCase()} (${violation.type}):\n   ${violation.message}`;
      });
      
      console.log(reportLines.join('\n\n'));
      
      if (cspViolations.length > 20) {
        console.log(`\n... e mais ${cspViolations.length - 20} violação(ões)`);
      }
      
      console.log('='.repeat(60));
      console.log('\nRESULT: ❌ CSP violations encontradas no Chromium do Playwright');
      process.exitCode = 1;
    } else {
      console.log('RESULT: ✅ Console limpo (sem CSP violations no Chromium do Playwright)');
      process.exitCode = 0;
    }

    await browser.close();
  } catch (error) {
    console.error('ERROR:', error?.message || error);
    if (browser) {
      await browser.close();
    }
    process.exitCode = 1;
  }
}

main();
