import { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError } from '@/lib/api-response';

/**
 * Endpoint temporário de debug para listar projetos
 * REMOVER EM PRODUÇÃO
 */
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

    const projects = await prisma.project.findMany({
      select: {
        id: true,
        protocol: true,
        clientName: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return jsonOk(request, {
      total: projects.length,
      projects: projects.map(p => ({
        id: p.id,
        protocol: p.protocol,
        protocolLength: p.protocol.length,
        protocolChars: p.protocol.split('').map((c) => ({ char: c, code: c.charCodeAt(0) })),
        clientName: p.clientName,
        status: p.status,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error('[Debug Projects] Erro:', error);
    return jsonError(request, {
      status: 500,
      code: 'internal_error',
      message: 'Erro ao buscar projetos',
    });
  }
}
