/**
 * Script de teste para POST /api/admin/login
 * Lê ADMIN_PASSWORD do .env.local e testa diferentes cenários
 * 
 * Uso: node scripts/test-admin-login.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Carregar .env.local manualmente (sem dependência de dotenv)
function loadEnvLocal() {
  try {
    const envPath = join(rootDir, '.env.local');
    const content = readFileSync(envPath, 'utf-8');
    const lines = content.split('\n');
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        // Remover aspas se presentes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        env[key] = value;
      }
    }
    return env;
  } catch (error) {
    console.warn('[test-admin-login] Não foi possível carregar .env.local:', error.message);
    return {};
  }
}

const envLocal = loadEnvLocal();

// URL do teste: ADMIN_LOGIN_URL (prioridade 1) ou default
const ADMIN_LOGIN_URL = process.env.ADMIN_LOGIN_URL || envLocal.ADMIN_LOGIN_URL || 'http://127.0.0.1:3000/api/admin/login';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || envLocal.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('❌ ADMIN_PASSWORD não encontrado em .env.local');
  process.exit(1);
}

console.log('🧪 Testando POST /api/admin/login\n');
console.log(`URL: ${ADMIN_LOGIN_URL}`);
console.log(`ADMIN_PASSWORD definida: ${ADMIN_PASSWORD ? 'sim' : 'não'} (tamanho: ${ADMIN_PASSWORD?.length || 0})\n`);

async function testLogin(password, expectedStatus, description) {
  try {
    const response = await fetch(ADMIN_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-request-id': 'test-' + Date.now(),
      },
      body: JSON.stringify({ password }),
    });

    const body = await response.json().catch(() => ({ error: 'Failed to parse JSON' }));
    const hasCookie = response.headers.get('set-cookie')?.includes('ls_admin_session');
    const requestId = response.headers.get('x-request-id');

    const statusMatch = response.status === expectedStatus;
    const icon = statusMatch ? '✅' : '❌';

    console.log(`${icon} ${description}`);
    console.log(`   Status: ${response.status} (esperado: ${expectedStatus})`);
    console.log(`   Body: ${JSON.stringify(body)}`);
    console.log(`   x-request-id: ${requestId || 'ausente'}`);
    console.log(`   Set-Cookie: ${hasCookie ? 'presente' : 'ausente'}`);
    console.log('');

    return statusMatch;
  } catch (error) {
    console.error(`❌ ${description}`);
    console.error(`   Erro: ${error.message}`);
    console.log('');
    return false;
  }
}

// Teste 1: Senha correta
await testLogin(ADMIN_PASSWORD, 200, 'Senha correta');

// Teste 2: Senha errada
await testLogin('senha_errada', 401, 'Senha incorreta');

// Teste 3: Body inválido (sem password)
try {
  const response = await fetch(ADMIN_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-request-id': 'test-invalid-' + Date.now(),
    },
    body: JSON.stringify({}),
  });
  const body = await response.json().catch(() => ({}));
  const statusMatch = response.status === 400;
  console.log(`${statusMatch ? '✅' : '❌'} Body inválido (sem password)`);
  console.log(`   Status: ${response.status} (esperado: 400)`);
  console.log(`   Body: ${JSON.stringify(body)}`);
  console.log('');
} catch (error) {
  console.error(`❌ Body inválido (sem password)`);
  console.error(`   Erro: ${error.message}`);
  console.log('');
}

// Teste 4: JSON malformado
try {
  const response = await fetch(ADMIN_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-request-id': 'test-malformed-' + Date.now(),
    },
    body: '{ invalid json }',
  });
  const body = await response.json().catch(() => ({}));
  const statusMatch = response.status === 400;
  console.log(`${statusMatch ? '✅' : '❌'} JSON malformado`);
  console.log(`   Status: ${response.status} (esperado: 400)`);
  console.log(`   Body: ${JSON.stringify(body)}`);
  console.log('');
} catch (error) {
  console.error(`❌ JSON malformado`);
  console.error(`   Erro: ${error.message}`);
  console.log('');
}

// Teste 5: Rate limiting (5 tentativas por minuto)
console.log('🔄 Testando rate limiting (5 tentativas por minuto)...');
console.log('   Enviando payload válido {password:"wrong"} repetidamente...');
console.log('   Esperado: 401 até a 5ª tentativa, depois 429');
console.log('');

let rateLimitHit = false;
const validPayload = { password: 'wrong' }; // Payload válido (senha errada)

for (let i = 1; i <= 7; i++) {
  try {
    const response = await fetch(ADMIN_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-request-id': `test-ratelimit-${i}-${Date.now()}`,
      },
      body: JSON.stringify(validPayload),
    });
    const body = await response.json().catch(() => ({}));
    
    if (response.status === 429) {
      rateLimitHit = true;
      const hasRequestId = body.requestId || response.headers.get('x-request-id');
      const hasRetryAfter = response.headers.get('retry-after');
      console.log(`✅ Rate limit ativado na tentativa ${i}`);
      console.log(`   Status: ${response.status} (esperado: 429)`);
      console.log(`   Body: ${JSON.stringify(body)}`);
      console.log(`   x-request-id: ${hasRequestId || 'ausente'}`);
      console.log(`   Retry-After: ${hasRetryAfter || 'ausente'}`);
      console.log('');
      break;
    } else if (response.status === 401) {
      // Esperado nas primeiras 5 tentativas
      if (i <= 5) {
        console.log(`✅ Tentativa ${i}: 401 (esperado - credenciais inválidas)`);
      } else {
        console.log(`⚠️  Tentativa ${i}: 401 (esperava 429 após 5 tentativas)`);
      }
    } else {
      console.log(`⚠️  Tentativa ${i}: Status inesperado ${response.status}`);
      console.log(`   Body: ${JSON.stringify(body)}`);
    }
    
    if (i === 7 && !rateLimitHit) {
      console.log(`⚠️  Rate limit não foi ativado após 7 tentativas`);
      console.log(`   Último status: ${response.status}`);
      console.log(`   Body: ${JSON.stringify(body)}`);
      console.log('');
    }
  } catch (error) {
    console.error(`❌ Erro na tentativa ${i} do rate limit test`);
    console.error(`   Erro: ${error.message}`);
    console.log('');
  }
  
  // Pequeno delay entre tentativas (10ms)
  await new Promise(resolve => setTimeout(resolve, 10));
}

if (!rateLimitHit) {
  console.log('⚠️  Rate limit não foi detectado (pode estar funcionando, mas não foi ativado nas 7 tentativas)');
  console.log('');
}

console.log('✅ Testes concluídos');
