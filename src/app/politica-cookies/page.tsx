import LegalPageLayout from "@/components/LegalPageLayout";
import Link from "next/link";

export default function PoliticaCookiesPage() {
  return (
    <LegalPageLayout 
      title="Política de Cookies" 
      lastUpdated="15 de janeiro de 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. O que são Cookies</h2>
          <p className="text-slate-700 leading-relaxed">
            Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. 
            Eles nos ajudam a fornecer, proteger e melhorar nossos serviços, personalizar conteúdo e anúncios, e 
            analisar o uso do site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Tipos de Cookies que Utilizamos</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">2.1 Cookies Essenciais</h3>
              <p className="text-slate-700 leading-relaxed">
                Essenciais para o funcionamento do site. Permitem navegação básica e acesso a áreas seguras. 
                Sem esses cookies, alguns serviços não podem ser fornecidos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">2.2 Cookies de Performance</h3>
              <p className="text-slate-700 leading-relaxed">
                Coletam informações sobre como você utiliza nosso site (páginas visitadas, tempo de permanência, 
                erros encontrados). Essas informações são agregadas e anonimizadas para melhorar o desempenho do site.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">2.3 Cookies de Funcionalidade</h3>
              <p className="text-slate-700 leading-relaxed">
                Permitem que o site lembre de suas escolhas (idioma, região, preferências) para fornecer uma 
                experiência mais personalizada.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">2.4 Cookies de Marketing</h3>
              <p className="text-slate-700 leading-relaxed">
                Utilizados para rastrear visitantes em diferentes sites. O objetivo é exibir anúncios relevantes 
                e envolventes para cada usuário. Esses cookies são utilizados apenas com seu consentimento explícito.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Cookies de Terceiros</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Utilizamos serviços de terceiros que podem definir cookies em seu dispositivo:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Google Analytics:</strong> para análise de tráfego e comportamento dos usuários</li>
            <li><strong>Cloudflare:</strong> para segurança e otimização de performance</li>
            <li><strong>Provedores de pagamento:</strong> para processamento seguro de transações</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Gerenciamento de Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Você pode controlar e gerenciar cookies de várias formas:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Configurações do navegador:</strong> a maioria dos navegadores permite recusar ou aceitar cookies. 
            Consulte as configurações do seu navegador para mais informações.</li>
            <li><strong>Ferramentas de opt-out:</strong> você pode optar por não participar de cookies de análise visitando 
            as páginas de opt-out dos respectivos serviços.</li>
            <li><strong>Banner de consentimento:</strong> ao visitar nosso site pela primeira vez, você pode escolher quais 
            categorias de cookies aceitar.</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            <strong>Nota:</strong> Desabilitar cookies essenciais pode afetar a funcionalidade do site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies Persistentes vs. Sessão</h2>
          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Cookies de Sessão:</strong> temporários, são excluídos quando você fecha o navegador.
            </p>
            <p>
              <strong>Cookies Persistentes:</strong> permanecem em seu dispositivo por um período determinado ou até 
              serem excluídos manualmente. Utilizamos cookies persistentes para lembrar suas preferências e melhorar 
              sua experiência em visitas futuras.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Atualizações desta Política</h2>
          <p className="text-slate-700 leading-relaxed">
            Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas ou 
            por outros motivos operacionais, legais ou regulatórios. Recomendamos que você revise esta página 
            periodicamente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Mais Informações</h2>
          <p className="text-slate-700 leading-relaxed">
            Para mais informações sobre como tratamos seus dados pessoais, consulte nossa{" "}
            <Link href="/politica-privacidade" className="text-[#06b6d4] hover:underline">
              Política de Privacidade
            </Link>.
          </p>
          <p className="text-slate-700 leading-relaxed mt-4">
            Para dúvidas sobre cookies, entre em contato:{" "}
            <a href="mailto:contatos@landspace.io" className="text-[#06b6d4] hover:underline">
              contatos@landspace.io
            </a>
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

