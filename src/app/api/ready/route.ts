import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

/**
 * Readiness Check Endpoint
 * GET /api/ready
 * Verifica dependências (banco de dados) e retorna 200/503 conforme disponibilidade
 */
export async function GET(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  
  try {
    // Verificar conectividade com banco de dados com timeout curto
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 3000)
      ),
    ]);

    return jsonWithRequestId(
      {
        ok: true,
        status: 'ready',
        ts: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
      requestId
    );
  } catch (error) {
    // Não expor stack trace em produção
    console.error('Readiness check falhou:', error instanceof Error ? error.message : 'Erro desconhecido', { requestId });
    return jsonWithRequestId(
      {
        ok: false,
        status: 'not ready',
        ts: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
      requestId
    );
  }
}
