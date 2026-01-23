import SafeMDXRemote from "@/components/security/SafeMDXRemote";
import { mdxComponents } from "@/lib/mdx-components";

interface IntroducaoSectionProps {
  introducao?: string;
}

/**
 * Seção Introdução (Núcleo Estratégico)
 */
export default function IntroducaoSection({ introducao }: IntroducaoSectionProps) {
  if (!introducao) {
    return null;
  }

  return (
    <section className="introducao-section my-12">
      <h2 className="text-3xl font-bold mb-8 war-room-section-h2">
        Introdução
      </h2>
      <div className="prose prose-invert max-w-none war-room-prose">
        <SafeMDXRemote source={introducao} components={mdxComponents} />
      </div>
    </section>
  );
}
