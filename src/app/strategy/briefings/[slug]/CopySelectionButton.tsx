"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toastSuccess, toastError } from "@/lib/toast";

export default function CopySelectionButton() {
  const [copied, setCopied] = useState(false);

  const handleCopySelection = async () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim().length === 0) {
      toastError("Selecione um trecho para copiar");
      return;
    }

    try {
      await navigator.clipboard.writeText(selection.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toastSuccess("Trecho copiado", "Pronto para colar.");
    } catch (err) {
      console.error("Erro ao copiar trecho:", err);
      toastError("Erro ao copiar trecho");
    }
  };

  return (
    <button
      onClick={handleCopySelection}
      className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] rounded-lg text-sm font-medium hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
      aria-label="Copiar trecho selecionado"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[#00B86B]" />
          Trecho copiado
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copiar trecho selecionado
        </>
      )}
    </button>
  );
}
