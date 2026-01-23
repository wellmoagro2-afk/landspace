import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CookiesPage() {
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
            <h1 className="text-3xl font-bold mb-2 text-white">Política de Cookies – LandSpace</h1>
            <p className="text-sm text-slate-500 mb-8">Versão 1.1 | Data: 02/01/2026</p>

            <h3 className="text-white">1. O que são cookies</h3>
            <p className="text-slate-300">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam a garantir o funcionamento adequado do site, melhorar a experiência do usuário e fornecer informações analíticas.
            </p>

            <h3 className="text-white">2. Como utilizamos cookies</h3>
            <p className="text-slate-300">A LandSpace utiliza cookies para:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>(i) Garantir o funcionamento básico do site e das <strong className="text-white">ferramentas online</strong>;</li>
              <li>(ii) Melhorar desempenho e segurança;</li>
              <li>(iii) Compreender como os usuários interagem com as páginas;</li>
              <li>(iv) Apoiar iniciativas de comunicação e oferta de <strong className="text-white">soluções</strong>, quando aplicável.</li>
            </ul>

            <h3 className="text-white">3. Tipos de cookies utilizados</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong className="text-white">Cookies essenciais:</strong> necessários para o funcionamento do site e não podem ser desativados.</li>
              <li><strong className="text-white">Cookies de desempenho e análise:</strong> coletam informações agregadas e anônimas sobre uso do site (ex.: páginas visitadas, tempo de navegação).</li>
              <li><strong className="text-white">Cookies de funcionalidade:</strong> permitem lembrar preferências do usuário.</li>
              <li><strong className="text-white">Cookies de marketing (quando utilizados):</strong> auxiliam na entrega de soluções relevantes.</li>
            </ul>

            <h3 className="text-white">4. Cookies de terceiros</h3>
            <p className="text-slate-300">
              Podemos utilizar serviços de terceiros, como ferramentas de análise e segurança (ex.: Google Analytics, Cloudflare), que podem definir cookies conforme suas próprias políticas.
            </p>

            <h3 className="text-white">5. Gerenciamento de cookies</h3>
            <p className="text-slate-300">
              Você pode gerenciar ou desativar cookies nas configurações do seu navegador. A desativação de cookies essenciais pode afetar o funcionamento do site.
            </p>

            <h3 className="text-white">6. Base legal</h3>
            <p className="text-slate-300">
              O uso de cookies é realizado conforme a Lei Geral de Proteção de Dados (LGPD), com base no consentimento do usuário quando aplicável e no legítimo interesse para cookies estritamente necessários.
            </p>

            <h3 className="text-white">7. Atualizações desta política</h3>
            <p className="text-slate-300">
              Esta Política de Cookies pode ser atualizada periodicamente. A versão vigente estará sempre disponível no site.
            </p>

            <hr className="my-8 border-slate-800" />

            <p className="text-sm text-slate-500">
              Dúvidas sobre cookies? Entre em contato em{" "}
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
