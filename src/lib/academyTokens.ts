/**
 * Design System Tokens - Academy Vertical
 * Cor-acento: Roxo (Purple)
 * Padrão: Big Tech (dark + glass)
 */

export const academyTokens = {
  // Cores principais
  accent: {
    base: 'purple-500',
    hover: 'purple-400',
    light: 'purple-300',
    dark: 'purple-600',
  },
  
  // Backgrounds translúcidos
  bg: {
    soft: 'bg-purple-500/10',
    medium: 'bg-purple-500/20',
    strong: 'bg-purple-500/30',
  },
  
  // Bordas
  border: {
    subtle: 'border-purple-500/20',
    medium: 'border-purple-500/30',
    strong: 'border-purple-500/50',
    hover: 'border-purple-500/60',
  },
  
  // Textos
  text: {
    base: 'text-purple-400',
    hover: 'text-purple-300',
    light: 'text-purple-200',
  },
  
  // Shadows e glows
  shadow: {
    soft: 'shadow-purple-500/20',
    medium: 'shadow-purple-500/50',
    strong: 'shadow-purple-500/70',
    glow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]',
    glowStrong: 'drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]',
  },
  
  // Focus rings
  ring: {
    focus: 'focus:ring-purple-500/50',
    focusOffset: 'focus:ring-offset-2 focus:ring-offset-slate-950',
  },
  
  // Botões
  button: {
    primary: {
      bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      hover: 'hover:from-purple-400 hover:to-purple-500',
      shadow: 'shadow-lg shadow-purple-500/50',
      shadowHover: 'hover:shadow-purple-500/70',
      text: 'text-white',
    },
    secondary: {
      bg: 'bg-slate-900/30',
      border: 'border border-slate-800',
      hover: 'hover:bg-slate-900/50 hover:border-purple-500/30',
      text: 'text-slate-400',
      textHover: 'hover:text-white',
    },
  },
  
  // Badges
  badge: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-white',
  },
} as const;
