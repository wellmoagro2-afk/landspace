"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CourseCard from "@/components/CourseCard";
import { Heart, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function FavoritosPage() {
  const { getFavoriteCourses } = useCart();
  const favoriteCourses = getFavoriteCourses();
  const [showAll, setShowAll] = useState(false);
  
  // Mostrar apenas os primeiros 6 favoritos inicialmente
  const displayedCourses = showAll ? favoriteCourses : favoriteCourses.slice(0, 6);
  const hasMore = favoriteCourses.length > 6;

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <Header variant="tech" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 bg-slate-950 overflow-hidden">
          {/* Animated background glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/8 rounded-full blur-3xl animate-pulse delay-1000ms"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-4">
                <Heart className="w-8 h-8 text-red-400 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Meus Favoritos
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {favoriteCourses.length === 0
                  ? "Você ainda não favoritou nenhum curso. Explore nossos cursos e adicione aos favoritos!"
                  : "Seus aceleradores de carreira estão salvos aqui. Finalize sua inscrição ou garanta seu lugar na lista de espera."}
              </p>
            </div>
          </div>
        </section>

        {/* Cursos Favoritados */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {favoriteCourses.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3">
                  Nenhuma solução favoritada ainda
                </h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Explore nossas ferramentas e adicione aos favoritos para acessá-las facilmente depois.
                </p>
                <Link
                  href="/catalogo"
                  className="inline-block px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-cyan-500/50 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                >
                  Ver Todas as Soluções
                </Link>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {displayedCourses.map((course, index) => (
                    <CourseCard key={course.slug} course={course} index={index} />
                  ))}
                </div>

                {hasMore && !showAll && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-cyan-500/50 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                    >
                      Ver Mais ({favoriteCourses.length - 6} {favoriteCourses.length - 6 === 1 ? 'favorito' : 'favoritos'})
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer variant="tech" />
      <WhatsAppButton />
    </div>
  );
}


