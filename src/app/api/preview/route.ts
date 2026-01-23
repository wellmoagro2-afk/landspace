import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { ENV } from '@/lib/env';
import { getOrCreateRequestId, jsonWithRequestId, withRequestIdHeaders } from '@/lib/http/request-id';

export async function GET(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Verificar secret
  if (secret !== ENV.PREVIEW_SECRET) {
    return jsonWithRequestId(
      { error: 'Invalid token' },
      { status: 401 },
      requestId
    );
  }

  if (!slug) {
    return jsonWithRequestId(
      { error: 'Slug is required' },
      { status: 400 },
      requestId
    );
  }

  // Habilitar Preview Mode
  const { enable } = await draftMode();
  enable();

  // Redirecionar para a página do briefing
  const redirect = NextResponse.redirect(new URL(`/strategy/briefings/${slug}`, request.url));
  return withRequestIdHeaders(redirect, requestId);
}
