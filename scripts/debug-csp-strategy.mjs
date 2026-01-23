/* eslint-disable no-console */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:3001/strategy';

async function main() {
  let browser;
  try {
    console.log('=== Debug CSP - Rota /strategy ===');
    console.log('URL:', URL);
    console.log('Abrindo Chromium...\n');

    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    const cspViolations = [];
    const cspWarnings = [];
    const scriptFailures = [];

    // Capturar falhas de requisições de scripts
    page.on('requestfailed', (req) => {
      const resourceType = req.resourceType();
      const url = req.url();
      const isScript = resourceType === 'script' || 
                       (url.includes('/_next/static/') && url.endsWith('.js'));
      
      if (isScript) {
        scriptFailures.push({
          url,
          resourceType,
          errorText: req.failure()?.errorText || 'unknown',
        });
      }
    });

    // Capturar mensagens do console relacionadas a CSP
    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();
      
      if (text.toLowerCase().includes('content security policy') || 
          text.toLowerCase().includes('csp') ||
          text.toLowerCase().includes('violates') ||
          text.toLowerCase().includes('refused to execute script') ||
          text.toLowerCase().includes('violates ... script-src')) {
        if (type === 'error') {
          cspViolations.push({
            type: 'error',
            text,
          });
        } else if (type === 'warning') {
          cspWarnings.push({
            type: 'warning',
            text,
          });
        }
      }
    });

    // Navegar para a URL
    try {
      await page.goto(URL, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      
      // Aguardar um pouco para capturar logs pós-hidratação
      await page.waitForTimeout(500);
    } catch (error) {
      if (error.message.includes('net::ERR_CONNECTION_REFUSED') || 
          error.message.includes('Navigation timeout')) {
        console.error('ERRO: Não foi possível conectar ao servidor.');
        console.error('Certifique-se de que o servidor está rodando na porta especificada.');
        process.exitCode = 1;
        return;
      }
      throw error;
    }

    // Avaliar estilos no DOM
    const styleInfo = await page.evaluate(() => {
      const styles = Array.from(document.querySelectorAll('style'));
      const styleElements = styles.map((style, idx) => {
        const nonce = style.getAttribute('nonce') || null;
        const content = style.textContent || style.innerHTML || '';
        return {
          index: idx,
          nonce,
          length: content.length,
          first80chars: content.substring(0, 80).replace(/\s+/g, ' ').trim(),
        };
      });

      // Verificar adoptedStyleSheets (Shadow DOM)
      let adoptedSheetsInfo = null;
      if (document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0) {
        adoptedSheetsInfo = {
          count: document.adoptedStyleSheets.length,
          sheets: Array.from(document.adoptedStyleSheets).slice(0, 5).map((sheet, idx) => {
            try {
              return {
                index: idx,
                cssRulesCount: sheet.cssRules ? sheet.cssRules.length : 'N/A (não acessível)',
              };
            } catch (e) {
              return {
                index: idx,
                cssRulesCount: 'N/A (erro ao acessar)',
                error: e.message,
              };
            }
          }),
        };
      }

      return {
        totalStyles: styles.length,
        stylesWithNonce: styles.filter(s => s.getAttribute('nonce')).length,
        styleElements: styleElements.slice(0, 10),
        adoptedSheetsInfo,
      };
    });

    // Avaliar scripts no DOM
    const scriptInfo = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      const scriptElements = scripts.map((script) => {
        const src = script.getAttribute('src');
        const nonce = script.getAttribute('nonce') || null;
        const type = script.getAttribute('type') || 'text/javascript';
        const inlineContent = src ? null : (script.textContent || script.innerHTML || '');
        const inlineLen = inlineContent ? inlineContent.length : 0;
        const inlinePreview = inlineContent ? inlineContent.substring(0, 120).replace(/\s+/g, ' ').trim() : null;
        
        return {
          src,
          nonce,
          type,
          inlineLen,
          inlinePreview,
        };
      });

      return {
        totalScripts: scripts.length,
        scriptsWithSrc: scripts.filter(s => s.getAttribute('src')).length,
        scriptsWithSrcNoNonce: scriptElements.filter(s => s.src && !s.nonce),
        inlineScriptsNoNonce: scriptElements.filter(s => !s.src && s.inlineLen > 0 && !s.nonce),
      };
    });

    // Avaliar preloads
    const preloadInfo = await page.evaluate(() => {
      const preloads = Array.from(document.querySelectorAll('link[rel="preload"][as="script"], link[rel="modulepreload"]'));
      const preloadElements = preloads.map((link) => {
        return {
          rel: link.getAttribute('rel'),
          as: link.getAttribute('as'),
          href: link.getAttribute('href'),
          nonce: link.getAttribute('nonce') || null,
          crossorigin: link.getAttribute('crossorigin') || null,
        };
      });

      return {
        totalPreloads: preloads.length,
        preloadsNoNonce: preloadElements.filter(p => !p.nonce),
      };
    });

    // Relatório
    console.log('=== RELATÓRIO ===\n');

    console.log('1. Console Messages (CSP):');
    console.log(`   - Errors: ${cspViolations.length}`);
    console.log(`   - Warnings: ${cspWarnings.length}`);
    
    if (cspViolations.length > 0) {
      console.log('\n   CSP Violations (errors):');
      cspViolations.slice(0, 10).forEach((v, idx) => {
        console.log(`   [${idx + 1}] ${v.text}`);
      });
    }
    
    if (cspWarnings.length > 0) {
      console.log('\n   CSP Warnings:');
      cspWarnings.slice(0, 10).forEach((w, idx) => {
        console.log(`   [${idx + 1}] ${w.text}`);
      });
    }

    console.log('\n2. <style> Elements no DOM:');
    console.log(`   - Total: ${styleInfo.totalStyles}`);
    console.log(`   - Com nonce: ${styleInfo.stylesWithNonce}`);
    console.log(`   - Sem nonce: ${styleInfo.totalStyles - styleInfo.stylesWithNonce}`);

    if (styleInfo.styleElements.length > 0) {
      console.log('\n   Primeiros 10 <style> elements:');
      styleInfo.styleElements.forEach((style, idx) => {
        console.log(`   [${idx + 1}]`);
        console.log(`      nonce: ${style.nonce || '(ausente)'}`);
        console.log(`      length: ${style.length} chars`);
        console.log(`      preview: ${style.first80chars || '(vazio)'}...`);
      });
    }

    if (styleInfo.adoptedSheetsInfo) {
      console.log('\n3. adoptedStyleSheets (Shadow DOM):');
      console.log(`   - Total: ${styleInfo.adoptedSheetsInfo.count}`);
      if (styleInfo.adoptedSheetsInfo.sheets.length > 0) {
        console.log('   - Primeiros 5 sheets:');
        styleInfo.adoptedSheetsInfo.sheets.forEach((sheet, idx) => {
          console.log(`     [${idx + 1}] cssRules: ${sheet.cssRulesCount}`);
          if (sheet.error) {
            console.log(`        erro: ${sheet.error}`);
          }
        });
      }
    } else {
      console.log('\n3. adoptedStyleSheets: não encontrado');
    }

    console.log('\n4. <script> Elements no DOM:');
    console.log(`   - Total: ${scriptInfo.totalScripts}`);
    console.log(`   - Com src: ${scriptInfo.scriptsWithSrc}`);
    console.log(`   - Scripts com src SEM nonce: ${scriptInfo.scriptsWithSrcNoNonce.length}`);

    if (scriptInfo.scriptsWithSrcNoNonce.length > 0) {
      console.log('\n   Scripts com src SEM nonce (primeiros 15):');
      scriptInfo.scriptsWithSrcNoNonce.slice(0, 15).forEach((script, idx) => {
        console.log(`   [${idx + 1}] src: ${script.src || '(sem src)'}`);
      });
    }

    console.log(`   - Scripts inline SEM nonce: ${scriptInfo.inlineScriptsNoNonce.length}`);
    if (scriptInfo.inlineScriptsNoNonce.length > 0) {
      console.log('\n   Scripts inline SEM nonce (primeiros 5):');
      scriptInfo.inlineScriptsNoNonce.slice(0, 5).forEach((script, idx) => {
        console.log(`   [${idx + 1}]`);
        console.log(`      length: ${script.inlineLen} chars`);
        console.log(`      preview: ${script.inlinePreview || '(vazio)'}...`);
      });
    }

    if (scriptFailures.length > 0) {
      console.log('\n   Scripts que falharam ao carregar:');
      scriptFailures.forEach((failure, idx) => {
        console.log(`   [${idx + 1}]`);
        console.log(`      url: ${failure.url}`);
        console.log(`      resourceType: ${failure.resourceType}`);
        console.log(`      error: ${failure.errorText}`);
      });
    }

    console.log('\n5. link preload/modulepreload:');
    console.log(`   - Total: ${preloadInfo.totalPreloads}`);
    console.log(`   - Preloads SEM nonce: ${preloadInfo.preloadsNoNonce.length}`);

    if (preloadInfo.preloadsNoNonce.length > 0) {
      console.log('\n   Preloads SEM nonce (primeiros 15):');
      preloadInfo.preloadsNoNonce.slice(0, 15).forEach((preload, idx) => {
        console.log(`   [${idx + 1}]`);
        console.log(`      rel: ${preload.rel}`);
        console.log(`      as: ${preload.as || '(não especificado)'}`);
        console.log(`      href: ${preload.href || '(sem href)'}`);
        console.log(`      crossorigin: ${preload.crossorigin || '(não especificado)'}`);
      });
    }

    console.log('\n=== FIM DO RELATÓRIO ===');
    process.exitCode = 0;
  } catch (error) {
    console.error('ERROR:', error?.message || error);
    if (browser) {
      await browser.close();
    }
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

main();
