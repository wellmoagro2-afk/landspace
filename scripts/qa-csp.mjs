#!/usr/bin/env node
/**
 * Pipeline automatizado de QA para CSP no Windows
 * 
 * Etapas:
 * 1. Mata processo na porta 3001
 * 2. Remove .next
 * 3. Garante placeholders de imagens
 * 4. Valida env vars
 * 5. Build (webpack)
 * 6. Inicia servidor na porta 3001
 * 7. Aguarda /api/health OK
 * 8. Roda CSP checks
 * 9. Se falhar, roda debug scripts
 * 10. Sempre mata o servidor no final
 */

import { spawn } from 'child_process';
import { rm, unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Paths absolutos do Windows
const NETSTAT = 'C:\\Windows\\System32\\netstat.exe';
const TASKKILL = 'C:\\Windows\\System32\\taskkill.exe';
const COMSPEC = process.env.ComSpec || `${process.env.SystemRoot || 'C:\\Windows'}\\System32\\cmd.exe`;

// Effective QA mode: se QA_CSP não estiver definido, setar como "1" (default determinístico)
if (!process.env.QA_CSP) {
  process.env.QA_CSP = '1';
  console.log('[QA Mode] QA_CSP não estava definido, setando como "1" (modo determinístico)');
} else {
  console.log(`[QA Mode] QA_CSP=${process.env.QA_CSP} (definido pelo usuário)`);
}

/**
 * Resolve caminho do bin do Next.js
 */
function resolveNextBin() {
  const nextBin = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
  const nextBinJs = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next.js');
  
  // Tentar next primeiro, depois next.js como fallback
  if (existsSync(nextBin)) {
    return nextBin;
  }
  if (existsSync(nextBinJs)) {
    return nextBinJs;
  }
  
  // Fallback: retornar next.js mesmo se não existir (erro será capturado depois)
  return nextBinJs;
}

let serverProcess = null; // Processo do servidor Next.js
let serverPid = null;
let createdPlaceholderFiles = []; // Lista de arquivos placeholder criados (para cleanup)

/**
 * Mata processos na porta 3001
 */
async function killPort3001() {
  console.log('\n[1/10] Matando processos na porta 3001...');
  
  try {
    // Executar netstat
    const netstatOutput = await new Promise((resolve, reject) => {
      const proc = spawn(NETSTAT, ['-ano'], {
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: false,
      });
      
      let stdout = '';
      let stderr = '';
      
      proc.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      proc.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      proc.on('close', (code) => {
        if (code !== 0 && stderr) {
          reject(new Error(`netstat failed: ${stderr}`));
        } else {
          resolve(stdout);
        }
      });
    });
    
    // Parse output para encontrar PIDs com LISTENING na porta 3001
    const lines = netstatOutput.split('\n');
    const pids = new Set();
    
    for (const line of lines) {
      // Formato: TCP    0.0.0.0:3001    0.0.0.0:0    LISTENING    12345
      const match = line.match(/LISTENING\s+(\d+)/);
      if (match) {
        const portMatch = line.match(/:3001\s+/);
        if (portMatch) {
          pids.add(match[1]);
        }
      }
    }
    
    if (pids.size === 0) {
      console.log('   ✓ Nenhum processo encontrado na porta 3001');
      return;
    }
    
    console.log(`   → Encontrados ${pids.size} processo(s): ${Array.from(pids).join(', ')}`);
    
    // Matar cada PID
    for (const pid of pids) {
      await new Promise((resolve, reject) => {
        const proc = spawn(TASKKILL, ['/PID', pid, '/T', '/F'], {
          stdio: ['ignore', 'pipe', 'pipe'],
          shell: false,
        });
        
        let stderr = '';
        
        proc.stderr.on('data', (data) => {
          stderr += data.toString();
        });
        
        proc.on('close', (code) => {
          // taskkill retorna 0 se sucesso, 128 se processo não existe (OK também)
          if (code === 0 || code === 128) {
            console.log(`   ✓ Processo ${pid} encerrado`);
            resolve();
          } else {
            // Ignorar erros de processo não encontrado
            if (stderr.includes('não foi encontrado') || stderr.includes('not found')) {
              console.log(`   ✓ Processo ${pid} já não existe`);
              resolve();
            } else {
              reject(new Error(`taskkill failed for PID ${pid}: ${stderr}`));
            }
          }
        });
      });
    }
    
    // Aguardar um pouco para garantir que a porta foi liberada
    await new Promise(resolve => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.warn(`   ⚠ Aviso ao matar processos: ${error.message}`);
    // Não falhar aqui, continuar
  }
}

/**
 * Remove diretório .next
 */
async function removeNextDir() {
  console.log('\n[2/10] Removendo diretório .next...');
  
  try {
    const nextDir = join(projectRoot, '.next');
    await rm(nextDir, { recursive: true, force: true });
    console.log('   ✓ Diretório .next removido');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('   ✓ Diretório .next não existe (OK)');
    } else {
      throw error;
    }
  }
}

/**
 * Garante que assets de imagem essenciais existam (placeholders)
 * Só executa se QA_CSP=1 estiver definido
 * Retorna lista de arquivos criados para cleanup posterior
 */
async function ensurePlaceholderAssets() {
  // Só executar se QA_CSP=1
  if (process.env.QA_CSP !== '1') {
    console.log('\n[3/10] Garantindo placeholders de imagens...');
    console.log(`   → Skipped (QA_CSP=${process.env.QA_CSP || 'não definido'}, necessário "1")`);
    return [];
  }
  
  console.log('\n[3/10] Garantindo placeholders de imagens...');
  
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['scripts/ensure-placeholder-assets.mjs'], {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (data) => {
      stdout += data.toString();
      // Mostrar logs em tempo real
      const lines = data.toString().split('\n').filter(l => l.trim());
      lines.forEach(line => {
        if (!line.includes('[PLACEHOLDER_RESULT]')) {
          console.log(line);
        }
      });
    });
    
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`ensure-placeholder-assets failed: ${stderr || 'unknown error'}`));
        return;
      }
      
      // Extrair JSON do resultado (regex com flag s para dotall)
      const match = stdout.match(/\[PLACEHOLDER_RESULT\]\s*(\{[\s\S]*?\})\s*\[\/PLACEHOLDER_RESULT\]/);
      if (match && match[1]) {
        try {
          const result = JSON.parse(match[1]);
          createdPlaceholderFiles = result.createdFiles || [];
          console.log(`   ✓ Placeholders verificados (${result.createdCount} criados, ${result.existingCount} já existiam)`);
          resolve(createdPlaceholderFiles);
        } catch (e) {
          console.warn(`   ⚠ Não foi possível parsear resultado dos placeholders: ${e.message}`);
          resolve([]);
        }
      } else {
        console.warn('   ⚠ Não foi possível extrair resultado dos placeholders do stdout');
        resolve([]);
      }
    });
    
    proc.on('error', (error) => {
      reject(new Error(`ensure-placeholder-assets error: ${error.message}`));
    });
  });
}

