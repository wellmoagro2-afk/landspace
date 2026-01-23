import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { getRequestId, addRequestIdHeader } from '@/lib/observability';

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

    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const protocol = searchParams.get('protocol');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (action) {
      where.action = action;
    }

    if (protocol) {
      where.protocol = protocol;
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    // Parse metadata JSON
    const logsWithParsedMetadata = logs.map((log) => ({
      ...log,
      metadata: log.metadata ? JSON.parse(log.metadata) : null,
    }));

    return addRequestIdHeader(
      NextResponse.json({
        logs: logsWithParsedMetadata,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      }),
      requestId
    );
  } catch (error) {
    console.error('[Admin Audit] Erro:', error);
    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao buscar logs de auditoria' },
        { status: 500 }
      ),
      requestId
    );
  }
}
