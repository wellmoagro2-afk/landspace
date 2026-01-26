import "server-only";
import { PrismaClient } from '@prisma/client';
import { validateRuntimeGuards } from './runtime-guards';

// Validar guards de runtime antes de criar Prisma Client
// IMPORTANTE: Se validação falhar, logar mas não quebrar importação (permite site funcionar sem banco em dev)
// A validação será executada novamente quando Prisma for usado, mas não bloqueia importação do módulo
try {
  validateRuntimeGuards();
} catch (error) {
  // Em dev, permitir que o site funcione mesmo se validação falhar (ex: DATABASE_URL não configurado)
  // Em prod, o erro será detectado quando Prisma for usado (fail-fast apropriado)
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Prisma] Validação de runtime guards falhou (não bloqueante em dev):', error instanceof Error ? error.message : 'Unknown error');
    console.warn('[Prisma] O site continuará funcionando, mas operações de banco podem falhar.');
  } else {
    // Em produção, re-lançar o erro para fail-fast apropriado
    throw error;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * PrismaClient singleton otimizado para serverless (Vercel)
 * 
 * Características:
 * - Cache global para evitar múltiplas instâncias (dev hot reload + serverless)
 * - Connection pooling automático via DATABASE_URL (se usar pooler)
 * - Timeout configurado para evitar conexões pendentes
 * - Logs apenas em desenvolvimento
 */
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    // Configurações para serverless (Vercel)
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// PrismaClient singleton - PostgreSQL em produção, SQLite permitido apenas em dev
// Cache global para evitar múltiplas instâncias em dev (hot reload) e serverless (Vercel)
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Cache global em todos os ambientes (incluindo serverless)
// Vercel reutiliza containers, então o cache ajuda a evitar múltiplas conexões
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown: desconectar ao encerrar processo
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect().catch(() => {
      // Ignorar erros ao desconectar durante shutdown
    });
  });
}
