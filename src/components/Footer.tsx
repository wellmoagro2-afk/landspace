"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin, Lock, ArrowRight, Shield, ShieldCheck } from "lucide-react";
import { branding } from "@/lib/branding";

// Ícone X (Twitter) como SVG inline
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type FooterVariant = 'global' | 'tech' | 'studio' | 'strategy' | 'academy' | 'labs';

interface FooterProps {
  variant?: FooterVariant;
  hideCTA?: boolean; // Esconde o banner de CTA quando true
}

// Banner de CTA antes do Footer
function FooterCTABanner({ variant = 'global' }: { variant: FooterVariant }) {
  const ctaConfig = {
    global: {
      title: 'Transforme dados em inteligência geoespacial',
      description: 'Explore nosso ecossistema completo de soluções',
      buttonText: 'Explorar Ferramentas',
      buttonHref: '/tech',
      gradient: 'from-cyan-500/10 via-blue-500/10 to-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      buttonGradient: 'from-cyan-500 to-blue-600',
      buttonHover: 'hover:from-cyan-400 hover:to-blue-500',
      buttonShadow: 'hover:shadow-cyan-500/50',
      textColor: 'text-cyan-400',
    },
    tech: {
      title: 'Automatize com a LandSpace',
      description: 'Ferramentas prontas para acelerar sua operação geoespacial',
      buttonText: 'Ver Catálogo',
      buttonHref: '/catalogo',
      gradient: 'from-cyan-500/10 via-blue-500/10 to-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      buttonGradient: 'from-cyan-500 to-blue-600',
      buttonHover: 'hover:from-cyan-400 hover:to-blue-500',
      buttonShadow: 'hover:shadow-cyan-500/50',
      textColor: 'text-cyan-400',
    },
    studio: {
      title: 'Solicite orçamento para seu projeto',
      description: 'Mapas, modelos e relatórios prontos para decisão pública, ambiental e agro',
      buttonText: 'Solicitar orçamento',
      buttonHref: '/studio/orcamento',
      gradient: 'from-indigo-500/10 via-indigo-600/10 to-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      buttonGradient: 'from-indigo-500 to-indigo-600',
      buttonHover: 'hover:from-indigo-400 hover:to-indigo-500',
      buttonShadow: 'hover:shadow-indigo-500/50',
      textColor: 'text-indigo-400',
    },
    strategy: {
      title: 'Receba atualizações',
      description: '1 e-mail por semana. Sem spam. Curadoria de briefings, mapas e podcast.',
      buttonText: 'Receber atualizações',
      buttonHref: '/strategy#newsletter',
      gradient: 'from-[#00B86B]/5 via-transparent to-[#00B86B]/5',
      borderColor: 'border-[rgba(0,184,107,0.2)]',
      buttonGradient: 'from-[#00B86B] to-[#00A85F]',
      buttonHover: 'hover:from-[#00A85F] hover:to-[#00B86B]',
      buttonShadow: 'hover:shadow-[#00B86B]/50',
      textColor: 'text-[#00B86B]',
    },
    academy: {
      title: `Capacite-se com a ${branding.brandName} ${branding.pillars.academy.uiName}`,
      description: 'Cursos técnicos e certificações profissionais em geotecnologias',
      buttonText: 'Ver Cursos',
      buttonHref: '/academy/cursos',
      gradient: 'from-purple-500/10 via-purple-600/10 to-purple-500/10',
      borderColor: 'border-purple-500/20',
      buttonGradient: 'from-purple-500 to-purple-600',
      buttonHover: 'hover:from-purple-400 hover:to-purple-500',
      buttonShadow: 'hover:shadow-purple-500/50',
      textColor: 'text-purple-400',
    },
    labs: {
      title: 'Explore Pesquisa e Validação',
      description: 'Benchmarks, protocolos e repositórios de dados para pesquisa geoespacial',
      buttonText: 'Explorar Labs',
      buttonHref: '/labs#benchmarks',
      gradient: 'from-amber-500/10 via-amber-600/10 to-amber-500/10',
      borderColor: 'border-amber-500/20',
      buttonGradient: 'from-amber-500 to-amber-600',
      buttonHover: 'hover:from-amber-400 hover:to-amber-500',
      buttonShadow: 'hover:shadow-amber-500/50',
      textColor: 'text-amber-400',
    },
  };

  const config = ctaConfig[variant];

  // Para Strategy, usar visual Big Tech (sem verde chapado)
  if (variant === 'strategy') {
    return (
      <section className="relative py-16 bg-[#05070C] overflow-hidden">
        {/* Glow verde sutil nas bordas */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00B86B]/5 via-transparent to-[#00B86B]/5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B86B]/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B86B]/30 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-[rgba(255,255,255,0.92)]">
              {config.title}
            </h3>
            <p className="text-lg text-[rgba(255,255,255,0.66)] max-w-2xl mx-auto">
              {config.description}
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href={config.buttonHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B86B] text-white rounded-xl font-semibold text-base shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00B86B]/50 focus:ring-offset-2 focus:ring-offset-[#05070C]"
              >
                {config.buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative py-16 bg-gradient-to-r ${config.gradient} border-t ${config.borderColor} border-b ${config.borderColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {config.title}
          </h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {config.description}
          </p>
          <div className="flex justify-center pt-2">
            <Link
              href={config.buttonHref}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${config.buttonGradient} text-white rounded-xl font-semibold text-base shadow-lg ${config.buttonShadow} ${config.buttonHover} transition-all duration-300 hover:scale-105`}
            >
              {config.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer({ variant = 'global', hideCTA = false }: FooterProps) {
  // Configurações de cores por variante
  const colorConfig = {
    global: {
      hoverColor: 'hover:text-[#9fb7c9]',
      glowColor: 'group-hover:text-[#9fb7c9]',
      glowShadow: 'group-hover:drop-shadow-[0_0_8px_rgba(159,183,201,0.6)]',
      borderColor: 'border-white/10',
      linkColor: 'text-slate-400',
    },
    tech: {
      hoverColor: 'hover:text-cyan-400',
      glowColor: 'group-hover:text-cyan-400',
      glowShadow: 'group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]',
      borderColor: 'border-cyan-500/20',
      linkColor: 'text-slate-400',
    },
    studio: {
      hoverColor: 'hover:text-indigo-400',
      glowColor: 'group-hover:text-indigo-400',
      glowShadow: 'group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]',
      borderColor: 'border-indigo-500/20',
      linkColor: 'text-slate-400',
    },
    strategy: {
      hoverColor: 'hover:text-emerald-400',
      glowColor: 'group-hover:text-emerald-400',
      glowShadow: 'group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]',
      borderColor: 'border-emerald-500/20',
      linkColor: 'text-slate-400',
    },
    academy: {
      hoverColor: 'hover:text-purple-300',
      glowColor: 'group-hover:text-purple-300',
      glowShadow: 'group-hover:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]',
      borderColor: 'border-purple-500/20',
      linkColor: 'text-slate-300',
    },
    labs: {
      hoverColor: 'hover:text-amber-400',
      glowColor: 'group-hover:text-amber-400',
      glowShadow: 'group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
      borderColor: 'border-amber-500/20',
      linkColor: 'text-slate-400',
    },
  };

  const colors = colorConfig[variant];

  return (
    <>
      {/* Banner de CTA */}
      {!hideCTA && <FooterCTABanner variant={variant} />}

      {/* Seção de Compromisso Social - Big Tech Style */}
      <section className="bg-slate-950/80 backdrop-blur-sm border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-mono text-slate-300 uppercase tracking-wider mb-3">
              // COMPROMISSO SOCIAL
            </p>
            <p className="text-sm font-mono text-white/70 leading-relaxed max-w-3xl mx-auto">
              LandSpace orgulhosamente apoia as iniciativas da <span className="font-semibold text-white/90">UNICEF Brasil</span> (Ref: S0683692BCO) e do <span className="font-semibold text-white/90">Hospital do Câncer - Rio Verde</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Principal */}
      <footer className={`bg-[#02040a]/95 backdrop-blur-sm text-white border-t ${colors.borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Redes Sociais - Ícones Soltos */}
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://facebook.com/landspaceio"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 ease-in-out"
              aria-label="Facebook"
            >
              <Facebook className={`w-5 h-5 text-slate-300 ${colors.glowColor} ${colors.glowShadow} transition-all duration-300 ease-in-out`} />
            </a>
            <a
              href="https://www.instagram.com/landspace.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 ease-in-out"
              aria-label="Instagram"
            >
              <Instagram className={`w-5 h-5 text-slate-300 ${colors.glowColor} ${colors.glowShadow} transition-all duration-300 ease-in-out`} />
            </a>
            <a
              href="https://www.youtube.com/@LandSpaceio"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 ease-in-out"
              aria-label="YouTube"
            >
              <Youtube className={`w-5 h-5 text-slate-300 ${colors.glowColor} ${colors.glowShadow} transition-all duration-300 ease-in-out`} />
            </a>
            <a
              href="https://www.linkedin.com/company/landspace-inteligencia-geoespacial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 ease-in-out"
              aria-label="LinkedIn"
            >
              <Linkedin className={`w-5 h-5 text-slate-300 ${colors.glowColor} ${colors.glowShadow} transition-all duration-300 ease-in-out`} />
            </a>
            {/* Ícone X (Twitter) - apenas em páginas Strategy */}
            {variant === 'strategy' && (
              <a
                href="https://x.com/landspaceio"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 ease-in-out"
                aria-label="X"
              >
                <XIcon className={`w-5 h-5 text-slate-300 ${colors.glowColor} ${colors.glowShadow} transition-all duration-300 ease-in-out`} />
              </a>
            )}
          </div>

          {/* Colunas de Tecnologias - 6 Colunas */}
          <div className="mb-12">
            <div className={`border-t ${colors.borderColor} pt-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-4">
                {/* Coluna 1: SIG, NUVEM E GÊMEOS DIGITAIS */}
                <div className="text-center lg:text-left">
                  <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-[0.1em]">
                    SIG, NUVEM E GÊMEOS DIGITAIS
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <span className="text-slate-500">QGIS</span>
                    </li>
                    <li>
                      <span className="text-slate-500">ArcGIS</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Google Earth Engine</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Gêmeos Digitais</span>
                    </li>
                  </ul>
                </div>

                {/* Coluna 2: LINGUAGENS E DESENVOLVIMENTO */}
                <div className="text-center lg:text-left">
                  <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-[0.1em]">
                    LINGUAGENS E DESENVOLVIMENTO
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <span className="text-slate-500">Python</span>
                    </li>
                    <li>
                      <span className="text-slate-500">R</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Cursor AI</span>
                    </li>
                    <li>
                      <span className="text-slate-500">PostGIS / SQL</span>
                    </li>
                  </ul>
                </div>

                {/* Coluna 3: GEOAI E DEEPGEO */}
                <div className="text-center lg:text-left">
                  <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-[0.1em]">
                    GEOAI E<br />DEEPGEO
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <span className="text-slate-500">Machine Learning</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Deep Learning</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Computer Vision</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Random Forest</span>
                    </li>
                  </ul>
                </div>

                {/* Coluna 4: SENSORIAMENTO E RADAR */}
                <div className="text-center lg:text-left">
                  <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-[0.1em]">
                    SENSORIAMENTO E<br />RADAR
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <span className="text-slate-500">SNAP</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Landsat</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Sentinel</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Radar SAR</span>
                    </li>
                  </ul>
                </div>

                {/* Coluna 5: DRONES E GEODÉSIA */}
                <div className="text-center lg:text-left">
                  <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-[0.1em]">
                    DRONES E<br />GEODÉSIA
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <span className="text-slate-500">Drones</span>
                    </li>
                    <li>
                      <span className="text-slate-500">WebODM</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Metashape</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Fotogrametria</span>
                    </li>
                  </ul>
                </div>

                {/* Coluna 6: MODELAGEM AVANÇADA */}
                <div className="text-center lg:text-left">
                  <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-[0.1em]">
                    MODELAGEM<br />AVANÇADA
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    <li>
                      <span className="text-slate-500">Hidrologia (SWAT)</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Agroecossistemas</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Climatologia</span>
                    </li>
                    <li>
                      <span className="text-slate-500">Geossistemas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Linha Divisória - Separação entre Tech Stack e Links de Navegação */}
          <div className={`border-t ${colors.borderColor} mb-8`}></div>

          {/* Footer Menu - Grid Layout (4 colunas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Soluções */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Soluções</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/catalogo" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {variant === 'tech' ? 'Catálogo de Ferramentas' : 'Catálogo de Ferramentas (LS Tech)'}
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    Roadmap da Plataforma
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {variant === 'tech' ? 'Ferramentas Gratuitas' : 'Ferramentas Gratuitas (LS Tech)'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* LandSpace para Empresas e Governo */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Para Empresas e Governo</h3>
              <ul className="space-y-2">
                <li>
                  {variant === 'strategy' ? (
                    <Link href="/corporativo" className={`${colors.linkColor} ${colors.hoverColor} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                      Inteligência Corporativa
                    </Link>
                  ) : (
                    <Link href="/corporativo" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                      Soluções para Equipes{(variant === 'global' || variant === 'academy') ? ' (LS Tech)' : ''}
                    </Link>
                  )}
                </li>
                <li>
                  {variant === 'strategy' ? (
                    <Link href="/strategy/consultancy" className={`${colors.linkColor} hover:text-[#00B86B] hover:translate-x-1 inline-flex items-center gap-1.5 text-sm transition-all duration-300 ease-in-out group`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Consultoria Estratégica
                    </Link>
                  ) : (
                    <Link href="/consultoria" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                      Consultoria Personalizada{(variant === 'global' || variant === 'academy') ? ' (LS Tech)' : ''}
                    </Link>
                  )}
                </li>
                <li>
                  {variant === 'strategy' ? (
                    <Link href="/parcerias" className={`${colors.linkColor} ${colors.hoverColor} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                      Cooperação Técnica
                    </Link>
                  ) : (
                    <Link href="/parcerias" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                      Parcerias Estratégicas{(variant === 'global' || variant === 'academy') ? ' (LS Tech)' : ''}
                    </Link>
                  )}
                </li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tech" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {branding.pillars.tech.seoName}
                  </Link>
                </li>
                <li>
                  <Link href="/studio" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {branding.pillars.studio.seoName}
                  </Link>
                </li>
                <li>
                  <Link href="/strategy" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {branding.pillars.strategy.seoName}
                  </Link>
                </li>
                <li>
                  <Link href="/academy" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {branding.pillars.academy.seoName}
                  </Link>
                </li>
                <li>
                  <Link href="/labs" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    {branding.pillars.labs.seoName}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/sobre-o-instrutor" className={`${colors.linkColor} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}>
                    Liderança Técnica
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/contato?variant=${variant}`}
                    className={`${colors.linkColor} ${variant === 'strategy' ? 'hover:text-[#00B86B]' : colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-1 inline-block text-sm transition-all duration-300 ease-in-out group`}
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright e Links Jurídicos */}
          <div className={`border-t ${colors.borderColor} pt-6`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-white/60 text-center md:text-left">
                Copyright © {new Date().getFullYear()} LandSpace • Todos os direitos reservados.
              </div>
              {/* Linha de Links Legais */}
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-xs">
                <Link href="/privacidade" className={`${variant === 'academy' ? colors.linkColor : 'text-white/60'} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-0.5 transition-all duration-300 ease-in-out group`}>
                  Política de Privacidade
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/termos" className={`${variant === 'academy' ? colors.linkColor : 'text-white/60'} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-0.5 transition-all duration-300 ease-in-out group`}>
                  Termos de Uso
                </Link>
                <span className="text-white/30">|</span>
                <Link href="/cookies" className={`${variant === 'academy' ? colors.linkColor : 'text-white/60'} ${colors.hoverColor} ${variant === 'academy' ? colors.glowShadow : ''} hover:translate-x-0.5 transition-all duration-300 ease-in-out group`}>
                  Política de Cookies
                </Link>
                <span className="text-white/30">|</span>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  <span>Site protegido por SSL & Cloudflare</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-xs text-white/60 mt-4">
              Desenvolvido por Wellmo Alves
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
