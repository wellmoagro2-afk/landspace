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
    }

    if (status) {
      where.status = status;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          protocol: true,
          clientName: true,
          clientEmail: true,
          serviceType: true,
          status: true,
          totalValue: true,
          paidValue: true,
          balanceValue: true,
          finalRelease: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.project.count({ where }),
    ]);

    // Serializar Decimal para number
    return NextResponse.json({
      projects: projects.map(p => ({
        ...p,
        totalValue: parseFloat(p.totalValue.toString()),
        paidValue: parseFloat(p.paidValue.toString()),
        balanceValue: parseFloat(p.balanceValue.toString()),
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
