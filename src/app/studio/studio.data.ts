/**
 * Estrutura de dados do LandSpace Studio
 * Baseado em servicos_e_organizacao.md
 */

export interface StudioPackage {
  level: 'essential' | 'professional' | 'premium';
  maps: string;
  report: string;
  deadline: string;
  revisions: string;
  deliverables?: string[];
  dataRequirements?: string[];
}

export interface StudioService {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  accentColor: 'green' | 'amber' | 'emerald' | 'cyan' | 'lime' | 'purple';
  packages: {
    essential?: StudioPackage;
    professional?: StudioPackage;
    premium?: StudioPackage;
  };
  faq?: Array<{ question: string; answer: string }>;
  highTicket?: boolean;
}

export const studioServices: StudioService[] = [
  {
    id: 'lulc-analysis',
    title: 'LULC Analysis',
    description: 'Dinâmica de uso e cobertura da terra (diagnóstico + transições).',
    bullets: [
      'Mapas de uso e cobertura atual',
      'Análise de transições temporais',
      'Diagnóstico de mudanças de uso do solo'
    ],
    accentColor: 'green',
    packages: {
      essential: {
        level: 'essential',
        maps: '6-12 mapas',
        report: '2-5 páginas',
        deadline: '10-20 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Mapas de uso e cobertura',
          'Análise de transições',
          'Base geoespacial organizada'
        ]
      },
      professional: {
        level: 'professional',
        maps: '12-20 mapas + sínteses',
        report: '4-10 páginas',
        deadline: '20-45 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Análise temporal completa',
          'Modelos de transição',
          'Sínteses interpretativas'
        ]
      },
      premium: {
        level: 'premium',
        maps: '20+ mapas + cenários',
        report: '8-15 páginas',
        deadline: '30-90 dias úteis',
        revisions: '2 revisões (extras opcionais)',
        deliverables: [
          'Cenários de uso futuro',
          'Diretrizes de planejamento',
          'Análise multicritério'
        ]
      }
    }
  },
  {
    id: 'erosivity-models',
    title: 'Erosivity Models',
    description: 'Modelagem de erosão e perda de solos (USLE/RUSLE + hotspots).',
    bullets: [
      'Modelagem USLE/RUSLE',
      'Identificação de hotspots de erosão',
      'Priorização de áreas para conservação'
    ],
    accentColor: 'amber',
    packages: {
      essential: {
        level: 'essential',
        maps: '6-12 mapas',
        report: '2-5 páginas',
        deadline: '10-20 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Mapas de fatores USLE',
          'Mapa de perda de solo',
          'Hotspots de erosão'
        ],
        dataRequirements: [
          'DEM/MDT',
          'Dados de solos',
          'Uso/cobertura do solo',
          'Dados de chuva (ou metodologia definida)'
        ]
      },
      professional: {
        level: 'professional',
        maps: '12-20 mapas + sínteses',
        report: '4-10 páginas',
        deadline: '20-40 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Fatores documentados (R, K, LS, C, P)',
          'Análise de sensibilidade',
          'Priorização por sub-bacia'
        ]
      },
      premium: {
        level: 'premium',
        maps: '20+ mapas + cenários',
        report: '8-15 páginas',
        deadline: '30-60 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Integração com PUC/SCUP',
          'Cenários alternativos',
          'Priorização avançada'
        ]
      }
    },
    faq: [
      {
        question: 'Entregam por sub-bacia?',
        answer: 'Sim, como padrão.'
      },
      {
        question: 'Inclui recomendações?',
        answer: 'Sim, como diretrizes técnicas no relatório.'
      }
    ]
  },
  {
    id: 'conservation-potential',
    title: 'Conservation Potential',
    description: 'Potencial de uso conservacionista (PUC/SCUP) + fragilidade.',
    bullets: [
      'Mapas de PUC/SCUP',
      'Análise de fragilidade ambiental',
      'Priorização conservacionista'
    ],
    accentColor: 'emerald',
    packages: {
      professional: {
        level: 'professional',
        maps: '12-20 mapas + sínteses',
        report: '4-10 páginas',
        deadline: '25-45 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'PUC e subclasses',
          'Síntese interpretativa',
          'Áreas prioritárias'
        ],
        dataRequirements: [
          'DEM/MDT',
          'Dados de solos',
          'Litologia (ou equivalentes)',
          'Classes/limiares (ou padrão recomendado)'
        ]
      },
      premium: {
        level: 'premium',
        maps: '20+ mapas + cenários',
        report: '8-15 páginas',
        deadline: '30-50 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Máscaras de robustez',
          'Integração com USLE/fragilidade',
          'Priorização avançada'
        ]
      }
    },
    faq: [
      {
        question: 'Posso usar com máscara de uso/MapBiomas?',
        answer: 'Sim.'
      },
      {
        question: 'Entregam mapas de incerteza?',
        answer: 'Se contratado, sim.'
      }
    ]
  },
  {
    id: 'phytophysiological-dynamics',
    title: 'Phytophysiological Dynamics',
    description: 'NDVI/EVI, anomalias, sazonalidade e indicadores.',
    bullets: [
      'Análise de NDVI/EVI temporal',
      'Detecção de anomalias',
      'Indicadores de sazonalidade'
    ],
    accentColor: 'cyan',
    packages: {
      essential: {
        level: 'essential',
        maps: '6-12 mapas',
        report: '2-5 páginas',
        deadline: '10-25 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Séries temporais NDVI/EVI',
          'Mapas de anomalias',
          'Indicadores sazonais'
        ]
      },
      professional: {
        level: 'professional',
        maps: '12-20 mapas + sínteses',
        report: '4-10 páginas',
        deadline: '20-40 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Análise de tendências',
          'Sínteses por cultura/território',
          'Relatórios com leitura prática'
        ]
      },
      premium: {
        level: 'premium',
        maps: '20+ mapas + cenários',
        report: '8-15 páginas',
        deadline: '30-60 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Cenários e interpretação',
          'Análise de vulnerabilidade',
          'Diretrizes para decisão'
        ]
      }
    }
  },
  {
    id: 'ecological-connectivity',
    title: 'Ecological Connectivity',
    description: 'Conectividade da paisagem, corredores e priorização de restauração.',
    bullets: [
      'Análise de fragmentação',
      'Mapas de conectividade',
      'Corredores ecológicos e priorização'
    ],
    accentColor: 'lime',
    packages: {
      professional: {
        level: 'professional',
        maps: '12-20 mapas + sínteses',
        report: '4-10 páginas',
        deadline: '20-45 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Cobertura vegetal e fragmentação',
          'Conectividade (indicadores)',
          'Priorização de restauração',
          'Corredores ecológicos'
        ]
      },
      premium: {
        level: 'premium',
        maps: '20+ mapas + cenários',
        report: '8-15 páginas',
        deadline: '30-60 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Cenários alternativos',
          'Diretrizes de mitigação',
          'Apoio a compensação'
        ]
      }
    },
    faq: [
      {
        question: 'Fazem corredores ecológicos?',
        answer: 'Sim, conforme critério e dados.'
      },
      {
        question: 'Integra PSA?',
        answer: 'Pode integrar como camada de decisão.'
      }
    ]
  },
  {
    id: 'precision-mapping',
    title: 'Precision Mapping',
    description: 'Drone: ortofotos, MDT/MDS e produtos high-ticket.',
    bullets: [
      'Ortofotos de alta resolução',
      'MDT/MDS precisos',
      'Produtos derivados e volumetria'
    ],
    accentColor: 'purple',
    highTicket: true,
    packages: {
      essential: {
        level: 'essential',
        maps: 'Ortofoto + modelos',
        report: 'Relatório técnico',
        deadline: '7-25 dias úteis (condicionado a campo/clima)',
        revisions: '2 revisões',
        deliverables: [
          'Ortofoto georreferenciada',
          'MDS/MDT',
          'Base pronta para GIS/CAD'
        ],
        dataRequirements: [
          'Área e objetivo',
          'Restrições operacionais',
          'Janela de voo',
          'Autorizações e logística'
        ]
      },
      professional: {
        level: 'professional',
        maps: 'Derivados + mapas técnicos',
        report: 'Relatório técnico completo',
        deadline: '10-30 dias úteis',
        revisions: '2 revisões',
        deliverables: [
          'Declividade',
          'Drenagem',
          'Produtos derivados'
        ]
      },
      premium: {
        level: 'premium',
        maps: 'Volumetria + acompanhamento',
        report: 'Relatório técnico avançado',
        deadline: 'Sob cronograma do projeto',
        revisions: '2 revisões',
        deliverables: [
          'Volumetria',
          'Acompanhamento temporal',
          'Inspeções especializadas'
        ]
      }
    },
    faq: [
      {
        question: 'Vocês fazem o voo?',
        answer: 'Depende do arranjo (cliente/parceiro).'
      },
      {
        question: 'Prazo depende do clima?',
        answer: 'Sim, quando há aquisição em campo.'
      }
    ]
  }
];

export const defaultDeliverables = [
  'Atlas cartográfico (PDF) com layouts técnicos editoriais',
  'Base geoespacial organizada (GeoPackage/FGDB) + metadados',
  'Camadas finais (GeoTIFF/Vetor) + simbologia (QML/SLD)',
  'Relatório técnico curto (método + resultados + limitações)',
  '(Opcional) figuras, séries temporais e sínteses para apresentação'
];

export const defaultFAQ = [
  {
    question: 'Vocês entregam só PDF?',
    answer: 'Não. Entregamos atlas PDF + base geoespacial + metadados + simbologia.'
  },
  {
    question: 'Eu não tenho todos os dados.',
    answer: 'Podemos compor com bases públicas e integrar dados do cliente.'
  },
  {
    question: 'Como funciona a revisão?',
    answer: '2 rodadas inclusas: layout/simbologia/texto e ajustes pontuais.'
  },
  {
    question: 'Mudança de escopo gera custo adicional?',
    answer: 'Sim. Nova área, período, indicadores, datasets ou pacote → aditivo.'
  },
  {
    question: 'Os resultados dependem da qualidade dos dados?',
    answer: 'Sim, e isso é explicitado no relatório com limitações documentadas.'
  }
];
