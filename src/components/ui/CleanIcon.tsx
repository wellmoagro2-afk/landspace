import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CleanIconProps {
  children: ReactNode;
  className?: string;
  bgColor?: "none" | "subtle";
}

/**
 * Componente para ícones sem sombra/glow/blur
 * Remove completamente qualquer efeito visual que crie "bolha" ou halo ao redor do ícone
 */
export default function CleanIcon({ 
  children, 
  className = "",
  bgColor = "none"
}: CleanIconProps) {
  const bgClass = bgColor === "subtle" ? "bg-white/5" : "";
  
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center clean-icon",
        bgClass,
        className
      )}
    >
      <span className="inline-flex items-center justify-center clean-icon">
        {children}
      </span>
    </span>
  );
}
