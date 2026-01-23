"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function StrategyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Strategy Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#05070C] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-2xl font-bold text-white">Algo deu errado</h2>
        <p className="text-slate-400">
          Ocorreu um erro ao carregar esta página. Tente novamente.
        </p>
        <Button onClick={reset} variant="primary">
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
