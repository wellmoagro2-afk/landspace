import { NextRequest, NextResponse } from 'next/server';
import { getCachedPulseData, setCachedPulseData } from '@/lib/gdelt/cache';
import { fetchGDELTTerms, calculateTermScores } from '@/lib/gdelt/fetch';
import { withRateLimit } from '@/lib/security/rateLimit';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

/**
 * API Route para LandSpace Pulse
 * Retorna termos geopolíticos (strategy) ou de mercado (market) do GDELT
 * Atualizado automaticamente a cada 1 hora via cache
 * 
 * Query params:
 * - context: 'strategy' (padrão), 'market', 'tech', 'academy', 'research', 'studio' ou 'studio-pericia-avaliacao'
 */
async function handlePulse(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  const startTime = Date.now();
  const contextName = request.nextUrl.searchParams.get('context') || 'strategy';
  
  try {
    // Detectar contexto via query param
    const context = contextName as 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao';
    
    // Validar contexto
    if (context !== 'strategy' && context !== 'market' && context !== 'tech' && context !== 'academy' && context !== 'research' && context !== 'studio' && context !== 'studio-pericia-avaliacao') {
      return jsonWithRequestId(
        { error: 'Contexto inválido. Use "strategy", "market", "tech", "academy", "research", "studio" ou "studio-pericia-avaliacao".' },
        { status: 400 },
        requestId
      );
    }

    // Modo QA: retornar mock diretamente sem chamadas externas
    if (process.env.QA_CSP === '1') {
      console.log(`[Pulse API] 🧪 Modo QA_CSP ativo - retornando mock para ${context.toUpperCase()}`);
      const { getMockTerms } = await import('@/lib/gdelt/fetch');
      const { calculateTermScores } = await import('@/lib/gdelt/fetch');
      const mockTerms = getMockTerms(context);
      const scoredTerms = calculateTermScores(mockTerms);
      
      const now = new Date();
      const nextUpdate = new Date(now.getTime() + 60 * 60 * 1000);
      
      const response = jsonWithRequestId({
        success: true,
        data: {
          terms: scoredTerms,
          lastUpdated: now.toISOString(),
          nextUpdate: nextUpdate.toISOString(),
        },
        cached: false,
        mock: true,
        qaMode: true,
        context,
      }, {
        headers: {
          'Cache-Control': 'no-store',
          'X-Cache-Status': 'QA_MOCK',
        },
      }, requestId);
      return response;
    }

    // Verificar cache primeiro (1 hora)
    const cached = getCachedPulseData(context);
    if (cached) {
      const cacheAge = Math.floor((Date.now() - new Date(cached.lastUpdated).getTime()) / 1000 / 60); // minutos
      console.log(`[Pulse API] ✅ Cache HIT para ${context.toUpperCase()} (idade: ${cacheAge}min)`);
      
      // Headers de cache para ISR (1 hora = 3600 segundos)
      const response = jsonWithRequestId({
        success: true,
        data: cached,
        cached: true,
        context,
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
          'X-Cache-Status': 'HIT',
          'X-Cache-Age': cacheAge.toString(),
        },
      }, requestId);
      
      return response;
    }

    // Cache expirado ou não existe - buscar dados reais do GDELT
    console.log(`[Pulse API] 🔄 Buscando dados REAIS do GDELT para ${context.toUpperCase()}...`);
    
    // Buscar dados do GDELT (timeout já gerenciado internamente pelo safeFetchJson)
    let terms;
    try {
      terms = await fetchGDELTTerms(context);
    } catch (fetchError) {
      // Timeout ou erro na API - usar fallback mock
      console.warn(`[Pulse API] ⚠️  GDELT API falhou para ${context.toUpperCase()}, usando fallback mock:`, fetchError instanceof Error ? fetchError.message : 'Erro desconhecido');
      
      const { getMockTerms } = await import('@/lib/gdelt/fetch');
      const { calculateTermScores } = await import('@/lib/gdelt/fetch');
      const mockTerms = getMockTerms(context);
      const scoredTerms = calculateTermScores(mockTerms);
      
      // Salvar mock no cache por 1 hora (para não ficar tentando toda hora)
      setCachedPulseData({
        terms: scoredTerms,
      }, context);
      
      const now = new Date();
      const nextUpdate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hora
      
      // Headers de cache para ISR (1 hora = 3600 segundos)
      const response = jsonWithRequestId({
        success: true,
        data: {
          terms: scoredTerms,
          lastUpdated: now.toISOString(),
          nextUpdate: nextUpdate.toISOString(),
        },
        cached: false,
        mock: true,
        fallback: true,
        context,
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
          'X-Cache-Status': 'FALLBACK',
        },
      }, requestId);
      
      return response;
    }
    
    // Dados reais obtidos com sucesso
    const fetchDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[Pulse API] ✅ Dados REAIS obtidos para ${context.toUpperCase()} em ${fetchDuration}s (${terms.length} termos)`);
    
    // Calcular scores
    const scoredTerms = calculateTermScores(terms);
    
    // Salvar no cache (1 hora)
    setCachedPulseData({
      terms: scoredTerms,
    }, context);

    // Log de auditoria
    const now = new Date();
    const nextUpdate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hora
    console.log(`[Pulse API] 💾 Cache atualizado para ${context.toUpperCase()} - Próxima atualização: ${nextUpdate.toLocaleString('pt-BR')}`);
    
    // Headers de cache para ISR (1 hora = 3600 segundos)
    const response = jsonWithRequestId({
      success: true,
      data: {
        terms: scoredTerms,
        lastUpdated: now.toISOString(),
        nextUpdate: nextUpdate.toISOString(),
      },
      cached: false,
      real: true,
      context,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
        'X-Cache-Status': 'MISS',
      },
    }, requestId);
    
    return response;
  } catch (error) {
    console.error(`[Pulse API] ❌ Erro crítico para ${contextName.toUpperCase()}:`, error);
    
    // Em caso de erro crítico, retornar dados mockados baseado no contexto
    try {
      const context = contextName as 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio' | 'studio-pericia-avaliacao';
      const { getMockTerms } = await import('@/lib/gdelt/fetch');
      const { calculateTermScores } = await import('@/lib/gdelt/fetch');
      const mockTerms = getMockTerms(context);
      const scoredTerms = calculateTermScores(mockTerms);
      
      const response = jsonWithRequestId({
        success: true,
        data: {
          terms: scoredTerms,
          lastUpdated: new Date().toISOString(),
          nextUpdate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        },
        cached: false,
        mock: true,
        fallback: true,
        context,
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
          'X-Cache-Status': 'FALLBACK',
        },
      }, requestId);
      
      return response;
    } catch (fallbackError) {
      // Último recurso: retornar dados mockados hardcoded (nunca quebra)
      console.error('[Pulse API] ❌ Erro crítico no fallback, usando mock hardcoded:', fallbackError);
      const emergencyMock = [
        { term: 'geospatial', score: 1000, volume: 100, acceleration: 10 },
        { term: 'gis', score: 800, volume: 80, acceleration: 8 },
        { term: 'mapping', score: 600, volume: 60, acceleration: 6 },
      ];
      
      const response = jsonWithRequestId({
        success: true,
        data: {
          terms: emergencyMock,
          lastUpdated: new Date().toISOString(),
          nextUpdate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        },
        cached: false,
        mock: true,
        emergency: true,
        context: contextName as 'strategy' | 'market' | 'tech' | 'academy' | 'research' | 'studio',
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
          'X-Cache-Status': 'EMERGENCY',
        },
      }, requestId);
      
      return response;
    }
  }
}

export const GET = withRateLimit(handlePulse, {
  scope: 'pulse',
  ipLimit: 100,
  ipWindowMs: 60000,
  identityLimit: 20,
  identityWindowMs: 60000,
});
