"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { STRATEGY_MAPS } from "@/app/strategy/data";
import { ArrowRight, Map } from "lucide-react";

export default function MapsSection() {
  const featuredMap = STRATEGY_MAPS.find(m => m.isFeatured);
  const otherMaps = STRATEGY_MAPS.filter(m => !m.isFeatured);

  return (
    <section id="mapas" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Mapas
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Visualizações geoespaciais interativas que contam histórias complexas.
          </p>
        </div>

        {/* Mapa da Semana - Featured */}
        {featuredMap && (
          <div className="mb-16">
            <Card className="overflow-hidden p-0 hover:border-emerald-500/30 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Thumbnail */}
                <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Map className="w-24 h-24 text-emerald-400/30" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                      Mapa da Semana
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-8 flex flex-col justify-center space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    {featuredMap.title}
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed">
                    {featuredMap.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/strategy/mapas/${featuredMap.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-green-500 transition-all duration-300"
                    >
                      Abrir mapa
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/strategy/mapas/${featuredMap.slug}#contexto`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 text-white rounded-xl font-semibold text-sm hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all duration-300"
                    >
                      Ler contexto
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Grid de Mapas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherMaps.map((map) => (
            <Card
              key={map.id}
              className="overflow-hidden p-0 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map className="w-16 h-16 text-emerald-400/30" />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {map.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {map.description}
                </p>
                <Link
                  href={`/strategy/mapas/${map.slug}`}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm group-hover:gap-3 transition-all duration-200"
                >
                  Abrir
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
