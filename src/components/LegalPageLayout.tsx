"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  version?: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, version, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Simplificado */}
      <header className="bg-white border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-8 w-8 flex-shrink-0">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:opacity-80 transition-opacity"
                >
                  {/* Centro da bússola - quadrado dividido diagonalmente */}
                  <rect x="18" y="18" width="4" height="4" fill="#0f172a" />
                  <path d="M18 18 L22 22 L20 20 Z" fill="#06b6d4" />
                  <path d="M22 18 L18 22 L20 20 Z" fill="#06b6d4" />
                  
                  {/* Pontos cardeais principais (maiores) - Azul Marinho */}
                  <rect x="19" y="5" width="2" height="6" fill="#0f172a" />
                  <rect x="19" y="29" width="2" height="6" fill="#0f172a" />
                  <rect x="5" y="19" width="6" height="2" fill="#0f172a" />
                  <rect x="29" y="19" width="6" height="2" fill="#0f172a" />
                  
                  {/* Pontos intercardeais (menores) - Ciano */}
                  <rect x="20" y="9" width="1" height="4" fill="#06b6d4" transform="rotate(45 20.5 11)" />
                  <rect x="20" y="27" width="1" height="4" fill="#06b6d4" transform="rotate(45 20.5 29)" />
                  <rect x="9" y="20" width="4" height="1" fill="#06b6d4" transform="rotate(45 11 20.5)" />
                  <rect x="27" y="20" width="4" height="1" fill="#06b6d4" transform="rotate(45 29 20.5)" />
                </svg>
              </div>
              <div className="font-bold leading-tight">
                <div className="text-[#0f172a] font-bold text-lg">LAND</div>
                <div className="text-[#06b6d4] font-semibold flex items-center gap-1.5 text-sm">
                  <span className="h-px w-3 bg-[#06b6d4]"></span>
                  SPACE
                  <span className="h-px w-3 bg-[#06b6d4]"></span>
                </div>
              </div>
            </Link>

            {/* Botão Voltar */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
          </div>
        </div>
      </header>

      {/* Container de Conteúdo */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho do Documento */}
        <div className="mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-slate-500">
            {version ? `${version} | ` : ""}Data: {lastUpdated}
          </p>
        </div>

        {/* Conteúdo do Documento */}
        <div className="prose prose-slate prose-lg max-w-none">
          <div className="text-slate-800 leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer Simplificado */}
      <footer className="bg-white border-t border-slate-200/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-slate-500">
            <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
              LandSpace
            </Link>
            {" • "}
            <span>Copyright © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

