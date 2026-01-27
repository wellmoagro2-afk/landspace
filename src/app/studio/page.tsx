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

// ServiÃ§os reorganizados: PUC e RUSLE integrados como metodologias (15 serviÃ§os principais)
const serviceCards = [
  {
    id: 'urbano',
    title: 'Planejamento Urbano e Plano Diretor',
    description: 'DiagnÃ³stico territorial, mapas normativos e sÃ­nteses para Plano Diretor, zoneamento urbano, expansÃ£o e requalificaÃ§Ã£o.',
    icon: Map,
    accentColor: 'green',
    route: '/studio/urbano-plano-diretor',
    bullets: [
      'Limites, bairros/distritos, malha urbana',
      'Sistema viÃ¡rio e centralidades',
      'Uso e ocupaÃ§Ã£o do solo',
      'Conflitos de uso e riscos',
      'Diretrizes de expansÃ£o/adensamento'
    ],
  },
  {
    id: 'zee',
    title: 'ZEE e Ordenamento Territorial',
    description: 'Integra meio fÃ­sico, biÃ³tico e socioeconÃ´mico para construir potencialidades, vulnerabilidades e diretrizes por zona. Inclui PUC quando aplicÃ¡vel.',
    icon: Layers,
    accentColor: 'indigo',
    route: '/studio/zee-ordenamento',
    bullets: [
      'Meio fÃ­sico (relevo/solos/geologia)',
      'Meio biÃ³tico (cobertura vegetal, fragmentaÃ§Ã£o)',
      'SocioeconÃ´mico (infraestrutura, pressÃµes)',
      'Potencial de uso conservacionista (PUC)',
      'Mapa final de zonas e diretrizes'
    ],
  },
  {
    id: 'bacias',
    title: 'Bacias HidrogrÃ¡ficas e ConservaÃ§Ã£o',
    description: 'DelimitaÃ§Ã£o, indicadores fÃ­sico-hidrolÃ³gicos, modelagem de erosÃ£o (RUSLE) e priorizaÃ§Ã£o conservacionista (PUC) para planejamento territorial e gestÃ£o de bacias.',
    icon: Mountain,
    accentColor: 'amber',
    route: '/studio/bacias-hidrograficas',
    bullets: [
      'DelimitaÃ§Ã£o de bacia/sub-bacias',
      'Indicadores fÃ­sico-hidrolÃ³gicos',
      'Modelagem de erosÃ£o (RUSLE)',
      'Potencial de uso conservacionista (PUC)',
      'Hotspots e priorizaÃ§Ã£o de intervenÃ§Ãµes'
    ],
  },
  {
    id: 'riscos',
    title: 'Riscos ClimÃ¡ticos e Agroclima',
    description: 'Variabilidade, extremos e indicadores (seca/veranicos/chuva intensa) para apoiar planejamento agrÃ­cola, defesa civil e gestÃ£o ambiental.',
    icon: Cloud,
    accentColor: 'cyan',
    route: '/studio/riscos-climaticos',
    bullets: [
      'Variabilidade/anomalias de precipitaÃ§Ã£o',
      'Ãndices de seca (SPI/SPEI)',
      'Indicadores de veranicos/estiagens',
      'SÃ­ntese de exposiÃ§Ã£o',
      'CenÃ¡rios e vulnerabilidade'
    ],
  },
  {
    id: 'aptidao',
    title: 'AptidÃ£o AgrÃ­cola (integrada)',
    description: 'Integra clima, solo e relevo para classificar aptidÃ£o por cultura e manejo, com recomendaÃ§Ãµes e limitaÃ§Ãµes explicitadas.',
    icon: Droplets,
    accentColor: 'lime',
    route: '/studio/aptidao-agricola-agroclima',
    bullets: [
      'AptidÃ£o climÃ¡tica por cultura',
      'BalanÃ§o hÃ­drico',
      'AptidÃ£o agrÃ­cola integrada',
      'Janelas de plantio',
      'CenÃ¡rios (irrigado Ã— sequeiro)'
    ],
  },
  {
    id: 'precisao',
    title: 'Agricultura de precisÃ£o (zonas de manejo e VRA)',
    description: 'Produtividade, variabilidade espacial e recomendaÃ§Ãµes operacionais com mapas compatÃ­veis com seu fluxo (GIS e equipamentos).',
    icon: Leaf,
    accentColor: 'green',
    route: '/studio/agricultura-precisao',
    bullets: [
      'Zonas de manejo',
      'Produtividade e estabilidade temporal',
      'Plano de amostragem',
      'PrescriÃ§Ã£o (VRA)',
      'Mapas operacionais'
    ],
  },
  {
    id: 'florestal',
    title: 'AnÃ¡lise Florestal e Conectividade da Paisagem',
    description: 'FragmentaÃ§Ã£o, conectividade, corredores ecolÃ³gicos e priorizaÃ§Ã£o de restauraÃ§Ã£o para planejamento florestal e gestÃ£o ambiental.',
    icon: TreePine,
    accentColor: 'emerald',
    route: '/studio/florestal-restauracao',
    bullets: [
      'Cobertura vegetal e fragmentaÃ§Ã£o',
      'Conectividade (indicadores)',
      'PriorizaÃ§Ã£o de restauraÃ§Ã£o',
      'Corredores ecolÃ³gicos',
      'CenÃ¡rios alternativos'
    ],
  },
  {
    id: 'drone',
    title: 'Drone e fotogrametria',
    description: 'Ortofoto, MDT/MDS e derivados para urbano e agro â€” com base pronta para GIS/CAD conforme escopo.',
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
    title: 'Monitoramento e MudanÃ§as de Uso e Cobertura do Solo (LULC)',
    description: 'ClassificaÃ§Ã£o temporal, anÃ¡lise de transiÃ§Ãµes e detecÃ§Ã£o de mudanÃ§as para monitoramento ambiental, licenciamento e planejamento territorial.',
    icon: TrendingUp,
    accentColor: 'emerald',
    route: '/studio/monitoramento-lulc',
    bullets: [
      'ClassificaÃ§Ã£o de uso e cobertura (mÃºltiplas datas)',
      'AnÃ¡lise de transiÃ§Ãµes temporais',
      'DetecÃ§Ã£o de desmatamento/expansÃ£o urbana',
      'Taxas de mudanÃ§a e projeÃ§Ãµes',
      'Mapas de mudanÃ§a e matriz de transiÃ§Ã£o'
    ],
  },
  {
    id: 'zoneamento-ambiental',
    title: 'Mapeamento de APP, RL e Ãreas Protegidas',
    description: 'Mapeamento de Ãreas de PreservaÃ§Ã£o Permanente (APP), Reserva Legal e Ã¡reas protegidas para CAR, licenciamento e regularizaÃ§Ã£o ambiental com integraÃ§Ã£o de conflitos de uso.',
    icon: Shield,
    accentColor: 'green',
    route: '/studio/zoneamento-ambiental',
    bullets: [
      'Mapeamento de APP (rios, nascentes, topos)',
      'Reserva Legal e Ã¡reas de preservaÃ§Ã£o',
      'IntegraÃ§Ã£o com CAR',
      'Conflitos de uso em Ã¡reas protegidas',
      'Diretrizes de regularizaÃ§Ã£o'
    ],
  },
  {
    id: 'fragilidade',
    title: 'AnÃ¡lise de Fragilidade Ambiental',
    description: 'AvaliaÃ§Ã£o de fragilidade do meio fÃ­sico (relevo, solo, geologia) para planejamento territorial e gestÃ£o ambiental com diretrizes de uso compatÃ­vel.',
    icon: AlertTriangle,
    accentColor: 'amber',
    route: '/studio/fragilidade-ambiental',
    bullets: [
      'Fragilidade do meio fÃ­sico',
      'Fragilidade potencial vs. emergente',
      'IntegraÃ§Ã£o com uso do solo',
      'Diretrizes de uso compatÃ­vel',
      'Mapas de fragilidade e restriÃ§Ãµes'
    ],
  },
  {
    id: 'eia-rima',
    title: 'Suporte CartogrÃ¡fico para EIA-RIMA/AIA',
    description: 'Base cartogrÃ¡fica completa e anÃ¡lises ambientais integradas para estudos de impacto ambiental, licenciamento e planejamento de empreendimentos.',
    icon: FileCheck,
    accentColor: 'indigo',
    route: '/studio/eia-rima',
    bullets: [
      'Base cartogrÃ¡fica para EIA-RIMA',
      'Mapas de Ã¡rea de influÃªncia',
      'AnÃ¡lises ambientais integradas',
      'Mapas temÃ¡ticos (fÃ­sico, biÃ³tico, socioeconÃ´mico)',
      'SÃ­ntese cartogrÃ¡fica para relatÃ³rios'
    ],
  },
  {
    id: 'deslizamentos',
    title: 'Riscos GeolÃ³gicos e Suscetibilidade a Deslizamentos',
    description: 'Mapeamento de suscetibilidade a deslizamentos e riscos geolÃ³gicos (erosÃ£o, solapamento) para planejamento urbano, defesa civil e gestÃ£o de riscos.',
    icon: Activity,
    accentColor: 'amber',
    route: '/studio/riscos-geologicos',
    bullets: [
      'Susceptibilidade a deslizamentos',
      'Riscos geolÃ³gicos (erosÃ£o, solapamento)',
      'IntegraÃ§Ã£o com uso do solo e ocupaÃ§Ã£o',
      'Mapeamento de Ã¡reas de risco',
      'Diretrizes de ocupaÃ§Ã£o segura'
    ],
  },
  {
    id: 'areas-degradadas',
    title: 'Ãreas Degradadas e PriorizaÃ§Ã£o de RecuperaÃ§Ã£o',
    description: 'IdentificaÃ§Ã£o de Ã¡reas degradadas e priorizaÃ§Ã£o para recuperaÃ§Ã£o ambiental usando anÃ¡lise multicritÃ©rio, integraÃ§Ã£o com conectividade e cenÃ¡rios de recuperaÃ§Ã£o.',
    icon: TreePine,
    accentColor: 'emerald',
    route: '/studio/areas-degradadas',
    bullets: [
      'IdentificaÃ§Ã£o de Ã¡reas degradadas',
      'PriorizaÃ§Ã£o para recuperaÃ§Ã£o (multicritÃ©rio)',
      'IntegraÃ§Ã£o com conectividade e fragmentaÃ§Ã£o',
      'CenÃ¡rios de recuperaÃ§Ã£o',
      'Diretrizes de intervenÃ§Ã£o'
    ],
  },
  {
    id: 'recursos-hidricos',
    title: 'Recursos HÃ­dricos: Qualidade e Disponibilidade',
    description: 'AnÃ¡lise espacializada de disponibilidade hÃ­drica, qualidade de Ã¡gua e balanÃ§o hÃ­drico para gestÃ£o de recursos hÃ­dricos, outorgas e planejamento hÃ­drico.',
    icon: Waves,
    accentColor: 'cyan',
    route: '/studio/recursos-hidricos',
    bullets: [
      'Disponibilidade hÃ­drica superficial e subterrÃ¢nea',
      'Qualidade de Ã¡gua (indicadores espaciais)',
      'BalanÃ§o hÃ­drico espacializado',
      'Vulnerabilidade de aquÃ­feros',
      'Diretrizes de gestÃ£o hÃ­drica'
    ],
  },
  {
    id: 'car',
    title: 'Cadastro Ambiental Rural (CAR)',
    description: 'ElaboraÃ§Ã£o e validaÃ§Ã£o de Cadastro Ambiental Rural com mapeamento de APP, Reserva Legal, Ã¡reas de uso restrito e integraÃ§Ã£o com bases oficiais do SICAR.',
    icon: FileText,
    accentColor: 'emerald',
    route: '/studio/car',
    bullets: [
      'Mapeamento de APP e Reserva Legal',
      'DelimitaÃ§Ã£o de Ã¡reas de uso restrito',
      'IntegraÃ§Ã£o com bases do SICAR',
      'ValidaÃ§Ã£o e correÃ§Ã£o de CAR existente',
      'DocumentaÃ§Ã£o tÃ©cnica para regularizaÃ§Ã£o'
    ],
  },
  {
    id: 'georreferenciamento',
    title: 'Georreferenciamento de ImÃ³veis Rurais',
    description: 'Georreferenciamento de imÃ³veis rurais conforme INCRA, com memorial descritivo, coordenadas geodÃ©sicas e documentaÃ§Ã£o tÃ©cnica para regularizaÃ§Ã£o fundiÃ¡ria.',
    icon: Ruler,
    accentColor: 'amber',
    route: '/studio/georreferenciamento',
    bullets: [
      'Georreferenciamento conforme INCRA',
      'Memorial descritivo georreferenciado',
      'Coordenadas geodÃ©sicas certificadas',
      'IntegraÃ§Ã£o com bases cadastrais',
      'DocumentaÃ§Ã£o para regularizaÃ§Ã£o fundiÃ¡ria'
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
              GeointeligÃªncia e soluÃ§Ãµes geoespaciais para
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                decisÃ£o pÃºblica, ambiental e agro
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Mapas, modelos e relatÃ³rios prontos para planejamento territorial, gestÃ£o ambiental, bacias hidrogrÃ¡ficas e agricultura de precisÃ£o â€” com base geoespacial organizada e padrÃ£o de qualidade auditÃ¡vel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ButtonLink
                href="/studio/orcamento"
                variant="primary"
                size="lg"
                accentColor="indigo"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
              >
                Solicitar orÃ§amento
                <ArrowRight className="w-5 h-5" />
              </ButtonLink>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900/50 border border-indigo-500/30 text-indigo-400 rounded-xl font-semibold text-base hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300"
              >
                Ver serviÃ§os
              </a>
            </div>
          </div>
        </section>

        {/* Pulse Word Cloud */}
        <StudioPulseWordCloud />

        {/* (2) O QUE VOCÃŠ RECEBE */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="O que vocÃª recebe"
              subtitle="EntregÃ¡veis padronizados com base geoespacial organizada e metodologia transparente"
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

        {/* (3) SOLUÃ‡Ã•ES POR OBJETIVO (Grid dos 15 serviÃ§os principais - PUC e RUSLE integrados como metodologias) */}
        <section id="servicos" className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="SoluÃ§Ãµes por objetivo"
              subtitle="Quinze linhas de serviÃ§o cartogrÃ¡fico padronizado para diferentes objetivos decisÃ³rios"
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
                            <span className="text-indigo-400 mt-1">â€¢</span>
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

            {/* BotÃ£o Ver Todos */}
            <div className="flex justify-center mt-12">
              <ButtonLink
                href="/studio/todos-servicos"
                variant="secondary"
                size="lg"
                accentColor="indigo"
                className="px-8 py-3"
              >
                Ver Todos os ServiÃ§os
                <ArrowRight className="w-5 h-5 ml-2" />
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* PERÃCIA & AVALIAÃ‡ÃƒO (HIGH-TICKET) */}
        <section className="py-24 bg-[#02040a] relative border-t border-indigo-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="PerÃ­cia & AvaliaÃ§Ã£o (High-Ticket)"
              subtitle="ServiÃ§os especializados com rigor tÃ©cnico e rastreabilidade completa para processos judiciais, administrativos e privados"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {periciaCards.map((service) => {
                const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
                            <span className="text-indigo-400 mt-1">â€¢</span>
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

        {/* (4) PACOTES E NÃVEIS */}
        <section className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Pacotes e NÃ­veis"
              subtitle="Escolha o pacote pelo objetivo: Essencial para diagnÃ³stico rÃ¡pido, Profissional para modelagem e priorizaÃ§Ã£o, Premium para diretrizes e cenÃ¡rios"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { level: 'Essencial', maps: '6â€“12 mapas', report: '2â€“5 pÃ¡ginas', deadline: '10â€“20 dias Ãºteis', revisions: '2 revisÃµes', color: 'slate' },
                { level: 'Profissional', maps: '12â€“20 mapas + sÃ­nteses', report: '4â€“10 pÃ¡ginas', deadline: '20â€“45 dias Ãºteis', revisions: '2 revisÃµes', color: 'indigo' },
                { level: 'Premium', maps: '20+ mapas + cenÃ¡rios', report: '8â€“15 pÃ¡ginas', deadline: '30â€“90 dias Ãºteis', revisions: '2 revisÃµes (extras opcionais)', color: 'indigo' },
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
                        <span className="text-slate-400">RelatÃ³rio:</span>
                        <p className="text-white font-medium">{pkg.report}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Prazo:</span>
                        <p className="text-white font-medium">{pkg.deadline}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">RevisÃµes:</span>
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
              subtitle="Um processo claro. EntregÃ¡veis previsÃ­veis."
            />

            <div className="space-y-6 mb-12">
              {[
                { step: '1', title: 'Briefing e diagnÃ³stico de dados', desc: 'ConferÃªncia de Ã¡rea, escala, objetivo e dados disponÃ­veis. RecomendaÃ§Ã£o de pacote + cronograma.' },
                { step: '2', title: 'ProduÃ§Ã£o e modelagem', desc: 'Processamento + validaÃ§Ãµes. Mapas e sÃ­nteses + relatÃ³rio tÃ©cnico. PadronizaÃ§Ã£o de layouts e base geoespacial.' },
                { step: '3', title: 'RevisÃµes (2 rodadas inclusas)', desc: 'Layout, simbologia, textos, ajustes pontuais. Alinhamento final com objetivo decisÃ³rio.' },
                { step: '4', title: 'Entrega e handoff', desc: 'Atlas PDF + base geoespacial + metadados + simbologia. Checklist final de consistÃªncia.' },
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
              subtitle="Respostas rÃ¡pidas para as dÃºvidas mais comuns"
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
              subtitle="Acompanhe seu projeto e acesse entregÃ¡veis"
            />
            <div className="flex justify-center">
              <Card className="p-6" glass hover>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Layers className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Ãrea do Cliente</h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Acompanhe seu protocolo, etapas e entregÃ¡veis.
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
                Pronto para transformar dados em decisÃ£o?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Envie sua Ã¡rea e objetivo. NÃ³s retornamos com pacote recomendado, cronograma e escopo fechado.
              </p>
              <ButtonLink
                href="/studio/orcamento"
                variant="primary"
                size="lg"
                accentColor="indigo"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
              >
                Solicitar orÃ§amento
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
