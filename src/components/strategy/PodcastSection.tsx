"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PODCAST_EPISODES } from "@/app/strategy/data";
import { Play, Clock } from "lucide-react";

export default function PodcastSection() {
  return (
    <section id="podcast" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Podcast
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Análises profundas em formato conversacional, com contexto e leitura estratégica.
          </p>
        </div>

        {/* Lista de Episódios */}
        <div className="space-y-4">
          {PODCAST_EPISODES.map((episode) => (
            <Card
              key={episode.id}
              className="p-6 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                {/* Player Placeholder */}
                <div className="flex-shrink-0">
                  <button className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 text-emerald-400 ml-1" />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {episode.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{episode.duration}</span>
                    </div>
                    <span>•</span>
                    <span>{episode.date}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/strategy/podcast/${episode.slug}`}
                  className="flex-shrink-0 px-6 py-3 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 text-white rounded-xl font-semibold text-sm hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all duration-300"
                >
                  Ouvir
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
