/**
 * Informações do Autor - Baseado no template-p1.png
 * Aparece apenas no print (PDF)
 */
export default function AuthorInfo() {
  return (
    <div className="hidden print:flex flex-col items-center text-center my-6">
      <div className="print-author-name text-base font-semibold text-gray-800 mb-2 font-sans">
        Wellmo dos Santos Alves, PhD
        <a 
          href="https://orcid.org/0000-0003-3296-2469" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block ml-2 align-middle"
          aria-label="ORCID Profile"
        >
          <img
            src="/assets/journal/orcid-icon.png"
            alt="ORCID"
            width={16}
            height={16}
            className="inline-block"
          />
        </a>
      </div>
      <div className="print-author-affiliation text-sm text-gray-700 font-sans">
        Professor Permanente no Programa de Pós-Graduação em Engenharia Aplicada e Sustentabilidade | Instituto Federal Goiano; Liderança Técnica | LandSpace - Inteligência Geoespacial & Automação
      </div>
    </div>
  );
}
