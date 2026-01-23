"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Aguarda o carregamento completo da página
    const handleLoad = () => {
      setIsFading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Tempo da animação de fade-out
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center ${
        isFading ? "animate-fade-out" : ""
      }`}
    >
      {/* Ícone da Bússola/Estrela com animação de pulso na cor Ciano */}
      <div className="relative">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse-infinite loading-compass-glow"
        >
          {/* Centro da bússola - quadrado dividido diagonalmente */}
          <rect x="36" y="36" width="8" height="8" fill="#0f172a" />
          <path d="M36 36 L44 44 L40 40 Z" fill="#06b6d4" />
          <path d="M44 36 L36 44 L40 40 Z" fill="#06b6d4" />
          
          {/* Pontos cardeais principais (maiores) - Azul Marinho */}
          <rect x="38" y="10" width="4" height="12" fill="#0f172a" />
          <rect x="38" y="58" width="4" height="12" fill="#0f172a" />
          <rect x="10" y="38" width="12" height="4" fill="#0f172a" />
          <rect x="58" y="38" width="12" height="4" fill="#0f172a" />
          
          {/* Pontos intercardeais (menores) - Ciano com glow */}
          <rect x="40" y="18" width="2" height="8" fill="#06b6d4" transform="rotate(45 41 22)" />
          <rect x="40" y="54" width="2" height="8" fill="#06b6d4" transform="rotate(45 41 58)" />
          <rect x="18" y="40" width="8" height="2" fill="#06b6d4" transform="rotate(45 22 41)" />
          <rect x="54" y="40" width="8" height="2" fill="#06b6d4" transform="rotate(45 58 41)" />
        </svg>
      </div>
    </div>
  );
}

