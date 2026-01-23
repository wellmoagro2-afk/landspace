interface TechnicalHeaderProps {
  volume?: number;
  edition?: number;
  briefingId?: string;
  doi?: string;
  slug: string;
}

/**
 * Cabeçalho técnico HUD - Publicação Técnica Internacional
 * Exibe: [ VOL. 1 // ED. [edition] // ID: LS-STR-2026-[edition] ]
 * Se DOI estiver presente, exibe abaixo do ID técnico
 */
export default function TechnicalHeader({ 
  volume = 1, 
  edition,
  briefingId,
  doi,
  slug 
}: TechnicalHeaderProps) {
  if (!edition && !briefingId) {
    return null;
  }

  const referenceId = briefingId || (edition ? `LS-STR-2026-${edition}` : null);

  if (!referenceId) {
    return null;
  }

  const doiUrl = doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : null;

  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-wider war-room-technical-text opacity-90">
        {edition ? (
          <>[ VOL. {volume} // ED. {edition} // ID: {referenceId} ]</>
        ) : (
          <>[ ID: {referenceId} ]</>
        )}
      </div>
      {doiUrl && (
        <div className="mt-2 text-xs war-room-technical-text opacity-80">
          <a 
            href={doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline text-[color:var(--war-room-accent-light)]"
          >
            DOI: {doi}
          </a>
        </div>
      )}
    </div>
  );
}
