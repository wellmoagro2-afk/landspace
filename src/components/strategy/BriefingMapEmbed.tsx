import { Download } from "lucide-react";

interface BriefingMapEmbedProps {
  mapEmbedUrl?: string;
  mapDownloadPath?: string;
  title?: string;
}

export default function BriefingMapEmbed({
  mapEmbedUrl,
  mapDownloadPath,
  title = "Mapa do Briefing",
}: BriefingMapEmbedProps) {
  if (!mapEmbedUrl && !mapDownloadPath) {
    return null;
  }

  return (
    <div className="mt-12 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgba(255,255,255,0.92)]">
          {title}
        </h2>
        {mapDownloadPath && (
          <a
            href={mapDownloadPath}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] rounded-lg font-medium hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Baixar mapa
          </a>
        )}
      </div>

      {mapEmbedUrl ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#070B14]">
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full border-0"
            title={title}
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : mapDownloadPath ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#070B14] to-[#05070C] flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-[rgba(255,255,255,0.66)]">
              Visualização do mapa disponível para download
            </p>
            <a
              href={mapDownloadPath}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B86B] text-white rounded-xl font-semibold hover:bg-[#00A85F] transition-colors"
            >
              <Download className="w-5 h-5" />
              Baixar mapa
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
