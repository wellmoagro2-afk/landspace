"use client";

import { useEffect, useState } from "react";
import { getCanonicalBriefingUrl } from "@/lib/strategy/url";

interface JournalHeaderProps {
  volume: number;
  edition: number;
  year: number;
  briefingId?: string;
  doi?: string;
  slug: string;
}

/**
 * Cabeçalho de Impressão do Journal - Baseado no template-p1.png
 * Aparece apenas no modo print (hidden print:flex)
 * Contém: Logo, Metadata Box, QR Code, Indexação
 */
export default function JournalHeader({ 
  volume, 
  edition, 
  year, 
  briefingId,
  doi,
  slug
}: JournalHeaderProps) {
  const [canonicalUrl] = useState(() => {
    // Lazy initializer: calcular URL canônica
    if (typeof window !== "undefined") {
      return getCanonicalBriefingUrl(slug);
    }
    return "";
  });

  const journalTitle = "LandSpace Strategy Editorial: Insights geopolíticos orientados por mapas";
  const journalHomepage = "https://www.landspace.io/strategy";
  const referenceCode = briefingId || `LS-STR-${year}-${edition.toString().padStart(3, '0')}`;
  const fullReference = `${volume} (${year}) ${referenceCode}`;
  const qrCodeUrl = canonicalUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(canonicalUrl)}` : "";

  return (
    <div className="hidden print:flex flex-col w-full bg-white border-b border-gray-300 pb-4 mb-6">
      {/* Top Line - Centered Reference */}
      <div className="text-center text-xs text-gray-600 mb-4 font-sans">
        {journalTitle} {fullReference}
      </div>

      {/* Main Header Layout: Logo | Metadata Box | QR Code */}
      <div className="flex items-start justify-between gap-4">
        {/* Left Side - Logo */}
        <div className="flex flex-col items-start">
          <img
            src="/assets/journal/logo-strategy.png"
            alt="LandSpace Strategy Logo"
            width={80}
            height={80}
            className="mb-2"
          />
          <div className="text-xs font-bold uppercase tracking-wider text-gray-800 font-sans">
            LANDSPACE STRATEGY
          </div>
        </div>

        {/* Center - Metadata Box (Light Green Background) */}
        <div className="flex-1 bg-green-50 border border-green-200 p-4 rounded">
          <div className="space-y-2">
            {/* Indexing Information */}
            <div className="text-xs text-gray-700 font-sans mb-2">
              Indexação pelo Google Scholar, Zotero, Mendeley, etc.
            </div>
            
            {/* Journal Title */}
            <div className="text-sm font-bold text-gray-800 mb-2 font-sans">
              {journalTitle}
            </div>
            
            {/* Journal Homepage */}
            <div className="text-xs">
              <a 
                href={journalHomepage} 
                className="text-blue-600 underline font-sans"
              >
                journal homepage: {journalHomepage}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - QR Code */}
        <div className="flex flex-col items-center">
          {qrCodeUrl && (
            <img
              src={qrCodeUrl}
              alt="QR Code para mapa interativo"
              width={80}
              height={80}
              className="mb-2 border border-gray-300"
            />
          )}
          <div className="text-xs text-gray-600 font-sans">
            Mapa interativo
          </div>
        </div>
      </div>
    </div>
  );
}
