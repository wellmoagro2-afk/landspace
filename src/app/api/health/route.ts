import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

/**
 * Liveness Check Endpoint
 * GET /api/health
 * Retorna HTTP 200 sempre que o app estiver rodando (sem verificar dependências)
 */
export async function GET(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  
  return jsonWithRequestId(
    {
      ok: true,
      status: 'ok',
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
}
