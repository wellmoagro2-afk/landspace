# 🗄️ PostgreSQL Gerenciado + Vercel - Guia Completo

Este guia explica como configurar PostgreSQL gerenciado (Neon, Supabase, etc.) para funcionar tanto em desenvolvimento local (Windows) quanto em produção na Vercel.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Obter Connection String](#obter-connection-string)
3. [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
4. [DATABASE_URL vs DIRECT_URL](#database_url-vs-direct_url)
5. [Migrations e Deploy](#migrations-e-deploy)
6. [Validação e Troubleshooting](#validação-e-troubleshooting)
7. [Checklist de Validação](#checklist-de-validação)

---

## Visão Geral

### Arquitetura

```
┌─────────────────┐         ┌──────────────────┐
│  Dev Local      │         │  Vercel (Prod)   │
│  (Windows)      │         │                  │
│                 │         │                  │
│  .env.local     │         │  Env Variables  │
│  └─> Neon DB    │─────────┼─> Neon DB        │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
```

**Benefícios:**
- ✅ Dev local funciona sem instalar PostgreSQL
- ✅ Mesmo banco em dev e prod (ou separados, conforme necessidade)
- ✅ Migrations centralizadas
- ✅ SSL automático (gerenciado pelo provider)

---

## Obter Connection String

### Opção 1: Neon (Recomendado)

1. Acesse [https://neon.tech](https://neon.tech)
2. Crie uma conta (gratuita)
3. Crie um novo projeto
4. Na dashboard, copie a **Connection String**:
   ```
   postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

**Nota:** Neon fornece automaticamente:
- `DATABASE_URL` (com connection pooling)
- `DIRECT_URL` (conexão direta para migrations)

### Opção 2: Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie um projeto
3. Vá em **Settings > Database**
4. Copie a **Connection String** (URI mode):
   ```
   postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres?sslmode=require
   ```

### Opção 3: Outro PostgreSQL Gerenciado

Qualquer provider que ofereça PostgreSQL (AWS RDS, Railway, Render, etc.) funciona. Formato geral:

```
postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

**Parâmetros importantes:**
- `sslmode=require` - Obrigatório para conexões seguras
- `?connection_limit=1` - Útil para serverless (Vercel)
- `?pgbouncer=true` - Se usar connection pooling (Neon)

---

## Configuração de Variáveis de Ambiente

### Desenvolvimento Local (.env.local)

Crie/edite `D:\landspace\.env.local`:

```env
# PostgreSQL Gerenciado (Neon/Supabase/etc)
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Secrets (obrigatórios)
SESSION_SECRET=sua_chave_secreta_de_sessao_aqui_min_32_chars
PREVIEW_SECRET=sua_chave_preview_aqui_min_32_chars

# Admin (opcional, apenas para dev)
ADMIN_KEY=sua_chave_admin_aqui_min_24_chars

# Outros (opcionais)
DRAFT_MODE_SECRET=sua_chave_draft_mode_aqui_min_32_chars
REDIS_URL=redis://localhost:6379
```

**Importante:**
- ✅ Nunca commite `.env.local` (já está no `.gitignore`)
- ✅ Use valores reais (não placeholders)
- ✅ `DATABASE_URL` e `DIRECT_URL` podem ser iguais se o provider não separar pooling

### Produção (Vercel)

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings > Environment Variables**
4. Adicione as variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `DATABASE_URL` | `postgresql://...` | Production, Preview, Development |
| `DIRECT_URL` | `postgresql://...` | Production, Preview, Development |
| `SESSION_SECRET` | `...` (32+ chars) | Production, Preview, Development |
| `PREVIEW_SECRET` | `...` (32+ chars) | Production, Preview, Development |
| `ADMIN_KEY` | `...` (24+ chars) | Production, Preview (opcional) |
| `DRAFT_MODE_SECRET` | `...` (32+ chars) | Production, Preview (opcional) |

**Nota:** Vercel aplica variáveis automaticamente em todos os ambientes. Se quiser separar dev/prod, use **Production** apenas para produção.

---

## DATABASE_URL vs DIRECT_URL

### DATABASE_URL

- **Uso:** Conexões de runtime (queries durante execução)
- **Características:**
  - Pode usar connection pooling (PgBouncer, Neon Pooler)
  - Otimizado para serverless (Vercel)
  - Limite de conexões compartilhado

**Exemplo (Neon com pooling):**
```
postgresql://user:password@ep-xxx-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
```

### DIRECT_URL

- **Uso:** Migrations e operações administrativas
- **Características:**
  - Conexão direta ao banco (sem pooling)
  - Necessário para `prisma migrate deploy`
  - Usado apenas durante migrations

**Exemplo (Neon direto):**
```
postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

### Quando são diferentes?

- **Neon:** Fornece URLs separadas (pooler vs direto)
- **Supabase:** Geralmente são iguais
- **Outros:** Depende do provider

**Regra:** Se o provider não separar, use a mesma URL em ambos.

---

## Migrations e Deploy

### ⚠️ Regra Crítica: NÃO rodar migrations em runtime

**Nunca faça:**
```typescript
// ❌ ERRADO - NUNCA faça isso em um endpoint
await prisma.$executeRaw`CREATE TABLE ...`;
```

**Sempre use:**
```bash
# ✅ CORRETO - Comando manual/CI
npm run db:migrate:deploy
```

### Workflow Recomendado

#### Desenvolvimento Local

1. **Gerar Prisma Client:**
   ```bash
   npm run db:generate
   ```

2. **Verificar conexão:**
   ```bash
   npm run db:check
   ```

3. **Criar nova migration (se necessário):**
   ```bash
   npm run db:migrate
   ```
   - Isso cria migration em `prisma/migrations/`
   - **NÃO** aplica automaticamente em produção

4. **Aplicar migrations localmente:**
   ```bash
   npm run db:migrate:deploy
   ```

#### Produção (Vercel)

**Opção A: Manual (Recomendado para início)**

1. Após deploy na Vercel, execute localmente:
   ```bash
   npm run db:migrate:deploy
   ```
   - Isso aplica migrations pendentes no banco de produção

**Opção B: Integrar no Build (Avançado)**

⚠️ **Riscos:**
- Se migration falhar, o deploy pode quebrar
- Rollback é manual (reverter commit + redeploy)

**Como fazer:**

1. Criar script `scripts/vercel-migrate.mjs`:
   ```javascript
   import { execSync } from 'child_process';
   
   if (process.env.VERCEL_ENV === 'production') {
     try {
       execSync('npx prisma migrate deploy --schema prisma/schema.prisma', {
         stdio: 'inherit',
       });
     } catch (error) {
       console.error('Migration failed:', error);
       process.exit(1);
     }
   }
   ```

2. Adicionar em `package.json`:
   ```json
   {
     "scripts": {
       "vercel-build": "npm run db:generate && node scripts/vercel-migrate.mjs && next build"
     }
   }
   ```

3. **Rollback (se necessário):**
   - Reverter commit que introduziu a migration problemática
   - Fazer novo deploy
   - Corrigir migration manualmente no banco (se necessário)

**Recomendação:** Use Opção A até ter confiança no processo.

---

## Validação e Troubleshooting

### Comandos de Diagnóstico

#### 1. Verificar conexão
```bash
npm run db:check
```

**Saída esperada:**
```
✅ Prisma Client criado
✅ Conexão estabelecida
✅ Query executada com sucesso
✅ Tabela AdminConfig acessível
```

#### 2. Verificar variáveis de ambiente
```bash
npm run check:env
```

**Saída esperada:**
```
✅ Variáveis de ambiente validadas com sucesso!
📋 Variáveis configuradas:
   - SESSION_SECRET: ✅
   - DATABASE_URL: ✅ (provider: postgresql)
   - PREVIEW_SECRET: ✅
```

### Erros Comuns

#### Erro: "Can't reach database server"

**Causa:** DATABASE_URL incorreta ou banco offline

**Solução:**
1. Verificar se a connection string está correta
2. Verificar se o banco está ativo (dashboard do provider)
3. Testar conexão: `npm run db:check`

#### Erro: "Error validating datasource"

**Causa:** DATABASE_URL incompatível com provider do schema

**Solução:**
1. Verificar `prisma/schema.prisma` (deve ser `provider = "postgresql"`)
2. Verificar se DATABASE_URL começa com `postgresql://`
3. Executar: `npm run check:env`

#### Erro: "P1001" (Connection error)

**Causa:** Timeout ou banco inacessível

**Solução:**
1. Verificar firewall/whitelist do provider (adicionar IP se necessário)
2. Verificar se `sslmode=require` está na URL
3. Testar com `DIRECT_URL` se `DATABASE_URL` usar pooling

#### Erro: "Table does not exist" (P2021)

**Causa:** Migrations não foram aplicadas

**Solução:**
```bash
npm run db:migrate:deploy
```

---

## Checklist de Validação

Execute os comandos abaixo **um por vez**, na ordem apresentada.

### Etapa 1: Verificar .env.local existe
```cmd
cd D:\landspace
if exist .env.local (echo .env.local existe) else (echo .env.local NAO existe - crie primeiro)
```

**Se não existir:**
- Copie `.env.example` para `.env.local`
- Preencha com valores reais

### Etapa 2: Verificar DATABASE_URL está configurada
```cmd
cd D:\landspace
node -e "const fs = require('fs'); const env = fs.readFileSync('.env.local', 'utf-8'); const match = env.match(/DATABASE_URL=(.+)/); if (match) { console.log('DATABASE_URL:', match[1].substring(0, 50) + '...'); } else { console.log('DATABASE_URL nao encontrada'); process.exit(1); }"
```

**Resultado esperado:**
- Mostra início da URL (sem senha completa)
- Se não encontrar, adicione `DATABASE_URL=...` no `.env.local`

### Etapa 3: Verificar DIRECT_URL está configurada
```cmd
cd D:\landspace
node -e "const fs = require('fs'); const env = fs.readFileSync('.env.local', 'utf-8'); const match = env.match(/DIRECT_URL=(.+)/); if (match) { console.log('DIRECT_URL:', match[1].substring(0, 50) + '...'); } else { console.log('DIRECT_URL nao encontrada (pode ser igual a DATABASE_URL)'); }"
```

**Resultado esperado:**
- Mostra início da URL ou aviso se não existir
- Se não existir, adicione `DIRECT_URL=<mesma URL de DATABASE_URL>` no `.env.local`

### Etapa 4: Validar variáveis de ambiente
```cmd
cd D:\landspace
npm run check:env
```

**Resultado esperado:**
- ✅ Todas as variáveis obrigatórias validadas
- Se falhar, corrija conforme mensagens de erro

### Etapa 5: Gerar Prisma Client
```cmd
cd D:\landspace
npm run db:generate
```

**Resultado esperado:**
- `✔ Generated Prisma Client`
- Se falhar, verifique `prisma/schema.prisma`

### Etapa 6: Verificar conexão com banco
```cmd
cd D:\landspace
npm run db:check
```

**Resultado esperado:**
- ✅ Conexão estabelecida
- ✅ Query executada com sucesso
- Se falhar, verifique DATABASE_URL e se o banco está ativo

### Etapa 7: Aplicar migrations (se necessário)
```cmd
cd D:\landspace
npm run db:migrate:deploy
```

**Resultado esperado:**
- `✔ Applied migration: ...`
- Se não houver migrations pendentes: `No pending migrations`

### Etapa 8: Iniciar servidor de desenvolvimento
```cmd
cd D:\landspace
npm run dev:3001
```

**Resultado esperado:**
- Servidor inicia na porta 3001
- Sem erros de conexão no console

### Etapa 9: Testar endpoint de health
```cmd
C:\Windows\System32\curl.exe http://127.0.0.1:3001/api/health
```

**Resultado esperado:**
- HTTP 200 com `{"ok":true,"status":"ok","ts":...}`

### Etapa 10: Testar login com credenciais inválidas
```cmd
C:\Windows\System32\curl.exe -X POST http://127.0.0.1:3001/api/admin/login -H "Content-Type: application/json" -d "{\"password\":\"senha_errada\"}" -v
```

**Resultado esperado:**
- HTTP 401 com `{"error":"Credenciais inválidas","requestId":"..."}`
- Header `x-request-id` presente

### Etapa 11: Testar login com credenciais válidas (se ADMIN_KEY configurado)
```cmd
C:\Windows\System32\curl.exe -X POST http://127.0.0.1:3001/api/admin/login -H "Content-Type: application/json" -d "{\"password\":\"<ADMIN_KEY_do_env>\"}" -v
```

**Resultado esperado:**
- HTTP 200 com `{"success":true}`
- Cookie `ls_admin_session` presente

---

## Próximos Passos

Após validar localmente:

1. **Configurar variáveis na Vercel:**
   - Acesse Vercel Dashboard > Settings > Environment Variables
   - Adicione `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET`, etc.

2. **Fazer deploy:**
   ```bash
   git push origin main
   ```
   - Vercel fará build e deploy automaticamente

3. **Aplicar migrations em produção:**
   ```bash
   npm run db:migrate:deploy
   ```
   - Isso aplica no banco de produção (usando `DIRECT_URL`)

4. **Validar produção:**
   - Teste `/api/health` na URL de produção
   - Teste `/api/admin/login` com credenciais válidas

---

## Referências

- [Prisma + Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Neon Documentation](https://neon.tech/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
