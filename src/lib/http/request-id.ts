/**
 * Request ID Helper - Correlation ID padronizado
 * 
 * Garante que todas as respostas JSON incluam x-request-id no header
 * e requestId no body (para erros >= 400)
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

/**
 * Obtém ou cria Request ID do header do cliente
 * 
 * @param req - Request do Next.js
 * @returns Request ID (reutiliza do header se presente, senão gera UUID)
 */
export function getOrCreateRequestId(req: NextRequest | Request): string {
  const existingId = req.headers.get('x-request-id');
  if (existingId && existingId.trim().length > 0) {
    return existingId.trim();
  }
  return randomUUID();
}

/**
 * Adiciona x-request-id ao header de uma Response
 * 
 * @param res - Response (NextResponse ou Response)
 * @param requestId - Request ID a ser adicionado
 * @returns Response com header x-request-id
 */
export function withRequestIdHeaders(
  res: NextResponse | Response,
  requestId: string
): NextResponse | Response {
  res.headers.set('x-request-id', requestId);
  return res;
}

/**
 * Adiciona headers de cache-control para impedir cache de respostas sensíveis
 * 
 * @param res - Response (NextResponse ou Response)
 * @returns Response com Cache-Control: no-store e Pragma: no-cache
 */
export function setNoStore(res: NextResponse | Response): NextResponse | Response {
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('Pragma', 'no-cache');
  return res;
}

/**
 * Cria NextResponse JSON com x-request-id no header
 * Para erros (status >= 400), também inclui requestId no body
 * 
 * @param data - Dados JSON a serem retornados
 * @param init - ResponseInit (status, headers, etc)
 * @param requestId - Request ID
 * @returns NextResponse com x-request-id no header e requestId no body (se erro)
 */
export function jsonWithRequestId(
  data: any,
  init: ResponseInit & { status?: number } = {},
  requestId: string
): NextResponse {
  const status = init.status ?? 200;
  const isError = status >= 400;

  // Para erros, incluir requestId no body
  const responseData = isError
    ? { ...data, requestId }
    : data;

  const response = NextResponse.json(responseData, {
    ...init,
    status,
  });

  // Sempre adicionar x-request-id no header
  response.headers.set('x-request-id', requestId);

  return response;
}
