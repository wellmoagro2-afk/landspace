"use client";

import { useEffect, useRef, useState } from "react";
import type { StrategyMap as StrategyMapType } from "@/content/strategy/maps";

interface StrategyMapProps {
  map: StrategyMapType;
}

export default function StrategyMap({ map }: StrategyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = async () => {
      try {
        // Carregar MapLibre GL (padrão, sem dependência de Mapbox)
        let maplibregl: any;

        try {
          const maplibreModule = await import("maplibre-gl");
          maplibregl = maplibreModule.default || maplibreModule;
        } catch (e) {
          // SDK não disponível - mostrar mensagem amigável ao invés de lançar erro
          setError("SDK de mapa não configurado. Para habilitar mapas interativos, instale 'maplibre-gl'.");
          setIsLoading(false);
          return;
        }

        const mapLib = maplibregl;
        if (!mapLib || !mapLib.Map) {
          throw new Error("SDK de mapa não encontrado");
        }

        // Inicializar mapa
        const mapInstance = new mapLib.Map({
          container: mapContainerRef.current,
          style: map.mapStyleUrl || "https://demotiles.maplibre.org/style.json",
          center: [map.initialView.lng, map.initialView.lat],
          zoom: map.initialView.zoom,
        });

        mapInstance.on("load", () => {
          // Adicionar sources
          map.sources.forEach((source) => {
            try {
              if (source.type === "geojson") {
                mapInstance.addSource(source.id, {
                  type: "geojson",
                  data: source.dataOrUrl,
                });
              } else if (source.type === "vector") {
                mapInstance.addSource(source.id, {
                  type: "vector",
                  url: source.dataOrUrl,
                });
              } else if (source.type === "raster") {
                mapInstance.addSource(source.id, {
                  type: "raster",
                  url: source.dataOrUrl,
                  tileSize: 256,
                });
              }
            } catch (e) {
              console.warn(`Erro ao adicionar source ${source.id}:`, e);
            }
          });

          // Adicionar layers
          map.layers.forEach((layer) => {
            try {
              mapInstance.addLayer({
                id: layer.id,
                type: layer.type,
                source: layer.sourceId,
                paint: layer.paint,
                layout: layer.layout,
              });
            } catch (e) {
              console.warn(`Erro ao adicionar layer ${layer.id}:`, e);
            }
          });

          setIsLoading(false);
        });

        // Adicionar controles
        if (mapLib.NavigationControl) {
          mapInstance.addControl(new mapLib.NavigationControl(), "top-right");
        }
        if (mapLib.FullscreenControl) {
          mapInstance.addControl(new mapLib.FullscreenControl(), "top-right");
        }
        if (mapLib.GeolocateControl) {
          mapInstance.addControl(new mapLib.GeolocateControl(), "top-right");
        }

        mapInstanceRef.current = mapInstance;
      } catch (err: any) {
        console.error("Erro ao inicializar mapa:", err);
        setError(err.message || "Erro ao carregar mapa");
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn("Erro ao remover mapa:", e);
        }
      }
    };
  }, [map]);

  if (error) {
    return (
      <div className="relative w-full h-[600px] bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center">
        <div className="text-center space-y-4 p-8 max-w-md">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Mapa não disponível</h3>
          <p className="text-slate-400">
            {error}
          </p>
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 text-left">
            <p className="text-sm text-slate-300 mb-2 font-semibold">Para habilitar mapas interativos:</p>
            <code className="text-xs text-emerald-400 block bg-slate-900/50 p-2 rounded mt-2">
              npm install maplibre-gl
            </code>
            <p className="text-xs text-slate-500 mt-3">
              MapLibre GL é open-source e não requer token de API.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-400">Carregando mapa...</p>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
