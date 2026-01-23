"use client";

import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { FileText, Download, ExternalLink, X } from "lucide-react";
import { toastMessages } from "@/lib/toast";
import { downloadFile } from "@/lib/download";

interface PDFPreviewClientProps {
  pdfUrl: string;
  pdfTitle?: string;
}

export interface PDFPreviewHandle {
  showPreview: () => void;
}

const PDFPreviewClient = forwardRef<PDFPreviewHandle, PDFPreviewClientProps>(
  ({ pdfUrl, pdfTitle }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      showPreview: () => {
        setIsVisible(true);
        setIsLoading(true);
        // Scroll to preview after a short delay
        setTimeout(() => {
          containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      },
    }));

    useEffect(() => {
      if (isVisible) {
        // Timeout to detect if PDF failed to load
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 10000);

        return () => clearTimeout(timeout);
      }
    }, [isVisible]);

    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    const handleOpenPDF = () => {
      if (pdfUrl) {
        window.open(pdfUrl, "_blank", "noopener noreferrer");
        toastMessages.openPDF();
      }
    };

    const handleDownloadPDF = () => {
      if (pdfUrl) {
        downloadFile(pdfUrl, `${pdfTitle || "documento"}.pdf`);
        toastMessages.downloadPDF();
      }
    };

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        className="editorial-pdf-preview my-12 p-6 border border-[rgba(0,0,0,0.12)] bg-white rounded-sm"
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#4B4B4B]" />
            <h3 className="font-sans text-sm font-semibold text-[#111111]">Documento (PDF)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenPDF}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans text-[#4B4B4B] hover:text-[#111111] border border-[rgba(0,0,0,0.12)] hover:border-[#00B86B] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir
            </button>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans text-[#4B4B4B] hover:text-[#111111] border border-[rgba(0,0,0,0.12)] hover:border-[#00B86B] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Baixar
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-[#4B4B4B] hover:text-[#111111] transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative w-full min-h-[600px] max-h-[70vh]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.02)]">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-2 border-[#00B86B] border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-[#6A6A6A] font-sans">Carregando PDF...</p>
              </div>
            </div>
          )}
          <iframe
            src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
            className="w-full h-full min-h-[600px] border border-[rgba(0,0,0,0.08)] rounded-sm"
            title="PDF Preview"
            onLoad={handleIframeLoad}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }
);

PDFPreviewClient.displayName = "PDFPreviewClient";

export default PDFPreviewClient;
