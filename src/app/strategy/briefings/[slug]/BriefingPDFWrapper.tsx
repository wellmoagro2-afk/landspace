"use client";

import { useRef, createContext, useContext, ReactNode } from "react";
import PDFPreview, { PDFPreviewHandle } from "@/components/strategy/PDFPreview";

// Context para compartilhar o ref do PDF Preview
const PDFPreviewContext = createContext<React.RefObject<PDFPreviewHandle | null> | null>(null);

export const usePDFPreview = () => {
  const context = useContext(PDFPreviewContext);
  // Retorna null se não estiver dentro do contexto (ao invés de lançar erro)
  return context;
};

interface BriefingPDFWrapperProps {
  briefing: {
    title: string;
    pdfUrl: string;
  };
  children?: ReactNode;
}

export default function BriefingPDFWrapper({ briefing, children }: BriefingPDFWrapperProps) {
  const pdfPreviewRef = useRef<PDFPreviewHandle>(null);

  return (
    <PDFPreviewContext.Provider value={pdfPreviewRef}>
      {children}
      <PDFPreview
        ref={pdfPreviewRef}
        pdfUrl={briefing.pdfUrl}
        pdfTitle={briefing.title}
        autoShow={false}
      />
    </PDFPreviewContext.Provider>
  );
}
