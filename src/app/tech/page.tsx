"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { COURSES } from "../catalogo/data";
import { getAllBlogPosts } from "../insights/data";
import CourseCard from "@/components/CourseCard";
import { branding } from "@/lib/branding";
import TechPulseWordCloud from "@/components/tech/TechPulseWordCloud";
import { HideOnError } from "@/components/shared/HideOnError";
import {
  CheckCircle2, 
  Clock, 
  Users, 
  GraduationCap, 
  Map, 
  Leaf, 
  TreePine, 
  Sparkles,
  Zap,
  Globe,
  ShoppingCart,
  MessageCircle,
  Award,
  BookOpen,
  FileText,
  ArrowRight,
  Code,
  Sprout,
  Cloud,
  Brain,
  Satellite,
  Camera,
  Waves,
  Package,
  Play,
  TrendingUp,
  BarChart3,
  Layers,
  Box,
  Navigation,
  Compass
} from "lucide-react";

// Ícone SVG customizado para Geodesia Inteligente (Triangulação GPS BigTech)
function GeodesyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="geodesy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      
      {/* Triângulo principal de triangulação */}
      <path
        d="M 12 6 L 18 18 L 6 18 Z"
        stroke="url(#geodesy-grad)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      
      {/* Pontos de referência nos vértices */}
      <circle cx="12" cy="6" r="2" fill="url(#geodesy-grad)" opacity="0.9" />
      <circle cx="18" cy="18" r="2" fill="url(#geodesy-grad)" opacity="0.9" />
      <circle cx="6" cy="18" r="2" fill="url(#geodesy-grad)" opacity="0.9" />
      
      {/* Ponto central de precisão */}
      <circle cx="12" cy="14" r="1.5" fill="url(#geodesy-grad)" opacity="1" />
      
      {/* Linhas de conexão ao centro */}
      <line x1="12" y1="6" x2="12" y2="14" stroke="url(#geodesy-grad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <line x1="18" y1="18" x2="12" y2="14" stroke="url(#geodesy-grad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <line x1="6" y1="18" x2="12" y2="14" stroke="url(#geodesy-grad)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// Componente para Áreas de Expertise Técnica - Glassmorphism Tech com Cascata de Ativação Digital
function ExpertiseTag({ 
  name, 
  icon: Icon, 
  color,
  technologies,
  isMaster = false,
  isActivated = false,
  onMasterHover,
  isCascadeActive = false,
  isHovered = false,
  cardId = "",
  isPermanentHighlight = false,
  isPersistentActive = false,
  highlightLevel = 'none' // 'none' | 'subtle' | 'medium' | 'strong'
}: { 
  name: string; 
  icon: any; 
  color: string;
  technologies: string[];
  isMaster?: boolean;
  isActivated?: boolean;
  onMasterHover?: (hovering: boolean) => void;
  isCascadeActive?: boolean;
  isHovered?: boolean;
  cardId?: string;
  isPermanentHighlight?: boolean;
  isPersistentActive?: boolean;
  highlightLevel?: 'none' | 'subtle' | 'medium' | 'strong';
}) {
  const colorConfig: Record<string, { border: string; icon: string; shadow: string; activatedBorder: string; activatedShadow: string; cascadeShadow: string }> = {
    gis: {
      border: "border-cyan-500/10 hover:border-cyan-500/40",
      icon: "text-cyan-400",
      shadow: "",
      activatedBorder: "border-cyan-500",
      activatedShadow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(34,211,238,0.7)]"
    },
    coding: {
      border: "border-emerald-500/10 hover:border-emerald-500/40",
      icon: "text-emerald-400",
      shadow: "",
      activatedBorder: "border-emerald-500",
      activatedShadow: "shadow-[0_0_12px_rgba(52,211,153,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(52,211,153,0.7)]"
    },
    geoai: {
      border: "border-purple-500/10 hover:border-purple-500/40",
      icon: "text-purple-400",
      shadow: "",
      activatedBorder: "border-purple-500",
      activatedShadow: "shadow-[0_0_12px_rgba(192,132,252,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(192,132,252,0.7)]"
    },
    remote: {
      border: "border-orange-500/10 hover:border-orange-500/40",
      icon: "text-orange-400",
      shadow: "",
      activatedBorder: "border-orange-500",
      activatedShadow: "shadow-[0_0_12px_rgba(251,146,60,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(251,146,60,0.7)]"
    },
    uav: {
      border: "border-sky-500/10 hover:border-sky-500/40",
      icon: "text-sky-400",
      shadow: "",
      activatedBorder: "border-sky-500",
      activatedShadow: "shadow-[0_0_12px_rgba(56,189,248,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(56,189,248,0.7)]"
    },
    hydro: {
      border: "border-blue-500/10 hover:border-blue-500/40",
      icon: "text-blue-400",
      shadow: "",
      activatedBorder: "border-blue-500",
      activatedShadow: "shadow-[0_0_12px_rgba(96,165,250,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(96,165,250,0.7)]"
    },
    digital: {
      border: "border-amber-500/10 hover:border-amber-500/40",
      icon: "text-amber-400",
      shadow: "",
      activatedBorder: "border-amber-500",
      activatedShadow: "shadow-[0_0_12px_rgba(251,191,36,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(251,191,36,0.7)]"
    },
    geodesy: {
      border: "border-teal-500/10 hover:border-teal-500/40",
      icon: "text-teal-400",
      shadow: "",
      activatedBorder: "border-teal-500",
      activatedShadow: "shadow-[0_0_12px_rgba(20,184,166,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(20,184,166,0.7)]"
    },
    agro: {
      border: "border-lime-500/10 hover:border-lime-500/40",
      icon: "text-lime-400",
      shadow: "",
      activatedBorder: "border-lime-500",
      activatedShadow: "shadow-[0_0_12px_rgba(132,204,22,0.6)]",
      cascadeShadow: "shadow-[0_0_16px_rgba(132,204,22,0.7)]"
    },
  };

  const config = colorConfig[color] || colorConfig.gis;

  // Determinar se o card deve estar ativo na cascata ou no estado persistente
  const isActive = isCascadeActive || isHovered || isPersistentActive;
  const scaleClass = isActive ? "scale-105" : "scale-100";
  
  // Border class: se tem destaque permanente, sempre usa a borda destacada (border-2 com cor); senão, usa o comportamento normal
  const borderClass = isPermanentHighlight 
    ? (color === 'coding' 
        ? 'border-2 border-emerald-500/30' 
        : 'border-2 border-cyan-500/30')
    : (isActive ? config.activatedBorder : config.border);
  
  // Shadow class: prioridade para cascata ativa (mais intenso), depois destaque permanente baseado no nível
  // Níveis: 'strong' (card principal), 'medium' (hub/explorar), 'subtle' (linhas 2-4), 'none' (sem brilho)
  const getPermanentShadow = () => {
    if (isPermanentHighlight) {
      return color === 'coding' 
        ? 'shadow-[0_0_12px_rgba(52,211,153,0.4)]' 
        : 'shadow-[0_0_10px_rgba(34,211,238,0.3)]';
    }
    switch (highlightLevel) {
      case 'strong':
        return 'shadow-[0_0_10px_rgba(34,211,238,0.3)]';
      case 'medium':
        return 'shadow-[0_0_8px_rgba(34,211,238,0.2)]';
      case 'subtle':
        return 'shadow-[0_0_6px_rgba(34,211,238,0.15)]';
      default:
        return '';
    }
  };
  
  const shadowClass = isActive 
    ? config.cascadeShadow 
    : getPermanentShadow();
  
  // Animação de respiração (pulse) quando ativo no estado idle (persistente mas não em hover)
  const breathingClass = (isPersistentActive && !isHovered && !isCascadeActive) 
    ? 'animate-[breathing_5s_ease-in-out_infinite]' 
    : '';

  return (
    <div
      className={`group relative flex flex-col items-center justify-center px-2.5 py-4 rounded-xl border bg-white/3 backdrop-blur-[12px] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/5 cursor-pointer h-full ${scaleClass} ${borderClass} ${shadowClass}`}
      data-card-id={cardId}
    >
      {/* Glow animado para respiração - apenas quando no estado idle persistente */}
      {(isPersistentActive && !isHovered && !isCascadeActive) && (
        <div className={`absolute inset-0 rounded-xl ${config.cascadeShadow} pointer-events-none ${breathingClass}`}></div>
      )}
      
      {/* Ícone - Solto, Maior e Colorido */}
      <Icon className={`w-8 h-8 mb-1.5 ${config.icon} transition-all duration-300 group-hover:scale-110`} />
      
      {/* Título - Centralizado com tipografia refinada */}
      <span className="text-sm font-medium text-slate-200 text-center leading-tight whitespace-nowrap tracking-tight">{name}</span>
    </div>
  );
}

