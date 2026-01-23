/**
 * Dados para páginas temáticas do Studio
 * Baseado em servicos_e_organizacao.md
 */

export interface ThematicPageData {
  hero: {
    headline: string;
    subheadline: string;
  };
  packages: Array<{
    level: 'essential' | 'professional' | 'premium';
    title: string;
    maps: string[];
    deadline: string;
    deliverables?: string[];
    dataRequirements?: string[];
  }>;
  dataRequirements: string[];
  faq?: Array<{ question: string; answer: string }>;
  serviceId: string;
}

export const thematicData: Record<string, ThematicPageData> = {
  'urbano-plano-diretor': {
    hero: {
      headline: 'Planejamento urbano com base técnica e leitura clara',
      subheadline: 'Diagnóstico territorial, mapas normativos e sínteses para Plano Diretor, zoneamento urbano, expansão e requalificação — com atlas e base GIS prontos para gestão.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Diagnóstico Territorial',
        maps: [
          'Limites, bairros/distritos, malha urbana',
          'Sistema viário (hierarquia) e centralidades',
          'Uso e ocupação do solo (atual)',
          'Áreas verdes/cobertura arbórea',
          'Hipsometria/declividade',
          'Hidrografia/APP (quando aplicável)',
        ],
        deadline: '10–15 dias úteis',
      },
      {
        level: 'professional',
        title: 'Conflitos, Risco e Propostas',
        maps: [
          'Conflitos de uso (APP, áreas frágeis)',
          'Risco (inundação/suscetibilidade quando possível)',
          'Diretrizes de expansão/adensamento (cenários)',
          'Síntese para minuta técnica',
        ],
        deadline: '20–35 dias úteis',
      },
      {
        level: 'premium',
        title: 'Zoneamento Propositivo e Diretrizes',
        maps: [
          'Macrozoneamento e zonas especiais (conforme objetivo)',
          'Diretrizes por zona + mapas normativos prontos para discussão técnica',
        ],
        deadline: '30–60 dias úteis',
      },
    ],
    dataRequirements: [
      'Limite municipal/perímetro urbano (vetor)',
      'Foco do plano (mobilidade, expansão, drenagem, etc.)',
      'Bases municipais (vias/equipamentos), se houver',
    ],
    faq: [
      {
        question: 'Vocês produzem mapa normativo?',
        answer: 'Sim (produto técnico-cartográfico); validação jurídica é do contratante.',
      },
      {
        question: 'Dá para integrar dados do município?',
        answer: 'Sim, e melhora a precisão do diagnóstico.',
      },
    ],
    serviceId: 'urbano',
  },
  'bacias-usle-conservacao': {
    hero: {
      headline: 'Bacias hidrográficas: do diagnóstico à intervenção',
      subheadline: 'Delimitação, indicadores físicos, uso do solo e modelagem de erosão (USLE/RUSLE) para priorizar ações de conservação.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Diagnóstico físico-hidrológico',
        maps: [
          'Delimitação de bacia/sub-bacias; drenagem e ordem de canais',
          'Hipsometria/declividade; densidade de drenagem (indicadores)',
          'Uso e cobertura do solo (atual)',
          'APP e áreas sensíveis (quando aplicável)',
        ],
        deadline: '10–20 dias úteis',
      },
      {
        level: 'professional',
        title: 'USLE/RUSLE + Hotspots + Priorização',
        maps: [
          'Fatores (R, K, LS, C, P quando possível) com documentação',
          'Perda de solo (EP/ER conforme método)',
          'Hotspots e priorização por sub-bacia/APP',
          '(Opcional) sensibilidade/Monte Carlo',
        ],
        deadline: '20–40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Integração avançada',
        maps: [
          'Integração com PUC/SCUP e/ou fragilidade',
          'Cenários e priorização avançada',
        ],
        deadline: '30–60 dias úteis',
      },
    ],
    dataRequirements: [
      'Bacia/sub-bacia ou exutório',
      'DEM/MDT; solos; uso/cobertura; chuva (ou metodologia definida)',
    ],
    faq: [
      {
        question: 'Entregam por sub-bacia?',
        answer: 'Sim, como padrão.',
      },
      {
        question: 'Inclui recomendações?',
        answer: 'Sim, como diretrizes técnicas no relatório.',
      },
    ],
    serviceId: 'bacias',
  },
  'puc-scup': {
    hero: {
      headline: 'Potencial conservacionista com robustez técnica',
      subheadline: 'PUC/SCUP para priorizar manejo e conservação com classes interpretáveis, máscaras de robustez e integração com erosão e fragilidade.',
    },
    packages: [
      {
        level: 'professional',
        title: 'PUC/SCUP (determinístico) + interpretação',
        maps: [
          'PUC e subclasses (conforme método)',
          'Síntese interpretativa e áreas prioritárias',
        ],
        deadline: '25–45 dias úteis',
      },
      {
        level: 'premium',
        title: 'Robustez + Integração',
        maps: [
          'Máscaras de robustez (probabilístico quando aplicável)',
          'Integração com USLE/fragilidade e priorização',
        ],
        deadline: '30–50 dias úteis',
      },
    ],
    dataRequirements: [
      'DEM/MDT + solos + litologia (ou equivalentes)',
      'Classes/limiares (ou padrão recomendado)',
    ],
    faq: [
      {
        question: 'Posso usar com máscara de uso/MapBiomas?',
        answer: 'Sim.',
      },
      {
        question: 'Entregam mapas de incerteza?',
        answer: 'Se contratado, sim.',
      },
    ],
    serviceId: 'puc',
  },
  'aptidao-agricola-agroclima': {
    hero: {
      headline: 'Aptidão agrícola para orientar o uso da terra com segurança',
      subheadline: 'Integra clima, solo e relevo para classificar aptidão por cultura e manejo, com recomendações e limitações explicitadas.',
    },
    packages: [
      {
        level: 'professional',
        title: 'Zoneamento Agroclimático + Aptidão Integrada',
        maps: [
          'Aptidão climática por cultura (zonas/classes)',
          'Balanço hídrico (indicadores)',
          'Aptidão agrícola integrada (clima + solo + relevo)',
          'Janelas de plantio (quando aplicável)',
        ],
        deadline: '20–45 dias úteis',
      },
      {
        level: 'premium',
        title: 'Cenários (irrigado × sequeiro) + multiuso',
        maps: [
          'Cenários e regras alternativas',
          'Priorização multiuso (produção × conservação, quando aplicável)',
        ],
        deadline: '30–60 dias úteis',
      },
    ],
    dataRequirements: [
      'Culturas-alvo e manejo',
      'Bases de solo e relevo; período histórico (ou autorização para compor)',
    ],
    faq: [
      {
        question: 'Substitui agronomia?',
        answer: 'Não; complementa com base espacial.',
      },
      {
        question: 'Pode ser por talhão?',
        answer: 'Se a escala e dados suportarem.',
      },
    ],
    serviceId: 'aptidao',
  },
  'florestal-restauracao': {
    hero: {
      headline: 'Conservação e restauração guiadas por evidência espacial',
      subheadline: 'Fragmentação, conectividade, corredores e priorização de restauração para planejamento florestal e gestão ambiental.',
    },
    packages: [
      {
        level: 'professional',
        title: 'Priorização + conectividade',
        maps: [
          'Cobertura vegetal, fragmentação e conectividade (indicadores)',
          'Priorização de restauração (multicritério)',
          'Corredores ecológicos (método conforme escopo)',
          'Pressões/ameaças (borda, vias, dinâmica de perda, etc.)',
        ],
        deadline: '20–45 dias úteis',
      },
      {
        level: 'premium',
        title: 'Cenários + diretrizes + mitigação',
        maps: [
          'Cenários alternativos e regras comparadas',
          'Apoio a mitigação/compensação quando aplicável',
        ],
        deadline: '30–60 dias úteis',
      },
    ],
    dataRequirements: [
      'Área e objetivo (restaurar, conectar, proteger)',
      'Camadas locais (UC, APP, projetos), se houver',
    ],
    faq: [
      {
        question: 'Fazem corredores ecológicos?',
        answer: 'Sim, conforme critério e dados.',
      },
      {
        question: 'Integra PSA?',
        answer: 'Pode integrar como camada de decisão.',
      },
    ],
    serviceId: 'florestal',
  },
  'drone-fotogrametria': {
    hero: {
      headline: 'Alta resolução para decisões de campo',
      subheadline: 'Ortofoto, MDT/MDS e derivados para urbano e agro — com base pronta para GIS/CAD conforme escopo.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Ortofoto + modelos',
        maps: [
          'Ortofoto + MDS/MDT (conforme objetivo)',
        ],
        deadline: '7–25 dias úteis (condicionado a campo/clima)',
      },
      {
        level: 'professional',
        title: 'Derivados + mapas técnicos',
        maps: [
          'Declividade, drenagem e produtos derivados quando aplicável',
        ],
        deadline: '10–30 dias úteis',
      },
      {
        level: 'premium',
        title: 'Volumetria, acompanhamento e inspeções',
        maps: [
          'Módulos específicos sob demanda',
        ],
        deadline: 'Sob cronograma do projeto',
      },
    ],
    dataRequirements: [
      'Área, objetivo, restrições operacionais e janela de voo',
      'Autorizações e logística (quando necessário)',
    ],
    faq: [
      {
        question: 'Vocês fazem o voo?',
        answer: 'Depende do arranjo (cliente/parceiro).',
      },
      {
        question: 'Prazo depende do clima?',
        answer: 'Sim, quando há aquisição em campo.',
      },
    ],
    serviceId: 'drone',
  },
  'zee-ordenamento': {
    hero: {
      headline: 'ZEE com diagnóstico integrado e zonas aplicáveis',
      subheadline: 'Integra meio físico, biótico e socioeconômico para construir potencialidades, vulnerabilidades e diretrizes por zona.',
    },
    packages: [
      {
        level: 'professional',
        title: 'Diagnóstico Integrado + Síntese',
        maps: [
          'Meio físico (relevo/solos/geologia conforme disponibilidade)',
          'Meio biótico (cobertura vegetal, fragmentação, conectividade)',
          'Socioeconômico (infraestrutura, pressões, dinâmica de ocupação)',
          'Restrições legais (APP/UC) quando aplicável',
          'Síntese (fragilidade/vulnerabilidade)',
        ],
        deadline: '30–60 dias úteis',
      },
      {
        level: 'premium',
        title: 'Zonas do ZEE + Diretrizes + Cenários',
        maps: [
          'Mapa final de zonas',
          'Diretrizes por zona (uso recomendado, condicionantes, prioridades)',
          'Cenários opcionais (conservação × produção × urbano)',
        ],
        deadline: '45–90 dias úteis',
      },
    ],
    dataRequirements: [
      'Limite da área e objetivos do ZEE',
      'Bases locais e condicionantes legais (se houver)',
    ],
    faq: [
      {
        question: 'Pode ser municipal?',
        answer: 'Sim; escala e dados definem detalhamento.',
      },
      {
        question: 'Critérios e pesos são documentados?',
        answer: 'Sim, com rastreabilidade.',
      },
    ],
    serviceId: 'zee',
  },
  'riscos-climaticos': {
    hero: {
      headline: 'Riscos climáticos em mapas acionáveis',
      subheadline: 'Variabilidade, extremos e indicadores (seca/veranicos/chuva intensa) para apoiar planejamento agrícola, defesa civil e gestão ambiental.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Exposição e indicadores',
        maps: [
          'Variabilidade/anomalias de precipitação/temperatura',
          'Índices de seca (SPI/SPEI quando aplicável)',
          'Indicadores de veranicos/estiagens (conforme região/dados)',
          'Síntese de exposição por unidade territorial',
        ],
        deadline: '10–25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Índices + Síntese por cultura/território',
        maps: [
          'Indicadores orientados ao objetivo (agro, urbano, bacia)',
          'Relatórios com leitura prática',
        ],
        deadline: '20–40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Cenários e vulnerabilidade',
        maps: [
          'Cenários e interpretação para decisão (dependendo do escopo)',
        ],
        deadline: '30–60 dias úteis',
      },
    ],
    dataRequirements: [
      'Área e período',
      'Finalidade (agro/urbano/bacia) e variáveis de interesse',
    ],
    faq: [
      {
        question: 'Entregam séries + mapas?',
        answer: 'Sim, com sínteses e indicadores.',
      },
      {
        question: 'Serve para seguro agrícola?',
        answer: 'Apoia; regras finais dependem de terceiros.',
      },
    ],
    serviceId: 'riscos',
  },
  'agricultura-precisao': {
    hero: {
      headline: 'Agricultura de precisão com zonas de manejo e prescrição',
      subheadline: 'Produtividade, variabilidade espacial e recomendações operacionais com mapas compatíveis com seu fluxo (GIS e equipamentos).',
    },
    packages: [
      {
        level: 'professional',
        title: 'Zonas de manejo + produtividade + amostragem',
        maps: [
          'Produtividade (quando houver) com validação/limpeza',
          'Zonas de manejo (clusters) com justificativa (NDVI/solo/topografia conforme dados)',
          'Estabilidade temporal (multi-safra) quando houver',
          'Plano de amostragem e mapas interpolados (se contratado)',
        ],
        deadline: '15–35 dias úteis',
      },
      {
        level: 'premium',
        title: 'Prescrição (VRA) + mapas operacionais',
        maps: [
          'Prescrição para taxa variável (calcário/fertilizante/semente)',
          'Mapas operacionais e premissas documentadas',
        ],
        deadline: '10–25 dias úteis (após zonas)',
      },
    ],
    dataRequirements: [
      'Limites de talhões',
      'NDVI/histórico; produtividade (se houver); amostras de solo (se houver)',
    ],
    faq: [
      {
        question: 'Entregam arquivo para equipamento?',
        answer: 'Se o padrão do cliente for definido.',
      },
      {
        question: 'Sem produtividade dá para fazer?',
        answer: 'Sim, com sensoriamento + variáveis ambientais.',
      },
    ],
    serviceId: 'precisao',
  },
  'monitoramento-lulc': {
    hero: {
      headline: 'Monitoramento e mudanças de uso e cobertura do solo',
      subheadline: 'Classificação temporal, análise de transições e detecção de mudanças para monitoramento ambiental, licenciamento e planejamento territorial — com mapas de mudança e matriz de transição.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Classificação e Mudanças Básicas',
        maps: [
          'Classificação de uso e cobertura (2-3 datas)',
          'Mapa de mudanças',
          'Estatísticas de mudança por classe',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Análise Temporal Completa',
        maps: [
          'Classificação multi-temporal (3-5 datas)',
          'Matriz de transição',
          'Taxas de mudança e tendências',
          'Mapas de ganho/perda por classe',
        ],
        deadline: '25-40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Monitoramento e Projeções',
        maps: [
          'Série temporal completa (5+ datas)',
          'Análise de tendências e projeções',
          'Cenários de mudança futura',
          'Mapas de pressão e vulnerabilidade',
        ],
        deadline: '35-60 dias úteis',
      },
    ],
    dataRequirements: [
      'Imagens de satélite (ou datas específicas)',
      'Área de interesse (vetor)',
      'Classes de interesse (ou padrão)',
    ],
    faq: [
      {
        question: 'Quais sensores podem ser usados?',
        answer: 'Landsat, Sentinel, CBERS, Planet, conforme disponibilidade e objetivo.',
      },
      {
        question: 'Preciso ter imagens?',
        answer: 'Podemos buscar e processar imagens públicas, ou usar as fornecidas pelo cliente.',
      },
    ],
    serviceId: 'lulc',
  },
  'zoneamento-ambiental': {
    hero: {
      headline: 'Zoneamento ambiental com foco em APP, RL e áreas protegidas',
      subheadline: 'Mapeamento de APP, Reserva Legal e áreas protegidas para CAR, licenciamento e regularização ambiental — com integração de conflitos de uso e diretrizes de regularização.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Mapeamento Básico de APP e RL',
        maps: [
          'APP de rios e nascentes',
          'Reserva Legal',
          'Conflitos básicos de uso',
        ],
        deadline: '10-20 dias úteis',
      },
      {
        level: 'professional',
        title: 'Zoneamento Completo e Conflitos',
        maps: [
          'APP completa (rios, nascentes, topos, encostas)',
          'Reserva Legal e áreas de preservação',
          'Conflitos de uso detalhados',
          'Diretrizes de regularização',
        ],
        deadline: '20-35 dias úteis',
      },
      {
        level: 'premium',
        title: 'Integração com CAR e Cenários',
        maps: [
          'Zoneamento ambiental completo',
          'Integração com CAR',
          'Cenários de regularização',
          'Priorização de intervenções',
        ],
        deadline: '30-50 dias úteis',
      },
    ],
    dataRequirements: [
      'Área de interesse (imóvel ou região)',
      'DEM/MDT para APP de encostas',
      'Dados de CAR (se houver)',
    ],
    faq: [
      {
        question: 'Fazem validação de CAR?',
        answer: 'Sim, podemos validar e corrigir dados de CAR existentes.',
      },
      {
        question: 'Preciso ter o CAR?',
        answer: 'Não, podemos gerar o mapeamento completo a partir de dados básicos.',
      },
    ],
    serviceId: 'zoneamento-ambiental',
  },
  'fragilidade-ambiental': {
    hero: {
      headline: 'Análise de fragilidade ambiental para planejamento territorial',
      subheadline: 'Avaliação de fragilidade do meio físico (relevo, solo, geologia) para planejamento territorial e gestão ambiental — com diretrizes de uso compatível e mapas de restrições.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Fragilidade Potencial',
        maps: [
          'Fragilidade do meio físico',
          'Classes de fragilidade',
          'Mapa de restrições básicas',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Fragilidade Integrada',
        maps: [
          'Fragilidade potencial e emergente',
          'Integração com uso do solo',
          'Mapas de conflito e compatibilidade',
          'Diretrizes de uso compatível',
        ],
        deadline: '25-40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Análise Avançada e Cenários',
        maps: [
          'Fragilidade detalhada por componente',
          'Cenários de uso e fragilidade',
          'Priorização de áreas sensíveis',
          'Diretrizes de gestão territorial',
        ],
        deadline: '35-55 dias úteis',
      },
    ],
    dataRequirements: [
      'DEM/MDT',
      'Dados de solos',
      'Geologia (ou equivalente)',
      'Uso do solo (quando aplicável)',
    ],
    faq: [
      {
        question: 'Qual metodologia usam?',
        answer: 'Adaptamos conforme objetivo, podendo usar fragilidade potencial, emergente ou integrada.',
      },
      {
        question: 'Precisa ter todos os dados?',
        answer: 'Podemos compor com bases públicas quando necessário.',
      },
    ],
    serviceId: 'fragilidade',
  },
  'eia-rima': {
    hero: {
      headline: 'Suporte cartográfico completo para estudos de impacto ambiental',
      subheadline: 'Base cartográfica completa e análises ambientais integradas para EIA-RIMA, AIA e licenciamento — com mapas temáticos e síntese cartográfica para relatórios.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Base Cartográfica Básica',
        maps: [
          'Base cartográfica regional',
          'Mapas de localização',
          'Mapas temáticos básicos',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Análises Ambientais Integradas',
        maps: [
          'Base cartográfica completa',
          'Mapas de área de influência',
          'Análises de meio físico, biótico e socioeconômico',
          'Síntese cartográfica',
        ],
        deadline: '30-50 dias úteis',
      },
      {
        level: 'premium',
        title: 'Suporte Completo para EIA-RIMA',
        maps: [
          'Base cartográfica editorial',
          'Análises ambientais detalhadas',
          'Mapas de impacto e mitigação',
          'Atlas cartográfico completo',
        ],
        deadline: '45-75 dias úteis',
      },
    ],
    dataRequirements: [
      'Localização do empreendimento',
      'Área de influência (ou critérios)',
      'Dados específicos do projeto',
    ],
    faq: [
      {
        question: 'Fazem o estudo completo?',
        answer: 'Focamos na parte cartográfica e análises geoespaciais. O estudo completo envolve equipe multidisciplinar.',
      },
      {
        question: 'Atendem padrões do órgão licenciador?',
        answer: 'Sim, adaptamos conforme exigências do órgão e tipo de empreendimento.',
      },
    ],
    serviceId: 'eia-rima',
  },
  'riscos-geologicos': {
    hero: {
      headline: 'Análise de suscetibilidade a deslizamentos e riscos geológicos',
      subheadline: 'Mapeamento de suscetibilidade a deslizamentos e riscos geológicos para planejamento urbano, defesa civil e gestão de riscos — com diretrizes de ocupação segura.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Susceptibilidade Básica',
        maps: [
          'Susceptibilidade a deslizamentos',
          'Classes de susceptibilidade',
          'Mapa de áreas de risco básico',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Riscos Geológicos Integrados',
        maps: [
          'Susceptibilidade detalhada',
          'Riscos geológicos (erosão, solapamento)',
          'Integração com uso do solo e ocupação',
          'Mapas de áreas de risco',
        ],
        deadline: '25-40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Análise Avançada e Diretrizes',
        maps: [
          'Riscos geológicos detalhados',
          'Cenários de ocupação',
          'Diretrizes de ocupação segura',
          'Priorização de intervenções',
        ],
        deadline: '35-55 dias úteis',
      },
    ],
    dataRequirements: [
      'DEM/MDT de alta resolução',
      'Dados de solos e geologia',
      'Uso do solo e ocupação',
    ],
    faq: [
      {
        question: 'Qual metodologia usam?',
        answer: 'Adaptamos conforme objetivo, podendo usar métodos determinísticos ou probabilísticos.',
      },
      {
        question: 'Precisa de dados de campo?',
        answer: 'Dados de campo melhoram a precisão, mas podemos trabalhar com dados remotos e bases públicas.',
      },
    ],
    serviceId: 'deslizamentos',
  },
  'areas-degradadas': {
    hero: {
      headline: 'Mapeamento de áreas degradadas e priorização de recuperação',
      subheadline: 'Identificação de áreas degradadas e priorização para recuperação ambiental usando análise multicritério e cenários de recuperação — com diretrizes de intervenção.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Identificação Básica',
        maps: [
          'Mapa de áreas degradadas',
          'Classes de degradação',
          'Priorização básica',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Priorização Multicritério',
        maps: [
          'Identificação detalhada de áreas degradadas',
          'Priorização para recuperação (multicritério)',
          'Integração com conectividade e fragmentação',
          'Diretrizes de intervenção',
        ],
        deadline: '25-40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Cenários e Planejamento',
        maps: [
          'Análise completa de degradação',
          'Cenários de recuperação',
          'Planejamento de intervenções',
          'Mapas de viabilidade e custo-benefício',
        ],
        deadline: '35-55 dias úteis',
      },
    ],
    dataRequirements: [
      'Área de interesse',
      'Dados de uso e cobertura do solo',
      'Critérios de priorização (se houver)',
    ],
    faq: [
      {
        question: 'Como definem áreas degradadas?',
        answer: 'Combinamos análise de uso do solo, indicadores de vegetação e critérios técnicos.',
      },
      {
        question: 'Fazem planejamento de recuperação?',
        answer: 'Sim, incluímos diretrizes técnicas e priorização de intervenções.',
      },
    ],
    serviceId: 'areas-degradadas',
  },
  'recursos-hidricos': {
    hero: {
      headline: 'Análise de qualidade e disponibilidade hídrica',
      subheadline: 'Análise espacializada de disponibilidade hídrica, qualidade de água e balanço hídrico para gestão de recursos hídricos e outorgas — com diretrizes de gestão hídrica.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Disponibilidade Básica',
        maps: [
          'Disponibilidade hídrica superficial',
          'Mapas de drenagem e vazão',
          'Balanço hídrico básico',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'Análise Integrada de Recursos Hídricos',
        maps: [
          'Disponibilidade hídrica superficial e subterrânea',
          'Qualidade de água (indicadores espaciais)',
          'Balanço hídrico espacializado',
          'Vulnerabilidade de aquíferos',
        ],
        deadline: '25-40 dias úteis',
      },
      {
        level: 'premium',
        title: 'Gestão e Planejamento Hídrico',
        maps: [
          'Análise completa de recursos hídricos',
          'Cenários de disponibilidade',
          'Diretrizes de gestão hídrica',
          'Priorização de intervenções',
        ],
        deadline: '35-55 dias úteis',
      },
    ],
    dataRequirements: [
      'Área de interesse (bacia ou região)',
      'Dados de precipitação',
      'Dados de qualidade (se houver)',
    ],
    faq: [
      {
        question: 'Fazem análise de qualidade de água?',
        answer: 'Sim, quando há dados de campo ou indicadores espaciais disponíveis.',
      },
      {
        question: 'Atendem requisitos de outorga?',
        answer: 'Fornecemos base cartográfica e análises que podem apoiar processos de outorga.',
      },
    ],
    serviceId: 'recursos-hidricos',
  },
  'car': {
    hero: {
      headline: 'Cadastro Ambiental Rural (CAR) com rigor técnico',
      subheadline: 'Elaboração e validação de Cadastro Ambiental Rural com mapeamento de APP, Reserva Legal, áreas de uso restrito e integração com bases oficiais do SICAR — documentação técnica completa para regularização ambiental.',
    },
    packages: [
      {
        level: 'essential',
        title: 'CAR Básico',
        maps: [
          'Mapeamento de APP (rios, nascentes)',
          'Reserva Legal',
          'Áreas de uso restrito básicas',
          'Documentação para SICAR',
        ],
        deadline: '15-25 dias úteis',
      },
      {
        level: 'professional',
        title: 'CAR Completo e Validação',
        maps: [
          'APP completa (rios, nascentes, topos, encostas)',
          'Reserva Legal detalhada',
          'Áreas de uso restrito e preservação',
          'Validação e correção de CAR existente',
          'Integração com bases do SICAR',
        ],
        deadline: '25-40 dias úteis',
      },
      {
        level: 'premium',
        title: 'CAR Premium com Regularização',
        maps: [
          'CAR completo e validado',
          'Análise de conflitos de uso',
          'Diretrizes de regularização ambiental',
          'Documentação técnica completa',
          'Acompanhamento de protocolo no SICAR',
        ],
        deadline: '35-55 dias úteis',
      },
    ],
    dataRequirements: [
      'Área do imóvel (coordenadas ou vetor)',
      'Documentos do imóvel (matrícula, certidão)',
      'DEM/MDT para APP de encostas',
      'Dados de CAR existente (se houver)',
    ],
    faq: [
      {
        question: 'Vocês fazem o protocolo no SICAR?',
        answer: 'Fornecemos toda a documentação técnica e mapas prontos para protocolo. O protocolo no SICAR é realizado pelo proprietário ou representante legal.',
      },
      {
        question: 'Preciso ter todos os dados do imóvel?',
        answer: 'Não, podemos trabalhar com dados básicos e compor informações com bases públicas quando necessário.',
      },
      {
        question: 'Fazem correção de CAR já protocolado?',
        answer: 'Sim, podemos validar, corrigir e atualizar CAR existente com nova documentação técnica.',
      },
    ],
    serviceId: 'car',
  },
  'georreferenciamento': {
    hero: {
      headline: 'Georreferenciamento de imóveis rurais conforme INCRA',
      subheadline: 'Georreferenciamento de imóveis rurais com memorial descritivo, coordenadas geodésicas certificadas e documentação técnica completa para regularização fundiária — atendendo normas do INCRA e certificação técnica.',
    },
    packages: [
      {
        level: 'essential',
        title: 'Georreferenciamento Básico',
        maps: [
          'Memorial descritivo georreferenciado',
          'Coordenadas geodésicas dos vértices',
          'Mapa de localização',
          'Documentação técnica básica',
        ],
        deadline: '20-30 dias úteis',
      },
      {
        level: 'professional',
        title: 'Georreferenciamento Completo',
        maps: [
          'Memorial descritivo completo',
          'Coordenadas geodésicas certificadas',
          'Mapas técnicos (localização, confrontações)',
          'Integração com bases cadastrais',
          'Documentação para INCRA',
        ],
        deadline: '30-45 dias úteis',
      },
      {
        level: 'premium',
        title: 'Georreferenciamento Premium com Regularização',
        maps: [
          'Georreferenciamento completo e certificado',
          'Análise de sobreposições e conflitos',
          'Documentação completa para regularização fundiária',
          'Acompanhamento técnico do processo',
          'Integração com CAR e regularização ambiental',
        ],
        deadline: '40-60 dias úteis',
      },
    ],
    dataRequirements: [
      'Documentos do imóvel (matrícula, certidão)',
      'Memorial descritivo antigo (se houver)',
      'Coordenadas aproximadas ou croqui',
      'Dados de campo (se houver levantamento)',
    ],
    faq: [
      {
        question: 'Atendem normas do INCRA?',
        answer: 'Sim, seguimos rigorosamente as normas do INCRA para georreferenciamento de imóveis rurais.',
      },
      {
        question: 'Preciso fazer levantamento de campo?',
        answer: 'Depende do caso. Podemos trabalhar com dados existentes ou indicar necessidade de levantamento de campo quando necessário.',
      },
      {
        question: 'Fazem certificação técnica?',
        answer: 'Sim, fornecemos documentação técnica certificada conforme normas do INCRA e CREA.',
      },
      {
        question: 'Integra com CAR?',
        answer: 'Sim, podemos integrar o georreferenciamento com o CAR para regularização completa do imóvel.',
      },
    ],
    serviceId: 'georreferenciamento',
  },
};
