"use client";

import { useState } from "react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import { 
  Search,
  Rocket,
  Settings,
  CreditCard,
  Brain,
  ChevronDown,
  Mail,
  MessageCircle,
  GraduationCap,
  HelpCircle
} from "lucide-react";

export default function AcademySuportePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Como faço o acesso aos cursos?",
      answer: "Após a compra na Hotmart, você receberá um e-mail com o link de acesso à área do aluno. Lá você encontrará todos os materiais do curso, incluindo vídeos, materiais complementares, exercícios práticos e certificados. O acesso é vitalício e você pode assistir quantas vezes precisar."
    },
    {
      question: "Os cursos funcionam em Mac e Windows?",
      answer: "Sim! Nossos cursos são projetados para funcionar tanto em Windows quanto em Mac (e algumas também em Linux). Cada curso possui requisitos específicos documentados na área do aluno. Cursos baseados em R e Python funcionam em qualquer sistema operacional, enquanto cursos que utilizam QGIS requerem a instalação do QGIS compatível com seu sistema."
    },
    {
      question: "Preciso saber programar para fazer os cursos?",
      answer: "Depende do curso! Alguns cursos são introdutórios e não exigem conhecimento prévio em programação. Outros cursos avançados podem exigir conhecimentos básicos. Cada curso possui pré-requisitos claramente documentados na página de descrição. Recomendamos verificar os pré-requisitos antes da compra."
    },
    {
      question: "Como funciona o suporte durante o curso?",
      answer: "Oferecemos suporte especializado via e-mail (contatos@landspace.io) e WhatsApp. Nossa equipe responde em até 48 horas úteis. Para dúvidas sobre conteúdo, exercícios ou certificação, você também pode consultar a documentação completa disponível na área do aluno."
    },
    {
      question: "O acesso é realmente vitalício?",
      answer: "Sim! Quando você adquire um curso da LandSpace Academy, recebe acesso vitalício a todos os materiais, incluindo vídeos, atualizações do conteúdo, novos materiais complementares e certificados. Não há mensalidades ou taxas recorrentes."
    },
    {
      question: "Como obtenho a nota fiscal e certificado?",
      answer: "A nota fiscal é emitida automaticamente pela Hotmart após a confirmação do pagamento e enviada para o e-mail cadastrado. O certificado de conclusão é disponibilizado na área do aluno após a conclusão de todos os módulos do curso. Você pode baixar e imprimir quando precisar."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-purple-lg"></div>

      <main className="relative z-10">
        {/* Hero Section - Search-First */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Como podemos ajudar?
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Busque por tutoriais de acesso, dúvidas sobre cursos ou detalhes das certificações.
              </p>

              {/* Barra de Busca - Glass Style */}
              <div className="relative mt-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Como acessar o curso de QGIS..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Tópicos - Categorias de Suporte */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Categorias de Suporte
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Encontre respostas rápidas organizadas por tema.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Primeiros Passos */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <div className="mb-6">
                  <Rocket className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Primeiros Passos
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Como acessar a Hotmart, assistir aos cursos e navegar pela área do aluno. Guias passo a passo para começar seus estudos.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Acesso à área do aluno
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Navegação pelos cursos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Vídeos e materiais
                  </li>
                </ul>
              </div>

              {/* Card 2: Suporte Técnico */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <div className="mb-6">
                  <Settings className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Suporte Técnico
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Problemas com acesso, configuração de ambiente (QGIS/R/Python) e requisitos do sistema. Soluções para problemas técnicos comuns.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Instalação e configuração
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Requisitos do sistema
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Troubleshooting
                  </li>
                </ul>
              </div>

              {/* Card 3: Conta e Certificação */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <div className="mb-6">
                  <CreditCard className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Conta e Certificação
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Acesso vitalício, notas fiscais e certificados. Informações sobre pagamento, renovação e documentação.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Acesso vitalício
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Notas fiscais
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Certificados
                  </li>
                </ul>
              </div>

              {/* Card 4: Conteúdo e Metodologia */}
              <div className="group relative p-8 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <div className="mb-6">
                  <GraduationCap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Conteúdo e Metodologia
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                  Dúvidas sobre a metodologia de ensino e aplicação prática dos conceitos. Entenda como os cursos funcionam e seus fundamentos técnicos.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Metodologia de ensino
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Aplicação prática
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    Exercícios e avaliações
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Rápido - Perguntas Frequentes */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Respostas rápidas para as dúvidas mais comuns.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/50"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-semibold text-white pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-slate-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rodapé de Suporte - Still stuck? */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-12 md:p-16 shadow-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="text-center space-y-8">
                <div className="mb-4">
                  <HelpCircle className="w-8 h-8 text-purple-400 mx-auto" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Não encontrou o que procurava?
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Nossa equipe de suporte está pronta para ajudar. Entre em contato e receba uma resposta personalizada em até 48 horas úteis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:contatos@landspace.io"
                    className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-purple-500/50 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Abrir Chamado no Suporte
                  </a>
                  <a
                    href="https://wa.me/5564999082421"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:from-green-400 hover:to-emerald-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:-translate-y-1 hover:scale-110"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </div>
  );
}
