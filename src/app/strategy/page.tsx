"use client";

import StrategyHero from "@/components/strategy/StrategyHero";
import SectionCards from "@/components/strategy/SectionCards";
import ContentCard from "@/components/strategy/ContentCard";
import FeaturedCard from "@/components/strategy/FeaturedCard";
import NewsletterCard from "@/components/strategy/NewsletterCard";
import StrategyNewsletterCTA from "@/components/strategy/StrategyNewsletterCTA";
import ConsultancyCTACard from "@/components/strategy/ConsultancyCTACard";
import SectionViewAll from "@/components/strategy/SectionViewAll";
import dynamic from "next/dynamic";
import { getAllBriefings } from "@/content/strategy/briefings";
import { getAllMaps, getFeaturedMap } from "@/content/strategy/maps";
import { getAllPodcasts } from "@/content/strategy/podcast";

// Dynamic import para evitar hydration mismatch
// Temporariamente desabilitado para testar violações CSP
// const PulseWordCloud = dynamic(() => import("@/components/strategy/PulseWordCloud"), {
//   ssr: false,
//   loading: () => (
//     <section className="py-16 bg-[#05070C] border-t border-[#10b981]/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <p className="text-sm text-[#10b981]/60 font-mono">Carregando tendências...</p>
//         </div>
//       </div>
//     </section>
//   ),
// });

export default function StrategyPage() {
  const briefings = getAllBriefings().slice(0, 6);
  const featuredMap = getFeaturedMap();
  const otherMaps = featuredMap
    ? getAllMaps().filter((m) => m.slug !== featuredMap.slug).slice(0, 4)
    : getAllMaps().slice(0, 4);
  const podcasts = getAllPodcasts().slice(0, 4);

  return (
    <div className="min-h-screen bg-[#05070C] relative" data-variant="strategy">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-emerald-lg"></div>

      <main className="relative z-10">
        <StrategyHero />
        
        {/* LandSpace Pulse - Radar de Tendências */}
        {/* <PulseWordCloud /> */}
        <div data-testid="pulse-wordcloud-disabled" />
        
        <SectionCards />

        {/* Briefings Section */}
        <section id="briefings" className="py-24 bg-[#05070C] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Briefings
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl">
                  Análises geopolíticas diretas e acionáveis, orientadas por mapas e dados geoespaciais.
                </p>
              </div>
              <div className="flex-shrink-0">
                <SectionViewAll href="/strategy/briefings" placement="top" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {briefings.map((briefing) => (
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
              ))}
            </div>

            {/* Mobile bottom CTA */}
            <div className="mt-6 md:hidden">
              <SectionViewAll href="/strategy/briefings" placement="bottom" />
            </div>
          </div>
        </section>

        {/* Maps Section */}
        <section id="mapas" className="py-24 bg-[#05070C] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Mapas
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl">
                  Visualizações geoespaciais interativas que contam histórias complexas.
                </p>
              </div>
              <div className="flex-shrink-0">
                <SectionViewAll href="/strategy/maps" placement="top" />
              </div>
            </div>

            {featuredMap && (
              <div className="mb-16">
                <FeaturedCard
                  variant="map"
                  title={featuredMap.title}
                  summary={featuredMap.summary}
                  date={featuredMap.date}
                  tags={featuredMap.tags}
                  href={`/strategy/maps/${featuredMap.slug}`}
                  thumbnail={featuredMap.thumbnail}
                  badge="Mapa da Semana"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMaps.map((map) => (
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
              ))}
            </div>

            {/* Mobile bottom CTA */}
            <div className="mt-6 md:hidden">
              <SectionViewAll href="/strategy/maps" placement="bottom" />
            </div>
          </div>
        </section>

        {/* Podcast Section */}
        <section id="podcast" className="py-24 bg-[#05070C] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Podcast
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl">
                  Análises profundas em formato conversacional, com contexto e leitura estratégica.
                </p>
              </div>
              <div className="flex-shrink-0">
                <SectionViewAll href="/strategy/podcast" placement="top" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {podcasts.map((podcast) => (
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
              ))}
            </div>

            {/* Mobile bottom CTA */}
            <div className="mt-6 md:hidden">
              <SectionViewAll href="/strategy/podcast" placement="bottom" />
            </div>
          </div>
        </section>

        {/* Newsletter CTA Hero - apenas na landing */}
        <StrategyNewsletterCTA variant="hero" />
        
        <NewsletterCard />

        {/* Card de Fechamento - Consultoria Estratégica (Grand Finale) */}
        <ConsultancyCTACard />
      </main>
    </div>
  );
}
