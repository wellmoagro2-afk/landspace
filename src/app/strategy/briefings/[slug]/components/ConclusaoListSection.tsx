interface ConclusaoListSectionProps {
  conclusao?: string[];
}

/**
 * Seção Conclusão
 * Lista de bullets para achados e próximos passos
 */
export default function ConclusaoListSection({ conclusao }: ConclusaoListSectionProps) {
  if (!conclusao || conclusao.length === 0) {
    return null;
  }

  return (
    <section className="conclusao-section my-12">
      <h2 className="text-3xl font-bold mb-8 war-room-section-h2">
        Conclusão
      </h2>
      <ul className="space-y-4 list-none pl-0 war-room-prose-large">
        {conclusao.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-[1.1rem] leading-[1.8]">
            <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 war-room-bullet" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
