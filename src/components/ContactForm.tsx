"use client";

import { useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";

type Variant = 'global' | 'tech' | 'academy' | 'strategy';

interface ContactFormProps {
  variant?: Variant;
}

export default function ContactForm({ variant = 'global' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configurações de estilo por variante
  const variantStyles = {
    global: {
      focusRing: 'focus:ring-cyan-400/50 focus:border-cyan-400/50',
      buttonGradient: 'from-cyan-400 to-cyan-600',
      buttonHover: 'hover:from-cyan-300 hover:to-cyan-500',
      buttonShadow: 'shadow-cyan-400/35 hover:shadow-cyan-400/50',
      buttonFocus: 'focus:ring-cyan-400/50',
    },
    tech: {
      focusRing: 'focus:ring-cyan-400/50 focus:border-cyan-400/50',
      buttonGradient: 'from-cyan-400 to-cyan-600',
      buttonHover: 'hover:from-cyan-300 hover:to-cyan-500',
      buttonShadow: 'shadow-cyan-400/35 hover:shadow-cyan-400/50',
      buttonFocus: 'focus:ring-cyan-400/50',
    },
    academy: {
      focusRing: 'focus:ring-purple-400/50 focus:border-purple-400/50',
      buttonGradient: 'from-purple-500 to-purple-600',
      buttonHover: 'hover:from-purple-400 hover:to-purple-500',
      buttonShadow: 'shadow-purple-500/35 hover:shadow-purple-500/50',
      buttonFocus: 'focus:ring-purple-400/50',
    },
    strategy: {
      focusRing: 'focus:ring-[#00B86B]/50 focus:border-[#00B86B]/50',
      buttonGradient: 'from-[#00B86B] to-[#00A85F]',
      buttonHover: 'hover:from-[#00A85F] hover:to-[#00B86B]',
      buttonShadow: 'shadow-[#00B86B]/35 hover:shadow-[#00B86B]/50',
      buttonFocus: 'focus:ring-[#00B86B]/50',
    },
  };

  const styles = variantStyles[variant];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    // Aqui você pode adicionar lógica de sucesso/erro
  };

  return (
    <div className="space-y-8">
      {/* Card do Formulário - Glassmorphism */}
      <div className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 md:p-10 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome - Full Width */}
          <div>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome completo"
              required
              disabled={isSubmitting}
              className={`w-full px-4 py-3.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl text-white placeholder:text-white/45 focus:outline-none focus:ring-2 ${styles.focusRing} transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          </div>

          {/* Email e Assunto - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                required
                disabled={isSubmitting}
                className={`w-full px-4 py-3.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl text-white placeholder:text-white/45 focus:outline-none focus:ring-2 ${styles.focusRing} transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            </div>
            <div>
              <input
                type="text"
                name="assunto"
                placeholder="Assunto"
                disabled={isSubmitting}
                className={`w-full px-4 py-3.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl text-white placeholder:text-white/45 focus:outline-none focus:ring-2 ${styles.focusRing} transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            </div>
          </div>

          {/* Mensagem - Full Width */}
          <div>
            <textarea
              name="mensagem"
              placeholder="Como podemos ajudar?"
              required
              rows={6}
              disabled={isSubmitting}
              className={`w-full px-4 py-3.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-xl text-white placeholder:text-white/45 focus:outline-none focus:ring-2 ${styles.focusRing} transition-all resize-y text-base min-h-[140px] disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r ${styles.buttonGradient} text-white rounded-xl font-semibold text-base shadow-lg ${styles.buttonShadow} ${styles.buttonHover} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 ${styles.buttonFocus} focus:ring-offset-2 focus:ring-offset-[#05070C]`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar mensagem"
              )}
            </button>
            <a
              href="https://wa.me/5564999082421"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold text-base shadow-lg shadow-[#10b981]/30 hover:from-[#34d399] hover:to-[#10b981] hover:shadow-[#10b981]/45 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 focus:ring-offset-2 focus:ring-offset-[#05070C]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
