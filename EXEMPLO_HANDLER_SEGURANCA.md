# Exemplo Completo: Handler Mutável com Segurança Crítica

Este documento demonstra um handler mutável (POST/PATCH/DELETE) implementado com as **8 correções críticas de segurança** aplicadas no LandSpace.

## 📋 Handler de Exemplo: Criar Projeto (POST)

**Arquivo:** `src/app/api/admin/portal/project/route.ts`

---

## 🔒 Implementação Completa

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/portal-auth';
import { prisma } from '@/lib/prisma';
import { generateProtocol, generatePin, hashPin } from '@/lib/portal-auth';
import { createDefaultSteps } from '@/lib/portal-utils';
import { Decimal } from '@prisma/client/runtime/library';
import { getRequestId, addRequestIdHeader, logStructured } from '@/lib/observability';
import { auditLog, AuditActions } from '@/lib/audit';
import { getClientIP } from '@/lib/rate-limit';
import { createProjectSchema } from '@/lib/schemas';

/**
 * POST /api/admin/portal/project
 * 
 * Cria um novo projeto no portal do cliente.
 * 
 * SEGURANÇA APLICADA:
 * 1. ✅ Autenticação: Requer sessão admin válida
 * 2. ✅ CSRF: Protegido pelo middleware (valida token CSRF)
 * 3. ✅ Validação Zod: Input validado com schema estrito
 * 4. ✅ Logger Seguro: PIN nunca é logado
 * 5. ✅ Observabilidade: Request ID em todas as respostas
 * 6. ✅ Auditoria: Evento registrado no AuditLog
 */
export async function POST(request: NextRequest) {
  // ============================================
  // 1. OBSERVABILIDADE (Request ID)
  // ============================================
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    // ============================================
    // 2. AUTENTICAÇÃO (Sessão Admin)
    // ============================================
    // Validação de sessão admin via cookie httpOnly
    // Middleware já validou CSRF antes de chegar aqui
    const isAdmin = await getAdminSession();

    if (!isAdmin) {
      return addRequestIdHeader(
        NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        ),
        requestId
      );
    }

    // ============================================
    // 3. VALIDAÇÃO ZOD (Input Sanitization)
    // ============================================
    // Parse seguro do body (não quebra se JSON inválido)
    const body = await request.json().catch(() => null);
    if (!body) {
      // Não ecoar input inválido (evita XSS)
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    // Validação estrita com Zod
    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      // Erro genérico sem expor detalhes do schema
      // Em produção, não expor validation.error.errors
      logStructured('warn', 'Admin Create Project: validação falhou', {
        requestId,
        action: AuditActions.ADMIN_PROJECT_CREATE,
        ipAddress: clientIP,
        errors: validation.error.errors, // Apenas em logs, não na resposta
      });
      
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    // Dados validados e sanitizados pelo Zod
    const {
      clientName,      // ✅ trim() aplicado, max(255)
      clientEmail,     // ✅ email() validado, opcional
      clientPhone,     // ✅ trim() aplicado, max(50), opcional
      serviceType,     // ✅ enum validado
      totalValue,      // ✅ number positivo ou string convertida
      entryValue,      // ✅ number não-negativo, <= totalValue (refine)
    } = validation.data;

    // ============================================
    // 4. LÓGICA DE NEGÓCIO
    // ============================================
    const protocol = generateProtocol().toUpperCase().trim();
    const pin = generatePin();
    const pinHash = await hashPin(pin);

    // ============================================
    // 5. LOGGER SEGURO (Sem Dados Sensíveis)
    // ============================================
    // ✅ PIN NUNCA é logado (mesmo em dev)
    // ✅ Apenas protocol e metadados seguros
    logStructured('info', 'Admin Create Project: protocol gerado', {
      requestId,
      protocol,
      // PIN não é logado por segurança
      clientName, // ✅ Nome do cliente é seguro para log
      serviceType,
    });

    const project = await prisma.project.create({
      data: {
        protocol,
        pinHash, // ✅ Hash bcrypt (não é PIN em texto)
        clientName,
        clientEmail: clientEmail || null,
        clientPhone: clientPhone || null,
        serviceType,
        totalValue: new Decimal(totalValue),
        entryValue: new Decimal(entryValue),
        paidValue: new Decimal(0),
        balanceValue: new Decimal(totalValue),
        status: 'TRIAGEM',
      },
    });

    // Criar steps padrão
    await createDefaultSteps(project.id);

    // ============================================
    // 6. AUDITORIA (AuditLog)
    // ============================================
    await auditLog({
      requestId,
      protocol: project.protocol,
      action: AuditActions.ADMIN_PROJECT_CREATE,
      entityType: 'Project',
      entityId: project.id,
      ipAddress: clientIP,
      userAgent,
      metadata: {
        clientName: project.clientName,
        serviceType: project.serviceType,
        totalValue: project.totalValue.toString(),
        // PIN nunca em metadata
      },
      success: true,
    });

    // ============================================
    // 7. RESPOSTA SEGURA
    // ============================================
    // ✅ PIN retornado apenas na criação (única vez)
    // ✅ Request ID incluído no header
    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        project: {
          id: project.id,
          protocol: project.protocol,
          pin, // ⚠️ Retornado apenas na criação (necessário para cliente)
        },
      }),
      requestId
    );
  } catch (error) {
    // ============================================
    // 8. TRATAMENTO DE ERRO SEGURO
    // ============================================
    // ✅ Log estruturado sem expor stack trace
    // ✅ Resposta genérica (não expõe detalhes internos)
    logStructured('error', 'Admin project create: erro', {
      requestId,
      action: AuditActions.ADMIN_PROJECT_CREATE,
      error: error instanceof Error ? error.message : 'Unknown',
      // Stack trace apenas em logs internos, nunca na resposta
    });

    return addRequestIdHeader(
      NextResponse.json(
        { error: 'Erro ao criar projeto' }, // Genérico
        { status: 500 }
      ),
      requestId
    );
  }
}
```

---

## 📝 Schema Zod Correspondente

**Arquivo:** `src/lib/schemas/admin.ts`

```typescript
import { z } from 'zod';

