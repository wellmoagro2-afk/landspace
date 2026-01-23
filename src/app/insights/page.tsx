"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllBlogPosts } from "./data";
import { Clock, BarChart3, Layers, Globe, Map } from "lucide-react";
import { HideOnError } from "@/components/shared/HideOnError";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[#02040a]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-[#02040a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Insights de Geotecnologia
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Estudos de caso, metodologias validadas e avanços científicos aplicados ao mercado.
              </p>
            </div>
          </div>
        </section>

        {/* Lista de Posts */}
        <section className="py-24 bg-[#02040a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Configurações por categoria
                const getCategoryConfig = (category: string) => {
                  switch (category) {
                    case "R":
                      return {
                        gradient: "from-blue-900/40 to-slate-900",
                        gradientHover: "group-hover:from-blue-900/50 group-hover:to-slate-900",
                        icon: BarChart3,
                        iconColor: "text-blue-400",
                        titleHover: "group-hover:text-cyan-400",
                        borderColor: "border-blue-500/30",
                        borderHover: "group-hover:border-cyan-500",
                        layerColors: {
                          base: "from-blue-900/30 to-slate-900/50",
                          layer1: "bg-blue-800/30 border-blue-700/40",
                          layer2: "bg-blue-700/30 border-blue-600/40",
                          layer3: "bg-blue-900/30 border-blue-800/40",
                        },
                        dots: ["bg-blue-500", "bg-blue-400", "bg-blue-300"],
                      };
                    case "QGIS":
                      return {
                        gradient: "from-emerald-900/40 to-slate-900",
                        gradientHover: "group-hover:from-emerald-900/50 group-hover:to-slate-900",
                        icon: Layers,
                        iconColor: "text-emerald-400",
                        titleHover: "group-hover:text-emerald-400",
                        borderColor: "border-emerald-500/30",
                        borderHover: "group-hover:border-emerald-500",
                        layerColors: {
                          base: "from-emerald-900/30 to-slate-900/50",
                          layer1: "bg-emerald-800/30 border-emerald-700/40",
                          layer2: "bg-emerald-700/30 border-emerald-600/40",
                          layer3: "bg-emerald-900/30 border-emerald-800/40",
                        },
                        dots: ["bg-emerald-500", "bg-emerald-400", "bg-emerald-300"],
                      };
                    case "GEE":
                      return {
                        gradient: "from-amber-900/40 to-slate-900",
                        gradientHover: "group-hover:from-amber-900/50 group-hover:to-slate-900",
                        icon: Globe,
                        iconColor: "text-amber-400",
                        titleHover: "group-hover:text-amber-400",
                        borderColor: "border-amber-500/30",
                        borderHover: "group-hover:border-amber-500",
                        layerColors: {
                          base: "from-amber-900/30 to-slate-900/50",
                          layer1: "bg-amber-800/30 border-amber-700/40",
                          layer2: "bg-amber-700/30 border-amber-600/40",
                          layer3: "bg-amber-900/30 border-amber-800/40",
                        },
                        dots: ["bg-amber-500", "bg-amber-400", "bg-amber-300"],
                      };
                    default:
                      return {
                        gradient: "from-slate-900/40 to-slate-900",
                        gradientHover: "group-hover:from-slate-900/50 group-hover:to-slate-900",
                        icon: Map,
                        iconColor: "text-slate-400",
                        titleHover: "group-hover:text-cyan-400",
                        borderColor: "border-slate-500/30",
                        borderHover: "group-hover:border-cyan-500",
                        layerColors: {
                          base: "from-slate-900/30 to-slate-900/50",
                          layer1: "bg-slate-800/30 border-slate-700/40",
                          layer2: "bg-slate-700/30 border-slate-600/40",
                          layer3: "bg-slate-900/30 border-slate-800/40",
                        },
                        dots: ["bg-slate-500", "bg-slate-400", "bg-slate-300"],
                      };
                  }
                };

                const config = getCategoryConfig(post.category);
                const IconComponent = config.icon;

                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    {/* Thumbnail com aspecto de mapas/camadas - Suporte para imagem customizada */}
                    <div className={`relative h-48 bg-gradient-to-b ${config.gradient} ${config.gradientHover} overflow-hidden group-hover:scale-105 transition-all duration-500`}>
                      {/* Badge Superior - Canto superior direito */}
                      {post.hasDownload && !post.isShowcase && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/50 flex items-center gap-1.5 group-hover:from-cyan-500 group-hover:to-cyan-600 transition-all duration-300">
                            <span>🎁</span>
                            <span>Ferramenta de Automação</span>
                          </div>
                        </div>
                      )}
                      {post.isShowcase && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/50 flex items-center gap-1.5 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                            <span>📊</span>
                            <span>Aplicação Prática</span>
                          </div>
                        </div>
                      )}
                      {post.thumbnail ? (
                        <HideOnError>
                          {({ hidden, onError }) => (
                            <Image
                              src={post.thumbnail || ''}
                              alt={post.title}
                              fill
                              className={`object-cover ${hidden ? 'hidden' : ''}`}
                              onError={onError}
                            />
                          )}
                        </HideOnError>
                      ) : (
                        <div className="absolute inset-0 p-4 flex flex-col">
                          {/* Simulação de camadas de mapa */}
                          <div className="flex-1 relative">
                            {/* Camada base - mapa */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.layerColors.base} rounded-lg border-2 ${config.borderColor}`}></div>
                            {/* Camadas sobrepostas */}
                            <div className={`absolute top-2 left-2 w-20 h-16 ${config.layerColors.layer1} rounded border`}></div>
                            <div className={`absolute top-6 right-4 w-16 h-12 ${config.layerColors.layer2} rounded border`}></div>
                            <div className={`absolute bottom-4 left-1/3 w-24 h-14 ${config.layerColors.layer3} rounded border`}></div>
                            {/* Linhas de grade (representando coordenadas) */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
                              <div className="absolute top-1/3 left-0 w-full h-px bg-white"></div>
                              <div className="absolute top-2/3 left-0 w-full h-px bg-white"></div>
                              <div className="absolute top-0 left-0 h-full w-px bg-white"></div>
                              <div className="absolute top-0 left-1/3 h-full w-px bg-white"></div>
                              <div className="absolute top-0 left-2/3 h-full w-px bg-white"></div>
                            </div>
                            {/* Ícone centralizado por categoria */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <IconComponent className={`w-8 h-8 ${config.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                            </div>
                          </div>
                          {/* Legenda de camadas */}
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                            <div className="flex gap-1.5">
                              {config.dots.map((dotColor, idx) => (
                                <div key={idx} className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                              ))}
                            </div>
                            <div className="flex-1 h-1 bg-white/20 rounded"></div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6 space-y-4 bg-slate-900/50">
                      {/* Metadados */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-xl text-xs font-semibold border border-white/10">
                          {post.category}
                        </span>
                        {post.hasDownload && !post.isShowcase && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-cyan-900/20 to-cyan-900/40 text-cyan-400 rounded-xl text-xs font-semibold border border-cyan-800/50 flex items-center gap-1">
                            <span>⚡</span>
                            <span>Download Gratuito</span>
                          </span>
                        )}
                        {post.isShowcase && (
                          <span className="px-2.5 py-1 bg-gradient-to-r from-blue-900/20 to-blue-900/40 text-blue-400 rounded-xl text-xs font-semibold border border-blue-800/50 flex items-center gap-1">
                            <span>👁️</span>
                            <span>Ver Resultado</span>
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Título com cor de hover por categoria */}
                      <h3 className={`text-lg font-bold text-white leading-tight ${config.titleHover} transition-colors line-clamp-2`}>
                        {post.title}
                      </h3>
                      {/* Subtexto */}
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer hideCTA={true} />
      <WhatsAppButton />
    </div>
  );
}