/**
 * Executa um comando e aguarda conclusão
 * No Windows, se o executável for .cmd ou .bat, executa via cmd.exe
 */
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    // Resolver caminho completo do executável
    let executablePath = command;
    if (!command.includes('\\') && !command.includes('/')) {
      // Comando relativo, tentar resolver
      if (command === 'node') {
        executablePath = process.execPath; // node.exe
      } else {
        executablePath = command;
      }
    }
    
    // Verificar se é .cmd ou .bat no Windows
    const isWindows = process.platform === 'win32';
    const isCmdOrBat = isWindows && (executablePath.endsWith('.cmd') || executablePath.endsWith('.bat'));
    
    let proc;
    let commandStr;
    
    if (isCmdOrBat) {
      // Executar via cmd.exe /d /s /c
      // /d: não executa AutoRun
      // /s: desabilita extensão de comando
      // /c: executa comando e termina
      commandStr = `"${executablePath}" ${args.map(arg => `"${arg}"`).join(' ')}`;
      proc = spawn(COMSPEC, ['/d', '/s', '/c', commandStr], {
        cwd: projectRoot,
        stdio: options.stdio || 'inherit',
        shell: false,
        ...options,
      });
    } else {
      // Executar normalmente
      proc = spawn(executablePath, args, {
        cwd: projectRoot,
        stdio: options.stdio || 'inherit',
        shell: false,
        ...options,
      });
    }
    
    proc.on('close', (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        const cmdDisplay = isCmdOrBat ? `${COMSPEC} /d /s /c "${executablePath}" ${args.join(' ')}` : `${executablePath} ${args.join(' ')}`;
        reject(new Error(`Command failed: ${cmdDisplay}\n  COMSPEC: ${COMSPEC}\n  Exit code: ${code}${signal ? `, Signal: ${signal}` : ''}`));
      }
    });
    
    proc.on('error', (error) => {
      const cmdDisplay = isCmdOrBat ? `${COMSPEC} /d /s /c "${executablePath}" ${args.join(' ')}` : `${executablePath} ${args.join(' ')}`;
      reject(new Error(`Command error: ${cmdDisplay}\n  COMSPEC: ${COMSPEC}\n  Error: ${error.message}`));
    });
  });
}

