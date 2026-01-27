import { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { cleanupOldUploads, getUploadsStats } from '@/lib/upload-cleanup';
import { getRequestId, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { jsonOk, jsonError } from '@/lib/api-response';

/**
 * GET - Estatísticas de uploads
 */
export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);
  
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return jsonError(request, {
        status: 401,
        code: 'unauthorized',
        message: 'Não autorizado',
      });
    }

    const stats = await getUploadsStats();

    return jsonOk(request, {
      stats: {
        ...stats,
        totalSizeMB: (stats.totalSizeBytes / (1024 * 1024)).toFixed(2),
      },
    });
  } catch (error) {
    logStructured('error', 'Admin cleanup stats: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao obter estatísticas',
    });
  }
}

/**
 * POST - Executar limpeza de uploads antigos
 */
export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return jsonError(request, {
        status: 401,
        code: 'unauthorized',
        message: 'Não autorizado',
      });
    }

    const result = await cleanupOldUploads();

    // Registrar auditoria
    await auditLog({
      requestId,
      action: AuditActions.UPLOAD_CLEANUP,
      ipAddress: clientIP,
      userAgent,
      metadata: result,
      success: true,
    });

    logStructured('info', 'Admin cleanup: executado', {
      requestId,
      action: AuditActions.UPLOAD_CLEANUP,
      ...result,
    });

    return jsonOk(request, {
      success: true,
      result,
    });
  } catch (error) {
    logStructured('error', 'Admin cleanup: erro', {
      requestId,
      action: AuditActions.UPLOAD_CLEANUP,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao executar limpeza',
    });
  }
}
