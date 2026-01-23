import SafeMDXRemote from "@/components/security/SafeMDXRemote";
import { mdxComponents } from "@/lib/mdx-components";
import BriefingMapEmbed from "@/components/strategy/BriefingMapEmbed";

interface ResultadosDiscussaoSectionProps {
  resultadosDiscussao?: string;
  mapEmbedUrl?: string;
  mapUrl?: string;
  mapDownloadPath?: string;
}

/**
 * Seção Resultados e Discussão
 * Destaque máximo para o Mapa (se disponível)
 */
export default function ResultadosDiscussaoSection({
  resultadosDiscussao,
  mapEmbedUrl,
  mapUrl,
  mapDownloadPath,
}: ResultadosDiscussaoSectionProps) {
  const hasMap = !!(mapEmbedUrl || mapUrl || mapDownloadPath);

  if (!resultadosDiscussao && !hasMap) {
    return null;
  }

  return (
    <section className="resultados-discussao-section my-12">
      <h2 className="text-3xl font-bold mb-8 war-room-section-h2">
        Resultados e Discussão
      </h2>

      {/* Mapa em Destaque (se disponível) */}
      {hasMap && (
        <div className="mapa-destaque mb-12">
          <div className="border rounded-lg overflow-hidden war-room-map-container war-room-border">
            <BriefingMapEmbed
              mapEmbedUrl={mapEmbedUrl}
              mapDownloadPath={mapDownloadPath}
              title="Mapa Interativo - Resultados e Discussão"
            />
          </div>
        </div>
      )}

      {/* Conteúdo de Resultados e Discussão */}
      {resultadosDiscussao && (
        <div className="prose prose-invert max-w-none war-room-prose">
          <SafeMDXRemote source={resultadosDiscussao} components={mdxComponents} />
        </div>
      )}
    </section>
  );
}
