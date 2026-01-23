import LegalPageLayout from "@/components/LegalPageLayout";
import Link from "next/link";

export default function PoliticaPrivacidadePage() {
  return (
    <LegalPageLayout 
      title="Política de Privacidade" 
      lastUpdated="15 de janeiro de 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introdução</h2>
          <p className="text-slate-700 leading-relaxed">
            A LandSpace está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como 
            coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de 
            Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Informações que Coletamos</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Coletamos as seguintes categorias de informações pessoais:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Dados de identificação:</strong> nome, email, telefone, CPF (quando necessário para emissão de certificados)</li>
            <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência</li>
            <li><strong>Dados de uso:</strong> informações sobre como você utiliza nossos serviços e ferramentas</li>
            <li><strong>Dados de pagamento:</strong> processados de forma segura através de provedores terceirizados (não armazenamos dados de cartão)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Como Utilizamos suas Informações</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Utilizamos suas informações pessoais para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar transações e enviar notificações relacionadas</li>
            <li>Enviar comunicações sobre produtos, serviços e atualizações (com seu consentimento)</li>
            <li>Personalizar sua experiência e recomendar conteúdo relevante</li>
            <li>Cumprir obrigações legais e regulatórias</li>
            <li>Prevenir fraudes e garantir a segurança de nossos serviços</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Compartilhamento de Informações</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Não vendemos suas informações pessoais. Podemos compartilhar seus dados apenas nas seguintes situações:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Prestadores de serviços:</strong> empresas que nos auxiliam na operação (processamento de pagamentos, hospedagem, analytics)</li>
            <li><strong>Obrigações legais:</strong> quando exigido por lei, ordem judicial ou autoridades competentes</li>
            <li><strong>Com seu consentimento:</strong> em outras situações, com sua autorização explícita</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Segurança dos Dados</h2>
          <p className="text-slate-700 leading-relaxed">
            Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações pessoais contra 
            acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL/TLS, armazenamento 
            seguro e monitoramento contínuo de segurança.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Seus Direitos (LGPD)</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De acordo com a LGPD, você tem os seguintes direitos:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los</li>
            <li><strong>Correção:</strong> solicitar correção de dados incompletos, inexatos ou desatualizados</li>
            <li><strong>Anonimização, bloqueio ou eliminação:</strong> solicitar a remoção de dados desnecessários</li>
            <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
            <li><strong>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento</li>
            <li><strong>Oposição:</strong> opor-se ao tratamento de dados em certas circunstâncias</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies e Tecnologias Similares</h2>
          <p className="text-slate-700 leading-relaxed">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência. Para mais informações, consulte 
            nossa <Link href="/politica-cookies" className="text-[#06b6d4] hover:underline">Política de Cookies</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Retenção de Dados</h2>
          <p className="text-slate-700 leading-relaxed">
            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta 
            política, salvo quando um período de retenção mais longo for exigido ou permitido por lei.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Alterações nesta Política</h2>
          <p className="text-slate-700 leading-relaxed">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas 
            através de email ou aviso em nosso site. A data da última atualização está indicada no topo desta página.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contato e Encarregado de Dados</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 text-slate-700">
            <p className="font-semibold mb-2">LandSpace - Proteção de Dados</p>
            <p><strong>Canal de contato:</strong> <a href="mailto:contatos@landspace.io" className="text-[#06b6d4] hover:underline">contatos@landspace.io</a></p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}

