import "server-only";
import { PrismaClient } from '@prisma/client';
import { validateRuntimeGuards } from './runtime-guards';

// Validar guards de runtime antes de criar Prisma Client
validateRuntimeGuards();

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
