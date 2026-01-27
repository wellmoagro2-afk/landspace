# 🔒 Auditoria de Segurança - LandSpace (Big Tech Standard)

**Data:** 2026-01-XX  
**Versão:** 1.0  
**Escopo:** Repositório completo (D:\landspace)  
**Framework:** Next.js 16.1.1 (App Router) + Prisma + Vercel/Edge

---

## 📋 Sumário Executivo

Este documento mapeia o estado atual de segurança do repositório LandSpace contra padrões "Big Tech", identificando:
- ✅ **O que já existe e está correto**
- ⚠️ **O que existe mas está incompleto/com risco**
- ❌ **O que está faltando**

**Top 10 Riscos Críticos:**
1. **P0**: Endpoints públicos sem rate limiting (`/api/strategy/pulse`, `/api/strategy/consultancy`, `/api/contato`)
2. **P0**: SSRF em fetch de URLs externas (`/api/strategy/pulse` → GDELT sem whitelist)
3. **P1**: Sanitização HTML básica (regex, não usa biblioteca robusta)
4. **P1**: Falta CI/CD com security checks (npm audit, lint, typecheck)
5. **P1**: Uploads em `/public` (exposição direta via URL)
6. **P1**: CSRF não aplicado em todos os endpoints mutáveis
7. **P2**: Falta rotação de sessão (JWT fixo por 7 dias)
8. **P2**: Logs podem vazar dados sensíveis (console.log em alguns pontos)
9. **P2**: Falta WAF/CDN em produção
10. **P2**: Falta monitoramento de segurança (alertas, SIEM)

---

## 📊 Tabela de Status (A-F)

