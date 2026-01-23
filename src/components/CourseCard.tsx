"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Clock3, Sparkles, Heart, CheckCircle2, ArrowRight, Zap, Shield, Bell, Lock, Infinity } from "lucide-react";
import { Course } from "@/app/catalogo/data";
import { useCart } from "@/contexts/CartContext";
import { HideOnError } from "@/components/shared/HideOnError";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
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
  const isComingSoon = course.priceText === "Lançamento em breve";
  const isFeaturedCourse = course.slug === "transicao-uso-cobertura";

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Não navegar se clicou em botão, link, ou popup
    if (target.closest('button') || target.closest('a') || target.closest('[data-popup]')) {
      return;
    }
    // Usar router.push para navegação correta com Next.js
    router.push(`/catalogo/${course.slug}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePopupPosition = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const popupWidth = 320; // w-80 = 320px
    const margin = 12;
    const cardRight = rect.right;
    const spaceOnRight = windowWidth - cardRight;
    
    // Se há mais espaço à direita (pelo menos 340px para o popup de 320px + margem), mostra à direita
    const position = spaceOnRight >= (popupWidth + margin) ? "right" : "left";
    setPopupPosition(position);
    
    // Calcular coordenadas do popup (usando getBoundingClientRect que já considera scroll)
    if (position === "right") {
      setPopupCoords({
        top: rect.top,
        left: rect.right + margin,
        right: 0,
      });
    } else {
      // Quando à esquerda, calcular left = rect.left - popupWidth - margin
      // Mas garantir que não saia da tela
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
    // Delay para permitir que o mouse se mova para o popup
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

  const popupContent = (isHovered || isPopupHovered) && mounted ? (
    <div
      ref={popupRef}
      data-popup
      className="course-popup-positioned fixed z-[9999] w-80 border-2 border-slate-800 rounded-2xl shadow-2xl p-5 animate-fade-in-up flex flex-col bg-slate-900/95 backdrop-blur-xl max-h-[90vh] min-h-[520px]"
      onMouseEnter={handlePopupMouseEnter}
      onMouseLeave={handlePopupMouseLeave}
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
      {/* Tags no Topo Absoluto - Para TODOS os cursos (ativos e inativos) */}
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border border-slate-700">
          {course.level === "Do Básico ao Avançado" ? "Workflow Completo" : course.level}
        </span>
        <span className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-slate-700">
          <Infinity className="w-3.5 h-3.5" />
          Acesso Vitalício
        </span>
      </div>

      {/* Header com favorito */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="space-y-1 mb-2">
            <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
              {course.toolName || course.title}
            </h3>
            {course.application && (
              <p className="text-xs text-slate-400 font-medium">
                Aplicação: {course.application}
              </p>
            )}
          </div>
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
          className={`btn-landspace-glow p-2 rounded-full transition-colors flex-shrink-0 ${
            isFavorited
              ? "bg-red-900/30 text-red-400 hover:text-cyan-400 border-red-500/30"
              : "bg-slate-900/50 text-slate-400 hover:bg-slate-800/50 hover:text-cyan-400 border-slate-700"
          }`}
          aria-label="Favoritar curso"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Descrição completa */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 min-h-[4rem] line-clamp-3 font-medium">
        {course.subtitle}
      </p>

      {/* O que está incluso */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-bold text-white">O que está incluso:</h4>
        <ul className="space-y-1.5">
          {/* Item destacado: Acesso Vitalício à Ferramenta */}
          <li className={`flex items-start gap-2 text-xs px-2 py-1.5 rounded-lg border ${
            isComingSoon
              ? "text-slate-300 bg-slate-900/50 border-slate-700"
              : "text-white bg-slate-900/50 border-slate-700"
          }`}>
            <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
              isComingSoon ? "text-slate-400" : "text-cyan-400"
            }`} />
            <span className="font-bold">{course.bullets[0] || "Acesso Vitalício à Ferramenta de Automação"}</span>
          </li>
          {course.bullets.slice(1, 4).map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2 font-medium">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Preço */}
      <div className="pt-3 mt-auto border-t border-slate-800">
        {course.isPromo && course.discountPercent && course.originalPrice && course.discountPrice ? (
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-white">
                R$ {course.discountPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-sm text-slate-500 line-through font-medium">
                R$ {course.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900/50 text-cyan-400 px-2 py-1 rounded-lg text-xs font-semibold border border-cyan-500/30">
                Economize R$ {(course.originalPrice - course.discountPrice).toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        ) : (
          <div className={`text-xl font-bold ${isComingSoon ? "text-cyan-400" : "text-white"}`}>
            {course.priceText}
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="space-y-2 pt-3">
        <div className="space-y-1.5">
          {isComingSoon ? (
            <Link
              href={`/catalogo/${course.slug}`}
              className="btn-landspace-glow inline-flex items-center justify-center gap-2 w-full text-center px-4 py-3 bg-transparent border border-cyan-500/50 text-cyan-400 rounded-xl font-semibold text-sm hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Bell className="w-4 h-4" />
              Entrar na Lista de Espera
            </Link>
          ) : (
            <Link
              href={`/catalogo/${course.slug}`}
              className="btn-landspace-glow inline-flex items-center justify-center gap-2 w-full text-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:from-cyan-400 hover:to-blue-500 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              Obter Licença de Uso
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
          <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
            {isComingSoon ? (
              "Você será notificado no lançamento oficial."
            ) : (
              <>
                <Shield className="w-3 h-3 text-slate-400" />
                Pagamento seguro via Hotmart
              </>
            )}
          </p>
        </div>
        <Link
          href={`/catalogo/${course.slug}`}
          className="btn-landspace-glow inline-flex items-center justify-center gap-2 w-full text-center px-4 py-2 text-slate-400 hover:text-white font-semibold text-sm border border-slate-800 rounded-xl hover:border-cyan-500 bg-slate-900/30 hover:bg-slate-900/50"
          onClick={(e) => e.stopPropagation()}
        >
          Ver detalhes completos
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`group relative border rounded-3xl overflow-hidden transition-all duration-300 animate-fade-in-up flex flex-col h-full cursor-pointer hover:-translate-y-1 ${
          isComingSoon
            ? "card-dark opacity-90"
            : "card-elevated"
        }`}
        data-animation-delay={index * 100}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-card-clickable
      >
        {/* Container da Imagem - Proporção 16:9 - APENAS IMAGEM, SEM TÍTULO OU TEXTO - NÃO RENDERIZAR TÍTULO AQUI */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex-shrink-0">
          {course.image ? (
            <HideOnError>
              {({ hidden, onError }) => (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out ${hidden ? 'hidden' : ''}`}
                  priority={index < 3}
                  onError={onError}
                />
              )}
            </HideOnError>
          ) : null}
          {/* Placeholder - apenas quando não há imagem */}
          {!course.image && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <Lock className="w-12 h-12 text-slate-600 opacity-30" />
            </div>
          )}
          
          {/* Badge de desconto - Canto superior direito */}
          {course.isPromo && course.discountPercent && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                {course.discountPercent.toFixed(0)}% OFF
              </div>
            </div>
          )}

          {/* Badges Técnicos - Base da imagem */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-10">
            <span className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border border-slate-700">
              {course.level === "Do Básico ao Avançado" ? "Workflow Completo" : course.level}
            </span>
            <span className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-slate-700">
              <Infinity className="w-3.5 h-3.5" />
              Acesso Vitalício
            </span>
          </div>
        </div>

        {/* Área de Conteúdo - SEMPRE ABAIXO DA IMAGEM - TÍTULO AQUI, NÃO SOBRE A IMAGEM */}
        <div className="p-5 space-y-3 flex flex-col flex-1 min-h-0">
          {/* Título da Ferramenta - POSICIONADO ABAIXO DA IMAGEM, NUNCA SOBRE ELA */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
              {course.toolName || course.title}
            </h3>
            {course.application && (
              <p className="text-xs text-slate-400 font-medium">
                Aplicação: {course.application}
              </p>
            )}
          </div>

          {/* Rodapé do Card - Instrutor e Preço */}
          <div className="mt-auto pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-300">Wellmo Alves, PhD</p>
              {/* Rating - Apenas para o curso de lançamento */}
              {isFeaturedCourse && !isComingSoon && (
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-sm">★</span>
                  <span className="text-xs text-slate-300 font-semibold">4.8</span>
                  <span className="text-xs text-slate-400">(260)</span>
                </div>
              )}
            </div>
            {/* Badge: Inclui Treinamento Oficial */}
            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                isComingSoon 
                  ? "bg-transparent text-slate-400 border-white/10" 
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
              }`}>
                Inclui Treinamento Oficial
              </span>
            </div>
            {isComingSoon ? (
              <Link
                href={`/catalogo/${course.slug}`}
                className="btn-landspace-glow inline-flex items-center justify-center gap-2 w-full text-center px-4 py-3 bg-transparent border border-cyan-500/50 text-cyan-400 rounded-xl font-semibold text-sm hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Bell className="w-4 h-4" />
                Entrar na Lista de Espera
              </Link>
            ) : (
              <>
                {course.isPromo && course.discountPrice ? (
                  <p className="text-lg font-bold text-white">
                    R$ {course.discountPrice.toFixed(2).replace(".", ",")}
                  </p>
                ) : (
                  <p className="text-lg font-bold text-white">{course.priceText}</p>
                )}
                <Link
                  href={`/catalogo/${course.slug}`}
                  className="btn-landspace-glow inline-flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:from-cyan-400 hover:to-blue-500 transition-all mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  Obter Licença de Uso
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {mounted && createPortal(popupContent, document.body)}
    </>
  );
}
