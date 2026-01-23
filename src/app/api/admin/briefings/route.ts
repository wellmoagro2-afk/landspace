import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createBriefingSchema } from '@/lib/schemas/briefings';
import { logSafe } from '@/lib/logger';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

// GET - Listar briefings
export async function GET(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  await requireAdmin();
  
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status && status !== 'all') {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { summary: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [briefings, total] = await Promise.all([
    prisma.briefing.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.briefing.count({ where }),
  ]);

  return jsonWithRequestId({
    briefings: briefings.map(b => ({
      ...b,
      tags: JSON.parse(b.tags || '[]'),
      relatedMaps: b.relatedMaps ? JSON.parse(b.relatedMaps) : null,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }, {}, requestId);
}

// POST - Criar briefing
export async function POST(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  await requireAdmin();
  
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return jsonWithRequestId({ error: 'invalid_input' }, { status: 400 }, requestId);
    }

    // Validação Zod
    const validation = createBriefingSchema.safeParse(body);
    if (!validation.success) {
      logSafe('warn', 'Create briefing: Zod validation failed', {
        requestId,
        errors: validation.error.flatten().fieldErrors,
      });
      return jsonWithRequestId({ error: 'invalid_input' }, { status: 400 }, requestId);
    }

    const data = validation.data;
    
    const briefing = await prisma.briefing.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle || null,
        summary: data.summary,
        tags: JSON.stringify(data.tags || []),
        coverImageUrl: data.coverImageUrl || null,
        readingTime: data.readingTime || '5 min',
        contentMdx: data.contentMdx || '',
        status: data.status || 'draft',
        publishedAt: data.status === 'published' ? new Date() : null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        pdfUrl: data.pdfUrl || null,
        youtubeUrl: data.youtubeUrl || null,
        relatedMaps: data.relatedMaps ? JSON.stringify(data.relatedMaps) : null,
      },
    });

    logSafe('info', 'Create briefing: success', {
      requestId,
      briefingId: briefing.id,
      slug: briefing.slug,
    });

    return jsonWithRequestId({
      ...briefing,
      tags: JSON.parse(briefing.tags || '[]'),
      relatedMaps: briefing.relatedMaps ? JSON.parse(briefing.relatedMaps) : null,
    }, {}, requestId);
  } catch (error) {
    logSafe('error', 'Create briefing: internal error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return jsonWithRequestId(
      { error: 'Erro ao criar briefing' },
      { status: 400 },
      requestId
    );
  }
}