| Categoria | Item | Status | Risco | Impacto | Prioridade | Evidência |
|-----------|------|--------|-------|---------|------------|-----------|
| **A) Sessão/Auth** | HttpOnly cookies | ✅ OK | Baixo | Alto | - | `src/lib/auth.ts:147`, `src/app/api/portal/login/route.ts:132` |
| | Secure flag (prod) | ✅ OK | Baixo | Alto | - | `src/lib/auth.ts:149`, `src/app/api/portal/login/route.ts:134` |
| | SameSite strict | ✅ OK | Baixo | Alto | - | `src/lib/auth.ts:150`, `src/app/api/portal/login/route.ts:135` |
| | Rotação de sessão | ❌ Faltando | Médio | Médio | P2 | JWT fixo por 7 dias, sem refresh token |
| | Fixation protection | ⚠️ Parcial | Médio | Médio | P2 | JWT com nonce, mas não regenera em login |
| | CSRF protection | ⚠️ Parcial | Alto | Alto | P1 | `src/lib/csrf-guard.ts` existe, mas não aplicado em todos os endpoints |
| | Origin/Referer checks | ✅ OK | Baixo | Alto | - | `src/lib/csrf-guard.ts:54-77` |
| **B) Rate Limiting** | Login endpoints | ✅ OK | Baixo | Alto | - | `src/lib/security/rateLimit.ts`, aplicado em 3 rotas de login |
| | Endpoints públicos | ❌ Faltando | **Alto** | **Alto** | **P0** | `/api/strategy/pulse`, `/api/strategy/consultancy`, `/api/contato` sem rate limit |
| | Por IP | ✅ OK | Baixo | Alto | - | `src/lib/security/rateLimit.ts:250` |
| | Por identidade | ✅ OK | Baixo | Alto | - | `src/lib/security/rateLimit.ts:277` |
| | Lockout progressivo | ❌ Faltando | Médio | Médio | P2 | Apenas fixed window, sem lockout exponencial |
| | Retry-After header | ✅ OK | Baixo | Médio | - | `src/lib/security/rateLimit.ts:267` |
| | Distribuído (Redis) | ⚠️ Parcial | Médio | Médio | P1 | `src/lib/rate-limit-redis.ts` existe, mas não integrado |
| **C) Validação** | Zod schemas | ✅ OK | Baixo | Alto | - | `src/lib/schemas/` (admin, portal, contato) |
| | XSS sanitization | ⚠️ Parcial | **Alto** | **Alto** | **P1** | `src/lib/sanitize-html.ts` usa regex básico, não biblioteca robusta |
| | Upload validation | ✅ OK | Baixo | Alto | - | `src/lib/upload-validation.ts` (extensão, tamanho, path traversal) |
| | SSRF protection | ❌ Faltando | **Alto** | **Alto** | **P0** | `src/lib/gdelt/fetch.ts:147` faz fetch sem whitelist de hosts |
| | URL fetch validation | ❌ Faltando | **Alto** | **Alto** | **P0** | GDELT API sem validação de resposta |
| **D) Observabilidade** | Request ID | ✅ OK | Baixo | Alto | - | `src/lib/observability.ts:17`, `src/app/api/admin/login/route.ts:14` |
| | Logs estruturados | ✅ OK | Baixo | Alto | - | `src/lib/logger.ts:66`, `src/lib/observability.ts:36` |
| | Redaction | ✅ OK | Baixo | Alto | - | `src/lib/logger.ts:21-60` (redactSensitive) |
| | Correlação | ⚠️ Parcial | Médio | Médio | P1 | Request ID existe, mas não propagado em todas as rotas |
| | Audit trail | ✅ OK | Baixo | Alto | - | `src/lib/audit.ts`, `prisma/schema.prisma:219-239` |
| | Alertas/SIEM | ❌ Faltando | Médio | Médio | P2 | Sem integração com sistemas de alerta |
| **E) Supply Chain** | Dependências atualizadas | ⚠️ Parcial | Médio | Médio | P1 | `package.json` usa versões fixas, mas sem verificação automática |
| | npm audit | ❌ Faltando | **Alto** | **Alto** | **P0** | Sem CI que execute `npm audit` |
| | Lockfile discipline | ✅ OK | Baixo | Alto | - | `package-lock.json` existe e é versionado |
| | CI security checks | ❌ Faltando | **Alto** | **Alto** | **P0** | Sem `.github/workflows/` com lint/audit/typecheck |
| | Atualizações automáticas | ❌ Faltando | Médio | Médio | P2 | Sem Dependabot ou Renovate |
| **F) Hardening** | TLS/HTTPS | ⚠️ Parcial | Baixo | Alto | P1 | Vercel força HTTPS, mas sem verificação no código |
| | CSP headers | ✅ OK | Baixo | Alto | - | `src/lib/security/csp.ts`, `src/proxy.ts` |
| | HSTS | ✅ OK | Baixo | Alto | - | `next.config.ts:53-55` |
| | X-Frame-Options | ✅ OK | Baixo | Médio | - | `next.config.ts:35-36` |
| | X-Content-Type-Options | ✅ OK | Baixo | Médio | - | `next.config.ts:39-40` |
| | Referrer-Policy | ✅ OK | Baixo | Médio | - | `next.config.ts:43-44` |
| | Permissions-Policy | ✅ OK | Baixo | Médio | - | `next.config.ts:47-48` |
| | Edge headers | ⚠️ Parcial | Médio | Médio | P1 | CSP aplicado, mas outros headers apenas em `next.config.ts` |
| | Cache headers | ⚠️ Parcial | Baixo | Médio | P2 | Alguns endpoints têm cache, outros não |
| | WAF/CDN | ❌ Faltando | Médio | Médio | P2 | Sem configuração de WAF (Vercel tem básico) |
| | Proteção de uploads | ⚠️ Parcial | **Alto** | **Alto** | **P1** | Uploads em `/public/uploads/strategy` são acessíveis via URL direta |

---

## 🔍 Evidência no Código

### ✅ A) Sessão/Autenticação - O que está OK

#### 1. HttpOnly Cookies
**Arquivo:** `src/lib/auth.ts:147`, `src/app/api/portal/login/route.ts:132`
```typescript
cookieStore.set(ADMIN_SESSION_COOKIE, token, {
  httpOnly: true,  // ✅ Previne acesso via JavaScript
  secure: isProduction,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60,
  path: '/',
});
```

