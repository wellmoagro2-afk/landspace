import SafeMDXRemote from "@/components/security/SafeMDXRemote";
import { editorialMdxComponents } from "@/lib/editorial-mdx-components";
import ExecutiveSummary from "./ExecutiveSummary";

interface ArticleBodyProps {
  contentMdx?: string; // Legado - usar desenvolvimento/conclusao se disponível
  desenvolvimento?: string;
  conclusao?: string;
  takeaways?: string[];
}

export default function ArticleBody({ contentMdx, desenvolvimento, conclusao, takeaways }: ArticleBodyProps) {
  // Se tiver desenvolvimento/conclusão, usar estrutura White Paper
  const hasWhitePaperStructure = desenvolvimento || conclusao;
  
  return (
    <>
      {/* Sumário Executivo (War Room Style) */}
      {takeaways && takeaways.length > 0 && (
        <ExecutiveSummary items={takeaways} />
      )}

      {/* MDX Content - White Paper Structure ou Legado */}
      {hasWhitePaperStructure ? (
        <div className="editorial-content white-paper-content">
          {desenvolvimento && (
            <section className="desenvolvimento-section mb-8">
              <h2 className="text-2xl font-bold mb-4 war-room-title">
                Desenvolvimento
              </h2>
              <div className="desenvolvimento-content">
                <SafeMDXRemote source={desenvolvimento} components={editorialMdxComponents} />
              </div>
            </section>
          )}
          
          {conclusao && (
            <section className="conclusao-section">
              <h2 className="text-2xl font-bold mb-4 war-room-title">
                Conclusão
              </h2>
              <div className="conclusao-content">
                <SafeMDXRemote source={conclusao} components={editorialMdxComponents} />
              </div>
            </section>
          )}
        </div>
      ) : contentMdx ? (
        <div className="editorial-content">
          <SafeMDXRemote source={contentMdx} components={editorialMdxComponents} />
        </div>
      ) : null}
    </>
  );
}
