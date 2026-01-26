/**
 * Observabilidade: Request ID e Logs JSON
 */

import { randomBytes } from 'crypto';

/**
 * Gerar Request ID único
 */
export function generateRequestId(): string {
  return randomBytes(16).toString('hex');
}

/**
 * Obter Request ID do header ou gerar novo
 */
export function getRequestId(request: Request): string {
  const existingId = request.headers.get('x-request-id');
  if (existingId) {
    return existingId;
  }
  return generateRequestId();
}

/**
 * Logger estruturado (JSON)
 */
export interface LogContext {
  requestId?: string;
  userId?: string;
  protocol?: string;
  action?: string;
  [key: string]: unknown;
}

export function logStructured(
  level: 'info' | 'warn' | 'error' | 'audit',
  message: string,
  context: LogContext = {}
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  };

  // Em produção, usar JSON; em dev, formatar legível
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(logEntry));
  } else {
    const prefix = `[${level.toUpperCase()}]`;
    const contextStr = Object.keys(context).length > 0 
      ? ` ${JSON.stringify(context, null, 2)}`
      : '';
    console.log(`${prefix} ${message}${contextStr}`);
  }
}

/**
 * Adicionar Request ID ao response header
 */
export function addRequestIdHeader(response: Response, requestId: string): Response {
  response.headers.set('x-request-id', requestId);
  return response;
}
