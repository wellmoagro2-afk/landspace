"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface FeaturedCardProps {
  variant: "briefing" | "map" | "podcast";
  title: string;
  summary: string;
  date: string;
  tags: string[];
  href: string;
  coverImage?: string;
  thumbnail?: string;
  readingTime?: string;
  duration?: string;
  badge?: string;
}

export default function FeaturedCard({
  variant,
  title,
  summary,
  date,
  tags,
  href,
  coverImage,
  thumbnail,
  readingTime,
  duration,
  badge = "Destaque",
}: FeaturedCardProps) {
  const hasImage = (coverImage || thumbnail);
  const imageSrc = coverImage || thumbnail;
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card className="overflow-hidden p-0 hover:border-emerald-500/30 transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Thumbnail */}
        <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-slate-800 to-slate-900">
          {hasImage && imageSrc && !imageError ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              onError={() => {
                // Se a imagem falhar ao carregar, mostrar a seta
                setImageError(true);
              }}
            />
          ) : null}
          
          {/* Seta padrão - sempre visível quando não há imagem ou quando a imagem falha */}
          {(!hasImage || !imageSrc || imageError) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-emerald-500/30 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-500/20 hover:bg-emerald-500/40 hover:shadow-emerald-500/30 transition-all duration-300">
                <ArrowRight className="w-14 h-14 text-emerald-300 ml-1 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          )}
          {badge && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {title}
          </h3>
          <p className="text-base text-slate-300 leading-relaxed">
            {summary}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            {readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-green-500 transition-all duration-300"
            >
              {variant === "briefing" && "Ler briefing"}
              {variant === "map" && "Abrir mapa"}
              {variant === "podcast" && "Ouvir"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
