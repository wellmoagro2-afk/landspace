"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Map, Layers, Mountain, TreePine, Droplets, Camera, Cloud, Leaf, TrendingUp, Shield, AlertTriangle, FileCheck, Activity, Waves, FileText, Ruler } from "lucide-react";

const allServices = [
  {
    id: 'urbano',
    title: 'Urbano e Plano Diretor',
    route: '/studio/urbano-plano-diretor',
    icon: Map,
    description: 'Diagnóstico territorial, mapas normativos e sínteses para Plano Diretor, zoneamento urbano, expansão e requalificação.',
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
    route: '/studio/zee-ordenamento',
    icon: Layers,
    description: 'Integra meio físico, biótico e socioeconômico para construir potencialidades, vulnerabilidades e diretrizes por zona. Inclui PUC quando aplicável.',
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
    route: '/studio/bacias-hidrograficas',
    icon: Mountain,
    description: 'Delimitação, indicadores físico-hidrológicos, modelagem de erosão (RUSLE) e priorização conservacionista (PUC) para planejamento territorial e gestão de bacias.',
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
    title: 'Riscos Climáticos',
    route: '/studio/riscos-climaticos',
    icon: Cloud,
    description: 'Variabilidade, extremos e indicadores (seca/veranicos/chuva intensa) para apoiar planejamento agrícola, defesa civil e gestão ambiental.',
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
    title: 'Aptidão Agrícola e Agroclima',
    route: '/studio/aptidao-agricola-agroclima',
    icon: Droplets,
    description: 'Integra clima, solo e relevo para classificar aptidão por cultura e manejo, com recomendações e limitações explicitadas.',
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
    title: 'Agricultura de Precisão',
    route: '/studio/agricultura-precisao',
    icon: Leaf,
    description: 'Produtividade, variabilidade espacial e recomendações operacionais com mapas compatíveis com seu fluxo (GIS e equipamentos).',
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
    route: '/studio/florestal-restauracao',
    icon: TreePine,
    description: 'Fragmentação, conectividade, corredores e priorização de restauração para planejamento florestal e gestão ambiental.',
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
    title: 'Drone/Fotogrametria',
    route: '/studio/drone-fotogrametria',
    icon: Camera,
    description: 'Ortofoto, MDT/MDS e derivados para urbano e agro — com base pronta para GIS/CAD conforme escopo.',
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
    route: '/studio/monitoramento-lulc',
    icon: TrendingUp,
    description: 'Classificação temporal, análise de transições e detecção de mudanças para monitoramento ambiental, licenciamento e planejamento territorial.',
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
    route: '/studio/zoneamento-ambiental',
    icon: Shield,
    description: 'Mapeamento de APP, Reserva Legal e áreas protegidas para CAR, licenciamento e regularização ambiental com integração de conflitos de uso.',
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
    route: '/studio/fragilidade-ambiental',
    icon: AlertTriangle,
    description: 'Avaliação de fragilidade do meio físico (relevo, solo, geologia) para planejamento territorial e gestão ambiental com diretrizes de uso compatível.',
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
    route: '/studio/eia-rima',
    icon: FileCheck,
    description: 'Base cartográfica completa e análises ambientais integradas para estudos de impacto ambiental, licenciamento e planejamento de empreendimentos.',
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
    route: '/studio/riscos-geologicos',
    icon: Activity,
    description: 'Mapeamento de suscetibilidade a deslizamentos e riscos geológicos para planejamento urbano, defesa civil e gestão de riscos.',
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
    route: '/studio/areas-degradadas',
    icon: TreePine,
    description: 'Identificação de áreas degradadas e priorização para recuperação ambiental usando análise multicritério e cenários de recuperação.',
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
    route: '/studio/recursos-hidricos',
    icon: Waves,
    description: 'Análise espacializada de disponibilidade hídrica, qualidade de água e balanço hídrico para gestão de recursos hídricos e outorgas.',
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
    route: '/studio/car',
    icon: FileText,
    description: 'Elaboração e validação de Cadastro Ambiental Rural com mapeamento de APP, Reserva Legal, áreas de uso restrito e integração com bases oficiais do SICAR.',
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
    route: '/studio/georreferenciamento',
    icon: Ruler,
    description: 'Georreferenciamento de imóveis rurais conforme INCRA, com memorial descritivo, coordenadas geodésicas e documentação técnica para regularização fundiária.',
    bullets: [
      'Georreferenciamento conforme INCRA',
      'Memorial descritivo georreferenciado',
      'Coordenadas geodésicas certificadas',
      'Integração com bases cadastrais',
      'Documentação para regularização fundiária'
    ],
  },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Um catálogo completo de mapas para planejamento e gestão"
            subtitle="Pacotes por objetivo, com entregáveis padronizados, base geoespacial organizada e metodologia transparente"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <Card key={service.id} className="p-6" glass hover>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <ServiceIcon className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">{service.description}</p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {service.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-indigo-400 mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/10">
                      <ButtonLink
                        href={`/studio/orcamento?service=${service.id}`}
                        variant="primary"
                        size="md"
                        accentColor="indigo"
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                      >
                        Solicitar orçamento
                        <ArrowRight className="w-4 h-4" />
                      </ButtonLink>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
