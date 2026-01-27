/**
 * Helpers para respostas JSON padronizadas
 * Garante Content-Type correto, requestId e formato consistente
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRequestId } from './observability';

/**
 * Resposta JSON de sucesso
 */
export function jsonOk(
  request: NextRequest,
  data: unknown,
  init?: { status?: number; headers?: Record<string, string> }
): NextResponse {
  const requestId = getRequestId(request);
  const status = init?.status || 200;

  const response = NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...(init?.headers || {}),
    },
  });

  // Adicionar requestId ao header
  response.headers.set('x-request-id', requestId);
  return response;
}

/**
 * Resposta JSON de erro padronizada
 */
export function jsonError(
  request: NextRequest,
  args: {
    status: number;
    code: string;
    message: string;
    details?: unknown;
  }
): NextResponse {
  const requestId = getRequestId(request);
  const { status, code, message, details } = args;

  const errorBody: Record<string, unknown> = {
    error: {
      code,
      message,
    },
    requestId,
  };

  if (details !== undefined) {
    errorBody.details = details;
  }

  const response = NextResponse.json(errorBody, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });

  // Adicionar requestId ao header
  response.headers.set('x-request-id', requestId);
  return response;
}
