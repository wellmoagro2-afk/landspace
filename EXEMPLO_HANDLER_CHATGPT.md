# Exemplo Handler Mutável - Segurança Crítica (Para ChatGPT)

## Handler Completo com Zod + Logger + CSRF

```typescript
// src/app/api/admin/portal/project/route.ts
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
 * SEGURANÇA:
 * ✅ CSRF: Validado no middleware (x-csrf-token + ls_csrf cookie)
 * ✅ Auth: Sessão admin via cookie httpOnly
 * ✅ Zod: Validação estrita de input
 * ✅ Logger: PIN nunca logado
 * ✅ Auditoria: Evento registrado
 */
export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    // 1. AUTENTICAÇÃO
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'Não autorizado' }, { status: 401 }),
        requestId
      );
    }

    // 2. VALIDAÇÃO ZOD
    const body = await request.json().catch(() => null);
    if (!body) {
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      logStructured('warn', 'Admin Create Project: validação falhou', {
        requestId,
        errors: validation.error.errors, // Apenas em logs
      });
      return addRequestIdHeader(
        NextResponse.json({ error: 'invalid_input' }, { status: 400 }),
        requestId
      );
    }

    const { clientName, clientEmail, clientPhone, serviceType, totalValue, entryValue } = validation.data;

    // 3. LÓGICA
    const protocol = generateProtocol().toUpperCase().trim();
    const pin = generatePin();
    const pinHash = await hashPin(pin);

    // 4. LOGGER SEGURO (PIN nunca logado)
    logStructured('info', 'Admin Create Project: protocol gerado', {
      requestId,
      protocol,
      // PIN não é logado por segurança
    });

    const project = await prisma.project.create({
      data: {
        protocol,
        pinHash,
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

    await createDefaultSteps(project.id);

    // 5. AUDITORIA
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
        // PIN nunca em metadata
      },
      success: true,
    });

    // 6. RESPOSTA
    return addRequestIdHeader(
      NextResponse.json({
        success: true,
        project: {
          id: project.id,
          protocol: project.protocol,
          pin, // Retornado apenas na criação
        },
      }),
      requestId
    );
  } catch (error) {
    logStructured('error', 'Admin project create: erro', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown',
    });

    return addRequestIdHeader(
      NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 }),
      requestId
    );
  }
}
```

## Schema Zod Correspondente

```typescript
// src/lib/schemas/admin.ts
import { z } from 'zod';

export const createProjectSchema = z.object({
  clientName: z.string().trim().min(1).max(255),
  clientEmail: z.string().email().optional().or(z.literal('')),
  clientPhone: z.string().trim().max(50).optional().or(z.literal('')),
  serviceType: z.enum([
    'PERICIA_EVIDENCIAS',
    'PERICIA_AMBIENTAL',
    'AVALIACAO_RURAL',
    'CAR',
    'GEOREF',
    'OUTROS',
  ]),
  totalValue: z.number().positive().or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) throw new Error('Valor inválido');
    return num;
  })),
  entryValue: z.number().nonnegative().or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) throw new Error('Valor inválido');
    return num;
  })),
}).refine(data => data.entryValue <= data.totalValue, {
  message: 'Valor de entrada não pode ser maior que valor total',
  path: ['entryValue'],
});
```

## Proteção CSRF (Middleware)

```typescript
// src/middleware.ts (trecho relevante)
if (pathname.startsWith('/api/admin/portal')) {
  // Validar CSRF para métodos mutáveis
  const csrfCheck = validateCSRF(request);
  if (csrfCheck) {
    return NextResponse.json({ error: 'forbidden' }, { status: csrfCheck.status });
  }
  // ... continua validação de sessão ...
}
```

## Checklist de Segurança Aplicada

- ✅ **CSRF**: Token validado no middleware antes do handler
- ✅ **Zod**: Input validado e sanitizado (trim, max, email, enum, refine)
- ✅ **Logger**: PIN/senha nunca logados (apenas protocol/metadados)
- ✅ **Auditoria**: Evento registrado no AuditLog
- ✅ **Request ID**: Incluído em todas as respostas
- ✅ **Erros Genéricos**: Não expõe detalhes internos
- ✅ **Cookie Seguro**: httpOnly, secure (prod), sameSite strict

## Teste Rápido

```bash
# 1. Obter CSRF token
curl http://localhost:3000/api/csrf
# Resposta: { "token": "abc123..." }

# 2. Criar projeto (com CSRF)
curl -X POST http://localhost:3000/api/admin/portal/project \
  -H "Cookie: ls_admin_session=...; ls_csrf=abc123..." \
  -H "x-csrf-token: abc123..." \
  -H "Content-Type: application/json" \
  -d '{"clientName":"Teste","serviceType":"PERICIA_AMBIENTAL","totalValue":10000,"entryValue":3000}'
```
