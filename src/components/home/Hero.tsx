"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/SegmentedControl";
import { branding } from "@/lib/branding";

export default function Hero() {
  const ecosystemRef = useRef<HTMLElement | null>(null);

  const handleScrollToEcosystem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Proteção SSR: garantir que estamos no cliente
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById('ecosystem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const segments: SegmentedControlItem[] = [
    { label: branding.pillars.tech.cta, href: branding.pillars.tech.href, color: "cyan" },
    { label: branding.pillars.studio.cta, href: branding.pillars.studio.href, color: "indigo" },
    { label: branding.pillars.academy.cta, href: branding.pillars.academy.href, color: "purple" },
    { label: branding.pillars.strategy.cta, href: branding.pillars.strategy.href, color: "emerald" },
    { label: branding.pillars.labs.cta, href: branding.pillars.labs.href, color: "amber" },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background com gradiente radial e grain sutil */}
      <div className="absolute inset-0 bg-radial-slate"></div>
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-overlay"></div>

      {/* Animated background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse bg-[rgba(159,183,201,0.1)]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-[2000ms]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <Image
              src="/logo-home.png"
              alt="LandSpace Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain drop-shadow-logo"
              priority
            />
            <div className="absolute inset-0 rounded-full blur-2xl -z-10 bg-[rgba(159,183,201,0.2)]"></div>
          </div>
        </div>

        {/* Texto "LandSpace Corporation" abaixo do logo */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgba(255,255,255,0.92)]">
            <span className="inline-flex items-baseline gap-2 font-mono uppercase tracking-wider">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#9fb7c9]">LandSpace</span>
              <span className="text-2xl md:text-3xl font-light text-[rgba(255,255,255,0.46)]">Corporation</span>
            </span>
          </h1>
        </div>

        {/* H1 - Proposta de Valor */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
          Transforme dados em <span className="text-[#9fb7c9]">inteligência geoespacial de alta performance</span>
        </h1>

        {/* Subheadline - Ajustado para melhor legibilidade */}
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-[42rem] mx-auto">
          Ecossistema integrado de tecnologia, inteligência e estratégia geoespacial para a compreensão de sistemas complexos — do território ao cenário global.
        </p>

        {/* Slogan */}
        <p className="text-base md:text-lg text-slate-400 italic leading-relaxed max-w-[42rem] mx-auto">
          Da validação científica à automação 4.0: inteligência geográfica para a decisão estratégica de alto nível.
        </p>

        {/* Segmented Control Premium - CTA Primário */}
        <div className="pt-8">
          <SegmentedControl items={segments} />
        </div>

        {/* CTA Secundário - Melhorado */}
        <div className="pt-6">
          <a
            href="#ecosystem"
            onClick={handleScrollToEcosystem}
            className="group inline-flex items-center gap-2 text-slate-300 hover:text-white text-base font-medium transition-all duration-200 py-2 px-4 rounded-lg hover:bg-slate-800/30"
          >
            Ver ecossistema
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
}
