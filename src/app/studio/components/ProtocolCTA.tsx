"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface ProtocolCTAProps {
  serviceId: string;
  ctaText?: string;
}

export default function ProtocolCTA({ serviceId, ctaText = "SOLICITAR PROTOCOLO PERICIAL/AVALIAÇÃO" }: ProtocolCTAProps) {
  return (
    <div className="text-center py-12 mb-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Pronto para iniciar o protocolo?
        </h2>
        <p className="text-slate-300 mb-6">
          Envie sua demanda e receba um protocolo detalhado com escopo, cronograma e investimento.
        </p>
        <ButtonLink
          href={`/studio/protocolo-pericial?service=${serviceId}`}
          variant="primary"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </ButtonLink>
      </div>
    </div>
  );
}
