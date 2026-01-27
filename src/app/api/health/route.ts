import { NextRequest } from 'next/server';
import { jsonOk } from '@/lib/api-response';

/**
 * Liveness Check Endpoint
 * GET /api/health
 * Retorna HTTP 200 sempre que o app estiver rodando (sem verificar dependências)
 */
export async function GET(request: NextRequest) {
  return jsonOk(request, {
    ok: true,
    status: 'ok',
    ts: new Date().toISOString(),
  });
}
