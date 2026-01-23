"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFViewer({ pdfUrl, isOpen, onClose }: PDFViewerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-7xl mx-4 my-8 bg-[#05070C] rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-semibold text-white">Visualizar PDF</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="PDF Viewer"
          />
        </div>

        {/* Footer com ações */}
        <div className="flex items-center justify-end gap-4 p-4 border-t border-[rgba(255,255,255,0.08)]">
          <a
            href={pdfUrl}
            download
            className="px-4 py-2 bg-[#00B86B] text-white rounded-lg font-medium hover:bg-[#00A85F] transition-colors"
          >
            Baixar PDF
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-white rounded-lg font-medium hover:bg-[#070B14]/80 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
