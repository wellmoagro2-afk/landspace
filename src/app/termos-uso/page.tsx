import LegalPageLayout from "@/components/LegalPageLayout";

export default function TermosUsoPage() {
  return (
    <LegalPageLayout 
      title="Termos de Uso" 
      lastUpdated="15 de janeiro de 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Aceitação dos Termos</h2>
          <p className="text-slate-700 leading-relaxed">
            Ao acessar e utilizar os serviços da LandSpace, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
            Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Descrição dos Serviços</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            A LandSpace oferece cursos online, ferramentas de automação, consultoria em geoprocessamento e soluções 
            tecnológicas relacionadas a geotecnologias e sensoriamento remoto.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Todos os conteúdos, ferramentas e materiais fornecidos são de propriedade intelectual da LandSpace e estão 
            protegidos por leis de direitos autorais.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Uso dos Serviços</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Você concorda em utilizar nossos serviços apenas para fins legais e de acordo com estes Termos. É proibido:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Reproduzir, distribuir ou compartilhar conteúdo sem autorização prévia</li>
            <li>Utilizar as ferramentas para atividades ilegais ou não autorizadas</li>
            <li>Modificar, engenhar reversa ou descompilar qualquer software ou ferramenta</li>
            <li>Interferir no funcionamento dos serviços ou sistemas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Propriedade Intelectual</h2>
          <p className="text-slate-700 leading-relaxed">
            Todo o conteúdo disponibilizado pela LandSpace, incluindo mas não limitado a textos, gráficos, logos, 
            ícones, imagens, áudios, vídeos, software e ferramentas, é propriedade da LandSpace ou de seus licenciadores 
            e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitação de Responsabilidade</h2>
          <p className="text-slate-700 leading-relaxed">
            A LandSpace não se responsabiliza por danos diretos, indiretos, incidentais, especiais ou consequenciais 
            resultantes do uso ou incapacidade de usar nossos serviços. Nossos serviços são fornecidos &quot;como estão&quot; e 
            &quot;conforme disponível&quot;.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Modificações dos Termos</h2>
          <p className="text-slate-700 leading-relaxed">
            Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor 
            imediatamente após a publicação. É sua responsabilidade revisar periodicamente estes termos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contato</h2>
          <p className="text-slate-700 leading-relaxed">
            Para questões sobre estes Termos de Uso, entre em contato conosco através do email:{" "}
            <a href="mailto:contatos@landspace.io" className="text-[#06b6d4] hover:underline">
              contatos@landspace.io
            </a>
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

