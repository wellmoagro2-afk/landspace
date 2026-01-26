import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import { unstable_noStore } from "next/cache";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { VariantProvider } from "@/components/VariantProvider";
import { branding } from "@/lib/branding";
// Importação segura do Prisma - se falhar, layout ainda renderiza
// O try-catch no código garante que erros de conexão não quebrem o SSR
import { prisma } from "@/lib/prisma";

// Forçar renderização dinâmica para suportar CSP com nonce
// Garantir que não há caching estático/ISR/PPR no root
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: branding.seo.home.title,
  description: branding.seo.home.description,
  keywords: [
    "Consultoria Geoprocessamento",
    "Automação QGIS Python",
    "Análise Ambiental PhD",
    "Scripts QGIS",
    "Geotecnologia para Agronegócio",
    "LandSpace Business",
    "Geoprocessamento para empresas",
    "Consultoria ambiental",
    "Automação geoespacial",
    "QGIS Python",
    "Análise territorial",
  ],
  authors: [{ name: "Wellmo dos Santos Alves" }],
  creator: branding.brandName,
  publisher: branding.brandName,
  openGraph: {
    title: branding.seo.home.title,
    description: branding.seo.home.description,
    url: "https://landspace.com.br",
    siteName: branding.brandName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${branding.brandName} - ${branding.seo.home.title}`,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: branding.seo.home.title,
    description: branding.seo.home.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Adicione aqui quando tiver Google Search Console
    // google: "seu-codigo-de-verificacao",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Forçar renderização dinâmica por request (sem cache estático/ISR/PPR)
  unstable_noStore();

  // Garantir conexão com banco antes do render SSR
  // IMPORTANTE: Não bloquear renderização se conexão falhar - layout deve sempre renderizar
  // O catch garante que erros de conexão não quebrem o SSR (causando 404 silencioso)
  try {
    await prisma.$connect().catch(() => {
      // Ignorar erro de conexão se já estiver conectado ou se houver problema temporário
      // Em dev, isso permite que o site funcione mesmo sem banco configurado
    });
  } catch (error) {
    // Se houver erro crítico (ex: Prisma Client não inicializado), logar mas não quebrar
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Layout] Erro ao conectar Prisma (não bloqueante):', error instanceof Error ? error.message : 'Unknown error');
    }
    // Continuar renderização mesmo se Prisma falhar
  }

  // Ler nonce dos headers (setado pelo proxy)
  // IMPORTANTE: Nonce é gerado UMA vez no início do proxy (proxy.ts) e injetado nos request headers.
  // O proxy garante que x-nonce esteja SEMPRE presente em TODAS as requests (incluindo prefetch/RSC),
  // garantindo que o mesmo nonce seja usado em:
  // - header CSP (quando aplicável)
  // - request header x-nonce (lido aqui via headers())
  // - atributo nonce em <Script>
  // 
  // ROOT CAUSE FIX: O proxy gera nonce UMA vez e sempre injeta nos request headers,
  // evitando hydration mismatch porque o Script sempre terá nonce disponível no SSR e CSR.
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? '';

  // Em dev, logar warning se nonce não estiver disponível (não deve acontecer após correção)
  if (!nonce && process.env.NODE_ENV === 'development') {
    console.warn('[Layout] Nonce não disponível - isso pode causar hydration mismatch');
    console.warn('[Layout] Verifique se proxy.ts está injetando x-nonce nos request headers');
  }

  // ROOT CAUSE FIX: data-variant deve ser determinístico no SSR para evitar hydration mismatch
  // O SSR precisa renderizar um valor fixo e conhecido para data-variant no <body>.
  // O VariantProvider (client component) atualiza data-variant após hydration baseado na rota,
  // mas o primeiro render do client DEVE ter o mesmo valor do SSR para evitar warnings.
  // Usamos "global" como padrão determinístico, que será sincronizado pelo VariantProvider
  // no primeiro render do client (via prop initialVariant), garantindo SSR = CSR.
  const initialVariant: "tech" | "studio" | "strategy" | "academy" | "labs" | "global" = "global";

  return (
    <html lang="pt-BR">
      <head>
        {/* Favicons são gerenciados automaticamente pelo Next.js via metadata.icons */}
        {/* Definir __webpack_nonce__ para que webpack/Next.js use nonce nos estilos gerados */}
        {/* IMPORTANTE: Script com strategy="beforeInteractive" é injetado no <head> antes da hydration.
            O proxy.ts garante que nonce SEMPRE esteja disponível via request headers (x-nonce).
            ROOT CAUSE FIX: Removida condicional {nonce ? ... : null} para evitar hydration mismatch.
            O Script sempre renderiza porque o proxy sempre injeta nonce nos request headers. */}
        <Script
          id="webpack-nonce-setter"
          strategy="beforeInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `__webpack_nonce__ = ${JSON.stringify(nonce)};`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
        data-variant={initialVariant}
      >
        <CartProvider>
          <VariantProvider initialVariant={initialVariant}>
            {children}
          </VariantProvider>
        </CartProvider>
      </body>
    </html>
  );
}
