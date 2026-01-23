"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  Settings,
  Scale,
  Globe,
  ArrowRight,
  Lightbulb,
  DraftingCompass,
  Code,
  GraduationCap,
  CheckCircle2,
  Send,
  MessageCircle
} from "lucide-react";

export default function ConsultoriaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    desafio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log("Formulário enviado:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <Header />

      <main className="relative z-10">
        {/* Hero Section - Autoridade Máxima */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                Inteligência Geoespacial para <strong className="text-cyan-400">Desafios Críticos</strong>.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
                Quando as ferramentas de mercado não são suficientes, nós construímos a solução. Consultoria especializada em automação, perícia e inteligência de dados.
              </p>
              <div className="flex justify-center mt-8">
                <Link
                  href="#formulario"
                  className="btn-landspace-glow inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:from-green-400 hover:to-emerald-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:-translate-y-1 hover:scale-110"
                >
                  Solicitar Diagnóstico Técnico
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Soluções - O que entregamos */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                O que entregamos
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Soluções customizadas para desafios que ferramentas prontas não resolvem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Desenvolvimento de Algoritmos */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <Settings className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Desenvolvimento de Algoritmos
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Criação de rotinas e plugins exclusivos para a dor da sua empresa. Automações personalizadas que eliminam gargalos operacionais.
                </p>
              </div>

              {/* Card 2: Perícia e Assistência Técnica */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <Scale className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Perícia e Assistência Técnica
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Laudos complexos para litígios ambientais e agrários com rigor forense. Análises técnicas que suportam decisões judiciais e administrativas.
                </p>
              </div>

              {/* Card 3: Monitoramento de Ativos */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-14 h-14 flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Monitoramento de Ativos
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  Sistemas de vigilância territorial via satélite e drones. Monitoramento contínuo de grandes áreas com alertas automatizados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O Diferencial - Entrega de Propriedade Intelectual */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-12 md:p-16 shadow-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
                  <GraduationCap className="w-10 h-10 text-cyan-400" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Entrega de <strong className="text-cyan-400">Propriedade Intelectual</strong>
                </h2>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Diferente de consultorias tradicionais, nós não apenas entregamos o laudo. Entregamos a ferramenta e treinamos seu time para continuar a operação.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O Processo - Passo a Passo Visual */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                O Processo
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Metodologia validada para entregar resultados de alto impacto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Passo 1: Imersão */}
              <div className="group relative p-6 flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">1</div>
                <h3 className="text-xl font-bold text-white mb-3">Imersão</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Entendemos o gargalo e mapeamos as necessidades específicas da sua operação.
                </p>
              </div>

              {/* Passo 2: Arquitetura */}
              <div className="group relative p-6 flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <DraftingCompass className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">2</div>
                <h3 className="text-xl font-bold text-white mb-3">Arquitetura</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  O PhD desenha a solução técnica e valida a viabilidade com rigor científico.
                </p>
              </div>

              {/* Passo 3: Desenvolvimento */}
              <div className="group relative p-6 flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <Code className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">3</div>
                <h3 className="text-xl font-bold text-white mb-3">Desenvolvimento</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Criamos a automação, testamos em ambiente real e validamos os resultados.
                </p>
              </div>

              {/* Passo 4: Handover */}
              <div className="group relative p-6 flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">4</div>
                <h3 className="text-xl font-bold text-white mb-3">Handover</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Entregamos a ferramenta, documentação completa e treinamos seu time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário de Qualificação */}
        <section id="formulario" className="py-24 bg-slate-950">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Fale com nossos especialistas
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Descreva seu desafio e receba uma proposta técnica personalizada.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-slate-300 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-slate-300 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    placeholder="Nome da sua empresa ou órgão"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    placeholder="seu.email@empresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="desafio" className="block text-sm font-medium text-slate-300 mb-2">
                    Descrição do Desafio
                  </label>
                  <textarea
                    id="desafio"
                    name="desafio"
                    value={formData.desafio}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                    placeholder="Descreva o desafio técnico ou operacional que sua equipe enfrenta..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Solicitação
                  </button>
                  <a
                    href="https://wa.me/5564999082421"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:from-green-400 hover:to-emerald-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:-translate-y-1 hover:scale-110"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Falar no WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}



