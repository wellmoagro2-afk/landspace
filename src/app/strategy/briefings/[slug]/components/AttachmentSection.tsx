"use client";

import Link from "next/link";
import { Youtube, Map, Headphones } from "lucide-react";
import { getMapBySlug } from "@/content/strategy/maps";
import { getPodcastBySlug } from "@/content/strategy/podcast";
import type { ReactNode } from "react";

interface AttachmentSectionProps {
  mapEmbedUrl?: string;
  mapDownloadPath?: string;
  mapUrl?: string;
  youtubeUrl?: string;
  relatedMaps?: string[]; // Array de slugs de mapas relacionados
  relatedPodcast?: string; // Slug do podcast relacionado
}

/**
 * Hub Multimídia - Recursos de Inteligência
 * 3 Botões Big Tech em linha: Vídeo | Mapa | Podcast
 * Estilo Big Tech com bordas neon verde esmeralda e hover effects
 */
export default function AttachmentSection({
  mapEmbedUrl,
  mapDownloadPath,
  mapUrl,
  youtubeUrl,
  relatedMaps,
  relatedPodcast,
}: AttachmentSectionProps) {
  // Determinar se há recursos para exibir
  const hasVideo = !!youtubeUrl;
  
  // Verificar se há mapa relacionado (prioridade: relatedMaps > mapUrl > mapEmbedUrl)
  const firstRelatedMap = relatedMaps && relatedMaps.length > 0 
    ? getMapBySlug(relatedMaps[0]) 
    : null;
  const hasMap = !!(firstRelatedMap || mapUrl || mapEmbedUrl || (relatedMaps && relatedMaps.length > 0));
  
  // Verificar se há podcast relacionado
  // getPodcastBySlug pode retornar undefined, então sempre verificar relatedPodcast primeiro
  const hasPodcast = !!relatedPodcast;
  let podcast = null;
  if (hasPodcast) {
    try {
      podcast = getPodcastBySlug(relatedPodcast);
    } catch (e) {
      // Se getPodcastBySlug falhar, continuar com relatedPodcast
      podcast = null;
    }
  }
  
  // Função auxiliar para criar botão padronizado
  const createButton = (
    icon: ReactNode,
    label: string,
    href: string | null,
    isExternal: boolean = false,
    disabled: boolean = false
  ) => {
    const buttonContent = (
      <div
        className={`w-full h-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm border transition-all min-h-[48px] ${
          disabled ? 'opacity-30 cursor-not-allowed' : 'war-room-button'
        }`}
      >
        {icon}
        <span>{label}</span>
        {!disabled && <span className="war-room-accent">→</span>}
      </div>
    );

    if (disabled || !href) {
      return (
        <div className="w-full">
          {buttonContent}
        </div>
      );
    }

    if (isExternal) {
      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block no-underline"
        >
          {buttonContent}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className="w-full block no-underline"
      >
        {buttonContent}
      </Link>
    );
  };

  // Determinar URLs e estados
  const videoUrl = hasVideo ? youtubeUrl! : null;
  const mapHref = firstRelatedMap 
    ? `/strategy/maps/${firstRelatedMap.slug}`
    : relatedMaps && relatedMaps.length > 0
    ? `/strategy/maps/${relatedMaps[0]}`
    : mapUrl || null;
  const podcastUrl = relatedPodcast ? `/strategy/podcast/${relatedPodcast}` : null;

  return (
    <div className="attachment-section mt-16 pt-8 border-t war-room-border">
      <h2 className="text-sm font-sans font-semibold uppercase tracking-wider mb-4 war-room-section-title opacity-90">
        // RECURSOS DE INTELIGÊNCIA
      </h2>

      {/* Lista elegante de recursos - Aparece apenas na impressão */}
      <ul className="attachment-resources-list hidden">
        {hasMap && (
          <li>📡 Mapa Interativo Disponível Online</li>
        )}
        {hasVideo && (
          <li>📺 Vídeo Relacionado Disponível Online</li>
        )}
        {hasPodcast && (
          <li>🎙️ Análise em Áudio Disponível Online</li>
        )}
        <li className="attachment-resources-link">
          landspace.com/strategy
        </li>
      </ul>

      {/* Grid de 3 colunas fixo: Vídeo | Mapa | Podcast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Botão 1: VÍDEO */}
        {createButton(
          <Youtube className="w-4 h-4 war-room-accent" />,
          "VÍDEO",
          videoUrl,
          true,
          !hasVideo
        )}

        {/* Botão 2: MAPA */}
        {createButton(
          <Map className="w-4 h-4 war-room-accent" />,
          "MAPA",
          mapHref,
          false,
          !hasMap
        )}

        {/* Botão 3: PODCAST */}
        {createButton(
          <Headphones className="w-4 h-4 war-room-accent" />,
          "PODCAST",
          podcastUrl,
          false,
          !hasPodcast
        )}
      </div>
    </div>
  );
}
