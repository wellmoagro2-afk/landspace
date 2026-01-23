"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface ContentCardProps {
  variant: "briefing" | "map" | "podcast";
  title: string;
  summary: string;
  date: string;
  tags: string[];
  href: string;
  coverImage?: string;
  readingTime?: string;
  duration?: string;
  thumbnail?: string;
}

export default function ContentCard({
  variant,
  title,
  summary,
  date,
  tags,
  href,
  coverImage,
  readingTime,
  duration,
  thumbnail,
}: ContentCardProps) {
  // Determinar se há imagem válida e normalizar path
  const rawImageSrc = coverImage || thumbnail;
  // Normalizar path: garantir que comece com /
  const imageSrc = rawImageSrc ? (rawImageSrc.startsWith('/') ? rawImageSrc : `/${rawImageSrc}`) : null;
  const hasImage = (variant === "briefing" && coverImage) || 
                   (variant === "map" && thumbnail) || 
                   (variant === "podcast" && coverImage);
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card className="overflow-hidden p-0 hover:border-[#00B86B]/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,184,107,0.15)] transition-all duration-300 group bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)]">
      {/* Thumbnail/Cover */}
      <div className="relative h-48 bg-gradient-to-br from-[#070B14] to-[#05070C]">
        {hasImage && imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => {
              // Se a imagem falhar ao carregar, mostrar a seta
              setImageError(true);
            }}
          />
        ) : null}
        
        {/* Seta padrão - sempre visível quando não há imagem ou quando a imagem falha */}
        {(!hasImage || !imageSrc || imageError) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-[rgba(0,184,107,0.16)] rounded-full flex items-center justify-center shadow-lg shadow-[#00B86B]/20 border border-[#00B86B]/20 group-hover:bg-[rgba(0,184,107,0.24)] group-hover:shadow-[#00B86B]/30 transition-all duration-300">
              <ArrowRight className="w-10 h-10 text-[#00B86B] ml-1 drop-shadow-[0_0_4px_rgba(0,184,107,0.5)]" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-[rgba(0,184,107,0.16)] border border-[#00B86B]/20 rounded text-xs font-medium text-[#00B86B]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-[rgba(255,255,255,0.92)] group-hover:text-[#00B86B] transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-[rgba(255,255,255,0.66)] leading-relaxed line-clamp-2">
          {summary}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-[rgba(255,255,255,0.46)]">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}</span>
          </div>
          {readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[#00B86B] hover:text-[#00A85F] font-medium text-sm group-hover:gap-3 transition-all duration-200 no-underline"
        >
          {variant === "briefing" && "Ler"}
          {variant === "map" && "Abrir mapa"}
          {variant === "podcast" && "Ouvir"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
}
