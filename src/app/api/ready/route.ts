import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError } from '@/lib/api-response';

/**
 * Readiness Check Endpoint
 * GET /api/ready
 * Verifica dependências (banco de dados) e retorna 200/503 conforme disponibilidade
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar conectividade com banco de dados com timeout curto
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 3000)
      ),
    ]);

    return jsonOk(request, {
      ok: true,
      status: 'ready',
      ts: new Date().toISOString(),
    });
  } catch (error) {
    // Não expor stack trace em produção
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Readiness check falhou:', errorMessage);
    
    return jsonError(request, {
      status: 503,
      code: 'not_ready',
      message: 'Serviço não está pronto',
      details: {
        ok: false,
        status: 'not ready',
        ts: new Date().toISOString(),
      },
    });
  }
}
