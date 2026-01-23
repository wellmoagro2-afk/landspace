"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, ExternalLink, ChevronDown, Shield, FlaskConical, User } from "lucide-react";
import { branding } from "@/lib/branding";
import { useCart } from "@/contexts/CartContext";
import { logNavEvent, logNavError } from "@/lib/navigationDebug";
import { cn } from "@/lib/utils";

type HeaderVariant = 'global' | 'tech' | 'studio' | 'strategy' | 'academy' | 'labs';

type NavLink = {
  href: string;
  label: string;
  conditional?: boolean;
  external?: boolean;
};

interface HeaderProps {
  variant?: HeaderVariant;
  minimal?: boolean; // Esconde CTA e favoritos quando true
}

export default function Header({ variant = 'global', minimal = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getFavoriteAcademyCourses, getFavoriteCourses } = useCart();
  
  // Contar favoritos baseado no variant
  const favoriteCount = variant === 'academy' 
    ? getFavoriteAcademyCourses().length 
    : getFavoriteCourses().length;

  // Scroll handler - debounced para performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detectar hash ativo para Strategy - otimizado e sem race conditions
  useEffect(() => {
    if (variant === 'strategy' && pathname === '/strategy') {
      const updateActiveHash = () => {
        const hash = window.location.hash.replace('#', '');
        const newHash = hash || 'briefings';
        if (newHash !== activeHash) {
          logNavEvent('Hash changed', { from: activeHash, to: newHash });
          setActiveHash(newHash);
        }
      };

      // Atualizar hash inicial
      updateActiveHash();
      
      // Listener para mudanças de hash (navegação direta ou botão voltar)
      window.addEventListener('hashchange', updateActiveHash);
      
      // Detectar scroll para atualizar hash ativo (debounced)
      const handleScroll = () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          const sections = ['briefings', 'mapas', 'podcast', 'newsletter'];
          const scrollPosition = window.scrollY + 100;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const top = element.offsetTop;
              const bottom = top + element.offsetHeight;
              if (scrollPosition >= top && scrollPosition < bottom) {
                const newHash = section;
                if (newHash !== activeHash) {
                  logNavEvent('Scroll detected section', { section: newHash });
                  setActiveHash(newHash);
                  // Atualizar URL sem recarregar (usando router do Next.js)
                  window.history.replaceState(null, '', `#${newHash}`);
                }
                break;
              }
            }
          }
        }, 100); // Debounce de 100ms
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('hashchange', updateActiveHash);
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    } else {
      // Reset hash quando não está em /strategy
      setActiveHash("");
    }
  }, [variant, pathname, activeHash]);

  // Handler para scroll suave em âncoras - usando router do Next.js
  // Protegido contra race conditions e com fallbacks robustos
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Proteção SSR: garantir que estamos no cliente
    if (typeof window === 'undefined') {
      logNavError('handleAnchorClick called on server', { href });
      return;
    }
    
    logNavEvent('Anchor click', { href, currentPath: pathname });
    
    const hash = href.split('#')[1];
    if (!hash) {
      logNavError('No hash found in href', { href });
      return;
    }
    
    // Se já estamos na rota correta, apenas fazer scroll
    const currentPath = pathname;
    const targetPath = href.split('#')[0] || '/strategy';
    
    if (currentPath === targetPath) {
      // Mesma rota: apenas scroll (mais rápido e confiável)
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveHash(hash);
        // Atualizar URL sem recarregar
        window.history.replaceState(null, '', href);
        logNavEvent('Scroll completed on same route', { hash });
      } else {
        logNavError('Element not found for hash on same route', { hash, href });
      }
    } else {
      // Rota diferente: navegar primeiro, depois scroll
      logNavEvent('Navigating to different route', { from: currentPath, to: targetPath, hash });
      
      // Navegar usando Next.js Router
      router.push(href);
      
      // Função helper para fazer scroll com retry
      // Aguardar a navegação do Next.js completar antes de tentar scroll
      const scrollToHash = (attempt = 0): void => {
        const maxAttempts = 10; // Aumentar tentativas para dar mais tempo
        const delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]; // Delays progressivos mais longos
        
        if (attempt >= maxAttempts) {
          // Não logar como erro se o elemento simplesmente não existe
          // Pode ser que o hash não corresponda a nenhum elemento na página
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Nav Debug] Element with hash "${hash}" not found after ${maxAttempts} attempts. This may be normal if the element doesn't exist on the target page.`, { hash, href });
          }
          return;
        }
        
        // Verificar se estamos na rota correta antes de procurar o elemento
        const currentPath = window.location.pathname;
        if (currentPath !== targetPath) {
          // Ainda não navegou, aguardar mais
          setTimeout(() => scrollToHash(attempt + 1), delays[attempt] || 500);
          return;
        }
        
        const element = document.getElementById(hash);
        if (element) {
          // Aguardar um frame adicional para garantir que o layout está estável
          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveHash(hash);
            logNavEvent('Scroll completed after navigation', { hash, attempt });
          });
        } else {
          // Retry com delay progressivo
          setTimeout(() => scrollToHash(attempt + 1), delays[attempt] || 500);
        }
      };
      
      // Aguardar um pouco mais antes de iniciar tentativas (dar tempo para Next.js renderizar)
      setTimeout(() => scrollToHash(0), 100);
    }
  }, [router, pathname]);

  // Configurações por variante
  type VariantConfig = {
    color: string;
    hoverColor: string;
    buttonGradient: string;
    buttonHover: string;
    buttonShadow: string;
    navLinks: NavLink[];
    exploreLinks?: NavLink[];
    ctaHref: string;
    ctaLabel: string;
  };
  
  const variantConfig: Record<HeaderVariant, VariantConfig> = {
    global: {
      color: 'cyan',
      hoverColor: '', // Será aplicado via style inline
      buttonGradient: 'from-cyan-500 to-blue-600',
      buttonHover: 'hover:from-cyan-400 hover:to-blue-500',
      buttonShadow: 'hover:shadow-cyan-500/50',
      navLinks: [
        { href: branding.pillars.tech.href, label: branding.pillars.tech.uiName },
        { href: branding.pillars.studio.href, label: branding.pillars.studio.uiName },
        { href: branding.pillars.strategy.href, label: branding.pillars.strategy.uiName },
        { href: branding.pillars.academy.href, label: branding.pillars.academy.uiName },
        { href: branding.pillars.labs.href, label: branding.pillars.labs.uiName },
      ] as NavLink[],
      ctaHref: '/tech',
      ctaLabel: 'Explorar Ferramentas',
    },
    tech: {
      color: 'cyan',
      hoverColor: 'hover:text-cyan-400',
      buttonGradient: 'from-cyan-500 to-blue-600',
      buttonHover: 'hover:from-cyan-400 hover:to-blue-500',
      buttonShadow: 'hover:shadow-cyan-500/50',
      navLinks: [
        { href: '/tech', label: 'Tech', conditional: true }, // Só aparece quando não está em /tech
        { href: '/corporativo', label: 'Corporativo' },
        { href: '/suporte', label: 'Suporte' },
      ] as NavLink[],
      ctaHref: '/catalogo',
      ctaLabel: 'Ver Catálogo',
    },
    strategy: {
      color: 'emerald',
      hoverColor: 'hover:text-[#00B86B]',
      buttonGradient: 'from-[#00B86B] to-[#00A85F]',
      buttonHover: 'hover:from-[#00A85F] hover:to-[#00B86B]',
      buttonShadow: 'hover:shadow-[#00B86B]/50',
      navLinks: [
        { href: '/strategy#briefings', label: 'Briefings' },
      ] as NavLink[],
      exploreLinks: [
        { href: '/strategy#mapas', label: 'Mapas' },
        { href: '/strategy#podcast', label: 'Podcast' },
      ] as NavLink[],
      ctaHref: '/strategy#newsletter',
      ctaLabel: 'Receber atualizações',
    },
    academy: {
      color: 'purple',
      hoverColor: 'hover:text-purple-400',
      buttonGradient: 'from-purple-500 to-purple-600',
      buttonHover: 'hover:from-purple-400 hover:to-purple-500',
      buttonShadow: 'hover:shadow-purple-500/50',
      navLinks: [
        { href: '/academy', label: 'Academy', conditional: true }, // Só aparece em subpastas
        { href: '/academy/suporte', label: 'Suporte' },
        { href: 'https://pay.hotmart.com/login', label: 'Área do Aluno', external: true },
      ],
      ctaHref: '/academy/cursos',
      ctaLabel: 'Ver Cursos',
    },
    studio: {
      color: 'indigo',
      hoverColor: 'hover:text-indigo-400',
      buttonGradient: 'from-indigo-500 to-indigo-600',
      buttonHover: 'hover:from-indigo-400 hover:to-indigo-500',
      buttonShadow: 'hover:shadow-indigo-500/50',
      navLinks: [
        { href: '/studio/todos-servicos', label: 'Serviços', conditional: true }, // Não aparece em /studio/todos-servicos
        { href: '/studio/suporte', label: 'Suporte' },
        { href: '/studio', label: 'Studio', conditional: true }, // Só aparece em subpastas
      ],
      ctaHref: '/studio/orcamento',
      ctaLabel: 'Solicitar orçamento',
    },
    labs: {
      color: 'amber',
      hoverColor: 'hover:text-amber-400',
      buttonGradient: 'from-amber-500 to-amber-600',
      buttonHover: 'hover:from-amber-400 hover:to-amber-500',
      buttonShadow: 'hover:shadow-amber-500/50',
      navLinks: [
        { href: '/labs#benchmarks', label: 'Benchmarks' },
        { href: '/labs#protocols', label: 'Protocolos' },
        { href: '/labs#datasets', label: 'Datasets' },
      ],
      ctaHref: '/labs#benchmarks',
      ctaLabel: 'Explorar Labs',
    },
  };

  const config = variantConfig[variant];
  const borderColor = variant === 'labs' ? 'border-amber-500/20' : variant === 'tech' ? 'border-cyan-500/20' : variant === 'studio' ? 'border-indigo-500/20' : variant === 'strategy' ? 'border-[rgba(255,255,255,0.08)]' : variant === 'academy' ? 'border-purple-500/20' : 'border-white/10';

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    if (variant === 'strategy' && exploreDropdownOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setExploreDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [exploreDropdownOpen, variant]);

  return (
    <header className={`sticky top-0 z-50 bg-[#05070C]/95 backdrop-blur-md border-b ${borderColor} ${variant === 'strategy' ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Sempre leva para Home Global */}
          <Link 
            href="/" 
            className={`text-xl md:text-2xl font-bold text-white tracking-tight font-outfit transition-all duration-300 ${
              isScrolled ? 'text-lg md:text-xl' : ''
            }`}
          >
            LandSpace
          </Link>

          {/* Navigation - Alinhado à direita */}
          <nav className="hidden md:flex items-center gap-6 ml-auto mr-6">
            {config.navLinks.map((link: NavLink, index: number) => {
              const isActive = variant === 'academy' && pathname === link.href;
              const activeClass = isActive ? 'text-purple-400 border-b-2 border-purple-400/50 pb-1' : '';
              // Para variant global, usar #9fb7c9 no hover (cor do logo) - aplicado via CSS
              const hoverColor = variant === 'global' ? '' : config.hoverColor;
              
              // Verificar se o link deve ser exibido condicionalmente
              if (link.conditional) {
                if (variant === 'academy') {
                  // Menu "Academy" só aparece em subpastas (qualquer rota /academy/* exceto /academy)
                  const isInSubfolder = pathname.startsWith('/academy/') && pathname !== '/academy';
                  if (!isInSubfolder) {
                    return null;
                  }
                } else if (variant === 'tech') {
                  // Menu "Tech" só aparece quando NÃO está na página /tech
                  if (pathname === '/tech') {
                    return null;
                  }
                } else if (variant === 'studio') {
                  // Lógica específica para links do Studio
                  if (link.href === '/studio') {
                    // Menu "Studio" só aparece em subpastas (qualquer rota /studio/* exceto /studio)
                    const isInSubfolder = pathname.startsWith('/studio/') && pathname !== '/studio';
                    if (!isInSubfolder) {
                      return null;
                    }
                  } else if (link.href === '/studio/todos-servicos') {
                    // Menu "Serviços" não aparece quando está na própria página de serviços
                    if (pathname === '/studio/todos-servicos') {
                      return null;
                    }
                  }
                }
              }
              
              if (link.external) {
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:scale-105",
                      variant === 'global' ? "header-link-global" : "text-slate-300",
                      variant !== 'global' && hoverColor,
                      activeClass
                    )}
                  >
                    {link.label}
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                );
              }
              // Para links Strategy com âncoras, usar Link do Next.js com scroll suave
              const isStrategyAnchor = variant === 'strategy' && link.href.includes('#');
              
              if (isStrategyAnchor) {
                const hash = link.href.split('#')[1];
                const isActive = activeHash === hash || (pathname === '/strategy' && !activeHash && hash === 'briefings');
                const activeClassStrategy = isActive 
                  ? 'text-[#00B86B] border-b border-[#00B86B]/60 pb-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#00B86B] after:opacity-60 after:shadow-[0_0_8px_rgba(0,184,107,0.4)]' 
                  : 'text-[rgba(255,255,255,0.66)]';
                
                return (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={`text-sm font-medium ${activeClassStrategy} ${config.hoverColor} transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00B86B]/50 focus:ring-offset-2 focus:ring-offset-[#05070C] rounded px-1`}
                  >
                    {link.label}
                  </Link>
                );
              }
              
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#02040a] rounded",
                    variant === 'global' ? "header-link-global" : "text-slate-300",
                    variant !== 'global' && hoverColor,
                    activeClass
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Dropdown "Explorar" para Strategy */}
            {variant === 'strategy' && config.exploreLinks && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgba(255,255,255,0.66)] hover:text-[#00B86B] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00B86B]/50 focus:ring-offset-2 focus:ring-offset-[#05070C] rounded px-1"
                  aria-expanded={exploreDropdownOpen}
                  aria-haspopup="true"
                >
                  Explorar
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {exploreDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-[#05070C]/98 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg py-2 z-50">
                    {config.exploreLinks.map((link: NavLink, index: number) => {
                      const hash = link.href.split('#')[1];
                      const isActive = activeHash === hash;
                      const activeClassStrategy = isActive 
                        ? 'text-[#00B86B] bg-[rgba(0,184,107,0.1)]' 
                        : 'text-[rgba(255,255,255,0.66)] hover:text-[#00B86B] hover:bg-[rgba(0,184,107,0.05)]';
                      
                      return (
                        <Link
                          key={index}
                          href={link.href}
                          onClick={(e) => {
                            handleAnchorClick(e, link.href);
                            setExploreDropdownOpen(false);
                          }}
                          className={`block px-4 py-2 text-sm font-medium ${activeClassStrategy} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B86B]/50 focus:ring-inset`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Actions */}
          {!minimal && (
            <div className="flex items-center gap-4">
              {/* Favorites Button - Oculto na página Strategy e Studio */}
              {variant !== 'strategy' && variant !== 'studio' && (
                <Link
                  href={variant === 'academy' ? '/academy/favoritos' : '/favoritos'}
                  className={`relative p-2 rounded-lg text-slate-300 ${config.hoverColor} transition-colors duration-300 group`}
                  aria-label="Favoritos"
                >
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-purple-500 text-white text-xs font-bold rounded-full border-2 border-slate-950">
                      {favoriteCount > 99 ? '99+' : favoriteCount}
                    </span>
                  )}
                </Link>
              )}

              {/* CTA Buttons - Mobile */}
              {variant === 'strategy' ? (
                <div className="md:hidden flex items-center gap-2">
                  <Link
                    href="/strategy/consultancy"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#00B86B] text-[#00B86B] rounded-lg text-xs font-mono font-medium hover:bg-[#00B86B]/10 transition-all duration-300"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    CONSULTORIA
                  </Link>
                  {config.ctaHref.includes('#') ? (
                    <Link
                      href={config.ctaHref}
                      onClick={(e) => handleAnchorClick(e, config.ctaHref)}
                      className="px-4 py-2 bg-[#00B86B] text-white rounded-lg text-sm font-semibold hover:bg-[#00A85F] transition-all duration-300"
                    >
                      Atualizações
                    </Link>
                  ) : (
                    <Link
                      href={config.ctaHref}
                      className={`px-4 py-2 bg-gradient-to-r ${config.buttonGradient} text-white rounded-lg text-sm font-semibold hover:shadow-lg ${config.buttonShadow} transition-all duration-300`}
                    >
                      Explorar
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  {config.ctaHref.includes('#') && (variant === 'strategy' as HeaderVariant) ? (
                    <Link
                      href={config.ctaHref}
                      onClick={(e) => handleAnchorClick(e, config.ctaHref)}
                      className={`md:hidden px-4 py-2 bg-gradient-to-r ${config.buttonGradient} text-white rounded-xl text-sm font-semibold hover:shadow-lg ${config.buttonShadow} transition-all duration-300`}
                    >
                      Explorar
                    </Link>
                  ) : (
                    <Link
                      href={config.ctaHref}
                      className={`md:hidden px-4 py-2 bg-gradient-to-r ${config.buttonGradient} text-white rounded-xl text-sm font-semibold hover:shadow-lg ${config.buttonShadow} transition-all duration-300`}
                    >
                      Explorar
                    </Link>
                  )}
                </>
              )}

              {/* CTA Buttons - Desktop */}
              {variant === 'strategy' ? (
                <div className="hidden md:flex items-center gap-3">
                  {/* Botão Consultoria Estratégica */}
                  <Link
                    href="/strategy/consultancy"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#00B86B] text-[#00B86B] rounded-xl text-xs font-mono font-medium hover:bg-[#00B86B]/10 hover:border-[#00B86B]/80 transition-all duration-300"
                  >
                    <Shield className="w-4 h-4" />
                    CONSULTORIA ESTRATÉGICA
                  </Link>
                  
                  {/* Botão Receber Atualizações */}
                  {config.ctaHref.includes('#') ? (
                    <Link
                      href={config.ctaHref}
                      onClick={(e) => handleAnchorClick(e, config.ctaHref)}
                      className={`inline-flex items-center justify-center px-6 py-2.5 bg-[#00B86B] text-white rounded-xl text-sm font-semibold hover:bg-[#00A85F] hover:shadow-lg hover:shadow-[#00B86B]/50 transition-all duration-300`}
                    >
                      {config.ctaLabel}
                    </Link>
                  ) : (
                    <Link
                      href={config.ctaHref}
                      className={`inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r ${config.buttonGradient} text-white rounded-xl text-sm font-semibold hover:shadow-lg ${config.buttonShadow} ${config.buttonHover} transition-all duration-300`}
                    >
                      {config.ctaLabel}
                    </Link>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  {config.ctaHref.includes('#') && (variant === 'strategy' as HeaderVariant) ? (
                    <Link
                      href={config.ctaHref}
                      onClick={(e) => handleAnchorClick(e, config.ctaHref)}
                      className={`inline-flex items-center justify-center px-6 py-2.5 bg-[#00B86B] text-white rounded-xl text-sm font-semibold hover:bg-[#00A85F] hover:shadow-lg hover:shadow-[#00B86B]/50 transition-all duration-300`}
                    >
                      {config.ctaLabel}
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={config.ctaHref}
                        className={`inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r ${config.buttonGradient} text-white rounded-xl text-sm font-semibold hover:shadow-lg ${config.buttonShadow} ${config.buttonHover} transition-all duration-300`}
                      >
                        {config.ctaLabel}
                      </Link>
                      {variant === 'studio' && (
                        <Link
                          href="/studio/portal"
                          className="inline-flex items-center gap-2 justify-center px-6 py-2.5 border border-indigo-500/50 text-indigo-400 rounded-xl text-sm font-semibold hover:bg-indigo-500/10 hover:border-indigo-500/80 transition-all duration-300"
                        >
                          <User className="w-4 h-4" />
                          Entrar
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
