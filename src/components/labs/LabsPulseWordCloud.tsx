"use client";

import { useEffect, useState } from "react";
import { WordCloudItem } from "@/components/shared/WordCloudItem";

interface PulseTerm {
  term: string;
  score: number;
}

interface PulseData {
  terms: PulseTerm[];
  lastUpdated?: string;
}

export default function LabsPulseWordCloud() {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPulse() {
      try {
        const res = await fetch("/api/strategy/pulse?category=labs", {
          next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar");
      } finally {
        setLoading(false);
      }
    }
    fetchPulse();
  }, []);

  const formatLastUpdate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Agora";
    if (diffMins < 60) return `${diffMins} min atrás`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-slate-950 border-t border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-mono text-amber-400/60">Carregando tendências de pesquisa e validação...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data || !data.terms || data.terms.length === 0) {
    return null;
  }

  // Normalizar scores para tamanhos de fonte (16px a 36px)
  const maxScore = Math.max(...data.terms.map(t => t.score));
  const minScore = Math.min(...data.terms.map(t => t.score));
  const scoreRange = maxScore - minScore || 1;

  // Função para discretizar fontSize em classes
  const getFontSizeClass = (fontSize: number): string => {
    if (fontSize <= 18) return "text-base"; // 16px
    if (fontSize <= 22) return "text-lg"; // 18px
    if (fontSize <= 26) return "text-xl"; // 20px
    if (fontSize <= 30) return "text-2xl"; // 24px
    if (fontSize <= 34) return "text-3xl"; // 30px
    return "text-4xl"; // 36px
  };

  // Função para discretizar opacity em classes
  const getOpacityClass = (opacity: number): string => {
    if (opacity <= 0.75) return "opacity-70";
    if (opacity <= 0.85) return "opacity-80";
    if (opacity <= 0.95) return "opacity-90";
    return "opacity-100";
  };

  // Função para discretizar fontWeight
  const getFontWeightClass = (normalizedScore: number): string => {
    if (normalizedScore > 0.7) return "font-semibold";
    if (normalizedScore > 0.4) return "font-medium";
    return "font-normal";
  };

  return (
    <section className="py-16 bg-slate-950 border-t relative overflow-hidden border-amber-500/10">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none grid-pattern-amber"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-mono font-semibold text-amber-400 tracking-wider">
              // LANDSPACE LABS PULSE
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-amber-400/30 bg-amber-400/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">LIVE</span>
            </span>
          </div>
          <p className="text-xs font-mono text-amber-400/70 uppercase tracking-wider mb-2">
            MONITORAMENTO GLOBAL DE PESQUISA, VALIDAÇÃO E DESENVOLVIMENTO
          </p>
          {data.lastUpdated && (
            <p className="text-xs text-slate-300 font-mono">
              Última atualização: {formatLastUpdate(data.lastUpdated)}
            </p>
          )}
        </div>

        {/* Word Cloud - Information Cluster Denso */}
        <div className="pulse-word-cloud relative w-full min-h-[400px] py-12 flex flex-wrap justify-center items-center">
          {data.terms.slice(0, 50).map((term, index) => {
            const normalizedScore = (term.score - minScore) / scoreRange;
            const fontSize = 16 + (normalizedScore * 20);
            const opacity = 0.7 + (normalizedScore * 0.3);
            
            let color = '#f59e0b';
            if (normalizedScore < 0.3) { color = '#fcd34d'; }
            else if (normalizedScore < 0.6) { color = '#fbbf24'; }
            else { color = '#f59e0b'; }
            
            const glowIntensity = normalizedScore * 0.8;
            const textShadow = normalizedScore > 0.5 
              ? `0 0 ${8 * glowIntensity}px rgba(245, 158, 11, ${0.4 * glowIntensity}), 0 0 ${16 * glowIntensity}px rgba(245, 158, 11, ${0.2 * glowIntensity})`
              : 'none';
            
            const floatDelay = index * 0.1;
            const floatDuration = 4 + (index % 3) * 0.5;
            
            // Discretizar valores para classes
            const fontSizeClass = getFontSizeClass(fontSize);
            const opacityClass = getOpacityClass(opacity);
            const fontWeightClass = getFontWeightClass(normalizedScore);
            
            return (
              <WordCloudItem
                key={`${term.term}-${index}`}
                term={term.term}
                fontSizeClass={fontSizeClass}
                opacityClass={opacityClass}
                fontWeightClass={fontWeightClass}
                color={color}
                textShadow={textShadow}
                floatDelay={floatDelay}
                floatDuration={floatDuration}
                hoverColor="#fbbf24"
                hoverTextShadow="0 0 15px rgba(245, 158, 11, 0.8), 0 0 30px rgba(245, 158, 11, 0.4)"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
