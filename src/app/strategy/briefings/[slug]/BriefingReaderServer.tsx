import Image from "next/image";
import SafeMDXRemote from "@/components/security/SafeMDXRemote";
import { mdxComponents } from "@/lib/mdx-components";
import TableOfContents from "@/components/strategy/editorial/TableOfContents";
import BriefingReaderClient from "./BriefingReaderClient";
import BriefingReaderClientWrapper from "./BriefingReaderClientWrapper";
import BriefingBreadcrumbs from "./BriefingBreadcrumbs";
import ReaderTOC from "./ReaderTOC";
import CopySelectionButton from "./CopySelectionButton";
import BriefingActionChips from "./BriefingActionChips";
import BriefingPDFWrapper from "./BriefingPDFWrapper";
import RelatedMapsSection from "./RelatedMapsSection";
import RelatedBriefingsSection from "./RelatedBriefingsSection";
import BriefingMapEmbed from "@/components/strategy/BriefingMapEmbed";
import StrategyNewsletterCTA from "@/components/strategy/StrategyNewsletterCTA";
import FadeIn from "@/components/ui/FadeIn";

interface BriefingReaderServerProps {
  briefing: {
    title: string;
    subtitle?: string;
    summary: string;
    tags: string[];
    coverImageUrl?: string;
    readingTime: string;
    contentMdx: string;
    publishedAt?: string;
    createdAt: string;
    pdfUrl?: string;
    youtubeUrl?: string;
    relatedMaps?: string[];
    slug: string;
    mapEmbedUrl?: string;
    mapDownloadPath?: string;
    mapUrl?: string;
    mapDownloadUrl?: string;
    shareUrl?: string;
  };
}

export default async function BriefingReaderServer({ briefing }: BriefingReaderServerProps) {
  return (
    <div className="max-w-7xl mx-auto" data-briefing-container>
      {/* Client Wrapper para barra sticky */}
      <BriefingReaderClientWrapper briefing={briefing} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Conteúdo Principal */}
        <article id="briefing-article" className="briefing-prose">
          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {briefing.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[rgba(0,184,107,0.16)] border border-[rgba(0,184,107,0.2)] rounded-full text-sm font-medium text-[#00B86B]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {briefing.title}
            </h1>

            {briefing.subtitle && (
              <p className="text-xl text-slate-400 mb-6">{briefing.subtitle}</p>
            )}

            {/* Meta e Actions - Client Component para ações interativas */}
            <BriefingReaderClient
              briefing={{
                title: briefing.title,
                summary: briefing.summary,
                pdfUrl: briefing.pdfUrl,
              }}
            />

            {/* Resumo */}
            <p className="text-lg text-slate-300 leading-relaxed border-l-4 border-[#00B86B]/30 pl-6 py-2">
              {briefing.summary}
            </p>
          </header>

          {/* Cover Image */}
          {briefing.coverImageUrl ? (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-12 border border-[rgba(255,255,255,0.08)]">
              <Image
                src={briefing.coverImageUrl}
                alt={briefing.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          ) : (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-12 border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#070B14] via-[#05070C] to-[#00B86B]/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-[rgba(0,184,107,0.16)] rounded-full flex items-center justify-center border border-[#00B86B]/20">
                    <svg
                      className="w-8 h-8 text-[#00B86B]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-[rgba(255,255,255,0.46)]">Sem imagem de capa</p>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo MDX - Renderizado no Server */}
          <SafeMDXRemote source={briefing.contentMdx} components={mdxComponents} />

          {/* Copiar trecho selecionado */}
          <CopySelectionButton />

          {/* PDF Preview - Após o conteúdo MDX */}
          {briefing.pdfUrl ? (
            <BriefingPDFWrapper
              briefing={{
                title: briefing.title,
                pdfUrl: briefing.pdfUrl,
              }}
            >
              {/* Action Chips Premium - Renderizados aqui para ter acesso ao context */}
              <BriefingActionChips
                briefing={{
                  title: briefing.title,
                  coverImageUrl: briefing.coverImageUrl,
                  pdfUrl: briefing.pdfUrl,
                  mapUrl: briefing.mapUrl,
                  mapDownloadUrl: briefing.mapDownloadUrl || briefing.mapDownloadPath,
                  shareUrl: briefing.shareUrl,
                }}
              />
            </BriefingPDFWrapper>
          ) : (
            /* Chips sem PDF Preview */
            <BriefingActionChips
              briefing={{
                title: briefing.title,
                coverImageUrl: briefing.coverImageUrl,
                pdfUrl: briefing.pdfUrl,
                mapUrl: briefing.mapUrl,
                mapDownloadUrl: briefing.mapDownloadUrl || briefing.mapDownloadPath,
                shareUrl: briefing.shareUrl,
              }}
            />
          )}

          {/* Mapa do Briefing - Após o conteúdo */}
          {(briefing.mapEmbedUrl || briefing.mapDownloadPath) && (
            <BriefingMapEmbed
              mapEmbedUrl={briefing.mapEmbedUrl}
              mapDownloadPath={briefing.mapDownloadPath}
              title="Mapa do Briefing"
            />
          )}

          {/* Mapas Relacionados */}
          {briefing.relatedMaps && briefing.relatedMaps.length > 0 && (
            <RelatedMapsSection mapSlugs={briefing.relatedMaps} />
          )}

          {/* Outros Briefings */}
          <RelatedBriefingsSection currentSlug={briefing.slug} />

          {/* Newsletter CTA */}
          <div className="mt-16">
            <StrategyNewsletterCTA variant="hero" />
          </div>
        </article>

        {/* Sidebar com TOC - Renderizado pelo ReaderTOC client */}
        <aside className="reader-toc">
          <ReaderTOC />
        </aside>
      </div>
    </div>
  );
}
