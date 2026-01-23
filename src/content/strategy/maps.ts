export interface MapLayer {
  id: string;
  type: "fill" | "line" | "circle" | "symbol" | "raster";
  sourceId: string;
  paint?: Record<string, any>;
  layout?: Record<string, any>;
}

export interface MapSource {
  id: string;
  type: "geojson" | "vector" | "raster";
  dataOrUrl: string;
}

export interface MapInitialView {
  lng: number;
  lat: number;
  zoom: number;
}

export interface StrategyMap {
  slug: string;
  title: string;
  date: string; // ISO format
  summary: string;
  tags: string[];
  thumbnail: string;
  engine: "mapbox" | "maplibre";
  mapStyleUrl?: string;
  initialView: MapInitialView;
  layers: MapLayer[];
  sources: MapSource[];
  relatedBriefing?: string;
}

export const STRATEGY_MAPS: StrategyMap[] = [
  {
    slug: "fluxos-petroleo-global",
    title: "Fluxos de Petróleo Global",
    date: "2024-01-15",
    summary: "Visualização interativa dos principais corredores de exportação e dependências energéticas entre países.",
    tags: ["Energia", "Comércio", "Global"],
    thumbnail: "/images/strategy/map-petroleo.jpg",
    engine: "mapbox",
    mapStyleUrl: "mapbox://styles/mapbox/dark-v11",
    initialView: {
      lng: 45.0,
      lat: 25.0,
      zoom: 3,
    },
    sources: [
      {
        id: "petroleum-routes",
        type: "geojson",
        dataOrUrl: "/data/geojson/petroleum-routes.geojson",
      },
    ],
    layers: [
      {
        id: "petroleum-routes-line",
        type: "line",
        sourceId: "petroleum-routes",
        paint: {
          "line-color": "#10b981",
          "line-width": 2,
          "line-opacity": 0.8,
        },
      },
    ],
    relatedBriefing: "petroleo-poder-oriente-medio",
  },
  {
    slug: "conflitos-hidricos-transfronteiricos",
    title: "Conflitos Hídricos Transfronteiriços",
    date: "2024-01-12",
    summary: "Mapeamento dos principais pontos de tensão relacionados a recursos hídricos compartilhados.",
    tags: ["Água & Clima", "Conflitos"],
    thumbnail: "/images/strategy/map-agua.jpg",
    engine: "maplibre",
    initialView: {
      lng: 20.0,
      lat: 0.0,
      zoom: 3,
    },
    sources: [
      {
        id: "water-conflicts",
        type: "geojson",
        dataOrUrl: "/data/geojson/water-conflicts.geojson",
      },
    ],
    layers: [
      {
        id: "water-conflicts-points",
        type: "circle",
        sourceId: "water-conflicts",
        paint: {
          "circle-color": "#ef4444",
          "circle-radius": 6,
          "circle-opacity": 0.8,
        },
      },
    ],
    relatedBriefing: "agua-arma-conflitos-africa",
  },
  {
    slug: "riscos-climaticos-seguranca-alimentar",
    title: "Riscos Climáticos e Segurança Alimentar",
    date: "2024-01-10",
    summary: "Análise geoespacial dos impactos climáticos sobre produção agrícola e segurança alimentar global.",
    tags: ["Clima", "Agricultura", "Segurança"],
    thumbnail: "/images/strategy/map-clima.jpg",
    engine: "mapbox",
    mapStyleUrl: "mapbox://styles/mapbox/dark-v11",
    initialView: {
      lng: 0.0,
      lat: 20.0,
      zoom: 2,
    },
    sources: [
      {
        id: "climate-risks",
        type: "raster",
        dataOrUrl: "/data/tiles/climate-risks/{z}/{x}/{y}.png",
      },
    ],
    layers: [
      {
        id: "climate-risks-layer",
        type: "raster",
        sourceId: "climate-risks",
      },
    ],
    relatedBriefing: "ucrania-corredores-graos",
  },
  {
    slug: "rotas-comerciais-choke-points",
    title: "Rotas Comerciais e Choke Points",
    date: "2024-01-08",
    summary: "Visualização dos principais pontos de estrangulamento no comércio marítimo global.",
    tags: ["Comércio", "Geopolítica", "Marítimo"],
    thumbnail: "/images/strategy/map-rotas.jpg",
    engine: "maplibre",
    initialView: {
      lng: 60.0,
      lat: 20.0,
      zoom: 3,
    },
    sources: [
      {
        id: "trade-routes",
        type: "geojson",
        dataOrUrl: "/data/geojson/trade-routes.geojson",
      },
    ],
    layers: [
      {
        id: "trade-routes-line",
        type: "line",
        sourceId: "trade-routes",
        paint: {
          "line-color": "#3b82f6",
          "line-width": 3,
          "line-opacity": 0.7,
        },
      },
    ],
    relatedBriefing: "chipre-divisao-recursos-offshore",
  },
  {
    slug: "recursos-minerais-estrategicos",
    title: "Recursos Minerais Estratégicos",
    date: "2024-01-05",
    summary: "Mapeamento da distribuição global de minerais críticos para tecnologias modernas.",
    tags: ["Recursos Naturais", "Tecnologia"],
    thumbnail: "/images/strategy/map-minerais.jpg",
    engine: "mapbox",
    mapStyleUrl: "mapbox://styles/mapbox/dark-v11",
    initialView: {
      lng: 20.0,
      lat: -10.0,
      zoom: 3,
    },
    sources: [
      {
        id: "mineral-resources",
        type: "geojson",
        dataOrUrl: "/data/geojson/mineral-resources.geojson",
      },
    ],
    layers: [
      {
        id: "mineral-resources-fill",
        type: "fill",
        sourceId: "mineral-resources",
        paint: {
          "fill-color": "#f59e0b",
          "fill-opacity": 0.6,
        },
      },
    ],
    relatedBriefing: "amazonia-fronteiras-recursos",
  },
];

export function getMapBySlug(slug: string): StrategyMap | undefined {
  return STRATEGY_MAPS.find(m => m.slug === slug);
}

export function getAllMaps(): StrategyMap[] {
  return STRATEGY_MAPS;
}

export function getFeaturedMap(): StrategyMap | undefined {
  return STRATEGY_MAPS[0]; // Primeiro mapa como featured
}
