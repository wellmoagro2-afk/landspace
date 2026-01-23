"use client";

/**
 * Word Cloud Item Component
 * CSP-compliant: usa classes CSS discretas (sem inline styles ou CSS variables)
 */

interface WordCloudItemProps {
  term: string;
  fontSizeClass: string;
  opacityClass: string;
  fontWeightClass: string;
  color: string;
  textShadow: string;
  floatDelay: number;
  floatDuration: number;
  hoverColor?: string;
  hoverTextShadow?: string;
}

/**
 * Converte delay em segundos para classe de delay em ms (discretizado em passos de 100ms)
 */
function getDelayClass(delaySeconds: number): string {
  const delayMs = Math.round(delaySeconds * 1000);
  const clamped = Math.max(0, Math.min(5000, delayMs));
  const step = Math.round(clamped / 100) * 100;
  return `ad-${step}`;
}

/**
 * Converte duração em segundos para classe de duração
 */
function getDurationClass(durationSeconds: number): string {
  if (durationSeconds <= 4.25) return 'dur-4000';
  if (durationSeconds <= 4.75) return 'dur-4500';
  if (durationSeconds <= 5.25) return 'dur-5000';
  if (durationSeconds <= 5.75) return 'dur-5500';
  return 'dur-6000';
}

/**
 * Converte cor hex para classe CSS
 */
function getColorClass(color: string): string {
  if (color === '#38bdf8' || color === '#22d3ee') return 'word-cyan-light';
  if (color === '#06b6d4') return 'word-cyan';
  if (color === '#86efac') return 'word-emerald-light';
  if (color === '#4ade80') return 'word-emerald';
  if (color === '#f59e0b') return 'word-amber';
  // Fallback para cores não mapeadas (usar Tailwind arbitrário se necessário)
  return '';
}

/**
 * Converte text-shadow para classe CSS
 */
function getTextShadowClass(textShadow: string, colorTheme: 'cyan' | 'emerald' | 'amber' = 'cyan'): string {
  if (textShadow === 'none') return 'word-shadow-none';
  
  // Detectar intensidade pela presença de valores
  if (textShadow.includes('15px') || textShadow.includes('30px')) {
    return `word-shadow-${colorTheme}-xl`;
  }
  if (textShadow.includes('8px') || textShadow.includes('16px')) {
    return `word-shadow-${colorTheme}-lg`;
  }
  if (textShadow.includes('6px') || textShadow.includes('12px')) {
    return `word-shadow-${colorTheme}-md`;
  }
  if (textShadow.includes('3px') || textShadow.includes('6px')) {
    return `word-shadow-${colorTheme}-sm`;
  }
  
  return 'word-shadow-none';
}

/**
 * Detecta tema de cor para hover
 */
function getHoverColorClass(hoverColor?: string): string {
  if (!hoverColor) return '';
  if (hoverColor === '#06b6d4') return 'word-hover-cyan';
  if (hoverColor === '#4ade80') return 'word-hover-emerald';
  if (hoverColor === '#f59e0b') return 'word-hover-amber';
  return '';
}

/**
 * Detecta tema de cor para hover shadow
 */
function getHoverShadowClass(hoverTextShadow?: string): string {
  if (!hoverTextShadow) return '';
  if (hoverTextShadow.includes('212')) return 'word-hover-shadow-cyan';
  if (hoverTextShadow.includes('185')) return 'word-hover-shadow-emerald';
  if (hoverTextShadow.includes('158')) return 'word-hover-shadow-amber';
  return '';
}

export function WordCloudItem({
  term,
  fontSizeClass,
  opacityClass,
  fontWeightClass,
  color,
  textShadow,
  floatDelay,
  floatDuration,
  hoverColor,
  hoverTextShadow,
}: WordCloudItemProps) {
  // Calcular classes CSS discretas
  const delayClass = getDelayClass(floatDelay);
  const durationClass = getDurationClass(floatDuration);
  const colorClass = getColorClass(color);
  
  // Detectar tema de cor para text-shadow
  const colorTheme = color.includes('212') || color.includes('182') || color === '#06b6d4' || color === '#22d3ee' || color === '#38bdf8'
    ? 'cyan'
    : color.includes('185') || color.includes('129') || color === '#4ade80' || color === '#86efac'
    ? 'emerald'
    : 'amber';
  
  const textShadowClass = getTextShadowClass(textShadow, colorTheme);
  const hoverColorClass = getHoverColorClass(hoverColor);
  const hoverShadowClass = getHoverShadowClass(hoverTextShadow);
  
  // Se cor não mapeada, usar Tailwind arbitrário (sem style attr)
  const colorAttr = colorClass || `text-[${color}]`;
  
  // Montar className final
  const baseClasses = `pulse-word-item inline-block transition-all duration-300 cursor-default ${fontSizeClass} ${opacityClass} ${fontWeightClass} lowercase tracking-wide my-1 mx-2 ${delayClass} ${durationClass} ${colorAttr} ${textShadowClass} ${hoverColorClass} ${hoverShadowClass}`;

  return (
    <span
      className={baseClasses.trim()}
      onMouseEnter={(e) => {
        e.currentTarget.classList.add('scale-110', 'opacity-100', 'z-10');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove('scale-110', 'opacity-100', 'z-10');
      }}
    >
      {term}
    </span>
  );
}
