# 🔒 Security Backlog - LandSpace (Priorizado)

**Última atualização:** 2026-01-XX  
**Status:** Backlog priorizado (P0 → P1 → P2)

---

## 📋 Legenda de Prioridades

- **P0 (Crítico)**: Corrigir imediatamente (risco alto, impacto alto)
- **P1 (Alto)**: Corrigir na próxima sprint (risco médio-alto, impacto alto)
- **P2 (Médio)**: Corrigir quando possível (risco médio, impacto médio)

---

## 🚨 P0 - Crítico (Corrigir Imediatamente)

### SEC-001: Rate Limiting em Endpoints Públicos

**Objetivo:** Aplicar rate limiting em `/api/strategy/pulse`, `/api/strategy/consultancy`, `/api/contato`

**Risco mitigado:** DoS, scraping, abuso de recursos

**Patch mínimo:**

```typescript
// src/app/api/strategy/pulse/route.ts
import { withRateLimit } from '@/lib/security/rateLimit';

export const GET = withRateLimit(async (request: NextRequest) => {
  // ... código existente
}, {
  scope: 'pulse',
  ipLimit: 100,        // Mais permissivo que login
  ipWindowMs: 60000,   // 60s
  identityLimit: 20,   // Por contexto (se aplicável)
  identityWindowMs: 60000,
});
```

```typescript
// src/app/api/strategy/consultancy/route.ts
import { withRateLimit } from '@/lib/security/rateLimit';

export const POST = withRateLimit(async (request: NextRequest) => {
  // ... código existente
}, {
  scope: 'consultancy',
  ipLimit: 10,         // Mais restritivo (formulário)
  ipWindowMs: 60000,
});
```

```typescript
// src/app/api/contato/route.ts
import { withRateLimit } from '@/lib/security/rateLimit';

export const POST = withRateLimit(async (request: NextRequest) => {
  // ... código existente
}, {
  scope: 'contato',
  ipLimit: 10,
  ipWindowMs: 60000,
});
```

**Critérios de aceite:**
- [ ] `GET /api/strategy/pulse` retorna 429 após 100 requisições/60s
- [ ] `POST /api/strategy/consultancy` retorna 429 após 10 requisições/60s
- [ ] `POST /api/contato` retorna 429 após 10 requisições/60s
- [ ] Headers `X-RateLimit-*` presentes em todas as respostas

**Validação operacional:**
```cmd
REM Teste rate limit em /api/strategy/pulse
for /L %i in (1,1,101) do @curl.exe -s http://127.0.0.1:3001/api/strategy/pulse > nul
curl.exe -v http://127.0.0.1:3001/api/strategy/pulse
REM Deve retornar HTTP 429 com Retry-After
```

---

### SEC-002: SSRF Protection em Fetch Externo

**Objetivo:** Implementar whitelist de hosts permitidos para fetch externo

**Risco mitigado:** SSRF attacks (acesso a serviços internos)

**Patch mínimo:**

```typescript
// src/lib/security/ssrf-guard.ts (NOVO)
const ALLOWED_HOSTS = [
  'api.gdeltproject.org',
  // Adicionar outros hosts conforme necessário
];

export function validateExternalUrl(url: string): { valid: boolean; error?: string } {
  try {
    const parsed = new URL(url);
    
    // Apenas HTTPS permitido
    if (parsed.protocol !== 'https:') {
      return { valid: false, error: 'Apenas HTTPS permitido' };
    }
    
    // Verificar whitelist
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
      return { valid: false, error: `Host não permitido: ${parsed.hostname}` };
    }
    
    // Bloquear IPs privados (proteção adicional)
    const hostname = parsed.hostname;
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') ||
      hostname.startsWith('172.19.') ||
      hostname.startsWith('172.20.') ||
      hostname.startsWith('172.21.') ||
      hostname.startsWith('172.22.') ||
      hostname.startsWith('172.23.') ||
      hostname.startsWith('172.24.') ||
      hostname.startsWith('172.25.') ||
      hostname.startsWith('172.26.') ||
      hostname.startsWith('172.27.') ||
      hostname.startsWith('172.28.') ||
      hostname.startsWith('172.29.') ||
      hostname.startsWith('172.30.') ||
      hostname.startsWith('172.31.')
    ) {
      return { valid: false, error: 'IP privado não permitido' };
    }
    
    return { valid: true };
  } catch {
    return { valid: false, error: 'URL inválida' };
  }
}
```

