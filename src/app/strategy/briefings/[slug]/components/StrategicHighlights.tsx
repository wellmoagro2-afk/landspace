interface StrategicHighlightsProps {
  items?: string[];
}

/**
 * Box "Destaques Estratégicos" - Intelligence Report Style
 * Fundo verde opaco (5%), borda esquerda verde 4px
 */
export default function StrategicHighlights({ items }: StrategicHighlightsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="intelligence-highlights-box my-8 p-6 border-l-4 war-room-highlights-box border-l-[color:var(--editorial-accent)]">
      <h3 className="text-sm font-sans font-semibold uppercase tracking-wider mb-4 text-[color:var(--editorial-ink-muted)]">
        Destaques Estratégicos
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-[color:var(--editorial-accent)]" />
            <span className="text-sm font-serif leading-relaxed text-[color:var(--editorial-ink)]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
