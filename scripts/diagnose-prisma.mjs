#!/usr/bin/env node
/**
 * Script de diagnóstico do Prisma
 * Testa conexão e identifica problemas de configuração
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('=== Diagnóstico Prisma ===\n');

// 1. Verificar schema.prisma
console.log('[1] Verificando prisma/schema.prisma...');
const schemaPath = join(projectRoot, 'prisma', 'schema.prisma');
let providerMatch = null;
if (existsSync(schemaPath)) {
  const schemaContent = readFileSync(schemaPath, 'utf-8');
  providerMatch = schemaContent.match(/datasource\s+\w+\s*\{[^}]*provider\s*=\s*["'](\w+)["']/s);
  const urlMatch = schemaContent.match(/url\s*=\s*env\(["'](\w+)["']\)/);
  
  if (providerMatch) {
    console.log(`   ✓ Provider: ${providerMatch[1]}`);
  } else {
    console.log('   ❌ Provider não encontrado no schema');
  }
  
  if (urlMatch) {
    console.log(`   ✓ URL env var: ${urlMatch[1]}`);
  }
} else {
  console.log('   ❌ schema.prisma não encontrado');
}

// 2. Verificar DATABASE_URL
console.log('\n[2] Verificando DATABASE_URL...');
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log('   ❌ DATABASE_URL não está definida');
  process.exit(1);
}

console.log(`   ✓ DATABASE_URL está definida (${databaseUrl.length} caracteres)`);
console.log(`   → Prefixo: ${databaseUrl.substring(0, 20)}...`);

// Validar formato conforme provider
if (providerMatch && providerMatch[1] === 'sqlite') {
  if (!databaseUrl.startsWith('file:')) {
    console.log('   ❌ SQLite requer prefixo "file:"');
    console.log('   → Exemplo correto: DATABASE_URL="file:./dev.db"');
    process.exit(1);
  } else {
    console.log('   ✓ Formato SQLite válido');
  }
} else if (providerMatch && providerMatch[1] === 'postgresql') {
  if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
    console.log('   ❌ PostgreSQL requer protocolo "postgresql://" ou "postgres://"');
    process.exit(1);
  } else {
    console.log('   ✓ Formato PostgreSQL válido');
  }
}

// 3. Tentar criar Prisma Client
console.log('\n[3] Tentando criar PrismaClient...');
try {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
  console.log('   ✓ PrismaClient criado com sucesso');
  
  // 4. Tentar conectar
  console.log('\n[4] Tentando conectar ao banco...');
  await prisma.$connect();
  console.log('   ✓ Conexão estabelecida');
  
  // 5. Tentar query simples
  console.log('\n[5] Testando query simples...');
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('   ✓ Query executada com sucesso');
  } catch (queryError) {
    console.log('   ❌ Erro ao executar query:');
    console.log(`      ${queryError.message}`);
    if (queryError.message.includes('no such table') || queryError.message.includes('does not exist')) {
      console.log('   → Tabelas não existem - execute: npx prisma migrate dev');
    }
  }
  
  // 6. Tentar acessar AdminConfig
  console.log('\n[6] Testando acesso à tabela AdminConfig...');
  try {
    const config = await prisma.adminConfig.findUnique({
      where: { key: 'admin_password' },
    });
    console.log(`   ✓ Tabela AdminConfig acessível (config encontrada: ${config ? 'sim' : 'não'})`);
  } catch (tableError) {
    console.log('   ❌ Erro ao acessar AdminConfig:');
    console.log(`      ${tableError.message}`);
    console.log(`      Constructor: ${tableError.constructor.name}`);
    
    if (tableError.message.includes('no such table') || 
        tableError.message.includes('does not exist') ||
        tableError.message.includes('P2021')) {
      console.log('   → Tabela não existe - execute: npx prisma migrate dev');
    } else if (tableError.message.includes('Error validating datasource') ||
               tableError.message.includes('the URL must start with the protocol')) {
      console.log('   → DATABASE_URL inválida - verifique o formato');
    } else {
      console.log('   → Erro de conexão/DB - verifique se o banco está rodando');
    }
  }
  
  await prisma.$disconnect();
  console.log('\n✅ Diagnóstico concluído - Prisma está funcionando');
  process.exit(0);
} catch (initError) {
  console.log('   ❌ Erro ao criar PrismaClient:');
  console.log(`      ${initError.message}`);
  console.log(`      Constructor: ${initError.constructor.name}`);
  
  if (initError.message.includes('Error validating datasource') ||
      initError.message.includes('the URL must start with the protocol')) {
    console.log('\n   → CAUSA RAIZ: DATABASE_URL inválida');
    console.log('   → SOLUÇÃO: Corrija o formato da DATABASE_URL no .env.local');
    if (providerMatch && providerMatch[1] === 'sqlite') {
      console.log('      Exemplo: DATABASE_URL="file:./dev.db"');
    } else {
      console.log('      Exemplo: DATABASE_URL="postgresql://user:password@localhost:5432/dbname"');
    }
  } else if (initError.message.includes('P1001') || initError.message.includes('connection')) {
    console.log('\n   → CAUSA RAIZ: Banco de dados não está acessível');
    console.log('   → SOLUÇÃO: Verifique se o PostgreSQL está rodando e acessível');
  } else {
    console.log('\n   → CAUSA RAIZ: Erro de inicialização do Prisma');
    console.log('   → SOLUÇÃO: Execute: npx prisma generate');
  }
  
  process.exit(1);
}
