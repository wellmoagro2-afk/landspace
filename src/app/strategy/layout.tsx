import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import { branding } from "@/lib/branding";

// Garantir que Strategy roda em Node runtime (não Edge) para compatibilidade com Prisma
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: branding.seo.strategy.title,
  description: branding.seo.strategy.description,
  openGraph: {
    title: branding.seo.strategy.title,
    description: branding.seo.strategy.description,
    url: "https://landspace.com.br/strategy",
    siteName: branding.brandName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: branding.seo.strategy.title,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: branding.seo.strategy.title,
    description: branding.seo.strategy.description,
    images: ["/og-image.jpg"],
  },
};

export default function StrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="strategy" />
      {children}
      {/* Footer sem CTA duplicado - cada página gerencia seu próprio CTA */}
      <Footer variant="strategy" hideCTA={true} />
      <WhatsAppButton />
    </>
  );
}
