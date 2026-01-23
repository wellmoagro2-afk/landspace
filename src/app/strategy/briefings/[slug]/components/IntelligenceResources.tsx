"use client";

import { FileText, Map } from "lucide-react";

interface IntelligenceResourcesProps {
  briefingSlug: string;
  hasMap?: boolean;
}

/**
 * Box "RECURSOS DE INTELIGÊNCIA" - War Room Style
 * Contém: Briefings (PDF), Mapa Estratégico (PDF)
 */
export default function IntelligenceResources({ 
  briefingSlug, 
  hasMap = false 
}: IntelligenceResourcesProps) {
  const handlePrintReport = () => {
    // Adiciona classe para identificar impressão de relatório
    document.body.classList.add('print-report-mode');
    window.print();
    // Remove a classe após um delay
    setTimeout(() => {
      document.body.classList.remove('print-report-mode');
    }, 1000);
  };

  const handlePrintMap = () => {
    // Adiciona classe para identificar impressão de mapa
    document.body.classList.add('print-map-mode');
    window.print();
    // Remove a classe após um delay
    setTimeout(() => {
      document.body.classList.remove('print-map-mode');
    }, 1000);
  };

  return (
    <div className="war-room-glass p-5 rounded-lg">
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 war-room-section-title">
        // RECURSOS DE INTELIGÊNCIA
      </h3>
      
      <div className="space-y-3">
        {/* Botão Briefings (PDF) */}
        <button
          onClick={handlePrintReport}
          className="w-full intelligence-resource-button inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs border no-underline transition-all war-room-intelligence-button"
          title="Gerar PDF do briefing completo"
        >
          <FileText className="w-4 h-4" />
          BRIEFINGS (PDF)
        </button>

        {/* Botão Mapa Estratégico (PDF) - apenas se houver mapa */}
        {hasMap && (
          <button
            onClick={handlePrintMap}
            className="w-full intelligence-resource-button inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs border no-underline transition-all war-room-intelligence-button"
            title="Gerar PDF do mapa estratégico em alta resolução"
          >
            <Map className="w-4 h-4" />
            MAPA ESTRATÉGICO (PDF)
          </button>
        )}
      </div>
    </div>
  );
}
