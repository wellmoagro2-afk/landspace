"use client";

import ContentCard from "./ContentCard";
import type { Briefing } from "@/content/strategy/briefings";
import type { StrategyMap } from "@/content/strategy/maps";
import type { PodcastEpisode } from "@/content/strategy/podcast";

interface ContentGridProps {
  items: (Briefing | StrategyMap | PodcastEpisode)[];
  variant: "briefing" | "map" | "podcast";
  columns?: 1 | 2 | 3 | 4;
}

export default function ContentGrid({ items, variant, columns = 3 }: ContentGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[rgba(255,255,255,0.66)] text-lg">Nenhum item encontrado.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {items.map((item) => {
        if (variant === "briefing") {
          const briefing = item as Briefing;
          return (
            <ContentCard
              key={briefing.slug}
              variant="briefing"
              title={briefing.title}
              summary={briefing.summary}
              date={briefing.date}
              tags={briefing.tags}
              href={`/strategy/briefings/${briefing.slug}`}
              coverImage={briefing.coverImage}
              readingTime={briefing.readingTime}
            />
          );
        } else if (variant === "map") {
          const map = item as StrategyMap;
          return (
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
          );
        } else {
          const podcast = item as PodcastEpisode;
          return (
            <ContentCard
              key={podcast.slug}
              variant="podcast"
              title={podcast.title}
              summary={podcast.summary}
              date={podcast.date}
              tags={podcast.tags}
              href={`/strategy/podcast/${podcast.slug}`}
              coverImage={podcast.coverImage}
              duration={podcast.duration}
            />
          );
        }
      })}
    </div>
  );
}
