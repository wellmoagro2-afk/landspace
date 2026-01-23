/**
 * Sistema de cache para dados do GDELT
 * Dev: JSON local
 * Prod: KV (Vercel KV ou similar)
 */
import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_TTL = 60 * 60 * 1000; // 1 hora em milissegundos (3.600 segundos)

function getCacheFile(context: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao' = 'strategy'): string {
  let filename: string;
  
  if (context === 'market') {
    filename = 'gdelt-pulse-market.json';
  } else if (context === 'tech') {
    filename = 'gdelt-pulse-tech.json';
  } else if (context === 'academy') {
    filename = 'gdelt-pulse-academy.json';
  } else if (context === 'research') {
    filename = 'gdelt-pulse-research.json';
  } else if (context === 'studio') {
    filename = 'gdelt-pulse-studio.json';
  } else if (context === 'studio-pericia-avaliacao') {
    filename = 'gdelt-pulse-studio-pericia-avaliacao.json';
  } else {
    filename = 'gdelt-pulse.json'; // strategy (padrão)
  }
  
  return path.join(CACHE_DIR, filename);
}

export interface PulseCacheData {
  terms: Array<{
    term: string;
    score: number;
    volume: number;
    acceleration: number;
  }>;
  lastUpdated: string;
  nextUpdate: string;
}

/**
 * Garantir que o diretório de cache existe
 */
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Ler dados do cache
 */
export function getCachedPulseData(context: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao' = 'strategy'): PulseCacheData | null {
  try {
    ensureCacheDir();
    
    const cacheFile = getCacheFile(context);
    if (!fs.existsSync(cacheFile)) {
      return null;
    }

    const fileContent = fs.readFileSync(cacheFile, 'utf-8');
    const data: PulseCacheData = JSON.parse(fileContent);

    // Verificar se o cache expirou
    const now = new Date().getTime();
    const lastUpdated = new Date(data.lastUpdated).getTime();
    
    if (now - lastUpdated > CACHE_TTL) {
      // Cache expirado
      return null;
    }

    return data;
  } catch (error) {
    console.error('[GDELT Cache] Erro ao ler cache:', error);
    return null;
  }
}

/**
 * Salvar dados no cache
 */
export function setCachedPulseData(data: Omit<PulseCacheData, 'lastUpdated' | 'nextUpdate'>, context: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao' = 'strategy'): void {
  try {
    ensureCacheDir();
    
    const now = new Date();
    const nextUpdate = new Date(now.getTime() + CACHE_TTL);
    
    const cacheData: PulseCacheData = {
      ...data,
      lastUpdated: now.toISOString(),
      nextUpdate: nextUpdate.toISOString(),
    };

    const cacheFile = getCacheFile(context);
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2), 'utf-8');
  } catch (error) {
    console.error('[GDELT Cache] Erro ao salvar cache:', error);
  }
}

/**
 * Limpar cache (útil para forçar atualização)
 */
export function clearPulseCache(context?: 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao'): void {
  try {
    if (context) {
      const cacheFile = getCacheFile(context);
      if (fs.existsSync(cacheFile)) {
        fs.unlinkSync(cacheFile);
      }
    } else {
      // Limpar todos
      const strategyFile = getCacheFile('strategy');
      const marketFile = getCacheFile('market');
      const techFile = getCacheFile('tech');
      const academyFile = getCacheFile('academy');
      if (fs.existsSync(strategyFile)) {
        fs.unlinkSync(strategyFile);
      }
      if (fs.existsSync(marketFile)) {
        fs.unlinkSync(marketFile);
      }
      if (fs.existsSync(techFile)) {
        fs.unlinkSync(techFile);
      }
      if (fs.existsSync(academyFile)) {
        fs.unlinkSync(academyFile);
      }
    }
  } catch (error) {
    console.error('[GDELT Cache] Erro ao limpar cache:', error);
  }
}
