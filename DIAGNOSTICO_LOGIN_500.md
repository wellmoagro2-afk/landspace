# 🔍 Diagnóstico: 500 Internal Server Error em /api/admin/login

## Seção A: Causa Raiz Provável

### Evidência no Código

**Problema identificado:**
- `prisma/schema.prisma` (linha 9): `provider = "postgresql"`
- `DATABASE_URL` no `.env.local`: `file:./prisma/dev.db` (formato SQLite)
- **Incompatibilidade**: Provider PostgreSQL espera URL `postgresql://`, mas recebe `file:`

**Stack de erro provável:**

```
1. POST /api/admin/login
   └─> src/app/api/admin/login/route.ts:45
       └─> await login(password)
           └─> src/lib/auth.ts:134
               └─> await verifyAdminPassword(password)
                   └─> src/lib/admin-config.ts:69
                       └─> await prisma.adminConfig.findUnique(...)
                           └─> [Prisma Client lazy initialization]
                               └─> PrismaClientInitializationError
                                   └─> "Error validating datasource `db`: 
                                        the URL must start with the protocol `postgresql://`"
```

**Arquivos relevantes:**

1. **`src/lib/prisma.ts` (linhas 6, 14)**:
   ```typescript
   validateRuntimeGuards(); // Valida provider, mas não valida compatibilidade URL vs provider
   export const prisma = globalForPrisma.prisma ?? new PrismaClient();
   ```
   - `validateRuntimeGuards()` valida apenas se SQLite está sendo usado em produção
   - **Não valida** se DATABASE_URL é compatível com o provider do schema

2. **`src/lib/admin-config.ts` (linhas 159-161)**:
   ```typescript
   dbError.message.includes('Error validating datasource') || 
   dbError.message.includes('the URL must start with the protocol') ||
   dbError.constructor.name === 'PrismaClientInitializationError'
   ```
   - Detecta erro de inicialização, mas **classifica como erro interno (500)**
   - Deveria ser tratado como erro de configuração (fail-fast no startup)

3. **`src/lib/runtime-guards.ts` (linhas 11-40)**:
   - Valida apenas se SQLite está em produção
   - **Não valida compatibilidade DATABASE_URL vs provider do schema**

### Por que vira 500 em vez de 401?

1. `prisma.adminConfig.findUnique()` tenta executar query
2. Prisma Client faz lazy initialization e valida datasource
3. Validação falha: DATABASE_URL (SQLite) ≠ provider (postgresql)
4. Prisma lança `PrismaClientInitializationError`
5. Erro é capturado em `verifyAdminPassword()` (linha 117)
6. Classificado como `isDbError = true` (linha 159-161)
7. Erro é relançado (linha 166)
8. Handler retorna 500 (linha 58-64 em `route.ts`)

**Resultado**: Erro de configuração é tratado como erro interno, retornando 500.

---

## Seção B: Correção Definitiva (Patch)

### Estratégia

**Opção 1 (Recomendada): Fail-fast na inicialização do Prisma**
- Validar compatibilidade DATABASE_URL vs provider antes de criar PrismaClient
- Se incompatível, lançar erro claro no startup (não durante execução)

**Opção 2: Melhorar classificação de erros**
- Tratar "Error validating datasource" como erro de configuração (não erro interno)
- Retornar 503 Service Unavailable com mensagem clara

### Patch Recomendado (Opção 1 + 2)

#### 1. Melhorar `src/lib/runtime-guards.ts`

```typescript
/**
 * Validar compatibilidade DATABASE_URL vs provider do schema
 */