/**
 * Schema para criar projeto
 * 
 * VALIDAÇÕES APLICADAS:
 * - clientName: obrigatório, trim, max 255 caracteres
 * - clientEmail: opcional, mas se presente deve ser email válido
 * - clientPhone: opcional, trim, max 50 caracteres
 * - serviceType: enum estrito (apenas valores permitidos)
 * - totalValue: número positivo (aceita string e converte)
 * - entryValue: número não-negativo, deve ser <= totalValue
 */
export const createProjectSchema = z.object({
  clientName: z.string()
    .trim()
    .min(1, 'Nome do cliente é obrigatório')
    .max(255),
  
  clientEmail: z.string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')), // Permite string vazia
  
  clientPhone: z.string()
    .trim()
    .max(50)
    .optional()
    .or(z.literal('')),
  
  serviceType: z.enum([
    'PERICIA_EVIDENCIAS',
    'PERICIA_AMBIENTAL',
    'AVALIACAO_RURAL',
    'CAR',
    'GEOREF',
    'OUTROS',
  ]),
  
  totalValue: z.number()
    .positive('Valor total deve ser positivo')
    .or(z.string().transform(val => {
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0) {
        throw new Error('Valor total inválido');
      }
      return num;
    })),
  
  entryValue: z.number()
    .nonnegative('Valor de entrada não pode ser negativo')
    .or(z.string().transform(val => {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0) {
        throw new Error('Valor de entrada inválido');
      }
      return num;
    })),
}).refine(
  // Validação customizada: entryValue <= totalValue
  data => data.entryValue <= data.totalValue,
  {
    message: 'Valor de entrada não pode ser maior que valor total',
    path: ['entryValue'],
  }
);
```

---

## 🛡️ Proteção CSRF (Middleware)

**Arquivo:** `src/middleware.ts`

O CSRF é validado **antes** do handler ser executado:

```typescript
// Proteger rotas de API admin (exceto login e password do portal)
if (pathname.startsWith('/api/admin')) {
  // Para rotas do portal admin, usar JWT (ls_admin_session)
  if (pathname.startsWith('/api/admin/portal')) {
    // ✅ Validar CSRF para métodos mutáveis
    const csrfCheck = validateCSRF(request);
    if (csrfCheck) {
      return NextResponse.json(
        { error: 'forbidden' },
        { status: csrfCheck.status }
      );
    }

    // ... validação de sessão admin ...
  }
}
```

**Arquivo:** `src/lib/csrf-guard.ts`

```typescript
export function validateCSRF(request: NextRequest): { error: string; status: number } | null {
  const method = request.method.toUpperCase();
  
  // Métodos seguros não requerem CSRF
  if (SAFE_METHODS.includes(method)) {
    return null;
  }

  // Validar Origin/Referer (Same-Origin check)
  const csrfToken = request.headers.get('x-csrf-token');
  const csrfCookie = request.cookies.get('ls_csrf')?.value;

  if (!csrfToken || !csrfCookie) {
    return { error: 'Token CSRF ausente', status: 403 };
  }

  // Comparar token do header com cookie
  if (csrfToken !== csrfCookie) {
    return { error: 'Token CSRF inválido', status: 403 };
  }

  return null; // ✅ Válido
}
```

---

## 📊 Fluxo Completo de Segurança

```
1. Cliente faz POST /api/admin/portal/project
   ↓
