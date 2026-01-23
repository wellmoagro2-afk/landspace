"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function NewsletterCard() {
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
    
    // Reset após 3 segundos
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="newsletter" className="py-24 bg-[#05070C] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 border-[rgba(255,255,255,0.08)] hover:border-[#00B86B]/30 transition-all duration-300 relative overflow-hidden bg-[#070B14]/70 backdrop-blur-md">
          {/* Halo verde discreto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00B86B]/5 via-transparent to-[#00B86B]/5 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[rgba(255,255,255,0.92)] tracking-tight">
                Receba os briefings
              </h2>
              <p className="text-lg text-[rgba(255,255,255,0.66)]">
                1 e-mail por semana. Sem spam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.46)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.46)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00B86B] text-white rounded-xl font-semibold text-base shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitted ? (
                    "✓ Inscrito!"
                  ) : isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Receber atualizações
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[rgba(255,255,255,0.46)] text-center">
                1 e-mail/semana. Sem spam. Cancelamento a qualquer momento.
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
