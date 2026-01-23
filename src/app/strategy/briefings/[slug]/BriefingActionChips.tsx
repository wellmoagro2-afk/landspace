"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  FileText,
  Download,
  Map,
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { toastMessages } from "@/lib/toast";
import { usePDFPreview } from "./BriefingPDFWrapper";

interface BriefingActionChipsProps {
  briefing: {
    title: string;
    coverImageUrl?: string;
    pdfUrl?: string;
    mapUrl?: string;
    mapDownloadUrl?: string;
    shareUrl?: string;
    onShowPDFPreview?: () => void;
  };
}

export default function BriefingActionChips({ briefing }: BriefingActionChipsProps) {
  const [copied, setCopied] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const pdfPreviewRef = usePDFPreview();

  const handleCopyLink = async () => {
    const url = briefing.shareUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      toastMessages.copyLink.success();
    } catch (err) {
      console.error("Erro ao copiar link:", err);
      toastMessages.error("Erro ao copiar link");
    }
  };

  const handleShare = async () => {
    const url = briefing.shareUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: briefing.title,
          url: url,
        });
        toastMessages.share.success();
      } catch (err) {
        // Usuário cancelou ou erro - fallback para copiar
        if ((err as Error).name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      // Fallback: copiar link
      handleCopyLink();
    }
  };

  const handleOpenPDF = () => {
    toastMessages.openPDF();
  };

  const handleShowPDFPreview = () => {
    pdfPreviewRef?.current?.showPreview();
  };

  const handleDownloadPDF = () => {
    toastMessages.downloadPDF();
  };

  const handleOpenMap = () => {
    toastMessages.openMap();
  };

  const handleDownloadMap = () => {
    toastMessages.downloadMap();
  };

  const handleOpenCover = () => {
    setIsCoverModalOpen(true);
    toastMessages.openCover();
  };

  const chipBaseClasses =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-[180ms] ease-out";
  const chipEnabledClasses =
    "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] hover:border-[rgba(0,184,107,0.3)] hover:bg-[rgba(0,184,107,0.08)] hover:shadow-[0_0_12px_rgba(0,184,107,0.2)] cursor-pointer";
  const chipDisabledClasses =
    "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.45)] cursor-not-allowed opacity-45";

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-6 mb-8">
        {/* Chip 1: Ver Capa */}
        {briefing.coverImageUrl ? (
          <button
            onClick={handleOpenCover}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <ImageIcon className="w-4 h-4 text-[#00B86B]" />
            Ver capa
          </button>
        ) : (
          <div className={`${chipBaseClasses} ${chipDisabledClasses}`} title="Capa em breve">
            <ImageIcon className="w-4 h-4" />
            Capa em breve
          </div>
        )}

        {/* Chip 2: Ver PDF (Preview) */}
        {briefing.pdfUrl && pdfPreviewRef ? (
          <button
            onClick={handleShowPDFPreview}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <FileText className="w-4 h-4 text-[#00B86B]" />
            Ver PDF
          </button>
        ) : briefing.pdfUrl ? (
          <a
            href={briefing.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenPDF}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <FileText className="w-4 h-4 text-[#00B86B]" />
            Abrir PDF
          </a>
        ) : (
          <div className={`${chipBaseClasses} ${chipDisabledClasses}`} title="PDF em breve">
            <FileText className="w-4 h-4" />
            PDF em breve
          </div>
        )}

        {/* Chip 3: Abrir PDF (Nova aba) */}
        {briefing.pdfUrl ? (
          <a
            href={briefing.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenPDF}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <ExternalLink className="w-4 h-4 text-[#00B86B]" />
            Abrir PDF
          </a>
        ) : null}

        {/* Chip 4: Baixar PDF */}
        {briefing.pdfUrl ? (
          <a
            href={briefing.pdfUrl}
            download
            onClick={handleDownloadPDF}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <Download className="w-4 h-4 text-[#00B86B]" />
            Baixar PDF
          </a>
        ) : (
          <div className={`${chipBaseClasses} ${chipDisabledClasses}`} title="PDF em breve">
            <Download className="w-4 h-4" />
            PDF em breve
          </div>
        )}

        {/* Chip 5: Ver Mapa */}
        {briefing.mapUrl ? (
          <a
            href={briefing.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenMap}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <Map className="w-4 h-4 text-[#00B86B]" />
            Ver mapa
          </a>
        ) : (
          <div className={`${chipBaseClasses} ${chipDisabledClasses}`} title="Mapa em breve">
            <Map className="w-4 h-4" />
            Mapa em breve
          </div>
        )}

        {/* Chip 6: Baixar Mapa */}
        {briefing.mapDownloadUrl ? (
          <a
            href={briefing.mapDownloadUrl}
            download
            onClick={handleDownloadMap}
            className={`${chipBaseClasses} ${chipEnabledClasses}`}
          >
            <Download className="w-4 h-4 text-[#00B86B]" />
            Baixar mapa
          </a>
        ) : (
          <div className={`${chipBaseClasses} ${chipDisabledClasses}`} title="Mapa em breve">
            <Download className="w-4 h-4" />
            Mapa em breve
          </div>
        )}

        {/* Chip 7: Compartilhar */}
        <button
          onClick={handleShare}
          className={`${chipBaseClasses} ${chipEnabledClasses}`}
        >
          <Share2 className="w-4 h-4 text-[#00B86B]" />
          Compartilhar
        </button>

        {/* Chip 8: Copiar link */}
        <button
          onClick={handleCopyLink}
          className={`${chipBaseClasses} ${chipEnabledClasses}`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#00B86B]" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#00B86B]" />
              Copiar link
            </>
          )}
        </button>
      </div>

      {/* Modal Ver Capa */}
      {isCoverModalOpen && briefing.coverImageUrl && (
        <CoverModal
          imageUrl={briefing.coverImageUrl}
          title={briefing.title}
          onClose={() => setIsCoverModalOpen(false)}
        />
      )}
    </>
  );
}

// Componente Modal para Capa
function CoverModal({
  imageUrl,
  title,
  onClose,
}: {
  imageUrl: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    // Prevenir scroll do body quando modal aberto
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Fechar com ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-[#05070C] rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Image Container - Scrollable */}
        <div className="relative flex-1 overflow-auto bg-[#070B14]">
          <div className="relative w-full min-h-[400px] flex items-center justify-center p-8">
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={630}
              className="max-w-full h-auto object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-white rounded-lg font-medium hover:bg-[#070B14]/80 hover:border-[#00B86B]/30 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
