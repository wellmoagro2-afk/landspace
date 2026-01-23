import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { ENV } from '@/lib/env';

export async function GET(request: NextRequest) {
  await requireAdmin();
  
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug is required' },
      { status: 400 }
    );
  }

  // Usar ENV.PREVIEW_SECRET (sem fallback inseguro)
  const previewUrl = `/api/preview?secret=${ENV.PREVIEW_SECRET}&slug=${slug}`;
  const fullUrl = new URL(previewUrl, request.url).toString();

  return NextResponse.json({ url: fullUrl });
}
