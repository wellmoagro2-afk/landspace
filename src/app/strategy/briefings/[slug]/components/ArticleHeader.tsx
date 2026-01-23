import Image from "next/image";
import { STRATEGY_EDITORIAL_KICKER } from "@/lib/strategy/constants";
import TechnicalHeader from "./TechnicalHeader";

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  coverImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
  readingTime: string;
  volume?: number;
  edition?: number;
  briefingId?: string;
  doi?: string;
  slug: string;
}

export default function ArticleHeader({
  title,
  subtitle,
  summary,
  tags,
  coverImageUrl,
  publishedAt,
  createdAt,
  readingTime,
  volume,
  edition,
  briefingId,
  doi,
  slug,
}: ArticleHeaderProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <header className="mb-12">
      {/* Kicker - War Room Style */}
      <div className="mb-4">
        <span className="text-xs font-sans uppercase tracking-widest war-room-text opacity-70">
          {STRATEGY_EDITORIAL_KICKER}
        </span>
      </div>

      {/* Cabeçalho Técnico HUD */}
      <TechnicalHeader 
        volume={volume}
        edition={edition}
        briefingId={briefingId}
        doi={doi}
        slug={slug}
      />

      {/* Headline - War Room Style com text-shadow verde */}
      <h1 className="intelligence-title text-4xl md:text-5xl font-semibold leading-tight mb-6 tracking-tight war-room-title">
        {title}
      </h1>

      {/* Deck/Subtitle */}
      {subtitle && (
        <p className="text-xl font-serif leading-relaxed mb-6 war-room-text">
          {subtitle}
        </p>
      )}

      {/* Summary */}
      <p className="text-lg font-serif leading-relaxed mb-6 war-room-text">
        {summary}
      </p>

      {/* Byline & Meta - War Room Style (Monospace, Verde, Uppercase) */}
      <div className="intelligence-meta flex flex-wrap items-center gap-3 text-xs mb-6 uppercase tracking-wider war-room-meta">
        <span>[ CLASSIFICAÇÃO: ESTRATÉGICO</span>
        {tags && tags.length > 0 && (
          <span>// REF: {tags.map(t => t.toUpperCase()).join(' / ')}</span>
        )}
        <span>]</span>
      </div>

      {/* Hairline Divider */}
      <div className="border-t pt-6 war-room-border">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-sans uppercase tracking-wide border war-room-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover Image - War Room Style com glow */}
      {coverImageUrl ? (
        <div className="relative w-full aspect-video mt-8 mb-12 rounded-sm overflow-hidden border war-room-border war-room-accent-glow">
          <Image
            src={coverImageUrl.startsWith('/') ? coverImageUrl : `/${coverImageUrl}`}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
            priority
          />
        </div>
      ) : (
        // Placeholder War Room
        <div className="relative w-full aspect-video mt-8 mb-12 rounded-sm overflow-hidden border flex items-center justify-center war-room-border bg-[rgba(2,4,10,0.5)] war-room-accent-glow-single">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center border bg-[rgba(16,185,129,0.1)] war-room-border war-room-accent-glow-single">
              <svg
                className="w-8 h-8 war-room-accent"
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
            <p className="text-sm font-sans war-room-text">Sem imagem de capa</p>
          </div>
        </div>
      )}
    </header>
  );
}
