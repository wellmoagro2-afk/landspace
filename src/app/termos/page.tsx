import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      {/* Header Simplificado - Dark Tech */}
      <header className="w-full flex justify-between items-center py-6 border-b border-white/5 bg-slate-950 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          {/* Logo LandSpace */}
          <Link href="/" className="font-outfit text-white font-bold text-xl hover:text-cyan-400 transition-colors duration-300">
            LandSpace
          </Link>

          {/* Link Voltar para Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-2 text-white">Termos de Uso – LandSpace</h1>
            <p className="text-sm text-slate-500 mb-8">Versão 1.1 | Data: 02/01/2026</p>

            <h3 className="text-white">1. Aceite</h3>
            <p className="text-slate-300">
              Ao acessar e usar os sites, conteúdos, <strong className="text-white">soluções digitais e ferramentas</strong> da LandSpace, você concorda com estes Termos de Uso. Se não concordar, não utilize os serviços.
            </p>

            <h3 className="text-white">2. Escopo do serviço</h3>
            <p className="text-slate-300">
              A LandSpace oferece <strong className="text-white">ferramentas de automação, rotinas computacionais e materiais de capacitação técnica</strong> para uso conforme instruções. O acesso aos toolkits pode ocorrer por plataformas de terceiros (ex.: <strong className="text-white">Hotmart</strong>), sujeitas a seus termos.
            </p>

            <h3 className="text-white">3. Uso permitido</h3>
            <p className="text-slate-300">
              Você concorda em usar os serviços de forma lícita, sem violar direitos de terceiros, sem tentar explorar vulnerabilidades, e sem utilizar os conteúdos para fins ilegais ou para disseminação de desinformação.
            </p>

            <h3 className="text-white">4. Propriedade intelectual</h3>
            <p className="text-slate-300">
              Conteúdos, marcas, layouts, materiais e <strong className="text-white">códigos-fonte das ferramentas</strong> disponibilizados são protegidos por direitos autorais e/ou marcas. É proibida a reprodução, redistribuição ou comercialização sem autorização expressa, salvo quando permitido por lei ou licença específica.
            </p>

            <h3 className="text-white">5. Ferramentas e automações</h3>
            <p className="text-slate-300">
              As ferramentas são fornecidas "como estão" para fins operacionais e de produtividade. <strong className="text-white">Você é responsável por validar resultados, parâmetros e conformidade com normas e políticas do seu ambiente.</strong> A LandSpace não se responsabiliza por perdas decorrentes de uso indevido ou fora das recomendações técnicas.
            </p>

            <h3 className="text-white">6. Natureza do serviço</h3>
            <p className="text-slate-300">
              O conteúdo e as ferramentas têm caráter técnico e de suporte à decisão. Não constituem aconselhamento jurídico, financeiro ou laudo oficial automático. Em decisões críticas, a validação por profissional habilitado é indispensável.
            </p>

            <h3 className="text-white">7. Disponibilidade e mudanças</h3>
            <p className="text-slate-300">
              Podemos alterar, suspender ou descontinuar funcionalidades, <strong className="text-white">soluções</strong> e páginas. Quando possível, comunicaremos mudanças relevantes.
            </p>

            <h3 className="text-white">8. Links de terceiros</h3>
            <p className="text-slate-300">
              Podemos disponibilizar links para sites e serviços de terceiros. Não controlamos esses ambientes e não somos responsáveis por suas práticas.
            </p>

            <h3 className="text-white">9. Privacidade</h3>
            <p className="text-slate-300">
              O tratamento de dados pessoais é regido pela <a href="/privacidade" className="text-cyan-400 hover:underline">Política de Privacidade</a> da LandSpace.
            </p>

            <h3 className="text-white">10. Foro</h3>
            <p className="text-slate-300">
              Fica eleito o foro da comarca do responsável legal pela LandSpace, com renúncia a qualquer outro, salvo disposição legal em contrário.
            </p>

            <hr className="my-8 border-slate-800" />

            <p className="text-sm text-slate-500">
              Dúvidas sobre os termos? Entre em contato em{" "}
              <a href="mailto:contatos@landspace.io" className="text-cyan-400 hover:underline">contatos@landspace.io</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
