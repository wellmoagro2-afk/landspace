import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';

/**
 * Endpoint temporário de debug para listar projetos
 * REMOVER EM PRODUÇÃO
 */
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
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

    return NextResponse.json({
      total: projects.length,
      projects: projects.map(p => ({
        id: p.id,
        protocol: p.protocol,
        protocolLength: p.protocol.length,
        protocolChars: p.protocol.split('').map((c, i) => ({ char: c, code: c.charCodeAt(0) })),
        clientName: p.clientName,
        status: p.status,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error('[Debug Projects] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar projetos' },
      { status: 500 }
    );
  }
}
