import { NextRequest } from 'next/server';
import { clearPortalSession } from '@/lib/portal-auth';
import { jsonOk } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  await clearPortalSession();
  return jsonOk(request, { success: true });
}
