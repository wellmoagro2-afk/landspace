"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { branding } from "@/lib/branding";
import { defaultDeliverables, defaultFAQ } from "./studio.data";
import StudioPulseWordCloud from "@/components/studio/StudioPulseWordCloud";
import { periciaCards } from "./_data/periciaAval";
import {
  FileText,
  Database,
  CheckCircle2,
  ArrowRight,
  Layers,
  ChevronDown,
  Sparkles,
  Leaf,
  Mountain,
  Droplets,
  TreePine,
  Camera,
  Map,
  Cloud,
  TrendingUp,
  Shield,
  AlertTriangle,
  FileCheck,
  Activity,
  Waves,
  Ruler,
  FileSearch,
  Scale,
  MapPin,
  User,
} from "lucide-react";

// Serviços reorganizados: PUC e RUSLE integrados como metodologias (15 serviços principais)
const serviceCards = [
  {
    id: 'urbano',
    title: 'Planejamento Urbano e Plano Diretor',
    description: 'Diagnóstico territorial, mapas normativos e sínteses para Plano Diretor, zoneamento urbano, expansão e requalificação.',
    icon: Map,
    accentColor: 'green',
    route: '/studio/urbano-plano-diretor',
    bullets: [
      'Limites, bairros/distritos, malha urbana',
      'Sistema viário e centralidades',
      'Uso e ocupação do solo',
      'Conflitos de uso e riscos',
      'Diretrizes de expansão/adensamento'
    ],
  },
  {
    id: 'zee',
    title: 'ZEE e Ordenamento Territorial',
    description: 'Integra meio físico, biótico e socioeconômico para construir potencialidades, vulnerabilidades e diretrizes por zona. Inclui PUC quando aplicável.',
    icon: Layers,
    accentColor: 'indigo',
    route: '/studio/zee-ordenamento',
    bullets: [
      'Meio físico (relevo/solos/geologia)',
      'Meio biótico (cobertura vegetal, fragmentação)',
      'Socioeconômico (infraestrutura, pressões)',
      'Potencial de uso conservacionista (PUC)',
      'Mapa final de zonas e diretrizes'
    ],
  },
  {
    id: 'bacias',
    title: 'Bacias Hidrográficas e Conservação',
    description: 'Delimitação, indicadores físico-hidrológicos, modelagem de erosão (RUSLE) e priorização conservacionista (PUC) para planejamento territorial e gestão de bacias.',
    icon: Mountain,
    accentColor: 'amber',
    route: '/studio/bacias-hidrograficas',
    bullets: [
      'Delimitação de bacia/sub-bacias',
      'Indicadores físico-hidrológicos',
      'Modelagem de erosão (RUSLE)',
      'Potencial de uso conservacionista (PUC)',
      'Hotspots e priorização de intervenções'
    ],
  },
  {
    id: 'riscos',
    title: 'Riscos Climáticos e Agroclima',
    description: 'Variabilidade, extremos e indicadores (seca/veranicos/chuva intensa) para apoiar planejamento agrícola, defesa civil e gestão ambiental.',
    icon: Cloud,
    accentColor: 'cyan',
    route: '/studio/riscos-climaticos',
    bullets: [
      'Variabilidade/anomalias de precipitação',
      'Índices de seca (SPI/SPEI)',
      'Indicadores de veranicos/estiagens',
      'Síntese de exposição',
      'Cenários e vulnerabilidade'
    ],
  },
  {
    id: 'aptidao',
    title: 'Aptidão Agrícola (integrada)',
    description: 'Integra clima, solo e relevo para classificar aptidão por cultura e manejo, com recomendações e limitações explicitadas.',
    icon: Droplets,
    accentColor: 'lime',
    route: '/studio/aptidao-agricola-agroclima',
    bullets: [
      'Aptidão climática por cultura',
      'Balanço hídrico',
      'Aptidão agrícola integrada',
      'Janelas de plantio',
      'Cenários (irrigado × sequeiro)'
    ],
  },
  {
    id: 'precisao',
    title: 'Agricultura de precisão (zonas de manejo e VRA)',
    description: 'Produtividade, variabilidade espacial e recomendações operacionais com mapas compatíveis com seu fluxo (GIS e equipamentos).',
    icon: Leaf,
    accentColor: 'green',
    route: '/studio/agricultura-precisao',
    bullets: [
      'Zonas de manejo',
      'Produtividade e estabilidade temporal',
      'Plano de amostragem',
      'Prescrição (VRA)',
      'Mapas operacionais'
    ],
  },
  {
    id: 'florestal',
    title: 'Análise Florestal e Conectividade da Paisagem',
    description: 'Fragmentação, conectividade, corredores ecológicos e priorização de restauração para planejamento florestal e gestão ambiental.',
    icon: TreePine,
    accentColor: 'emerald',
    route: '/studio/florestal-restauracao',
    bullets: [
      'Cobertura vegetal e fragmentação',
      'Conectividade (indicadores)',
      'Priorização de restauração',
      'Corredores ecológicos',
      'Cenários alternativos'
    ],
  },
  {
    id: 'drone',
    title: 'Drone e fotogrametria',
    description: 'Ortofoto, MDT/MDS e derivados para urbano e agro — com base pronta para GIS/CAD conforme escopo.',
    icon: Camera,
    accentColor: 'purple',
    route: '/studio/drone-fotogrametria',
    bullets: [
      'Ortofoto georreferenciada',
      'MDS/MDT',
      'Derivados (declividade, drenagem)',
      'Volumetria',
      'Acompanhamento temporal'
    ],
    highTicket: true,
  },
  {
    id: 'lulc',
    title: 'Monitoramento e Mudanças de Uso e Cobertura do Solo (LULC)',
    description: 'Classificação temporal, análise de transições e detecção de mudanças para monitoramento ambiental, licenciamento e planejamento territorial.',
    icon: TrendingUp,
    accentColor: 'emerald',
    route: '/studio/monitoramento-lulc',
    bullets: [
      'Classificação de uso e cobertura (múltiplas datas)',
      'Análise de transições temporais',
      'Detecção de desmatamento/expansão urbana',
      'Taxas de mudança e projeções',
      'Mapas de mudança e matriz de transição'
    ],
  },
  {
    id: 'zoneamento-ambiental',
    title: 'Mapeamento de APP, RL e Áreas Protegidas',
    description: 'Mapeamento de Áreas de Preservação Permanente (APP), Reserva Legal e áreas protegidas para CAR, licenciamento e regularização ambiental com integração de conflitos de uso.',
    icon: Shield,
    accentColor: 'green',
    route: '/studio/zoneamento-ambiental',
    bullets: [
      'Mapeamento de APP (rios, nascentes, topos)',
      'Reserva Legal e áreas de preservação',
      'Integração com CAR',
      'Conflitos de uso em áreas protegidas',
      'Diretrizes de regularização'
    ],
  },
  {
    id: 'fragilidade',
    title: 'Análise de Fragilidade Ambiental',
    description: 'Avaliação de fragilidade do meio físico (relevo, solo, geologia) para planejamento territorial e gestão ambiental com diretrizes de uso compatível.',
    icon: AlertTriangle,
    accentColor: 'amber',
    route: '/studio/fragilidade-ambiental',
    bullets: [
      'Fragilidade do meio físico',
      'Fragilidade potencial vs. emergente',
      'Integração com uso do solo',
      'Diretrizes de uso compatível',
      'Mapas de fragilidade e restrições'
    ],
  },
  {
    id: 'eia-rima',
    title: 'Suporte Cartográfico para EIA-RIMA/AIA',
    description: 'Base cartográfica completa e análises ambientais integradas para estudos de impacto ambiental, licenciamento e planejamento de empreendimentos.',
    icon: FileCheck,
    accentColor: 'indigo',
    route: '/studio/eia-rima',
    bullets: [
      'Base cartográfica para EIA-RIMA',
      'Mapas de área de influência',
      'Análises ambientais integradas',
      'Mapas temáticos (físico, biótico, socioeconômico)',
      'Síntese cartográfica para relatórios'
    ],
  },
  {
    id: 'deslizamentos',
    title: 'Riscos Geológicos e Suscetibilidade a Deslizamentos',
    description: 'Mapeamento de suscetibilidade a deslizamentos e riscos geológicos (erosão, solapamento) para planejamento urbano, defesa civil e gestão de riscos.',
    icon: Activity,
    accentColor: 'amber',
    route: '/studio/riscos-geologicos',
    bullets: [
      'Susceptibilidade a deslizamentos',
      'Riscos geológicos (erosão, solapamento)',
      'Integração com uso do solo e ocupação',
      'Mapeamento de áreas de risco',
      'Diretrizes de ocupação segura'
    ],
  },
  {
    id: 'areas-degradadas',
    title: 'Áreas Degradadas e Priorização de Recuperação',
    description: 'Identificação de áreas degradadas e priorização para recuperação ambiental usando análise multicritério, integração com conectividade e cenários de recuperação.',
    icon: TreePine,
    accentColor: 'emerald',
    route: '/studio/areas-degradadas',
    bullets: [
      'Identificação de áreas degradadas',
      'Priorização para recuperação (multicritério)',
      'Integração com conectividade e fragmentação',
      'Cenários de recuperação',
      'Diretrizes de intervenção'
    ],
  },
  {
    id: 'recursos-hidricos',
    title: 'Recursos Hídricos: Qualidade e Disponibilidade',
    description: 'Análise espacializada de disponibilidade hídrica, qualidade de água e balanço hídrico para gestão de recursos hídricos, outorgas e planejamento hídrico.',
    icon: Waves,
    accentColor: 'cyan',
    route: '/studio/recursos-hidricos',
    bullets: [
      'Disponibilidade hídrica superficial e subterrânea',
      'Qualidade de água (indicadores espaciais)',
      'Balanço hídrico espacializado',
      'Vulnerabilidade de aquíferos',
      'Diretrizes de gestão hídrica'
    ],
  },
  {
    id: 'car',
    title: 'Cadastro Ambiental Rural (CAR)',
    description: 'Elaboração e validação de Cadastro Ambiental Rural com mapeamento de APP, Reserva Legal, áreas de uso restrito e integração com bases oficiais do SICAR.',
    icon: FileText,
    accentColor: 'emerald',
    route: '/studio/car',
    bullets: [
      'Mapeamento de APP e Reserva Legal',
      'Delimitação de áreas de uso restrito',
      'Integração com bases do SICAR',
      'Validação e correção de CAR existente',
      'Documentação técnica para regularização'
    ],
  },
  {
    id: 'georreferenciamento',
    title: 'Georreferenciamento de Imóveis Rurais',
    description: 'Georreferenciamento de imóveis rurais conforme INCRA, com memorial descritivo, coordenadas geodésicas e documentação técnica para regularização fundiária.',
    icon: Ruler,
    accentColor: 'amber',
    route: '/studio/georreferenciamento',
    bullets: [
      'Georreferenciamento conforme INCRA',
      'Memorial descritivo georreferenciado',
      'Coordenadas geodésicas certificadas',
      'Integração com bases cadastrais',
      'Documentação para regularização fundiária'
    ],
  },
];

