"use client";

import Link from "next/link";
import { Code, GraduationCap, Map, Layers, ArrowRight, MessageSquare } from "lucide-react";
import { branding } from "@/lib/branding";

// Ícone SVG customizado: Selo de Validação Geoespacial
function ValidationSealIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-amber`}
    >
      <defs>
        <linearGradient id="amber-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      
      {/* Hexágono com bordas arredondadas */}
      <path
        d="M12 2 L20 6 L20 14 L12 18 L4 14 L4 6 Z"
        stroke="url(#amber-grad-final)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      {/* Grade cartográfica - Linhas horizontais */}
      <line x1="6" y1="8" x2="18" y2="8" stroke="url(#amber-grad-final)" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="url(#amber-grad-final)" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="16" x2="18" y2="16" stroke="url(#amber-grad-final)" strokeWidth="0.8" opacity="0.5" />
      
      {/* Grade cartográfica - Linhas verticais */}
      <line x1="9" y1="6" x2="9" y2="18" stroke="url(#amber-grad-final)" strokeWidth="0.8" opacity="0.5" />
      <line x1="12" y1="6" x2="12" y2="18" stroke="url(#amber-grad-final)" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="6" x2="15" y2="18" stroke="url(#amber-grad-final)" strokeWidth="0.8" opacity="0.5" />
      
      {/* Check elegante no centro */}
      <path
        d="M9 12 L11 14 L15 10"
        stroke="url(#amber-grad-final)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
    </svg>
  );
}

const pillars = [
  {
    name: branding.pillars.tech.uiName,
    icon: Code,
    href: branding.pillars.tech.href,
    color: "cyan",
  },
  {
    name: branding.pillars.studio.uiName,
    icon: Layers,
    href: branding.pillars.studio.href,
    color: "indigo",
  },
  {
    name: branding.pillars.strategy.uiName,
    icon: Map,
    href: branding.pillars.strategy.href,
    color: "emerald",
  },
  {
    name: branding.pillars.academy.uiName,
    icon: GraduationCap,
    href: branding.pillars.academy.href,
    color: "purple",
  },
  {
    name: branding.pillars.labs.uiName,
    icon: ValidationSealIcon,
    href: branding.pillars.labs.href,
    color: "amber",
  },
];

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Pronto para iniciar um projeto com a LandSpace?
          </h2>

          {/* CTA Primário */}
          <div className="pt-4 space-y-3">
            <Link
              href="/contato"
              className="group inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold text-base shadow-lg transition-all duration-200 hover:scale-105 gradient-button-primary shadow-button-primary text-shadow-button drop-shadow-button hover:gradient-button-primary-hover hover:shadow-button-primary-hover hover:text-shadow-button-hover"
            >
              Solicitar protocolo de projeto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 drop-shadow-button" />
            </Link>
            <p className="text-xs text-slate-300">
              Triagem técnica • Escopo claro • QA/QC pelo Labs.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              Agendar conversa técnica
            </Link>
          </div>

          {/* CTAs Secundários */}
          <div className="pt-6">
            <p className="text-sm text-slate-300 mb-4">Ou explore diretamente:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const colorClasses = {
                  amber: {
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/30",
                    borderHover: "hover:border-amber-500/50",
                    iconColor: "text-amber-400",
                    textColor: "text-amber-400",
                    hoverBg: "hover:bg-amber-500/15",
                  },
                  cyan: {
                    bg: "bg-cyan-500/10",
                    border: "border-cyan-500/30",
                    borderHover: "hover:border-cyan-500/50",
                    iconColor: "text-cyan-400",
                    textColor: "text-cyan-400",
                    hoverBg: "hover:bg-cyan-500/15",
                  },
                  emerald: {
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/30",
                    borderHover: "hover:border-emerald-500/50",
                    iconColor: "text-emerald-400",
                    textColor: "text-emerald-400",
                    hoverBg: "hover:bg-emerald-500/15",
                  },
                  purple: {
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/30",
                    borderHover: "hover:border-purple-500/50",
                    iconColor: "text-purple-400",
                    textColor: "text-purple-400",
                    hoverBg: "hover:bg-purple-500/15",
                  },
                  indigo: {
                    bg: "bg-indigo-500/10",
                    border: "border-indigo-500/30",
                    borderHover: "hover:border-indigo-500/50",
                    iconColor: "text-indigo-400",
                    textColor: "text-indigo-400",
                    hoverBg: "hover:bg-indigo-500/15",
                  },
                };

                const colors = colorClasses[pillar.color as keyof typeof colorClasses];

                return (
                  <Link
                    key={pillar.name}
                    href={pillar.href}
                    className={`group inline-flex items-center gap-2 ${colors.bg} backdrop-blur-sm border ${colors.border} ${colors.borderHover} ${colors.hoverBg} rounded-xl px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    <Icon className={`w-4 h-4 ${colors.iconColor}`} />
                    <span className={`text-sm font-medium ${colors.textColor}`}>
                      {pillar.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
