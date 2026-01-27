"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Code, 
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Trophy,
  Users,
  Target,
  Building2,
  FileText,
  Eye,
  TrendingUp,
  Shield,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Zap,
  Clock
} from "lucide-react";

export default function SobreInstrutorPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <Header variant="global" minimal={true} />

      <main className="relative z-10">
        {/* Hero Section - Dark Tech */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                Founder & PhD
              </h1>
              <p className="text-2xl md:text-3xl text-cyan-400 font-semibold mb-4">
                Wellmo Alves
              </p>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                Engenheiro Agrônomo, Geógrafo e Pesquisador, unindo o rigor da ciência à agilidade da automação geoespacial.
              </p>
            </div>

            {/* Bio Resumo - Dark Glass */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <p className="text-lg text-slate-300 leading-relaxed text-center">
                  Com mais de <strong className="text-white font-semibold">15 anos de trajetória técnica e acadêmica</strong>, 
                  Wellmo é Mestre e Doutor em Geografia (UFG), especialista em Geoprocessamento (UFV) e Perícia Forense (IPOG), Engenheiro Agrônomo (IFGoiano) e Geógrafo (CREA-GO). Sua atuação é focada em transformar dados 
                  complexos em soluções práticas para os setores ambiental e agronômico.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Destaque de Atuação Atual - ANA/CNPq - Dark Tech */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border-2 border-cyan-500/30 rounded-3xl p-10 md:p-12 relative overflow-hidden">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Especialista em Hidrossedimentologia (ANA/CNPq)
                      </h2>
                    </div>
                    {/* Badge de Destaque */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/50">
                        <Shield className="w-4 h-4" />
                        Perfil 1 – Especialista
                      </span>
                    </div>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Atualmente atua no desenvolvimento do <strong className="text-white font-semibold">Arcabouço Analítico de Dados de Sedimentos em Suspensão</strong>, 
                    um projeto estratégico da <strong className="text-cyan-400 font-semibold">Agência Nacional de Águas e Saneamento Básico (ANA)</strong> com 
                    bolsa de Produtividade Técnica do CNPq.
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <TrendingUp className="w-4 h-4 text-cyan-400 " />
                      <span>Projeto de Relevância Nacional</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Números Expandida (Social Proof) - Dark Tech Dashboard */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Indicadores de Autoridade
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Produção científica e reconhecimento acadêmico
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Produção Bibliográfica */}
              <div 
                className="relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">39+</div>
                <div className="text-sm text-slate-300 font-medium mb-1">Artigos em Periódicos</div>
                <div className="text-xs text-slate-500">+ 100 trabalhos em Congressos Científicos</div>
                
                {/* Tooltip */}
                {hoveredCard === 1 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 pointer-events-none">
                    <div className="bg-slate-900/95 backdrop-blur-sm text-white rounded-lg px-4 py-3 shadow-2xl max-w-xs text-center leading-relaxed animate-tooltip-fade border border-white/10 text-xs">
                      Publicações em periódicos de alto impacto nacional e internacional, incluindo South American Earth Sciences, Water (MDPI) e Revista Brasileira de Geografia Física.
                      {/* Seta do tooltip */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Livros e Capítulos */}
              <div 
                className="relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:shadow-xl hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">18</div>
                <div className="text-sm text-slate-300 font-medium mb-1">Capítulos Técnicos</div>
                <div className="text-xs text-slate-500">Organizador de obra sobre análise espacial</div>
                
                {/* Tooltip */}
                {hoveredCard === 2 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 pointer-events-none">
                    <div className="bg-slate-900/95 backdrop-blur-sm text-white rounded-lg px-4 py-3 shadow-2xl max-w-xs text-center leading-relaxed animate-tooltip-fade border border-white/10 text-xs">
                      Autor de capítulos técnicos especializados e organizador da obra multiversionada &quot;Reflexões Geográficas no Cerrado Brasileiro&quot; (Editora CRV).
                      {/* Seta do tooltip */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 3: Premiações */}
              <div 
                className="relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-7 h-7 text-amber-400" />
                </div>
                <div className="text-lg font-bold text-white mb-2">Multpremiado</div>
                <div className="text-sm text-slate-300 font-medium mb-1">1º lugar e distinções</div>
                <div className="text-xs text-slate-500">Congressos nacionais de pesquisa e extensão</div>
                
                {/* Tooltip */}
                {hoveredCard === 3 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 pointer-events-none">
                    <div className="bg-slate-900/95 backdrop-blur-sm text-white rounded-lg px-4 py-3 shadow-2xl max-w-xs text-center leading-relaxed animate-tooltip-fade border border-white/10 text-xs">
                      Premiado com diversos 1º lugares em congressos de Pesquisa, Ensino e Extensão, com destaque para as distinções recebidas no IF Goiano.
                      {/* Seta do tooltip */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 4: Revisor */}
              <div 
                className="relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-7 h-7 text-indigo-400" />
                </div>
                <div className="text-lg font-bold text-white mb-2">Revisor de Periódicos</div>
                <div className="text-sm text-slate-300 font-medium mb-1">Contribuinte ativo</div>
                <div className="text-xs text-slate-500">Validação de ciência em revistas renomadas</div>
                
                {/* Tooltip */}
                {hoveredCard === 4 && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 pointer-events-none">
                    <div className="bg-slate-900/95 backdrop-blur-sm text-white rounded-lg px-4 py-3 shadow-2xl max-w-xs text-center leading-relaxed animate-tooltip-fade border border-white/10 text-xs">
                      Revisor científico ativo de revistas renomadas como Sociedade & Natureza (UFU), Revista Brasileira de Geografia Física e Caminhos de Geografia.
                      {/* Seta do tooltip */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trajetória Acadêmica e Profissional - Dark Tech */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Trajetória Acadêmica e Profissional
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Formação de elite e atuação em instituições de referência
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formação de Elite */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Formação</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Doutorado em Geografia</div>
                      <div className="text-sm text-slate-400">Universidade Federal de Goiás (UFG)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Mestrado em Geografia</div>
                      <div className="text-sm text-slate-400">Universidade Federal de Goiás (UFG)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Engenharia Agronômica</div>
                      <div className="text-sm text-slate-400">Instituto Federal Goiano (IFGoiano)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Especializações em Geoprocessamento</div>
                      <div className="text-sm text-slate-400">Universidade Federal de Viçosa (UFV)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Especializações em Perícia Forense - com ênfase em Inteligência Geoespacial</div>
                      <div className="text-sm text-slate-400">Instituto de Pós-Graduação (IPOG)</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Atuação Institucional */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Atuação Institucional</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Fundador e Líder Técnico</div>
                      <div className="text-sm text-slate-400">LandSpace — Inteligência Geoespacial e Automação · 2026 - Atual</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Professor Permanente</div>
                      <div className="text-sm text-slate-400">Programa de Pós-Graduação em Geografia (UFJ) — 2021–2025</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Professor Permanente</div>
                      <div className="text-sm text-slate-400">Programa de Pós-Graduação em Engenharia Aplicada e Sustentabilidade (IF Goiano) - 2023 - Atual</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 " />
                    <div>
                      <div className="font-semibold text-white">Supervisor</div>
                      <div className="text-sm text-slate-400">Laboratório de Ciências Agrárias (LCA)/IFGoiano - 2022 - Atual</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Diferencial Técnico */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 lg:col-span-2 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Diferencial Técnico</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Modelagem Avançada</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Foco em modelagem do sistema solo-planta-atmosfera, utilizando técnicas avançadas de análise 
                      geoespacial e processamento de dados ambientais.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Automação e GeoAI</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Especialista em automação de fluxos de trabalho geoespaciais, integrando Machine Learning, 
                      Deep Learning e Computer Vision para soluções inovadoras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Liderança Acadêmica - Pesquisa e Extensão - Dark Tech */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                <Users className="w-8 h-8 text-cyan-400 " />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Liderança Acadêmica
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                União entre Docência Superior e Consultoria de Alto Nível
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pesquisa */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Pesquisa</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Coordena e participa ativamente de projetos de pesquisa focados em <strong className="text-white font-semibold">modelagem geoespacial (geossistemas, agroecossistemas e planejamento territorial)</strong>, desenvolvendo metodologias inovadoras que unem 
                  ciência de ponta com aplicação prática.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 " />
                    <span>Projetos de pesquisa em instituições de referência</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 " />
                    <span>Desenvolvimento de metodologias validadas cientificamente</span>
                  </li>
                </ul>
              </div>

              {/* Extensão */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Extensão</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Atuação em projetos de extensão que conectam o conhecimento acadêmico com necessidades reais do mercado, 
                  garantindo que as soluções desenvolvidas sejam <strong className="text-white font-semibold">aplicáveis e impactantes</strong>.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 " />
                    <span>Transferência de tecnologia para o setor produtivo</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 " />
                    <span>Consultoria de alto nível para empresas e órgãos públicos</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Destaque Liderança Acadêmica */}
            <div className="mt-8 bg-slate-900/60 backdrop-blur-md border-2 border-cyan-500/30 rounded-3xl p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">Liderança Acadêmica</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Professor Permanente nos Programas de Pós-Graduação em <strong className="text-white font-semibold">Geografia (UFJ, 2021-2025)</strong> e <strong className="text-white font-semibold">Engenharia Aplicada e Sustentabilidade (IF Goiano) - 2022 - Atual</strong>.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-3">
                    Focado na formação de novos pesquisadores e profissionais de alto nível, utilizando metodologias de ponta validadas pela comunidade científica nacional e internacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Final - Dark Tech */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Desenvolvido por quem cria automação geoespacial de alta performance
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Ferramentas proprietárias de inteligência geoespacial automatizada, validadas cientificamente e aplicadas em projetos reais de alto impacto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
              >
                Ver Ferramentas
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a
                href="https://lattes.cnpq.br/2339201205105450"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-2xl font-semibold text-base hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
              >
                Acessar Currículo Lattes Completo
                <ExternalLink className="w-5 h-5 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/wellmo-alves-b58664287/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-2xl font-semibold text-base hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 relative"
              >
                Ver perfil no LinkedIn
                <Linkedin className="w-5 h-5 text-cyan-400" />
                <ExternalLink className="w-5 h-5 text-cyan-400 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="global" hideCTA={true} />
      <WhatsAppButton />
    </div>
  );
}
