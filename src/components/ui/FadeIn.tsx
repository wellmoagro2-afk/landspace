"use client";

import { useEffect, useState, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Mapeia duration (ms) para classes Tailwind de transition-duration
 */
function getDurationClass(duration: number): string {
  const durationMap: Record<number, string> = {
    100: 'duration-100',
    150: 'duration-150',
    200: 'duration-200',
    300: 'duration-300',
    400: 'duration-[400ms]',
    500: 'duration-500',
    600: 'duration-[600ms]',
    700: 'duration-700',
    800: 'duration-[800ms]',
    1000: 'duration-1000',
  };

  // Retorna classe mapeada ou a mais próxima
  if (durationMap[duration]) {
    return durationMap[duration];
  }

  // Fallback: encontrar a classe mais próxima
  const sortedDurations = Object.keys(durationMap).map(Number).sort((a, b) => a - b);
  const closest = sortedDurations.reduce((prev, curr) => 
    Math.abs(curr - duration) < Math.abs(prev - duration) ? curr : prev
  );

  return durationMap[closest] || 'duration-700';
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 400,
  className = "",
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Verificar prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);

    // Aplicar animação após montagem
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldAnimate) {
    return <>{children}</>;
  }

  const durationClass = getDurationClass(duration);

  return (
    <div
      className={`fade-in transition-opacity transition-transform ${durationClass} ${className}`}
      data-visible={isVisible ? "true" : "false"}
    >
      {children}
    </div>
  );
}
