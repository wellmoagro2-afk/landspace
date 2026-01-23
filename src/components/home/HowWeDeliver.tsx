import { Database, Cpu, Send, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Dados",
    description: "Satélite, vetores, sensores e bases públicas/privadas.",
    icon: Database,
  },
  {
    number: "02",
    title: "Modelos & Processos",
    description: "Pipelines, QA/QC, reprodutibilidade e rastreabilidade.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Entrega",
    description: "Ferramentas, relatórios e briefings editoriais — com visualizações claras e acionáveis.",
    icon: Send,
  },
];

export default function HowWeDeliver() {
  return (
    <section className="py-24 md:py-32 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Como entregamos"
          subtitle="Um pipeline que sustenta Tech, Academy e Strategy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Conector visual - Linha pontilhada entre cards */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none">
            <div className="relative h-full">
              <div className="absolute left-[16.66%] right-[16.66%] h-full border-t border-dashed border-[rgba(159,183,201,0.2)]"></div>
            </div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isNotLast = index < steps.length - 1;

            return (
              <div key={step.number} className="relative">
                <Card className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <Icon className="w-7 h-7 text-[#9fb7c9]" />
                        <span className="text-3xl md:text-4xl font-bold tracking-tight text-[rgba(159,183,201,0.2)]">
                          {step.number}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                </Card>

                {/* Seta discreta para o próximo (apenas desktop) */}
                {isNotLast && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                    <ArrowRight className="w-5 h-5 text-[rgba(159,183,201,0.4)]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