```typescript
// src/lib/gdelt/fetch.ts (MODIFICAR)
import { validateExternalUrl } from '@/lib/security/ssrf-guard';

export async function fetchGDELTTerms(...) {
  // ...
  const apiUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=...`;
  
  // Validar URL antes de fetch
  const validation = validateExternalUrl(apiUrl);
  if (!validation.valid) {
    throw new Error(`URL inválida: ${validation.error}`);
  }
  
  const response = await fetch(apiUrl, { ... });
}
```

**Critérios de aceite:**
- [ ] Fetch para `https://api.gdeltproject.org` funciona
- [ ] Fetch para `http://localhost` é bloqueado
- [ ] Fetch para `https://evil.com` é bloqueado
- [ ] Erro claro retornado quando bloqueado

**Validação operacional:**
```cmd
REM Teste SSRF guard (via código de teste)
node -e "const { validateExternalUrl } = require('./src/lib/security/ssrf-guard.ts'); console.log(validateExternalUrl('https://api.gdeltproject.org/api/v2/doc/doc'));"
REM Deve retornar { valid: true }
```

---

### SEC-003: CI/CD com Security Checks

**Objetivo:** Criar workflow GitHub Actions com lint, typecheck, npm audit

**Risco mitigado:** Código vulnerável entra em produção

**Patch mínimo:**

```yaml
# .github/workflows/security.yml (NOVO)
name: Security Checks

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  security:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run TypeScript check
        run: npx tsc --noEmit
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
        continue-on-error: true
      
      - name: Check environment variables
        run: npm run check:env
        env:
          SESSION_SECRET: ${{ secrets.SESSION_SECRET || 'test-secret-min-32-chars-for-validation' }}
          DATABASE_URL: ${{ secrets.DATABASE_URL || 'postgresql://test:test@localhost:5432/test' }}
          PREVIEW_SECRET: ${{ secrets.PREVIEW_SECRET || 'test-preview-secret-min-32-chars' }}
```

**Critérios de aceite:**
- [ ] Workflow executa em PRs
- [ ] Falha se lint/typecheck/audit falhar
- [ ] Logs não expõem secrets

**Validação operacional:**
```cmd
REM Criar PR de teste e verificar se workflow executa
git checkout -b test-security-workflow
git commit --allow-empty -m "test: trigger security workflow"
git push origin test-security-workflow
REM Verificar Actions tab no GitHub
```

---

## ⚠️ P1 - Alto (Próxima Sprint)

### SEC-004: Sanitização HTML Robusta

**Objetivo:** Substituir regex por biblioteca robusta (`sanitize-html`)

**Risco mitigado:** XSS via payloads complexos

**Patch mínimo:**

```bash
npm install sanitize-html
npm install --save-dev @types/sanitize-html
```

```typescript
// src/lib/sanitize-html.ts (MODIFICAR)
import sanitizeHtmlLib from 'sanitize-html';

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img',
    ],
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
    },
    // Bloquear scripts e eventos
    disallowedTagsMode: 'discard',
    // Remover atributos style
    allowedStyles: {},
  });
}
```

**Critérios de aceite:**
- [ ] `<script>alert(1)</script>` é removido
- [ ] `<img src=x onerror="alert(1)">` é sanitizado (onerror removido)
- [ ] `<p style="color:red">text</p>` mantém tag, remove style
- [ ] HTML válido (markdown) é preservado

**Validação operacional:**
```cmd
REM Teste sanitização
node -e "const { sanitizeHtml } = require('./src/lib/sanitize-html.ts'); console.log(sanitizeHtml('<script>alert(1)</script><p>text</p>'));"
REM Deve retornar apenas <p>text</p>
```

