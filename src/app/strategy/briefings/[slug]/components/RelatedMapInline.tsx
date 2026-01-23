import Link from "next/link";
import { Map } from "lucide-react";
import { getMapBySlug } from "@/content/strategy/maps";

interface RelatedMapInlineProps {
  mapSlug: string;
}

/**
 * Módulo "Mapa relacionado" - War Room HUD Style
 * Aparece no corpo principal do briefing com estilo técnico
 */
export default function RelatedMapInline({ mapSlug }: RelatedMapInlineProps) {
  const map = getMapBySlug(mapSlug);

  if (!map) {
    return null;
  }

  return (
    <div className="war-room-terminal my-8 p-5 relative">
      {/* Corner brackets HUD */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l war-room-corner-bracket" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r war-room-corner-bracket" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l war-room-corner-bracket" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r war-room-corner-bracket" />
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Map className="w-5 h-5 war-room-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-sans uppercase tracking-wider mb-2 war-room-section-title">
            MAPA RELACIONADO
          </p>
          <h3 className="text-base font-serif font-semibold mb-2 leading-snug war-room-title">
            {map.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 line-clamp-2 war-room-text">
            {map.summary}
          </p>
          <Link
            href={`/strategy/maps/${map.slug}`}
            className="intelligence-button inline-flex items-center gap-2 px-4 py-2.5 text-xs border no-underline war-room-button"
          >
            ABRIR MAPA
            <span className="war-room-accent">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
