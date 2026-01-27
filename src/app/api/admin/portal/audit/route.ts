import { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return jsonError(request, {
        status: 401,
        code: 'unauthorized',
        message: 'Não autorizado',
      });
    }

    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const protocol = searchParams.get('protocol');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: {
      action?: string;
      protocol?: string;
    } = {};

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

    return jsonOk(request, {
      logs: logsWithParsedMetadata,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[Admin Audit] Erro:', error);
    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao buscar logs de auditoria',
    });
  }
}
