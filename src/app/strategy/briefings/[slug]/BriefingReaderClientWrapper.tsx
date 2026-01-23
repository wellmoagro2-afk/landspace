"use client";

import { useState } from "react";
import ReaderStickyBar from "./ReaderStickyBar";
import ReaderTOC from "./ReaderTOC";
import CopySelectionButton from "./CopySelectionButton";
import { usePDFPreview } from "./BriefingPDFWrapper";

interface BriefingReaderClientWrapperProps {
  briefing: {
    title: string;
    pdfUrl?: string;
    mapUrl?: string;
    shareUrl?: string;
  };
}

export default function BriefingReaderClientWrapper({
  briefing,
}: BriefingReaderClientWrapperProps) {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const pdfPreviewRef = usePDFPreview();

  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);
    const container = document.querySelector('[data-briefing-container]');
    if (container) {
      if (!isReadingMode) {
        container.setAttribute("data-reading", "true");
        // Aplicar também no article
        const article = document.getElementById("briefing-article");
        if (article) {
          article.setAttribute("data-reading", "true");
        }
      } else {
        container.removeAttribute("data-reading");
        const article = document.getElementById("briefing-article");
        if (article) {
          article.removeAttribute("data-reading");
        }
      }
    }
  };

  return (
    <>
      <ReaderStickyBar
        briefing={briefing}
        onToggleReadingMode={toggleReadingMode}
        isReadingMode={isReadingMode}
      />
      <ReaderTOC />
    </>
  );
}
