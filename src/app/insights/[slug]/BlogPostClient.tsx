"use client";

import Link from "next/link";
import Image from "next/image";
import { COURSES } from "@/app/catalogo/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Clock, Download, Gift, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import type { BlogPost } from "../data";
import type { Course } from "@/app/catalogo/data";
import { HideOnError } from "@/components/shared/HideOnError";

// Função para obter cor do badge por categoria
function getCategoryBadgeColor(category: string) {
  switch (category) {
    case "R":
      return "bg-blue-900/30 text-blue-400 border-blue-500/50";
    case "QGIS":
      return "bg-emerald-900/30 text-emerald-400 border-emerald-500/50";
    case "GEE":
      return "bg-amber-900/30 text-amber-400 border-amber-500/50";
    default:
      return "bg-slate-800/50 text-slate-300 border-slate-700/50";
  }
}

interface BlogPostClientProps {
  post: BlogPost;
  relatedCourse: Course | null;
}

export default function BlogPostClient({ post, relatedCourse }: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-[#02040a]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-[#02040a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/insights" className="hover:text-cyan-400 transition-colors">
                  Insights
                </Link>
                <span>/</span>
                <span className="text-slate-400">{post.category}</span>
              </div>
            </nav>

            {/* Badge da Categoria */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border ${getCategoryBadgeColor(post.category)}`}>
                {post.category}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8">
              {post.title}
            </h1>

            {/* Metadados com Foto do Autor */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-cyan-500/20">
                  <HideOnError>
                    {({ hidden, onError }) => (
                      <Image
                        src="/perfil.jpg"
                        alt={post.author}
                        fill
                        className={`object-cover ${hidden ? 'hidden' : ''}`}
                        onError={onError}
                      />
                    )}
                  </HideOnError>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{post.author}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <span className="text-sm text-slate-500 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Conteúdo do Artigo */}
        <section className="py-16 bg-[#02040a]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Conteúdo Markdown (simplificado) */}
            <article className="prose prose-invert prose-lg max-w-none">
              <div className="text-slate-300 leading-relaxed space-y-6">
                {(() => {
                  const paragraphs = post.content.split("\n").filter(p => p.trim() !== "");
                  let firstParagraphRendered = false;
                  
                  return paragraphs.map((paragraph, idx) => {
                    // Inserir Asset Card após o primeiro parágrafo real (não título, não lista)
                    const isFirstRealParagraph = !firstParagraphRendered && 
                      !paragraph.startsWith("#") && 
                      !paragraph.startsWith("##") && 
                      !paragraph.startsWith("-") &&
                      paragraph.trim().length > 0;
                    
                    if (isFirstRealParagraph) {
                      firstParagraphRendered = true;
                      
                      return (
                        <div key={`content-${idx}`}>
                          <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            {paragraph}
                          </p>
                          {post.hasDownload && (
                            <>
                              {/* Asset Card - Download Gratuito */}
                              <div className="my-12 bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-500/50 rounded-2xl p-8 shadow-lg shadow-cyan-500/20">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 animate-pulse-slow">
                                      <Gift className="w-8 h-8 text-cyan-400" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                      Baixe a Ferramenta Gratuita deste artigo
                                    </h3>
                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                                      Acesse agora o script de automação mencionado neste conteúdo. Use gratuitamente em seus projetos.
                                    </p>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:from-cyan-400 hover:to-blue-500 transition-all">
                                      <Download className="w-5 h-5" />
                                      Fazer Download Agora
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    }
                    
                    if (paragraph.startsWith("# ")) {
                      return (
                        <h2 key={idx} className="text-3xl font-bold text-white mt-12 mb-6">
                          {paragraph.replace("# ", "")}
                        </h2>
                      );
                    }
                    
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">
                          {paragraph.replace("## ", "")}
                        </h3>
                      );
                    }
                    
                    if (paragraph.startsWith("- ")) {
                      return (
                        <li key={idx} className="ml-6 list-disc text-slate-300">
                          {paragraph.replace("- ", "")}
                        </li>
                      );
                    }
                    
                    return (
                      <p key={idx} className="text-lg text-slate-300 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  });
                })()}
              </div>
            </article>

            {/* Upsell Card - Venda do Produto Principal */}
            {relatedCourse && (
              <div className="mt-16 pt-12 border-t border-slate-800">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-8 md:p-10 shadow-xl shadow-cyan-500/10">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                          <Zap className="w-7 h-7 text-cyan-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          Precisa de mais poder de processamento?
                        </h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                          A ferramenta gratuita é apenas o começo. Obtenha a licença do <strong className="text-white font-semibold">{relatedCourse.toolName || relatedCourse.title}</strong>. Uma solução completa, validada e com treinamento de implementação incluso.
                        </p>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <span>Acesso vitalício à ferramenta completa</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <span>Treinamento de implementação passo a passo</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <span>Suporte direto com o desenvolvedor</span>
                          </div>
                        </div>
                        <Link
                          href={`/catalogo/${relatedCourse.slug}`}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-base shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:from-cyan-400 hover:to-blue-500 transition-all"
                        >
                          Obter Toolkit Completo
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}



