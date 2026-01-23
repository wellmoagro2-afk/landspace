interface LimitacoesIncertezasSectionProps {
  limitacoesIncertezas?: string;
}

/**
 * Seção Limitações e Incertezas
 * Texto curto - 1 parágrafo
 */
export default function LimitacoesIncertezasSection({
  limitacoesIncertezas,
}: LimitacoesIncertezasSectionProps) {
  if (!limitacoesIncertezas) {
    return null;
  }

  return (
    <section className="limitacoes-incertezas-section my-12">
      <h2 className="text-3xl font-bold mb-6 war-room-section-h2">
        Limitações e Incertezas
      </h2>
      <div className="prose prose-invert max-w-none war-room-prose-large">
        <p className="m-0 leading-relaxed">{limitacoesIncertezas}</p>
      </div>
    </section>
  );
}
