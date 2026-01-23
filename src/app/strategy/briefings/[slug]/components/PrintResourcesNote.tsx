/**
 * Nota de Rodapé Digital - Aparece apenas no print
 * Versão estática do documento com link para recursos dinâmicos
 */
interface PrintResourcesNoteProps {
  slug?: string;
}

export default function PrintResourcesNote({ slug }: PrintResourcesNoteProps) {
  const documentUrl = slug 
    ? `landspace.io/strategy/briefings/${slug}`
    : 'landspace.io/strategy';
    
  return (
    <div className="print-digital-note">
      Este documento é uma versão estática. Para acessar dados dinâmicos e mapas interativos, utilize o código: {documentUrl}
    </div>
  );
}
