# 🔧 Correção Definitiva: Hydration Mismatch com CSP Nonce

**Data:** Janeiro 2025  
**Status:** ✅ Corrigido

## 📊 Diagnóstico Forense

### Problema Observado
- Hydration mismatch durante navegação client-side (`/studio` → `/studio/portal`)
- Erro no console: "A tree hydrated but some attributes... didn't match"
- Mismatch envolvendo `nonce` em `<script>` tags
- Render condicional no layout causando diferença entre SSR e CSR

### Root Cause Identificado

**Causa Principal: Nonce gerado em múltiplos lugares e render condicional no layout**

1. **Nonce gerado em lugares diferentes**:
   - `applyCSPHeaders()` gerava seu próprio nonce
   - `proxy.ts` gerava "fallbackNonce" quando CSP não era aplicado
   - Dois nonces diferentes = hydration mismatch

2. **Render condicional no layout**:
   - `{nonce ? <Script> : null}` causava diferença entre SSR e CSR
   - Se nonce não estivesse disponível no SSR, Script não renderizava
   - Se nonce estivesse disponível no CSR, Script aparecia
   - Resultado: HTML diferente entre SSR e CSR = hydration mismatch

3. **Nonce não injetado nos request headers consistentemente**:
   - `applyCSPHeaders()` injetava nonce nos request headers
   - Mas quando CSP não era aplicado, o fallback gerava nonce DEPOIS de criar response
   - Layout lê `headers()` que acessa REQUEST headers, não response headers
   - Se nonce não estivesse nos request headers, layout não via o nonce

## ✅ Correções Implementadas

### 1. Single Source of Truth para Nonce (proxy.ts)

**ANTES**:
```typescript
// Nonce gerado em dois lugares diferentes
if (shouldApplyCSP(request)) {
  const { response } = applyCSPHeaders(request); // Gera nonce interno
  return response;
}
// Fallback gera outro nonce
const fallbackNonce = generateNonce();
```

**DEPOIS**:
```typescript
// Gerar nonce UMA vez no início (single source of truth)
const { generateNonce } = await import('./lib/csp');
const nonce = generateNonce();

// Sempre injetar nos request headers (antes de qualquer branch)
const requestHeaders = new Headers(request.headers);
requestHeaders.set('x-nonce', nonce);

// Usar o mesmo nonce em todas as branches
if (shouldApplyCSP(request)) {
  const { response } = applyCSPHeaders(request, nonce, requestHeaders);
  return response;
}
// Mesmo nonce usado aqui também
const response = NextResponse.next({ request: { headers: requestHeaders } });
```

**Justificativa**: 
- Nonce gerado UMA vez = consistência garantida
- Sempre injetado nos request headers = layout sempre vê via `headers()`
- Mesmo nonce usado em CSP e em `x-nonce` = sem divergências

### 2. applyCSPHeaders aceita nonce externo

**ANTES**:
```typescript
export function applyCSPHeaders(request: NextRequest): {
  requestHeaders: Headers;
  response: NextResponse;
  nonce: string;
} {
  const nonce = generateNonce(); // ❌ Gera novo nonce
  // ...
}
```

**DEPOIS**:
```typescript
export function applyCSPHeaders(
  request: NextRequest,
  nonce: string,        // ✅ Recebe nonce já gerado
  requestHeaders: Headers // ✅ Recebe headers já com x-nonce
): {
  response: NextResponse;
} {
  // Usa nonce passado (não gera novo)
  // ...
}
```

**Justificativa**: 
- Não gera nonce novo = evita divergências
- Usa nonce passado = garante consistência
- Request headers já têm x-nonce = não precisa injetar novamente

### 3. Removido render condicional do layout

**ANTES**:
```typescript
{nonce ? (
  <Script
    id="webpack-nonce-setter"
    strategy="beforeInteractive"
    nonce={nonce}
    dangerouslySetInnerHTML={{
      __html: `__webpack_nonce__ = ${JSON.stringify(nonce)};`,
    }}
  />
) : null}  // ❌ Condicional causa hydration mismatch
```

**DEPOIS**:
```typescript
<Script
  id="webpack-nonce-setter"
  strategy="beforeInteractive"
  nonce={nonce}
  dangerouslySetInnerHTML={{
    __html: `__webpack_nonce__ = ${JSON.stringify(nonce)};`,
  }}
/>  // ✅ Sempre renderiza (nonce sempre disponível via proxy)
```

**Justificativa**: 
- Proxy garante nonce sempre disponível = não precisa de condicional
- Script sempre renderiza = HTML idêntico entre SSR e CSR
- Sem diferença = sem hydration mismatch

### 4. Nonce sempre injetado nos request headers

**ANTES**:
```typescript
// Nonce só injetado quando CSP aplicado
if (shouldApplyCSP(request)) {
  // applyCSPHeaders injeta nonce
} else {
  // Fallback tenta injetar DEPOIS de criar response
  const response = NextResponse.next();
  if (!response.headers.has('x-nonce')) {
    // Tenta injetar depois (pode ser tarde demais)
  }
}
```

**DEPOIS**:
```typescript
// Nonce SEMPRE injetado no início (antes de qualquer branch)
const requestHeaders = new Headers(request.headers);
requestHeaders.set('x-nonce', nonce);

// Todas as branches usam requestHeaders com nonce
if (shouldApplyCSP(request)) {
  applyCSPHeaders(request, nonce, requestHeaders);
} else {
  NextResponse.next({ request: { headers: requestHeaders } });
}
```

