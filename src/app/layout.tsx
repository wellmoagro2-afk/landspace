import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import { unstable_noStore } from "next/cache";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import LoadingScreen from "@/components/LoadingScreen";
import { VariantProvider } from "@/components/VariantProvider";
import { branding } from "@/lib/branding";
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
  await prisma.$connect().catch(() => {
    // Ignorar erro de conexão se já estiver conectado
  });

  // Ler nonce dos headers (setado pelo middleware)
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? '';

  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        {/* Definir __webpack_nonce__ para que webpack/Next.js use nonce nos estilos gerados */}
        {nonce && (
          <Script
            id="webpack-nonce-setter"
            strategy="beforeInteractive"
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `__webpack_nonce__ = ${JSON.stringify(nonce)};`,
            }}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <LoadingScreen />
        <CartProvider>
          <VariantProvider>
            {children}
          </VariantProvider>
        </CartProvider>
      </body>
    </html>
  );
}
