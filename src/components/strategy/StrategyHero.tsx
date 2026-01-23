"use client";

import Image from "next/image";
import { FileText, Map, Headphones, Youtube, Twitter, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { branding } from "@/lib/branding";

export default function StrategyHero() {
  const router = useRouter();
  
  const scrollToSection = (id: string) => {
    // Garantir que estamos em /strategy
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/strategy')) {
      router.push(`/strategy#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, '', `#${id}`);
      }
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#05070C] overflow-hidden">
      {/* Animated background glows - sutis */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00B86B]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00B86B]/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10 py-8">
        {/* Logo - Ponto Focal Central */}
        <div className="flex justify-center mb-8 animate-fade-in-down">
          <div className="relative w-24 h-24">
            <Image
              src="/logo-strategy.png"
              alt="LandSpace Strategy Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,184,107,0.4)] drop-shadow-[0_0_40px_rgba(0,184,107,0.2)] animate-pulse-slow"
              priority
            />
            {/* Glow adicional para efeito de flutuação */}
            <div className="absolute inset-0 bg-[#00B86B]/15 rounded-full blur-2xl -z-10 animate-pulse-slow"></div>
          </div>
        </div>

        {/* Título - Hierarquia tipográfica refinada */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgba(255,255,255,0.92)]">
            <span className="text-2xl md:text-3xl text-[rgba(255,255,255,0.46)] font-light">{branding.brandName}</span>{" "}
            {branding.pillars.strategy.uiName}
          </h1>
          <p className="text-xl md:text-2xl text-[rgba(255,255,255,0.66)] leading-relaxed font-light max-w-[60ch] mx-auto">
            {branding.pillars.strategy.tagline}
          </p>
        </div>

        {/* Chips/Badges - Consistentes com borda stroke */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-full hover:border-[#00B86B]/30 hover:bg-[#00B86B]/8 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(0,184,107,0.2)] transition-all duration-300">
            <FileText className="w-4 h-4 text-[#00B86B]" />
            <span className="text-sm text-[rgba(255,255,255,0.92)] font-medium">Briefings (1–4p)</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-full hover:border-[#00B86B]/30 hover:bg-[#00B86B]/8 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(0,184,107,0.2)] transition-all duration-300">
            <Map className="w-4 h-4 text-[#00B86B]" />
            <span className="text-sm text-[rgba(255,255,255,0.92)] font-medium">Mapas interativos</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-full hover:border-[#00B86B]/30 hover:bg-[#00B86B]/8 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(0,184,107,0.2)] transition-all duration-300">
            <Headphones className="w-4 h-4 text-[#00B86B]" />
            <span className="text-sm text-[rgba(255,255,255,0.92)] font-medium">Podcast</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-full hover:border-[#00B86B]/30 hover:bg-[#00B86B]/8 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(0,184,107,0.2)] transition-all duration-300">
            <Youtube className="w-4 h-4 text-[#00B86B]" />
            <span className="text-sm text-[rgba(255,255,255,0.92)] font-medium">YouTube + X</span>
          </div>
        </div>

        {/* Botões - Primário e Secundário */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={() => scrollToSection("newsletter")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B86B] text-white rounded-xl font-semibold text-base shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 hover:scale-105"
          >
            Receber atualizações
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToSection("mapas")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] rounded-xl font-semibold text-base hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-all duration-300"
          >
            Explorar mapas
            <Map className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
