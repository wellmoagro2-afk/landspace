/**
 * Feature Flags - Configuração via variáveis de ambiente
 * Permite habilitar/desabilitar recursos sem alterar código
 * 
 * Nota: Usa process.env diretamente pois NEXT_PUBLIC_* são expostas ao cliente pelo Next.js
 */
import { ENV } from './env';

export const featureFlags = {
  // PDF: se false, esconde toda UI relacionada a PDF
  enablePDF: ENV.NEXT_PUBLIC_ENABLE_PDF,
  
  // Map Download: se false, esconde botões de download de mapa
  enableMapDownload: ENV.NEXT_PUBLIC_ENABLE_MAP_DOWNLOAD,
  
  // Map Embed: se false, não renderiza iframes de mapas
  enableMapEmbed: ENV.NEXT_PUBLIC_ENABLE_MAP_EMBED,
} as const;
