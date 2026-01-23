"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { defaultDeliverables } from "../studio.data";
import { FileText, Database, Layers, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

const packages = [
  {
    level: 'Essencial',
    subtitle: 'Diagnóstico rápido',
    maps: '6–12 mapas',
    report: '2–5 páginas',
    deadline: '10–20 dias úteis',
    revisions: '2 revisões',
    useCase: 'Se você precisa entender o território',
    color: 'slate',
  },
  {
    level: 'Profissional',
    subtitle: 'Modelagem e priorização',
    maps: '12–20 mapas + sínteses/modelos',
    report: '4–10 páginas',
    deadline: '20–45 dias úteis',
    revisions: '2 revisões',
    useCase: 'Se você precisa priorizar/intervir',
    color: 'indigo',
  },
  {
    level: 'Premium',
    subtitle: 'Diretrizes e cenários',
    maps: '20+ mapas + cenários/diretrizes',
    report: '8–15 páginas',
    deadline: '30–90 dias úteis',
    revisions: '2 revisões (extras opcionais)',
    useCase: 'Se você precisa decidir política/diretriz/cenário',
    color: 'indigo',
  },
];

export default function PacotesPage() {
  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Escolha o pacote pelo objetivo"
            subtitle="Essencial para diagnóstico rápido, Profissional para modelagem e priorização, Premium para diretrizes e cenários"
          />

          {/* Comparador de Pacotes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {packages.map((pkg) => (
              <Card key={pkg.level} className="p-8" glass hover>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.level}</h3>
                    <p className="text-indigo-400 text-sm font-medium">{pkg.subtitle}</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-slate-400 block mb-1">Mapas:</span>
                      <p className="text-white font-medium">{pkg.maps}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Relatório:</span>
                      <p className="text-white font-medium">{pkg.report}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Prazo típico:</span>
                      <p className="text-white font-medium">{pkg.deadline}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Revisões:</span>
                      <p className="text-white font-medium">{pkg.revisions}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-slate-300 text-sm italic">{pkg.useCase}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* O que você recebe */}
          <SectionHeader
            title="O que você recebe"
            subtitle="Entregáveis padronizados em todos os pacotes"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

          {/* CTA */}
          <div className="text-center">
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
