/**
 * Logger com redaction de dados sensíveis
 * Remove PINs, senhas, tokens e outros dados sensíveis dos logs
 */

const SENSITIVE_KEYS = [
  'pin',
  'password',
  'token',
  'authorization',
  'session',
  'secret',
  'key',
  'adminKey',
  'pinHash',
];

/**
 * Redact valores sensíveis de um objeto
 */
function redactSensitive(obj: unknown, depth = 0): unknown {
  if (depth > 10) {
    return '[MAX_DEPTH]';
  }

  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    // Se a string parece ser um hash/token, redact
    if (obj.length > 20 && /^[a-f0-9]+$/i.test(obj)) {
      return '[REDACTED_HASH]';
    }
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => redactSensitive(item, depth + 1));
  }

  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some(sensitive => lowerKey.includes(sensitive));

    if (isSensitive) {
      redacted[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = redactSensitive(value, depth + 1);
    } else {
      redacted[key] = value;
    }
  }

  return redacted;
}

/**
 * Log estruturado com redaction automática
 */
export function logSafe(level: 'info' | 'warn' | 'error', message: string, data?: unknown) {
  const redactedData = data ? redactSensitive(data) : undefined;
  
  if (process.env.NODE_ENV === 'production') {
    // Em produção, usar JSON estruturado
    const logEntry: Record<string, unknown> = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };
    if (redactedData && typeof redactedData === 'object' && !Array.isArray(redactedData) && redactedData !== null) {
      Object.assign(logEntry, redactedData);
    }
    console.log(JSON.stringify(logEntry));
  } else {
    // Em desenvolvimento, log mais legível
    console.log(`[${level.toUpperCase()}] ${message}`, redactedData || '');
  }
}
