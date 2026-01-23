import { Layers, Code, Brain } from "lucide-react";

export interface AcademyCourse {
  slug: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  capabilities: string[];
  overview: string;
  methodology: string;
  audience: string;
  bullets: string[];
  outcome: string;
  modules: {
    title: string;
    content: string;
    aulas: number;
    duracao: string;
    open: boolean;
  }[];
  prerequisites: string[];
  professionalProfile: string[];
}

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    slug: "qgis-automacao",
    title: "Tema em Desenvolvimento",
    subtitle: "Automação de fluxos espaciais, métricas e análises territoriais no QGIS.",
    icon: Layers,
    capabilities: [
      "Estruturar fluxos automatizados para análise geoespacial no QGIS",
      "Interpretar métricas espaciais para análise e suporte à decisão",
      "Integrar diferentes fontes de dados geoespaciais e gerar análises integradas",
      "Compreender limites entre metodologia científica e implementação técnica"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Processamento automatizado de dados geoespaciais",
      "Desenvolvimento de workflows personalizados",
      "Interpretação de métricas e indicadores territoriais",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de estruturar processos automatizados para análise territorial, interpretar métricas espaciais e integrar dados geoespaciais em workflows eficientes, aplicando rigor técnico e eficiência operacional.",
    modules: [
      {
        title: "Fase 1: Fundamentos de Automação Geoespacial",
        content: "Conceitos essenciais de automação aplicada à análise geoespacial, estruturação de workflows e boas práticas.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Processamento Automatizado no QGIS",
        content: "Desenvolvimento de rotinas automatizadas, modelagem de dados e processamento em lote.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Análises Territoriais e Métricas",
        content: "Aplicação de métricas espaciais, análise territorial e geração de indicadores para suporte à decisão.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Integração de Dados e Workflows",
        content: "Integração de diferentes fontes de dados, construção de workflows complexos e otimização de processos.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em QGIS ou SIG.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "r-inteligencia-geoespacial",
    title: "Tema em Desenvolvimento",
    subtitle: "Automação, reprodutibilidade e análise espacial com R.",
    icon: Code,
    capabilities: [
      "Desenvolver e implementar processos automatizados para análise geoespacial com R",
      "Compreender e aplicar métricas territoriais para análise e suporte à decisão",
      "Conectar diferentes fontes de dados geoespaciais e gerar análises integradas com reprodutibilidade",
      "Distinguir entre metodologia científica e implementação técnica, aplicando o conhecimento adequado em cada contexto"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Programação estatística aplicada à análise espacial",
      "Automação de processos geoespaciais com R",
      "Reprodutibilidade e versionamento de análises",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de desenvolver processos automatizados para análise geoespacial com R, aplicando rigor científico e garantindo reprodutibilidade em seus projetos de análise territorial.",
    modules: [
      {
        title: "Fase 1: Fundamentos de R para Análise Espacial",
        content: "Conceitos essenciais de programação em R aplicada à análise geoespacial, estruturação de projetos e boas práticas.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Automação de Processos Geoespaciais",
        content: "Desenvolvimento de rotinas automatizadas, processamento em lote e integração de dados espaciais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Análise Espacial e Modelagem",
        content: "Aplicação de técnicas de análise espacial, modelagem estatística e geração de outputs profissionais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Reprodutibilidade e Versionamento",
        content: "Estruturação de projetos reprodutíveis, versionamento de código e documentação técnica.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em programação ou análise de dados.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "r-mudancas-uso-cobertura",
    title: "Tema em Desenvolvimento",
    subtitle: "Matrizes de transição, métricas e interpretação automatizada.",
    icon: Brain,
    capabilities: [
      "Desenvolver e implementar processos automatizados para análise de mudanças de uso e cobertura da terra com R",
      "Compreender e aplicar métricas de transição, ganhos, perdas e mudanças para análise territorial",
      "Conectar diferentes fontes de dados geoespaciais e gerar análises integradas de mudanças territoriais",
      "Distinguir entre metodologia científica e implementação técnica, aplicando o conhecimento adequado em cada contexto"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Análise automatizada de mudanças de uso e cobertura da terra",
      "Geração de matrizes de transição e métricas",
      "Interpretação de padrões de mudança territorial",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de desenvolver processos automatizados para análise de mudanças de uso e cobertura da terra, gerando matrizes de transição, métricas e interpretações profissionais para suporte à decisão.",
    modules: [
      {
        title: "Fase 1: Fundamentos de Análise de Mudanças",
        content: "Conceitos essenciais de análise temporal, matrizes de transição e métricas de mudança de uso e cobertura da terra.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Processamento Automatizado de Dados Temporais",
        content: "Desenvolvimento de rotinas automatizadas para processamento de séries temporais de dados geoespaciais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Geração de Matrizes e Métricas",
        content: "Cálculo de matrizes de transição, métricas de ganho, perda e mudança, e interpretação de padrões.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Visualização e Interpretação",
        content: "Geração de gráficos profissionais, mapas de mudança e relatórios técnicos para suporte à decisão.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em programação ou análise de dados.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "qgis-automacao-2",
    title: "Tema em Desenvolvimento",
    subtitle: "Automação de fluxos espaciais, métricas e análises territoriais no QGIS.",
    icon: Layers,
    capabilities: [
      "Estruturar fluxos automatizados para análise geoespacial no QGIS",
      "Interpretar métricas espaciais para análise e suporte à decisão",
      "Integrar diferentes fontes de dados geoespaciais e gerar análises integradas",
      "Compreender limites entre metodologia científica e implementação técnica"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Processamento automatizado de dados geoespaciais",
      "Desenvolvimento de workflows personalizados",
      "Interpretação de métricas e indicadores territoriais",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de estruturar processos automatizados para análise territorial, interpretar métricas espaciais e integrar dados geoespaciais em workflows eficientes, aplicando rigor técnico e eficiência operacional.",
    modules: [
      {
        title: "Fase 1: Fundamentos de Automação Geoespacial",
        content: "Conceitos essenciais de automação aplicada à análise geoespacial, estruturação de workflows e boas práticas.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Processamento Automatizado no QGIS",
        content: "Desenvolvimento de rotinas automatizadas, modelagem de dados e processamento em lote.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Análises Territoriais e Métricas",
        content: "Aplicação de métricas espaciais, análise territorial e geração de indicadores para suporte à decisão.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Integração de Dados e Workflows",
        content: "Integração de diferentes fontes de dados, construção de workflows complexos e otimização de processos.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em QGIS ou SIG.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "qgis-automacao-3",
    title: "Tema em Desenvolvimento",
    subtitle: "Automação de fluxos espaciais, métricas e análises territoriais no QGIS.",
    icon: Layers,
    capabilities: [
      "Estruturar fluxos automatizados para análise geoespacial no QGIS",
      "Interpretar métricas espaciais para análise e suporte à decisão",
      "Integrar diferentes fontes de dados geoespaciais e gerar análises integradas",
      "Compreender limites entre metodologia científica e implementação técnica"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Processamento automatizado de dados geoespaciais",
      "Desenvolvimento de workflows personalizados",
      "Interpretação de métricas e indicadores territoriais",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de estruturar processos automatizados para análise territorial, interpretar métricas espaciais e integrar dados geoespaciais em workflows eficientes, aplicando rigor técnico e eficiência operacional.",
    modules: [
      {
        title: "Fase 1: Fundamentos de Automação Geoespacial",
        content: "Conceitos essenciais de automação aplicada à análise geoespacial, estruturação de workflows e boas práticas.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Processamento Automatizado no QGIS",
        content: "Desenvolvimento de rotinas automatizadas, modelagem de dados e processamento em lote.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Análises Territoriais e Métricas",
        content: "Aplicação de métricas espaciais, análise territorial e geração de indicadores para suporte à decisão.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Integração de Dados e Workflows",
        content: "Integração de diferentes fontes de dados, construção de workflows complexos e otimização de processos.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em QGIS ou SIG.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "r-inteligencia-geoespacial-2",
    title: "Tema em Desenvolvimento",
    subtitle: "Automação, reprodutibilidade e análise espacial com R.",
    icon: Code,
    capabilities: [
      "Desenvolver e implementar processos automatizados para análise geoespacial com R",
      "Compreender e aplicar métricas territoriais para análise e suporte à decisão",
      "Conectar diferentes fontes de dados geoespaciais e gerar análises integradas com reprodutibilidade",
      "Distinguir entre metodologia científica e implementação técnica, aplicando o conhecimento adequado em cada contexto"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Programação estatística aplicada à análise espacial",
      "Automação de processos geoespaciais com R",
      "Reprodutibilidade e versionamento de análises",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de desenvolver processos automatizados para análise geoespacial com R, aplicando rigor científico e garantindo reprodutibilidade em seus projetos de análise territorial.",
    modules: [
      {
        title: "Fase 1: Fundamentos de R para Análise Espacial",
        content: "Conceitos essenciais de programação em R aplicada à análise geoespacial, estruturação de projetos e boas práticas.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Automação de Processos Geoespaciais",
        content: "Desenvolvimento de rotinas automatizadas, processamento em lote e integração de dados espaciais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Análise Espacial e Modelagem",
        content: "Aplicação de técnicas de análise espacial, modelagem estatística e geração de outputs profissionais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Reprodutibilidade e Versionamento",
        content: "Estruturação de projetos reprodutíveis, versionamento de código e documentação técnica.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em programação ou análise de dados.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "r-inteligencia-geoespacial-3",
    title: "Tema em Desenvolvimento",
    subtitle: "Automação, reprodutibilidade e análise espacial com R.",
    icon: Code,
    capabilities: [
      "Desenvolver e implementar processos automatizados para análise geoespacial com R",
      "Compreender e aplicar métricas territoriais para análise e suporte à decisão",
      "Conectar diferentes fontes de dados geoespaciais e gerar análises integradas com reprodutibilidade",
      "Distinguir entre metodologia científica e implementação técnica, aplicando o conhecimento adequado em cada contexto"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Programação estatística aplicada à análise espacial",
      "Automação de processos geoespaciais com R",
      "Reprodutibilidade e versionamento de análises",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de desenvolver processos automatizados para análise geoespacial com R, aplicando rigor científico e garantindo reprodutibilidade em seus projetos de análise territorial.",
    modules: [
      {
        title: "Fase 1: Fundamentos de R para Análise Espacial",
        content: "Conceitos essenciais de programação em R aplicada à análise geoespacial, estruturação de projetos e boas práticas.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Automação de Processos Geoespaciais",
        content: "Desenvolvimento de rotinas automatizadas, processamento em lote e integração de dados espaciais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Análise Espacial e Modelagem",
        content: "Aplicação de técnicas de análise espacial, modelagem estatística e geração de outputs profissionais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Reprodutibilidade e Versionamento",
        content: "Estruturação de projetos reprodutíveis, versionamento de código e documentação técnica.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em programação ou análise de dados.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "r-mudancas-uso-cobertura-2",
    title: "Tema em Desenvolvimento",
    subtitle: "Matrizes de transição, métricas e interpretação automatizada.",
    icon: Brain,
    capabilities: [
      "Desenvolver e implementar processos automatizados para análise de mudanças de uso e cobertura da terra com R",
      "Compreender e aplicar métricas de transição, ganhos, perdas e mudanças para análise territorial",
      "Conectar diferentes fontes de dados geoespaciais e gerar análises integradas de mudanças territoriais",
      "Distinguir entre metodologia científica e implementação técnica, aplicando o conhecimento adequado em cada contexto"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Análise automatizada de mudanças de uso e cobertura da terra",
      "Geração de matrizes de transição e métricas",
      "Interpretação de padrões de mudança territorial",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de desenvolver processos automatizados para análise de mudanças de uso e cobertura da terra, gerando matrizes de transição, métricas e interpretações profissionais para suporte à decisão.",
    modules: [
      {
        title: "Fase 1: Fundamentos de Análise de Mudanças",
        content: "Conceitos essenciais de análise temporal, matrizes de transição e métricas de mudança de uso e cobertura da terra.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Processamento Automatizado de Dados Temporais",
        content: "Desenvolvimento de rotinas automatizadas para processamento de séries temporais de dados geoespaciais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Geração de Matrizes e Métricas",
        content: "Cálculo de matrizes de transição, métricas de ganho, perda e mudança, e interpretação de padrões.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Visualização e Interpretação",
        content: "Geração de gráficos profissionais, mapas de mudança e relatórios técnicos para suporte à decisão.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em programação ou análise de dados.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
  {
    slug: "r-mudancas-uso-cobertura-3",
    title: "Tema em Desenvolvimento",
    subtitle: "Matrizes de transição, métricas e interpretação automatizada.",
    icon: Brain,
    capabilities: [
      "Desenvolver e implementar processos automatizados para análise de mudanças de uso e cobertura da terra com R",
      "Compreender e aplicar métricas de transição, ganhos, perdas e mudanças para análise territorial",
      "Conectar diferentes fontes de dados geoespaciais e gerar análises integradas de mudanças territoriais",
      "Distinguir entre metodologia científica e implementação técnica, aplicando o conhecimento adequado em cada contexto"
    ],
    overview: "Este curso apresenta os fundamentos técnicos e conceituais da automação aplicada à análise geoespacial, utilizando ferramentas consolidadas e fluxos profissionais.",
    methodology: "A capacitação prioriza a compreensão metodológica e a aplicação prática de ferramentas consolidadas, preparando profissionais para enfrentar desafios complexos de análise espacial com rigor técnico e eficiência operacional.",
    audience: "Profissionais que trabalham com análise geoespacial e geoprocessamento, consultores ambientais e territoriais, pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis.",
    bullets: [
      "Acesso Vitalício ao Conteúdo",
      "Análise automatizada de mudanças de uso e cobertura da terra",
      "Geração de matrizes de transição e métricas",
      "Interpretação de padrões de mudança territorial",
      "Documentação técnica e materiais complementares"
    ],
    outcome: "Você será capaz de desenvolver processos automatizados para análise de mudanças de uso e cobertura da terra, gerando matrizes de transição, métricas e interpretações profissionais para suporte à decisão.",
    modules: [
      {
        title: "Fase 1: Fundamentos de Análise de Mudanças",
        content: "Conceitos essenciais de análise temporal, matrizes de transição e métricas de mudança de uso e cobertura da terra.",
        aulas: 0,
        duracao: "00h 00m",
        open: true,
      },
      {
        title: "Fase 2: Processamento Automatizado de Dados Temporais",
        content: "Desenvolvimento de rotinas automatizadas para processamento de séries temporais de dados geoespaciais.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 3: Geração de Matrizes e Métricas",
        content: "Cálculo de matrizes de transição, métricas de ganho, perda e mudança, e interpretação de padrões.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
      {
        title: "Fase 4: Visualização e Interpretação",
        content: "Geração de gráficos profissionais, mapas de mudança e relatórios técnicos para suporte à decisão.",
        aulas: 0,
        duracao: "00h 00m",
        open: false,
      },
    ],
    prerequisites: [
      "Computador com acesso à internet (Windows, Mac ou Linux).",
      "Conhecimento básico em programação ou análise de dados.",
      "Vontade de automatizar processos e ganhar tempo.",
    ],
    professionalProfile: [
      "Profissionais que trabalham com análise geoespacial e geoprocessamento",
      "Consultores ambientais e territoriais",
      "Pesquisadores e analistas que precisam de resultados técnicos rápidos e confiáveis",
      "Equipes que buscam automatizar processos repetitivos",
    ],
  },
];

export function getAcademyCourseBySlug(slug: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((course) => course.slug === slug);
}

