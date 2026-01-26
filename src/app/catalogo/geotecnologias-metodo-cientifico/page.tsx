"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { HideOnError } from "@/components/shared/HideOnError";
import { CheckCircle2, Play, Award, ArrowRight, Infinity, Zap, MessageCircle, Trophy, BookOpen } from "lucide-react";
import { getTestimonialsBySlug } from "../testimonials";
import { COURSES } from "../data";

export default function GeotecnologiasMetodoCientificoPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>
      <Header />

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
                  TREINAMENTO INCLUSO
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
                Geotecnologias como Suporte Científico
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Aplicação correta de geotecnologias em TCCs, dissertações e teses, com rigor científico.
              </p>

              {/* Vídeo Placeholder - Ambilight Effect */}
              <div className="group relative w-full max-w-4xl mx-auto mt-12 aspect-video bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/10 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center h-full w-full">
                  <div className="flex flex-col items-center justify-center">
                    <button className="relative w-20 h-20 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:border-cyan-400/70 transition-all duration-300 cursor-pointer">
                      <Play className="w-10 h-10 text-cyan-400 ml-1 fill-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,1)] transition-all duration-300" />
                    </button>
                    <p className="text-slate-300 text-lg font-medium mt-4">Manual de Uso da Ferramenta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* COLUNA DA ESQUERDA (CONTEÚDO) */}
            <div className="lg:col-span-2 space-y-20">
              {/* O que está incluso */}
              <section id="aprendera">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b border-white/10 tracking-tight">
                  O que está incluso
                </h2>
                <ul className="space-y-3">
                  {["Uso científico correto das geotecnologias","Integração metodológica em pesquisas acadêmicas","Evitar mapas ilustrativos sem rigor científico","Base conceitual para estudos avançados"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors" />
                      <span className="text-base text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Perfil Profissional Indicado */}
              <section id="requisitos">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b border-white/10 tracking-tight">
                  Perfil Profissional Indicado
                </h2>
                <ul className="space-y-3">
                  {[
                    "Profissionais que trabalham com análise geoespacial e geoprocessamento",
                    "Consultores ambientais e territoriais",
                    "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
                    "Equipes que buscam automatizar processos repetitivos",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors" />
                      <span className="text-base text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pré-requisitos */}
              <section id="pre-requisitos">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b border-white/10 tracking-tight">
                  Pré-requisitos para o treinamento
                </h2>
                <ul className="space-y-3">
                  {[
                    "Computador com acesso à internet (Windows, Mac ou Linux).",
                    "Nenhum conhecimento prévio em programação é necessário.",
                    "Vontade de automatizar processos e ganhar tempo.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors" />
                      <span className="text-base text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Card de Autoridade - Dark Glass Premium */}
              <section id="docente">
                <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300">
                  <div className="text-center mb-8 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      Liderança Técnica e Científica
                    </h2>
                    <p className="text-xl text-cyan-400 font-semibold">
                      Wellmo Alves, PhD - O arquiteto por trás das soluções LandSpace.
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Foto do Instrutor */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-cyan-500/20 ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-slate-950 shadow-lg hover:ring-cyan-500/80 hover:ring-4 hover:scale-105 transition-all duration-300">
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
                        <p className="text-lg text-slate-300 leading-relaxed mb-4">
                          Doutor e Mestre em Geografia (UFG), Especialista em Geoprocessamento (UFV) e Perícia Forense - com ênfase em Inteligência Geoespacial (IPOG). Engenheiro Agrônomo (IFGoiano) e Geógrafo (CREA/GO).
                        </p>

                        {/* Registros Oficiais */}
                        <div className="flex items-center gap-2 mb-6 text-sm text-slate-400 justify-center md:justify-start">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                          <span>Registro Profissional: CREA 21947/D-GO | RNP 1005596280</span>
                        </div>

                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                          Cada <strong className="text-white font-semibold">solução, modelo e automação</strong> foi desenvolvida e validada com rigor científico, 
                          garantindo que você trabalhe com ferramentas que realmente funcionam no mercado.
                        </p>
                      </div>

                      {/* Grid de Stats - Dark Tech Dashboard */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                        <div className="text-center md:text-left">
                          <div className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-1">39+</div>
                          <div className="text-sm text-slate-400">Artigos Científicos</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-1">100+</div>
                          <div className="text-sm text-slate-400">Trabalhos em Congressos</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-1">8</div>
                          <div className="text-sm text-slate-400">Prêmios | 3x 1º Lugar</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-1">18</div>
                          <div className="text-sm text-slate-400">Capítulos Técnicos</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Manual de Implementação e Uso */}
              <section id="temario">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b border-white/10 tracking-tight">
                  Manual de Implementação e Uso
                </h2>
                <div className="space-y-2">
                  {[
                    {
                      title: "Fase 1: Onboarding e Fundamentos",
                      content: "Boas-vindas, visão geral da metodologia e conceitos essenciais.",
                      aulas: 0,
                      duracao: "00h 00m",
                      open: true,
                    },
                    {
                      title: "Fase 2: O Toolkit (Download e Instalação)",
                      content: "Acesso direto aos arquivos da ferramenta. Guia passo a passo de instalação e configuração do ambiente.",
                      aulas: 1,
                      duracao: "Acesso ao Arquivo",
                      open: false,
                    },
                    {
                      title: "Fase 3: Workflow de Processamento (Tutorial)",
                      content: "Executando a rotina na prática. Processamento automatizado passo a passo.",
                      aulas: 0,
                      duracao: "00h 00m",
                      open: false,
                    },
                    {
                      title: "Fase 4: Inteligência de Dados (Análise)",
                      content: "Interpretando resultados, analisando métricas e gerando outputs de alto impacto.",
                      aulas: 0,
                      duracao: "00h 00m",
                      open: false,
                    },
                    {
                      title: "Bônus: Modelos e Relatórios",
                      content: "Templates prontos para seus laudos e acesso à comunidade de suporte.",
                      aulas: 0,
                      duracao: "00h 00m",
                      open: false,
                    },
                  ].map((modulo, idx) => (
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
              </section>

              {/* Depoimentos */}
              <section id="depoimentos">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b border-white/10 tracking-tight">
                  Impacto na Operação de Profissionais
                </h2>
                <div className="space-y-6">
                  {getTestimonialsBySlug("geotecnologias-metodo-cientifico", COURSES).map((testimonial, idx) => (
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

            {/* COLUNA DA DIREITA (CAIXA DE COMPRA) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300">
                {/* Imagem do curso */}
                <div className="relative w-full h-56 bg-gradient-to-br from-slate-800 to-slate-900">
                  <HideOnError>
                    {({ hidden, onError }) => (
                      <Image
                        src="/courses/geotecnologias-como-metodo-cientifico.png"
                        alt="Geotecnologias como Suporte Científico"
                        fill
                        className={`object-cover ${hidden ? 'hidden' : ''}`}
                        onError={onError}
                      />
                    )}
                  </HideOnError>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <div className="text-slate-400 text-xs">Imagem da ferramenta</div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs text-slate-500 mb-1.5 uppercase tracking-wide font-medium">Investimento</p>
                    <p className="text-3xl font-bold text-white tracking-tight">Lançamento em breve</p>
                  </div>

                  <Link
                    href="/lista-interesse?curso=geotecnologias-metodo-cientifico"
                    className="btn-landspace-glow group inline-flex items-center justify-center gap-2 w-full text-center px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
                  >
                    Entrar na Lista de Espera
                    <Award className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                  <p className="text-xs text-slate-400 text-center leading-relaxed">
                    Receba aviso de lançamento e acesso prioritário às primeiras vagas.
                  </p>

                  {/* Capacidades da Solução */}
                  <div className="bg-slate-800/50 border border-white/10 rounded-xl p-5">
                    <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Capacidades da Solução</h4>
                    <ul className="space-y-2.5">
                      {[
                        { text: "Acesso Vitalício ao Toolkit", icon: Infinity },
                        { text: "Rotinas Automatizadas Prontas", icon: Zap },
                        { text: "Documentação e Manuais (Vídeo)", icon: BookOpen },
                        { text: "Suporte Técnico Especializado", icon: MessageCircle },
                        { text: "Certificação de Capacitação Técnica", icon: Trophy },
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
                      <strong className="text-white font-semibold">Garantia incondicional de 7 dias.</strong>{" "}
                      Se não gostar, devolvemos seu dinheiro.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
