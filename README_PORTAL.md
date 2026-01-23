# Portal do Cliente - LandSpace Studio

MVP do Portal do Cliente implementado dentro do LandSpace Studio, pronto para evoluir para automação Pix/Boleto Banco do Brasil.

## 🔧 Variáveis de Ambiente

**Obrigatórias:**

```env
# Sessão JWT
SESSION_SECRET=seu-secret-aqui-min-32-chars

# Admin Key
ADMIN_KEY=sua-chave-admin-aqui

# Banco de Dados
DATABASE_URL="file:./prisma/dev.db"  # SQLite (dev)
# DATABASE_URL="postgresql://user:pass@host:5432/db"  # Postgres (prod)
```

**Opcionais (Enterprise):**

```env
# Redis (para rate limiting persistente)
REDIS_URL=redis://localhost:6379

# ClamAV (para scan de vírus)
CLAMAV_ENABLED=true
CLAMAV_SOCKET=/var/run/clamav/clamd.ctl
```

## 🚀 Setup Inicial

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Gerar Prisma Client:**
   ```bash
   npm run db:generate
   ```

3. **Aplicar schema ao banco:**
   ```bash
   npm run db:push
   # ou para migrations:
   npm run db:migrate
   ```

4. **Criar projeto demo (opcional):**
   ```bash
   npm run db:seed
   ```
   
   Credenciais do projeto demo:
   - Protocolo: `LS-2026-XXXXXX` (gerado automaticamente)
   - PIN: `123456`

## 📋 Rotas

### Portal do Cliente
- `/studio/portal` - Login
- `/studio/portal/[protocol]` - Dashboard do projeto
- `/studio/portal/[protocol]/files` - Arquivos do projeto

### Admin
- `/studio/admin/login` - Login admin
- `/studio/admin` - Dashboard de projetos
- `/studio/admin/project/new` - Criar novo projeto
- `/studio/admin/project/[id]` - Editar projeto

## 🔐 Autenticação

- **Portal**: Cookie httpOnly `ls_portal_session` com JWT (protocol, exp, nonce)
- **Admin**: Cookie httpOnly `ls_admin_session` com JWT (authenticated, exp, nonce)
- Validação de expiração no middleware
- Protocolo validado na rota (portal só acessa seu próprio projeto)

## 💰 Valores Monetários

- Usa `Decimal` do Prisma (não Float)
- Serializado como `number` nas APIs (2 casas decimais)
- Recalculado sempre no backend (não confiar no front)

## 📁 Uploads

- Salvos em `/uploads/portal/{protocol}/` (fora de `/public`)
- Servidos apenas via `/api/portal/files/[id]/download` (streaming)
- `storagePath` nunca exposto no front

## 🔒 Regras de Liberação

### Preview
- Liberado quando `paidValue >= entryValue`

### Final
- Liberado quando:
  - `balanceValue == 0` AND
  - `finalRelease == true` AND
  - `status >= FINAL_PRONTO`

## 📊 Steps

- Criados automaticamente ao criar projeto (12 steps padrão)
- `AJUSTES` é opcional (pode ficar PENDING sem bloquear final)
- Progresso = `DONE / total` (excluindo AJUSTES se não usado)

## 🗄️ Banco de Dados

### Models
- `Project`: Projeto do cliente
- `ProjectStep`: Steps do projeto
- `ProjectFile`: Arquivos (Preview/Final)
- `Payment`: Pagamentos

### Compatibilidade
- **Dev**: SQLite (`file:./prisma/dev.db`)
- **Prod**: Postgres (configurar `DATABASE_URL`)

## 🔄 Próximos Passos (Fase 2)

- [ ] Integração Banco do Brasil (Pix/Boleto)
- [ ] Webhook para confirmação automática
- [ ] Upload de comprovante pelo cliente
- [ ] Notificações por email

## 🏢 Enterprise Baseline

### Rate Limiting
- **Redis (opcional)**: Configure `REDIS_URL` para rate limiting persistente
- **Fallback**: Sistema funciona sem Redis usando in-memory (dev)
- **Aplicado em**: Login portal e admin (5 tentativas / 15 min)

### Observabilidade
- **Request ID**: Cada request recebe `x-request-id` único
- **Logs JSON**: Em produção, logs estruturados em JSON
- **Header**: `x-request-id` incluído em todas as respostas

### Auditoria
- **Model**: `AuditLog` no Prisma
- **Eventos registrados**: Login, logout, downloads, uploads, pagamentos, liberações
- **UI Admin**: `/studio/admin/audit` para consultar logs
- **API**: `GET /api/admin/portal/audit?action=...&protocol=...`

### Limpeza de Uploads
- **Retenção**: 12 meses após encerramento do projeto
- **Endpoint**: `POST /api/admin/portal/cleanup` (executa limpeza)
- **Stats**: `GET /api/admin/portal/cleanup` (estatísticas)
- **Cron**: Configurar job periódico (ex: semanal)

### Scan de Vírus
- **ClamAV (opcional)**: Configure `CLAMAV_ENABLED=true`
- **Fallback**: Se não disponível, arquivos são aceitos (MVP)
- **Aplicado em**: Upload de arquivos (admin)

### Entry Points
- **Studio**: Seção "Acesso" com botão "Área do Cliente"
- **Header Global**: Link "Portal" (ícone de usuário)
- **Admin**: Link visível apenas em dev (`NODE_ENV !== 'production'`)

## 📋 Consultar AuditLog

```bash
# Via API
GET /api/admin/portal/audit?action=portal_login_success&protocol=LS-2026-000123

# Via UI
/studio/admin/audit
```

## 🧹 Executar Cleanup

```bash
# Via API (requer admin session)
POST /api/admin/portal/cleanup

# Via script (futuro)
npm run cleanup:uploads
```
