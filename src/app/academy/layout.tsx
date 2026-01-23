import Header from "@/components/Header";
import FooterWrapper from "@/components/FooterWrapper";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import { branding } from "@/lib/branding";

export const metadata: Metadata = {
  title: branding.seo.academy.title,
  description: branding.seo.academy.description,
  openGraph: {
    title: branding.seo.academy.title,
    description: branding.seo.academy.description,
    url: "https://landspace.com.br/academy",
    siteName: branding.brandName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: branding.seo.academy.title,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: branding.seo.academy.title,
    description: branding.seo.academy.description,
    images: ["/og-image.jpg"],
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="academy" />
      {children}
      <FooterWrapper variant="academy" />
      <WhatsAppButton />
    </>
  );
}
