import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function StrategyNotFound() {
  return (
    <div className="min-h-screen bg-[#05070C] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-4xl font-bold text-white">404</h2>
        <p className="text-slate-400">
          A página que você está procurando não foi encontrada.
        </p>
        <ButtonLink href="/strategy" variant="primary">
          Voltar para Strategy
        </ButtonLink>
      </div>
    </div>
  );
}
