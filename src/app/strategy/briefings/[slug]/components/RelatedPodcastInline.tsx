import Link from "next/link";
import { Headphones, Clock } from "lucide-react";
import { getPodcastBySlug } from "@/content/strategy/podcast";

interface RelatedPodcastInlineProps {
  podcastSlug: string;
}

/**
 * Módulo discreto "Podcast relacionado" para aparecer dentro do briefing
 * Estilo editorial discreto, não compete com o texto principal
 */
export default function RelatedPodcastInline({ podcastSlug }: RelatedPodcastInlineProps) {
  const podcast = getPodcastBySlug(podcastSlug);

  if (!podcast) {
    return null;
  }

  return (
    <div className="my-8 p-4 border border-[rgba(0,0,0,0.12)] bg-[rgba(0,0,0,0.02)] rounded-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Headphones className="w-4 h-4 text-[#6A6A6A]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-sans uppercase tracking-wider text-[#6A6A6A] mb-1">
            Podcast relacionado
          </p>
          <h3 className="text-sm font-serif font-semibold text-[#111111] mb-1.5 leading-snug">
            {podcast.title}
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 text-xs font-sans text-[#6A6A6A]">
              <Clock className="w-3 h-3" />
              <span>{podcast.duration}</span>
            </div>
          </div>
          <Link
            href={`/strategy/podcast/${podcast.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-sans text-[#4B4B4B] hover:text-[#111111] border-b border-transparent hover:border-[#00B86B] transition-colors no-underline"
          >
            Ouvir
            <span className="text-[#6A6A6A]">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