/**
 * Valida variáveis de ambiente
 */
async function checkEnv() {
  console.log('\n[4/10] Validando variáveis de ambiente...');
  await runCommand('node', ['scripts/check-env.mjs']);
  console.log('   ✓ Variáveis de ambiente validadas');
}

/**
 * Build do projeto
 */
async function build() {
  console.log('\n[5/10] Executando build (webpack)...');
  
  const nextBin = resolveNextBin();
  console.log(`   → Next.js bin: ${nextBin}`);
  console.log(`   → QA_CSP=1 (modo determinístico, sem chamadas externas)`);
  
  await new Promise((resolve, reject) => {
    // Setar QA_CSP=1 para tornar o build determinístico (sem chamadas externas)
    const env = {
      ...process.env,
      QA_CSP: '1',
    };
    
    const proc = spawn(process.execPath, [nextBin, 'build', '--webpack'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: false,
      env,
    });
    
    proc.on('close', (code, signal) => {
      if (code === 0) {
        console.log('   ✓ Build concluído');
        resolve();
      } else {
        reject(new Error(`Build failed: ${process.execPath} ${nextBin} build --webpack\n  Exit code: ${code}${signal ? `, Signal: ${signal}` : ''}`));
      }
    });
    
    proc.on('error', (error) => {
      reject(new Error(`Build error: ${process.execPath} ${nextBin} build --webpack\n  Error: ${error.message}`));
    });
  });
}

/**
 * Inicia servidor Next.js na porta 3001
 */
async function startServer() {
  console.log('\n[6/10] Iniciando servidor na porta 3001...');
  
  const nextBin = resolveNextBin();
  console.log(`   → Next.js bin: ${nextBin}`);
  
  return new Promise((resolve, reject) => {
    // Setar QA_CSP=1 para tornar o pipeline determinístico (sem chamadas externas)
    const env = {
      ...process.env,
      QA_CSP: '1',
    };
    
    const proc = spawn(process.execPath, [nextBin, 'start', '-p', '3001'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: false,
      env,
    });
    
    serverProcess = proc;
    serverPid = proc.pid;
    
    console.log(`   → Servidor iniciado (PID: ${serverPid})`);
    
    // Aguardar um pouco para o servidor iniciar
    setTimeout(() => {
      resolve();
    }, 2000);
    
    proc.on('error', (error) => {
      reject(new Error(`Failed to start server: ${process.execPath} ${nextBin} start -p 3001\n  Error: ${error.message}`));
    });
  });
}

/**
 * Aguarda endpoint /api/health ficar OK (readiness check)
 * Usa 127.0.0.1 preferencialmente, com fallback para localhost
 */
