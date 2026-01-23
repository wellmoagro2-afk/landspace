/**
 * Dados para serviços de Perícia & Avaliação (High-Ticket)
 * LandSpace Studio
 */

export interface PericiaService {
  id: string;
  title: string;
  shortDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    badges: string[];
  };
  whatIs: string[];
  deliverables: string[];
  packages: Array<{
    level: 'essential' | 'professional' | 'premium';
    title: string;
    deliverables: string[];
    deadline: string;
    revisions: string;
  }>;
  dataRequirements: string[];
  standardDeadlines: string;
  deliverablesList: string[];
  scopeRules: string[];
}

export const periciaServices: Record<string, PericiaService> = {
  'pericia-evidencias': {
    id: 'pericia-evidencias',
    title: 'Evidências Geoespaciais para Finalidades Periciais',
    shortDescription: 'Evidência cartográfica defensável com rastreabilidade, metodologia declarada, logs e metadados.',
    hero: {
      headline: 'Evidências Geoespaciais para Finalidades Periciais',
      subheadline: 'Evidência cartográfica defensável com rastreabilidade completa, metodologia declarada, logs de processamento e metadados técnicos para processos judiciais, administrativos e privados.',
      badges: ['Alta rastreabilidade', 'Entregáveis padronizados', 'High-Ticket', 'Metodologia declarada'],
    },
    whatIs: [
      'Serviço especializado em produção de evidências cartográficas com rigor técnico e rastreabilidade completa para finalidades periciais. Cada análise é documentada com metodologia declarada, parâmetros explícitos, logs de processamento e metadados técnicos que garantem a defensabilidade em processos judiciais, administrativos ou privados.',
      'Utilizamos bases de dados oficiais, imagens de satélite validadas e metodologias reconhecidas pela comunidade técnica, garantindo que cada mapa e análise possa ser auditado e replicado. Todos os entregáveis incluem documentação técnica completa que permite a validação independente dos resultados.',
    ],
    deliverables: [
      'Evolução temporal (multi-data) de uso/cobertura, supressão, regeneração',
      'APP/RL vs uso atual (buffers e parâmetros declarados)',
      'Restrições/embargos (quando aplicável) com data/versão',
      'Sobreposição e conflito espacial (interseções, áreas, perímetros)',
      'Declividade/risco erosivo e contribuição',
      'Ortofotos/MDT/MDS/curvas (quando houver drone) com relatório de qualidade',
      'Consistência geométrica/topologia (gaps/overlaps, projeção, datum, precisão)',
    ],
    packages: [
      {
        level: 'essential',
        title: 'Evidências Essenciais',
        deliverables: [
          '2–3 mapas temáticos',
          '1 quadro síntese',
          'Memorial de parâmetros/fontes',
          '1 revisão',
        ],
        deadline: '7–10 dias úteis',
        revisions: '1 revisão',
      },
      {
        level: 'professional',
        title: 'Evidências Profissionais',
        deliverables: [
          '4–6 mapas com multi-data',
          'Relatório técnico completo',
          'Anexos de metadados/logs',
          '2 revisões',
        ],
        deadline: '10–15 dias úteis',
        revisions: '2 revisões',
      },
      {
        level: 'premium',
        title: 'Evidências Premium',
        deliverables: [
          '6–10 mapas temáticos',
          'Relatório executivo e técnico completo',
          'Apêndice rastreabilidade',
          '2 revisões',
          '1 rodada de quesitos',
        ],
        deadline: '15–25 dias úteis',
        revisions: '2 revisões + 1 rodada de quesitos',
      },
    ],
    dataRequirements: [
      'Finalidade (judicial/administrativa/privada) e pergunta técnica',
      'AOI (polígono) ou descrição',
      'Intervalo temporal',
      'Documentos (matrícula/CCIR/INCRA/SIGEF quando aplicável, autos/relatórios)',
    ],
    standardDeadlines: 'Prazos variam conforme complexidade, disponibilidade de dados e necessidade de campo/drone. Projetos premium podem incluir cronograma por fase.',
    deliverablesList: [
      'PDF 300dpi',
      'GeoPackage/GeoTIFF quando contratado',
      'XLSX com dados tabulares',
      'Pacote de metadados/logs',
    ],
    scopeRules: [
      'Revisões inclusas conforme pacote (1 ou 2 rodadas)',
      'Mudança de escopo (nova área, novo período, novos indicadores) → aditivo',
      'Quesitos adicionais (além do Premium) → aditivo',
      'Necessidade de campo/drone não prevista → aditivo',
    ],
  },
  'pericia-ambiental': {
    id: 'pericia-ambiental',
    title: 'Assistência Técnica Pericial e Perícia Ambiental (Geotecnologias)',
    shortDescription: 'Assistência técnica pericial e perícia ambiental com suporte cartográfico, análise crítica de laudos e contestação técnica.',
    hero: {
      headline: 'Assistência Técnica Pericial e Perícia Ambiental (Geotecnologias)',
      subheadline: 'Assistência técnica pericial e perícia ambiental com suporte cartográfico robusto, análise crítica de laudos, contestação técnica e produção de evidências geoespaciais para processos ambientais.',
      badges: ['Alta rastreabilidade', 'Entregáveis padronizados', 'High-Ticket', 'Análise crítica'],
    },
    whatIs: [
      'Serviço especializado em assistência técnica pericial e perícia ambiental com foco em geotecnologias. Oferecemos duas modalidades: Assistência Técnica (padrão) para análise de quesitos, contestação técnica e produção de mapas de suporte; e Perícia/Laudo Técnico Ambiental completo quando aplicável.',
      'Nossa equipe analisa criticamente laudos periciais, identifica inconsistências metodológicas e cartográficas, e produz evidências geoespaciais defensáveis. Todos os trabalhos seguem rigor técnico e rastreabilidade completa, adequados para processos judiciais e administrativos.',
    ],
    deliverables: [
      'Leitura crítica de laudos e pareceres',
      'Identificação de inconsistências metodológicas e cartográficas',
      'Quesitos técnicos fundamentados',
      'Mapas de suporte e contestação técnica',
      'Relatório de assistência técnica',
      'Laudo/parecer técnico ambiental completo (quando aplicável)',
      'Anexos cartográficos com rastreabilidade',
    ],
    packages: [
      {
        level: 'essential',
        title: 'Assistência Essencial',
        deliverables: [
          'Leitura crítica',
          'Inconsistências identificadas',
          'Quesitos fundamentados',
          '1 mapa de suporte',
        ],
        deadline: '5–7 dias úteis',
        revisions: '1 revisão',
      },
      {
        level: 'professional',
        title: 'Assistência Profissional',
        deliverables: [
          'Relatório de assistência técnica completo',
          '3–5 mapas de suporte',
          'Checagem de parâmetros/dados',
          'Análise crítica detalhada',
        ],
        deadline: '10–15 dias úteis',
        revisions: '2 revisões',
      },
      {
        level: 'premium',
        title: 'Perícia Premium',
        deliverables: [
          'Dossiê completo de assistência/perícia',
          'Vistoria/insumos/voo conforme orçamento',
          'Rastreabilidade completa',
          'Laudo/parecer técnico completo',
          'Anexos cartográficos detalhados',
        ],
        deadline: '15–30+ dias úteis',
        revisions: '2 revisões + acompanhamento',
      },
    ],
    dataRequirements: [
      'Tipo de processo e prazos',
      'Documentos (laudo, pareceres, autos, imagens)',
      'AOI e contexto legal',
      'Quesitos ou perguntas técnicas',
    ],
    standardDeadlines: 'Prazos variam conforme complexidade do caso, volume de documentos e necessidade de vistoria/campo. Projetos premium podem incluir cronograma por fase.',
    deliverablesList: [
      'Parecer/relatório técnico',
      'Mapas temáticos 300dpi',
      'Anexos cartográficos',
      'Checklist de rastreabilidade',
    ],
    scopeRules: [
      'Revisões inclusas conforme pacote (1 ou 2 rodadas)',
      'Mudança de escopo (novos quesitos, nova área) → aditivo',
      'Vistoria/campo não prevista → aditivo',
      'Voo/drone não previsto → aditivo',
    ],
  },
  'avaliacao-rural': {
    id: 'avaliacao-rural',
    title: 'Avaliação Técnica de Imóveis Rurais com Diagnóstico Territorial',
    shortDescription: 'Avaliação técnica de imóveis rurais com diagnóstico territorial completo, caracterização espacial e análise de aptidão/riscos.',
    hero: {
      headline: 'Avaliação Técnica de Imóveis Rurais com Diagnóstico Territorial',
      subheadline: 'Avaliação técnica de imóveis rurais com diagnóstico territorial completo, caracterização espacial, análise de aptidão e riscos para compra/venda, crédito e regularização fundiária.',
      badges: ['Alta rastreabilidade', 'Entregáveis padronizados', 'High-Ticket', 'Diagnóstico territorial'],
    },
    whatIs: [
      'Serviço especializado em avaliação técnica de imóveis rurais com diagnóstico territorial completo. Integra caracterização espacial do imóvel, análise de uso/cobertura atual e potencial, mapeamento de APP/RL e restrições, infraestrutura/benfeitorias e análise de aptidão/riscos.',
      'Todos os trabalhos incluem mapas técnicos, relatórios executivos e técnicos, e base geoespacial organizada quando contratado. Adequado para processos de compra/venda, crédito rural, regularização fundiária e planejamento de uso.',
    ],
    deliverables: [
      'Caracterização espacial do imóvel (limites, áreas, acesso, drenagem)',
      'Uso/cobertura atual e potencial (quando aplicável)',
      'APP/RL e restrições que impactam valor/uso',
      'Infraestrutura/benfeitorias mapeadas (drone quando necessário)',
      'Mapas de aptidão/riscos (declividade, erosão, acessibilidade)',
    ],
    packages: [
      {
        level: 'essential',
        title: 'Avaliação Essencial',
        deliverables: [
          'Relatório executivo',
          '2–3 mapas temáticos',
          'Quadro resumo',
        ],
        deadline: '7–10 dias úteis',
        revisions: '1 revisão',
      },
      {
        level: 'professional',
        title: 'Avaliação Profissional',
        deliverables: [
          '4–6 mapas temáticos',
          'Análise de aptidão/risco',
          'Relatório técnico completo',
        ],
        deadline: '10–15 dias úteis',
        revisions: '2 revisões',
      },
      {
        level: 'premium',
        title: 'Avaliação Premium',
        deliverables: [
          '6–10 mapas temáticos',
          'Ortofoto/MDT quando contratado',
          'Relatório completo executivo e técnico',
          'Base geoespacial organizada',
        ],
        deadline: '15–25 dias úteis',
        revisions: '2 revisões',
      },
    ],
    dataRequirements: [
      'Polígono do imóvel (ou documentos para vetorização)',
      'Matrícula/CCIR/CAR/SIGEF (se houver)',
      'Objetivo (compra/venda/crédito/regularização)',
      'Benfeitorias (lista)',
    ],
    standardDeadlines: 'Prazos variam conforme complexidade, disponibilidade de dados e necessidade de campo/drone. Projetos premium podem incluir cronograma por fase.',
    deliverablesList: [
      'PDF 300dpi',
      'Mapas editáveis',
      'XLSX com dados tabulares',
      'Base geoespacial quando contratado',
    ],
    scopeRules: [
      'Revisões inclusas conforme pacote (1 ou 2 rodadas)',
      'Mudança de escopo (nova área, novos indicadores) → aditivo',
      'Voo/drone não previsto → aditivo',
      'Benfeitorias adicionais não informadas → aditivo',
    ],
  },
};

