/**
 * Design System Tokens - Strategy Vertical
 * Cor-acento: Verde (#00B86B)
 * Padrão: Big Tech (dark premium + glassmorphism sutil)
 */

export const strategyTokens = {
  // Cores principais (valores exatos especificados)
  accent: {
    primary: '#00B86B', // --strategy-primary
    primaryHover: '#00A85F', // --strategy-primary-hover
    primarySoft: 'rgba(0,184,107,0.16)', // --strategy-primary-soft
    glow: 'rgba(0,184,107,0.35)', // --strategy-glow
  },
  
  // Backgrounds
  bg: {
    base: '#05070C', // --bg-0
    panel: '#070B14', // --bg-1
    soft: 'rgba(0,184,107,0.16)',
    medium: 'rgba(0,184,107,0.24)',
  },
  
  // Bordas
  border: {
    stroke: 'rgba(255,255,255,0.08)', // --stroke
    subtle: 'rgba(0,184,107,0.2)',
    medium: 'rgba(0,184,107,0.3)',
    strong: 'rgba(0,184,107,0.5)',
    hover: 'rgba(0,184,107,0.6)',
  },
  
  // Textos
  text: {
    primary: 'rgba(255,255,255,0.92)', // --text-1
    secondary: 'rgba(255,255,255,0.66)', // --text-2
    muted: 'rgba(255,255,255,0.46)', // --text-3
    accent: '#00B86B',
    accentHover: '#00A85F',
  },
  
  // Shadows e glows (sutis, sem estourar)
  shadow: {
    soft: '0 2px 8px rgba(0, 0, 0, 0.2)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(0,184,107,0.15)',
    glowStrong: '0 0 30px rgba(0,184,107,0.25)',
  },
  
  // Focus rings
  ring: {
    focus: 'focus:ring-2 focus:ring-[#00B86B]/50',
    focusOffset: 'focus:ring-offset-2 focus:ring-offset-[#05070C]',
  },
  
  // Botões
  button: {
    primary: {
      bg: 'bg-[#00B86B]',
      hover: 'hover:bg-[#00A85F]',
      shadow: 'shadow-lg shadow-[#00B86B]/30',
      shadowHover: 'hover:shadow-[#00B86B]/50',
      text: 'text-white',
    },
    secondary: {
      bg: 'bg-[#070B14]/60',
      border: 'border border-[rgba(255,255,255,0.08)]',
      hover: 'hover:bg-[#070B14]/80 hover:border-[#00B86B]/30',
      text: 'text-[rgba(255,255,255,0.92)]',
      textHover: 'hover:text-[#00B86B]',
    },
  },
  
  // Glassmorphism
  glass: {
    bg: 'bg-[#070B14]/70',
    backdrop: 'backdrop-blur-md',
    border: 'border border-[rgba(255,255,255,0.08)]',
  },
} as const;
