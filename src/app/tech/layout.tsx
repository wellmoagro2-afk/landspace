import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import { branding } from "@/lib/branding";

export const metadata: Metadata = {
  title: branding.seo.tech.title,
  description: branding.seo.tech.description,
  openGraph: {
    title: branding.seo.tech.title,
    description: branding.seo.tech.description,
    url: "https://landspace.com.br/tech",
    siteName: branding.brandName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: branding.seo.tech.title,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: branding.seo.tech.title,
    description: branding.seo.tech.description,
    images: ["/og-image.jpg"],
  },
};

export default function TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="tech" />
      {children}
      <Footer variant="tech" />
      <WhatsAppButton />
    </>
  );
}
