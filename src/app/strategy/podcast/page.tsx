"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllPodcasts } from "@/content/strategy/podcast";
import FilterBar from "@/components/strategy/FilterBar";
import ContentGrid from "@/components/strategy/ContentGrid";
import StrategyNewsletterCTA from "@/components/strategy/StrategyNewsletterCTA";
import { ArrowLeft } from "lucide-react";

export default function PodcastPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const allPodcasts = getAllPodcasts();

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allPodcasts.forEach((podcast) => {
      podcast.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [allPodcasts]);

  const filteredPodcasts = useMemo(() => {
    return allPodcasts.filter((podcast) => {
      // Filtro por tags
      if (selectedTags.length > 0 && !selectedTags.includes("all")) {
        const hasSelectedTag = podcast.tags.some((tag) => selectedTags.includes(tag));
        if (!hasSelectedTag) return false;
      }

      // Filtro por busca
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = podcast.title.toLowerCase().includes(query);
        const matchesSummary = podcast.summary.toLowerCase().includes(query);
        const matchesTags = podcast.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSummary && !matchesTags) return false;
      }

      return true;
    });
  }, [allPodcasts, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    if (tag === "all") {
      setSelectedTags([]);
    } else {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#05070C] relative" data-variant="strategy">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-emerald-lg"></div>

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/strategy"
              className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.66)] hover:text-[#00B86B] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Strategy
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-[rgba(255,255,255,0.92)] tracking-tight mb-4">
              Podcast
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.66)] max-w-2xl">
              Análises profundas em formato conversacional, com contexto e leitura estratégica.
            </p>
          </div>

          {/* Filtros */}
          <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            searchPlaceholder="Buscar episódios..."
          />

          {/* Grid */}
          <ContentGrid
            items={filteredPodcasts}
            variant="podcast"
            columns={3}
          />

          {/* Micro-CTA compacto no final da lista */}
          <div className="mt-12">
            <StrategyNewsletterCTA variant="compact" />
          </div>
        </div>
      </main>
    </div>
  );
}