export function validateDatabaseUrlCompatibility() {
  const databaseUrl = ENV.DATABASE_URL;
  
  // Ler provider do schema.prisma
  const schemaPath = join(process.cwd(), 'prisma', 'schema.prisma');
  if (!existsSync(schemaPath)) {
    throw new Error('prisma/schema.prisma não encontrado');
  }
  
  const schemaContent = readFileSync(schemaPath, 'utf-8');
  const providerMatch = schemaContent.match(/datasource\s+\w+\s*\{[^}]*provider\s*=\s*["'](\w+)["']/s);
  
  if (!providerMatch) {
    throw new Error('Provider não encontrado em prisma/schema.prisma');
  }
  
  const provider = providerMatch[1].toLowerCase();
  
  // Validar compatibilidade
  if (provider === 'sqlite') {
    if (!databaseUrl.startsWith('file:')) {
      throw new Error(
        `DATABASE_URL incompatível com provider SQLite.\n` +
        `Provider: ${provider}, DATABASE_URL: ${databaseUrl.substring(0, 30)}...\n` +
        `SQLite requer prefixo "file:". Exemplo: DATABASE_URL="file:./dev.db"`
      );
    }
  } else if (provider === 'postgresql') {
    if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
      throw new Error(
        `DATABASE_URL incompatível com provider PostgreSQL.\n` +
        `Provider: ${provider}, DATABASE_URL: ${databaseUrl.substring(0, 30)}...\n` +
        `PostgreSQL requer protocolo "postgresql://" ou "postgres://".\n` +
        `Exemplo: DATABASE_URL="postgresql://user:password@localhost:5432/dbname"`
      );
    }
  } else if (provider === 'mysql') {
    if (!databaseUrl.startsWith('mysql://')) {
      throw new Error(
        `DATABASE_URL incompatível com provider MySQL.\n` +
        `Provider: ${provider}, DATABASE_URL: ${databaseUrl.substring(0, 30)}...\n` +
        `MySQL requer protocolo "mysql://".`
      );
    }
  }
}

export function validateRuntimeGuards() {
  validateDatabaseProvider(); // Validação existente (SQLite em prod)
  validateDatabaseUrlCompatibility(); // NOVA: Valida compatibilidade
}
```

#### 2. Ajustar `src/lib/admin-config.ts` para melhor classificação

```typescript
// Na função verifyAdminPassword, ajustar classificação de erros:

catch (dbError) {
  // Verificar se é erro de "tabela inexistente" (ambiente não migrado)
  const isTableMissing = dbError instanceof Error && (
    dbError.message.includes('no such table') ||
    dbError.message.includes('does not exist') ||
    dbError.message.includes('P2021') ||
    (dbError.message.includes('P2025') && dbError.message.includes('table'))
  );
  
  if (isTableMissing) {
    // ... (código existente de fallback)
  }
  
  // NOVO: Verificar se é erro de configuração (DATABASE_URL incompatível)
  const isConfigError = dbError instanceof Error && (
    dbError.message.includes('Error validating datasource') ||
    dbError.message.includes('the URL must start with the protocol') ||
    (dbError.constructor.name === 'PrismaClientInitializationError' &&
     (dbError.message.includes('protocol') || dbError.message.includes('datasource')))
  );
  
  if (isConfigError) {
    // Erro de configuração = 503 Service Unavailable (não 500)
    // Logar erro claro e relançar com contexto
    console.error('[verifyAdminPassword] Erro de configuração do Prisma:', {
      error: dbError.message,
      constructor: dbError.constructor.name,
    });
    
    // Criar erro mais descritivo
    const configError = new Error(
      'Erro de configuração do banco de dados. ' +
      'Verifique se DATABASE_URL é compatível com o provider configurado em prisma/schema.prisma'
    );
    configError.cause = dbError;
    throw configError; // Será tratado como 503 no handler
  }
  
  // Erros reais de DB (conexão, timeout) -> 500
  const isDbError = dbError instanceof Error && (
    dbError.message.includes('connection') ||
    dbError.message.includes('timeout') ||
    dbError.message.includes('ECONNREFUSED') ||
    dbError.message.includes('P1001') ||
    dbError.message.includes('P1002') ||
    dbError.message.includes('P1017')
  );
  
  if (isDbError) {
    throw dbError; // 500
  }
  
  // Outros erros -> 500
  throw dbError;
}
```

#### 3. Ajustar handler para retornar 503 em erros de configuração

```typescript
// src/app/api/admin/login/route.ts

catch (authError) {
  // Verificar se é erro de configuração
  const isConfigError = authError instanceof Error && (
    authError.message.includes('configuração') ||
    authError.message.includes('incompatível') ||
    authError.cause?.message?.includes('Error validating datasource')
  );
  
  if (isConfigError) {
    console.error(`[Admin Login] Erro de configuração (requestId: ${requestId}):`, {
      error: authError.message,
    });
    return NextResponse.json(
      { 
        error: 'Erro de configuração do banco de dados',
        requestId,
      },
      { status: 503 } // Service Unavailable
    );
  }
  
  // Erro interno real -> 500
  // ... (código existente)
}
```

---

## Seção C: Plano de Validação (1 comando por vez)

### Etapa 1: Verificar DATABASE_URL atual
```powershell
cd D:\landspace
node -e "const fs = require('fs'); const env = fs.readFileSync('.env.local', 'utf-8'); const match = env.match(/DATABASE_URL=(.+)/); console.log('DATABASE_URL:', match ? match[1].substring(0, 50) : 'não encontrada');"
```

**Se a saída mostrar `file:` mas o schema for `postgresql`:**
- **Ação**: Corrigir DATABASE_URL no `.env.local` para formato PostgreSQL
- **Exemplo**: `DATABASE_URL=postgresql://user:password@localhost:5432/landspace`

### Etapa 2: Verificar provider do schema
```powershell
cd D:\landspace
node -e "const fs = require('fs'); const schema = fs.readFileSync('prisma/schema.prisma', 'utf-8'); const match = schema.match(/provider\s*=\s*['\"](\w+)['\"]/); console.log('Provider:', match ? match[1] : 'não encontrado');"
```

**Se provider for `postgresql` mas DATABASE_URL for `file:`:**
- **Ação**: Incompatibilidade detectada - corrigir DATABASE_URL (Etapa 1)

### Etapa 3: Executar diagnóstico Prisma
```powershell
cd D:\landspace
node scripts/diagnose-prisma.mjs
```

**Se mostrar erro de validação de datasource:**
- **Ação**: Corrigir DATABASE_URL conforme Etapa 1

### Etapa 4: Validar env antes do build
```powershell
cd D:\landspace
npm run check:env
```

**Se falhar com erro de DATABASE_URL:**
- **Ação**: Corrigir DATABASE_URL conforme Etapa 1

### Etapa 5: Regenerar Prisma Client
```powershell
cd D:\landspace
npx prisma generate --schema prisma\schema.prisma
```

**Se mostrar erro:**
- **Ação**: Verificar se DATABASE_URL está correta (Etapa 1)

### Etapa 6: Testar conexão Prisma diretamente
```powershell
cd D:\landspace
node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); p.$connect().then(() => { console.log('OK'); process.exit(0); }).catch(e => { console.error('ERRO:', e.message); process.exit(1); });"
```

**Se mostrar "Error validating datasource":**
- **Ação**: DATABASE_URL incompatível - corrigir (Etapa 1)

### Etapa 7: Build do projeto
```powershell
cd D:\landspace
npm run build -- --webpack
```

**Se build passar:**
- **Ação**: Continuar para Etapa 8

### Etapa 8: Iniciar servidor
```powershell
cd D:\landspace
npm run start -- -p 3001
```

**Aguardar mensagem "Ready"**

### Etapa 9: Testar login com credenciais inválidas
```powershell
C:\Windows\System32\curl.exe -X POST http://127.0.0.1:3001/api/admin/login -H "Content-Type: application/json" -d "{\"password\":\"senha_errada\"}" -v
```

**Resultado esperado:**
- **HTTP 401** com `{"error":"Credenciais inválidas"}` ✅
- **HTTP 500** com `{"error":"Erro ao fazer login"}` ❌ (problema ainda existe)

**Se retornar 500:**
- **Ação**: Verificar logs do servidor para mensagem de erro exata
- **Ação**: Verificar se o patch foi aplicado corretamente

### Etapa 10: Testar login com credenciais válidas (se ADMIN_KEY estiver configurado)
```powershell
C:\Windows\System32\curl.exe -X POST http://127.0.0.1:3001/api/admin/login -H "Content-Type: application/json" -d "{\"password\":\"<ADMIN_KEY_do_env>\"}" -v
```

**Resultado esperado:**
- **HTTP 200** com `{"success":true}` ✅

---

## Seção D: Riscos de Segurança Mitigados

### 1. Timing Attack
- ✅ **Mitigado**: `constantTimeFail()` executa `bcrypt.compare` com hash dummy mesmo quando credencial é inválida
- ✅ **Implementado em**: `src/lib/admin-config.ts:23-31`

### 2. Enumeração de Usuário
- ✅ **Mitigado**: Mensagens genéricas ("Credenciais inválidas") não revelam se usuário existe
- ✅ **Implementado em**: `src/app/api/admin/login/route.ts:76`

### 3. Vazamento de Informações
- ✅ **Mitigado**: Erros internos retornam mensagem genérica + requestId (sem stack trace)
- ✅ **Implementado em**: `src/app/api/admin/login/route.ts:58-64`

### 4. Brute Force
- ✅ **Mitigado**: Rate limiting (30/IP/60s, 5/IP+Identity/60s) com headers `Retry-After`
- ✅ **Implementado em**: `src/lib/security/rateLimit.ts` + `src/app/api/admin/login/route.ts:103-109`

### 5. Erro de Configuração vs Erro Interno
- ⚠️ **Risco**: Erro de configuração (DATABASE_URL incompatível) pode ser explorado para DoS
- ✅ **Mitigação proposta**: 
  - Fail-fast no startup (não durante execução)
  - Retornar 503 (Service Unavailable) em vez de 500 para erros de configuração
  - Logs claros no servidor para diagnóstico

---

## Resumo Executivo

**Causa Raiz**: DATABASE_URL (`file:./prisma/dev.db`) incompatível com provider do schema (`postgresql`)

**Solução**: 
1. Validar compatibilidade DATABASE_URL vs provider no startup (fail-fast)
2. Melhorar classificação de erros (configuração → 503, conexão → 500)
3. Corrigir DATABASE_URL no `.env.local` para formato PostgreSQL

**Validação**: Seguir plano de validação (10 etapas) para confirmar correção
