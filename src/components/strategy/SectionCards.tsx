"use client";

import Link from "next/link";
import { FileText, Map, Headphones } from "lucide-react";
import { Card } from "@/components/ui/Card";

const sections = [
  {
    icon: FileText,
    title: "Briefings",
    description: "Textos curtos (1–4 páginas), síntese + evidências + mapas. Análises geopolíticas diretas e acionáveis.",
    href: "/strategy/briefings",
  },
  {
    icon: Map,
    title: "Mapas",
    description: "Mapas interativos e briefings visuais. Visualizações geoespaciais que contam histórias complexas.",
    href: "/strategy/maps",
  },
  {
    icon: Headphones,
    title: "Podcast",
    description: "Áudio curto (5–20 min) com contexto e leitura estratégica. Análises profundas em formato conversacional.",
    href: "/strategy/podcast",
  },
];

export default function SectionCards() {
  return (
    <section className="py-24 bg-[#05070C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[rgba(255,255,255,0.92)] tracking-tight">
            O que você encontra aqui
          </h2>
          <p className="text-lg text-[rgba(255,255,255,0.66)] max-w-2xl mx-auto">
            Conteúdo editorial orientado por dados geoespaciais, sem vendas ou promessas vazias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link key={index} href={section.href}>
                <Card className="p-8 hover:border-[#00B86B]/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,184,107,0.15)] transition-all duration-300 cursor-pointer h-full">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center w-14 h-14">
                      <Icon className="w-7 h-7 text-[#00B86B]" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-[rgba(255,255,255,0.92)]">{section.title}</h3>
                      <p className="text-base text-[rgba(255,255,255,0.66)] leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
