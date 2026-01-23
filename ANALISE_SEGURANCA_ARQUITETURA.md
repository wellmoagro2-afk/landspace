# 🔒 Análise Crítica de Segurança e Arquitetura - LandSpace

**Data:** Janeiro 2025  
**Status:** ⚠️ **NÃO PRONTO PARA PRODUÇÃO** - Requer correções críticas

---

## 📊 Resumo Executivo

### ✅ Pontos Fortes
- ✅ Uso de JWT com HMAC (jose)
- ✅ Cookies httpOnly
- ✅ Hash de senhas com bcrypt
- ✅ Rate limiting implementado
- ✅ Validação de uploads
- ✅ Auditoria de ações
- ✅ Middleware de proteção

### ❌ Problemas Críticos (Bloqueadores de Produção)
1. **Secrets hardcoded com fallbacks inseguros**
2. **Parsing manual de cookies (vulnerável)**
3. **Falta de CSRF protection**
4. **SQLite em produção (não escalável)**
5. **Falta de HTTPS enforcement**
6. **Sem validação de input sanitization**
7. **Logs podem expor dados sensíveis**
8. **Falta de Content Security Policy (CSP)**
9. **Sem proteção contra timing attacks**
10. **Falta de health checks e monitoring**

---

## 🚨 PROBLEMAS CRÍTICOS DE SEGURANÇA

### 1. SECRETS HARDCODED COM FALLBACKS INSEGUROS

**Localização:** `src/middleware.ts`, `src/lib/portal-auth.ts`

```typescript
// ❌ PROBLEMA CRÍTICO
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-in-production';
```

**Riscos:**
- Se `SESSION_SECRET` não estiver configurado, usa valor padrão conhecido
- Qualquer pessoa pode forjar tokens JWT
- Comprometimento total da autenticação

**Solução (URGENTE):**
```typescript
// ✅ CORRETO
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  throw new Error('SESSION_SECRET must be set and at least 32 characters');
}
```

**Aplicar em:**
- `src/middleware.ts` (linhas 7, 34, 92, 142, 179)
- `src/lib/portal-auth.ts` (linha 11)
- Todos os lugares que usam secrets

---

### 2. PARSING MANUAL DE COOKIES (VULNERÁVEL)

**Localização:** `src/middleware.ts`

```typescript
// ❌ PROBLEMA: Parsing manual vulnerável
const cookieHeader = request.headers.get('cookie') || '';
const cookies = Object.fromEntries(
  cookieHeader.split('; ').map(c => c.split('='))
);
```

**Riscos:**
- Não trata cookies malformados
- Vulnerável a cookie injection
- Não valida encoding
- Pode quebrar com cookies complexos

**Solução:**
```typescript
// ✅ CORRETO: Usar biblioteca ou Next.js cookies()
import { cookies } from 'next/headers';

// No middleware, usar:
const cookieStore = await cookies();
const token = cookieStore.get('ls_portal_session')?.value;
```

**Alternativa (se não puder usar cookies() no middleware):**
```typescript
// Usar biblioteca como 'cookie' do npm
import { parse } from 'cookie';

const cookieHeader = request.headers.get('cookie') || '';
const cookies = parse(cookieHeader);
```

---

### 3. FALTA DE CSRF PROTECTION

**Problema:** Nenhuma proteção CSRF implementada

**Riscos:**
- Ataques CSRF em todas as ações de estado (POST, PATCH, DELETE)
- Cliente pode ser enganado a executar ações não autorizadas
- Especialmente crítico em `/api/admin/portal/*`

**Solução:**
```typescript
// Adicionar CSRF token em todas as rotas de estado
// 1. Gerar token no GET
// 2. Validar token no POST/PATCH/DELETE
// 3. Usar SameSite=strict nos cookies (já está em 'lax', melhorar para 'strict')
```

**Implementação:**
- Usar `@edge-runtime/csrf` ou implementar token CSRF customizado
- Adicionar header `X-CSRF-Token` em todas as requisições de estado
- Validar no middleware ou em cada rota

---

### 4. SQLITE EM PRODUÇÃO (NÃO ESCALÁVEL)

**Problema:** `prisma/schema.prisma` usa SQLite por padrão

**Riscos:**
- SQLite não suporta múltiplas escritas simultâneas
- Não escalável para produção
- Pode corromper banco com alta concorrência
- Sem suporte a conexões pool