**Justificativa**: 
- Nonce sempre nos request headers = layout sempre vê via `headers()`
- Prefetch e RSC payloads também recebem nonce = consistência total
- Não depende de branch = não há caso onde nonce falta

## 🔒 Segurança Mantida

Todas as correções **NÃO** afetam a segurança:
- ✅ CSP com nonce continua funcionando corretamente
- ✅ Headers de segurança mantidos
- ✅ Sanitização e validação intactas
- ✅ Rate limiting e SSRF protection preservados
- ✅ Cookies httpOnly e autenticação funcionando
- ✅ Nonce gerado por request (não reutilizado)
- ✅ Mesmo nonce usado em CSP e em scripts (consistência)

## 📋 Por Que Isso Acontecia

### Fluxo Problemático (ANTES):

1. **Request chega no proxy**
2. **Branch 1 (CSP aplicado)**: `applyCSPHeaders()` gera nonce A
3. **Branch 2 (sem CSP)**: Fallback gera nonce B (diferente)
4. **Layout lê nonce**: Pode ver nonce A ou B (ou nenhum)
5. **SSR renderiza**: Se nonce A disponível → Script renderiza
6. **CSR renderiza**: Se nonce B disponível → Script renderiza diferente
7. **Hydration mismatch**: HTML diferente entre SSR e CSR

### Fluxo Corrigido (DEPOIS):

1. **Request chega no proxy**
2. **Nonce gerado UMA vez**: `const nonce = generateNonce()`
3. **Nonce injetado nos request headers**: `requestHeaders.set('x-nonce', nonce)`
4. **Todas as branches usam o mesmo nonce**: CSP e não-CSP usam o mesmo
5. **Layout sempre vê nonce**: `headers().get('x-nonce')` sempre retorna o mesmo nonce
6. **Script sempre renderiza**: Sem condicional, sempre com o mesmo nonce
7. **HTML idêntico**: SSR = CSR = sem hydration mismatch

## ✅ Critérios de Aceite

- [x] Nonce gerado UMA vez no início do proxy
- [x] Nonce sempre injetado nos request headers (antes de qualquer branch)
- [x] Mesmo nonce usado em CSP e em `x-nonce`
- [x] `applyCSPHeaders` aceita nonce externo (não gera novo)
- [x] Render condicional removido do layout (Script sempre renderiza)
- [x] Nonce disponível em prefetch requests e RSC payloads
- [x] Sem hydration mismatch warnings no console
- [x] Navegação client-side funciona sem erros

## 📝 Arquivos Modificados

1. **`src/proxy.ts`** - Refatorado para gerar nonce UMA vez e sempre injetar nos request headers
2. **`src/lib/security/csp.ts`** - Modificado para aceitar nonce externo (não gerar novo)
3. **`src/app/layout.tsx`** - Removido render condicional do Script (sempre renderiza)

## 🔍 Evidências de Correção

### Verificação via grep:

```bash
# Confirmar que nonce é gerado UMA vez no proxy
rg -n "const nonce = generateNonce" src/proxy.ts
# Resultado: src/proxy.ts:149:  const nonce = generateNonce();

# Confirmar que applyCSPHeaders aceita nonce externo
rg -n "export function applyCSPHeaders" src/lib/security/csp.ts
# Resultado: src/lib/security/csp.ts:19: export function applyCSPHeaders(request: NextRequest, nonce: string, requestHeaders: Headers)

# Confirmar que Script não tem condicional
rg -n "nonce \\?|: null" src/app/layout.tsx
# Resultado: (nenhuma condicional encontrada) ✅
```

### Estrutura Final:

```
proxy.ts:
  1. Gerar nonce UMA vez (linha 149)
  2. Injetar nos request headers (linha 152)
  3. Passar para applyCSPHeaders (linha 233)
  4. Usar em todas as branches (linha 244)

applyCSPHeaders:
  1. Recebe nonce externo (não gera novo)
  2. Usa nonce passado no CSP
  3. Request headers já têm x-nonce

layout.tsx:
  1. Lê nonce via headers()
  2. Script sempre renderiza (sem condicional)
  3. Nonce sempre disponível (garantido pelo proxy)
```

## 🛡️ Como Evitar no Futuro

### Regras de Ouro:

1. **Nonce: Single Source of Truth**:
   - ✅ Gerar nonce UMA vez no início do proxy
   - ✅ Sempre injetar nos request headers (antes de qualquer branch)
   - ❌ Não gerar nonce em múltiplos lugares
   - ❌ Não gerar nonce dentro de `applyCSPHeaders`

2. **Request Headers vs Response Headers**:
   - ✅ Layout lê via `headers()` que acessa REQUEST headers
   - ✅ Sempre injetar nonce nos request headers via `NextResponse.next({ request: { headers } })`
   - ❌ Não confiar apenas em response headers

3. **Render Determinístico**:
   - ✅ Script sempre renderiza (sem condicionais baseadas em nonce)
   - ✅ Proxy garante nonce sempre disponível
   - ❌ Não usar `{nonce ? <Script> : null}`

4. **Teste sempre após mudanças em CSP/nonce**:
   - ✅ Limpar cache: `rm -rf .next`
   - ✅ Reiniciar dev server: `npm run dev`
   - ✅ Testar navegação client-side: `/studio` → `/studio/portal`
   - ✅ Verificar console: zero hydration mismatch warnings

---

**Última atualização:** Janeiro 2025  
**Versão:** 2.0 (Correção Definitiva)
