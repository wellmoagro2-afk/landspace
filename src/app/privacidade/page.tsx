import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PrivacidadePage() {
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
            <h1 className="text-3xl font-bold mb-2 text-white">Política de Privacidade – LandSpace</h1>
            <p className="text-sm text-slate-500 mb-8">Versão 1.1 | Data: 02/01/2026</p>

            <h3 className="text-white">1. Quem somos</h3>
            <p className="text-slate-300">
              Esta Política de Privacidade descreve como a LandSpace (&quot;LandSpace&quot;, &quot;nós&quot;) trata dados pessoais em seus sites, páginas e comunicações.<br />
              Responsável pelo tratamento: <strong className="text-white">Wellmo Alves / LandSpace Education</strong>.
            </p>

            <h3 className="text-white">2. Quais dados coletamos</h3>
            <p className="text-slate-300">
              Podemos coletar dados fornecidos por você (ex.: nome, e-mail, telefone/WhatsApp, mensagens enviadas pelo chat) e dados técnicos (ex.: endereço IP, tipo de navegador, páginas visitadas, data/hora e cookies, quando aplicável).
            </p>
            <p className="text-slate-300">
              Em compras e acesso a <strong className="text-white">ferramentas e treinamentos</strong>, o processamento de pagamentos e entrega pode ocorrer em plataformas de terceiros (ex.: <strong className="text-white">Hotmart</strong>). Nesses casos, cada plataforma trata dados conforme suas próprias políticas.
            </p>

            <h3 className="text-white">3. Finalidades e bases legais</h3>
            <p className="text-slate-300">Usamos os dados para:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>(i) Responder contatos e solicitações de suporte técnico;</li>
              <li>(ii) Fornecer serviços, conteúdos, <strong className="text-white">toolkits e soluções digitais</strong>;</li>
              <li>(iii) Enviar comunicações informativas quando solicitado;</li>
              <li>(iv) Segurança, prevenção a fraude e melhoria do site.</li>
            </ul>
            <p className="mt-4 text-slate-300">
              As bases legais podem incluir: consentimento, execução de contrato, legítimo interesse e cumprimento de obrigação legal, conforme aplicável (LGPD).
            </p>

            <h3 className="text-white">4. Compartilhamento com terceiros</h3>
            <p className="text-slate-300">
              Podemos compartilhar dados com provedores necessários à operação (hospedagem, e-mail, analytics, automação, plataformas de pagamento e de entrega de conteúdo), sempre de forma proporcional e com medidas de segurança.
            </p>
            <p className="text-slate-300">
              <strong className="text-white">Não vendemos dados pessoais.</strong>
            </p>

            <h3 className="text-white">5. Cookies e tecnologias similares</h3>
            <p className="text-slate-300">
              Podemos usar cookies para funcionamento, desempenho e estatísticas. Você pode gerenciar cookies no seu navegador. Alguns recursos podem não funcionar sem cookies essenciais.
            </p>

            <h3 className="text-white">6. Retenção e segurança</h3>
            <p className="text-slate-300">
              Reteremos dados pelo tempo necessário às finalidades descritas e/ou exigências legais. Adotamos medidas técnicas e administrativas para proteger dados contra acesso não autorizado, perda e uso indevido.
            </p>

            <h3 className="text-white">7. Direitos do titular</h3>
            <p className="text-slate-300">
              Você pode solicitar: confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação (quando aplicável), informação sobre compartilhamento e revogação de consentimento.
            </p>
            <p className="text-slate-300">
              <strong className="text-white">Canal de contato:</strong> <a href="mailto:contatos@landspace.io" className="text-cyan-400 hover:text-cyan-300 no-underline hover:underline">contatos@landspace.io</a>
            </p>

            <h3 className="text-white">8. Transferência internacional</h3>
            <p className="text-slate-300">
              Alguns provedores podem armazenar/processar dados fora do Brasil. Nesses casos, buscamos utilizar provedores com padrões adequados de segurança e conformidade.
            </p>

            <h3 className="text-white">9. Portal do Cliente</h3>
            <p className="text-slate-300">
              O Portal do Cliente permite que clientes acompanhem o andamento de seus projetos através de um protocolo único e PIN de acesso.
            </p>
            <p className="text-slate-300 mt-2">
              <strong className="text-white">Dados coletados:</strong> Nome completo, e-mail, telefone, protocolo do projeto e PIN de acesso (armazenado de forma criptografada).
            </p>
            <p className="text-slate-300 mt-2">
              <strong className="text-white">Finalidade:</strong> Acompanhamento de etapas do projeto, visualização de entregáveis e download de arquivos conforme liberação por pagamento.
            </p>
            <p className="text-slate-300 mt-2">
              <strong className="text-white">Retenção:</strong> Dados e arquivos são mantidos por 12 meses após o encerramento do projeto. Após este período, arquivos são removidos automaticamente e dados podem ser anonimizados ou excluídos mediante solicitação.
            </p>
            <p className="text-slate-300 mt-2">
              <strong className="text-white">Liberação de entregas:</strong> Arquivos preview são liberados após confirmação do pagamento de entrada. Arquivos finais são liberados somente após quitação completa do saldo e confirmação pela equipe técnica.
            </p>
            <p className="text-slate-300 mt-2">
              <strong className="text-white">Acesso:</strong> O acesso ao Portal do Cliente é restrito ao protocolo específico do projeto, garantindo que cada cliente visualize apenas seus próprios dados e arquivos.
            </p>

            <h3 className="text-white mt-8">10. Atualizações desta política</h3>
            <p className="text-slate-300">
              Podemos atualizar esta política a qualquer momento. A versão vigente estará disponível no site com data de atualização.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
