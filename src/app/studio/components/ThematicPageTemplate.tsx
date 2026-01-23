"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { defaultDeliverables } from "../studio.data";
import { ThematicPageData } from "../thematic-data";
import { FileText, Database, Layers, CheckCircle2, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

interface ThematicPageTemplateProps {
  data: ThematicPageData;
}

export default function ThematicPageTemplate({ data }: ThematicPageTemplateProps) {
  const packageLevels = {
    essential: { label: 'Essencial', color: 'bg-slate-700' },
    professional: { label: 'Profissional', color: 'bg-indigo-600' },
    premium: { label: 'Premium', color: 'bg-indigo-800' },
  };

  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              {data.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {data.hero.subheadline}
            </p>
          </div>

          {/* O que você recebe */}
          <SectionHeader
            title="O que você recebe"
            subtitle="Entregáveis padronizados com base geoespacial organizada"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

          {/* Pacotes */}
          <SectionHeader
            title="Pacotes disponíveis"
            subtitle="Escolha o nível que melhor atende ao seu objetivo decisório"
          />

          <div className={`grid grid-cols-1 ${data.packages.length === 1 ? 'md:grid-cols-1' : data.packages.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 mb-16`}>
            {data.packages.map((pkg) => {
              const levelInfo = packageLevels[pkg.level];
              return (
                <Card key={pkg.level} className="p-6" glass hover>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={`${levelInfo.color} text-white`}>
                        {levelInfo.label}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white">{pkg.title}</h3>

                    <div>
                      <span className="text-slate-400 text-sm block mb-2">Inclui:</span>
                      <ul className="space-y-1">
                        {pkg.maps.map((map, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                            <span>{map}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-slate-400 text-sm block mb-1">Prazo típico:</span>
                      <p className="text-white font-medium text-sm">{pkg.deadline}</p>
                    </div>

                    {pkg.deliverables && (
                      <div>
                        <span className="text-slate-400 text-sm block mb-2">Entregáveis:</span>
                        <ul className="space-y-1">
                          {pkg.deliverables.map((item, idx) => (
                            <li key={idx} className="text-slate-300 text-xs flex items-start gap-1">
                              <span className="text-indigo-400 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Dados mínimos necessários */}
          <SectionHeader
            title="Dados mínimos necessários"
            subtitle="Informações essenciais para iniciar o projeto"
          />

          <Card className="p-6 mb-16" glass>
            <ul className="space-y-2">
              {data.dataRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* FAQ */}
          {data.faq && data.faq.length > 0 && (
            <>
              <SectionHeader
                title="Perguntas frequentes"
                subtitle="Respostas sobre este serviço"
              />

              <div className="space-y-4 mb-16">
                {data.faq.map((item, idx) => (
                  <Card key={idx} className="p-6" glass>
                    <h4 className="text-white font-semibold mb-2">{item.question}</h4>
                    <p className="text-slate-300 text-sm">{item.answer}</p>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* CTA Final */}
          <div className="text-center">
            <Card className="p-12" glass>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronto para transformar dados em decisão?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Envie sua área e objetivo. Nós retornamos com pacote recomendado, cronograma e escopo fechado.
              </p>
              <ButtonLink
                href={`/studio/orcamento?service=${data.serviceId}`}
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
        </div>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
