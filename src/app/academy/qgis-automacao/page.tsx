"use client";

import Link from "next/link";
import { getAcademyCourseBySlug } from "../data";
import { getTestimonialsBySlug } from "@/app/catalogo/testimonials";
import { COURSES } from "@/app/catalogo/data";
import { CheckCircle2, Award, Infinity, Zap, MessageCircle, Trophy, BookOpen, Layers, Play } from "lucide-react";
import LeadershipSection from "@/components/academy/LeadershipSection";

export default function QGISAutomacaoPage() {
  const course = getAcademyCourseBySlug("qgis-automacao");

  if (!course) {
    return null;
  }

  // Seleciona 2 depoimentos aleatórios do banco de 12
  const testimonials = getTestimonialsBySlug("transicao-uso-cobertura", COURSES);

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <main className="relative z-10">
        {/* Hero Section - Dark Tech */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              {/* Badge de Destaque */}
              <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 rounded-full">
                <span className="text-xs md:text-sm font-bold text-cyan-300 tracking-wide uppercase">
                  CAPACITAÇÃO TÉCNICA AVANÇADA
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                {course.subtitle}
              </p>

              {/* Vídeo Placeholder - Neon Glass Player */}
              <div className="group relative w-full max-w-4xl mx-auto mt-12 aspect-video rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/10 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                
                {/* Overlay Escuro */}
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-all duration-300"></div>
                
                {/* Botão de Play - Cyberpunk Tech */}
                <div className="absolute inset-0 flex justify-center items-center h-full w-full">
                  <div className="flex flex-col items-center justify-center">
                    <button className="relative w-20 h-20 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:border-cyan-400/70 transition-all duration-300 cursor-pointer">
                      <Play className="w-10 h-10 text-cyan-400 ml-1 fill-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,1)] transition-all duration-300" />
                    </button>
                    <p className="text-slate-300 text-lg font-medium mt-4">Apresentação do Curso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo do Curso */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-3">
              {/* Conteúdo Principal */}
              <div className="lg:col-span-2 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Sobre o Curso</h2>
                  <p className="text-base text-slate-300 leading-relaxed">{course.overview}</p>
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-5">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <strong className="text-white font-semibold">Como funciona:</strong> Este curso de capacitação técnica apresenta os fundamentos e práticas de automação geoespacial, 
                      preparando profissionais para estruturar processos automatizados e aplicar metodologias validadas em projetos reais.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">O que está incluso</h2>
                  <div className="space-y-3">
                    {course.bullets.map((bullet, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors" />
                        <span className="text-base text-slate-300 leading-relaxed group-hover:text-white transition-colors">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                    <h3 className="text-xl font-bold text-white tracking-tight">Resultado Final</h3>
                  </div>
                  <p className="text-base text-slate-300 leading-relaxed">{course.outcome}</p>
                </div>

                {/* Perfil Profissional Indicado */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Perfil Profissional Indicado</h2>
                  <div className="space-y-3">
                    {course.professionalProfile.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors" />
                        <span className="text-base text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pré-requisitos para o treinamento */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Pré-requisitos para o treinamento</h2>
                  <ul className="space-y-3">
                    {course.prerequisites.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 group">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors" />
                        <span className="text-base text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Manual de Implementação e Uso */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Estrutura do Curso</h2>
                  <div className="space-y-2">
                    {course.modules.map((modulo, idx) => (
                      <details
                        key={idx}
                        open={modulo.open}
                        className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 group hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <summary className="font-semibold text-lg text-white cursor-pointer list-none flex items-center justify-between tracking-tight">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span>{modulo.title}</span>
                              <span className="text-sm text-slate-500 font-normal">
                                {modulo.duracao === "Acesso ao Arquivo" 
                                  ? "(1 sessão de treinamento • Acesso ao Arquivo)"
                                  : `(${modulo.aulas} ${modulo.aulas === 1 ? "sessão de treinamento" : "sessões de treinamento"} • ${modulo.duracao})`
                                }
                              </span>
                            </div>
                          </div>
                          <span className="text-xl text-slate-400 group-open:rotate-45 transition-transform ml-4">+</span>
                        </summary>
                        <div className="mt-4 text-slate-300 leading-relaxed text-base">
                          {modulo.content}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Card de Autoridade - Dark Glass Premium */}
                <LeadershipSection />

                {/* Depoimentos */}
                <section id="depoimentos">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b border-white/10 tracking-tight">
                    Impacto na Operação de Profissionais
                  </h2>
                  <div className="space-y-6">
                    {testimonials.map((testimonial, idx) => (
                      <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                        <p className="text-base text-slate-300 italic border-l-2 border-cyan-400 pl-6 mb-6 leading-relaxed">
                          &quot;{testimonial.text}&quot;
                        </p>
                        <div className="flex items-center gap-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-sm"
                          />
                          <div>
                            <strong className="text-white text-base block font-semibold">{testimonial.name}</strong>
                            <span className="text-sm text-slate-400">{testimonial.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar - Sticky Card */}
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 sticky top-24">
                  {/* Imagem do curso */}
                  <div className="relative w-full h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-24 h-24 text-cyan-400/30" />
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <p className="text-xs text-slate-500 mb-1.5 uppercase tracking-wide font-medium">Capacitação Técnica</p>
                      <p className="text-3xl font-bold text-white tracking-tight">
                        Acesso Vitalício
                      </p>
                    </div>

                    <Link
                      href="/academy"
                      className="btn-landspace-glow group inline-flex items-center justify-center gap-2 w-full text-center px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
                    >
                      Voltar para a Academy
                      <Award className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </Link>

                    <p className="text-xs text-slate-400 text-center leading-relaxed mt-3">
                      Capacitação técnica avançada em automação e inteligência geoespacial
                    </p>

                    {/* Capacidades da Solução */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-xl p-5">
                      <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">O que está incluso</h4>
                      <ul className="space-y-2.5">
                        {[
                          { text: "Acesso Vitalício ao Conteúdo", icon: Infinity },
                          { text: "Processamento Automatizado", icon: Zap },
                          { text: "Documentação e Materiais", icon: BookOpen },
                          { text: "Suporte Técnico Especializado", icon: MessageCircle },
                          { text: "Certificação de Capacitação", icon: Trophy },
                        ].map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                              <Icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                              <span>{item.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Garantia */}
                    <div className="text-center pt-4 border-t border-white/10">
                      <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2.5 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-white font-semibold">Capacitação validada cientificamente.</strong>{" "}
                        Metodologias aplicadas em projetos reais de alto impacto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
