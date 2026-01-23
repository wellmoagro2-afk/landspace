"use client";

import Link from "next/link";
import { getMapBySlug, getAllMaps } from "@/content/strategy/maps";
import { getBriefingBySlug } from "@/content/strategy/briefings";
import StrategyMap from "@/components/strategy/StrategyMap";
import ContentCard from "@/components/strategy/ContentCard";
import { ArrowLeft, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { StrategyMap as StrategyMapType } from "@/content/strategy/maps";

interface MapDetailClientProps {
  map: StrategyMapType;
}

export default function MapDetailClient({ map }: MapDetailClientProps) {
  const allMaps = getAllMaps();
  const relatedBriefing = map.relatedBriefing
    ? getBriefingBySlug(map.relatedBriefing)
    : null;

  const otherMaps = allMaps
    .filter((m) => m.slug !== map.slug)
    .slice(0, 4);

  return (
    <>
      {/* Back Button */}
      <Link
        href="/strategy/maps"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Mapas
      </Link>

      {/* Header */}
      <div className="mb-8 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {map.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {map.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(map.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {map.summary}
        </p>
      </div>

      {/* Map */}
      <div className="mb-12">
        <StrategyMap map={map} />
      </div>

      {/* Context Section */}
      {relatedBriefing && (
        <Card className="p-6 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Contexto</h2>
          <p className="text-slate-300 mb-4">{relatedBriefing.summary}</p>
          <Link
            href={`/strategy/briefings/${relatedBriefing.slug}`}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Ler briefing relacionado
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </Card>
      )}

      {/* Other Maps */}
      {otherMaps.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Outros Mapas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherMaps.map((m) => (
              <ContentCard
                key={m.slug}
                variant="map"
                title={m.title}
                summary={m.summary}
                date={m.date}
                tags={m.tags}
                href={`/strategy/maps/${m.slug}`}
                thumbnail={m.thumbnail}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
