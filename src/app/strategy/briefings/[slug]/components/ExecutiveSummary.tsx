import { CheckCircle2 } from "lucide-react";

interface ExecutiveSummaryProps {
  items?: string[];
}

/**
 * Sumário Executivo - War Room Style com Glassmorphism
 * Box com glassmorphism, título "// PONTOS CHAVE DE INTELIGÊNCIA"
 * Ícones verdes neon para cada bullet
 */
export default function ExecutiveSummary({ items }: ExecutiveSummaryProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="war-room-glass my-8 p-6 rounded-lg">
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 war-room-section-title">
        // PONTOS CHAVE DE INTELIGÊNCIA
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="flex-shrink-0 w-4 h-4 mt-0.5 war-room-accent" />
            <span className="text-sm leading-relaxed war-room-text war-room-serif">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
