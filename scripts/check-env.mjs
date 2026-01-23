#!/usr/bin/env node
/**
 * Script de validação de variáveis de ambiente
 * Verifica se todas as variáveis obrigatórias estão configuradas
 * antes do build/start
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Detectar se estamos em CI/Vercel
const isCI = 
  process.env.CI === 'true' || 
  process.env.CI === '1' ||
  process.env.VERCEL === '1' || 
  !!process.env.VERCEL_ENV ||
  !!process.env.VERCEL_URL;

// Verificar se .env.local existe
const envLocalPath = join(projectRoot, '.env.local');
const envPath = join(projectRoot, '.env');
const hasEnvFile = existsSync(envLocalPath) || existsSync(envPath);

// Em CI/Vercel, não exigir .env.local (variáveis vêm de Environment Variables)
if (!hasEnvFile && !isCI) {
  console.error('\n❌ Arquivo .env.local não encontrado!\n');
  console.log('📋 Para resolver:');
  console.log('  1. Copie o arquivo .env.example para .env.local:');
  console.log('     cp .env.example .env.local\n');
  console.log('  2. Edite .env.local e configure as variáveis obrigatórias\n');
  console.log('  3. Execute este script novamente\n');
  process.exit(1);
}

if (isCI && !hasEnvFile) {
  console.log('ℹ️  Modo CI/Vercel detectado: variáveis vêm de Environment Variables (não é necessário .env.local)\n');
}

// Carregar variáveis de ambiente do arquivo .env.local (apenas se existir)
// Em CI/Vercel, variáveis já vêm de Environment Variables, mas ainda podemos carregar .env.local se existir
if (existsSync(envLocalPath)) {
  const envContent = readFileSync(envLocalPath, 'utf-8');
  const envLines = envContent.split('\n');
  
  envLines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        // Remover aspas se presentes
        const cleanValue = value.replace(/^["']|["']$/g, '');
        // Só sobrescrever se não estiver já definido (prioridade para env vars do sistema/CI)
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = cleanValue;
        }
      }
    }
  });
} else if (existsSync(envPath)) {
  // Tentar carregar .env também (fallback)
  const envContent = readFileSync(envPath, 'utf-8');
  const envLines = envContent.split('\n');
  
  envLines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = cleanValue;
        }
      }
    }
  });
}

// Tentar importar e validar env.ts
try {
  // Detectar provider do Prisma (fail-fast antes de validar env)
  const schemaPath = join(projectRoot, 'prisma', 'schema.prisma');
  let prismaProvider = 'postgresql'; // default
  
  if (existsSync(schemaPath)) {
    try {
      const schemaContent = readFileSync(schemaPath, 'utf-8');
      // Buscar provider no datasource
      const providerMatch = schemaContent.match(/datasource\s+\w+\s*\{[^}]*provider\s*=\s*["'](\w+)["']/s);
      if (providerMatch && providerMatch[1]) {
        prismaProvider = providerMatch[1].toLowerCase();
      }
    } catch (e) {
      console.warn('⚠️  Não foi possível ler prisma/schema.prisma, usando validação padrão');
    }
  }

  // Validar DATABASE_URL conforme o provider (fail-fast)
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('\n❌ DATABASE_URL não está configurada!\n');
    process.exit(1);
  }

  // Validação específica por provider
  if (prismaProvider === 'sqlite') {
    // SQLite requer prefixo "file:"
    if (!databaseUrl.startsWith('file:')) {
      console.error('\n❌ DATABASE_URL inválida para SQLite!\n');
      console.error('   SQLite requer prefixo "file:" no DATABASE_URL.\n');
      console.error('   Exemplo correto:');
      console.error('   DATABASE_URL="file:./dev.db"\n');
      console.error('   ou');
      console.error('   DATABASE_URL="file:./prisma/dev.db"\n');
      process.exit(1);
    }
  } else if (prismaProvider === 'postgresql') {
    // PostgreSQL requer protocolo postgresql:// ou postgres://
    if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
      console.error('\n❌ DATABASE_URL inválida para PostgreSQL!\n');
      console.error('   PostgreSQL requer protocolo "postgresql://" ou "postgres://".\n');
      console.error('   Exemplo correto:');
      console.error('   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"\n');
      process.exit(1);
    }
  } else if (prismaProvider === 'mysql') {
    // MySQL requer protocolo mysql://
    if (!databaseUrl.startsWith('mysql://')) {
      console.error('\n❌ DATABASE_URL inválida para MySQL!\n');
      console.error('   MySQL requer protocolo "mysql://".\n');
      console.error('   Exemplo correto:');
      console.error('   DATABASE_URL="mysql://user:password@localhost:3306/dbname"\n');
      process.exit(1);
    }
  }
  // Outros providers (mongodb, etc.) - validação básica de protocolo
  else if (!databaseUrl.includes('://')) {
    console.error(`\n❌ DATABASE_URL inválida para ${prismaProvider}!\n`);
    console.error('   DATABASE_URL deve conter um protocolo válido (ex: "protocolo://...").\n');
    process.exit(1);
  }

  // Importar e validar env.ts
  // Nota: Em produção, isso pode falhar se env.ts não estiver compilado
  // Mas serve como validação pré-build
  let ENV;
  try {
    // Tentar importar como módulo TypeScript (requer tsx ou ts-node)
    // Se falhar, vamos validar manualmente
    const envModule = await import('../src/lib/env.ts');
    ENV = envModule.ENV;
  } catch (e) {
    // Fallback: validar manualmente as variáveis obrigatórias
    const required = ['SESSION_SECRET', 'DATABASE_URL', 'PREVIEW_SECRET', 'ADMIN_PASSWORD'];
    const missing = required.filter(key => !process.env[key] || process.env[key].trim() === '');
    
    if (missing.length > 0) {
      console.error('\n❌ Variáveis obrigatórias faltando:\n');
      missing.forEach(key => {
        console.error(`   - ${key}`);
      });
      console.error('\n');
      if (isCI) {
        console.error('💡 Em CI/Vercel, configure essas variáveis nas Environment Variables do projeto.\n');
      } else {
        console.error('💡 Configure essas variáveis no arquivo .env.local\n');
      }
      process.exit(1);
    }
    
    // Validar comprimentos mínimos
    if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
      console.error('\n❌ SESSION_SECRET deve ter no mínimo 32 caracteres\n');
      process.exit(1);
    }
    
    if (process.env.PREVIEW_SECRET && process.env.PREVIEW_SECRET.length < 32) {
      console.error('\n❌ PREVIEW_SECRET deve ter no mínimo 32 caracteres\n');
      process.exit(1);
    }
    
    if (process.env.ADMIN_KEY && process.env.ADMIN_KEY.length < 24) {
      console.error('\n❌ ADMIN_KEY deve ter no mínimo 24 caracteres se configurado\n');
      process.exit(1);
    }
    
    if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length === 0) {
      console.error('\n❌ ADMIN_PASSWORD não pode estar vazio\n');
      process.exit(1);
    }
    
    console.log('\n✅ Variáveis obrigatórias validadas!\n');
    process.exit(0);
  }

  console.log('\n✅ Variáveis de ambiente validadas com sucesso!\n');
  
  // Listar variáveis configuradas (sem mostrar valores)
  console.log('📋 Variáveis configuradas:');
  console.log(`   - SESSION_SECRET: ${ENV.SESSION_SECRET ? '✅' : '❌'}`);
  console.log(`   - DATABASE_URL: ${ENV.DATABASE_URL ? '✅' : '❌'} (provider: ${prismaProvider})`);
  console.log(`   - PREVIEW_SECRET: ${ENV.PREVIEW_SECRET ? '✅' : '❌'}`);
  if (ENV.ADMIN_KEY) console.log(`   - ADMIN_KEY: ✅`);
  if (ENV.DRAFT_MODE_SECRET) console.log(`   - DRAFT_MODE_SECRET: ✅`);
  if (ENV.REDIS_URL) console.log(`   - REDIS_URL: ✅`);
  if (ENV.NEXT_PUBLIC_MAPBOX_TOKEN) console.log(`   - NEXT_PUBLIC_MAPBOX_TOKEN: ✅`);
  if (ENV.NEXT_PUBLIC_SITE_URL) console.log(`   - NEXT_PUBLIC_SITE_URL: ✅`);
  
  console.log('\n🚀 Pronto para build/start!\n');
  
} catch (error) {
  console.error('\n❌ Erro ao validar variáveis de ambiente:\n');
  console.error(error.message);
  console.error('\n');
  process.exit(1);
}
