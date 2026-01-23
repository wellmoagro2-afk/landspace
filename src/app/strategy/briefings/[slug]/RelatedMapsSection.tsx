import { getMapBySlug } from "@/content/strategy/maps";
import Link from "next/link";
import Image from "next/image";

interface RelatedMapsSectionProps {
  mapSlugs: string[];
}

/**
 * Related rail editorial discreto - não compete com o headline
 * Se houver 1 mapa: mostra como "Relacionado"
 * Se houver mais: lista 2-3 e link "Ver todos"
 */
export default function RelatedMapsSection({ mapSlugs }: RelatedMapsSectionProps) {
  const relatedMaps = mapSlugs
    .map((slug) => getMapBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (relatedMaps.length === 0) {
    return null;
  }

  const displayMaps = relatedMaps.slice(0, 3);
  const hasMore = relatedMaps.length > 3;

  return (
    <div className="editorial-related-rail">
      <p className="text-xs font-sans uppercase tracking-wider mb-4 war-room-section-title">
        {relatedMaps.length === 1 ? 'MAPA RELACIONADO' : 'MAPAS RELACIONADOS'}
      </p>
      <div className="space-y-4">
        {displayMaps.map((map) => {
          const normalizedThumbnail = map.thumbnail 
            ? (map.thumbnail.startsWith('/') ? map.thumbnail : `/${map.thumbnail}`)
            : undefined;
          
          return (
            <Link
              key={map.slug}
              href={`/strategy/maps/${map.slug}`}
              className="war-room-terminal block p-4 no-underline relative"
            >
              {/* Corner brackets HUD */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l war-room-corner-bracket" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r war-room-corner-bracket" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l war-room-corner-bracket" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r war-room-corner-bracket" />
              
              <div className="flex items-start gap-3">
                {normalizedThumbnail && (
                  <div className="flex-shrink-0 w-20 h-20 relative rounded-sm overflow-hidden border war-room-border">
                    <Image
                      src={normalizedThumbnail}
                      alt={map.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-serif font-semibold mb-1 leading-snug war-room-title">
                    {map.title}
                  </h3>
                  <p className="text-xs font-serif leading-relaxed line-clamp-2 mb-2 war-room-text">
                    {map.summary}
                  </p>
                  <span className="text-xs font-sans inline-flex items-center gap-1 uppercase tracking-wider war-room-accent font-intelligence-mono">
                    ABRIR MAPA
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        {hasMore && (
          <Link
            href="/strategy/maps"
            className="text-xs font-sans uppercase tracking-wider inline-flex items-center gap-1 no-underline war-room-section-title"
          >
            VER TODOS OS MAPAS
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
