"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Variant = "tech" | "studio" | "strategy" | "academy" | "labs" | "global";

export function useVariant(variant?: Variant) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    
    // Se variant foi passado explicitamente, usa ele
    if (variant) {
      body.setAttribute("data-variant", variant);
      return;
    }

    // Caso contrário, detecta pela rota
    if (pathname.startsWith("/tech")) {
      body.setAttribute("data-variant", "tech");
    } else if (pathname.startsWith("/studio")) {
      body.setAttribute("data-variant", "studio");
    } else if (pathname.startsWith("/strategy")) {
      body.setAttribute("data-variant", "strategy");
    } else if (pathname.startsWith("/academy")) {
      body.setAttribute("data-variant", "academy");
    } else if (pathname.startsWith("/labs")) {
      body.setAttribute("data-variant", "labs");
    } else {
      body.setAttribute("data-variant", "global");
    }
  }, [pathname, variant]);
}
