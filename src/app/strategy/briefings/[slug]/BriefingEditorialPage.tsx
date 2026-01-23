import EditorialContentWrapper from "./EditorialContentWrapper";
import EditorialShell from "./components/EditorialShell";
import ArticleHeader from "./components/ArticleHeader";
import ArticleBody from "./components/ArticleBody";
import AttachmentSection from "./components/AttachmentSection";
import IntroducaoSection from "./components/IntroducaoSection";
import MaterialMetodoSection from "./components/MaterialMetodoSection";
import ResultadosDiscussaoSection from "./components/ResultadosDiscussaoSection";
import LimitacoesIncertezasSection from "./components/LimitacoesIncertezasSection";
import ConclusaoListSection from "./components/ConclusaoListSection";
import BriefingBreadcrumbs from "./BriefingBreadcrumbs";
import BriefingSignature from "./components/BriefingSignature";
import CitationBox from "./components/CitationBox";
import AbstractKeywordsBox from "./components/AbstractKeywordsBox";
import ReferencesSection from "./components/ReferencesSection";
import SidebarContent from "./components/SidebarContent";
import PrintHeader from "./components/PrintHeader";
import JournalHeader from "./components/JournalHeader";
import PrintFooterComponent from "./components/PrintFooterComponent";
import AuthorInfo from "./components/AuthorInfo";
import ArticleInfo from "./components/ArticleInfo";
import QRCodePrint from "./components/QRCodePrint";
import { getCanonicalBriefingUrl } from "@/lib/strategy/url";
import { STRATEGY_EDITORIAL_KICKER } from "@/lib/strategy/constants";
import { getAllBriefings as getStaticBriefings } from "@/content/strategy/briefings";
import { getAllBriefings as getMDXBriefings } from "@/lib/briefings";
import "./editorial.css";

interface BriefingEditorialPageProps {
  briefing: {
    title: string;
    subtitle?: string;
    summary: string;
    abstract?: string;
    keywords?: string[];
    tags: string[];
    coverImageUrl?: string;
    readingTime: string;
    contentMdx?: string; // Legado - usar desenvolvimento/conclusao se disponível
    // Nova estrutura Big Tech
    introducao?: string;
    area_estudo?: string;
    bases_dados?: string;
    procedimentos?: string[];
    resultados_discussao?: string;
    limitacoes_incertezas?: string;
    conclusao?: string | string[]; // Pode ser string (legado) ou array (nova estrutura)
    referencias?: string;
    // Campos legados
    desenvolvimento?: string;
    publishedAt?: string;
    createdAt: string;
    volume?: number;
    edition?: number;
    briefingId?: string;
    doi?: string;
    youtubeUrl?: string;
    relatedMaps?: string[];
    relatedPodcast?: string; // Slug do podcast relacionado
    slug: string;
    mapEmbedUrl?: string;
    mapDownloadPath?: string;
    mapUrl?: string;
    mapDownloadUrl?: string;
    shareUrl?: string;
    takeaways?: string[];
  };
}

