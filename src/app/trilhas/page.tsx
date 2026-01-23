"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";

export default function TrilhasPage() {
  return (
    <div className="min-h-screen bg-white bg-grid-pattern">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Sobre as Trilhas de Aprendizado da LandSpace
              </span>
            </h1>
          </div>
        </section>

        {/* Introdução */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Na LandSpace, os cursos são organizados em trilhas de aprendizado. Cada trilha reúne cursos complementares, estruturados para que o aluno desenvolva conhecimento de forma progressiva, coerente e tecnicamente consistente, do fundamento científico à aplicação prática.
              </p>
              <p>
                Essa organização evita aprendizados fragmentados, reduz erros conceituais e permite que cada aluno compreenda onde está, para onde está indo e qual curso faz sentido em cada etapa da formação. As trilhas foram desenvolvidas com base em anos de experiência acadêmica e prática, garantindo que cada percurso formativo seja cientificamente fundamentado e tecnicamente aplicável.
              </p>
            </div>
          </div>
        </section>

        {/* O que é uma Trilha de Aprendizado */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                O que é uma Trilha de Aprendizado
              </h2>
            </div>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Uma trilha de aprendizado é um percurso formativo estruturado. Cada trilha possui um objetivo claro, uma lógica de progressão entre os cursos e um foco específico, como formação acadêmica, análise ambiental, inovação tecnológica ou aplicação produtiva.
              </p>
              <p>
                Os cursos dentro de uma trilha foram pensados para se complementar, permitindo a construção de um raciocínio geoespacial sólido e cumulativo. A sequência proposta em cada trilha segue uma metodologia pedagógica que garante que conceitos fundamentais sejam estabelecidos antes da introdução de técnicas mais avançadas, criando uma base sólida para o aprendizado progressivo.
              </p>
            </div>
          </div>
        </section>

        {/* Cursos Avulsos e Trilhas */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                Cursos Avulsos e Trilhas
              </h2>
            </div>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Os cursos da LandSpace podem ser realizados de forma avulsa. No entanto, seguir uma trilha é recomendado para quem busca formação consistente, melhor aproveitamento dos conteúdos e maior segurança técnica e científica no uso das geotecnologias.
              </p>
              <p>
                A escolha por trilhas é especialmente indicada para profissionais que desejam construir uma expertise sólida em uma área específica, pesquisadores que precisam de fundamentação metodológica rigorosa e estudantes que buscam uma formação completa e estruturada em geotecnologias.
              </p>
            </div>
          </div>
        </section>

        {/* A Trilha Acadêmica como Base */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                A Trilha Acadêmica como Base
              </h2>
            </div>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                A Trilha Acadêmica LandSpace constitui a base formativa da plataforma. Ela fornece fundamentos conceituais, cartográficos e metodológicos essenciais para o uso rigoroso das geotecnologias em estudos acadêmicos, pesquisas e análises territoriais.
              </p>
              <p>
                Recomenda-se que alunos iniciantes ou pesquisadores iniciem por esta trilha antes de avançar para trilhas técnicas e aplicadas. Os cursos desta trilha estabelecem a base científica necessária para evitar erros metodológicos comuns e garantir que as geotecnologias sejam aplicadas com rigor científico em trabalhos acadêmicos, dissertações e teses.
              </p>
            </div>
          </div>
        </section>

        {/* Trilhas Disponíveis */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                Trilhas Disponíveis
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                  Trilha Acadêmica LandSpace
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Formação científica em geotecnologias para pesquisa, graduação e pós-graduação. Esta trilha estabelece os fundamentos conceituais e metodológicos essenciais para o uso rigoroso das geotecnologias em trabalhos acadêmicos, garantindo que mapas, análises e interpretações sigam padrões científicos adequados.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                  Trilha Ambiental e Territorial
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Análise ambiental aplicada ao planejamento e à gestão do território. Os cursos desta trilha abordam desde a análise de fragilidade ambiental até a modelagem de erosão de solos, fornecendo ferramentas para estudos de impacto, licenciamento e planejamento territorial integrado.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                  Trilha GeoAI e Sensoriamento Avançado
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Automação, inteligência artificial e sensoriamento remoto aplicados ao mapeamento e monitoramento do território. Esta trilha combina técnicas de machine learning com processamento de imagens de satélite, permitindo classificação automatizada de uso e cobertura da terra em diferentes resoluções e sensores.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                  Trilha Hidrologia e Clima
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Geotecnologias aplicadas à análise de processos hidrológicos e climáticos. Inclui modelagem espacial de variáveis climáticas, análise morfométrica de bacias hidrográficas e monitoramento remoto da qualidade da água, fornecendo ferramentas para estudos hidrológicos e ambientais.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                  Trilha Agro, Drones e Produção
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Tecnologias geoespaciais aplicadas ao agronegócio e à produção agrícola. Abrange desde mapeamento aéreo com drones até análises estatísticas e geoestatísticas de dados agrícolas, oferecendo soluções para agricultura de precisão e monitoramento inteligente de irrigação.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bundles e Certificação */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                Bundles e Certificação
              </h2>
            </div>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Algumas trilhas da LandSpace são oferecidas na forma de bundles, reunindo todos os cursos do percurso em um único pacote formativo. Os bundles proporcionam acesso completo a uma trilha específica, com vantagens de preço e organização do aprendizado.
              </p>
              <p>
                No futuro, a conclusão integral de uma trilha poderá dar acesso a um certificado específico por trilha, reconhecendo a formação completa do aluno naquele percurso formativo. Essa certificação validará não apenas o conhecimento técnico, mas também a compreensão metodológica e científica da área de atuação.
              </p>
            </div>
          </div>
        </section>

        {/* Considerações Finais */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                Considerações Finais
              </h2>
            </div>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                As trilhas da LandSpace foram desenvolvidas para respeitar o nível, os objetivos e o tempo do aluno, oferecendo uma experiência de aprendizado estruturada, responsável e tecnicamente sólida.
              </p>
              <p>
                Mais do que ensinar ferramentas, a LandSpace busca formar profissionais capazes de pensar, interpretar e aplicar geotecnologias com qualidade científica e técnica.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Explore nossas trilhas de aprendizado
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Descubra o caminho ideal para sua formação em geotecnologias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="btn-landspace-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#121826] text-white rounded-xl font-semibold text-base shadow-lg hover:bg-slate-900"
              >
                Ver Ferramentas
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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