**Solução:**
```prisma
// ✅ CORRETO: Postgres em produção
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Ações:**
- Migrar para Postgres antes do lançamento
- Configurar connection pooling (Prisma já faz isso)
- Usar variável de ambiente para escolher provider

---

### 5. FALTA DE HTTPS ENFORCEMENT

**Problema:** Não há redirecionamento HTTP → HTTPS

**Riscos:**
- Cookies podem ser interceptados em HTTP
- Tokens JWT podem ser roubados
- Dados sensíveis transmitidos em texto plano

**Solução:**
```typescript
// No middleware ou next.config.ts
export async function middleware(request: NextRequest) {
  // Forçar HTTPS em produção
  if (process.env.NODE_ENV === 'production') {
    const url = request.nextUrl.clone();
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return NextResponse.redirect(url);
    }
  }
  // ... resto do middleware
}
```

**Alternativa (melhor):**
- Configurar no servidor (nginx, Vercel, etc.)
- Usar headers de segurança (HSTS)

---

### 6. SEM VALIDAÇÃO DE INPUT SANITIZATION

**Problema:** Inputs do usuário não são sanitizados

**Riscos:**
- XSS (Cross-Site Scripting)
- SQL Injection (menos provável com Prisma, mas ainda possível)
- Path Traversal (já tem alguma proteção, mas pode melhorar)

**Solução:**
```typescript
// Adicionar sanitização em todos os inputs
import DOMPurify from 'isomorphic-dompurify'; // Para strings HTML
import { z } from 'zod'; // Para validação de schema

// Exemplo:
const schema = z.object({
  protocol: z.string().regex(/^LS-\d{4}-\d{6}$/),
  pin: z.string().length(6).regex(/^\d+$/),
});

// Validar antes de processar
const validated = schema.parse(input);
```

**Aplicar em:**
- Todos os endpoints de API
- Formulários de upload
- Campos de texto livre

---

### 7. LOGS PODEM EXPOR DADOS SENSÍVEIS

**Localização:** Vários arquivos com `console.log`

**Problema:**
```typescript
// ❌ Pode expor dados sensíveis
console.log('[Portal Login]', { protocol, pin }); // PIN em texto!
```

**Riscos:**
- PINs, senhas, tokens podem aparecer em logs
- Logs podem ser acessados por terceiros
- Violação de LGPD/GDPR

**Solução:**
```typescript
// ✅ CORRETO: Mascarar dados sensíveis
function maskSensitive(data: any): any {
  const masked = { ...data };
  if (masked.pin) masked.pin = '***';
  if (masked.password) masked.password = '***';
  if (masked.token) masked.token = masked.token.substring(0, 10) + '...';
  return masked;
}

console.log('[Portal Login]', maskSensitive({ protocol, pin }));
```

**Aplicar em:**
- Todos os logs de debug
- Logs de auditoria (já está melhor, mas revisar)
- Erros que podem expor stack traces

---

### 8. FALTA DE CONTENT SECURITY POLICY (CSP)

**Problema:** Sem headers de segurança

**Riscos:**
- XSS attacks
- Clickjacking
- Injeção de scripts maliciosos

**Solução:**
```typescript
// No next.config.ts ou middleware
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self';
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];
```

---

### 9. SEM PROTEÇÃO CONTRA TIMING ATTACKS

**Problema:** Comparação de strings/tokens sem proteção

**Riscos:**
- Ataques de timing podem revelar diferenças sutis
- Pode expor informações sobre PINs/senhas

**Solução:**
```typescript
// ✅ CORRETO: Usar comparação constante
import { timingSafeEqual } from 'crypto';

function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

