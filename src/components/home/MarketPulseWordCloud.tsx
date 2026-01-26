"use client";

import { useEffect, useState } from "react";
import { WordCloudItem } from "@/components/shared/WordCloudItem";
import "../strategy/pulse-wordcloud.css";

interface PulseTerm {
  term: string;
  score: number;
  volume: number;
  acceleration: number;
}

interface PulseData {
  terms: PulseTerm[];
  lastUpdated: string;
  nextUpdate: string;
}

/**
 * LandSpace Market Pulse - Nuvem de Termos de Mercado e Inovação
 * Visual Big Tech com paleta #9fb7c9 (combinando com logo da Home)
 */
export default function MarketPulseWordCloud() {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPulseData() {
      try {
        const response = await fetch('/api/strategy/pulse?context=market');
        const result = await response.json();
        
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError('Erro ao carregar dados');
        }
      } catch (err) {
        console.error('[Market Pulse] Erro ao buscar dados:', err);
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    }

    fetchPulseData();
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchPulseData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins}min atrás`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <section className="py-16 bg-slate-950 border-t border-neutral-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-mono text-neutral-soft">Carregando tendências de mercado...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data || !data.terms || data.terms.length === 0) {
    return null;
  }

  // Normalizar scores para tamanhos de fonte (12px a 32px)
  const maxScore = Math.max(...data.terms.map(t => t.score));
  const minScore = Math.min(...data.terms.map(t => t.score));
  const scoreRange = maxScore - minScore || 1;

  // Função para discretizar fontSize em classes
  const getFontSizeClass = (fontSize: number): string => {
    if (fontSize <= 18) return "text-base";
    if (fontSize <= 22) return "text-lg";
    if (fontSize <= 26) return "text-xl";
    if (fontSize <= 30) return "text-2xl";
    if (fontSize <= 34) return "text-3xl";
    return "text-4xl";
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
    <section className="py-16 bg-slate-950 border-t relative overflow-hidden border-neutral-soft">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none grid-pattern-neutral-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-mono font-semibold tracking-wider text-neutral-live">
              {/* LANDSPACE MARKET PULSE */}
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-[rgba(159,183,201,0.3)] bg-neutral-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-neutral-live"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-live"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-live">LIVE</span>
            </span>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider mb-2 text-[rgba(159,183,201,0.7)]">
            MONITORAMENTO DE MERCADO, INVESTIMENTOS E INOVAÇÃO
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
            
            let color = '#9fb7c9';
            if (normalizedScore < 0.3) {
              color = '#b8cbd9';
            } else if (normalizedScore < 0.6) {
              color = '#a8c0d1';
            } else {
              color = '#9fb7c9';
            }
            
            const glowIntensity = normalizedScore * 0.8;
            const textShadow = normalizedScore > 0.5 
              ? `0 0 ${8 * glowIntensity}px rgba(159, 183, 201, ${0.4 * glowIntensity}), 0 0 ${16 * glowIntensity}px rgba(159, 183, 201, ${0.2 * glowIntensity})`
              : 'none';
            
            const floatDelay = index * 0.1;
            const floatDuration = 4 + (index % 3) * 0.5;
            
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
                hoverColor="#9fb7c9"
                hoverTextShadow="0 0 15px rgba(159, 183, 201, 0.8), 0 0 30px rgba(159, 183, 201, 0.4)"
              />
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-300 font-mono">
            Dados do GDELT Project • Atualizado a cada 1 hora
          </p>
          <p className="text-xs text-slate-300 font-mono mt-2">
            {/* Market Intelligence • Processamento em Tempo Real */}
          </p>
        </div>
      </div>
    </section>
  );
}
