/**
 * SSRF Protection Helper
 * 
 * Proteções implementadas:
 * - HTTPS only
 * - Allowlist de hosts
 * - Bloqueio de credenciais embutidas em URL
 * - Bloqueio de portas não padrão (opcional)
 * - Bloqueio de redirects (via fetch redirect: 'error')
 * - Timeout com AbortController
 * - Validação de Content-Type (JSON)
 * - Limite de tamanho de payload (1MB)
 */

/**
 * Valida se uma URL é permitida para fetch externo
 * 
 * @param input - URL string ou objeto URL
 * @param allowedHosts - Lista de hostnames permitidos
 * @throws Error se URL não for permitida
 */
export function assertAllowedUrl(
  input: string | URL,
  allowedHosts: string[]
): void {
  const url = typeof input === 'string' ? new URL(input) : input;
  
  // 1. Protocolo deve ser HTTPS
  if (url.protocol !== 'https:') {
    throw new Error(`Protocolo não permitido: ${url.protocol}. Apenas HTTPS é permitido.`);
  }
  
  // 2. Hostname deve estar na allowlist
  if (!allowedHosts.includes(url.hostname)) {
    throw new Error(`Host não permitido: ${url.hostname}. Hosts permitidos: ${allowedHosts.join(', ')}`);
  }
  
  // 3. Bloquear credenciais embutidas (username:password@host)
  if (url.username || url.password) {
    throw new Error('Credenciais embutidas na URL não são permitidas');
  }
  
  // 4. Bloquear portas não padrão (apenas 443 ou vazio)
  if (url.port && url.port !== '443') {
    throw new Error(`Porta não permitida: ${url.port}. Apenas porta 443 (HTTPS padrão) é permitida.`);
  }
  
  // 5. Bloquear IPs privados (proteção adicional)
  const hostname = url.hostname.toLowerCase();
  const isPrivateIp = 
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    (hostname.startsWith('172.') && 
     parseInt(hostname.split('.')[1] || '0') >= 16 && 
     parseInt(hostname.split('.')[1] || '0') <= 31) ||
    hostname.startsWith('169.254.') || // Link-local
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal');
  
  if (isPrivateIp) {
    throw new Error(`IP privado ou local não permitido: ${hostname}`);
  }
}

/**
 * Opções para safeFetchJson
 */
export interface SafeFetchJsonOptions {
  /** Lista de hostnames permitidos */
  allowedHosts: string[];
  /** Timeout em milissegundos (padrão: 5000) */
  timeoutMs?: number;
  /** Headers adicionais para o fetch */
  headers?: Record<string, string>;
  /** Tamanho máximo do payload em bytes (padrão: 1MB) */
  maxSizeBytes?: number;
}

/**
 * Fetch seguro para JSON com proteções SSRF
 * 
 * @param url - URL string ou objeto URL
 * @param opts - Opções de fetch seguro
 * @returns JSON parseado
 * @throws Error se URL não for permitida, timeout, ou resposta inválida
 */
export async function safeFetchJson<T = unknown>(
  url: string | URL,
  opts: SafeFetchJsonOptions
): Promise<T> {
  const {
    allowedHosts,
    timeoutMs = 5000,
    headers = {},
    maxSizeBytes = 1_000_000, // 1MB
  } = opts;
  
  // Validar URL antes de fazer fetch
  assertAllowedUrl(url, allowedHosts);
  
  // Criar AbortController para timeout
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, timeoutMs);
  
  try {
    // Fazer fetch com proteções:
    // - redirect: 'error' - não seguir redirects (prevenir SSRF via 30x)
    // - signal - para timeout
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...headers,
      },
      redirect: 'error', // Bloquear redirects
      signal: abortController.signal,
    });
    
    // Limpar timeout (fetch completou)
    clearTimeout(timeoutId);
    
    // Verificar status
    if (!response.ok) {
      // Não vazar URL completa no erro (apenas host/path)
      const urlObj = typeof url === 'string' ? new URL(url) : url;
      const safeUrl = `${urlObj.hostname}${urlObj.pathname}`;
      throw new Error(`HTTP ${response.status} ao buscar ${safeUrl}`);
    }
    
    // Validar Content-Type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Content-Type inválido: ${contentType}. Esperado: application/json`);
    }
    
    // Verificar Content-Length (se disponível)
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      if (size > maxSizeBytes) {
        throw new Error(`Payload muito grande: ${size} bytes (máximo: ${maxSizeBytes} bytes)`);
      }
    }
    
    // Ler resposta com limite de tamanho
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body não disponível');
    }
    
    const chunks: Uint8Array[] = [];
    let totalSize = 0;
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        totalSize += value.length;
        if (totalSize > maxSizeBytes) {
          reader.cancel();
          throw new Error(`Payload excedeu limite: ${totalSize} bytes (máximo: ${maxSizeBytes} bytes)`);
        }
        
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    
    // Concatenar chunks e parsear JSON
    const allChunks = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of chunks) {
      allChunks.set(chunk, offset);
      offset += chunk.length;
    }
    
    const text = new TextDecoder().decode(allChunks);
    
    try {
      return JSON.parse(text) as T;
    } catch (parseError) {
      throw new Error(`Erro ao parsear JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }
    
  } catch (error) {
    // Limpar timeout se ainda estiver ativo
    clearTimeout(timeoutId);
    
    // Re-throw com contexto adicional se necessário
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Timeout após ${timeoutMs}ms`);
      }
      if (error.message.includes('redirect')) {
        throw new Error('Redirect não permitido (proteção SSRF)');
      }
    }
    
    throw error;
  }
}
