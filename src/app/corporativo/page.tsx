"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  Code, 
  Map,
  Users, 
  Award,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  FileText,
  Target,
  Zap,
  Clock,
  Infinity
} from "lucide-react";

export default function SolucoesPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <Header variant="tech" />

      <main className="relative z-10">
        {/* Hero Section - Dark Tech */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                Inteligência Geoespacial em <strong className="text-cyan-400">Escala Corporativa</strong>.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
                Transforme dados complexos em <strong className="text-cyan-400 font-semibold">Decisões Estratégicas</strong>. Soluções de automação e capacitação técnica para equipes de alta performance.
              </p>
            </div>
          </div>
        </section>

        {/* Os 3 Pilares - Cards Glassmorphism */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Desenvolvimento de Workflows */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <Code className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Desenvolvimento de Workflows
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Desenvolvimento de rotinas de processamento personalizadas. Eliminamos o trabalho manual da sua equipe.
                </p>
              </div>

              {/* Card 2: Inteligência Territorial */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <Map className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Inteligência Territorial
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Análises de alta complexidade para suporte à decisão, licenciamento e monitoramento de ativos.
                </p>
              </div>

              {/* Card 3: Capacitação & Licenciamento */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Capacitação & Licenciamento
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Treinamento técnico para nivelar sua equipe com as ferramentas da LandSpace. Acesso corporativo aos toolkits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Barra de Autoridade - Dark Tech HUD (Idêntica à Home) */}
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

        {/* CTA Final - Chamada */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-12 md:p-16 text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Pronto para transformar seus processos?
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Fale com um especialista e descubra como podemos otimizar seus processos geoespaciais com soluções customizadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contato"
                  className="btn-landspace-glow inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
                >
                  Solicitar Proposta
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a
                  href="https://wa.me/5564999082421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-landspace-glow inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:from-green-400 hover:to-emerald-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:-translate-y-1 hover:scale-110"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Falar com Especialista</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="tech" />
      <WhatsAppButton />
    </div>
  );
}
