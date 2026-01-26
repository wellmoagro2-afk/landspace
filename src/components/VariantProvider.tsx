"use client";

import { useVariant } from "@/lib/useVariant";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Variant = "tech" | "studio" | "strategy" | "academy" | "labs" | "global";

interface VariantProviderProps {
  children: React.ReactNode;
  initialVariant?: Variant;
}

/**
 * VariantProvider - Gerencia data-variant no body de forma determinística
 * 
 * ROOT CAUSE FIX: Garante consistência SSR/CSR para evitar hydration mismatch
 * - SSR: layout.tsx define data-variant="global" (ou outro valor determinístico)
 * - CSR: Primeiro render usa initialVariant (mesmo valor do SSR)
 * - Após hydration: useEffect atualiza data-variant baseado na rota atual
 * 
 * Isso garante que o HTML do SSR = HTML esperado no CSR no primeiro render,
 * e qualquer mudança acontece após hydration (via useEffect), evitando warnings.
 */
export function VariantProvider({ 
  children, 
  initialVariant = "global" 
}: VariantProviderProps) {
  const pathname = usePathname();
  
  // ROOT CAUSE FIX: Iniciar com o mesmo valor do SSR para garantir consistência
  // O useState usa initialVariant como valor inicial, garantindo que o primeiro
  // render do client tenha o mesmo data-variant do SSR (já definido no <body> pelo layout.tsx)
  const [currentVariant, setCurrentVariant] = useState<Variant>(initialVariant);
  
  // Helper para agendar callbacks assíncronos
  const defer = (cb: () => void) => {
    if (typeof queueMicrotask === "function") queueMicrotask(cb);
    else setTimeout(cb, 0);
  };
  
  // ROOT CAUSE FIX: Atualizar data-variant APENAS após hydration estar completa
  // O body já tem data-variant={initialVariant} do SSR, então o primeiro render do client
  // deve manter esse valor. Qualquer mudança baseada na rota acontece após hydration.
  // Isso garante SSR = CSR no primeiro render, evitando hydration mismatch.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    let newVariant: Variant = "global";
    
    // Detectar variant baseado na rota (mesma lógica do useVariant)
    if (pathname.startsWith("/tech")) {
      newVariant = "tech";
    } else if (pathname.startsWith("/studio")) {
      newVariant = "studio";
    } else if (pathname.startsWith("/strategy")) {
      newVariant = "strategy";
    } else if (pathname.startsWith("/academy")) {
      newVariant = "academy";
    } else if (pathname.startsWith("/labs")) {
      newVariant = "labs";
    }
    
    // Atualizar apenas se mudou E se for diferente do valor inicial do SSR
    // Isso garante que o primeiro render do client mantenha o valor do SSR
    if (newVariant !== currentVariant) {
      defer(() => {
        setCurrentVariant(newVariant);
        body.setAttribute("data-variant", newVariant);
      });
    }
  }, [pathname, currentVariant]);

  return <>{children}</>;
}
