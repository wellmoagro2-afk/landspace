"use client";

import { useRef, createContext, useContext } from "react";
import PDFPreview, { PDFPreviewHandle } from "@/components/strategy/PDFPreview";

// Context para compartilhar o ref do PDF Preview entre componentes
const PDFPreviewContext = createContext<React.RefObject<PDFPreviewHandle | null> | null>(null);

export const usePDFPreview = () => {
  const context = useContext(PDFPreviewContext);
  if (!context) {
    throw new Error("usePDFPreview must be used within PDFPreviewProvider");
  }
  return context;
};

interface BriefingPDFManagerProps {
  pdfUrl: string;
  pdfTitle: string;
  children: React.ReactNode;
}

export function PDFPreviewProvider({ pdfUrl, pdfTitle, children }: BriefingPDFManagerProps) {
  const pdfPreviewRef = useRef<PDFPreviewHandle>(null);

  return (
    <PDFPreviewContext.Provider value={pdfPreviewRef}>
      {children}
      <PDFPreview
        ref={pdfPreviewRef}
        pdfUrl={pdfUrl}
        pdfTitle={pdfTitle}
        autoShow={false}
      />
    </PDFPreviewContext.Provider>
  );
}
