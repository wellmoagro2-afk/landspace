"use client";

import { useState, useEffect } from "react";

interface LazyMapEmbedProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Lazy-load iframe de mapa com placeholder elegante
 * Carrega apenas quando visível (IntersectionObserver)
 */
export default function LazyMapEmbed({ src, title, className = "" }: LazyMapEmbedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" } // Carregar 100px antes de ficar visível
    );

    observer.observe(containerRef);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      ref={setContainerRef}
      className={`map-container map-wrapper relative w-full aspect-video rounded-sm overflow-hidden border border-[rgba(0,0,0,0.12)] ${className}`}
    >
      {!isVisible || !isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[rgba(0,0,0,0.02)] to-[rgba(0,0,0,0.05)]">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-[rgba(0,184,107,0.1)] rounded-full flex items-center justify-center border border-[rgba(0,184,107,0.2)]">
              <svg
                className="w-8 h-8 text-[#00B86B] animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <p className="text-sm font-sans text-[#6A6A6A]">Carregando mapa...</p>
          </div>
        </div>
      ) : null}
      
      {isVisible && (
        <iframe
          src={src}
          title={title}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-none"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
