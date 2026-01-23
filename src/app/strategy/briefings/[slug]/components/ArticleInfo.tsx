/**
 * Article Info - Bloco de Metadados (Keywords + Abstract)
 * Padrão Elsevier/Nature - Aparece apenas no print
 */
interface ArticleInfoProps {
  keywords?: string[];
  abstract?: string;
}

export default function ArticleInfo({ keywords, abstract }: ArticleInfoProps) {
  if (!keywords && !abstract) {
    return null;
  }

  return (
    <div className="print-article-info">
      {/* Esquerda: Keywords (30%) */}
      {keywords && keywords.length > 0 && (
        <div className="print-keywords-section">
          <div className="print-keywords-label">KEYWORDS</div>
          <div className="print-keywords-list">
            {keywords.slice(0, 3).map((keyword, index) => (
              <span key={index} className="print-keyword-item">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Direita: Abstract (70%) */}
      {abstract && (
        <div className="print-abstract-section">
          <div className="print-abstract-label">ABSTRACT</div>
          <div className="print-abstract-text">
            {abstract}
          </div>
        </div>
      )}
    </div>
  );
}
