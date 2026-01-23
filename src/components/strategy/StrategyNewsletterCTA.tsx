"use client";

import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface StrategyNewsletterCTAProps {
  variant?: "hero" | "compact";
  onSubscribe?: () => void;
}

export default function StrategyNewsletterCTA({ 
  variant = "hero",
  onSubscribe 
}: StrategyNewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    
    if (onSubscribe) {
      onSubscribe();
    }
    
    // Reset após 3 segundos
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const router = useRouter();
  
  const scrollToNewsletter = () => {
    // Se não estiver em /strategy, navegar primeiro
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/strategy')) {
      router.push('/strategy#newsletter');
      // Aguardar navegação antes de scrollar
      setTimeout(() => {
        const element = document.getElementById("newsletter");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Já está em /strategy, apenas scrollar
      const element = document.getElementById("newsletter");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Atualizar hash na URL
        window.history.replaceState(null, '', '#newsletter');
      }
    }
  };

  if (variant === "hero") {
    return (
      <section className="relative py-20 bg-[#05070C] overflow-hidden">
        {/* Glow verde sutil nas bordas */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00B86B]/5 via-transparent to-[#00B86B]/5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B86B]/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B86B]/30 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgba(255,255,255,0.92)] tracking-tight">
              Receba atualizações
            </h2>
            <p className="text-lg text-[rgba(255,255,255,0.66)] max-w-2xl mx-auto">
              1 e-mail por semana. Sem spam. Curadoria de briefings, mapas e podcast.
            </p>
            <div className="flex justify-center pt-4">
              <button
                onClick={scrollToNewsletter}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00B86B] text-white rounded-xl font-semibold text-base shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00B86B]/50 focus:ring-offset-2 focus:ring-offset-[#05070C]"
              >
                Receber atualizações
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant: compact
  return (
    <Card className="p-6 bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] hover:border-[#00B86B]/30 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[rgba(255,255,255,0.92)] mb-1">
            Receba atualizações
          </h3>
          <p className="text-sm text-[rgba(255,255,255,0.66)]">
            1 e-mail/semana. Sem spam.
          </p>
        </div>
        <button
          onClick={scrollToNewsletter}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B86B] text-white rounded-xl font-semibold text-sm hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B86B]/50 focus:ring-offset-2 focus:ring-offset-[#05070C]"
        >
          Inscrever-se
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
