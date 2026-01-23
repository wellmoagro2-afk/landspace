"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMapBySlug } from "@/content/strategy/maps";
import ContentCard from "@/components/strategy/ContentCard";
import PDFButton from "@/components/strategy/PDFButton";
import StrategyNewsletterCTA from "@/components/strategy/StrategyNewsletterCTA";
import { ArrowLeft, Calendar, Clock, Share2, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Briefing } from "@/content/strategy/briefings";
import { getAllBriefings } from "@/content/strategy/briefings";
import { sanitizeHtml } from "@/lib/sanitize-html";

interface BriefingClientProps {
  briefing: Briefing;
}

export default function BriefingClient({ briefing }: BriefingClientProps) {
  const [imageError, setImageError] = useState(false);
  const allBriefings = getAllBriefings();
  const relatedMaps = briefing.relatedMaps
    ?.map((slug) => getMapBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m)) || [];

  const otherBriefings = allBriefings
    .filter((b) => b.slug !== briefing.slug)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: briefing.title,
          text: briefing.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <>
      {/* Back Button */}
      <Link
        href="/strategy/briefings"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Briefings
      </Link>

      {/* Cover Image - apenas se existir, for válida e não tiver erro */}
      {briefing.coverImage && briefing.coverImage !== "" && !imageError && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-[rgba(255,255,255,0.08)]">
          <Image
            src={briefing.coverImage}
            alt={briefing.title}
            fill
            className="object-cover"
            onError={() => {
              // Se a imagem falhar, esconder o container
              setImageError(true);
            }}
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {briefing.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {briefing.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(briefing.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{briefing.readingTime}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {briefing.summary}
        </p>
      </div>

      {/* Actions */}
      <Card className="p-6 mb-12 bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)]">
        <div className="flex flex-col sm:flex-row gap-4">
          <PDFButton pdfUrl={briefing.pdfUrl} variant="primary" />
          {briefing.youtubeUrl && (
            <a
              href={briefing.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] rounded-xl font-semibold text-sm hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-all duration-300"
            >
              Assistir no YouTube
              <Youtube className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] rounded-xl font-semibold text-sm hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-all duration-300"
          >
            Compartilhar
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Content - Conteúdo textual completo do briefing */}
      {briefing.content && (
        <article className="mb-12 prose prose-invert prose-lg max-w-none">
          <div 
            className="briefing-content text-[rgba(255,255,255,0.92)] leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(briefing.content) }}
          />
        </article>
      )}

      {/* Key Takeaways - Opcional */}
      {/* {briefing.keyTakeaways && (
        <Card className="p-6 mb-12 bg-[#070B14]/70 backdrop-blur-md border border-[#00B86B]/20">
          <h3 className="text-xl font-bold text-[rgba(255,255,255,0.92)] mb-4">Principais pontos</h3>
          <ul className="space-y-2">
            {briefing.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3 text-[rgba(255,255,255,0.66)]">
                <span className="text-[#00B86B] mt-1">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </Card>
      )} */}

      {/* Referências e Dados - Opcional */}
      {/* {briefing.references && (
        <Card className="p-6 mb-12 bg-[#070B14]/50 backdrop-blur-md border border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-bold text-[rgba(255,255,255,0.92)] mb-4">Referências e dados</h3>
          <div className="space-y-2 text-sm text-[rgba(255,255,255,0.66)]">
            {briefing.references.map((ref, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-[rgba(255,255,255,0.46)]">{index + 1}.</span>
                <span>{ref}</span>
              </div>
            ))}
          </div>
        </Card>
      )} */}

      {/* Related Maps */}
      {relatedMaps.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Mapas Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedMaps.map((map) => (
              <ContentCard
                key={map.slug}
                variant="map"
                title={map.title}
                summary={map.summary}
                date={map.date}
                tags={map.tags}
                href={`/strategy/maps/${map.slug}`}
                thumbnail={map.thumbnail}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Briefings */}
      {otherBriefings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Outros Briefings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherBriefings.map((b) => (
              <ContentCard
                key={b.slug}
                variant="briefing"
                title={b.title}
                summary={b.summary}
                date={b.date}
                tags={b.tags}
                href={`/strategy/briefings/${b.slug}`}
                coverImage={b.coverImage}
                readingTime={b.readingTime}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
