/**
 * Abstract & Keywords Box - White Paper Style
 * Exibe o abstract e as palavras-chave em estilo editorial
 */
interface AbstractKeywordsBoxProps {
  abstract?: string;
  keywords?: string[];
}

export default function AbstractKeywordsBox({ abstract, keywords }: AbstractKeywordsBoxProps) {
  if (!abstract && (!keywords || keywords.length === 0)) {
    return null;
  }

  return (
    <div className="abstract-keywords-box my-8 py-6 px-6 border-l-4 war-room-abstract-box">
      {abstract && (
        <div className="mb-4">
          <p className="text-sm leading-relaxed war-room-text opacity-90">
            {abstract}
          </p>
        </div>
      )}
      
      {keywords && keywords.length > 0 && (
        <div className="mt-4 pt-4 border-t war-room-border">
          <p className="text-xs font-mono uppercase tracking-wider mb-2 war-room-technical-text opacity-90">
            Palavras-chave:
          </p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-sm border text-xs font-mono war-room-keyword-tag"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
