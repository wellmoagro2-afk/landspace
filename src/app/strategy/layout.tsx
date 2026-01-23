import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
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
      {/* Temporariamente desabilitado para testar violações CSP */}
      {/* <Toaster
        position="bottom-right"
        offset="80px"
        toastOptions={{
          classNames: {
            toast:
              "bg-[rgba(5,7,12,0.92)] backdrop-blur-md border border-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.9)] shadow-lg",
            title: "text-[rgba(255,255,255,0.9)] font-medium",
            description: "text-[rgba(255,255,255,0.65)] text-sm",
            success: "border-l-4 border-l-[#00B86B]",
            error: "border-l-4 border-l-red-500",
            info: "border-l-4 border-l-cyan-400",
            actionButton: "bg-[rgba(0,184,107,0.16)] hover:bg-[rgba(0,184,107,0.24)]",
            cancelButton: "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.10)]",
          },
          style: {
            background: "rgba(5,7,12,0.92)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(12px)",
          },
        }}
        closeButton
        richColors={false}
        duration={3000}
      /> */}
    </>
  );
}
