import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { cleanupOldUploads, getUploadsStats } from '@/lib/upload-cleanup';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';

/**
 * GET - Estatísticas de uploads
 */
export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);
  
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        ),
        requestId
      );
    }

    const stats = await getUploadsStats();

    return addRequestIdHeader(
      NextResponse.json({
        stats: {
          ...stats,
          totalSizeMB: (stats.totalSizeBytes / (1024 * 1024)).toFixed(2),
        },
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin cleanup stats: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao obter estatísticas' },
        { status: 500 }
      ),
      requestId
    );
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
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        ),
        requestId
      );
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

    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        result,
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin cleanup: erro', {
      requestId,
      action: AuditActions.UPLOAD_CLEANUP,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao executar limpeza' },
        { status: 500 }
      ),
      requestId
    );
  }
}
