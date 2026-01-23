#!/usr/bin/env node
/**
 * Script de verificação de conexão com banco de dados
 * Testa PrismaClient.$connect() e query simples
 * Útil para validar DATABASE_URL antes de iniciar o servidor
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Carregar .env.local manualmente (sem dotenv para evitar dependência)
function loadEnvLocal() {
  const envPath = join(projectRoot, '.env.local');
  if (!existsSync(envPath)) {
    console.error('❌ .env.local não encontrado');
    process.exit(1);
  }

  const envContent = readFileSync(envPath, 'utf-8');
  const envLines = envContent.split('\n');

  envLines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        // Remover aspas se presentes
        const cleanValue = value.replace(/^["']|["']$/g, '');
        process.env[key.trim()] = cleanValue;
      }
    }
  });
}

console.log('=== Verificação de Conexão com Banco de Dados ===\n');

// 1. Carregar .env.local
console.log('[1] Carregando .env.local...');
try {
  loadEnvLocal();
  console.log('   ✓ .env.local carregado');
} catch (error) {
  console.error('   ❌ Erro ao carregar .env.local:', error.message);
  process.exit(1);
}

// 2. Verificar DATABASE_URL
console.log('\n[2] Verificando DATABASE_URL...');
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('   ❌ DATABASE_URL não está definida');
  process.exit(1);
}

// Mostrar início da URL (sem senha completa)
const urlPreview = databaseUrl.substring(0, 50);
console.log(`   ✓ DATABASE_URL está definida (${databaseUrl.length} caracteres)`);
console.log(`   → Preview: ${urlPreview}...`);

// 3. Criar Prisma Client
console.log('\n[3] Criando PrismaClient...');
let prisma;
try {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
  console.log('   ✓ PrismaClient criado com sucesso');
} catch (initError) {
  console.error('   ❌ Erro ao criar PrismaClient:');
  console.error(`      ${initError.message}`);
  console.error(`      Constructor: ${initError.constructor.name}`);
  
  if (initError.message.includes('Error validating datasource') ||
      initError.message.includes('the URL must start with the protocol')) {
    console.error('\n   → CAUSA: DATABASE_URL inválida ou incompatível com provider');
    console.error('   → SOLUÇÃO: Verifique se DATABASE_URL começa com "postgresql://" e está correta');
  }
  
  process.exit(1);
}

// 4. Tentar conectar
console.log('\n[4] Tentando conectar ao banco...');
try {
  await prisma.$connect();
  console.log('   ✓ Conexão estabelecida');
} catch (connectError) {
  console.error('   ❌ Erro ao conectar:');
  console.error(`      ${connectError.message}`);
  console.error(`      Constructor: ${connectError.constructor.name}`);
  
  // Extrair código Prisma se disponível
  if (connectError.code) {
    console.error(`      Código: ${connectError.code}`);
  }
  
  // Classificar erro
  if (connectError.message.includes('P1001') || connectError.message.includes('connection')) {
    console.error('\n   → CAUSA: Banco de dados não está acessível');
    console.error('   → SOLUÇÃO: Verifique se o banco está ativo e acessível (dashboard do provider)');
  } else if (connectError.message.includes('P1000') || connectError.message.includes('authentication')) {
    console.error('\n   → CAUSA: Credenciais inválidas');
    console.error('   → SOLUÇÃO: Verifique USER e PASSWORD na DATABASE_URL');
  } else if (connectError.message.includes('timeout')) {
    console.error('\n   → CAUSA: Timeout de conexão');
    console.error('   → SOLUÇÃO: Verifique firewall/whitelist do provider');
  }
  
  await prisma.$disconnect().catch(() => {});
  process.exit(1);
}

// 5. Testar query simples
console.log('\n[5] Testando query simples (SELECT 1)...');
try {
  await prisma.$queryRaw`SELECT 1`;
  console.log('   ✓ Query executada com sucesso');
} catch (queryError) {
  console.error('   ❌ Erro ao executar query:');
  console.error(`      ${queryError.message}`);
  console.error(`      Constructor: ${queryError.constructor.name}`);
  
  if (queryError.code) {
    console.error(`      Código: ${queryError.code}`);
  }
  
  await prisma.$disconnect().catch(() => {});
  process.exit(1);
}

// 6. Tentar acessar tabela AdminConfig (se existir)
console.log('\n[6] Testando acesso à tabela AdminConfig...');
try {
  const config = await prisma.adminConfig.findUnique({
    where: { key: 'admin_password' },
  });
  console.log(`   ✓ Tabela AdminConfig acessível (config encontrada: ${config ? 'sim' : 'não'})`);
} catch (tableError) {
  console.warn('   ⚠ Erro ao acessar AdminConfig:');
  console.warn(`      ${tableError.message}`);
  console.warn(`      Constructor: ${tableError.constructor.name}`);
  
  if (tableError.code) {
    console.warn(`      Código: ${tableError.code}`);
  }
  
  if (tableError.message.includes('no such table') || 
      tableError.message.includes('does not exist') ||
      tableError.message.includes('P2021')) {
    console.warn('\n   → Tabela não existe - execute: npm run db:migrate:deploy');
  } else {
    console.warn('\n   → Erro ao acessar tabela (pode ser normal se migrations não foram aplicadas)');
  }
  // Não falhar aqui - tabela pode não existir ainda
}

// 7. Desconectar
console.log('\n[7] Desconectando...');
try {
  await prisma.$disconnect();
  console.log('   ✓ Desconectado com sucesso');
} catch (disconnectError) {
  console.warn(`   ⚠ Erro ao desconectar: ${disconnectError.message}`);
}

console.log('\n✅ Verificação concluída - Banco de dados está funcionando!\n');
process.exit(0);
