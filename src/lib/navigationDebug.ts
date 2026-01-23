/**
 * Navigation Debug Utilities
 * Apenas ativo em desenvolvimento
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Log navigation events
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;
  
  window.history.pushState = function(...args) {
    console.log('[Nav Debug] pushState:', args[2]);
    return originalPushState.apply(this, args);
  };
  
  window.history.replaceState = function(...args) {
    console.log('[Nav Debug] replaceState:', args[2]);
    return originalReplaceState.apply(this, args);
  };
  
  // Listen to popstate
  window.addEventListener('popstate', (e) => {
    console.log('[Nav Debug] popstate:', window.location.pathname);
  });
}

export const logNavEvent = (event: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Nav Debug] ${event}`, data || '');
  }
};

export const logNavError = (error: Error | string, context?: any) => {
  if (process.env.NODE_ENV === 'development') {
    // Não logar como erro se for apenas um elemento não encontrado (pode ser normal)
    const errorStr = typeof error === 'string' ? error : error.message;
    if (errorStr.includes('Max scroll attempts') || errorStr.includes('Element not found')) {
      // Logar como warning ao invés de error
      console.warn(`[Nav Debug] WARNING:`, error, context || '');
    } else {
      console.error(`[Nav Debug] ERROR:`, error, context || '');
    }
  }
};
