"use client";

import { Download, ExternalLink } from "lucide-react";
import { useState } from "react";

interface PDFButtonProps {
  pdfUrl?: string;
  variant?: "primary" | "secondary";
  showOpen?: boolean;
}

export default function PDFButton({ pdfUrl, variant = "primary", showOpen = true }: PDFButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!pdfUrl) {
    return null;
  }

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // Se for URL externa, abrir em nova aba
      if (pdfUrl.startsWith("http")) {
        window.open(pdfUrl, "_blank");
      } else {
        // Se for arquivo local, fazer download
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdfUrl.split("/").pop() || "briefing.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    window.open(pdfUrl, "_blank");
  };

  if (variant === "primary") {
    return (
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00B86B] text-white rounded-xl font-semibold text-sm shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            "Baixando..."
          ) : (
            <>
              Baixar PDF
              <Download className="w-4 h-4" />
            </>
          )}
        </button>
        {showOpen && (
          <button
            onClick={handleOpen}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] rounded-xl font-semibold text-sm hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-all duration-300"
          >
            Abrir PDF
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] rounded-lg text-sm font-medium hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-all duration-300 disabled:opacity-50"
    >
      {isLoading ? "Baixando..." : "PDF"}
      <Download className="w-4 h-4" />
    </button>
  );
}
