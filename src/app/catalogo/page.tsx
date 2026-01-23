"use client";

import { useMemo, useState } from "react";
import { COURSES } from "./data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CourseCard from "@/components/CourseCard";
import { Search, Globe, Brain, Waves, Sprout } from "lucide-react";

export default function CursosPage() {
  // Organização por categorias de soluções (marketplace de ferramentas)
  const solucoesAmbientais = [
    "transicao-uso-cobertura",
    "potencial-uso-conservacionista",
    "estudo-fragilidade-ambiental",
    "analise-vulnerabilidade-riscos-ambientais",
    "modelagem-perda-solos-rusle",
    "analise-ambiental-integrada-geossistemas",
    "geotecnologias-estudo-mudancas-climaticas",
  ];

  const solucoesGeoAI = [
    "geoai-classificacao-uso-solo-sentinel-2",
    "geoai-monitoramento-historico-landsat",
    "geoai-alta-resolucao-cbers-4a",
    "geoai-mapeamento-radar-sentinel-1",
  ];

  const solucoesHidrologia = [
    "modelagem-espacializacao-climatica",
    "morfometria-bacias-hidrograficas",
    "monitoramento-remoto-qualidade-agua",
  ];

  const solucoesAgro = [
    "mapeamento-aereo-drones-vant",
    "monitoramento-inteligente-irrigacao",
    "estatistica-geoestatistica-agricola",
  ];


  // Criar um mapa de cursos por slug para acesso rápido
  const coursesMap = useMemo(() => {
    const map = new Map();
    COURSES.forEach(course => {
      map.set(course.slug, course);
    });
    return map;
  }, []);

  // Organizar cursos por categorias de soluções
  const coursesByCategory = useMemo(() => {
    const getCoursesBySlugs = (slugs: string[]) => {
      return slugs.map(slug => coursesMap.get(slug)).filter(Boolean) as typeof COURSES;
    };

    return {
      ambientais: getCoursesBySlugs(solucoesAmbientais),
      geoai: getCoursesBySlugs(solucoesGeoAI),
      hidrologia: getCoursesBySlugs(solucoesHidrologia),
      agro: getCoursesBySlugs(solucoesAgro),
    };
  }, [coursesMap]);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#02040a] relative">
      {/* Engineering Grid Pattern - Dark Mode */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>
      
      <Header variant="tech" />

      <main className="relative z-10">
        {/* Hero Section - Catálogo */}
        <section className="relative py-24 bg-[#02040a] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Explore nosso Ecossistema de Ferramentas
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Navegue pelas categorias de soluções e encontre a ferramenta de automação ideal para o seu projeto.
              </p>
            </div>
            
            {/* Barra de Pesquisa */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por ferramenta ou tema..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cursos Grid */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Soluções Ambientais e Territoriais */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <Globe className="w-8 h-8 text-emerald-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Soluções em Análise Ambiental e Territorial
                </h2>
              </div>
              <p className="text-lg text-slate-400 mb-8">
                Automação para licenciamento, análise de fragilidade e planejamento do uso do solo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {coursesByCategory.ambientais.map((course, index) => (
                  <CourseCard key={course.slug} course={course} index={index} />
                ))}
              </div>
            </div>

            {/* GeoAI & Intelligence */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <Brain className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  GeoAI & Intelligence
                </h2>
              </div>
              <p className="text-lg text-slate-400 mb-8">
                Machine Learning, Deep Learning e processamento de imagens de satélite em escala.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {coursesByCategory.geoai.map((course, index) => (
                  <CourseCard key={course.slug} course={course} index={index} />
                ))}
              </div>
            </div>

            {/* Hidrologia e Clima */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <Waves className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Hidrologia e Clima
                </h2>
              </div>
              <p className="text-lg text-slate-400 mb-8">
                Ferramentas para modelagem de bacias, qualidade da água e dados climáticos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {coursesByCategory.hidrologia.map((course, index) => (
                  <CourseCard key={course.slug} course={course} index={index} />
                ))}
              </div>
            </div>

            {/* Agronegócio e Drones */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <Sprout className="w-8 h-8 text-emerald-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Agronegócio e Drones
                </h2>
              </div>
              <p className="text-lg text-slate-400 mb-8">
                Tecnologia para agricultura de precisão, monitoramento de safras e fotogrametria.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {coursesByCategory.agro.map((course, index) => (
                  <CourseCard key={course.slug} course={course} index={index} />
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer variant="tech" hideCTA={true} />
      <WhatsAppButton />
    </div>
  );
}
