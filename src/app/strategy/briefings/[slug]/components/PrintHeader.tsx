"use client";

interface PrintHeaderProps {
  briefingSlug: string;
  briefingId?: string;
  doi?: string;
  publishedAt?: string;
  createdAt: string;
}

/**
 * Cabeçalho para impressão - Aparece apenas no @media print
 * Contém: Logo, ID técnico e DOI (se disponível)
 */
export default function PrintHeader({ briefingSlug, briefingId, doi, publishedAt, createdAt }: PrintHeaderProps) {
  const formatDate = (dateString?: string) => {
    // Se não houver data, usar data atual com ano 2026
    if (!dateString) {
      const today = new Date();
      const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
      return `${today.getDate()} ${months[today.getMonth()]} 2026`;
    }
    
    const date = new Date(dateString);
    // Garantir que o ano seja 2026 se a data for anterior
    const year = date.getFullYear() < 2026 ? 2026 : date.getFullYear();
    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    return `${date.getDate()} ${months[date.getMonth()]} ${year}`;
  };

  const referenceCode = briefingId || `LS-STR-2026-${briefingSlug.slice(-3).toUpperCase()}`;
  const date = formatDate(publishedAt || createdAt);
  const doiUrl = doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : null;

  return (
    <div className="print-header hidden print:block">
      <div className="print-header-content">
        {/* Logo LandSpace Strategy (Esquerda) */}
        <div className="print-logo">
          LANDSPACE STRATEGY
        </div>
        {/* Data (Centro) */}
        <div className="print-date">
          {date}
        </div>
        {/* ID Técnico e DOI (Direita) */}
        <div className="print-id-section">
          <div className="print-id">
            {referenceCode}
          </div>
          {doiUrl && (
            <div className="print-doi">
              <a href={doiUrl} className="print-doi-link">
                DOI: {doi}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
