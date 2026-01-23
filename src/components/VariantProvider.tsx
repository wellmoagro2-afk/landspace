"use client";

import { useVariant } from "@/lib/useVariant";
import { usePathname } from "next/navigation";

export function VariantProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useVariant(); // Detecta automaticamente pela rota

  return <>{children}</>;
}
