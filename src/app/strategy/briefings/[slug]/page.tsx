import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getBriefingData } from "@/lib/briefingData";
import { getBriefingBySlug as getStaticBriefing } from "@/content/strategy/briefings";
import { getBriefingBySlug as getMDXBriefing } from "@/lib/briefings";
import { getKeystaticBriefing } from "@/lib/keystatic/briefings";
import BriefingEditorialPage from "./BriefingEditorialPage";
import ScholarlyArticleJsonLd from "./components/ScholarlyArticleJsonLd";
import { getCanonicalBriefingUrl } from "@/lib/strategy/url";
import { Playfair_Display, Merriweather, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

// Configurar fontes Intelligence Report
const playfairDisplay = Playfair_Display({
  variable: "--font-intelligence-title",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const merriweather = Merriweather({
  variable: "--font-intelligence-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const inter = Inter({
  variable: "--font-editorial-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-intelligence-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Buscar briefing completo para metadata
  const briefing = await getBriefingData(slug, false);
  
  if (!briefing) {
    return {
      title: "Briefing",
    };
  }

  const canonicalUrl = getCanonicalBriefingUrl(slug);
  const publicationDate = briefing.publishedAt?.toISOString() || briefing.createdAt.toISOString();
  // PDF URL: usar pdfUrl do briefing se existir, senão gerar URL canônica + .pdf
  const pdfUrl = briefing.pdfUrl || (canonicalUrl.endsWith("/") ? canonicalUrl.slice(0, -1) : canonicalUrl) + ".pdf";

  // Highwire Press Meta Tags (para citações acadêmicas)
  const highwirePressTags: Record<string, string> = {
    "citation_title": briefing.title,
    "citation_author": "Alves, Wellmo S.",
    "citation_publication_date": publicationDate.split("T")[0], // YYYY-MM-DD
    "citation_journal_title": "LandSpace Strategy Editorial",
    "citation_language": "pt",
  };

  if (briefing.volume) {
    highwirePressTags["citation_volume"] = briefing.volume.toString();
  }

  if (briefing.edition) {
    highwirePressTags["citation_issue"] = briefing.edition.toString();
  }

  if (pdfUrl) {
    highwirePressTags["citation_pdf_url"] = pdfUrl;
  }

  if (briefing.doi) {
    highwirePressTags["citation_doi"] = briefing.doi;
  }

  // Construir metadata com Highwire Press tags
  const metadata: Metadata = {
    title: briefing.title,
    description: briefing.abstract || briefing.summary,
    openGraph: {
      title: briefing.title,
      description: briefing.abstract || briefing.summary,
      images: briefing.coverImageUrl ? [briefing.coverImageUrl] : [],
      type: "article",
      publishedTime: publicationDate,
      authors: ["Wellmo S. Alves"],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: highwirePressTags,
  };

  return metadata;
}

export default async function BriefingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  // Buscar briefing usando wrapper seguro com fallback
  const briefing = await getBriefingData(slug, isDraftMode);

  if (!briefing) {
    notFound();
  }

  // Extrair dados extras (mapEmbedUrl, mapDownloadPath, etc.) do briefing
  const mapEmbedUrl = briefing.mapEmbedUrl;
  const mapDownloadPath = briefing.mapDownloadPath;
  const mapUrl = briefing.mapUrl;
  const mapDownloadUrl = briefing.mapDownloadUrl;

  const canonicalUrl = getCanonicalBriefingUrl(briefing.slug);
  const publicationDate = briefing.publishedAt?.toISOString() || briefing.createdAt.toISOString();
  // PDF URL: usar pdfUrl do briefing se existir, senão gerar URL canônica + .pdf
  const pdfUrl = briefing.pdfUrl || (canonicalUrl.endsWith("/") ? canonicalUrl.slice(0, -1) : canonicalUrl) + ".pdf";

  return (
    <>
      {/* JSON-LD Structured Data para ScholarlyArticle */}
      <ScholarlyArticleJsonLd
        title={briefing.title}
        author="Alves, Wellmo S."
        publicationDate={publicationDate}
        journalTitle="LandSpace Strategy Editorial"
        volume={briefing.volume}
        issue={briefing.edition}
        url={canonicalUrl}
        pdfUrl={pdfUrl}
        doi={briefing.doi}
        abstract={briefing.abstract}
        keywords={briefing.keywords}
        language="pt"
        description={briefing.abstract || briefing.summary}
      />

      <div className={`${playfairDisplay.variable} ${merriweather.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <BriefingEditorialPage
          briefing={{
            title: briefing.title,
            subtitle: briefing.subtitle || undefined,
            summary: briefing.summary,
            abstract: briefing.abstract,
            keywords: briefing.keywords,
            tags: (() => {
              const parsed = JSON.parse(briefing.tags || "[]");
              return Array.isArray(parsed) ? parsed : typeof parsed === 'string' ? [parsed] : [];
            })(),
            coverImageUrl: briefing.coverImageUrl || undefined,
            readingTime: briefing.readingTime,
            contentMdx: briefing.contentMdx,
            // Nova estrutura Big Tech
            introducao: briefing.introducao,
            area_estudo: briefing.area_estudo,
            bases_dados: briefing.bases_dados,
            procedimentos: Array.isArray(briefing.procedimentos) 
              ? briefing.procedimentos 
              : typeof briefing.procedimentos === 'string' 
                ? [briefing.procedimentos]
                : undefined,
            resultados_discussao: briefing.resultados_discussao,
            limitacoes_incertezas: briefing.limitacoes_incertezas,
            conclusao: Array.isArray(briefing.conclusao) 
              ? briefing.conclusao 
              : typeof briefing.conclusao === 'string' 
                ? [briefing.conclusao]
                : undefined,
            referencias: briefing.referencias,
            // Campos legados
            desenvolvimento: briefing.desenvolvimento,
            publishedAt: briefing.publishedAt?.toISOString(),
            createdAt: briefing.createdAt.toISOString(),
            volume: briefing.volume,
            edition: briefing.edition,
            briefingId: briefing.briefingId,
            doi: briefing.doi,
            youtubeUrl: briefing.youtubeUrl || undefined,
            relatedMaps: briefing.relatedMaps ? JSON.parse(briefing.relatedMaps) : undefined,
            relatedPodcast: briefing.relatedPodcast || undefined,
            slug: briefing.slug,
            mapEmbedUrl: mapEmbedUrl,
            mapDownloadPath: mapDownloadPath,
            mapUrl: mapUrl,
            mapDownloadUrl: mapDownloadUrl,
            shareUrl: undefined, // Será gerado no client com window.location.href
          }}
        />
      </div>
    </>
  );
}
