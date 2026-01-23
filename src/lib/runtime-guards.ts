/**
 * Runtime Guards
 * Validações críticas que impedem a aplicação de iniciar em configurações inseguras
 */

import { ENV, isProduction } from './env';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Validar que não está usando SQLite em produção
 */
export function validateDatabaseProvider() {
  if (!isProduction) {
    return; // Permitir SQLite em desenvolvimento
  }

  const databaseUrl = ENV.DATABASE_URL.toLowerCase();
  
  // Detectar SQLite por padrões comuns na URL
  if (
    databaseUrl.includes('sqlite') ||
    databaseUrl.includes('file:') ||
    databaseUrl.startsWith('./') ||
    databaseUrl.endsWith('.db') ||
    databaseUrl.endsWith('.sqlite')
  ) {
    throw new Error(
      'SQLite não é permitido em produção. ' +
      'Configure DATABASE_URL com uma URL PostgreSQL válida. ' +
      'Exemplo: postgresql://user:password@localhost:5432/landspace'
    );
  }

  // Validar que é uma URL PostgreSQL válida
  if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
    throw new Error(
      'DATABASE_URL deve ser uma URL PostgreSQL válida em produção. ' +
      'Formato esperado: postgresql://user:password@host:port/database'
    );
  }
}

/**
 * Validar compatibilidade DATABASE_URL vs provider do schema
 * Fail-fast: impede inicialização se houver incompatibilidade
 */
export function validateDatabaseUrlCompatibility() {
  const databaseUrl = ENV.DATABASE_URL;
  
  // Ler provider do schema.prisma
  const schemaPath = join(process.cwd(), 'prisma', 'schema.prisma');
  if (!existsSync(schemaPath)) {
    // Se schema não existe, pular validação (pode ser ambiente de build sem schema)
    return;
  }
  
  let provider: string;
  try {
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    // Usar [\s\S] em vez de . com flag s para compatibilidade
    const providerMatch = schemaContent.match(/datasource\s+\w+\s*\{[\s\S]*?provider\s*=\s*["'](\w+)["']/);
    
    if (!providerMatch || !providerMatch[1]) {
      // Provider não encontrado - pular validação
      return;
    }
    
    provider = providerMatch[1].toLowerCase();
  } catch (error) {
    // Erro ao ler schema - pular validação (não bloquear startup)
    console.warn('[validateDatabaseUrlCompatibility] Não foi possível ler schema.prisma:', error instanceof Error ? error.message : 'Unknown error');
    return;
  }
  
  // Validar compatibilidade
  if (provider === 'sqlite') {
    if (!databaseUrl.startsWith('file:')) {
      throw new Error(
        `DATABASE_URL incompatível com provider SQLite.\n` +
        `Provider: ${provider}, DATABASE_URL: ${databaseUrl.substring(0, 50)}${databaseUrl.length > 50 ? '...' : ''}\n` +
        `SQLite requer prefixo "file:". Exemplo: DATABASE_URL="file:./dev.db"`
      );
    }
  } else if (provider === 'postgresql') {
    if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
      throw new Error(
        `DATABASE_URL incompatível com provider PostgreSQL.\n` +
        `Provider: ${provider}, DATABASE_URL: ${databaseUrl.substring(0, 50)}${databaseUrl.length > 50 ? '...' : ''}\n` +
        `PostgreSQL requer protocolo "postgresql://" ou "postgres://".\n` +
        `Exemplo: DATABASE_URL="postgresql://user:password@localhost:5432/dbname"`
      );
    }
  } else if (provider === 'mysql') {
    if (!databaseUrl.startsWith('mysql://')) {
      throw new Error(
        `DATABASE_URL incompatível com provider MySQL.\n` +
        `Provider: ${provider}, DATABASE_URL: ${databaseUrl.substring(0, 50)}${databaseUrl.length > 50 ? '...' : ''}\n` +
        `MySQL requer protocolo "mysql://".`
      );
    }
  }
  // Outros providers (mongodb, etc.) - validação básica já feita em validateDatabaseProvider
}

/**
 * Executar todas as validações de runtime
 */
export function validateRuntimeGuards() {
  validateDatabaseProvider(); // Validação existente (SQLite em prod)
  validateDatabaseUrlCompatibility(); // NOVA: Valida compatibilidade DATABASE_URL vs provider
}
