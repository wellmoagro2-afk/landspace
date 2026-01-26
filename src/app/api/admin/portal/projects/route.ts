import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { protocol: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
        { clientEmail: { contains: search, mode: 'insensitive' } },
      ];
      // Adicionar busca por title apenas se o campo existir (após migration)
      // where.OR.push({ title: { contains: search, mode: 'insensitive' } });
    }

    if (status) {
      where.status = status;
    }

    // Usar findMany sem select explícito para evitar erro se campo title não existir ainda
    // (será incluído automaticamente após migration ser aplicada)
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        // Não usar select explícito - deixar Prisma retornar todos os campos disponíveis
        // Isso evita erro se migration ainda não foi aplicada
      }),
      prisma.project.count({ where }),
    ]);

    // Serializar Decimal para number e remover campos não necessários
    return NextResponse.json({
      projects: projects.map(p => ({
        id: p.id,
        protocol: p.protocol,
        title: (p as any).title || null, // title pode não existir se migration não foi aplicada
        clientName: p.clientName,
        clientEmail: p.clientEmail,
        serviceType: p.serviceType,
        status: p.status,
        totalValue: parseFloat(p.totalValue.toString()),
        paidValue: parseFloat(p.paidValue.toString()),
        balanceValue: parseFloat(p.balanceValue.toString()),
        finalRelease: p.finalRelease,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[Admin List Projects] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao listar projetos' },
      { status: 500 }
    );
  }
}