#### 2. Secure Flag em Produção
**Arquivo:** `src/lib/auth.ts:149`, `src/app/api/portal/login/route.ts:134`
```typescript
secure: isProduction,  // ✅ Cookies apenas via HTTPS em produção
```

#### 3. SameSite Strict
**Arquivo:** `src/lib/auth.ts:150`, `src/app/api/portal/login/route.ts:135`
```typescript
sameSite: 'strict',  // ✅ Previne CSRF via cookies
```

#### 4. Origin/Referer Validation
**Arquivo:** `src/lib/csrf-guard.ts:54-77`
```typescript
if (isProduction && host) {
  const expectedOrigin = `${forwardedProto}://${host}`;
  // ... validação de Origin/Referer
  if (!requestOrigin || requestOrigin !== expectedOrigin) {
    return { error: 'Origin inválido', status: 403 };
  }
}
```

### ⚠️ A) Sessão/Autenticação - O que está incompleto

#### 1. Rotação de Sessão (P2)
**Problema:** JWT fixo por 7 dias, sem refresh token
**Evidência:** `src/lib/auth.ts:13` → `SESSION_DURATION = 7 * 24 * 60 * 60 * 1000`
**Risco:** Se token for comprometido, válido por 7 dias
**Mitigação necessária:** Implementar refresh token com rotação

#### 2. CSRF não aplicado em todos os endpoints (P1)
**Problema:** `validateCSRF` existe, mas não é chamado em todos os POST/PATCH/DELETE
**Evidência:** 
- ✅ Aplicado: `/api/admin/portal/*` (via middleware implícito)
- ❌ Não aplicado: `/api/strategy/consultancy` (POST sem CSRF)
- ❌ Não aplicado: `/api/contato` (POST sem CSRF)
**Arquivo:** `src/app/api/strategy/consultancy/route.ts:7` (sem `validateCSRF`)

### ✅ B) Rate Limiting - O que está OK

#### 1. Rate Limiting em Login
**Arquivo:** `src/lib/security/rateLimit.ts`
**Aplicado em:**
- `src/app/api/admin/login/route.ts:178`
- `src/app/api/admin/portal/login/route.ts:113`
- `src/app/api/portal/login/route.ts:166`

**Configuração:**
```typescript
withRateLimit(handler, {
  scope: 'login',
  ipLimit: 30,        // 30 tentativas por IP (60s)
  ipWindowMs: 60000,
  identityLimit: 5,   // 5 tentativas por IP+Identity (60s)
  identityWindowMs: 60000,
})
```

#### 2. Headers de Rate Limit
**Arquivo:** `src/lib/security/rateLimit.ts:332-334`
```typescript
response.headers.set('X-RateLimit-Limit', finalLimit.toString());
response.headers.set('X-RateLimit-Remaining', finalRemaining.toString());
response.headers.set('X-RateLimit-Reset', Math.ceil(finalResetAt / 1000).toString());
```

#### 3. Retry-After Header
**Arquivo:** `src/lib/security/rateLimit.ts:267`
```typescript
headers: {
  'Retry-After': retryAfterSeconds.toString(),
  // ...
}
```

### ❌ B) Rate Limiting - O que está faltando

#### 1. Endpoints Públicos sem Rate Limit (P0 - CRÍTICO)
**Problema:** Endpoints públicos podem ser abusados
**Evidência:**
- `src/app/api/strategy/pulse/route.ts` - GET público, sem rate limit
- `src/app/api/strategy/consultancy/route.ts` - POST público, sem rate limit
- `src/app/api/contato/route.ts` - POST público, sem rate limit

**Risco:** DoS, scraping, abuso de recursos

#### 2. Lockout Progressivo (P2)
**Problema:** Apenas fixed window, sem lockout exponencial após múltiplas violações
**Evidência:** `src/lib/security/rateLimit.ts:147-197` usa apenas contador simples

#### 3. Redis Distribuído não integrado (P1)
**Problema:** `src/lib/rate-limit-redis.ts` existe, mas não é usado
**Evidência:** `src/lib/security/rateLimit.ts` usa apenas Map in-memory

### ✅ C) Validação - O que está OK

#### 1. Zod Schemas
**Arquivos:**
- `src/lib/schemas/admin.ts` - Schemas para admin
- `src/lib/schemas/portal.ts` - Schemas para portal
- `src/lib/schemas/contato.ts` - Schema para contato

**Exemplo:** `src/lib/schemas/admin.ts:6-8`
```typescript
export const adminLoginSchema = z.object({
  adminKey: z.string().min(1, 'Senha é obrigatória'),
});
```

#### 2. Upload Validation
**Arquivo:** `src/lib/upload-validation.ts`
- Validação de extensão (linha 26-44)
- Bloqueio de executáveis (linha 16-19)
- Validação de tamanho (linha 49-51)
- Path traversal protection (linha 56-67)

**Evidência:** `src/app/api/admin/portal/project/[id]/files/upload/route.ts:60-75`

### ⚠️ C) Validação - O que está incompleto

#### 1. Sanitização HTML Básica (P1)
**Problema:** `sanitizeHtml` usa regex, não biblioteca robusta
**Arquivo:** `src/lib/sanitize-html.ts:6-21`
```typescript
// ❌ Regex básico - pode ser bypassado
let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
```

**Risco:** XSS via payloads complexos (ex: `<img src=x onerror="...">` com encoding)
**Uso:** `src/app/strategy/briefings/[slug]/BriefingClient.tsx:142`

**Recomendação:** Usar `sanitize-html` ou `DOMPurify` (server-side)

### ❌ C) Validação - O que está faltando

#### 1. SSRF Protection (P0 - CRÍTICO)
**Problema:** Fetch de URLs externas sem whitelist
**Arquivo:** `src/lib/gdelt/fetch.ts:147`
```typescript
const apiUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=...`;
const response = await fetch(apiUrl, {
  headers: { 'Accept': 'application/json' },
  signal: AbortSignal.timeout(5000),
});
```

**Risco:** Se `apiUrl` vier de input do usuário (mesmo que não seja o caso atual), pode fazer SSRF
**Mitigação necessária:** Whitelist de hosts permitidos

#### 2. Validação de Resposta Externa (P0)
**Problema:** Não valida formato/tamanho da resposta do GDELT
**Evidência:** `src/lib/gdelt/fetch.ts:159` → `await response.json()` sem validação de schema

### ✅ D) Observabilidade - O que está OK

#### 1. Request ID
**Arquivo:** `src/lib/observability.ts:17-23`
```typescript
export function getRequestId(request: Request): string {
  const existingId = request.headers.get('x-request-id');
  if (existingId) {
    return existingId;
  }
  return generateRequestId();
}
```

**Uso:** `src/app/api/admin/login/route.ts:14`

#### 2. Logs Estruturados
**Arquivo:** `src/lib/logger.ts:66-81`
```typescript
export function logSafe(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  const redactedData = data ? redactSensitive(data) : undefined;
  
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify({
      level,
      message,
      timestamp: new Date().toISOString(),
      ...redactedData,
    }));
  }
}
```

#### 3. Redaction
**Arquivo:** `src/lib/logger.ts:21-60`
- Remove PINs, senhas, tokens, secrets dos logs
- Lista de chaves sensíveis: `SENSITIVE_KEYS` (linha 6-16)

#### 4. Audit Trail
**Arquivo:** `src/lib/audit.ts`, `prisma/schema.prisma:219-239`
- Model `AuditLog` com campos: requestId, userId, protocol, action, entityType, entityId, metadata, ipAddress, userAgent, success, errorMessage
- Função `auditLog()` persiste eventos

**Uso:** `src/app/api/admin/portal/project/[id]/files/upload/route.ts:140-150`

### ⚠️ D) Observabilidade - O que está incompleto

#### 1. Correlação não completa (P1)
**Problema:** Request ID não propagado em todas as rotas
**Evidência:**
- ✅ Usado: `/api/admin/login`, `/api/admin/portal/*`, `/api/portal/*`
- ❌ Não usado: `/api/strategy/consultancy`, `/api/contato`

### ❌ D) Observabilidade - O que está faltando

#### 1. Alertas/SIEM (P2)
**Problema:** Sem integração com sistemas de alerta
**Evidência:** Logs apenas em `console.log`, sem integração com Datadog/Sentry/etc.

### ✅ E) Supply Chain - O que está OK

#### 1. Lockfile Discipline
**Arquivo:** `package-lock.json` existe e é versionado
**Evidência:** Lockfile version 3, todas as dependências fixadas

### ⚠️ E) Supply Chain - O que está incompleto

#### 1. Dependências (P1)
**Problema:** Versões fixas, mas sem verificação automática de vulnerabilidades
**Evidência:** `package.json` usa `^` para algumas, mas não há CI que execute `npm audit`

### ❌ E) Supply Chain - O que está faltando

#### 1. CI Security Checks (P0 - CRÍTICO)
**Problema:** Sem `.github/workflows/` com lint/audit/typecheck
**Evidência:** Diretório `.github` não existe
**Risco:** Código vulnerável pode ser commitado sem validação

#### 2. npm audit automatizado (P0)
**Problema:** Sem CI que execute `npm audit` antes do merge
**Risco:** Vulnerabilidades conhecidas podem entrar em produção

#### 3. Atualizações Automáticas (P2)
**Problema:** Sem Dependabot ou Renovate
**Risco:** Dependências desatualizadas acumulam vulnerabilidades

### ✅ F) Hardening - O que está OK

#### 1. CSP Headers
**Arquivo:** `src/lib/security/csp.ts`, `src/proxy.ts`
- CSP strict com nonce
- Sem `unsafe-inline` em `style-src-elem`
- `style-src-attr` permite apenas hashes específicos

**Evidência:** `src/lib/security/csp.ts:18-40`

#### 2. Security Headers
**Arquivo:** `next.config.ts:29-60`
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Strict-Transport-Security (produção)

#### 3. Path Traversal Protection
**Arquivo:** `src/app/api/portal/files/[id]/download/route.ts:104-124`
```typescript
const uploadsBaseDir = resolve(process.cwd(), 'uploads', 'portal');
const filePath = resolve(process.cwd(), file.storagePath);

if (!filePath.startsWith(uploadsBaseDir)) {
  // Bloqueia path traversal
}
```

### ⚠️ F) Hardening - O que está incompleto

#### 1. Uploads em `/public` (P1)
**Problema:** `src/app/api/admin/upload/route.ts:44` salva em `public/uploads/strategy`
**Risco:** Arquivos acessíveis via URL direta, sem validação de permissão
**Evidência:** `src/app/api/admin/upload/route.ts:60` → `/uploads/strategy/${filename}`

**Recomendação:** Mover para `/uploads` (fora de public) e servir via endpoint protegido

#### 2. TLS Verification (P1)
**Problema:** Vercel força HTTPS, mas código não verifica
**Risco:** Se deployado em outro lugar sem HTTPS, cookies podem vazar

#### 3. Edge Headers (P1)
**Problema:** Alguns headers apenas em `next.config.ts`, não no middleware
**Evidência:** Headers aplicados apenas em build time, não em runtime

### ❌ F) Hardening - O que está faltando

#### 1. WAF/CDN (P2)
**Problema:** Sem configuração explícita de WAF
**Risco:** Ataques comuns (SQL injection, XSS) não bloqueados na borda

#### 2. Cache Headers Consistentes (P2)
**Problema:** Alguns endpoints têm cache, outros não
**Evidência:** `/api/strategy/pulse` tem cache, mas outros endpoints não

---

## 🚨 Top 10 Riscos (Maior → Menor)

### 1. P0: Endpoints públicos sem rate limiting
**Arquivos:**
- `src/app/api/strategy/pulse/route.ts`
- `src/app/api/strategy/consultancy/route.ts`
- `src/app/api/contato/route.ts`

**Risco:** DoS, scraping, abuso de recursos  
**Impacto:** Alto (pode derrubar servidor)  
**Probabilidade:** Média (endpoints públicos são alvos comuns)

### 2. P0: SSRF em fetch de URLs externas
**Arquivo:** `src/lib/gdelt/fetch.ts:147`
**Risco:** Se URL vier de input (futuro), pode fazer SSRF para serviços internos  
**Impacto:** Alto (acesso a serviços internos)  
**Probabilidade:** Baixa (hoje URL é hardcoded, mas código não protege)

### 3. P0: Falta CI/CD com security checks
**Problema:** Sem `.github/workflows/`  
**Risco:** Código vulnerável pode entrar em produção  
**Impacto:** Alto (vulnerabilidades em produção)  
**Probabilidade:** Média (sem validação automática)

### 4. P1: Sanitização HTML básica
**Arquivo:** `src/lib/sanitize-html.ts:6-21`  
**Risco:** XSS via payloads complexos  
**Impacto:** Alto (roubo de sessão, dados)  
**Probabilidade:** Média (regex pode ser bypassado)

### 5. P1: Uploads em `/public` (exposição direta)
**Arquivo:** `src/app/api/admin/upload/route.ts:44`  
**Risco:** Arquivos acessíveis sem validação  
**Impacto:** Alto (vazamento de dados)  
**Probabilidade:** Média (se URL for descoberta)

### 6. P1: CSRF não aplicado em todos os endpoints
**Arquivos:** `src/app/api/strategy/consultancy/route.ts`, `src/app/api/contato/route.ts`  
**Risco:** CSRF attacks em endpoints públicos  
**Impacto:** Alto (ações não autorizadas)  
**Probabilidade:** Média (endpoints públicos são alvos)

### 7. P1: Redis rate limiting não integrado
**Arquivo:** `src/lib/rate-limit-redis.ts` existe, mas não usado  
**Risco:** Rate limit não funciona em múltiplas instâncias  
**Impacto:** Médio (bypass de rate limit em escala)  
**Probabilidade:** Baixa (hoje é single instance)

### 8. P2: Falta rotação de sessão
**Arquivo:** `src/lib/auth.ts:13` → JWT fixo por 7 dias  
**Risco:** Token comprometido válido por muito tempo  
**Impacto:** Médio (acesso não autorizado prolongado)  
**Probabilidade:** Baixa (requer comprometimento inicial)

### 9. P2: Logs podem vazar dados
**Arquivo:** `src/app/api/strategy/consultancy/route.ts:29` → `console.log` com dados  
**Risco:** Dados sensíveis em logs  
**Impacto:** Médio (vazamento de dados)  
**Probabilidade:** Baixa (logs geralmente protegidos)

### 10. P2: Falta WAF/CDN
**Problema:** Sem configuração explícita  
**Risco:** Ataques comuns não bloqueados na borda  
**Impacto:** Médio (proteção adicional)  
**Probabilidade:** Baixa (Vercel tem proteção básica)

---

## 📝 Vulnerabilidades e Gaps Detalhados

### Gap 1: Endpoints Públicos sem Rate Limiting

**Localização:**
- `src/app/api/strategy/pulse/route.ts` (GET)
- `src/app/api/strategy/consultancy/route.ts` (POST)
- `src/app/api/contato/route.ts` (POST)

**Problema:**
```typescript
// ❌ Sem rate limiting
export async function GET(request: NextRequest) {
  // ... código sem proteção
}
```

**Risco:** DoS, scraping, abuso de recursos

**Mitigação:** Aplicar `withRateLimit` com limites mais permissivos (ex: 100/IP/min)

---

### Gap 2: SSRF em Fetch Externo

**Localização:** `src/lib/gdelt/fetch.ts:147`

**Problema:**
```typescript
// ❌ URL hardcoded, mas se vier de input no futuro, é vulnerável
const apiUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=...`;
const response = await fetch(apiUrl, { ... });
```

**Risco:** Se `apiUrl` vier de input, pode fazer SSRF

**Mitigação:** Whitelist de hosts permitidos

---

### Gap 3: Sanitização HTML Básica

**Localização:** `src/lib/sanitize-html.ts:6-21`

**Problema:**
```typescript
// ❌ Regex básico - pode ser bypassado
let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
```

**Risco:** XSS via payloads complexos (encoding, polyglots)

**Mitigação:** Usar `sanitize-html` ou `DOMPurify` (server-side)

---

### Gap 4: Uploads em `/public`

**Localização:** `src/app/api/admin/upload/route.ts:44`

**Problema:**
```typescript
// ❌ Salva em public, acessível via URL direta
const uploadsDir = join(process.cwd(), 'public', 'uploads', 'strategy');
const url = `/uploads/strategy/${filename}`;  // ❌ Exposição direta
```

**Risco:** Arquivos acessíveis sem validação de permissão

**Mitigação:** Mover para `/uploads` (fora de public) e servir via endpoint protegido

---

### Gap 5: CSRF não aplicado em todos os endpoints

**Localização:**
- `src/app/api/strategy/consultancy/route.ts:7` (POST sem CSRF)
- `src/app/api/contato/route.ts` (POST sem CSRF)

**Problema:**
```typescript
// ❌ POST sem validação CSRF
export async function POST(request: NextRequest) {
  const body = await request.json();
  // ... sem validateCSRF
}
```

**Risco:** CSRF attacks

**Mitigação:** Aplicar `validateCSRF` ou pelo menos Origin check

---

### Gap 6: Falta CI/CD

**Problema:** Sem `.github/workflows/`  
**Risco:** Código vulnerável pode entrar em produção  
**Mitigação:** Criar workflow com lint/audit/typecheck

---

## ✅ Checklist "Definition of Done" (Big Tech)

### Autenticação e Sessão
- [x] HttpOnly cookies
- [x] Secure flag em produção
- [x] SameSite strict
- [ ] Rotação de sessão (refresh token)
- [x] CSRF protection (parcial - precisa aplicar em todos)
- [x] Origin/Referer validation

### Rate Limiting
- [x] Login endpoints protegidos
- [ ] **Endpoints públicos protegidos** (P0)
- [x] Headers X-RateLimit-*
- [x] Retry-After header
- [ ] Lockout progressivo (P2)
- [ ] Redis distribuído integrado (P1)

### Validação
- [x] Zod schemas em todos os endpoints
- [ ] **Sanitização HTML robusta** (P1 - usar biblioteca)
- [x] Upload validation (extensão, tamanho, path traversal)
- [ ] **SSRF protection** (P0 - whitelist de hosts)
- [ ] Validação de resposta externa (P1)

### Observabilidade
- [x] Request ID
- [x] Logs estruturados (JSON em prod)
- [x] Redaction de dados sensíveis
- [ ] Correlação completa (P1 - propagar em todas as rotas)
- [x] Audit trail persistente
- [ ] Alertas/SIEM (P2)

### Supply Chain
- [x] Lockfile versionado
- [ ] **CI com npm audit** (P0)
- [ ] **CI com lint/typecheck** (P0)
- [ ] Dependabot/Renovate (P2)

### Hardening
- [x] CSP strict com nonce
- [x] Security headers (HSTS, XFO, nosniff, etc.)
- [ ] **Uploads fora de `/public`** (P1)
- [ ] TLS verification no código (P1)
- [ ] WAF/CDN configurado (P2)

---

## 📚 Referências

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Prisma Security](https://www.prisma.io/docs/guides/security)
- [Vercel Security](https://vercel.com/docs/security)

---

**Próximo passo:** Ver `docs/SECURITY_BACKLOG.md` para plano de correção priorizado.
