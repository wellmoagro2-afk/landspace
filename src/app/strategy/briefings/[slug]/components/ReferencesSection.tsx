import SafeMDXRemote from '@/components/security/SafeMDXRemote';
import { editorialMdxComponents } from '@/lib/editorial-mdx-components';

/**
 * References Section - White Paper Style
 * Exibe as referências bibliográficas no padrão ABNT
 */
interface ReferencesSectionProps {
  referencias?: string;
}

export default function ReferencesSection({ referencias }: ReferencesSectionProps) {
  if (!referencias) {
    return null;
  }

  return (
    <section className="references-section mt-12 pt-8 border-t war-room-border">
      <h2 className="text-xl font-bold mb-6 war-room-title">
        Referências
      </h2>
      <div className="references-content prose prose-invert max-w-none war-room-text">
        <SafeMDXRemote 
          source={referencias} 
          components={editorialMdxComponents}
        />
      </div>
    </section>
  );
}
