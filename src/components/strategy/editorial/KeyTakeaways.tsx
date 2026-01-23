interface KeyTakeawaysProps {
  items: string[];
  title?: string;
}

export default function KeyTakeaways({ items, title = "Principais pontos" }: KeyTakeawaysProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="editorial-takeaways my-8 p-6 border border-[rgba(0,0,0,0.12)] bg-[rgba(0,0,0,0.02)] rounded-sm">
      <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[#4B4B4B] mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-[#00B86B] font-serif text-xl leading-none mt-1 flex-shrink-0">•</span>
            <span className="text-[#111111] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
