import { getAllBriefings as getStaticBriefings } from "@/content/strategy/briefings";
import { getAllBriefings as getMDXBriefings } from "@/lib/briefings";
import Link from "next/link";
import Image from "next/image";

interface RelatedBriefingsSectionProps {
  currentSlug: string;
}

export default function RelatedBriefingsSection({ currentSlug }: RelatedBriefingsSectionProps) {
  // Combinar briefings MDX e estáticos
  const mdxBriefings = getMDXBriefings();
  const staticBriefings = getStaticBriefings();
  
  // Converter MDX briefings para formato compatível
  const mdxFormatted = mdxBriefings.map((b) => ({
    slug: b.slug,
    title: b.meta.title,
    summary: b.meta.summary,
    date: b.meta.publishedAt,
    tags: b.meta.tags,
    coverImage: b.meta.coverImageUrl,
    readingTime: b.meta.readingTime,
  }));
  
  // Converter briefings estáticos para formato compatível
  const staticFormatted = staticBriefings.map((b) => ({
    slug: b.slug,
    title: b.title,
    summary: b.summary,
    date: b.date,
    tags: b.tags,
    coverImage: b.coverImage,
    readingTime: b.readingTime,
  }));
  
  const allBriefings = [...mdxFormatted, ...staticFormatted];
  const otherBriefings = allBriefings
    .filter((b) => b.slug !== currentSlug)
    .slice(0, 3);

  if (otherBriefings.length === 0) {
    return null;
  }

  return (
    <div className="editorial-related-rail">
      <p className="text-xs font-sans uppercase tracking-wider mb-4 war-room-section-title">
        OUTROS BRIEFINGS
      </p>
      <div className="space-y-4">
        {otherBriefings.map((briefing) => {
          // Normalizar coverImage path
          const normalizedCoverImage = briefing.coverImage 
            ? (briefing.coverImage.startsWith('/') ? briefing.coverImage : `/${briefing.coverImage}`)
            : undefined;
          
          return (
            <Link
              key={briefing.slug}
              href={`/strategy/briefings/${briefing.slug}`}
              className="war-room-terminal block p-4 no-underline relative"
            >
              {/* Corner brackets HUD */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l war-room-corner-bracket" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r war-room-corner-bracket" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l war-room-corner-bracket" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r war-room-corner-bracket" />
              
              <div className="flex items-start gap-3">
                {normalizedCoverImage && (
                  <div className="flex-shrink-0 w-20 h-20 relative rounded-sm overflow-hidden border war-room-border">
                    <Image
                      src={normalizedCoverImage}
                      alt={briefing.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-serif font-semibold mb-1 leading-snug war-room-title">
                    {briefing.title}
                  </h3>
                  <p className="text-xs font-serif leading-relaxed line-clamp-2 mb-2 war-room-text">
                    {briefing.summary}
                  </p>
                  <span className="text-xs font-sans inline-flex items-center gap-1 uppercase tracking-wider war-room-accent font-intelligence-mono">
                    LER BRIEFING
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
