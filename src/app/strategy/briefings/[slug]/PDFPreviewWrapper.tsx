"use client";

import { useRef } from "react";
import PDFPreviewClient, { PDFPreviewHandle } from "./PDFPreviewClient";
import EditorialActionsClient from "./EditorialActionsClient";

interface PDFPreviewWrapperProps {
  pdfUrl: string;
  pdfTitle: string;
  briefing: {
    title: string;
    pdfUrl?: string;
    mapUrl?: string;
    mapDownloadUrl?: string;
    shareUrl?: string;
  };
  onShowPDFPreview?: () => void;
}

export default function PDFPreviewWrapper({
  pdfUrl,
  pdfTitle,
  briefing,
  onShowPDFPreview,
}: PDFPreviewWrapperProps) {
  const pdfPreviewRef = useRef<PDFPreviewHandle>(null);

  const handleShowPDFPreview = () => {
    pdfPreviewRef.current?.showPreview();
    onShowPDFPreview?.();
  };

  return (
    <>
      <PDFPreviewClient ref={pdfPreviewRef} pdfUrl={pdfUrl} pdfTitle={pdfTitle} />
      <EditorialActionsClient
        briefing={briefing}
        onShowPDFPreview={handleShowPDFPreview}
      />
    </>
  );
}