export default function StudioPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-indigo-lg"></div>

      <Header variant="studio" />

      <main className="relative z-10">
        {/* (1) HERO */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#02040a]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgba(255,255,255,0.92)]">
                <span className="inline-flex items-baseline gap-2 font-mono uppercase tracking-wider">
                  <span className="text-2xl md:text-3xl text-[rgba(255,255,255,0.46)] font-light">LandSpace</span>
                  <span className="text-4xl md:text-5xl lg:text-6xl text-indigo-400 font-bold">Studio</span>
                </span>
              </h1>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Cartografia técnica para
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                decisão pública, ambiental e agro
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Mapas, modelos e relatórios prontos para planejamento territorial, gestão ambiental, bacias hidrográficas e agricultura de precisão — com base geoespacial organizada e padrão de qualidade auditável.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ButtonLink
                href="/studio/orcamento"
                variant="primary"
                size="lg"
                accentColor="indigo"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
              >
                Solicitar orçamento
                <ArrowRight className="w-5 h-5" />
              </ButtonLink>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900/50 border border-indigo-500/30 text-indigo-400 rounded-xl font-semibold text-base hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300"
              >
                Ver serviços
              </a>
            </div>
          </div>
        </section>

        {/* Pulse Word Cloud */}
        <StudioPulseWordCloud />

        {/* (2) O QUE VOCÊ RECEBE */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="O que você recebe"
              subtitle="Entregáveis padronizados com base geoespacial organizada e metodologia transparente"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultDeliverables.map((item, idx) => {
                const icons = [FileText, Database, Layers, CheckCircle2, Sparkles];
                const Icon = icons[idx] || FileText;
                return (
                  <Card key={idx} className="p-6" glass hover>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <Icon className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm leading-relaxed">{item}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* (3) SOLUÇÕES POR OBJETIVO (Grid dos 15 serviços principais - PUC e RUSLE integrados como metodologias) */}
        <section id="servicos" className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Soluções por objetivo"
              subtitle="Quinze linhas de serviço cartográfico padronizado para diferentes objetivos decisórios"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCards.slice(0, 6).map((service) => {
                const ServiceIcon = service.icon;
                const accentColor = service.accentColor;
                
                return (
                  <Card key={service.id} className="p-6 relative overflow-hidden flex flex-col" glass hover>
                    {/* Micro-accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${
                      accentColor === 'green' ? 'bg-green-500/50' :
                      accentColor === 'amber' ? 'bg-amber-500/50' :
                      accentColor === 'emerald' ? 'bg-emerald-500/50' :
                      accentColor === 'cyan' ? 'bg-cyan-500/50' :
                      accentColor === 'lime' ? 'bg-lime-500/50' :
                      'bg-purple-500/50'
                    }`}></div>
                    
                    <div className="flex flex-col flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <ServiceIcon className={`w-5 h-5 ${
                              accentColor === 'green' ? 'text-green-400' :
                              accentColor === 'amber' ? 'text-amber-400' :
                              accentColor === 'emerald' ? 'text-emerald-400' :
                              accentColor === 'cyan' ? 'text-cyan-400' :
                              accentColor === 'lime' ? 'text-lime-400' :
                              'text-purple-400'
                            }`} />
                            <h3 className="text-xl font-bold text-white">{service.title}</h3>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {service.highTicket && (
                          <Badge variant="accent" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            High-Ticket
                          </Badge>
                        )}
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2 flex-1">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-indigo-400 mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Actions - sempre no final */}
                      <div className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-auto">
                        <ButtonLink
                          href={`/studio/orcamento?service=${service.id}`}
                          variant="primary"
                          size="md"
                          accentColor="indigo"
                          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                        >
                          SOLICITAR PROTOCOLO DE PROJETO
                        </ButtonLink>
                        <Link
                          href={service.route}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-indigo-500/30 text-indigo-400 rounded-xl font-semibold text-sm hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 text-center"
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Botão Ver Todos */}
            <div className="flex justify-center mt-12">
              <ButtonLink
                href="/studio/todos-servicos"
                variant="secondary"
                size="lg"
                accentColor="indigo"
                className="px-8 py-3"
              >
                Ver Todos os Serviços
                <ArrowRight className="w-5 h-5 ml-2" />
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* PERÍCIA & AVALIAÇÃO (HIGH-TICKET) */}
        <section className="py-24 bg-[#02040a] relative border-t border-indigo-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Perícia & Avaliação (High-Ticket)"
              subtitle="Serviços especializados com rigor técnico e rastreabilidade completa para processos judiciais, administrativos e privados"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {periciaCards.map((service) => {
                const iconMap: Record<string, any> = {
                  'FileSearch': FileSearch,
                  'Scale': Scale,
                  'MapPin': MapPin,
                };
                const ServiceIcon = iconMap[service.icon] || FileSearch;
                
                return (
                  <Card key={service.id} className="p-6 relative overflow-hidden flex flex-col" glass hover>
                    {/* Micro-accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500/50" />

                    <div className="flex flex-col h-full">
                      {/* Icon + Title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                          <ServiceIcon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2 flex-1 mb-4">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-indigo-400 mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-auto">
                        <ButtonLink
                          href={`/studio/protocolo-pericial?service=${service.id}`}
                          variant="primary"
                          size="md"
                          accentColor="indigo"
                          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                        >
                          SOLICITAR PROTOCOLO
                        </ButtonLink>
                        <Link
                          href={service.route}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-indigo-500/30 text-indigo-400 rounded-xl font-semibold text-sm hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 text-center"
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* (4) PACOTES E NÍVEIS */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Pacotes e Níveis"
              subtitle="Escolha o pacote pelo objetivo: Essencial para diagnóstico rápido, Profissional para modelagem e priorização, Premium para diretrizes e cenários"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { level: 'Essencial', maps: '6–12 mapas', report: '2–5 páginas', deadline: '10–20 dias úteis', revisions: '2 revisões', color: 'slate' },
                { level: 'Profissional', maps: '12–20 mapas + sínteses', report: '4–10 páginas', deadline: '20–45 dias úteis', revisions: '2 revisões', color: 'indigo' },
                { level: 'Premium', maps: '20+ mapas + cenários', report: '8–15 páginas', deadline: '30–90 dias úteis', revisions: '2 revisões (extras opcionais)', color: 'indigo' },
              ].map((pkg) => (
                <Card key={pkg.level} className="p-6" glass hover>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">{pkg.level}</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-slate-400">Mapas:</span>
                        <p className="text-white font-medium">{pkg.maps}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Relatório:</span>
                        <p className="text-white font-medium">{pkg.report}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Prazo:</span>
                        <p className="text-white font-medium">{pkg.deadline}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Revisões:</span>
                        <p className="text-white font-medium">{pkg.revisions}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <ButtonLink
                href="/studio/pacotes"
                variant="secondary"
                size="lg"
                accentColor="indigo"
              >
                Ver comparador completo
                <ArrowRight className="w-5 h-5" />
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* (5) COMO FUNCIONA */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Como funciona"
              subtitle="Um processo claro. Entregáveis previsíveis."
            />

            <div className="space-y-6 mb-12">
              {[
                { step: '1', title: 'Briefing e diagnóstico de dados', desc: 'Conferência de área, escala, objetivo e dados disponíveis. Recomendação de pacote + cronograma.' },
                { step: '2', title: 'Produção e modelagem', desc: 'Processamento + validações. Mapas e sínteses + relatório técnico. Padronização de layouts e base geoespacial.' },
                { step: '3', title: 'Revisões (2 rodadas inclusas)', desc: 'Layout, simbologia, textos, ajustes pontuais. Alinhamento final com objetivo decisório.' },
                { step: '4', title: 'Entrega e handoff', desc: 'Atlas PDF + base geoespacial + metadados + simbologia. Checklist final de consistência.' },
              ].map((item) => (
                <Card key={item.step} className="p-6" glass>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-indigo-400">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <ButtonLink
                href="/studio/como-funciona"
                variant="primary"
                size="lg"
                accentColor="indigo"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
              >
                Entender o processo
                <ArrowRight className="w-5 h-5" />
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* (6) FAQ CURTO */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Perguntas frequentes"
              subtitle="Respostas rápidas para as dúvidas mais comuns"
            />

            <div className="space-y-4">
              {defaultFAQ.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-semibold text-white pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 flex-shrink-0 transition-transform duration-300 ${
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

        {/* (7) ACESSO - Portal do Cliente */}
        <section className="py-24 bg-[#02040a] relative border-t border-indigo-500/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Acesso"
              subtitle="Acompanhe seu projeto e acesse entregáveis"
            />
            <div className="flex justify-center">
              <Card className="p-6" glass hover>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Layers className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Área do Cliente</h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Acompanhe seu protocolo, etapas e entregáveis.
                    </p>
                    <ButtonLink
                      href="/studio/portal"
                      variant="primary"
                      size="md"
                      accentColor="indigo"
                      className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                    >
                      Acessar Portal
                      <ArrowRight className="w-4 h-4" />
                    </ButtonLink>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* (8) CTA FINAL */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="p-12" glass>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para transformar dados em decisão?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Envie sua área e objetivo. Nós retornamos com pacote recomendado, cronograma e escopo fechado.
              </p>
              <ButtonLink
                href="/studio/orcamento"
                variant="primary"
                size="lg"
                accentColor="indigo"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
              >
                Solicitar orçamento
                <ArrowRight className="w-5 h-5" />
              </ButtonLink>
            </Card>
          </div>
        </section>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}