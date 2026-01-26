"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterBar from "@/components/strategy/FilterBar";
import ContentGrid from "@/components/strategy/ContentGrid";
import StrategyNewsletterCTA from "@/components/strategy/StrategyNewsletterCTA";
import { ArrowLeft } from "lucide-react";
import type { Briefing } from "@/content/strategy/briefings";

interface BriefingsClientProps {
  initialBriefings: Array<Pick<Briefing, "slug" | "title" | "summary" | "date" | "tags" | "readingTime" | "coverImage"> & Partial<Omit<Briefing, "slug" | "title" | "summary" | "date" | "tags" | "readingTime" | "coverImage">>>;
}

export default function BriefingsClient({ initialBriefings }: BriefingsClientProps) {
  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get('tag');
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Derivar effectiveSelectedTags: prioriza tag da URL, senão usa state
  const effectiveSelectedTags = tagFromUrl ? [tagFromUrl] : selectedTags;

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialBriefings.forEach((briefing) => {
      briefing.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [initialBriefings]);

  const filteredBriefings = useMemo<Briefing[]>(() => {
    return initialBriefings.filter((briefing) => {
      // Filtro por tags (usa effectiveSelectedTags que deriva da URL ou state)
      if (effectiveSelectedTags.length > 0 && !effectiveSelectedTags.includes("all")) {
        const hasSelectedTag = briefing.tags.some((tag) => effectiveSelectedTags.includes(tag));
        if (!hasSelectedTag) return false;
      }

      // Filtro por busca
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = briefing.title.toLowerCase().includes(query);
        const matchesSummary = briefing.summary.toLowerCase().includes(query);
        const matchesTags = briefing.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesSummary && !matchesTags) return false;
      }

      return true;
    }) as Briefing[];
  }, [initialBriefings, effectiveSelectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-[#05070C] relative" data-variant="strategy">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-emerald-lg"
      ></div>

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
              Briefings
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.66)] max-w-2xl">
              Análises geopolíticas diretas e acionáveis, orientadas por mapas e dados
              geoespaciais.
            </p>
          </div>

          {/* Filtros */}
          <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            tags={allTags}
            selectedTags={effectiveSelectedTags}
            onTagToggle={handleTagToggle}
            searchPlaceholder="Buscar briefings..."
          />

          {/* Grid */}
          <ContentGrid
            items={filteredBriefings}
            variant="briefing"
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
