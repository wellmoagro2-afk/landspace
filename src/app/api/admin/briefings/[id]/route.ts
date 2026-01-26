import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateBriefingSchema } from '@/lib/schemas/briefings';
import { logSafe } from '@/lib/logger';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

// GET - Obter briefing por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = getOrCreateRequestId(request);
  await requireAdmin();
  
  const { id } = await params;
  const briefing = await prisma.briefing.findUnique({
    where: { id },
  });

  if (!briefing) {
    return jsonWithRequestId(
      { error: 'Briefing não encontrado' },
      { status: 404 },
      requestId
    );
  }

  return jsonWithRequestId({
    ...briefing,
    tags: JSON.parse(briefing.tags || '[]'),
    relatedMaps: briefing.relatedMaps ? JSON.parse(briefing.relatedMaps) : null,
  }, {}, requestId);
}

// PUT - Atualizar briefing
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = getOrCreateRequestId(request);
  await requireAdmin();
  
  try {
    const { id } = await params;
    const body = await request.json().catch(() => null);
    if (!body) {
      return jsonWithRequestId({ error: 'invalid_input' }, { status: 400 }, requestId);
    }

    // Validação Zod
    const validation = updateBriefingSchema.safeParse(body);
    if (!validation.success) {
      logSafe('warn', 'Update briefing: Zod validation failed', {
        requestId,
        briefingId: id,
        errors: validation.error.flatten().fieldErrors,
      });
      return jsonWithRequestId({ error: 'invalid_input' }, { status: 400 }, requestId);
    }

    const data = validation.data;

    const briefing = await prisma.briefing.update({
      where: { id },
      data: {
        ...(data.slug && { slug: data.slug }),
        ...(data.title && { title: data.title }),
        ...(data.subtitle !== undefined && { subtitle: data.subtitle || null }),
        ...(data.summary && { summary: data.summary }),
        ...(data.tags !== undefined && { tags: JSON.stringify(data.tags || []) }),
        ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl || null }),
        ...(data.readingTime && { readingTime: data.readingTime }),
        ...(data.contentMdx !== undefined && { contentMdx: data.contentMdx }),
        ...(data.status && { status: data.status }),
        ...(data.publishedAt !== undefined && {
          publishedAt: data.status === 'published' && !data.publishedAt ? new Date() : data.publishedAt,
        }),
        ...(data.seoTitle !== undefined && { seoTitle: data.seoTitle || null }),
        ...(data.seoDescription !== undefined && { seoDescription: data.seoDescription || null }),
        ...(data.pdfUrl !== undefined && { pdfUrl: data.pdfUrl || null }),
        ...(data.youtubeUrl !== undefined && { youtubeUrl: data.youtubeUrl || null }),
        ...(data.relatedMaps !== undefined && {
          relatedMaps: data.relatedMaps ? JSON.stringify(data.relatedMaps) : null,
        }),
      },
    });

    logSafe('info', 'Update briefing: success', {
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
    logSafe('error', 'Update briefing: internal error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return jsonWithRequestId(
      { error: 'Erro ao atualizar briefing' },
      { status: 400 },
      requestId
    );
  }
}

// DELETE - Deletar briefing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = getOrCreateRequestId(request);
  await requireAdmin();
  
  const { id } = await params;
  
  try {
    await prisma.briefing.delete({
      where: { id },
    });

    logSafe('info', 'Delete briefing: success', {
      requestId,
      briefingId: id,
    });

    return jsonWithRequestId({ success: true }, {}, requestId);
  } catch (error) {
    logSafe('error', 'Delete briefing: internal error', {
      requestId,
      briefingId: id,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return jsonWithRequestId(
      { error: 'Erro ao deletar briefing' },
      { status: 400 },
      requestId
    );
  }
}
