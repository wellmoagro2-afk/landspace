"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { toastMessages } from "@/lib/toast";

interface EditorialActionsClientProps {
  briefing: {
    title: string;
    mapUrl?: string;
    mapDownloadUrl?: string;
    shareUrl?: string;
  };
  onShowPDFPreview?: () => void;
}

export default function EditorialActionsClient({
  briefing,
  onShowPDFPreview,
}: EditorialActionsClientProps) {
  const [copied, setCopied] = useState(false);

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
          // Fallback: copiar para clipboard
          try {
            await navigator.clipboard.writeText(url);
            toastMessages.share.success();
          } catch (clipboardErr) {
            console.error("Erro ao copiar link:", clipboardErr);
          }
        }
      }
    } else {
      // Fallback: copiar para clipboard
      try {
        await navigator.clipboard.writeText(url);
        toastMessages.share.success();
      } catch (err) {
        console.error("Erro ao copiar link:", err);
      }
    }
  };

  return (
    <div 
      className="editorial-actions flex items-center gap-3 border-t pt-4 mt-4"
    >
      <button 
        onClick={handleCopyLink} 
        className="editorial-action-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors border no-underline uppercase tracking-wider"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            COPIADO
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            COPIAR LINK
          </>
        )}
      </button>

      <button 
        onClick={handleShare} 
        className="editorial-action-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors border no-underline uppercase tracking-wider"
      >
        <Share2 className="w-3.5 h-3.5" />
        COMPARTILHAR
      </button>
    </div>
  );
}
