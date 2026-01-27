import { NextRequest } from 'next/server';
import { clearAdminSession } from '@/lib/portal-auth';
import { jsonOk } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  await clearAdminSession();
  return jsonOk(request, { success: true });
}
