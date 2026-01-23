"use client";

/**
 * Fluxograma Vertical Sutil para Procedimentos
 * Renderiza uma lista de procedimentos como um fluxograma visual
 * com linhas finas e círculos numerados
 */
interface ProcedimentosFlowchartProps {
  procedimentos: string[];
}

export default function ProcedimentosFlowchart({ procedimentos }: ProcedimentosFlowchartProps) {
  if (!procedimentos || procedimentos.length === 0) {
    return null;
  }

  return (
    <div className="procedimentos-flowchart my-8">
      <h3 className="text-xl font-semibold mb-6 war-room-section-h3">
        Pipeline Metodológico
      </h3>
      
      <div className="flowchart-container relative pl-8">
        {/* Linha vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 war-room-flowchart-line" />
        
        {/* Itens do fluxograma */}
        <div className="space-y-6">
          {procedimentos.map((procedimento, index) => (
            <div key={index} className="flowchart-item relative flex items-start gap-4">
              {/* Círculo numerado */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 font-semibold text-sm relative z-10 war-room-flowchart-circle">
                {index + 1}
              </div>
              
              {/* Conteúdo */}
              <div className="flex-1 pt-1 prose prose-invert max-w-none war-room-prose">
                <p className="m-0 leading-relaxed">{procedimento}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
