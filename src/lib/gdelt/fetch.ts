/**
 * Funções para buscar dados do GDELT API
 * Usa a DOC API para buscar termos sobre geopolítica, recursos naturais e conflitos
 */

import { safeFetchJson } from '@/lib/security/ssrf';

export interface GDELTTerm {
  term: string;
  count: number;
  score?: number;
}

export interface GDELTResponse {
  terms: GDELTTerm[];
  total: number;
}

/**
 * Tipo para artigo do GDELT API
 */
interface GDELTArticle {
  title?: unknown;
  snippet?: unknown;
}

/**
 * Type guard para verificar se um valor é string
 */
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Extrai string de forma segura de um valor desconhecido
 */
function safeString(value: unknown): string {
  return isString(value) ? value : '';
}

/**
 * Buscar termos do GDELT usando a DOC API
 * Foca em: geopolítica, recursos naturais, conflitos
 */
export async function fetchGDELTTerms(context: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao' = 'strategy'): Promise<GDELTTerm[]> {
  // Permitir forçar mock via variável de ambiente (útil para testes)
  if (process.env.USE_MOCK_GDELT === 'true') {
    console.log(`[GDELT] Mock forçado via USE_MOCK_GDELT para ${context}`);
    return getMockTerms(context);
  }
  
  // Buscar dados REAIS do GDELT (sem bloqueio de produção)
  
  try {
    // GDELT DOC API endpoint - Buscar documentos das últimas 48h
    let query: string;
    let keywords: string[];
    
    if (context === 'academy') {
      // Query focada em educação e mercado de trabalho geoespacial
      query = '"spatial data science jobs" OR "GIS career trends" OR "geospatial analytics demand" OR "remote sensing education" OR "professional mapping certifications" OR "LiDAR jobs market" OR "geospatial education" OR "cartography careers"';
      keywords = [
        'spatial data science', 'gis career', 'geospatial analytics', 'remote sensing education',
        'mapping certification', 'lidar jobs', 'cartography', 'geography', 'geospatial',
        'career', 'job', 'employment', 'education', 'training', 'certification', 'degree',
        'university', 'academic', 'research', 'phd', 'master', 'bachelor', 'course',
        'workshop', 'seminar', 'conference', 'professional', 'skills', 'competency',
        'geospatial technology', 'spatial analysis', 'geographic information systems',
        'surveying', 'geodesy', 'photogrammetry', 'remote sensing', 'earth observation',
        'geospatial intelligence', 'location intelligence', 'spatial thinking'
      ];
    } else if (context === 'tech') {
      // Query focada em inovação tecnológica geoespacial
      query = '"remote sensing technology" OR "GeoAI" OR "satellite data processing" OR "LiDAR innovation" OR "Synthetic Aperture Radar" OR "SAR" OR "Python for GIS" OR "cloud geoprocessing" OR "digital twins infrastructure" OR "geospatial automation"';
      keywords = [
        'remote sensing', 'geoai', 'geospatial ai', 'satellite', 'lidar', 'sar', 'synthetic aperture radar',
        'python', 'gis', 'qgis', 'arcgis', 'cloud geoprocessing', 'digital twin', 'automation',
        'geoprocessing', 'spatial analysis', 'machine learning', 'deep learning', 'neural network',
        'image processing', 'computer vision', 'geospatial data', 'raster', 'vector', 'geodatabase',
        'api', 'rest', 'geoserver', 'postgis', 'geoserver', 'mapserver', 'openlayers', 'leaflet',
        'django', 'flask', 'fastapi', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
        'sentinel', 'landsat', 'modis', 'aster', 'radar', 'optical', 'multispectral', 'hyperspectral'
      ];
    } else if (context === 'market') {
      // Query focada em mercado e negócios
      query = '"geotech industry" OR "space economy" OR "precision agriculture investment" OR "digital twin business" OR "geospatial startups" OR "smart cities market" OR "geospatial technology" OR "location intelligence" OR "spatial analytics market"';
      keywords = [
        'geotech', 'geospatial', 'gis', 'remote sensing', 'satellite', 'earth observation',
        'precision agriculture', 'agtech', 'smart farming', 'digital twin', 'smart cities',
        'location intelligence', 'spatial analytics', 'mapping technology', 'cartography',
        'startup', 'investment', 'venture capital', 'market', 'industry', 'business',
        'innovation', 'technology', 'data analytics', 'iot', 'ai', 'machine learning',
        'autonomous vehicles', 'drones', 'lidar', 'radar', 'surveying', 'geodesy'
      ];
    } else if (context === 'studio') {
      // Query focada em serviços cartográficos e demanda de mapas
      query = '"cartography services demand" OR "land cover mapping trends" OR "environmental consultancy market" OR "drone surveying innovation" OR "geospatial mapping services" OR "cartographic analysis" OR "GIS consulting market"';
      keywords = [
        'cartography', 'mapping services', 'land cover', 'environmental mapping',
        'drone surveying', 'GIS consulting', 'cartographic', 'spatial analysis services',
        'geospatial services', 'mapping demand', 'territorial planning', 'environmental consultancy'
      ];
    } else if (context === 'studio-pericia-avaliacao') {
      // Query focada em perícia e avaliação geoespacial
      query = '"geospatial forensics" OR "environmental expert witness" OR "land valuation rural" OR "SIGEF georeferencing demand" OR "forensic cartography" OR "environmental litigation geospatial evidence"';
      keywords = [
        'geospatial forensics', 'forensic cartography', 'expert witness', 'environmental expert',
        'land valuation', 'rural property', 'SIGEF', 'georeferencing', 'property assessment',
        'environmental litigation', 'geospatial evidence', 'legal mapping', 'cadastral mapping',
        'property rights', 'land tenure', 'rural appraisal', 'agricultural valuation'
      ];
    } else if (context === 'research') {
      // Query focada em pesquisa geoespacial e validação de protocolos
      query = '"geospatial research" OR "remote sensing benchmarks" OR "spatial data science protocols" OR "GIS innovation" OR "geospatial validation" OR "spatial analysis methods" OR "geospatial reproducibility"';
      keywords = [
        'geospatial research', 'remote sensing benchmarks', 'spatial data science protocols',
        'gis innovation', 'geospatial validation', 'spatial analysis methods',
        'geospatial reproducibility', 'benchmark', 'protocol', 'validation', 'reproducibility',
        'research', 'methodology', 'method', 'algorithm', 'comparison', 'evaluation',
        'testing', 'quality assurance', 'qa', 'standard', 'best practice', 'framework',
        'geospatial science', 'spatial science', 'geographic research', 'cartographic research',
        'remote sensing research', 'gis research', 'spatial analysis research', 'geoprocessing research',
        'geospatial dataset', 'reference data', 'ground truth', 'validation dataset', 'test dataset',
        'spatial accuracy', 'temporal accuracy', 'thematic accuracy', 'positional accuracy'
      ];
    } else {
      // Query focada em geopolítica (strategy) - Expandida para incluir mais termos
      query = 'geopolitics OR "natural resources" OR conflict OR "energy security" OR "water conflict" OR "climate change" OR "strategic minerals" OR "environmental impact" OR "global warming" OR "resource scarcity" OR "territorial dispute" OR "energy crisis"';
      keywords = [
        // Energia e Recursos
        'petroleum', 'oil', 'gas', 'natural gas', 'crude oil', 'energy', 'energy security', 'energy crisis',
        'water', 'water conflict', 'water scarcity', 'water resources', 'hydropower',
        'resource', 'natural resources', 'mineral', 'strategic minerals', 'rare earth', 'commodity',
        'supply', 'demand', 'price', 'export', 'import', 'trade',
        
        // Geopolítica e Conflitos
        'geopolitics', 'conflict', 'war', 'sanctions', 'embargo', 'crisis', 'tension',
        'alliance', 'treaty', 'agreement', 'dispute', 'border', 'territory', 'territorial dispute',
        'power', 'influence', 'hegemony', 'sovereignty', 'diplomacy',
        
        // Regiões e Países
        'middle east', 'asia', 'europe', 'africa', 'america', 'latin america',
        'russia', 'china', 'usa', 'united states', 'iran', 'saudi', 'saudi arabia',
        'ukraine', 'israel', 'palestine', 'syria', 'iraq', 'afghanistan',
        'brazil', 'india', 'japan', 'south korea', 'germany', 'france', 'uk', 'united kingdom',
        
        // Clima e Meio Ambiente
        'climate', 'climate change', 'global warming', 'environment', 'environmental impact',
        'carbon', 'emissions', 'greenhouse', 'renewable energy', 'sustainability',
        'deforestation', 'biodiversity', 'ecosystem', 'pollution',
        
        // Impactos Globais
        'migration', 'refugee', 'displacement', 'humanitarian crisis',
        'security', 'defense', 'military', 'nuclear', 'weapons',
        'economy', 'economic', 'financial', 'market', 'investment',
        
        // Português
        'petróleo', 'energia', 'água', 'conflito', 'sanções', 'comércio', 'crise',
        'geopolítica', 'recursos naturais', 'mudanças climáticas', 'meio ambiente',
        'minerais estratégicos', 'impacto ambiental', 'aquecimento global'
      ];
    }
    
    const mode = 'artlist';
    const format = 'json';
    const maxrecords = context === 'strategy' ? 400 : 250; // Mais registros para Strategy para ter mais termos
    
    // Construir URL de forma segura (usar URL object + searchParams)
    const apiUrl = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
    apiUrl.searchParams.set('query', query);
    apiUrl.searchParams.set('mode', mode);
    apiUrl.searchParams.set('format', format);
    apiUrl.searchParams.set('maxrecords', maxrecords.toString());
    apiUrl.searchParams.set('timespan', '48h');
    
    // Usar safeFetchJson com proteções SSRF
    // - HTTPS only
    // - Allowlist de hosts
    // - Bloqueio de redirects
    // - Timeout com AbortController
    // - Validação de Content-Type e tamanho
    const data = await safeFetchJson<{ articles?: GDELTArticle[] }>(
      apiUrl,
      {
        allowedHosts: ['api.gdeltproject.org'],
        timeoutMs: 5000,
        maxSizeBytes: 1_000_000, // 1MB
      }
    );
    
    // Extrair termos dos documentos
    const terms: Record<string, number> = {};
    
    if (data.articles && Array.isArray(data.articles)) {
      data.articles.forEach((article: GDELTArticle) => {
        // Extrair termos do título e descrição com type guards
        const title = safeString(article.title);
        const snippet = safeString(article.snippet);
        const text = `${title} ${snippet}`.toLowerCase();
        
        // Usar keywords definidas acima baseado no contexto
        keywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
          const matches = text.match(regex);
          if (matches) {
            terms[keyword] = (terms[keyword] || 0) + matches.length;
          }
        });
      });
    }
    
    // Converter para array, normalizar termos e ordenar por volume
    const termsArray: GDELTTerm[] = Object.entries(terms)
      .map(([term, count]) => ({ 
        term: normalizeTerm(term, context), 
        count 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, context === 'strategy' ? 50 : 50); // Top 50 termos (padrão Big Tech: 30-50 palavras)
    
    // Se não houver termos suficientes (menos de 25), usar dados mockados expandidos
    // Isso garante que sempre teremos uma boa variedade de termos
    if (termsArray.length < 25) {
      const mockTerms = getMockTerms(context);
      return mockTerms.map(t => ({ ...t, term: normalizeTerm(t.term, context) }));
    }
    
    return termsArray;
  } catch (error) {
    // Log seguro (não vazar URL completa, apenas host/path)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const safeError = errorMessage.includes('api.gdeltproject.org') 
      ? errorMessage.replace(/https?:\/\/[^\/]+/, 'api.gdeltproject.org')
      : errorMessage;
    console.error('[GDELT] Erro ao buscar termos:', safeError);
    // Retornar dados mockados em caso de erro
    return getMockTerms(context);
  }
}