async function waitForHealth() {
  const port = 3001;
  const primaryUrl = `http://127.0.0.1:${port}/api/health`;
  const fallbackUrl = `http://localhost:${port}/api/health`;
  
  console.log(`\n[7/10] Aguardando /api/health ficar OK (readiness check)...`);
  console.log(`   → Tentando: ${primaryUrl}`);
  
  const maxAttempts = 120; // 60s / 500ms = 120
  const delay = 500; // 500ms entre tentativas
  const logInterval = 5; // Logar a cada 5 tentativas
  
  let lastStatus = null;
  let lastBodyPreview = '';
  let useFallback = false;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    try {
      // Usar fallback se 127.0.0.1 falhar por conexão
      const url = useFallback ? fallbackUrl : primaryUrl;
      
      const response = await fetch(url, {
        signal: controller.signal,
      });
      
      const status = response.status;
      let bodyPreview = '';
      let data = null;
      
      try {
        data = await response.json();
        bodyPreview = JSON.stringify(data).substring(0, 80);
      } catch {
        bodyPreview = '(não foi possível parsear JSON)';
      }
      
      // Logar a cada ~5 tentativas ou quando status mudar
      const shouldLog = attempt % logInterval === 0 || attempt === 1 || (lastStatus !== null && status !== lastStatus);
      
      if (shouldLog) {
        console.log(`   [${attempt}/${maxAttempts}] Status: ${status}, Body: ${bodyPreview}`);
      }
      
      lastStatus = status;
      lastBodyPreview = bodyPreview;
      
      // Verificar readiness: HTTP 200 E (ok === true OU status === "ok")
      if (status === 200) {
        const isReady = data && (data.ok === true || data.status === 'ok');
        
        if (isReady) {
          console.log(`   ✓ Health check OK (readiness confirmada na tentativa ${attempt})`);
          clearTimeout(timeoutId);
          return;
        } else {
          // HTTP 200 mas JSON não indica ready - continuar tentando
          if (attempt % logInterval === 0) {
            console.log(`   [${attempt}/${maxAttempts}] HTTP 200 mas JSON não indica ready, continuando...`);
          }
        }
      } else if (status === 503 || status === 500) {
        // 503/500 = ainda não pronto, continuar tentando
        if (attempt % logInterval === 0) {
          console.log(`   [${attempt}/${maxAttempts}] Status ${status} (ainda não pronto), continuando...`);
        }
      } else {
        // Outros status codes - logar mas continuar
        if (attempt % logInterval === 0) {
          console.log(`   [${attempt}/${maxAttempts}] Status ${status}, continuando...`);
        }
      }
    } catch (error) {
      // Se erro de conexão com 127.0.0.1 e ainda não usou fallback, tentar localhost
      if (!useFallback && (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED'))) {
        console.log(`   → Fallback para: ${fallbackUrl}`);
        useFallback = true;
      }
      
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        if (attempt % logInterval === 0) {
          console.log(`   [${attempt}/${maxAttempts}] Timeout na requisição`);
        }
      } else {
        if (attempt % logInterval === 0) {
          console.log(`   [${attempt}/${maxAttempts}] Erro: ${error.message}`);
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
    
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // Log final com última resposta conhecida
  if (lastStatus !== null) {
    console.log(`   ❌ Timeout: última resposta foi Status ${lastStatus}, Body: ${lastBodyPreview}`);
  } else {
    console.log(`   ❌ Timeout: nenhuma resposta recebida`);
  }
  
  throw new Error(`Timeout aguardando /api/health (readiness) - 60s, ${maxAttempts} tentativas`);
}

/**
 * Roda CSP routes check
 */
async function runCspRoutesCheck() {
  console.log('\n[8/10] Executando CSP routes check...');
  
  await runCommand('node', ['scripts/csp-routes-check.mjs'], {
    env: {
      ...process.env,
      BASE_URL: 'http://localhost:3001',
    },
  });
  
  console.log('   ✓ CSP routes check passou');
}

/**
 * Roda debug CSP para rotas específicas
 */
async function runDebugCsp(url) {
  console.log(`\n   → Executando debug CSP para ${url}...`);
  await runCommand('node', ['scripts/debug-csp-strategy.mjs', url]);
}

/**
 * Remove placeholders temporários criados durante o QA
 */
/**
 * Remove placeholders temporários criados durante o QA
 */
async function cleanupPlaceholders() {
  if (createdPlaceholderFiles.length === 0) {
    return;
  }
  
  console.log(`\n[Cleanup] Removendo ${createdPlaceholderFiles.length} placeholder(s) temporário(s) criado(s) pelo pipeline...`);
  
  let removedCount = 0;
  let errorCount = 0;
  
  for (const filePath of createdPlaceholderFiles) {
    try {
      if (existsSync(filePath)) {
        await unlink(filePath);
        removedCount++;
      } else {
        // Arquivo já foi removido ou não existe mais (OK)
      }
    } catch (error) {
      errorCount++;
      console.warn(`   ⚠ Não foi possível remover ${filePath}: ${error.message}`);
    }
  }
  
  if (removedCount > 0) {
    console.log(`   ✓ Removidos ${removedCount} placeholder(s) criado(s) pelo pipeline`);
  }
  
  if (errorCount > 0) {
    console.warn(`   ⚠ ${errorCount} erro(s) ao remover placeholders`);
  } else if (removedCount === 0 && createdPlaceholderFiles.length > 0) {
    console.log(`   → Nenhum placeholder encontrado para remover (já foram removidos ou não existem)`);
  }
  
  // Limpar lista
  createdPlaceholderFiles = [];
}

/**
 * Mata o servidor
 */
async function killServer() {
  if (serverPid) {
    console.log(`\n[Cleanup] Matando servidor (PID: ${serverPid})...`);
    
    try {
      await new Promise((resolve, reject) => {
        const proc = spawn(TASKKILL, ['/PID', String(serverPid), '/T', '/F'], {
          stdio: ['ignore', 'pipe', 'pipe'],
          shell: false,
        });
        
        let stderr = '';
        
        proc.stderr.on('data', (data) => {
          stderr += data.toString();
        });
        
        proc.on('close', (code) => {
          if (code === 0 || code === 128) {
            console.log('   ✓ Servidor encerrado');
            resolve();
          } else {
            if (stderr.includes('não foi encontrado') || stderr.includes('not found')) {
              console.log('   ✓ Servidor já não existe');
              resolve();
            } else {
              reject(new Error(`taskkill failed: ${stderr}`));
            }
          }
        });
      });
    } catch (error) {
      console.warn(`   ⚠ Aviso ao matar servidor: ${error.message}`);
    }
    
    serverPid = null;
    serverProcess = null;
  }
}

/**
 * Main
 */
async function main() {
  let cspCheckFailed = false;
  
  try {
    await killPort3001();
    await removeNextDir();
    await ensurePlaceholderAssets();
    await checkEnv();
    await build();
    await startServer();
    await waitForHealth();
    
    try {
      await runCspRoutesCheck();
    } catch {
      console.error('\n❌ CSP routes check falhou!');
      cspCheckFailed = true;
      
      // Rodar debug scripts
      console.log('\n[9/10] Executando debug scripts...');
      try {
        await runDebugCsp('http://localhost:3001/tech');
      } catch (err) {
        console.error(`   ⚠ Erro no debug /tech: ${err.message}`);
      }
      
      try {
        await runDebugCsp('http://localhost:3001/strategy');
      } catch (err) {
        console.error(`   ⚠ Erro no debug /strategy: ${err.message}`);
      }
    }
    
    if (cspCheckFailed) {
      console.error('\n❌ Pipeline falhou: CSP check não passou');
      process.exitCode = 1;
    } else {
      console.log('\n✅ Pipeline concluído com sucesso!');
      process.exitCode = 0;
    }
    
  } catch (error) {
    console.error(`\n❌ Erro no pipeline: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exitCode = 1;
  } finally {
    await killServer();
    await cleanupPlaceholders();
  }
}

// Executar
main().catch((error) => {
  console.error('Erro fatal:', error);
  process.exitCode = 1;
});
