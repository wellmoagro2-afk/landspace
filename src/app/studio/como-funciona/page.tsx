"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, CheckCircle2, FileCheck, Database, Layers } from "lucide-react";

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Um processo claro. Entregáveis previsíveis."
            subtitle="Do briefing à entrega final: método, QA e revisões estruturadas para reduzir incerteza e acelerar a decisão"
          />

          {/* Etapas */}
          <div className="space-y-6 mb-16">
            {[
              {
                step: '1',
                title: 'Briefing e diagnóstico de dados (D+0 a D+2)',
                items: [
                  'Conferência de área, escala, objetivo e dados disponíveis',
                  'Recomendação de pacote + cronograma',
                  'Identificação de riscos (escala, lacunas de dados, campo/drone)'
                ],
                icon: FileCheck,
              },
              {
                step: '2',
                title: 'Produção e modelagem',
                items: [
                  'Processamento + validações',
                  'Mapas e sínteses + relatório técnico',
                  'Padronização de layouts e base geoespacial'
                ],
                icon: Database,
              },
              {
                step: '3',
                title: 'Revisões (2 rodadas inclusas)',
                items: [
                  'Layout, simbologia, textos, ajustes pontuais',
                  'Alinhamento final com objetivo decisório'
                ],
                icon: CheckCircle2,
              },
              {
                step: '4',
                title: 'Entrega e handoff',
                items: [
                  'Atlas PDF + base geoespacial + metadados + simbologia',
                  'Checklist final de consistência (CRS, resolução, NoData, integridade)'
                ],
                icon: Layers,
              },
            ].map((etapa) => (
              <Card key={etapa.step} className="p-6" glass>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <etapa.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-indigo-400">{etapa.step}</span>
                      <h3 className="text-lg font-semibold text-white">{etapa.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {etapa.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-indigo-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Prazos e SLA */}
          <Card className="p-6 mb-12" glass>
            <h3 className="text-xl font-bold text-white mb-4">Prazos e SLA</h3>
            <div className="space-y-2 text-slate-300 text-sm">
              <p>• Prazos variam conforme escala, disponibilidade/qualidade dos dados e necessidade de campo</p>
              <p>• Projetos premium podem incluir cronograma por fase (diagnóstico → síntese → diretrizes)</p>
            </div>
          </Card>

          {/* Escopo e Revisões */}
          <Card className="p-6 mb-12" glass>
            <h3 className="text-xl font-bold text-white mb-4">Escopo e Revisões</h3>
            <div className="space-y-3 text-slate-300 text-sm">
              <div>
                <p className="font-semibold text-white mb-1">Revisões inclusas:</p>
                <p>2 rodadas (layout/simbologia/texto e ajustes pontuais)</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Mudança de escopo:</p>
                <p>Nova área, novo período, novos indicadores, novos datasets ou novo pacote → aditivo</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Limitações:</p>
                <p>Resultados dependem de escala/qualidade dos dados; isso é explicitado no relatório</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <ButtonLink
              href="/studio/orcamento"
              variant="primary"
              size="lg"
              accentColor="indigo"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
            >
              Enviar briefing
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
