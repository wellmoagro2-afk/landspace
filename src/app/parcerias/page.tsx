"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  Network,
  GraduationCap,
  Code,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Send,
  MessageCircle,
  Zap,
  Award,
  Users,
  Globe
} from "lucide-react";

export default function ParceriasPage() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    cargo: "",
    tipoParceria: "",
    site: "",
    proposta: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log("Formulário de parceria enviado:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        {/* Hero Section - Conexão */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
                <Network className="w-10 h-10 text-cyan-400" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                Construindo o Futuro da Inteligência Geoespacial, <strong className="text-cyan-400">Juntos</strong>.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
                Conecte nossa tecnologia, metodologia e expertise ao seu ecossistema. Vamos criar valor compartilhado.
              </p>
              <div className="flex justify-center mt-8">
                <a
                  href="#formulario"
                  className="btn-landspace-glow inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:-translate-y-1 hover:scale-110"
                >
                  Tornar-se um Parceiro
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Modelos de Parceria - Os 3 Pilares */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Modelos de Parceria
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Escolha o modelo que melhor se alinha com seus objetivos estratégicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Integração Tecnológica */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Integração Tecnológica
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Para empresas de software que desejam integrar nossas rotinas de automação e algoritmos em seus próprios produtos. APIs e soluções White Label disponíveis.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <span>Tech Partners</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Cooperação Acadêmica & P&D */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Cooperação Acadêmica & P&D
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Para Universidades e Institutos que buscam convênios de pesquisa, desenvolvimento conjunto e validação científica. Licenças especiais para laboratórios.
                </p>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <span>Academia & Governo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Canal de Soluções */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Canal de Soluções
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Para consultores ambientais e empresas de engenharia que desejam revender ou aplicar nossas ferramentas em seus clientes. Representação comercial e suporte técnico.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <span>Consultores & Revendedores</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por que ser parceiro LandSpace? - Vantagens */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-12 md:p-16 shadow-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Por que ser parceiro <strong className="text-cyan-400">LandSpace</strong>?
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Acesso privilegiado a tecnologia proprietária, backing científico e suporte prioritário.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Benefício 1: Tecnologia Proprietária */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                    <Zap className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Acesso à Tecnologia Proprietária
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    TerraMetrics e outras ferramentas exclusivas disponíveis para integração e uso em seus projetos.
                  </p>
                </div>

                {/* Benefício 2: Backing Científico */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                    <Award className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Backing Científico de Nível PhD
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Metodologias validadas cientificamente e suporte técnico especializado de pesquisadores com ampla produção acadêmica.
                  </p>
                </div>

                {/* Benefício 3: Suporte Prioritário */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Suporte Prioritário de Desenvolvimento
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Prioridade no roadmap de desenvolvimento, customizações sob medida e treinamento técnico para sua equipe.
                  </p>
                </div>
              </div>

              {/* Lista de Vantagens Adicionais */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Licenças especiais para laboratórios e grupos de pesquisa",
                    "Documentação técnica completa e APIs documentadas",
                    "Co-marketing e visibilidade no ecossistema LandSpace",
                    "Acesso antecipado a novas ferramentas e funcionalidades",
                    "Descontos progressivos baseados em volume",
                    "Suporte técnico dedicado para integrações"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário de Aplicação - Partnership Application */}
        <section id="formulario" className="py-24 bg-slate-950">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                    <Globe className="w-8 h-8 text-cyan-400" />
                  </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Inicie a conversa
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Descreva sua proposta de parceria e receba uma resposta personalizada em até 48 horas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-slate-300 mb-2">
                    Nome Completo
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
                    Empresa / Instituição
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    placeholder="Nome da sua organização"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cargo" className="block text-sm font-medium text-slate-300 mb-2">
                      Cargo / Função
                    </label>
                    <input
                      type="text"
                      id="cargo"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                      placeholder="Seu cargo atual"
                    />
                  </div>

                  <div>
                    <label htmlFor="tipoParceria" className="block text-sm font-medium text-slate-300 mb-2">
                      Tipo de Parceria
                    </label>
                    <select
                      id="tipoParceria"
                      name="tipoParceria"
                      value={formData.tipoParceria}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    >
                      <option value="" className="bg-slate-900">Selecione o tipo de parceria</option>
                      <option value="tecnologica" className="bg-slate-900">Integração Tecnológica</option>
                      <option value="academica" className="bg-slate-900">Cooperação Acadêmica & P&D</option>
                      <option value="comercial" className="bg-slate-900">Canal de Soluções</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="site" className="block text-sm font-medium text-slate-300 mb-2">
                    Site da Empresa / Instituição
                  </label>
                  <input
                    type="url"
                    id="site"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    placeholder="https://sua-empresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="proposta" className="block text-sm font-medium text-slate-300 mb-2">
                    Proposta de Valor / Mensagem
                  </label>
                  <textarea
                    id="proposta"
                    name="proposta"
                    value={formData.proposta}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                    placeholder="Descreva sua proposta de parceria, objetivos estratégicos e como você vê a colaboração com a LandSpace..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-cyan-500/50 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Proposta de Parceria
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



