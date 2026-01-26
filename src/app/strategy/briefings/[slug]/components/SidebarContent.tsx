"use client";

import Link from "next/link";
import Image from "next/image";
import IntelligenceResources from "./IntelligenceResources";

interface RelatedBriefing {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
}

interface SidebarContentProps {
  currentSlug: string;
  takeaways?: string[];
  relatedBriefings?: RelatedBriefing[];
  hasMap?: boolean;
}

/**
 * Sidebar otimizada - War Room Style
 * Contém: Recursos de Inteligência, Key Takeaways, Briefings Relacionados
 */
export default function SidebarContent({ 
  currentSlug, 
  takeaways, 
  relatedBriefings = [],
  hasMap = false
}: SidebarContentProps) {
  return (
    <div className="sticky top-24 space-y-8">
      {/* Recursos de Inteligência - NOVO BOX PRINCIPAL */}
      <IntelligenceResources 
        briefingSlug={currentSlug}
        hasMap={hasMap}
      />

      {/* Key Takeaways (se disponível) */}
      {takeaways && takeaways.length > 0 && (
        <div className="war-room-glass p-5 rounded-lg">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 war-room-section-title">
            {/* PONTOS CHAVE */}
          </h3>
          <ul className="space-y-2">
            {takeaways.slice(0, 5).map((item, index) => (
              <li 
                key={index} 
                className="text-sm leading-relaxed flex items-start gap-2 war-room-text"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-[color:var(--war-room-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Briefings Relacionados */}
      {relatedBriefings.length > 0 && (
        <div className="war-room-terminal p-5 relative">
          {/* Corner brackets HUD */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l war-room-corner-bracket" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r war-room-corner-bracket" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l war-room-corner-bracket" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r war-room-corner-bracket" />
          
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 war-room-section-title">
            PRÓXIMAS ANÁLISES
          </h3>
          <div className="space-y-3">
            {relatedBriefings.map((briefing) => {
              const normalizedCoverImage = briefing.coverImage 
                ? (briefing.coverImage.startsWith('/') ? briefing.coverImage : `/${briefing.coverImage}`)
                : undefined;
              
              return (
                <Link
                  key={briefing.slug}
                  href={`/strategy/briefings/${briefing.slug}`}
                  className="block group no-underline"
                >
                  {normalizedCoverImage && (
                    <div className="relative w-full h-24 mb-2 rounded-sm overflow-hidden border war-room-border">
                      <Image
                        src={normalizedCoverImage}
                        alt={briefing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="280px"
                      />
                    </div>
                  )}
                  <h4 className="text-xs font-serif font-semibold mb-1 leading-snug line-clamp-2 group-hover:underline transition-colors war-room-title">
                    {briefing.title}
                  </h4>
                  <p className="text-xs leading-relaxed line-clamp-2 war-room-text opacity-80">
                    {briefing.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
