import SafeMDXRemote from "@/components/security/SafeMDXRemote";
import { mdxComponents } from "@/lib/mdx-components";
import ProcedimentosFlowchart from "./ProcedimentosFlowchart";

interface MaterialMetodoSectionProps {
  areaEstudo?: string;
  basesDados?: string;
  procedimentos?: string[];
}

/**
 * Seção Material e Método (Compartimentado)
 * Renderiza: Área de Estudo, Bases de Dados e Procedimentos
 */
export default function MaterialMetodoSection({
  areaEstudo,
  basesDados,
  procedimentos,
}: MaterialMetodoSectionProps) {
  const hasContent = areaEstudo || basesDados || (procedimentos && procedimentos.length > 0);

  if (!hasContent) {
    return null;
  }

  return (
    <section className="material-metodo-section my-12">
      <h2 className="text-3xl font-bold mb-8 war-room-section-h2">
        Material e Método
      </h2>

      {/* Área de Estudo */}
      {areaEstudo && (
        <div className="area-estudo mb-8">
          <h3 className="text-xl font-semibold mb-4 war-room-section-h3">
            Área de Estudo
          </h3>
          <div className="prose prose-invert max-w-none war-room-prose">
            <SafeMDXRemote source={areaEstudo} components={mdxComponents} />
          </div>
        </div>
      )}

      {/* Bases de Dados */}
      {basesDados && (
        <div className="bases-dados mb-8">
          <h3 className="text-xl font-semibold mb-4 war-room-section-h3">
            Bases de Dados
          </h3>
          <div className="prose prose-invert max-w-none war-room-prose">
            <SafeMDXRemote source={basesDados} components={mdxComponents} />
          </div>
        </div>
      )}

      {/* Procedimentos (Fluxograma) */}
      {procedimentos && procedimentos.length > 0 && (
        <div className="procedimentos">
          <ProcedimentosFlowchart procedimentos={procedimentos} />
        </div>
      )}
    </section>
  );
}