/**
 * Calcular score baseado em volume e aceleração (trending)
 */
export function calculateTermScores(
  currentTerms: GDELTTerm[],
  previousTerms?: GDELTTerm[]
): Array<{ term: string; score: number; volume: number; acceleration: number }> {
  const previousMap = previousTerms 
    ? new Map(previousTerms.map(t => [t.term, t.count]))
    : new Map();
  
  return currentTerms.map(({ term, count }) => {
    const previousCount = previousMap.get(term) || 0;
    const acceleration = previousCount > 0 
      ? ((count - previousCount) / previousCount) * 100 
      : count * 10; // Boost para novos termos
    
    // Score = volume * (1 + aceleração normalizada)
    const normalizedAcceleration = Math.min(Math.max(acceleration / 100, 0), 2); // Limitar entre 0 e 2
    const score = count * (1 + normalizedAcceleration);
    
    return {
      term,
      score,
      volume: count,
      acceleration,
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Mapear termos para tags em português (quando aplicável)
 */
function normalizeTerm(term: string, context: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao' = 'strategy'): string {
  if (context === 'academy') {
    const academyTermMap: Record<string, string> = {
      'spatial data science': 'Ciência de Dados Espaciais',
      'gis career': 'Carreira em SIG',
      'geospatial analytics': 'Análise Geoespacial',
      'remote sensing education': 'Educação em Sensoriamento Remoto',
      'mapping certification': 'Certificação em Mapeamento',
      'lidar jobs': 'Oportunidades LiDAR',
      'cartography': 'Cartografia',
      'geography': 'Geografia',
      'geospatial': 'Geoespacial',
      'career': 'Carreira',
      'job': 'Emprego',
      'employment': 'Oportunidades',
      'education': 'Educação',
      'training': 'Treinamento',
      'certification': 'Certificação',
      'degree': 'Graduação',
      'university': 'Universidade',
      'academic': 'Acadêmico',
      'research': 'Pesquisa',
      'phd': 'Doutorado',
      'master': 'Mestrado',
      'bachelor': 'Bacharelado',
      'course': 'Curso',
      'workshop': 'Workshop',
      'seminar': 'Seminário',
      'conference': 'Conferência',
      'professional': 'Profissional',
      'skills': 'Habilidades',
      'competency': 'Competência',
      'geospatial technology': 'Tecnologia Geoespacial',
      'spatial analysis': 'Análise Espacial',
      'geographic information systems': 'Sistemas de Informação Geográfica',
      'surveying': 'Topografia',
      'geodesy': 'Geodésia',
      'photogrammetry': 'Fotogrametria',
      'remote sensing': 'Sensoriamento Remoto',
      'earth observation': 'Observação da Terra',
      'geospatial intelligence': 'Inteligência Geoespacial',
      'location intelligence': 'Inteligência de Localização',
      'spatial thinking': 'Pensamento Espacial',
    };
    return academyTermMap[term.toLowerCase()] || term;
  } else if (context === 'tech') {
    const techTermMap: Record<string, string> = {
      'remote sensing': 'Sensoriamento Remoto',
      'geoai': 'GeoAI',
      'geospatial ai': 'GeoAI',
      'satellite': 'Satélite',
      'lidar': 'LiDAR',
      'sar': 'SAR',
      'synthetic aperture radar': 'SAR',
      'python': 'Python',
      'gis': 'SIG',
      'qgis': 'QGIS',
      'arcgis': 'ArcGIS',
      'cloud geoprocessing': 'Geoprocessamento em Nuvem',
      'digital twin': 'Gêmeo Digital',
      'automation': 'Automação',
      'geoprocessing': 'Geoprocessamento',
      'spatial analysis': 'Análise Espacial',
      'machine learning': 'Machine Learning',
      'deep learning': 'Deep Learning',
      'neural network': 'Rede Neural',
      'image processing': 'Processamento de Imagem',
      'computer vision': 'Visão Computacional',
      'geospatial data': 'Dados Geoespaciais',
      'raster': 'Raster',
      'vector': 'Vetor',
      'geodatabase': 'Geodatabase',
      'api': 'API',
      'rest': 'REST',
      'geoserver': 'GeoServer',
      'postgis': 'PostGIS',
      'mapserver': 'MapServer',
      'openlayers': 'OpenLayers',
      'leaflet': 'Leaflet',
      'django': 'Django',
      'flask': 'Flask',
      'fastapi': 'FastAPI',
      'docker': 'Docker',
      'kubernetes': 'Kubernetes',
      'aws': 'AWS',
      'azure': 'Azure',
      'gcp': 'GCP',
      'sentinel': 'Sentinel',
      'landsat': 'Landsat',
      'modis': 'MODIS',
      'aster': 'ASTER',
      'radar': 'Radar',
      'optical': 'Óptico',
      'multispectral': 'Multiespectral',
      'hyperspectral': 'Hiperespectral',
    };
    return techTermMap[term.toLowerCase()] || term;
  } else if (context === 'market') {
    const marketTermMap: Record<string, string> = {
      'geotech': 'GeoTech',
      'geospatial': 'Geoespacial',
      'gis': 'SIG',
      'remote sensing': 'Sensoriamento Remoto',
      'satellite': 'Satélite',
      'earth observation': 'Observação da Terra',
      'precision agriculture': 'Agricultura de Precisão',
      'agtech': 'AgTech',
      'smart farming': 'Agricultura Inteligente',
      'digital twin': 'Gêmeo Digital',
      'smart cities': 'Cidades Inteligentes',
      'location intelligence': 'Inteligência de Localização',
      'spatial analytics': 'Análise Espacial',
      'mapping technology': 'Tecnologia de Mapeamento',
      'startup': 'Startup',
      'investment': 'Investimento',
      'venture capital': 'Capital de Risco',
      'market': 'Mercado',
      'industry': 'Indústria',
      'innovation': 'Inovação',
      'technology': 'Tecnologia',
      'data analytics': 'Análise de Dados',
      'autonomous vehicles': 'Veículos Autônomos',
      'drones': 'Drones',
      'lidar': 'LiDAR',
      'radar': 'Radar',
      'surveying': 'Topografia',
      'geodesy': 'Geodésia',
    };
    return marketTermMap[term.toLowerCase()] || term;
  } else if (context === 'research') {
    const researchTermMap: Record<string, string> = {
      'geospatial research': 'Pesquisa Geoespacial',
      'remote sensing benchmarks': 'Benchmarks Sensoriamento',
      'spatial data science protocols': 'Protocolos Data Science',
      'gis innovation': 'Inovação SIG',
      'geospatial validation': 'Validação Geoespacial',
      'spatial analysis methods': 'Métodos Análise Espacial',
      'reproducibility': 'Reprodutibilidade',
      'benchmark': 'Benchmark',
      'protocol': 'Protocolo',
      'validation': 'Validação',
      'research': 'Pesquisa',
      'methodology': 'Metodologia',
      'method': 'Método',
      'algorithm': 'Algoritmo',
      'comparison': 'Comparação',
      'evaluation': 'Avaliação',
      'testing': 'Teste',
      'quality assurance': 'Garantia de Qualidade',
      'qa': 'QA',
      'standard': 'Padrão',
      'best practice': 'Melhor Prática',
      'framework': 'Framework',
      'geospatial science': 'Ciência Geoespacial',
      'spatial science': 'Ciência Espacial',
      'geographic research': 'Pesquisa Geográfica',
      'cartographic research': 'Pesquisa Cartográfica',
      'remote sensing research': 'Pesquisa Sensoriamento',
      'gis research': 'Pesquisa SIG',
      'spatial analysis research': 'Pesquisa Análise Espacial',
      'geoprocessing research': 'Pesquisa Geoprocessamento',
      'geospatial dataset': 'Dataset Geoespacial',
      'reference data': 'Dados de Referência',
      'ground truth': 'Ground Truth',
      'validation dataset': 'Dataset Validação',
      'test dataset': 'Dataset Teste',
      'spatial accuracy': 'Precisão Espacial',
      'temporal accuracy': 'Precisão Temporal',
      'thematic accuracy': 'Precisão Temática',
      'positional accuracy': 'Precisão Posicional',
    };
    return researchTermMap[term.toLowerCase()] || term;
  } else if (context === 'studio') {
    const studioTermMap: Record<string, string> = {
      'cartography': 'Cartografia',
      'mapping services': 'Serviços de Mapeamento',
      'land cover': 'Uso e Cobertura',
      'environmental mapping': 'Mapeamento Ambiental',
      'drone surveying': 'Levantamento Drone',
      'gis consulting': 'Consultoria SIG',
      'cartographic': 'Cartográfico',
      'spatial analysis services': 'Serviços Análise Espacial',
      'geospatial services': 'Serviços Geoespaciais',
      'mapping demand': 'Demanda Mapeamento',
      'territorial planning': 'Planejamento Territorial',
      'environmental consultancy': 'Consultoria Ambiental',
      'mapping': 'Mapeamento',
      'surveying': 'Levantamento',
      'cartographic analysis': 'Análise Cartográfica',
      'gis services': 'Serviços SIG',
      'spatial services': 'Serviços Espaciais',
    };
    return studioTermMap[term.toLowerCase()] || term;
  }
  
  // Strategy terms
  const strategyTermMap: Record<string, string> = {
    // Energia e Recursos
    'petroleum': 'Petróleo',
    'oil': 'Petróleo',
    'crude oil': 'Petróleo Bruto',
    'gas': 'Gás',
    'natural gas': 'Gás Natural',
    'energy': 'Energia',
    'energy security': 'Segurança Energética',
    'energy crisis': 'Crise Energética',
    'water': 'Água',
    'water conflict': 'Conflito Hídrico',
    'water scarcity': 'Escassez Hídrica',
    'water resources': 'Recursos Hídricos',
    'hydropower': 'Hidrelétrica',
    'resource': 'Recursos',
    'natural resources': 'Recursos Naturais',
    'mineral': 'Mineral',
    'strategic minerals': 'Minerais Estratégicos',
    'rare earth': 'Terras Raras',
    'commodity': 'Commodity',
    'supply': 'Oferta',
    'demand': 'Demanda',
    'price': 'Preço',
    'export': 'Exportação',
    'import': 'Importação',
    'trade': 'Comércio',
    
    // Geopolítica e Conflitos
    'geopolitics': 'Geopolítica',
    'conflict': 'Conflitos',
    'war': 'Guerra',
    'sanctions': 'Sanções',
    'embargo': 'Embargo',
    'crisis': 'Crise',
    'tension': 'Tensão',
    'alliance': 'Aliança',
    'treaty': 'Tratado',
    'agreement': 'Acordo',
    'dispute': 'Disputa',
    'territorial dispute': 'Disputa Territorial',
    'border': 'Fronteira',
    'territory': 'Território',
    'power': 'Poder',
    'influence': 'Influência',
    'hegemony': 'Hegemonia',
    'sovereignty': 'Soberania',
    'diplomacy': 'Diplomacia',
    
    // Regiões e Países
    'middle east': 'Oriente Médio',
    'asia': 'Ásia',
    'europe': 'Europa',
    'africa': 'África',
    'america': 'América',
    'latin america': 'América Latina',
    'russia': 'Rússia',
    'china': 'China',
    'usa': 'EUA',
    'united states': 'Estados Unidos',
    'iran': 'Irã',
    'saudi': 'Arábia Saudita',
    'saudi arabia': 'Arábia Saudita',
    'ukraine': 'Ucrânia',
    'israel': 'Israel',
    'palestine': 'Palestina',
    'syria': 'Síria',
    'iraq': 'Iraque',
    'afghanistan': 'Afeganistão',
    'brazil': 'Brasil',
    'india': 'Índia',
    'japan': 'Japão',
    'south korea': 'Coreia do Sul',
    'germany': 'Alemanha',
    'france': 'França',
    'uk': 'Reino Unido',
    'united kingdom': 'Reino Unido',
    
    // Clima e Meio Ambiente
    'climate': 'Clima',
    'climate change': 'Mudanças Climáticas',
    'global warming': 'Aquecimento Global',
    'environment': 'Meio Ambiente',
    'environmental impact': 'Impacto Ambiental',
    'carbon': 'Carbono',
    'emissions': 'Emissões',
    'greenhouse': 'Efeito Estufa',
    'renewable energy': 'Energia Renovável',
    'sustainability': 'Sustentabilidade',
    'deforestation': 'Desmatamento',
    'biodiversity': 'Biodiversidade',
    'ecosystem': 'Ecossistema',
    'pollution': 'Poluição',
    
    // Impactos Globais
    'migration': 'Migração',
    'refugee': 'Refugiados',
    'displacement': 'Deslocamento',
    'humanitarian crisis': 'Crise Humanitária',
    'security': 'Segurança',
    'defense': 'Defesa',
    'military': 'Militar',
    'nuclear': 'Nuclear',
    'weapons': 'Armas',
    'economy': 'Economia',
    'economic': 'Econômico',
    'financial': 'Financeiro',
    'market': 'Mercado',
    'investment': 'Investimento',
  };
  
  return strategyTermMap[term.toLowerCase()] || term;
}

/**
 * Dados mockados para desenvolvimento/teste
 * EXPORTADO para uso direto em produção (zero custo)
 */
export function getMockTerms(context: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao' = 'strategy'): GDELTTerm[] {
  if (context === 'studio-pericia-avaliacao') {
    return [
      { term: 'geospatial forensics', count: 245 },
      { term: 'forensic cartography', count: 189 },
      { term: 'expert witness', count: 167 },
      { term: 'environmental expert', count: 156 },
      { term: 'land valuation', count: 142 },
      { term: 'rural property', count: 134 },
      { term: 'SIGEF', count: 128 },
      { term: 'georeferencing', count: 115 },
      { term: 'property assessment', count: 108 },
      { term: 'environmental litigation', count: 102 },
      { term: 'geospatial evidence', count: 98 },
      { term: 'legal mapping', count: 87 },
      { term: 'cadastral mapping', count: 76 },
      { term: 'property rights', count: 71 },
      { term: 'land tenure', count: 65 },
      { term: 'rural appraisal', count: 58 },
      { term: 'agricultural valuation', count: 52 },
      { term: 'forensic analysis', count: 48 },
      { term: 'expert testimony', count: 45 },
      { term: 'legal cartography', count: 42 },
    ];
  } else if (context === 'studio') {
    return [
      { term: 'cartography', count: 245 },
      { term: 'mapping services', count: 189 },
      { term: 'land cover', count: 167 },
      { term: 'environmental mapping', count: 156 },
      { term: 'drone surveying', count: 142 },
      { term: 'gis consulting', count: 134 },
      { term: 'cartographic analysis', count: 128 },
      { term: 'territorial planning', count: 115 },
      { term: 'spatial services', count: 108 },
      { term: 'mapping demand', count: 102 },
      { term: 'environmental consultancy', count: 98 },
      { term: 'gis services', count: 87 },
      { term: 'surveying', count: 76 },
      { term: 'cartographic', count: 65 },
      { term: 'geospatial services', count: 54 },
      { term: 'mapping', count: 43 },
      { term: 'spatial analysis', count: 38 },
      { term: 'land use', count: 32 },
      { term: 'territorial', count: 28 },
      { term: 'planning', count: 24 },
    ];
  } else if (context === 'research') {
    return [
      { term: 'geospatial research', count: 245 },
      { term: 'remote sensing benchmarks', count: 189 },
      { term: 'spatial data science protocols', count: 167 },
      { term: 'gis innovation', count: 156 },
      { term: 'geospatial validation', count: 142 },
      { term: 'spatial analysis methods', count: 134 },
      { term: 'reproducibility', count: 128 },
      { term: 'benchmark', count: 115 },
      { term: 'protocol', count: 108 },
      { term: 'validation', count: 102 },
      { term: 'methodology', count: 98 },
      { term: 'algorithm', count: 87 },
      { term: 'comparison', count: 76 },
      { term: 'evaluation', count: 71 },
      { term: 'testing', count: 65 },
      { term: 'quality assurance', count: 58 },
      { term: 'standard', count: 52 },
      { term: 'best practice', count: 48 },
      { term: 'framework', count: 45 },
      { term: 'geospatial dataset', count: 42 },
    ];
  } else if (context === 'academy') {
    return [
      { term: 'spatial data science', count: 245 },
      { term: 'gis career', count: 189 },
      { term: 'geospatial analytics', count: 167 },
      { term: 'remote sensing education', count: 156 },
      { term: 'mapping certification', count: 142 },
      { term: 'lidar jobs', count: 134 },
      { term: 'cartography', count: 128 },
      { term: 'geography', count: 115 },
      { term: 'career', count: 108 },
      { term: 'education', count: 102 },
      { term: 'certification', count: 98 },
      { term: 'training', count: 87 },
      { term: 'professional', count: 76 },
      { term: 'skills', count: 71 },
      { term: 'university', count: 65 },
      { term: 'research', count: 58 },
      { term: 'phd', count: 52 },
      { term: 'master', count: 48 },
      { term: 'workshop', count: 45 },
      { term: 'geospatial technology', count: 42 },
    ];
  } else if (context === 'tech') {
    return [
      { term: 'python', count: 245 },
      { term: 'remote sensing', count: 189 },
      { term: 'geoai', count: 167 },
      { term: 'lidar', count: 156 },
      { term: 'sar', count: 142 },
      { term: 'gis', count: 134 },
      { term: 'cloud geoprocessing', count: 128 },
      { term: 'satellite', count: 115 },
      { term: 'automation', count: 108 },
      { term: 'digital twin', count: 102 },
      { term: 'machine learning', count: 98 },
      { term: 'qgis', count: 87 },
      { term: 'geoprocessing', count: 76 },
      { term: 'spatial analysis', count: 71 },
      { term: 'image processing', count: 65 },
      { term: 'api', count: 58 },
      { term: 'docker', count: 52 },
      { term: 'sentinel', count: 48 },
      { term: 'landsat', count: 45 },
      { term: 'radar', count: 42 },
    ];
  } else if (context === 'market') {
    return [
      { term: 'geospatial', count: 245 },
      { term: 'precision agriculture', count: 189 },
      { term: 'digital twin', count: 167 },
      { term: 'smart cities', count: 156 },
      { term: 'location intelligence', count: 142 },
      { term: 'geotech', count: 134 },
      { term: 'spatial analytics', count: 128 },
      { term: 'gis', count: 115 },
      { term: 'remote sensing', count: 108 },
      { term: 'satellite', count: 102 },
      { term: 'startup', count: 98 },
      { term: 'investment', count: 87 },
      { term: 'innovation', count: 76 },
      { term: 'technology', count: 71 },
      { term: 'market', count: 65 },
      { term: 'drones', count: 58 },
      { term: 'lidar', count: 52 },
      { term: 'autonomous vehicles', count: 48 },
      { term: 'earth observation', count: 45 },
      { term: 'mapping technology', count: 42 },
    ];
  }
  
  // Strategy terms - Expandido com mais termos relevantes
  return [
    // Energia e Recursos
    { term: 'petroleum', count: 245 },
    { term: 'oil', count: 220 },
    { term: 'gas', count: 198 },
    { term: 'natural gas', count: 185 },
    { term: 'energy security', count: 189 },
    { term: 'energy crisis', count: 172 },
    { term: 'water', count: 165 },
    { term: 'water conflict', count: 156 },
    { term: 'water scarcity', count: 148 },
    { term: 'water resources', count: 142 },
    { term: 'natural resources', count: 178 },
    { term: 'strategic minerals', count: 134 },
    { term: 'rare earth', count: 128 },
    { term: 'commodity', count: 115 },
    { term: 'supply', count: 108 },
    { term: 'demand', count: 102 },
    
    // Geopolítica e Conflitos
    { term: 'geopolitics', count: 195 },
    { term: 'conflict', count: 156 },
    { term: 'war', count: 142 },
    { term: 'sanctions', count: 142 },
    { term: 'embargo', count: 128 },
    { term: 'crisis', count: 134 },
    { term: 'tension', count: 115 },
    { term: 'territorial dispute', count: 108 },
    { term: 'border', count: 98 },
    { term: 'territory', count: 92 },
    { term: 'power', count: 165 },
    { term: 'influence', count: 142 },
    { term: 'sovereignty', count: 128 },
    { term: 'diplomacy', count: 115 },
    
    // Regiões e Países
    { term: 'middle east', count: 167 },
    { term: 'ukraine', count: 145 },
    { term: 'russia', count: 138 },
    { term: 'china', count: 132 },
    { term: 'iran', count: 125 },
    { term: 'saudi arabia', count: 118 },
    { term: 'israel', count: 112 },
    { term: 'palestine', count: 108 },
    { term: 'syria', count: 98 },
    { term: 'iraq', count: 92 },
    { term: 'usa', count: 142 },
    { term: 'brazil', count: 115 },
    { term: 'india', count: 108 },
    
    // Clima e Meio Ambiente
    { term: 'climate', count: 178 },
    { term: 'climate change', count: 165 },
    { term: 'global warming', count: 152 },
    { term: 'environment', count: 142 },
    { term: 'environmental impact', count: 135 },
    { term: 'carbon', count: 128 },
    { term: 'emissions', count: 122 },
    { term: 'renewable energy', count: 115 },
    { term: 'sustainability', count: 108 },
    { term: 'deforestation', count: 98 },
    { term: 'biodiversity', count: 92 },
    { term: 'pollution', count: 88 },
    
    // Impactos Globais
    { term: 'migration', count: 142 },
    { term: 'refugee', count: 128 },
    { term: 'humanitarian crisis', count: 115 },
    { term: 'security', count: 152 },
    { term: 'defense', count: 138 },
    { term: 'nuclear', count: 125 },
    { term: 'economy', count: 148 },
    { term: 'trade', count: 135 },
    { term: 'export', count: 122 },
    { term: 'import', count: 115 },
    { term: 'market', count: 108 },
    { term: 'investment', count: 102 },
  ];
}