export const periciaCards = [
  {
    id: 'pericia-evidencias',
    title: 'Evidências Geoespaciais Periciais',
    description: 'Evidência cartográfica defensável com rastreabilidade, metodologia declarada, logs e metadados.',
    icon: 'FileSearch',
    accentColor: 'indigo',
    route: '/studio/pericia-evidencias',
    bullets: [
      'Evolução temporal multi-data',
      'APP/RL vs uso atual',
      'Rastreabilidade completa',
    ],
  },
  {
    id: 'pericia-ambiental',
    title: 'Assistência Técnica / Perícia Ambiental',
    description: 'Assistência técnica pericial e perícia ambiental com suporte cartográfico e análise crítica.',
    icon: 'Scale',
    accentColor: 'indigo',
    route: '/studio/pericia-ambiental',
    bullets: [
      'Análise crítica de laudos',
      'Contestação técnica',
      'Mapas de suporte',
    ],
  },
  {
    id: 'avaliacao-rural',
    title: 'Avaliação Técnica de Imóveis Rurais',
    description: 'Avaliação técnica de imóveis rurais com diagnóstico territorial completo e análise de aptidão/riscos.',
    icon: 'MapPin',
    accentColor: 'indigo',
    route: '/studio/avaliacao-rural',
    bullets: [
      'Caracterização espacial',
      'APP/RL e restrições',
      'Aptidão e riscos',
    ],
  },
];
