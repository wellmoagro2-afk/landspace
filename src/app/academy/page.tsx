import Link from "next/link";
import Image from "next/image";
import AcademyCourseCard from "@/components/AcademyCourseCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { branding } from "@/lib/branding";
import AcademyPulseWordCloud from "@/components/academy/AcademyPulseWordCloud";
import { 
  Code,
  Layers,
  Brain,
  Zap,
  ArrowRight,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2
} from "lucide-react";
import { ACADEMY_COURSES } from "./data";

// Mapear ícones para strings (para serialização Server -> Client)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Code,
  Brain,
};

// Mapear ACADEMY_COURSES para o formato esperado pelo AcademyCourseCard
// Convertendo icon (componente) para iconName (string) para serialização
const academyCourses = ACADEMY_COURSES.map(course => {
  // Encontrar o nome do ícone comparando com os ícones conhecidos
  const iconName = Object.keys(iconMap).find(
    name => iconMap[name] === course.icon
  ) || 'Layers'; // fallback
  
  return {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    iconName: iconName as 'Layers' | 'Code' | 'Brain',
    capabilities: course.capabilities,
    overview: course.overview,
    methodology: course.methodology,
    audience: course.audience,
  };
});


export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-purple-lg"></div>

      <main className="relative z-10">
        {/* Hero Section - Dark Tech Minimalist */}
        <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden">
          {/* Animated background glows - Discretos */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
            <div className="text-center space-y-6">
              {/* Logo - Ponto Focal Central */}
              <div className="flex justify-center mb-8 animate-fade-in-down">
                <div className="relative w-24 h-24">
                  <Image
                    src="/logo-academy.png"
                    alt="LandSpace Academy Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] animate-pulse-slow"
                    priority
                  />
                  {/* Glow adicional para efeito de flutuação */}
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-2xl -z-10 animate-pulse-slow"></div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgba(255,255,255,0.92)]">
                <span className="text-2xl md:text-3xl text-[rgba(255,255,255,0.46)] font-light">{branding.brandName}</span>{" "}
                {branding.pillars.academy.uiName}
              </h1>
              <h2 className="text-4xl md:text-6xl text-purple-400 leading-tight font-bold max-w-4xl mx-auto">
                Formação em geotecnologias por{" "}
                <span className="whitespace-nowrap">LandSpace.</span>
              </h2>
              
              {/* Frase complementar em branco */}
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-3xl mx-auto">
                Do conhecimento técnico à certificação profissional.
              </h2>

              {/* Ícones de Educação Big Tech */}
              <div className="flex justify-center items-center gap-6 mt-8 flex-wrap">
                <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:-translate-y-1 cursor-default">
                  <GraduationCap className="w-5 h-5 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" />
                  <span className="text-sm font-mono text-purple-300 uppercase tracking-wider transition-all duration-300 group-hover:text-purple-200">Formação</span>
                </div>
                <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:-translate-y-1 cursor-default">
                  <Award className="w-5 h-5 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" />
                  <span className="text-sm font-mono text-purple-300 uppercase tracking-wider transition-all duration-300 group-hover:text-purple-200">Certificação</span>
                </div>
                <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:-translate-y-1 cursor-default">
                  <BookOpen className="w-5 h-5 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" />
                  <span className="text-sm font-mono text-purple-300 uppercase tracking-wider transition-all duration-300 group-hover:text-purple-200">Conhecimento</span>
                </div>
                <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:-translate-y-1 cursor-default">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" />
                  <span className="text-sm font-mono text-purple-300 uppercase tracking-wider transition-all duration-300 group-hover:text-purple-200">Validação</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academy Pulse Word Cloud */}
        <AcademyPulseWordCloud />

        {/* O que é a LandSpace Academy */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
                O que é a {branding.brandName} {branding.pillars.academy.uiName}
              </h2>
              <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                <p>
                  A LandSpace Academy é o ambiente de capacitação técnica da LandSpace, voltado à formação de profissionais capazes de compreender, estruturar e aplicar processos de automação e inteligência geoespacial em contextos reais de análise territorial.
                </p>
                <p>
                  Nossa abordagem prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos da Academy */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Capacitação Técnica Avançada
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Formação especializada em automação e inteligência geoespacial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {academyCourses.slice(0, 6).map((course, idx) => (
                <AcademyCourseCard key={course.slug} course={course} index={idx} />
              ))}
            </div>

            {/* Botão "Ver todos os Cursos" */}
            {academyCourses.length > 6 && (
              <div className="mt-12 text-center">
                <Link
                  href="/academy/cursos"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 hover:from-purple-400 hover:to-purple-500 transition-all duration-300 group"
                >
                  Ver todos os Cursos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Como ensinamos */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Como ensinamos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Card 1: Automação aplicada */}
              <Card className="p-8">
                <div className="mb-6">
                  <Code className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Automação aplicada
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Foco em processos, fluxos e lógica de automação geoespacial.
                </p>
              </Card>

              {/* Card 2: Ferramentas consolidadas */}
              <Card className="p-8">
                <div className="mb-6">
                  <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Ferramentas consolidadas
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  QGIS, ArcGIS Pro e R como base técnica.
                </p>
              </Card>

              {/* Card 3: Pensamento analítico */}
              <Card className="p-8">
                <div className="mb-6">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Pensamento analítico
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Interpretação de métricas, mapas e indicadores.
                </p>
              </Card>

              {/* Card 4: Integração com tecnologia */}
              <Card className="p-8">
                <div className="mb-6">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Integração com tecnologia
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Capacitação alinhada às ferramentas e soluções LandSpace.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Áreas de Capacitação */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
                Áreas de Capacitação
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-2 border-purple-500/30 pl-6 py-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Automação Geoespacial com QGIS
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Processamento automatizado, modelagem de dados e desenvolvimento de workflows geoespaciais.
                  </p>
                </div>

                <div className="border-l-2 border-purple-500/30 pl-6 py-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Inteligência Geoespacial com ArcGIS Pro
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Análise espacial avançada, geoprocessamento e modelagem territorial em ambiente enterprise.
                  </p>
                </div>

                <div className="border-l-2 border-purple-500/30 pl-6 py-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    R para Inteligência Geoespacial
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Programação estatística aplicada à análise espacial, modelagem e automação de processos geoespaciais.
                  </p>
                </div>

                <div className="border-l-2 border-purple-500/30 pl-6 py-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Modelos Espaciais e Indicadores Territoriais
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Desenvolvimento e aplicação de modelos espaciais para análise territorial e suporte à decisão.
                  </p>
                </div>

                <div className="border-l-2 border-purple-500/30 pl-6 py-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Machine Learning aplicado à análise espacial
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Técnicas de aprendizado de máquina para classificação, predição e análise de padrões espaciais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relação com as Ferramentas LandSpace */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-10 md:p-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                  Relação com as Ferramentas LandSpace
                </h2>
                <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                  <p>
                    Os treinamentos da LandSpace Academy não substituem as ferramentas da LandSpace.
                  </p>
                  <p>
                    Eles capacitam o profissional a compreender os conceitos, métodos e lógicas que fundamentam soluções de automação geoespacial robustas e escaláveis.
                  </p>
                  <p className="text-slate-400">
                    A capacitação técnica amplia a capacidade de aplicação e customização das ferramentas, permitindo que profissionais adaptem soluções a contextos específicos e desenvolvam novos processos de automação.
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
                A Academy complementa. A Tech entrega.
              </p>
              <ButtonLink
                href="/catalogo"
                variant="link"
              >
                Conheça as soluções LandSpace
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