export default function TechPage() {
  const featuredCourses = COURSES.slice(0, 6);
  const blogPosts = getAllBlogPosts().slice(0, 3);
  const [isMasterHovered, setIsMasterHovered] = useState(false);
  
  // Estados para Cascata de Ativação Digital
  const [cascadeState, setCascadeState] = useState<{
    hoveredCard: string | null;
    step1: boolean; // Engenharia Geoespacial
    step2: boolean; // Sensoramento + SIG Cloud (simultâneo)
    step3: boolean; // Drones + Geodesia + GeoAI (linha 2 completa, simultâneo)
    step4: boolean; // Modelagem + Agroecossistemas + Gêmeos (linha 3 completa, simultâneo)
    step5: boolean; // Ferramentas de Automação (realce mais destacado, sozinho)
    iconBlinking: boolean; // Para as 3 piscadas do ícone do Hub de Automação
    isActivated: boolean; // Estado persistente - se a cascata já foi ativada
  }>({
    hoveredCard: null,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    iconBlinking: false,
    isActivated: false,
  });

  const cascadeTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Função para limpar todos os timeouts
  const clearCascadeTimeouts = () => {
    cascadeTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    cascadeTimeoutsRef.current = [];
  };

  // Função para iniciar a cascata
  const startCascade = (cardId: string) => {
    clearCascadeTimeouts();
    
    // Reset do estado para sempre disparar animação, mesmo quando já está ativo
    // Isso garante que touch/click sempre funcione em mobile/tablet
    setCascadeState(prev => ({
      hoveredCard: cardId,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      iconBlinking: false,
      isActivated: prev.isActivated, // Mantém o estado de ativação
    }));

    // Passo 1 (0ms): Engenharia Geoespacial - Realce imediato
    const timeout1 = setTimeout(() => {
      setCascadeState(prev => ({ ...prev, step1: true }));
    }, 0);
    cascadeTimeoutsRef.current.push(timeout1);

    // Passo 2 (+300ms): Sensoramento + SIG Cloud - Simultaneamente
    const timeout2 = setTimeout(() => {
      setCascadeState(prev => ({ ...prev, step2: true }));
    }, 300);
    cascadeTimeoutsRef.current.push(timeout2);

    // Passo 3 (+600ms): Drones + Geodesia + GeoAI (Linha 2 completa) - Simultaneamente
    const timeout3 = setTimeout(() => {
      setCascadeState(prev => ({ ...prev, step3: true }));
    }, 600);
    cascadeTimeoutsRef.current.push(timeout3);

    // Passo 4 (+900ms): Modelagem + Agroecossistemas + Gêmeos (Linha 3 completa) - Simultaneamente
    const timeout4 = setTimeout(() => {
      setCascadeState(prev => ({ ...prev, step4: true }));
    }, 900);
    cascadeTimeoutsRef.current.push(timeout4);

    // Passo 5 (+1200ms): Ferramentas de Automação - Realce mais destacado e sozinho
    const timeout5 = setTimeout(() => {
      setCascadeState(prev => ({ ...prev, step5: true, isActivated: true }));
      
      // 3 piscadas rápidas do ícone
      const blinkCount = 3;
      const blinkOnDuration = 150; // ms que fica ligado
      const blinkOffDuration = 150; // ms que fica desligado
      for (let i = 0; i < blinkCount; i++) {
        const blinkOn = setTimeout(() => {
          setCascadeState(prev => ({ ...prev, iconBlinking: true }));
        }, i * (blinkOnDuration + blinkOffDuration));
        cascadeTimeoutsRef.current.push(blinkOn);
        
        const blinkOff = setTimeout(() => {
          setCascadeState(prev => ({ ...prev, iconBlinking: false }));
        }, i * (blinkOnDuration + blinkOffDuration) + blinkOnDuration);
        cascadeTimeoutsRef.current.push(blinkOff);
      }
    }, 1200);
    cascadeTimeoutsRef.current.push(timeout5);
  };

  // Função para resetar a cascata (não reseta mais quando mouse sai - mantém estado persistente)
  const resetCascade = () => {
    // Não reseta mais - mantém o estado ativado permanentemente
    // Apenas limpa os timeouts em andamento
    clearCascadeTimeouts();
    // Mantém todos os estados ativos se já foram ativados
    setCascadeState(prev => ({
      hoveredCard: null,
      step1: prev.isActivated ? prev.step1 : false,
      step2: prev.isActivated ? prev.step2 : false,
      step3: prev.isActivated ? prev.step3 : false,
      step4: prev.isActivated ? prev.step4 : false,
      step5: prev.isActivated ? prev.step5 : false,
      iconBlinking: false,
      isActivated: prev.isActivated,
    }));
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      clearCascadeTimeouts();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] relative">
      <main className="relative z-10">
        {/* 1. Hero Section - Dark Premium */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#02040a]">
          {/* Glows sutis de fundo - Ambience */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
            <div className="text-center space-y-8 animate-fade-in-up">
              {/* Logo - Ponto Focal Central (Big Tech) */}
              <div className="flex justify-center mb-8 animate-fade-in-down">
                <div className="relative w-24 h-24">
                  <Image
                    src="/Logo-tech.png"
                    alt="LandSpace Tech Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain animate-pulse-slow"
                    priority
                  />
                  {/* Glow adicional para efeito de flutuação */}
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl -z-10 animate-pulse-slow"></div>
      </div>
    </div>

              {/* Headline - Dark Premium */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                <span className="text-2xl md:text-3xl text-[rgba(255,255,255,0.46)] font-light">{branding.brandName}</span>{" "}
                {branding.pillars.tech.uiName}
              </h1>

              {/* Subheadline - Mesmo formato da página /labs */}
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-cyan-400 mb-6 leading-tight">
                {branding.pillars.tech.tagline}
              </h2>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                Do dado espacial à decisão estratégica.
              </h2>

              {/* Manifesto - Parágrafo Descritivo */}
              <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mt-6">
                A LandSpace desenvolve soluções de Inteligência Geoespacial e Automação.
                Entregamos ferramentas prontas, fluxos automatizados e treinamento aplicado para transformar dados espaciais complexos em insights acionáveis, com rapidez, rigor técnico e escala profissional.
              </p>

              {/* Áreas de Expertise Técnica - Glassmorphism Tech com Cascata de Ativação Digital */}
              {/* Container para capturar mouse leave */}
              <div 
                className="max-w-5xl mx-auto mt-12"
                onMouseLeave={resetCascade}
              >
                {/* Card "Inteligência Geoespacial" - Linha 0 (Topo, centralizado) */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-full md:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-0.75rem)/3)] max-w-none"
                    onMouseEnter={() => startCascade("engenharia")}
                    onClick={() => startCascade("engenharia")}
                  >
                    <ExpertiseTag 
                      name="Inteligência Geoespacial" 
                      icon={Layers} 
                      color="coding" 
                      technologies={[]}
                      isMaster={true}
                      onMasterHover={setIsMasterHovered}
                      cardId="engenharia"
                      isCascadeActive={cascadeState.step1}
                      isHovered={cascadeState.hoveredCard === "engenharia"}
                      isPermanentHighlight={true}
                      isPersistentActive={cascadeState.isActivated && cascadeState.step1}
                    />
                  </div>
      </div>

                {/* Grid 3x3: 9 categorias de soluções */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {/* Linha 1 (Entrada de Dados): Sensoriamento | Geodesia Inteligente | SIG */}
                <div
                  onMouseEnter={() => startCascade("sensoramento")}
                  onClick={() => startCascade("sensoramento")}
                >
                  <ExpertiseTag 
                    name="Sensoramento Remoto & Radar Avançado" 
                    icon={Satellite} 
                    color="remote" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="sensoramento"
                    isCascadeActive={cascadeState.step2}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step2}
                    highlightLevel="subtle"
                  />
        </div>
                <div
                  onMouseEnter={() => startCascade("geodesia")}
                  onClick={() => startCascade("geodesia")}
                >
                  <ExpertiseTag 
                    name="Geodesia Inteligente" 
                    icon={GeodesyIcon} 
                    color="geodesy" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="geodesia"
                    isCascadeActive={cascadeState.step2}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step2}
                    highlightLevel="subtle"
                  />
            </div>
                <div
                  onMouseEnter={() => startCascade("sig-cloud")}
                  onClick={() => startCascade("sig-cloud")}
                >
                  <ExpertiseTag 
                    name="SIG Cloud & Plataformas Geoespaciais" 
                    icon={Cloud} 
                    color="gis" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="sig-cloud"
                    isCascadeActive={cascadeState.step2}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step2}
                    highlightLevel="subtle"
                  />
        </div>

                {/* Linha 2 (Processamento - Hub Central): Drones | Agroecossistemas | GeoAI */}
                <div
                  onMouseEnter={() => startCascade("drones")}
                  onClick={() => startCascade("drones")}
                >
                  <ExpertiseTag 
                    name="Drones, Fotogrametria & 3D" 
                    icon={Camera} 
                    color="uav" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="drones"
                    isCascadeActive={cascadeState.step3}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step3}
                    highlightLevel="subtle"
                  />
              </div>
                <div
                  onMouseEnter={() => startCascade("agroecossistemas")}
                  onClick={() => startCascade("agroecossistemas")}
                >
                  <ExpertiseTag 
                    name="Agroecossistemas" 
                    icon={Sprout} 
                    color="agro" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="agroecossistemas"
                    isCascadeActive={cascadeState.step3}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step3}
                    highlightLevel="subtle"
                  />
            </div>
                <div
                  onMouseEnter={() => startCascade("geoai")}
                  onClick={() => startCascade("geoai")}
                >
                  <ExpertiseTag 
                    name="GeoAI & Machine Learning" 
                    icon={Brain} 
                    color="geoai" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="geoai"
                    isCascadeActive={cascadeState.step3}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step3}
                    highlightLevel="subtle"
                  />
        </div>

                {/* Linha 3 (Resultados e Modelagens Especializadas): Hidrologia | Inteligência Territorial | Gêmeos Digitais */}
                <div
                  onMouseEnter={() => startCascade("modelagem")}
                  onClick={() => startCascade("modelagem")}
                >
                  <ExpertiseTag 
                    name="Modelagem Hidrológica & Ambiental" 
                    icon={Waves} 
                    color="hydro" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="modelagem"
                    isCascadeActive={cascadeState.step4}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step4}
                    highlightLevel="subtle"
                  />
                </div>
                <div
                  onMouseEnter={() => startCascade("inteligencia-territorial")}
                  onClick={() => startCascade("inteligencia-territorial")}
                >
                  <ExpertiseTag 
                    name="Inteligência Territorial" 
                    icon={Map} 
                    color="agro" 
                    technologies={[]}
                    isActivated={isMasterHovered}
                    cardId="inteligencia-territorial"
                    isCascadeActive={cascadeState.step4}
                    isHovered={false}
                    isPersistentActive={cascadeState.isActivated && cascadeState.step4}
                    highlightLevel="subtle"
                  />
                </div>
                <div
                  onMouseEnter={() => startCascade("gemeos-digitais")}
                  onClick={() => startCascade("gemeos-digitais")}
                  className="md:col-start-1 md:col-span-2 md:flex md:justify-center lg:col-start-auto lg:col-span-auto lg:flex-none"
                >
                  <div className="w-full md:max-w-fit lg:w-full">
                    <ExpertiseTag 
                      name="Gêmeos Digitais & Simulação" 
                      icon={Box} 
                      color="digital" 
                      technologies={[]}
                      isActivated={isMasterHovered}
                      cardId="gemeos-digitais"
                      isCascadeActive={cascadeState.step4}
                      isHovered={false}
                      isPersistentActive={cascadeState.isActivated && cascadeState.step4}
                      highlightLevel="subtle"
                    />
                  </div>
                </div>
                </div>

                {/* Card de Fechamento - 10º Card com Destaque e Cascata */}
                <div 
                  className="flex justify-center mt-6"
                  onMouseEnter={() => startCascade("ferramentas")}
                  onClick={() => startCascade("ferramentas")}
                >
                <div className={`group relative px-2.5 py-4 w-full md:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-0.75rem)/3)] max-w-none bg-white/3 border-2 rounded-xl backdrop-blur-[12px] transition-all duration-300 ease-out hover:-translate-y-1 ${
                  cascadeState.step5 
                    ? 'border-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.8)] shadow-cyan-400/50 ring-2 ring-cyan-400/30' 
                    : 'border-cyan-400/25 shadow-[0_0_8px_rgba(34,211,238,0.2)] hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(34,211,238,0.5)]'
                }`}>
                  {/* Glow effect mais intenso */}
                  <div className={`absolute inset-0 bg-cyan-400/10 rounded-2xl blur-xl transition-opacity duration-300 ${
                    cascadeState.step5 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  
                  {/* Glow animado para respiração rápida - apenas quando no estado idle persistente */}
                  {(cascadeState.isActivated && cascadeState.step5) && (
                    <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.8)] pointer-events-none animate-[breathing-fast_3s_ease-in-out_infinite]"></div>
                  )}
                  
                  {/* Badge "AI POWERED" com pontinho pulsando */}
                  <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1.5 px-1.5 py-0.5 bg-cyan-500/20 backdrop-blur-sm rounded-md border border-cyan-400/30">
                    <div className="relative w-1.5 h-1.5">
                      <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute inset-0 bg-cyan-400 rounded-full"></div>
                    </div>
                    <span className="text-[9px] font-semibold text-cyan-300 uppercase tracking-wider">AI POWERED</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <Zap className={`w-8 h-8 mb-1.5 text-cyan-400 transition-all duration-100 ${
                      cascadeState.iconBlinking 
                        ? 'opacity-0 scale-90' 
                        : 'group-hover:scale-110'
                    }`} />
                    <h3 className={`text-sm font-medium transition-colors whitespace-nowrap text-center leading-tight tracking-tight ${
                      cascadeState.step5 ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      Hub de Automação <span className="font-bold text-cyan-400">4.0</span>
                    </h3>
                  </div>
                </div>
        </div>
      </div>

              {/* CTA Button - Dark Premium */}
              <div className="flex justify-center mt-12">
                <Link
                  href="#solucoes"
                  className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-2xl font-semibold text-base shadow-[0_0_8px_rgba(34,211,238,0.25)] hover:shadow-[0_0_16px_rgba(34,211,238,0.4)] border border-cyan-500/50 transition-all duration-300"
                >
                  Explorar Soluções
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
        </div>
      </div>
    </div>
        </section>

        {/* Tech Pulse Word Cloud */}
        <TechPulseWordCloud />

        {/* 2. Barra de Autoridade - Dark Tech HUD */}
        <section className="py-8 bg-slate-900/50 border-y border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Item 1: Ferramentas Profissionais */}
              <div className="flex items-center gap-3 justify-center md:justify-start pr-6 md:border-r md:border-white/10">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white whitespace-nowrap">Ferramentas Profissionais</div>
        </div>
      </div>

              {/* Item 2: Acesso Permanente */}
              <div className="flex items-center gap-3 justify-center md:justify-start pr-6 md:border-r md:border-white/10">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white whitespace-nowrap">Acesso Permanente</div>
                </div>
              </div>

              {/* Item 3: +260 Profissionais Ativos */}
              <div className="flex items-center gap-3 justify-center md:justify-start pr-6 md:border-r md:border-white/10">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex flex-col">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
                    +260
                  </div>
                  <div className="text-base font-medium text-white whitespace-nowrap">
                    Profissionais Ativos
                  </div>
                </div>
              </div>

              {/* Item 4: Metodologia Validada */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
            </div>
                <div className="min-w-0">
                  <div className="text-base font-medium text-white whitespace-nowrap">Metodologia Validada</div>
          </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Soluções Geoespaciais para Decisão Profissional */}
        <section className="py-24 bg-[#02040a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Soluções Geoespaciais para Decisão Profissional
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Ferramentas, automações e metodologias desenvolvidas para análises espaciais profissionais, com precisão, escala e suporte à decisão.
              </p>
                    </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Geógrafos */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Map className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Geógrafos</h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Automatize a produção de mapas e análises territoriais complexas, focando na interpretação espacial e na tomada de decisão estratégica.
                </p>
              </div>

              {/* Biólogos */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <Leaf className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Biólogos</h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Analise estrutura da paisagem, dinâmica do uso e cobertura da terra e padrões ambientais, com métricas espaciais, automação e rigor científico.
                </p>
              </div>

              {/* Eng. Ambientais */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Sparkles className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Eng. Ambientais</h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Acelere estudos ambientais e análises territoriais, garantindo conformidade técnica e legal com informações espaciais validadas.
                </p>
                    </div>

              {/* Eng. Florestais */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <TreePine className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Eng. Florestais</h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Processe inventários florestais, monitore desmatamento e dinâmica da vegetação com fluxos automatizados e análise espacial avançada.
                </p>
                          </div>

              {/* Eng. Agrônomos */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <Sprout className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Eng. Agrônomos</h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Gere mapas de produtividade, índices espectrais e análises territoriais em minutos para agricultura de precisão e tomada de decisão no campo.
                </p>
                        </div>

              {/* Consultores e Pesquisadores */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Award className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Consultores e Pesquisadores</h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Amplie sua capacidade de entrega com análises espaciais automatizadas, validação científica e suporte à decisão em projetos técnicos e pesquisas aplicadas.
                </p>
                    </div>
                  </div>
                </div>
        </section>

        {/* 4. Como Funciona */}
        <section id="como-funciona" className="py-24 bg-[#02040a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Como você vai gerar resultados?
                </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Um fluxo de trabalho otimizado para sua produtividade.
                </p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Package,
                  title: "Acesso ao Arsenal",
                  description: "Receba acesso imediato às nossas ferramentas de automação, rotinas inteligentes e modelos validados.",
                },
                {
                  step: "02",
                  icon: Play,
                  title: "Implementação e Deploy",
                  description: "Acesse ferramentas prontas, documentação técnica e metodologias validadas para implementação imediata em seus projetos.",
                },
                {
                  step: "03",
                  icon: TrendingUp,
                  title: "Escale Resultados",
                  description: "Automatize processos repetitivos e gere análises complexas em minutos, entregando mais valor em menos tempo.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="card-elevated p-8 flex flex-col h-full relative"
                  >
                    {/* Ghost Number - Marca d'água sutil */}
                    <div className="absolute top-8 left-8 text-6xl font-bold text-slate-900 opacity-10 pointer-events-none">
                      {item.step}
              </div>

                    {/* Ícone Neon Float - Sem Container */}
                    <div className="relative z-10 mb-6">
                      <Icon className="w-12 h-12 text-cyan-400" />
            </div>

                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed flex-1 relative z-10">{item.description}</p>
                  </div>
                );
              })}
            </div>
                </div>
        </section>

        {/* 5. Autoridade e Fundador */}
        <section className="py-24 bg-[#02040a]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Liderança Técnica e Científica
                </h2>
              <p className="text-xl text-slate-300 font-semibold mt-4">
                Wellmo Alves, PhD - O arquiteto por trás das soluções LandSpace.
                </p>
            </div>

            <div className="card-elevated rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Foto do Instrutor */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-sky-500 shadow-lg border-2 border-cyan-500/20">
                    <HideOnError>
                      {({ hidden, onError }) => (
                        <Image
                          src="/perfil.jpg"
                          alt="Wellmo Alves, PhD em Geografia e especialista em Análise Ambiental e Automação Geoespacial"
                          fill
                          className={`object-cover ${hidden ? 'hidden' : ''}`}
                          onError={onError}
                        />
                      )}
                    </HideOnError>
                    </div>
                  </div>

                {/* Bio */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div>
                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                      Doutor e Mestre em Geografia (UFG), Especialista em Geoprocessamento (UFV) e Perícia Ambiental (IPOG). 
                      Engenheiro Agrônomo (IFGoiano) e Geógrafo (CREA/GO).
                    </p>
                    
                    {/* Registros Oficiais */}
                    <div className="flex items-center gap-2 mb-6 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-cyan-100">Registro Profissional: CREA 21947/D-GO | RNP 1005596280</span>
                    </div>

                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                      Como <strong className="text-white font-bold">pesquisador premiado</strong> e com ampla produção científica, trago uma sólida atuação acadêmica. Essa <strong className="text-white font-semibold">experiência científica nacional e internacional</strong> garante a precisão e confiabilidade de cada ferramenta que você recebe.
                    </p>
                    <p className="text-lg text-slate-400 leading-relaxed mb-6">
                      Cada <strong className="text-white font-semibold">solução, modelo e automação</strong> foi desenvolvida e validada com rigor científico, 
                      garantindo que você trabalhe com ferramentas que realmente funcionam no mercado.
                    </p>
                        </div>
                  
                  {/* Grid de Stats - Prova Social */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-800">
                    <div className="text-center md:text-left">
                      <div className="text-3xl font-bold text-white mb-1">40</div>
                      <div className="text-sm text-slate-300">Artigos Científicos Publicados</div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-3xl font-bold text-white mb-1">100+</div>
                      <div className="text-sm text-slate-300">Trabalhos em Congressos</div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-3xl font-bold text-white mb-1">8</div>
                      <div className="text-sm text-slate-300">Prêmios | Incluindo 3x 1º Lugar</div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-3xl font-bold text-white mb-1">18</div>
                      <div className="text-sm text-slate-300">Capítulos de Livros Técnicos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Vitrine de Soluções */}
        <section id="solucoes" className="py-24 bg-[#02040a] relative">
          {/* Engineering Grid Pattern - Dark Mode */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Nossas Soluções
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Toolkits de automação com <strong className="font-semibold text-white">ferramentas validadas</strong> e treinamento de implementação.
              </p>
                    </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {featuredCourses.map((course, idx) => (
                <CourseCard key={course.slug} course={course} index={idx} />
              ))}
                  </div>

            <div className="text-center mt-12">
                        <Link
                href="/catalogo"
                className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
                        >
                Ver todas as soluções
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
        </section>

        {/* 7. Seção de Blog - LandSpace Insights */}
        <section id="insights" className="py-24 bg-[#02040a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header com título e link "Ver todos" */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                  Insights em Inteligência Geoespacial
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                  Estudos aplicados, metodologias validadas e soluções geoespaciais com foco em automação e tomada de decisão.
                </p>
                    </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-white font-semibold text-base hover:text-cyan-400 transition-colors group"
              >
                Ver todos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
                  </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                // Configurações por categoria
                const getCategoryConfig = (category: string) => {
                  switch (category) {
                    case "R":
                      return {
                        gradient: "from-blue-900/40 to-slate-900",
                        gradientHover: "group-hover:from-blue-900/50 group-hover:to-slate-900",
                        icon: BarChart3,
                        iconColor: "text-blue-400",
                        titleHover: "group-hover:text-cyan-400",
                        borderColor: "border-blue-500/30",
                        borderHover: "group-hover:border-cyan-500",
                        layerColors: {
                          base: "from-blue-900/30 to-slate-900/50",
                          layer1: "bg-blue-800/30 border-blue-700/40",
                          layer2: "bg-blue-700/30 border-blue-600/40",
                          layer3: "bg-blue-900/30 border-blue-800/40",
                        },
                        dots: ["bg-blue-500", "bg-blue-400", "bg-blue-300"],
                      };
                    case "QGIS":
                      return {
                        gradient: "from-emerald-900/40 to-slate-900",
                        gradientHover: "group-hover:from-emerald-900/50 group-hover:to-slate-900",
                        icon: Layers,
                        iconColor: "text-emerald-400",
                        titleHover: "group-hover:text-emerald-400",
                        borderColor: "border-emerald-500/30",
                        borderHover: "group-hover:border-emerald-500",
                        layerColors: {
                          base: "from-emerald-900/30 to-slate-900/50",
                          layer1: "bg-emerald-800/30 border-emerald-700/40",
                          layer2: "bg-emerald-700/30 border-emerald-600/40",
                          layer3: "bg-emerald-900/30 border-emerald-800/40",
                        },
                        dots: ["bg-emerald-500", "bg-emerald-400", "bg-emerald-300"],
                      };
                    case "GEE":
                      return {
                        gradient: "from-amber-900/40 to-slate-900",
                        gradientHover: "group-hover:from-amber-900/50 group-hover:to-slate-900",
                        icon: Globe,
                        iconColor: "text-amber-400",
                        titleHover: "group-hover:text-amber-400",
                        borderColor: "border-amber-500/30",
                        borderHover: "group-hover:border-amber-500",
                        layerColors: {
                          base: "from-amber-900/30 to-slate-900/50",
                          layer1: "bg-amber-800/30 border-amber-700/40",
                          layer2: "bg-amber-700/30 border-amber-600/40",
                          layer3: "bg-amber-900/30 border-amber-800/40",
                        },
                        dots: ["bg-amber-500", "bg-amber-400", "bg-amber-300"],
                      };
                    default:
                      return {
                        gradient: "from-slate-50 to-slate-100",
                        gradientHover: "group-hover:from-slate-100 group-hover:to-slate-200",
                        icon: Map,
                        iconColor: "text-slate-600/70",
                        titleHover: "group-hover:text-slate-700",
                        borderColor: "border-slate-200/30",
                        layerColors: {
                          base: "from-slate-100/50 to-slate-200/50",
                          layer1: "bg-slate-200/40 border-slate-300/50",
                          layer2: "bg-slate-300/40 border-slate-400/50",
                          layer3: "bg-slate-100/40 border-slate-200/50",
                        },
                        dots: ["bg-slate-500", "bg-slate-400", "bg-slate-300"],
                      };
                  }
                };

                const config = getCategoryConfig(post.category);
                const IconComponent = config.icon;

                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    {/* Thumbnail com aspecto de mapas/camadas - Suporte para imagem customizada */}
                    <div className={`relative h-48 bg-gradient-to-b ${config.gradient} ${config.gradientHover} overflow-hidden group-hover:scale-105 transition-all duration-500`}>
                      {/* Badge Superior - Canto superior direito */}
                      {post.hasDownload && !post.isShowcase && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/50 flex items-center gap-1.5 group-hover:from-cyan-500 group-hover:to-cyan-600 transition-all duration-300">
                            <span>🎁</span>
                            <span>Ferramenta de Automação</span>
                          </div>
                        </div>
                      )}
                      {post.isShowcase && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/50 flex items-center gap-1.5 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                            <span>📊</span>
                            <span>Aplicação Prática</span>
                          </div>
                        </div>
                      )}
                      {post.thumbnail ? (
                        <HideOnError>
                          {({ hidden, onError }) => (
                            <Image
                              src={post.thumbnail || ''}
                              alt={post.title}
                              fill
                              className={`object-cover ${hidden ? 'hidden' : ''}`}
                              onError={onError}
                            />
                          )}
                        </HideOnError>
                      ) : (
                        <div className="absolute inset-0 p-4 flex flex-col">
                          {/* Simulação de camadas de mapa */}
                          <div className="flex-1 relative">
                            {/* Camada base - mapa */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.layerColors.base} rounded-lg border-2 ${config.borderColor}`}></div>
                            {/* Camadas sobrepostas */}
                            <div className={`absolute top-2 left-2 w-20 h-16 ${config.layerColors.layer1} rounded border`}></div>
                            <div className={`absolute top-6 right-4 w-16 h-12 ${config.layerColors.layer2} rounded border`}></div>
                            <div className={`absolute bottom-4 left-1/3 w-24 h-14 ${config.layerColors.layer3} rounded border`}></div>
                            {/* Linhas de grade (representando coordenadas) */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
                              <div className="absolute top-1/3 left-0 w-full h-px bg-white"></div>
                              <div className="absolute top-2/3 left-0 w-full h-px bg-white"></div>
                              <div className="absolute top-0 left-0 h-full w-px bg-white"></div>
                              <div className="absolute top-0 left-1/3 h-full w-px bg-white"></div>
                              <div className="absolute top-0 left-2/3 h-full w-px bg-white"></div>
                            </div>
                            {/* Ícone centralizado por categoria */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <IconComponent className={`w-8 h-8 ${config.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                            </div>
                          </div>
                          {/* Legenda de camadas */}
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                            <div className="flex gap-1.5">
                              {config.dots.map((dotColor, idx) => (
                                <div key={idx} className={`w-2 h-2 rounded-full ${dotColor}`}></div>
              ))}
            </div>
                            <div className="flex-1 h-1 bg-white/20 rounded"></div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6 space-y-4 bg-slate-900/50">
                      {/* Metadados */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-xl text-xs font-semibold border border-white/10">
                          {post.category}
                        </span>
                        {post.hasDownload && !post.isShowcase && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-cyan-900/20 to-cyan-900/40 text-cyan-400 rounded-xl text-xs font-semibold border border-cyan-800/50 flex items-center gap-1">
                            <span>⚡</span>
                            <span>Download Gratuito</span>
                          </span>
                        )}
                        {post.isShowcase && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-blue-900/20 to-blue-900/40 text-blue-400 rounded-xl text-xs font-semibold border border-blue-800/50 flex items-center gap-1">
                            <span>👁️</span>
                            <span>Ver Resultado</span>
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
            </div>

                      {/* Título com cor de hover por categoria */}
                      <h3 className={`text-lg font-bold text-white leading-tight ${config.titleHover} transition-colors line-clamp-2`}>
                        {post.title}
                      </h3>
                      {/* Subtexto */}
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. Seção de Newsletter - Automation Loop */}
        <section id="newsletter" className="py-24 bg-[#02040a] border-t border-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 space-y-6 relative">
              {/* Ambient Glow - Efeito de luz sutil atrás do título */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Tagline */}
              <p className="text-sm md:text-base text-cyan-400 font-semibold tracking-wider uppercase relative z-10">
                LANDSPACE INTEL
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight relative z-10">
                Automação Geoespacial Aplicada
              </h3>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium relative z-10">
                Ferramentas prontas, métodos validados e o que há de mais novo no mercado, direto no seu inbox.
              </p>
              <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed relative z-10">
                Junte-se a profissionais que recebem <strong className="text-white">análises estratégicas</strong>, estudos de caso de rotinas automatizadas e avisos de <strong className="text-white">novas ferramentas exclusivas</strong> em primeira mão.
              </p>
            </div>

            {/* Formulário Minimalista - Dark Glass */}
            <div className="max-w-2xl mx-auto relative z-10">
              <form className="flex flex-col sm:flex-row gap-3 items-stretch">
                <input
                  type="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  required
                  className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-base h-[56px]"
                />
                <button
                  type="submit"
                  className="btn-landspace-glow px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 whitespace-nowrap transition-all duration-300 h-[56px]"
                >
                  Receber Ferramentas e Insights
                </button>
              </form>
              
              {/* Microcopy de Confiança */}
              <p className="text-center text-xs text-slate-400 font-medium tracking-wide mt-4">
                Respeitamos sua privacidade. Cancele a qualquer momento, sem compromisso.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Seção: LandSpace para Empresas - Solução Sob Medida */}
        <section className="py-24 bg-[#02040a] border-t border-slate-800 relative overflow-hidden">
          {/* Glow difuso atrás do card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-40 hero-radial-gradient-blue-purple"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl relative">
              <div className="text-center space-y-6 mb-8">
                {/* Subtítulo */}
                <p className="text-base md:text-lg text-slate-400 font-medium tracking-wide uppercase">
                  Precisa de uma solução sob medida?
                </p>
                {/* Título Principal */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  LandSpace para Empresas
                </h2>
                {/* Corpo */}
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
                  Transforme seus processos com soluções personalizadas e leve a <strong className="text-white">inteligência geoespacial de nível PhD</strong> para dentro da sua operação.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Botão Principal - Verde Metálico Neon */}
                <a
                  href="https://wa.me/5564999082421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-br from-emerald-500 to-green-700 border border-white/20 rounded-xl text-white font-bold text-base shadow-lg shadow-emerald-900/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:from-green-400 hover:to-emerald-500 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Falar com Especialista</span>
                </a>
                {/* Botão Secundário - Outline/Ghost */}
                <Link
                  href="/corporativo"
                  className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-xl font-bold text-base hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                >
                  Conhecer Soluções Corporativas
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Seção de Contato e CTA Final */}
        <section className="py-24 bg-[#020617] border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Fale com nosso Time
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Dúvidas, consultoria ou parcerias — estamos à disposição.
              </p>
            </div>

            {/* Formulário de Contato - Glassmorphism Escuro */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="nome"
                    placeholder="Seu nome completo"
                    required
                    className="w-full px-4 py-3.5 border border-slate-700 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-base"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    required
                    className="w-full px-4 py-3.5 border border-slate-700 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-base"
                  />
                </div>
                <textarea
                  name="mensagem"
                  placeholder="Como podemos ajudar?"
                  required
                  rows={6}
                  className="w-full px-4 py-3.5 border border-slate-700 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-y text-base min-h-[140px]"
                ></textarea>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="submit"
                    className="btn-landspace-glow px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-base shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
                  >
                    Enviar mensagem
                  </button>
                  <a
                    href="https://wa.me/5564999082421"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-br from-emerald-500 to-green-700 border border-white/20 rounded-xl text-white font-bold text-base shadow-lg shadow-emerald-900/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:from-green-400 hover:to-emerald-500 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
