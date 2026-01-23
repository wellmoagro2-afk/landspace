"use client";

interface PrintFooterComponentProps {
  doi?: string;
}

/**
 * Rodapé para impressão - Baseado no template-p1.png
 * Contém: DOI (esquerda), Copyright (centro), Número da página (direita)
 */
export default function PrintFooterComponent({ doi }: PrintFooterComponentProps) {
  const doiUrl = doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : null;
  const currentYear = new Date().getFullYear();

  return (
    <div className="print-footer hidden print:flex">
      <div className="print-footer-content">
        <div className="w-full flex justify-between items-center">
          {/* Left Side - DOI */}
          <div className="flex flex-col">
            {doiUrl && (
              <a 
                href={doiUrl} 
                className="text-xs text-blue-600 underline font-sans"
              >
                https://doi.org/{doi}
              </a>
            )}
            <div className="text-xs text-gray-700 font-sans mt-1">
              Copyright © {currentYear} LandSpace. Todos os direitos reservados
            </div>
            {/* Social Responsibility Reference */}
            <div className="text-[7pt] text-gray-500 font-mono mt-1 font-intelligence-mono">
              [ SOCIAL RESPONSIBILITY REF: S0683692BCO // SUPPORTING UNICEF BRAZIL ]
            </div>
          </div>

          {/* Right Side - Page Number (será gerado automaticamente pelo CSS) */}
          <div className="text-xs text-gray-700 font-sans">
            {/* Número da página será inserido via CSS @page */}
          </div>
        </div>
      </div>
    </div>
  );
}