// Para PINs, já está ok (bcrypt.compare é constante), mas validar outros lugares
```

---

### 10. FALTA DE HEALTH CHECKS E MONITORING

**Problema:** Sem endpoints de health check

**Riscos:**
- Não há como monitorar saúde da aplicação
- Load balancers não sabem se app está saudável
- Sem alertas de problemas

**Solução:**
```typescript
// Criar /api/health
export async function GET() {
  try {
    // Verificar banco
    await prisma.$queryRaw`SELECT 1`;
    
    // Verificar Redis (se configurado)
    // ...
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'ok',
        redis: process.env.REDIS_URL ? 'ok' : 'not_configured'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

---

## ⚠️ PROBLEMAS DE ARQUITETURA E ESCALABILIDADE

### 11. MIDDLEWARE MUITO COMPLEXO

**Problema:** `src/middleware.ts` tem 200+ linhas com lógica duplicada

**Riscos:**
- Difícil de manter
- Performance (executa em cada request)
- Lógica duplicada (parsing de cookies repetido)

**Solução:**
```typescript
// Refatorar em funções menores
function parseCookies(request: NextRequest): Record<string, string> {
  // ...
}

function verifyPortalSession(token: string): PortalSession | null {
  // ...
}

function verifyAdminSession(token: string): AdminSession | null {
  // ...
}

// Middleware fica limpo
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/studio/portal/')) {
    return handlePortalRoute(request);
  }
  
  if (pathname.startsWith('/studio/admin/')) {
    return handleAdminRoute(request);
  }
  
  // ...
}
```

---

### 12. FALTA DE VALIDAÇÃO DE SCHEMA (ZOD/YUP)

**Problema:** Validação manual e inconsistente

**Riscos:**
- Bugs de validação
- Dados inválidos no banco
- Inconsistências

**Solução:**
```typescript
// Usar Zod para validação
import { z } from 'zod';

const CreateProjectSchema = z.object({
  clientName: z.string().min(1).max(255),
  clientEmail: z.string().email().optional(),
  serviceType: z.nativeEnum(ServiceType),
  totalValue: z.number().positive(),
  entryValue: z.number().positive(),
});

// Em cada endpoint
const body = await request.json();
const validated = CreateProjectSchema.parse(body);
```

---

### 13. SEM PAGINAÇÃO NAS LISTAGENS

**Problema:** Queries podem retornar milhares de registros

**Riscos:**
- Performance degradada
- Timeout de requests
- Uso excessivo de memória

**Solução:**
```typescript
// Adicionar paginação
const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '20'), 100);
const skip = (page - 1) * limit;

const [items, total] = await Promise.all([
  prisma.project.findMany({ skip, take: limit }),
  prisma.project.count()
]);

return NextResponse.json({
  items,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  }
});
```

---

### 14. UPLOADS SEM LIMITE DE TAMANHO GLOBAL

**Problema:** Limite apenas no endpoint, não global

**Riscos:**
- DDoS por upload de arquivos grandes
- Esgotamento de disco
- Timeout de requests

**Solução:**
```typescript
// No next.config.ts (já tem, mas verificar)
experimental: {
  serverActions: {
    bodySizeLimit: '10mb', // Ajustar conforme necessário
  },
}

// No middleware ou nginx
// Limitar tamanho de body antes de chegar no handler
```

---

### 15. SEM CACHE STRATEGY

**Problema:** Queries repetidas sem cache

**Riscos:**
- Performance ruim
- Carga excessiva no banco
- Custo alto

**Solução:**
```typescript
// Implementar cache com Redis
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function getCachedProject(protocol: string) {
  const cached = await redis.get(`project:${protocol}`);
  if (cached) return JSON.parse(cached);
  
  const project = await prisma.project.findUnique({ where: { protocol } });
  if (project) {
    await redis.setex(`project:${protocol}`, 300, JSON.stringify(project)); // 5 min
  }
  return project;
}
```

---

## 📋 CHECKLIST PRÉ-PRODUÇÃO (OBRIGATÓRIO)

### Segurança
- [ ] Remover todos os fallbacks de secrets
- [ ] Validar que SESSION_SECRET tem mínimo 32 caracteres
- [ ] Implementar CSRF protection
- [ ] Adicionar headers de segurança (CSP, X-Frame-Options, etc.)
- [ ] Sanitizar todos os inputs
- [ ] Mascarar dados sensíveis em logs
- [ ] Forçar HTTPS em produção
- [ ] Implementar proteção contra timing attacks
- [ ] Revisar todos os console.log para dados sensíveis

### Infraestrutura
- [ ] Migrar para Postgres (não SQLite)
- [ ] Configurar connection pooling
- [ ] Implementar health checks
- [ ] Configurar monitoring (Sentry, etc.)
- [ ] Configurar alertas
- [ ] Backup automático do banco
- [ ] Backup de arquivos (/uploads)
- [ ] Plano de disaster recovery

### Performance
- [ ] Implementar paginação em todas as listagens
- [ ] Adicionar cache (Redis) para queries frequentes
- [ ] Otimizar queries do Prisma (evitar N+1)
- [ ] Implementar rate limiting mais agressivo
- [ ] Configurar CDN para assets estáticos
- [ ] Otimizar imagens (Next.js Image)
- [ ] Code splitting agressivo

### Validação e Testes
- [ ] Adicionar validação de schema (Zod) em todos os endpoints
- [ ] Testes unitários para funções críticas
- [ ] Testes de integração para fluxos principais
- [ ] Testes E2E para login, upload, download
- [ ] Testes de carga (stress testing)
- [ ] Testes de segurança (OWASP Top 10)

### Compliance
- [ ] Revisar LGPD compliance
- [ ] Política de retenção de dados documentada
- [ ] Direito ao esquecimento implementado
- [ ] Exportação de dados do usuário
- [ ] Termos de uso atualizados
- [ ] Política de privacidade completa

---

## 🎯 PRIORIZAÇÃO DE CORREÇÕES

### 🔴 CRÍTICO (Bloqueador de Produção)
1. Remover fallbacks de secrets
2. Implementar CSRF protection
3. Migrar para Postgres
4. Adicionar sanitização de inputs
5. Forçar HTTPS

### 🟡 ALTO (Fazer antes do lançamento)
6. Headers de segurança (CSP)
7. Health checks
8. Paginação
9. Validação de schema (Zod)
10. Mascarar dados em logs

### 🟢 MÉDIO (Melhorias importantes)
11. Cache com Redis
12. Refatorar middleware
13. Monitoring e alertas
14. Testes automatizados
15. Otimizações de performance

---

## 📚 REFERÊNCIAS E PADRÕES BIG TECH

### OWASP Top 10 (2021)
- ✅ A01:2021 – Broken Access Control (parcial - precisa CSRF)
- ⚠️ A02:2021 – Cryptographic Failures (secrets hardcoded)
- ✅ A03:2021 – Injection (Prisma ajuda, mas precisa sanitização)
- ⚠️ A04:2021 – Insecure Design (falta validação de schema)
- ⚠️ A05:2021 – Security Misconfiguration (falta headers, HTTPS)
- ⚠️ A06:2021 – Vulnerable Components (dependências atualizadas?)
- ⚠️ A07:2021 – Authentication Failures (timing attacks)
- ⚠️ A08:2021 – Software and Data Integrity (falta validação)
- ⚠️ A09:2021 – Security Logging (logs expõem dados)
- ⚠️ A10:2021 – SSRF (não verificado)

### Padrões Big Tech (Google, Meta, Amazon)
- ✅ JWT com HMAC (jose)
- ✅ Cookies httpOnly
- ✅ Hash de senhas (bcrypt)
- ❌ CSRF tokens (falta)
- ❌ Rate limiting distribuído (falta Redis)
- ❌ Input validation (falta Zod)
- ❌ Security headers (falta)
- ❌ Health checks (falta)
- ❌ Monitoring (falta)

---

## 🚀 RECOMENDAÇÕES FINAIS

### Antes de Lançar
1. **Corrigir todos os itens CRÍTICOS** (lista acima)
2. **Fazer security audit** com ferramentas (Snyk, npm audit)
3. **Penetration testing** básico
4. **Load testing** (simular tráfego real)
5. **Backup e restore test** (garantir que funciona)

### Após Lançamento
1. **Monitoramento 24/7** (Sentry, logs)
2. **Alertas configurados** (erros, performance)
3. **Backup automático** (diário mínimo)
4. **Plano de incident response**
5. **Documentação de runbook**

### Melhorias Contínuas
1. **Security updates** regulares
2. **Dependency updates** (npm audit)
3. **Code reviews** focados em segurança
4. **Training** da equipe em segurança
5. **Regular audits** (trimestral)

---

## ✅ CONCLUSÃO

A arquitetura atual tem **fundações sólidas** (JWT, bcrypt, rate limiting), mas possui **problemas críticos de segurança** que **IMPEDEM o lançamento em produção** sem correções.

**Estimativa de correção:** 2-3 semanas de trabalho focado em segurança.

**Risco atual:** 🔴 **ALTO** - Não lançar sem corrigir itens críticos.

**Risco após correções:** 🟢 **BAIXO** - Arquitetura ficará robusta e pronta para escala.

---

**Última atualização:** Janeiro 2025  
**Próxima revisão:** Após implementação de correções críticas
