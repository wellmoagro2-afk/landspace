interface PullQuoteProps {
  quote: string;
  author?: string;
  source?: string;
}

export default function PullQuote({ quote, author, source }: PullQuoteProps) {
  return (
    <aside className="editorial-pullquote my-12 py-8 border-l-4 border-[#00B86B] pl-8 pr-4">
      <blockquote className="text-2xl font-serif italic text-[#111111] leading-relaxed mb-4">
        "{quote}"
      </blockquote>
      {(author || source) && (
        <footer className="text-sm font-sans text-[#6A6A6A]">
          {author && <cite className="font-semibold">{author}</cite>}
          {author && source && <span className="mx-2">•</span>}
          {source && <span>{source}</span>}
        </footer>
      )}
    </aside>
  );
}