---

### SEC-005: Mover Uploads para Fora de `/public`

**Objetivo:** Uploads em `/uploads` (fora de public) e servir via endpoint protegido

**Risco mitigado:** Exposição direta de arquivos

**Patch mínimo:**

```typescript
// src/app/api/admin/upload/route.ts (MODIFICAR)
// ANTES:
const uploadsDir = join(process.cwd(), 'public', 'uploads', 'strategy');
const url = `/uploads/strategy/${filename}`;

// DEPOIS:
const uploadsDir = join(process.cwd(), 'uploads', 'strategy');  // Fora de public
// Não retornar URL direta - retornar ID para servir via endpoint
const fileRecord = await prisma.uploadFile.create({
  data: { filename, storagePath: `uploads/strategy/${filename}` },
});
return NextResponse.json({ fileId: fileRecord.id });  // Retornar ID, não URL
```

```typescript
// src/app/api/admin/files/[id]/route.ts (NOVO)
// Endpoint para servir arquivos de upload com validação de permissão
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  
  const file = await prisma.uploadFile.findUnique({ where: { id } });
  if (!file) {
    return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
  }
  
  // Servir via streaming (nunca expor storagePath)
  const filePath = resolve(process.cwd(), file.storagePath);
  const fileStream = createReadStream(filePath);
  
  return new NextResponse(fileStream as any, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
```

**Critérios de aceite:**
- [ ] Uploads salvos em `/uploads` (fora de public)
- [ ] URL direta `/uploads/strategy/...` retorna 404
- [ ] Arquivo servido via `/api/admin/files/[id]` com autenticação
- [ ] Path traversal ainda bloqueado

**Validação operacional:**
```cmd
REM Teste: tentar acessar URL direta
curl.exe http://127.0.0.1:3001/uploads/strategy/test.jpg
REM Deve retornar 404

REM Teste: servir via endpoint protegido
curl.exe -H "Cookie: ls_admin_session=..." http://127.0.0.1:3001/api/admin/files/[id]
REM Deve retornar arquivo com autenticação
```

---

### SEC-006: Aplicar CSRF em Todos os Endpoints Mutáveis

**Objetivo:** Aplicar `validateCSRF` em `/api/strategy/consultancy` e `/api/contato`

**Risco mitigado:** CSRF attacks

**Patch mínimo:**

```typescript
// src/app/api/strategy/consultancy/route.ts (MODIFICAR)
import { validateCSRF } from '@/lib/csrf-guard';

export async function POST(request: NextRequest) {
  // Validar CSRF
  const csrfError = validateCSRF(request);
  if (csrfError) {
    return NextResponse.json(
      { error: csrfError.error },
      { status: csrfError.status }
    );
  }
  
  // ... resto do código
}
```

```typescript
// src/app/api/contato/route.ts (MODIFICAR)
import { validateCSRF } from '@/lib/csrf-guard';

export async function POST(request: NextRequest) {
  // Validar CSRF
  const csrfError = validateCSRF(request);
  if (csrfError) {
    return NextResponse.json(
      { error: csrfError.error },
      { status: csrfError.status }
    );
  }
  
  // ... resto do código
}
```

**Critérios de aceite:**
- [ ] POST sem `x-csrf-token` retorna 403
- [ ] POST com token inválido retorna 403
- [ ] POST com token válido funciona

**Validação operacional:**
```cmd
REM Teste CSRF
curl.exe -X POST http://127.0.0.1:3001/api/strategy/consultancy -H "Content-Type: application/json" -d "{}"
REM Deve retornar 403 (Token CSRF ausente)

REM Obter token CSRF
curl.exe http://127.0.0.1:3001/api/csrf
REM Copiar token do response

REM Teste com token válido
curl.exe -X POST http://127.0.0.1:3001/api/strategy/consultancy -H "Content-Type: application/json" -H "x-csrf-token: [TOKEN]" -H "Cookie: ls_csrf=[TOKEN]" -d "{}"
REM Deve funcionar (ou retornar erro de validação, não 403 CSRF)
```

