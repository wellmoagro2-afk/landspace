"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { FileText, Download, ExternalLink, AlertCircle } from "lucide-react";
import { toastMessages } from "@/lib/toast";
import { downloadFile } from "@/lib/download";

interface PDFPreviewProps {
  pdfUrl: string;
  pdfTitle?: string;
  autoShow?: boolean;
}

export interface PDFPreviewHandle {
  showPreview: () => void;
}

const PDFPreview = forwardRef<PDFPreviewHandle, PDFPreviewProps>(
  ({ pdfUrl, pdfTitle, autoShow = false }, ref) => {
  const [showPreview, setShowPreview] = useState(autoShow);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (showPreview && containerRef.current) {
      // Scroll suave até o preview após renderizar
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showPreview]);

  useEffect(() => {
    if (!showPreview) return;

    // Timeout para detectar se o PDF não carregou
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 10000); // 10 segundos

    return () => clearTimeout(timeout);
  }, [showPreview, isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleOpenPDF = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
    toastMessages.openPDF();
  };

  const handleDownloadPDF = () => {
    downloadFile(pdfUrl, pdfTitle || "documento.pdf");
    toastMessages.downloadPDF();
  };

  // Expor método para mostrar preview externamente
  useImperativeHandle(ref, () => ({
    showPreview: () => {
      setShowPreview(true);
      toastMessages.openPDF();
    },
  }));

  const handleShowPreview = () => {
    setShowPreview(true);
    toastMessages.openPDF();
  };

  if (!showPreview) {
    return (
      <div className="mt-12 mb-12">
        <button
          onClick={handleShowPreview}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B86B] text-white rounded-xl font-semibold text-sm shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300"
        >
          <FileText className="w-4 h-4" />
          Ver PDF
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-12 mb-12">
      {/* Card Container */}
      <div className="bg-[rgba(5,7,12,0.55)] backdrop-blur-md border border-[rgba(255,255,255,0.10)] rounded-2xl overflow-hidden shadow-xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#00B86B]" />
            <div>
              <h3 className="text-sm font-semibold text-[rgba(255,255,255,0.9)]">
                Documento (PDF)
              </h3>
              {pdfTitle && (
                <p className="text-xs text-[rgba(255,255,255,0.65)] mt-0.5">{pdfTitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <span className="text-xs text-[rgba(255,255,255,0.65)]">Carregando...</span>
            )}
            {!isLoading && !hasError && (
              <span className="text-xs text-[rgba(0,184,107,0.8)]">Carregado</span>
            )}
            {hasError && (
              <span className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Falha ao carregar
              </span>
            )}
            <button
              onClick={handleOpenPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.9)] rounded-lg text-sm font-medium hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir
            </button>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(0,184,107,0.16)] border border-[rgba(0,184,107,0.2)] text-[#00B86B] rounded-lg text-sm font-medium hover:bg-[rgba(0,184,107,0.24)] transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Baixar
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="relative bg-[#070B14]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="animate-pulse space-y-4 w-full px-8 py-12">
                <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-4/6 mx-auto"></div>
                <div className="h-64 bg-[rgba(255,255,255,0.03)] rounded-lg mt-8"></div>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="min-h-[400px] flex items-center justify-center p-8">
              <div className="text-center space-y-4 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
                <p className="text-[rgba(255,255,255,0.9)] font-medium">
                  Não foi possível pré-visualizar aqui.
                </p>
                <p className="text-sm text-[rgba(255,255,255,0.65)]">
                  Tente abrir ou baixar o PDF diretamente.
                </p>
                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handleOpenPDF}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B86B] text-white rounded-xl font-semibold text-sm hover:bg-[#00A85F] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Abrir PDF
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.9)] rounded-xl font-semibold text-sm hover:bg-[rgba(255,255,255,0.10)] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Baixar PDF
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full pdf-preview-container">
              <iframe
                ref={iframeRef}
                src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                className="w-full h-full border-0"
                title={pdfTitle || "PDF Preview"}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

PDFPreview.displayName = 'PDFPreview';

export default PDFPreview;
