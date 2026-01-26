"use client";

import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

/**
 * Card de Fechamento - Consultoria Estratégica
 * Glassmorphism Premium com gradiente radial verde esmeralda
 * Posicionado antes do Footer na página /strategy
 */
export default function ConsultancyCTACard() {
  return (
    <section className="relative py-24 bg-[#05070C] overflow-hidden">
      {/* Gradiente Radial Verde Esmeralda Sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 consultancy-radial-gradient-emerald" />
      </div>

      {/* Glassmorphism Premium Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative backdrop-blur-xl border rounded-2xl p-12 md:p-16 consultancy-glass-card">
          {/* Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-[#00B86B] consultancy-icon-glow" />
              <h2 className="text-2xl md:text-3xl font-mono font-semibold tracking-wider text-[#00B86B] consultancy-title-glow">
                {/* SOLICITAR ANÁLISE GEOESPACIAL CUSTOMIZADA */}
              </h2>
            </div>
          </div>

          {/* Texto Descritivo */}
          <p className="text-lg md:text-xl text-center text-[rgba(255,255,255,0.85)] mb-8 max-w-3xl mx-auto consultancy-line-height-relaxed">
            Transformamos desafios complexos em cartografia de decisão. Diagnósticos estratégicos, monitoramento de recursos e análises geopolíticas sob demanda corporativa ou governamental.
          </p>

          {/* Selo de Autoridade */}
          <div className="text-center mb-10">
            <p className="text-sm font-mono text-[rgba(255,255,255,0.6)] consultancy-letter-spacing-wide">
              Sob supervisão técnica de <span className="text-[#00B86B] font-semibold">Wellmo Alves, PhD</span>
            </p>
          </div>

          {/* Botão Centralizado */}
          <div className="flex justify-center">
            <Link
              href="/strategy/consultancy"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#00B86B] text-white rounded-xl font-semibold text-base md:text-lg shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 hover:scale-105 consultancy-button-shadow"
            >
              <span>INICIAR PROTOCOLO DE DIAGNÓSTICO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
