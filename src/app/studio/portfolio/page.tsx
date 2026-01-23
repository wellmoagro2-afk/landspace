"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Map, FileText, CheckCircle2 } from "lucide-react";

// Placeholder cases - estrutura para futuros casos reais
const cases = [
  {
    id: 'case-1',
    title: 'Plano Diretor Municipal',
    context: 'Diagnóstico territorial completo para revisão do Plano Diretor de município de médio porte.',
    objective: 'Identificar áreas de expansão urbana, conflitos de uso e diretrizes de zoneamento.',
    data: 'Limites municipais, malha urbana, vias, áreas verdes, APP',
    scale: '1:25.000',
    methods: 'Análise de uso e ocupação do solo, mapeamento de centralidades, análise de conflitos',
    maps: ['Uso e ocupação do solo', 'Sistema viário e centralidades', 'Conflitos de uso', 'Diretrizes de expansão'],
    results: 'Identificação de 3 zonas prioritárias para expansão e 5 áreas de conflito ambiental',
    deliverables: 'Atlas PDF (15 mapas) + base GeoPackage + relatório técnico (8 páginas)',
  },
  {
    id: 'case-2',
    title: 'Modelagem de Erosão em Bacia Hidrográfica',
    context: 'Análise de perda de solo para priorização de ações de conservação em bacia agrícola.',
    objective: 'Identificar hotspots de erosão e priorizar intervenções por sub-bacia.',
    data: 'DEM, solos, uso/cobertura, dados de chuva',
    scale: '1:50.000',
    methods: 'Modelagem USLE/RUSLE, análise de fatores, priorização multicritério',
    maps: ['Fatores USLE', 'Perda de solo', 'Hotspots de erosão', 'Priorização por sub-bacia'],
    results: 'Identificação de 8 hotspots críticos e priorização de 3 sub-bacias para intervenção imediata',
    deliverables: 'Atlas PDF (12 mapas) + base GeoPackage + relatório técnico (6 páginas)',
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Portfólio e casos de uso"
            subtitle="Exemplos de mapas, atlas e bases geoespaciais entregues para diferentes finalidades — com foco em clareza, rastreabilidade e aplicação prática"
          />

          <div className="space-y-12">
            {cases.map((caseItem) => (
              <Card key={caseItem.id} className="p-8" glass>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{caseItem.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-400 mb-2">Contexto e objetivo decisório</h4>
                      <p className="text-slate-300 text-sm mb-4">{caseItem.context}</p>
                      <p className="text-slate-300 text-sm">{caseItem.objective}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-indigo-400 mb-2">Dados e escala</h4>
                      <p className="text-slate-300 text-sm mb-2">{caseItem.data}</p>
                      <p className="text-slate-300 text-sm">Escala: {caseItem.scale}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-2">Métodos aplicados (alto nível)</h4>
                    <p className="text-slate-300 text-sm">{caseItem.methods}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-2">Mapas principais</h4>
                    <ul className="space-y-1">
                      {caseItem.maps.map((map, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <span>{map}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-2">Resultados e recomendações</h4>
                    <p className="text-slate-300 text-sm">{caseItem.results}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-2">Entregáveis</h4>
                    <p className="text-slate-300 text-sm">{caseItem.deliverables}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
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
          </div>
        </div>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