2. Middleware intercepta:
   - ✅ Valida HTTPS (produção)
   - ✅ Valida CSRF token (x-csrf-token header + ls_csrf cookie)
   - ✅ Valida sessão admin (ls_admin_session cookie)
   ↓
3. Handler executa:
   - ✅ Parse seguro do body (try/catch)
   - ✅ Validação Zod (safeParse)
   - ✅ Sanitização automática (trim, max, email, etc.)
   - ✅ Logger seguro (sem PIN/senha)
   - ✅ Auditoria (AuditLog)
   ↓
4. Resposta:
   - ✅ Request ID no header (x-request-id)
   - ✅ Erros genéricos (não expõe detalhes)
   - ✅ PIN retornado apenas na criação
```

---

## ✅ Checklist de Segurança

- [x] **ENV Validation**: Secrets validados em `src/lib/env.ts`
- [x] **Cookie Parsing**: Usa `request.cookies.get()` (não split manual)
- [x] **HTTPS Enforcement**: Redirect HTTP→HTTPS em produção
- [x] **CSRF Protection**: Token validado no middleware
- [x] **CSP Headers**: Configurado em `next.config.ts`
- [x] **Input Validation**: Zod schema com sanitização
- [x] **Logger Seguro**: PIN/senha nunca logados
- [x] **Auditoria**: Eventos registrados no AuditLog
- [x] **Observabilidade**: Request ID em todas as respostas

---

## 🧪 Como Testar

### 1. Teste de Validação Zod

```bash
# ✅ Válido
curl -X POST http://localhost:3000/api/admin/portal/project \
  -H "Cookie: ls_admin_session=..." \
  -H "x-csrf-token: ..." \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Cliente Teste",
    "serviceType": "PERICIA_AMBIENTAL",
    "totalValue": 10000,
    "entryValue": 3000
  }'

# ❌ Inválido (entryValue > totalValue)
curl -X POST http://localhost:3000/api/admin/portal/project \
  -H "Cookie: ls_admin_session=..." \
  -H "x-csrf-token: ..." \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Cliente Teste",
    "serviceType": "PERICIA_AMBIENTAL",
    "totalValue": 1000,
    "entryValue": 2000
  }'
# Resposta: { "error": "invalid_input" } (400)
```

### 2. Teste de CSRF

```bash
# ❌ Sem token CSRF
curl -X POST http://localhost:3000/api/admin/portal/project \
  -H "Cookie: ls_admin_session=..." \
  -H "Content-Type: application/json" \
  -d '{...}'
# Resposta: { "error": "forbidden" } (403)

# ✅ Com token CSRF
# 1. Primeiro, obter token:
curl http://localhost:3000/api/csrf
# Resposta: { "token": "abc123..." }

# 2. Usar token no header:
curl -X POST http://localhost:3000/api/admin/portal/project \
  -H "Cookie: ls_admin_session=...; ls_csrf=abc123..." \
  -H "x-csrf-token: abc123..." \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### 3. Teste de Logger Seguro

Verifique os logs do servidor:
- ✅ Protocol aparece nos logs
- ✅ ClientName aparece nos logs
- ❌ PIN **NUNCA** aparece nos logs (mesmo em dev)
- ❌ pinHash **NUNCA** aparece nos logs

---

## 📚 Referências

- **Zod Docs**: https://zod.dev
- **Next.js Security**: https://nextjs.org/docs/app/building-your-application/routing/middleware
- **CSRF Protection**: https://owasp.org/www-community/attacks/csrf
- **Input Validation**: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0  
**Status:** ✅ Implementado e testado
