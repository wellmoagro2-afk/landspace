"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import styles from "./WhatsAppButton.module.css";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  phoneNumber = "5564999082421",
  message = "Olá, gostaria de saber mais sobre as soluções de automação da LandSpace."
}: WhatsAppButtonProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [isBubbleClosed, setIsBubbleClosed] = useState(() => {
    // Lazy initializer: verifica se o balão já foi mostrado nas últimas 24h
    if (typeof window !== 'undefined') {
      const bubbleShown = localStorage.getItem('whatsapp-bubble-shown');
      if (bubbleShown) {
        const shownTime = parseInt(bubbleShown, 10);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
        
        // Se ainda não passaram 24h, não mostra o balão
        if (now - shownTime < twentyFourHours) {
          return true;
        }
      }
    }
    return false;
  });
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Pular se já foi fechado (detectado no lazy initializer)
    if (isBubbleClosed) {
      return;
    }

    // Mostra o balão após 4 segundos
    const showTimer = setTimeout(() => {
      setShowBubble(true);
      // Salva o timestamp atual no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('whatsapp-bubble-shown', Date.now().toString());
      }
    }, 4000);

    // Auto-hide após 10 segundos (4s delay + 10s visível = 14s total)
    const hideTimer = setTimeout(() => {
      setShowBubble(false);
      setIsBubbleClosed(true);
    }, 14000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isBubbleClosed]);

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setIsBubbleClosed(true);
    // Salva o timestamp para não mostrar novamente por 24h
    if (typeof window !== 'undefined') {
      localStorage.setItem('whatsapp-bubble-shown', Date.now().toString());
    }
  };

  const handleBubbleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={styles.whatsappWidgetContainer}>
        {/* Smart Message Bubble */}
        {showBubble && !isBubbleClosed && (
          <div 
            className={styles.whatsappBubble}
            onClick={handleBubbleClick}
          >
            {/* Botão de fechar */}
            <button
              onClick={handleCloseBubble}
              className={styles.whatsappBubbleClose}
              aria-label="Fechar mensagem"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Conteúdo do balão */}
            <div>
              <div className={styles.whatsappBubbleTitle}>
                LandSpace - Suporte Técnico
              </div>
              <div className={styles.whatsappBubbleText}>
                Como podemos ajudar você hoje?
              </div>
            </div>

            {/* Rabicho apontando para o botão */}
            <div className={styles.whatsappBubbleTail}></div>
          </div>
        )}

        {/* Botão Flutuante do WhatsApp - Dark Tech Metálico */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.whatsappButton} group relative`}
          aria-label="Fale conosco no WhatsApp"
        >
          {/* Ícone */}
          <MessageCircle className="w-6 h-6 relative z-10 text-white drop-shadow-lg" />
        </a>
      </div>
    </>
  );
}


