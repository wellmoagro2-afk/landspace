import { Code, Map, Layers, GraduationCap, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { branding } from "@/lib/branding";

// Ícone SVG customizado: Selo de Validação Geoespacial
function ValidationSealIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className + " drop-shadow-amber-lg"}
    >
      <defs>
        <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      
      {/* Hexágono com bordas arredondadas */}
      <path
        d="M12 2 L20 6 L20 14 L12 18 L4 14 L4 6 Z"
        stroke="url(#amber-grad)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      {/* Grade cartográfica - Linhas horizontais */}
      <line x1="6" y1="8" x2="18" y2="8" stroke="url(#amber-grad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="url(#amber-grad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="16" x2="18" y2="16" stroke="url(#amber-grad)" strokeWidth="0.8" opacity="0.5" />
      
      {/* Grade cartográfica - Linhas verticais */}
      <line x1="9" y1="6" x2="9" y2="18" stroke="url(#amber-grad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="12" y1="6" x2="12" y2="18" stroke="url(#amber-grad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="6" x2="15" y2="18" stroke="url(#amber-grad)" strokeWidth="0.8" opacity="0.5" />
      
      {/* Check elegante no centro */}
      <path
        d="M9 12 L11 14 L15 10"
        stroke="url(#amber-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.95"
      />
    </svg>
  );
}

const pillars = [
  {
    name: branding.pillars.tech.uiName,
    icon: Code,
    result: "Ferramentas de automação geotecnológicas",
    href: branding.pillars.tech.href,
    microtag: branding.pillars.tech.microtag,
    color: "cyan",
    labsCertified: true,
  },
  {
    name: branding.pillars.studio.uiName,
    icon: Layers,
    result: "Cartografia, relatórios e serviços especializados",
    href: branding.pillars.studio.href,
    microtag: branding.pillars.studio.microtag,
    color: "indigo",
    labsCertified: true,
  },
  {
    name: branding.pillars.strategy.uiName,
    icon: Map,
    result: "Mapas estratégicos e análises geopolíticas globais",
    microtag: branding.pillars.strategy.microtag,
    href: branding.pillars.strategy.href,
    color: "emerald",
    labsCertified: true,
  },
  {
    name: branding.pillars.academy.uiName,
    icon: GraduationCap,
    result: "Cursos aplicados de alta performance e objetivos",
    href: branding.pillars.academy.href,
    microtag: branding.pillars.academy.microtag,
    color: "purple",
    labsCertified: true,
  },
  {
    name: branding.pillars.labs.uiName,
    icon: ValidationSealIcon,
    result: "Engenharia de Produto Geoespacial & Validação.",
    href: branding.pillars.labs.href,
    microtag: branding.pillars.labs.microtag,
    color: "amber",
    labsCertified: false,
    validationSeal: true, // Selo especial: "Órgão de Validação"
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Cinco pilares conectados — com validação contínua pelo Labs."
          subtitle="Automação (Tech) → Serviços (Studio) → Inteligência (Strategy) → Formação (Academy) → Labs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const colorClasses = {
              amber: {
                bg: "from-amber-500/10 via-amber-600/5 to-amber-500/10",
                iconColor: "text-amber-400",
              },
              cyan: {
                bg: "from-cyan-500/10 via-cyan-600/5 to-cyan-500/10",
                iconColor: "text-cyan-400",
              },
              indigo: {
                bg: "from-indigo-500/10 via-indigo-600/5 to-indigo-500/10",
                iconColor: "text-indigo-400",
              },
              emerald: {
                bg: "from-emerald-500/10 via-emerald-600/5 to-emerald-500/10",
                iconColor: "text-emerald-400",
              },
              purple: {
                bg: "from-purple-500/10 via-purple-600/5 to-purple-500/10",
                iconColor: "text-purple-400",
              },
            };

            const colors = colorClasses[pillar.color as keyof typeof colorClasses];

            return (
              <Card
                key={pillar.name}
                className={`group relative bg-gradient-to-br ${colors.bg} p-8 h-full flex flex-col`}
              >
                <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className={`w-7 h-7 ${colors.iconColor} flex-shrink-0`} />
                    <div className="flex flex-col items-end gap-2">
                      {pillar.microtag && (
                        <Badge variant="accent" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          {pillar.microtag}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-bold text-white">{pillar.name}</h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      {pillar.result}
                    </p>
                  </div>
                  <ButtonLink
                    href={pillar.href}
                    variant="secondary"
                    accentColor={pillar.color as "amber" | "cyan" | "indigo" | "emerald" | "purple"}
                    className="self-start"
                  >
                    Explorar
                    <ArrowRight className="w-4 h-4" />
                  </ButtonLink>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selo institucional discreto */}
        <p className="text-xs text-slate-500/70 text-center mt-12 leading-relaxed">
          Padrões institucionais de qualidade e validação contínua são conduzidos pelo LandSpace Labs.
        </p>
      </div>
    </section>
  );
}
