/**
 * Validação de variáveis de ambiente
 * Garante que secrets obrigatórios estão configurados e têm tamanho mínimo
 * 
 * REGRAS:
 * - Produção: exige secrets críticos (SESSION_SECRET, PREVIEW_SECRET, DATABASE_URL)
 * - Desenvolvimento: mesma exigência, mas com mensagens de erro mais amigáveis
 * - Nunca usa fallbacks hardcoded inseguros
 */

/**
 * Helper para gerar mensagens de erro amigáveis em desenvolvimento
 */
function getEnvErrorMessage(name: string, minLen?: number): string {
  const minLenText = minLen ? ` (mínimo ${minLen} caracteres)` : '';
  const example = minLen 
    ? `\n\nExemplo de geração segura:\n  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` 
    : '';
  
  return (
    `❌ Variável de ambiente obrigatória não configurada: ${name}${minLenText}\n\n` +
    `Para resolver:\n` +
    `1. Crie ou edite o arquivo .env.local na raiz do projeto\n` +
    `2. Adicione a linha: ${name}=seu-valor-aqui${example}\n` +
    `3. Reinicie o servidor\n\n` +
    `📖 Consulte README.md para mais detalhes sobre configuração de variáveis de ambiente.`
  );
}

/**
 * Requer variável de ambiente obrigatória
 */
function requireEnv(name: string, options?: { minLen?: number }): string {
  const value = process.env[name];
  
  if (!value) {
    throw new Error(getEnvErrorMessage(name, options?.minLen));
  }
  
  if (options?.minLen && value.length < options.minLen) {
    throw new Error(
      `❌ Variável de ambiente ${name} deve ter no mínimo ${options.minLen} caracteres.\n` +
      `Valor atual tem ${value.length} caracteres.\n\n` +
      `Exemplo de geração segura:\n` +
      `  node -e "console.log(require('crypto').randomBytes(${Math.ceil(options.minLen / 2)}).toString('hex'))"`
    );
  }
  
  return value;
}

/**
 * Requer variável de ambiente apenas em produção
 */
function requireEnvInProd(name: string, options?: { minLen?: number }): string | undefined {
  const value = process.env[name];
  const isProd = process.env.NODE_ENV === 'production';
  
  if (isProd && !value) {
    throw new Error(getEnvErrorMessage(name, options?.minLen));
  }
  
  if (value && options?.minLen && value.length < options.minLen) {
    throw new Error(
      `❌ Variável de ambiente ${name} deve ter no mínimo ${options.minLen} caracteres.\n` +
      `Valor atual tem ${value.length} caracteres.`
    );
  }
  
  return value;
}

/**
 * Variáveis de ambiente validadas
 * Acesso centralizado e seguro
 */
export const ENV = {
  /**
   * Secret para assinatura de tokens JWT
   * Obrigatório em todos os ambientes, mínimo 32 caracteres
   */
  SESSION_SECRET: requireEnv('SESSION_SECRET', { minLen: 32 }),
  
  /**
   * URL do banco de dados
   * Obrigatório em todos os ambientes
   */
  DATABASE_URL: requireEnv('DATABASE_URL'),
  
  /**
   * Ambiente de execução
   * Default: "development"
   */
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  /**
   * Secret para preview mode
   * Obrigatório em todos os ambientes, mínimo 32 caracteres
   */
  PREVIEW_SECRET: requireEnv('PREVIEW_SECRET', { minLen: 32 }),
  
  /**
   * Chave admin (opcional)
   * Se presente, deve ter no mínimo 24 caracteres
   */
  ADMIN_KEY: (() => {
    const value = process.env.ADMIN_KEY;
    if (!value) return undefined;
    if (value.length < 24) {
      throw new Error(
        `❌ ADMIN_KEY deve ter no mínimo 24 caracteres se configurado.\n` +
        `Valor atual tem ${value.length} caracteres.`
      );
    }
    return value;
  })(),
  
  /**
   * Secret para Draft Mode (Next.js)
   * Opcional, mas recomendado em produção
   */
  DRAFT_MODE_SECRET: requireEnvInProd('DRAFT_MODE_SECRET', { minLen: 32 }),
  
  /**
   * URL do Redis (opcional)
   * Usado para rate limiting persistente
   */
  REDIS_URL: process.env.REDIS_URL,
  
  /**
   * ClamAV habilitado (opcional)
   * Habilita escaneamento de vírus em uploads
   */
  CLAMAV_ENABLED: process.env.CLAMAV_ENABLED === 'true',
  
  /**
   * Socket do ClamAV (opcional)
   * Default: '/var/run/clamav/clamd.ctl'
   */
  CLAMAV_SOCKET: process.env.CLAMAV_SOCKET || '/var/run/clamav/clamd.ctl',
  
  /**
   * Token do Mapbox (opcional)
   * Usado para renderização de mapas
   */
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  
  /**
   * URL base do site (opcional)
   * Usado para gerar URLs canônicas
   */
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  
  /**
   * Habilitar PDF (opcional)
   * Default: false
   */
  NEXT_PUBLIC_ENABLE_PDF: process.env.NEXT_PUBLIC_ENABLE_PDF === 'true',
  
  /**
   * Habilitar download de mapas (opcional)
   * Default: true
   */
  NEXT_PUBLIC_ENABLE_MAP_DOWNLOAD: process.env.NEXT_PUBLIC_ENABLE_MAP_DOWNLOAD !== 'false',
  
  /**
   * Habilitar embed de mapas (opcional)
   * Default: true
   */
  NEXT_PUBLIC_ENABLE_MAP_EMBED: process.env.NEXT_PUBLIC_ENABLE_MAP_EMBED !== 'false',
  
  /**
   * Usar mock do GDELT (opcional, apenas dev/test)
   * Default: false
   */
  USE_MOCK_GDELT: process.env.USE_MOCK_GDELT === 'true',
  
  /**
   * Webhook URL para consultoria (opcional)
   * Usado para notificações de novos pedidos
   */
  CONSULTANCY_WEBHOOK_URL: process.env.CONSULTANCY_WEBHOOK_URL,
} as const;

/**
 * Verificar se está em produção
 */
export const isProductionEnv = ENV.NODE_ENV === 'production';

/**
 * Verificar se está em desenvolvimento
 */
export const isDevelopmentEnv = ENV.NODE_ENV === 'development';

/**
 * Exports de compatibilidade (aliases para compatibilidade com código existente)
 */
export { isProductionEnv as isProduction, isDevelopmentEnv as isDevelopment };
