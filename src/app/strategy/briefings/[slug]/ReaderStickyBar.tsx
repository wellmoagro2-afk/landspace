"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Share2, FileText, Map, Eye, EyeOff, Check } from "lucide-react";
import { toastMessages } from "@/lib/toast";
import { usePDFPreview } from "./BriefingPDFWrapper";

interface ReaderStickyBarProps {
  briefing: {
    title: string;
    pdfUrl?: string;
    mapUrl?: string;
    shareUrl?: string;
  };
  activeSection?: string;
  onToggleReadingMode: () => void;
  isReadingMode: boolean;
}

export default function ReaderStickyBar({
  briefing,
  onToggleReadingMode,
  isReadingMode,
}: ReaderStickyBarProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const pdfPreviewRef = usePDFPreview();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = document.getElementById("briefing-article");
    if (!article) return;

    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const scrolled = scrollY - articleTop + viewportHeight;
      const total = articleHeight;
      const progressValue = Math.max(0, Math.min(1, scrolled / total));

      setProgress(progressValue * 100);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress', progress.toString());
    }
  }, [progress]);

  const handleCopyLink = async () => {
    const url = briefing.shareUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        if ((err as Error).name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShowPDF = () => {
    pdfPreviewRef?.current?.showPreview();
  };

  return (
    <div
      className="reader-sticky-bar fixed top-0 left-0 right-0 z-40 bg-[rgba(5,7,12,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.10)]"
      data-visible={progress > 5 ? "true" : "false"}
    >
      {/* Progress Bar */}
      <div className="h-0.5 bg-[rgba(255,255,255,0.1)]">
        <div
          ref={progressBarRef}
          className="reader-progress-bar h-full bg-[#00B86B]"
        />
      </div>

      {/* Bar Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Left: Progress */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xs font-medium text-[rgba(255,255,255,0.66)] whitespace-nowrap">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
              aria-label="Copiar link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#00B86B]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
              aria-label="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {briefing.pdfUrl && (
              <button
                onClick={handleShowPDF}
                className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
                aria-label="Ver PDF"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}

            {briefing.mapUrl && (
              <a
                href={briefing.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
                aria-label="Ver mapa"
              >
                <Map className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={onToggleReadingMode}
              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.85)] hover:bg-[rgba(255,255,255,0.10)] hover:border-[#00B86B]/30 transition-all duration-200"
              aria-label={isReadingMode ? "Desativar modo leitura" : "Ativar modo leitura"}
            >
              {isReadingMode ? (
                <EyeOff className="w-4 h-4 text-[#00B86B]" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
