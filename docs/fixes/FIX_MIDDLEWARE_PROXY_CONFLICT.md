# 🔧 Correção: Conflito Middleware vs Proxy (Next.js 16.1.1)

**Data:** Janeiro 2025  
**Status:** ✅ Corrigido

## 📊 Diagnóstico

### Problema Observado
Ao rodar `next dev`, aparecia:
```
The middleware file convention is deprecated. Please use proxy instead.
Both middleware file ./src/middleware.ts and proxy file ./src/proxy.ts are detected. Please use ./src/proxy.ts only.
```
O servidor abortava e não iniciava.

### Root Cause Identificado

**Causa Principal: Conflito entre `middleware.ts` e `proxy.ts`**

1. **Next.js 16.1.1 com Turbopack**: A convenção `middleware.ts` está deprecated
2. **Conflito detectado**: Next.js detectou ambos `src/middleware.ts` e `src/proxy.ts`
3. **Servidor aborta**: Next.js não permite ambos existirem simultaneamente

### Evidências

```bash
# Ambos os arquivos existiam
✅ src/middleware.ts (250 linhas)
✅ src/proxy.ts (216 linhas)

# Lógica duplicada:
- Ambos tinham: Maintenance Gate, Autenticação Admin, CSP Headers
- middleware.ts tinha: Lógica adicional de garantir nonce sempre presente (linhas 215-238)
- proxy.ts NÃO tinha: Lógica de garantir nonce em requests que não aplicam CSP
```

## ✅ Correções Implementadas

### 1. Removido `src/middleware.ts`

**Ação**: Arquivo deletado completamente
- ✅ Removido do projeto
- ✅ Não há mais conflito

### 2. Consolidada lógica no `src/proxy.ts`

**Lógica portada do `middleware.ts` para `proxy.ts`**:

```typescript
// ANTES (proxy.ts) - não garantia nonce em requests que não aplicam CSP
if (shouldApplyCSP(request)) {
  const { response } = applyCSPHeaders(request);
  return response;
}
return NextResponse.next();  // ❌ Sem nonce para requests não-CSP

// DEPOIS (proxy.ts) - garante nonce sempre presente
if (shouldApplyCSP(request)) {
  const { response } = applyCSPHeaders(request);
  return response;
}

const response = NextResponse.next();

// ROOT CAUSE FIX: Garantir que x-nonce esteja sempre presente
if (!response.headers.has('x-nonce')) {
  const { generateNonce } = await import('./lib/csp');
  const fallbackNonce = generateNonce();
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', fallbackNonce);
  
  const newResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  newResponse.headers.set('x-nonce', fallbackNonce);
  return newResponse;
}

return response;  // ✅ Nonce sempre presente
```

**Justificativa**: 
- Garante que `x-nonce` esteja sempre disponível, mesmo em requests que não aplicam CSP
- Inclui prefetch requests e requests internas do Next.js durante navegação client-side
- Evita hydration mismatch porque o Script sempre terá nonce disponível no SSR e CSR

### 3. Atualizados comentários no `layout.tsx`

**ANTES**:
```typescript
// Ler nonce dos headers (setado pelo middleware)
// IMPORTANTE: Nonce é gerado por request no middleware (middleware.ts)
```

**DEPOIS**:
```typescript
// Ler nonce dos headers (setado pelo proxy)
// IMPORTANTE: Nonce é gerado por request no proxy (proxy.ts)
```

### 4. Confirmado `shouldApplyCSP()` não exclui prefetch

**Status**: ✅ Já estava correto (prefetch não é excluído)
- `src/lib/csp.ts` não exclui prefetch requests
- Comentário explica: "NÃO excluir prefetch requests durante navegação client-side"

## 🔒 Segurança Mantida

Todas as correções **NÃO** afetam a segurança:
- ✅ CSP com nonce continua funcionando corretamente
- ✅ Headers de segurança mantidos
- ✅ Sanitização e validação intactas
- ✅ Rate limiting e SSRF protection preservados
- ✅ Cookies httpOnly e autenticação funcionando
- ✅ Nonce gerado por request (não reutilizado)
- ✅ Prefetch requests também recebem nonce (consistência SSR/CSR)

## 📋 Por Que Isso Acontecia

### Fluxo Problemático (ANTES):

1. **Next.js detecta ambos**: `src/middleware.ts` e `src/proxy.ts` existem
2. **Conflito detectado**: Next.js 16.1.1 não permite ambos
3. **Servidor aborta**: Erro fatal, dev server não inicia
4. **Site não funciona**: Impossível testar ou desenvolver

### Fluxo Corrigido (DEPOIS):

1. **Apenas `proxy.ts` existe**: `middleware.ts` removido
2. **Sem conflito**: Next.js reconhece apenas `proxy.ts`
3. **Servidor inicia**: Dev server funciona normalmente
4. **Nonce sempre disponível**: Lógica consolidada garante nonce em todas as requests

## ✅ Critérios de Aceite

- [x] `npm run dev` inicia sem erro de middleware/proxy
- [x] GET `/` renderiza a Home (status 200, sem 404)
- [x] GET `/studio` funciona
- [x] Navegação para `/studio/portal` via menu funciona
- [x] Sem crash SSR (ex.: `initialVariant is not defined`)
- [x] Sem warnings de hydration relacionados a nonce/data-variant
- [x] CSP nonce e headers continuam ativos
- [x] Nonce disponível em prefetch requests (evita hydration mismatch)

## 📝 Arquivos Modificados

1. **`src/middleware.ts`** - ❌ DELETADO (conflito resolvido)
2. **`src/proxy.ts`** - ✅ ATUALIZADO (lógica de garantir nonce sempre presente portada)
3. **`src/app/layout.tsx`** - ✅ ATUALIZADO (comentários atualizados: middleware → proxy)

## 🔍 Evidências de Correção

### Verificação via grep:

```bash
# Confirmar que middleware.ts não existe mais
find src -name "middleware.ts"
# Resultado: (nenhum arquivo encontrado) ✅

# Confirmar que proxy.ts existe e tem função proxy
rg -n "export.*function.*proxy" src/proxy.ts
# Resultado: src/proxy.ts:135:export async function proxy(request: NextRequest) ✅

# Confirmar que não há mais referências a middleware.ts
rg -n "middleware\.ts|from.*middleware" src
# Resultado: (nenhuma referência encontrada) ✅
```

### Estrutura Final:

```
src/
  ├── proxy.ts          ✅ Único entrypoint (função proxy)
  ├── middleware.ts     ❌ REMOVIDO (conflito resolvido)
  └── app/
      ├── page.tsx      ✅ Rota "/" existe
      └── layout.tsx    ✅ Comentários atualizados
```

## 🛡️ Como Evitar no Futuro

### Regras de Ouro:

1. **Next.js 16.1.1+ usa apenas `proxy.ts`**:
   - ✅ Usar `src/proxy.ts` com função `export async function proxy()`
   - ❌ Não criar `src/middleware.ts` (deprecated)

2. **Garanta nonce sempre disponível**:
   - ✅ Proxy deve incluir `x-nonce` em TODAS as requests HTML
   - ✅ Mesmo requests que não aplicam CSP precisam de nonce para evitar mismatch
   - ✅ Não excluir prefetch requests do nonce

3. **Teste sempre após mudanças em proxy/middleware**:
   - ✅ Limpar cache: `rm -rf .next`
   - ✅ Reiniciar dev server: `npm run dev`
   - ✅ Verificar que servidor inicia sem erros
   - ✅ Testar rota "/" diretamente

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0
