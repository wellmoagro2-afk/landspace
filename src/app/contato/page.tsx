"use client";

import { useEffect, useRef, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";

type Variant = 'global' | 'tech' | 'academy' | 'strategy';

function ContatoContent() {
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  // Derivar variant diretamente do searchParams e referrer (sem state)
  const variant = useMemo<Variant>(() => {
    const variantParam = searchParams.get('variant') as Variant | null;
    
    if (variantParam && ['global', 'tech', 'academy', 'strategy'].includes(variantParam)) {
      return variantParam;
    }
    
    if (typeof window !== 'undefined') {
      // Detectar pelo referrer
      const referrer = document.referrer;
      if (referrer.includes('/tech')) {
        return 'tech';
      } else if (referrer.includes('/academy')) {
        return 'academy';
      } else if (referrer.includes('/strategy')) {
        return 'strategy';
      }
    }
    
    return 'global';
  }, [searchParams]);

  // Configurações de estilo por variante
  const variantStyles = {
    global: {
      gridColor: 'rgba(34, 211, 238, 1)', // Cyan
      glowTop: 'bg-cyan-500/5',
      glowBottom: 'bg-emerald-500/5',
      accentColor: 'text-cyan-400',
    },
    tech: {
      gridColor: 'rgba(34, 211, 238, 1)', // Cyan
      glowTop: 'bg-cyan-500/5',
      glowBottom: 'bg-cyan-500/5',
      accentColor: 'text-cyan-400',
    },
    academy: {
      gridColor: 'rgba(168, 85, 247, 1)', // Purple
      glowTop: 'bg-purple-500/5',
      glowBottom: 'bg-purple-500/5',
      accentColor: 'text-purple-400',
    },
    strategy: {
      gridColor: 'rgba(0, 184, 107, 1)', // Verde Esmeralda
      glowTop: 'bg-[#00B86B]/5',
      glowBottom: 'bg-[#00B86B]/5',
      accentColor: 'text-[#00B86B]',
    },
  };

  const styles = variantStyles[variant];

  // Definir CSS variable para a cor do grid
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.setProperty('--grid-color', styles.gridColor);
    }
  }, [styles.gridColor]);

  return (
    <div className="min-h-screen bg-[#05070C] relative" data-variant={variant}>
      {/* Grid Pattern Sutil - Personalizado por variante */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-dynamic"
      ></div>

      <Header variant={variant} minimal={true} />

      <main className="relative z-10">
        {/* Hero Section - Personalizado por variante */}
        <section className="relative py-24 md:py-32 lg:py-40 bg-[#05070C] overflow-hidden">
          {/* Background glows sutis - Personalizado por variante */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 -right-40 w-96 h-96 ${styles.glowTop} rounded-full blur-3xl`}></div>
            <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${styles.glowBottom} rounded-full blur-3xl`}></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Vamos conversar?
              </h1>
              <p className="text-lg md:text-xl text-[rgba(255,255,255,0.66)] max-w-2xl mx-auto leading-relaxed">
                Dúvidas, soluções estratégicas ou ajuda — estamos à disposição.
              </p>
            </div>
          </div>
        </section>

        {/* Formulário Section - Centralizado */}
        <section className="py-12 md:py-20 bg-[#05070C]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm variant={variant} />
          </div>
        </section>
      </main>

      <Footer variant={variant} hideCTA={true} />
      <WhatsAppButton />
    </div>
  );
}

export default function ContatoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#05070C] flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    }>
      <ContatoContent />
    </Suspense>
  );
}
