"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import StudioServiceHero from "../components/StudioServiceHero";
import PackageCards from "../components/PackageCards";
import DeliverablesList from "../components/DeliverablesList";
import DataRequirements from "../components/DataRequirements";
import ScopeRules from "../components/ScopeRules";
import ProtocolCTA from "../components/ProtocolCTA";
import { periciaServices } from "../_data/periciaAval";
import { Card } from "@/components/ui/Card";

export default function AvaliacaoRuralPage() {
  const service = periciaServices['avaliacao-rural'];

  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StudioServiceHero
            headline={service.hero.headline}
            subheadline={service.hero.subheadline}
            badges={service.hero.badges}
          />

          {/* O que é */}
          <SectionHeader
            title="O que é"
            subtitle="Entenda o serviço de avaliação técnica de imóveis rurais"
          />
          <Card className="p-6 mb-16" glass>
            <div className="space-y-4 text-slate-300">
              {service.whatIs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          {/* O que entregamos */}
          <SectionHeader
            title="O que entregamos"
            subtitle="Diagnóstico territorial completo e análise de aptidão/riscos"
          />
          <Card className="p-6 mb-16" glass>
            <ul className="space-y-3">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="text-slate-300 flex items-start">
                  <span className="text-indigo-400 mr-2 mt-1">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Pacotes */}
          <SectionHeader
            title="Pacotes"
            subtitle="Escolha o nível de detalhamento adequado à sua necessidade"
          />
          <PackageCards packages={service.packages} />

          {/* Dados mínimos */}
          <DataRequirements requirements={service.dataRequirements} />

          {/* Prazos padrão */}
          <Card className="p-6 mb-16" glass>
            <h3 className="text-xl font-bold text-white mb-4">Prazos padrão</h3>
            <p className="text-slate-300 leading-relaxed">{service.standardDeadlines}</p>
          </Card>

          {/* Entregáveis */}
          <DeliverablesList deliverables={service.deliverablesList} />

          {/* Regras de revisão/escopo */}
          <ScopeRules rules={service.scopeRules} />

          {/* CTA Final */}
          <ProtocolCTA serviceId={service.id} />
        </div>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