---

### SEC-007: Integrar Redis Rate Limiting

**Objetivo:** Usar `src/lib/rate-limit-redis.ts` quando `REDIS_URL` estiver configurado

**Risco mitigado:** Bypass de rate limit em múltiplas instâncias

**Patch mínimo:**

```typescript
// src/lib/security/rateLimit.ts (MODIFICAR)
import { checkRateLimitRedis } from '../rate-limit-redis';

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  // Tentar Redis primeiro, fallback para in-memory
  if (process.env.REDIS_URL) {
    // Usar Redis (async, mas wrapper já é async)
    return await checkRateLimitRedis(key, limit, windowMs);
  }
  
  // Fallback para in-memory (código existente)
  const store = getStore();
  // ... resto do código existente
}
```

**Critérios de aceite:**
- [ ] Com `REDIS_URL` configurado, usa Redis
- [ ] Sem `REDIS_URL`, usa in-memory (comportamento atual)
- [ ] Rate limit funciona em múltiplas instâncias quando Redis está ativo

**Validação operacional:**
```cmd
REM Teste com Redis
set REDIS_URL=redis://localhost:6379
npm run start -- -p 3001
REM Fazer requisições de rate limit e verificar que funciona

REM Teste sem Redis (fallback)
set REDIS_URL=
npm run start -- -p 3001
REM Deve funcionar com in-memory
```

---

## 📋 P2 - Médio (Quando Possível)

### SEC-008: Rotação de Sessão (Refresh Token)

**Objetivo:** Implementar refresh token com rotação

**Risco mitigado:** Token comprometido válido por muito tempo

**Patch mínimo:**

```typescript
// src/lib/auth.ts (MODIFICAR)
// Adicionar refresh token com rotação
// JWT principal: 15 minutos
// Refresh token: 7 dias, mas rotaciona a cada uso
```

**Critérios de aceite:**
- [ ] JWT principal expira em 15 minutos
- [ ] Refresh token válido por 7 dias
- [ ] Refresh token rotaciona a cada uso
- [ ] Token antigo inválido após refresh

---

### SEC-009: Lockout Progressivo

**Objetivo:** Implementar lockout exponencial após múltiplas violações

**Risco mitigado:** Bypass de rate limit via tentativas distribuídas

**Patch mínimo:**

```typescript
// src/lib/security/rateLimit.ts (MODIFICAR)
// Adicionar contador de violações
// Após 3 violações: lockout 5min
// Após 5 violações: lockout 15min
// Após 10 violações: lockout 1h
```

---

### SEC-010: Alertas/SIEM

**Objetivo:** Integrar logs com sistema de alerta (Sentry, Datadog, etc.)

**Risco mitigado:** Falhas de segurança não detectadas

**Patch mínimo:**

```typescript
// src/lib/logger.ts (MODIFICAR)
// Adicionar integração com Sentry/Datadog
// Enviar alertas para eventos críticos (login falho, rate limit, etc.)
```

---

## 📝 Notas de Implementação

### Ordem Recomendada de Execução

1. **SEC-001** (Rate limiting público) - Mais rápido, alto impacto
2. **SEC-003** (CI/CD) - Previne futuros problemas
3. **SEC-002** (SSRF) - Proteção crítica
4. **SEC-004** (Sanitização) - Proteção XSS
5. **SEC-005** (Uploads) - Proteção de dados
6. **SEC-006** (CSRF completo) - Proteção CSRF
7. **SEC-007** (Redis) - Escalabilidade
8. **SEC-008-010** (P2) - Melhorias incrementais

### Padrão de Commits

Cada item do backlog deve ser um PR separado com:
- Título: `[SEC-XXX] Descrição curta`
- Descrição: Objetivo, risco mitigado, critérios de aceite
- Testes: Comandos de validação incluídos
- Review: Requer aprovação de segurança

---

**Status do Backlog:** 10 itens (3 P0, 4 P1, 3 P2)
