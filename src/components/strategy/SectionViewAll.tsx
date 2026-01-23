"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionViewAllProps {
  href: string;
  label?: string;
  placement?: "top" | "bottom" | "both";
  className?: string;
}

export default function SectionViewAll({
  href,
  label = "Ver todos",
  placement = "both",
  className = "",
}: SectionViewAllProps) {
  const baseClasses = `
    inline-flex items-center gap-2 
    text-emerald-400 hover:text-emerald-300 
    font-semibold text-base 
    transition-all duration-300 
    group
    min-h-[44px] px-2 py-2
    hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]
    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 rounded
    active:opacity-80
  `;

  const topClasses = `
    ${baseClasses}
    hidden md:inline-flex
  `;

  const bottomClasses = `
    ${baseClasses}
    md:hidden
    mt-6 md:mt-0
    self-start
  `;

  const renderLink = (classes: string, show: boolean) => {
    if (!show) return null;
    
    return (
      <Link
        href={href}
        className={`${classes} ${className}`}
        aria-label={`${label} - Navegar para página completa`}
      >
        <span>{label}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    );
  };

  return (
    <>
      {/* Top placement - Desktop/Tablet */}
      {renderLink(
        topClasses,
        placement === "top" || placement === "both"
      )}
      
      {/* Bottom placement - Mobile only */}
      {renderLink(
        bottomClasses,
        placement === "bottom" || placement === "both"
      )}
    </>
  );
}
