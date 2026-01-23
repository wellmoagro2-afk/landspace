"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  CheckCircle2,
  Code,
  Layers,
  Zap,
  ArrowRight,
  Target
} from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <Header />

      <main className="relative z-10">
        {/* Hero Section - Dark Tech Minimalist */}
        <section className="relative py-32 bg-slate-950 overflow-hidden">
          {/* Animated background glows - Discretos */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Roadmap da Plataforma LandSpace
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-2xl mx-auto">
                Visão estratégica e evolução contínua da automação geoespacial
              </p>
            </div>
          </div>
        </section>

        {/* O que é o Roadmap */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
                O que é o Roadmap
              </h2>
              <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                <p>
                  O Roadmap da LandSpace apresenta a visão de evolução da plataforma, destacando capacidades já disponíveis, áreas em desenvolvimento e direções estratégicas futuras.
                </p>
                <p>
                  Não se trata de um cronograma fechado, mas de uma visão contínua de aprimoramento tecnológico.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disponível na Plataforma */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
                Disponível na Plataforma
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Automação de análises de uso e cobertura da terra
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      Processamento automatizado de dados geoespaciais para análise temporal e espacial de mudanças territoriais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Geração automática de matrizes de transição e métricas territoriais
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      Cálculo automatizado de indicadores espaciais e métricas de transição para suporte à decisão territorial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Produção automatizada de mapas, gráficos e relatórios
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      Geração automatizada de outputs visuais e documentação técnica para análises geoespaciais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Integração de modelos espaciais aplicados à análise ambiental e territorial
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      Incorporação de modelos validados cientificamente para análise de geossistemas e planejamento territorial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Em Desenvolvimento */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-10 md:p-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Code className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Em Desenvolvimento
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Expansão de modelos de análise espacial
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        Desenvolvimento de novos modelos e metodologias para análise geoespacial avançada.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Novos módulos de automação e inteligência territorial
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        Ampliação das capacidades de automação para novos contextos de análise territorial.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Integração com novas bases de dados e fontes geoespaciais
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        Conectividade expandida com fontes de dados governamentais e institucionais.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Otimizações de performance e escalabilidade
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        Melhoria contínua da eficiência e capacidade de processamento de grandes volumes de dados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visão de Futuro */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-10 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    Visão de Futuro
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    A LandSpace evolui continuamente para oferecer automação geoespacial robusta, confiável e orientada à decisão, conectando ciência, tecnologia e aplicação real para empresas e governo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco Final - Discreto */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                Tecnologia que evolui. Automação que escala. Decisão que importa.
              </p>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium"
              >
                Conheça o Catálogo de Ferramentas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}