export default async function BriefingEditorialPage({ briefing }: BriefingEditorialPageProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Buscar briefings relacionados para a sidebar
  const mdxBriefings = getMDXBriefings();
  const staticBriefings = getStaticBriefings();
  
  const mdxFormatted = mdxBriefings.map((b) => ({
    slug: b.slug,
    title: b.meta.title,
    summary: b.meta.summary,
    coverImage: b.meta.coverImageUrl,
  }));
  
  const staticFormatted = staticBriefings.map((b) => ({
    slug: b.slug,
    title: b.title,
    summary: b.summary,
    coverImage: b.coverImage,
  }));
  
  const allBriefings = [...mdxFormatted, ...staticFormatted];
  const relatedBriefings = allBriefings
    .filter((b) => b.slug !== briefing.slug)
    .slice(0, 3);

  // Extrair ano da data de publicação ou usar 2026 como padrão
  const getYear = () => {
    if (briefing.publishedAt) {
      return new Date(briefing.publishedAt).getFullYear();
    }
    return 2026;
  };

  return (
    <EditorialShell>
      {/* Journal Header - Cabeçalho completo do journal (apenas print) */}
      <JournalHeader
        volume={briefing.volume || 1}
        edition={briefing.edition || 1}
        year={getYear()}
        briefingId={briefing.briefingId}
        doi={briefing.doi}
        slug={briefing.slug}
      />

      {/* Print Header - Aparece apenas na impressão */}
      <PrintHeader 
        briefingSlug={briefing.slug}
        briefingId={briefing.briefingId}
        doi={briefing.doi}
        publishedAt={briefing.publishedAt}
        createdAt={briefing.createdAt}
      />

      {/* Top Bar Minimal - War Room Style */}
      <div className="editorial-topbar border-b">
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <a
              href="/strategy"
              className="text-xs font-sans uppercase tracking-wider editorial-link-hover no-underline war-room-text"
            >
              {STRATEGY_EDITORIAL_KICKER}
            </a>
            <a
              href="/strategy/briefings"
              className="text-xs font-sans editorial-link-hover no-underline war-room-text"
            >
              Voltar para Briefings
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Article */}
          <article className="editorial-prose">
            {/* Breadcrumbs */}
            <BriefingBreadcrumbs title={briefing.title} />
            
            <ArticleHeader
              title={briefing.title}
              subtitle={briefing.subtitle}
              summary={briefing.summary}
              tags={briefing.tags}
              coverImageUrl={briefing.coverImageUrl}
              publishedAt={briefing.publishedAt}
              createdAt={briefing.createdAt}
              readingTime={briefing.readingTime}
              volume={briefing.volume}
              edition={briefing.edition}
              briefingId={briefing.briefingId}
              doi={briefing.doi}
              slug={briefing.slug}
            />

            {/* Author Info - Aparece apenas no print (Elsevier/Nature) */}
            <AuthorInfo />

            {/* Article Info - Keywords + Abstract (Elsevier/Nature) - Aparece apenas no print */}
            <ArticleInfo
              keywords={briefing.keywords}
              abstract={briefing.abstract}
            />

            {/* Abstract & Keywords Box - White Paper Style (Web) */}
            <AbstractKeywordsBox
              abstract={briefing.abstract}
              keywords={briefing.keywords}
            />

            {/* NOVA ESTRUTURA BIG TECH */}
            {/* Verificar se usa nova estrutura ou legado */}
            {briefing.introducao || briefing.resultados_discussao ? (
              <>
                {/* 1. Introdução (Núcleo Estratégico) */}
                <IntroducaoSection introducao={briefing.introducao} />

                {/* 2. Material e Método (Compartimentado) */}
                <MaterialMetodoSection
                  areaEstudo={briefing.area_estudo}
                  basesDados={briefing.bases_dados}
                  procedimentos={
                    Array.isArray(briefing.procedimentos) 
                      ? briefing.procedimentos 
                      : typeof briefing.procedimentos === 'string'
                        ? JSON.parse(briefing.procedimentos)
                        : undefined
                  }
                />

                {/* 3. Resultados e Discussão (com destaque máximo para mapa) */}
                <ResultadosDiscussaoSection
                  resultadosDiscussao={briefing.resultados_discussao}
                  mapEmbedUrl={briefing.mapEmbedUrl}
                  mapUrl={briefing.mapUrl}
                  mapDownloadPath={briefing.mapDownloadPath}
                />

                {/* 4. Limitações e Incertezas */}
                <LimitacoesIncertezasSection
                  limitacoesIncertezas={briefing.limitacoes_incertezas}
                />

                {/* 5. Conclusão (Lista de bullets) */}
                <ConclusaoListSection
                  conclusao={Array.isArray(briefing.conclusao) ? briefing.conclusao : undefined}
                />
              </>
            ) : (
              /* ESTRUTURA LEGADA (Compatibilidade) */
              <ArticleBody
                contentMdx={briefing.contentMdx}
                desenvolvimento={briefing.desenvolvimento}
                conclusao={typeof briefing.conclusao === 'string' ? briefing.conclusao : undefined}
                takeaways={briefing.takeaways}
              />
            )}

            {/* Referências - Antes do Box de Citação */}
            <ReferencesSection referencias={briefing.referencias} />

            {/* QR Code - Aparece apenas no print (última página) */}
            <QRCodePrint url={getCanonicalBriefingUrl(briefing.slug)} />

            {/* Editorial Actions - Copiar Link e Compartilhar (associados ao conteúdo textual) */}
            <EditorialContentWrapper
              briefing={{
                title: briefing.title,
                mapUrl: briefing.mapUrl,
                mapDownloadUrl: briefing.mapDownloadUrl || briefing.mapDownloadPath,
                shareUrl: briefing.shareUrl,
              }}
            />

            {/* Seção Anexos - Hub Multimídia */}
            <AttachmentSection
              mapEmbedUrl={briefing.mapEmbedUrl}
              mapDownloadPath={briefing.mapDownloadPath}
              mapUrl={briefing.mapUrl}
              youtubeUrl={briefing.youtubeUrl}
              relatedMaps={briefing.relatedMaps}
              relatedPodcast={briefing.relatedPodcast}
            />

            {/* Assinatura War Room */}
            <BriefingSignature />

            {/* Box de Citação ABNT - Aparece apenas no site */}
            <CitationBox
              title={briefing.title}
              slug={briefing.slug}
              volume={briefing.volume}
              edition={briefing.edition}
              briefingId={briefing.briefingId}
              doi={briefing.doi}
              publishedAt={briefing.publishedAt}
              createdAt={briefing.createdAt}
            />
          </article>

          {/* Sidebar (Desktop Only) - Otimizada */}
          <aside className="editorial-sidebar hidden lg:block">
            <SidebarContent 
              currentSlug={briefing.slug}
              takeaways={briefing.takeaways}
              relatedBriefings={relatedBriefings}
              hasMap={!!(briefing.mapEmbedUrl || briefing.mapUrl || briefing.mapDownloadPath)}
            />
          </aside>
        </div>
      </div>

      {/* Print Footer Component - Aparece apenas na impressão (escondido na tela) */}
      <PrintFooterComponent 
        doi={briefing.doi}
      />
    </EditorialShell>
  );
}
