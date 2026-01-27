import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      // Wildcard removido por segurança - apenas domínios específicos permitidos
    ],
    unoptimized: false,
  },
  // Habilitar Preview Mode
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Desabilitar Dev Indicator para não poluir layout durante demonstrações
  // Isso não afeta segurança ou headers, apenas remove o overlay de desenvolvimento
  // Erros ainda serão exibidos no console, apenas o indicador visual é removido
  devIndicators: false,
  // Evitar empacotamento incorreto do Prisma no Turbopack
  serverExternalPackages: ["@prisma/client", "prisma"],
  // Headers de segurança (CSP removido - agora gerenciado dinamicamente no middleware com nonce)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          ...(isProduction
            ? [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=31536000; includeSubDomains; preload',
                },
              ]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
