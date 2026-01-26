"use client";

import { useEffect, useState } from "react";
import { WordCloudItem } from "@/components/shared/WordCloudItem";

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
 * LandSpace Studio Pulse - Nuvem de Termos de Serviços Cartográficos
 * Visual Big Tech com paleta Índigo (#6366f1)
 */
export default function StudioPulseWordCloud() {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPulseData() {
      try {
        const response = await fetch('/api/strategy/pulse?context=studio');
        const result = await response.json();
        
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError('Erro ao carregar dados');
        }
      } catch (err) {
        console.error('[Studio Pulse] Erro ao buscar dados:', err);
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
      <section className="py-16 bg-slate-950 border-t border-indigo-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-mono text-indigo-soft">Carregando tendências de serviços cartográficos...</p>
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

  return (
    <section className="py-16 bg-slate-950 border-t relative overflow-hidden border-indigo-soft">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none grid-pattern-indigo"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-mono font-semibold text-indigo-400 tracking-wider">
              {"// LANDSPACE STUDIO PULSE"}
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-indigo-400/30 bg-indigo-400/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
              </span>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">LIVE</span>
            </span>
          </div>
          <p className="text-xs font-mono text-indigo-400/70 uppercase tracking-wider mb-2">
            MONITORAMENTO GLOBAL DE SERVIÇOS CARTOGRÁFICOS E DEMANDA DE MAPAS
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
            // Calcular tamanho da fonte baseado no score (16px a 36px) - mínimo maior para melhor legibilidade
            const normalizedScore = (term.score - minScore) / scoreRange;
            const fontSize = 16 + (normalizedScore * 20); // 16px a 36px
            
            // Calcular opacidade baseado no score (0.7 a 1.0) - mínimo 0.7 para máxima legibilidade
            const opacity = 0.7 + (normalizedScore * 0.3);
            
            // Determinar cor: índigo para scores altos, variações mais claras para médios e baixos
            let color = '#818cf8'; // indigo-400
            if (normalizedScore < 0.3) {
              color = '#c7d2fe'; // indigo-200 - Mais claro para scores baixos (máxima legibilidade)
            } else if (normalizedScore < 0.6) {
              color = '#a5b4fc'; // indigo-300 - Claro para scores médios
            } else {
              color = '#818cf8'; // indigo-400 - Cor padrão para scores altos
            }
            
            // Text shadow (glow) baseado no score - Índigo
            const glowIntensity = normalizedScore * 0.8;
            const textShadow = normalizedScore > 0.5 
              ? `0 0 ${8 * glowIntensity}px rgba(99, 102, 241, ${0.4 * glowIntensity}), 0 0 ${16 * glowIntensity}px rgba(99, 102, 241, ${0.2 * glowIntensity})`
              : 'none';
            
            // Animação de float única para cada palavra (delay aleatório baseado no index)
            const floatDelay = index * 0.1;
            const floatDuration = 4 + (index % 3) * 0.5; // Varia entre 4s e 5.5s
            
            // Helper functions para classes CSS baseadas em valores calculados
            const getFontSizeClass = (size: number): string => {
              if (size >= 32) return 'text-3xl';
              if (size >= 28) return 'text-2xl';
              if (size >= 24) return 'text-xl';
              if (size >= 20) return 'text-lg';
              return 'text-base';
            };
            
            const getOpacityClass = (op: number): string => {
              if (op >= 0.95) return 'opacity-100';
              if (op >= 0.85) return 'opacity-90';
              if (op >= 0.75) return 'opacity-80';
              return 'opacity-70';
            };
            
            const getFontWeightClass = (score: number): string => {
              if (score >= 0.8) return 'font-bold';
              if (score >= 0.5) return 'font-semibold';
              return 'font-medium';
            };
            
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
                hoverColor="#818cf8"
                hoverTextShadow="0 0 15px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4)"
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
            {/* Studio Intelligence • Processamento em Tempo Real */}
          </p>
        </div>
      </div>
    </section>
  );
}
