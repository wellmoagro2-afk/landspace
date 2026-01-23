"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, GraduationCap, Heart, Layers, Code, Brain } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

interface AcademyCourse {
  slug: string;
  title: string;
  subtitle: string;
  iconName: 'Layers' | 'Code' | 'Brain';
  capabilities: string[];
  overview: string;
  methodology: string;
  audience: string;
}

interface AcademyCourseCardProps {
  course: AcademyCourse;
  index?: number;
}

// Mapeamento de ícones (resolvido no Client Component)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Code,
  Brain,
};

export default function AcademyCourseCard({ course, index = 0 }: AcademyCourseCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [popupPosition, setPopupPosition] = useState<"left" | "right">("right");
  const [popupCoords, setPopupCoords] = useState({ top: 0, left: 0, right: 0 });
  const [mounted, setMounted] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useCart();
  const isFavorited = isFavorite(course.slug);
  const IconComponent = iconMap[course.iconName] || Layers;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Não navegar se clicou em botão, link, ou popup
    if (target.closest('button') || target.closest('a') || target.closest('[data-popup]')) {
      return;
    }
    // Usar router.push para navegação correta com Next.js
    router.push(`/academy/${course.slug}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePopupPosition = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const popupWidth = 320;
    const margin = 12;
    const cardRight = rect.right;
    const spaceOnRight = windowWidth - cardRight;
    
    const position = spaceOnRight >= (popupWidth + margin) ? "right" : "left";
    setPopupPosition(position);
    
    if (position === "right") {
      setPopupCoords({
        top: rect.top,
        left: rect.right + margin,
        right: 0,
      });
    } else {
      const calculatedLeft = rect.left - popupWidth - margin;
      const finalLeft = calculatedLeft < 0 ? margin : calculatedLeft;
      setPopupCoords({
        top: rect.top,
        left: finalLeft,
        right: 0,
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
    setTimeout(updatePopupPosition, 0);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isPopupHovered) {
        setIsHovered(false);
      }
    }, 100);
  };

  const handlePopupMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPopupHovered(true);
    setIsHovered(true);
  };

  const handlePopupMouseLeave = () => {
    setIsPopupHovered(false);
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered) {
      updatePopupPosition();
      window.addEventListener("scroll", updatePopupPosition, true);
      window.addEventListener("resize", updatePopupPosition);
      return () => {
        window.removeEventListener("scroll", updatePopupPosition, true);
        window.removeEventListener("resize", updatePopupPosition);
      };
    }
  }, [isHovered, updatePopupPosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (popupRef.current && (isHovered || isPopupHovered)) {
      popupRef.current.style.setProperty('--popup-top', `${popupCoords.top}px`);
      popupRef.current.style.setProperty('--popup-left', `${popupCoords.left}px`);
    }
  }, [popupCoords, isHovered, isPopupHovered]);

  // Calcular classe de delay discreta (sem CSS variables)
  const getDelayClass = (idx: number): string => {
    const delayMs = idx * 100;
    const clamped = Math.max(0, Math.min(5000, delayMs));
    const step = Math.round(clamped / 100) * 100;
    return `ad-${step}`;
  };
  
  const delayClass = getDelayClass(index);

  const popupContent = (isHovered || isPopupHovered) && mounted ? (
    <div
      ref={popupRef}
      className="course-popup-positioned fixed z-[9999] w-80 border-2 border-slate-800 rounded-2xl shadow-2xl p-5 animate-fade-in-up flex flex-col bg-slate-900/95 backdrop-blur-xl cursor-pointer max-h-[90vh] min-h-[520px]"
      onMouseEnter={handlePopupMouseEnter}
      onMouseLeave={handlePopupMouseLeave}
      data-popup
    >
      {/* Seta apontando para o card */}
      <div
        className={`absolute top-8 w-0 h-0 ${
          popupPosition === "right"
            ? "left-0 -ml-3 border-t-[12px] border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-[#e5e5e5]"
            : "right-0 -mr-3 border-t-[12px] border-b-[12px] border-l-[12px] border-t-transparent border-b-transparent border-l-[#e5e5e5]"
        }`}
      >
        <div
          className={`absolute top-[-11px] w-0 h-0 ${
            popupPosition === "right"
              ? "left-[1px] border-t-[11px] border-b-[11px] border-r-[11px] border-t-transparent border-b-transparent border-r-white"
              : "right-[1px] border-t-[11px] border-b-[11px] border-l-[11px] border-t-transparent border-b-transparent border-l-white"
          }`}
        />
      </div>

          {/* Tags no Topo */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="accent">
          Capacitação Técnica Avançada
        </Badge>
      </div>

      {/* Header com favorito */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 mb-2">
            {course.title}
          </h3>
          <p className="text-xs text-slate-400">
            Wellmo Alves, PhD
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFavorited) {
              removeFromFavorites(course.slug);
            } else {
              addToFavorites(course.slug);
            }
          }}
          className={`btn-landspace-glow p-2 rounded-full transition-colors flex-shrink-0 border ${
            isFavorited
              ? "bg-red-900/30 text-red-400 hover:text-purple-400 border-red-500/30"
              : "bg-slate-900/50 text-slate-400 hover:bg-slate-800/50 hover:text-purple-400 border-slate-700"
          }`}
          aria-label="Favoritar curso"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Descrição */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 min-h-[4rem] line-clamp-3 font-medium">
        {course.subtitle}
      </p>

      {/* Visão geral */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-bold text-white">Visão geral:</h4>
        <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-3">
          {course.overview}
        </p>
      </div>

      {/* O que o participante será capaz de fazer */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-bold text-white">O que você será capaz de realizar:</h4>
        <ul className="space-y-1.5">
            {course.capabilities.slice(0, 3).map((capability, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-[rgb(var(--ls-academy-accent-light))] flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2 font-medium">{capability}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Abordagem metodológica */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-bold text-white">Abordagem metodológica:</h4>
        <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-2">
          {course.methodology}
        </p>
      </div>

      {/* Público recomendado */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-bold text-white">Público recomendado:</h4>
        <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-2">
          {course.audience}
        </p>
      </div>

      {/* Botões - Primário (roxo) e Secundário (neutro) */}
      <div className="space-y-2 pt-3 mt-auto border-t border-slate-800">
        <ButtonLink
          href={`/academy/${course.slug}`}
          variant="primary"
          size="md"
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        >
          Acessar página do curso
          <ArrowRight className="w-4 h-4" />
        </ButtonLink>
        <ButtonLink
          href={`/academy/${course.slug}`}
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        >
          Ver detalhes completos
          <ArrowRight className="w-4 h-4" />
        </ButtonLink>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`group relative border border-purple-500/20 rounded-3xl overflow-hidden transition-all duration-200 animate-fade-in-up flex flex-col h-full cursor-pointer hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] ${delayClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-card-clickable
    >
        {/* Container da Imagem - Proporção 16:9 */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="w-16 h-16 text-purple-400/30 group-hover:text-purple-400/50 transition-colors duration-200" />
          </div>
          
          {/* Badges Técnicos - Base da imagem */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-10">
            <Badge variant="accent">
              Capacitação Técnica Avançada
            </Badge>
          </div>
        </div>

        {/* Área de Conteúdo - SEMPRE ABAIXO DA IMAGEM */}
        <div className="p-5 space-y-3 flex flex-col flex-1 min-h-0">
          {/* Título - POSICIONADO ABAIXO DA IMAGEM */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors duration-200">
              {course.title}
            </h3>
            <p className="text-xs text-slate-400 font-medium line-clamp-2">
              {course.subtitle}
            </p>
          </div>

          {/* Rodapé do Card */}
          <div className="mt-auto pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-300">Wellmo Alves, PhD</p>
            </div>
            <ButtonLink
              href={`/academy/${course.slug}`}
              variant="secondary"
              size="md"
              className="w-full mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              Ver detalhes
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
      {mounted && createPortal(popupContent, document.body)}
    </>
  );
}

