"use client";

import { useState } from "react";
import ReaderStickyBar from "./ReaderStickyBar";
import ReaderTOC from "./ReaderTOC";
import CopySelectionButton from "./CopySelectionButton";

interface BriefingReaderClientProps {
  briefing: {
    title: string;
    summary?: string;
    pdfUrl?: string;
    mapUrl?: string;
    shareUrl?: string;
  };
}

export default function BriefingReaderClient({ briefing }: BriefingReaderClientProps) {
  const [isReadingMode, setIsReadingMode] = useState(false);

  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);
    const container = document.querySelector('[data-briefing-container]');
    if (container) {
      if (!isReadingMode) {
        container.setAttribute("data-reading", "true");
      } else {
        container.removeAttribute("data-reading");
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
      <CopySelectionButton />
    </>
  );
}
