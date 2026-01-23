"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Map,
  Layers,
  Mountain,
  Cloud,
  Droplets,
  Leaf,
  TreePine,
  Camera,
  TrendingUp,
  Shield,
  AlertTriangle,
  FileCheck,
  Activity,
  Waves,
  ArrowRight,
  FileText,
  Ruler,
} from "lucide-react";

// Serviços completos (15 serviços)
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

export default function TodosServicosPage() {
  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10">
        {/* Hero com Título Big Tech */}
        <section className="py-24 bg-[#02040a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-indigo-lg"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent">
                  // CATÁLOGO COMPLETO
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                Quinze linhas de serviço cartográfico padronizado para diferentes objetivos decisórios
              </p>
            </div>
          </div>
        </section>

        {/* Grid de Todos os Serviços */}
        <section className="py-12 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCards.map((service) => {
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
                      accentColor === 'indigo' ? 'bg-indigo-500/50' :
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
                              accentColor === 'indigo' ? 'text-indigo-400' :
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

                      {/* Actions */}
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
          </div>
        </section>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
