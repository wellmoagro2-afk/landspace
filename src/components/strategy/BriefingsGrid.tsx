"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { BRIEFINGS, type Briefing } from "@/app/strategy/data";
import { ArrowRight, Clock } from "lucide-react";

const categories = ["Todos", "Energia", "Água & Clima", "Conflitos", "Agricultura", "Geopolítica"] as const;

export default function BriefingsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const filteredBriefings = selectedCategory === "Todos" 
    ? BRIEFINGS 
    : BRIEFINGS.filter(b => b.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Energia": "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
      "Água & Clima": "bg-blue-500/20 border-blue-500/30 text-blue-400",
      "Conflitos": "bg-red-500/20 border-red-500/30 text-red-400",
      "Agricultura": "bg-green-500/20 border-green-500/30 text-green-400",
      "Geopolítica": "bg-purple-500/20 border-purple-500/30 text-purple-400",
    };
    return colors[category] || "bg-slate-800/50 border-slate-700 text-slate-300";
  };

  return (
    <section id="briefings" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Briefings
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Análises geopolíticas diretas e acionáveis, orientadas por mapas e dados geoespaciais.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                  : "bg-slate-900/60 border border-slate-800/50 text-slate-300 hover:border-emerald-500/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Briefings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBriefings.map((briefing) => (
            <Card
              key={briefing.id}
              className="p-6 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Chip de Categoria */}
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(briefing.category)}`}>
                  {briefing.category}
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {briefing.title}
                </h3>

                {/* Resumo */}
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {briefing.summary}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{briefing.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{briefing.readTime}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/strategy/briefings/${briefing.slug}`}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm group-hover:gap-3 transition-all duration-200"
                >
                  Ler briefing
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
