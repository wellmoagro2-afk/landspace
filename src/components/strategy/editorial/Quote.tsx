interface QuoteProps {
  author?: string;
  role?: string;
  children: React.ReactNode;
}

export default function Quote({ author, role, children }: QuoteProps) {
  return (
    <blockquote className="border-l-4 border-[#00B86B]/30 pl-6 py-4 my-6 italic text-slate-300">
      <div className="text-lg leading-relaxed mb-3">&quot;{children}&quot;</div>
      {(author || role) && (
        <div className="text-sm text-slate-400">
          {author && <span className="font-semibold">{author}</span>}
          {author && role && <span className="mx-2">•</span>}
          {role && <span>{role}</span>}
        </div>
      )}
    </blockquote>
  );
}
