"use client";

import Image from "next/image";
import AcademyCourseCard from "@/components/AcademyCourseCard";
import { ACADEMY_COURSES } from "../data";
import { Layers, Code, Brain } from "lucide-react";

// Mapear ícones para strings (para serialização)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Code,
  Brain,
};

export default function AcademyCursosPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-purple-lg"></div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-8">
                <div className="relative w-20 h-20">
                  <Image
                    src="/logo-academy.png"
                    alt="LandSpace Academy Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Todos os Cursos
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light max-w-2xl mx-auto">
                Formação especializada em automação e inteligência geoespacial
              </p>
            </div>
          </div>
        </section>

        {/* Cursos - Grid 2x3 (6 cards) */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {ACADEMY_COURSES.map((course, idx) => {
                // Encontrar o nome do ícone comparando com os ícones conhecidos
                const iconName = Object.keys(iconMap).find(
                  name => iconMap[name] === course.icon
                ) || 'Layers'; // fallback
                
                // Mapear ACADEMY_COURSES para o formato esperado pelo AcademyCourseCard
                const courseForCard = {
                  slug: course.slug,
                  title: course.title,
                  subtitle: course.subtitle,
                  iconName: iconName as 'Layers' | 'Code' | 'Brain',
                  capabilities: course.capabilities,
                  overview: course.overview,
                  methodology: course.methodology,
                  audience: course.audience,
                };
                return (
                  <AcademyCourseCard key={course.slug} course={courseForCard} index={idx} />
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
