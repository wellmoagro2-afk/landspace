"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import AcademyCourseCard from "@/components/AcademyCourseCard";
import { Heart, Layers, Code, Brain } from "lucide-react";
import Link from "next/link";

// Mapear ícones para strings (para serialização)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Code,
  Brain,
};

export default function AcademyFavoritosPage() {
  const { getFavoriteAcademyCourses } = useCart();
  const allFavoriteCourses = getFavoriteAcademyCourses();
  const [showAll, setShowAll] = useState(false);
  
  // Exibir apenas os primeiros 6 inicialmente
  const favoriteCourses = showAll ? allFavoriteCourses : allFavoriteCourses.slice(0, 6);
  const hasMoreCourses = allFavoriteCourses.length > 6;

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-purple-lg"></div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="mb-4">
                <Heart className="w-8 h-8 text-purple-400 fill-current mx-auto" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Meus Favoritos
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {allFavoriteCourses.length === 0
                  ? "Você ainda não favoritou nenhum curso. Explore nossos cursos e adicione aos favoritos!"
                  : "Seus cursos favoritos estão salvos aqui. Acesse quando quiser e continue seus estudos."}
              </p>
            </div>
          </div>
        </section>

        {/* Cursos Favoritados */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {allFavoriteCourses.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3">
                  Nenhum curso favoritado ainda
                </h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Explore nossos cursos e adicione aos favoritos para acessá-los facilmente depois.
                </p>
                <Link
                  href="/academy/cursos"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-purple-500/50 hover:from-purple-400 hover:to-purple-500 transition-all duration-300"
                >
                  Ver Todos os Cursos
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {favoriteCourses.map((course, index) => {
                    // Encontrar o nome do ícone comparando com os ícones conhecidos
                    const iconName = Object.keys(iconMap).find(
                      name => iconMap[name] === course.icon
                    ) || 'Layers'; // fallback
                    
                    // Mapear para o formato esperado pelo AcademyCourseCard
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
                      <AcademyCourseCard key={course.slug} course={courseForCard} index={index} />
                    );
                  })}
                </div>

                {hasMoreCourses && !showAll && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-purple-500/50 hover:from-purple-400 hover:to-purple-500 transition-all duration-300"
                    >
                      Ver Mais Cursos ({allFavoriteCourses.length - 6} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </div>
  );
}
