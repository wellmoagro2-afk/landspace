import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';
import { logSafe } from '@/lib/logger';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

export async function POST(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  
  try {
    await logout();
    logSafe('info', 'Admin logout: success', { requestId });
    return jsonWithRequestId({ success: true }, {}, requestId);
  } catch (error) {
    logSafe('error', 'Admin logout: internal error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return jsonWithRequestId(
      { error: 'Erro ao fazer logout' },
      { status: 500 },
      requestId
    );
  }
}
