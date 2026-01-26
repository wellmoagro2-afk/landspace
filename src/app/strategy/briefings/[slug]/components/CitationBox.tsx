"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { toastMessages } from "@/lib/toast";
import { getCanonicalBriefingUrl } from "@/lib/strategy/url";

interface CitationBoxProps {
  title: string;
  slug: string;
  volume?: number;
  edition?: number;
  briefingId?: string;
  doi?: string;
  publishedAt?: string;
  createdAt: string;
}

/**
 * Box de Citação ABNT - Publicação Técnica Internacional
 * Gera citação automática no formato ABNT
 */
export default function CitationBox({
  title,
  slug,
  volume = 1,
  edition,
  briefingId,
  doi,
  publishedAt,
  createdAt,
}: CitationBoxProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl] = useState(() => {
    // Lazy initializer: capturar URL atual da página
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return "";
  });

  // Formatar data de acesso (hoje) no formato ABNT
  // Nota: Maio não abrevia conforme ABNT
  const formatAccessDate = () => {
    const today = new Date();
    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  };

  // Extrair ano da data de publicação (garantir que seja o mesmo do ID)
  const getPublicationYear = () => {
    if (publishedAt) {
      const date = new Date(publishedAt);
      // Se a data for anterior a 2026, usar 2026 (ano padrão das publicações)
      return date.getFullYear() < 2026 ? 2026 : date.getFullYear();
    }
    if (createdAt) {
      const date = new Date(createdAt);
      return date.getFullYear() < 2026 ? 2026 : date.getFullYear();
    }
    return 2026; // Fallback para 2026
  };

  // Gerar docId: LS-STR-{ano}-{edition}
  const getDocId = () => {
    const year = getPublicationYear();
    if (edition) {
      return `LS-STR-${year}-${edition}`;
    }
    // Se não houver edition, usar briefingId se disponível
    if (briefingId) {
      return briefingId;
    }
    return '';
  };

  // Gerar citação ABNT conforme padrão oficial
  const generateCitation = () => {
    if (!currentUrl) return "";
    
    const accessDate = formatAccessDate();
    const year = getPublicationYear();
    const docId = getDocId();
    const docIdText = docId ? ` (${docId})` : '';
    const doiText = doi ? ` DOI: ${doi.startsWith('http') ? doi : `https://doi.org/${doi}`}.` : '';
    
    // Template: ALVES, W. S. {titulo} ({docId}). LandSpace Strategy Editorial, v. {volume}, {ano}. Disponível em: <{url}>. Acesso em: {data_acesso}. DOI: {doi}.
    return `ALVES, W. S. ${title}${docIdText}. LandSpace Strategy Editorial, v. ${volume}, ${year}. Disponível em: <${currentUrl}>. Acesso em: ${accessDate}.${doiText}`;
  };

  const citation = currentUrl ? generateCitation() : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toastMessages.copyLink.success();
    } catch (err) {
      console.error("Erro ao copiar citação:", err);
      toastMessages.error("Erro ao copiar citação");
    }
  };

  return (
    <div className="mt-10 pt-6 border-t citation-box war-room-border">
      <div className="p-4 rounded-sm border-dashed war-room-citation-box war-room-border">
        <h3 className="text-xs font-medium uppercase tracking-wider mb-3 war-room-citation-title">
          COMO CITAR ESTE RELATÓRIO
        </h3>
        
        <p className="text-xs leading-relaxed mb-3 text-left war-room-citation-text">
          {citation.split(/(\(LS-STR-\d{4}-\d+\))/).map((part, index) => {
            // Aplicar fonte Monospace apenas para o ID técnico (documento oficial)
            if (part.match(/^\(LS-STR-\d{4}-\d+\)$/)) {
              return (
                <span 
                  key={index}
                  className="citation-doc-id war-room-citation-doc-id"
                >
                  {part}
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </p>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider border transition-all war-room-copy-button"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              COPIADO!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              COPIAR CITAÇÃO
            </>
          )}
        </button>
      </div>
    </div>
  );
}
