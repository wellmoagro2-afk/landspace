"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LabsPulseWordCloud from "@/components/labs/LabsPulseWordCloud";
import { FileText, Database, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { branding } from "@/lib/branding";

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="labs">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-amber-lg"></div>

      <Header variant="labs" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#02040a]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Logo - Ponto Focal Central */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <Image
                  src="/logo-labs.png"
                  alt="LandSpace Labs Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.4)] drop-shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                  priority
                />
                {/* Glow adicional para efeito de flutuação */}
                <div className="absolute inset-0 bg-amber-500/15 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>

            {/* Texto "LandSpace Labs" abaixo do logo */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgba(255,255,255,0.92)]">
                <span className="inline-flex items-baseline gap-2 font-mono uppercase tracking-wider">
                  <span className="text-2xl md:text-3xl text-[rgba(255,255,255,0.46)] font-light">LandSpace</span>
                  <span className="text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold">Labs</span>
                </span>
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-300 mb-6 leading-tight">
              Engenharia de Produto Geoespacial & Validação
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              O LandSpace Labs é a camada institucional responsável por transformar métodos e modelos em produtos geotecnológicos robustos, auditáveis e escaláveis, assegurando validação contínua, padrões de qualidade e consistência em todo o ecossistema LandSpace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#benchmarks"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold text-base shadow-lg shadow-amber-500/30 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                Explorar Benchmarks
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#protocols"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900/50 border border-amber-500/30 text-amber-400 rounded-xl font-semibold text-base hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300"
              >
                Ver Protocolos
              </Link>
            </div>
          </div>
        </section>

        {/* Pulse Word Cloud */}
        <LabsPulseWordCloud />

        {/* Benchmarks Section */}
        <section id="benchmarks" className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-amber-500" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Benchmarks
                </h2>
              </div>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Validação e benchmarking de métodos geoespaciais para garantir reprodutibilidade, rastreabilidade e padrões de qualidade em produtos geotecnológicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "USLE vs RUSLE",
                  description: "Comparação detalhada entre Universal Soil Loss Equation e Revised Universal Soil Loss Equation para modelagem de erosão.",
                  status: "Em desenvolvimento",
                },
                {
                  title: "Algoritmos de Classificação",
                  description: "Benchmark de algoritmos de machine learning para classificação de uso e cobertura do solo.",
                  status: "Em desenvolvimento",
                },
                {
                  title: "Interpolação Espacial",
                  description: "Comparação de métodos de interpolação (Kriging, IDW, Spline) para diferentes tipos de dados.",
                  status: "Em desenvolvimento",
                },
              ].map((benchmark, idx) => (
                <div
                  key={idx}
                  className="relative backdrop-blur-xl border rounded-2xl p-8 bg-[rgba(5,7,12,0.6)] border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-card-amber"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{benchmark.title}</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">{benchmark.description}</p>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-mono border border-amber-500/20">
                    <Sparkles className="w-3 h-3" />
                    {benchmark.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protocols & Standards Section */}
        <section id="protocols" className="py-24 bg-[#05070C] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-amber-500" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Protocolos & Padrões
                </h2>
              </div>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Padronização de outputs, automação de processos e validação contínua (QA/QC) para garantir arquitetura, performance e consistência em produtos geoespaciais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Engenharia de Produto",
                  items: [
                    "Arquitetura e padronização de outputs geoespaciais",
                    "Performance e otimização de processos automatizados",
                    "Automação de pipelines e workflows",
                    "Consistência e escalabilidade de produtos",
                  ],
                },
                {
                  title: "Validação & QA/QC",
                  items: [
                    "Reprodutibilidade e rastreabilidade metodológica",
                    "Validação contínua de qualidade (QA/QC)",
                    "Documentação e versionamento de protocolos",
                    "Relatórios de validação automatizados",
                  ],
                },
              ].map((protocol, idx) => (
                <div
                  key={idx}
                  className="relative backdrop-blur-xl border rounded-2xl p-8 bg-[rgba(5,7,12,0.6)] border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-card-amber"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">{protocol.title}</h3>
                  <ul className="space-y-3">
                    {protocol.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Datasets Section */}
        <section id="datasets" className="py-24 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Database className="w-8 h-8 text-amber-500" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Repositórios de Dados
                </h2>
              </div>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Integração com Tech, Studio, Strategy e Academy: o Labs retroalimenta todo o ecossistema LandSpace com padrões validados, métodos reprodutíveis e produtos escaláveis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Dados de Referência",
                  description: "Conjuntos de dados validados para calibração e teste de algoritmos.",
                  type: "Raster & Vector",
                },
                {
                  title: "Ground Truth",
                  description: "Dados de campo e validação para classificação e detecção de mudanças.",
                  type: "Field Data",
                },
                {
                  title: "Synthetic Datasets",
                  description: "Dados sintéticos gerados para testes controlados de metodologias.",
                  type: "Simulated",
                },
              ].map((dataset, idx) => (
                <div
                  key={idx}
                  className="relative backdrop-blur-xl border rounded-2xl p-8 bg-[rgba(5,7,12,0.6)] border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-card-amber"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{dataset.title}</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">{dataset.description}</p>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-mono border border-amber-500/20">
                    {dataset.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer variant="labs" />
      <WhatsAppButton />
    </div>
  );
}
