# 📊 Relatório Completo: Portal do Cliente e Portal Admin

**Data:** Janeiro 2025  
**Projeto:** LandSpace  
**Versão:** 1.0

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Portal do Cliente](#portal-do-cliente)
3. [Portal Admin](#portal-admin)
4. [APIs e Endpoints](#apis-e-endpoints)
5. [Segurança e Autenticação](#segurança-e-autenticação)
6. [Estrutura de Arquivos](#estrutura-de-arquivos)
7. [Funcionalidades Detalhadas](#funcionalidades-detalhadas)

---

## 🎯 Visão Geral

O sistema possui dois portais principais:

1. **Portal do Cliente** (`/studio/portal`): Interface para clientes acessarem seus projetos
2. **Portal Admin** (`/studio/admin`): Interface administrativa para gerenciar projetos

Ambos os portais utilizam autenticação baseada em JWT com cookies httpOnly, rate limiting, auditoria completa e proteções de segurança de nível Big Tech.

---

## 👤 Portal do Cliente

### 📍 Localização dos Arquivos

#### Frontend (Páginas)
- **Login:** `src/app/studio/portal/page.tsx`
- **Dashboard do Projeto:** `src/app/studio/portal/[protocol]/page.tsx`
- **Arquivos do Projeto:** `src/app/studio/portal/[protocol]/files/page.tsx`

#### Backend (APIs)
- **Login:** `src/app/api/portal/login/route.ts`
- **Logout:** `src/app/api/portal/logout/route.ts`
- **Dados do Projeto:** `src/app/api/portal/project/[protocol]/route.ts`
- **Steps do Projeto:** `src/app/api/portal/project/[protocol]/steps/route.ts`
- **Arquivos do Projeto:** `src/app/api/portal/project/[protocol]/files/route.ts`
- **Download de Arquivo:** `src/app/api/portal/files/[id]/download/route.ts`
- **Test Login:** `src/app/api/portal/test-login/route.ts`

#### Bibliotecas e Utilitários
- **Autenticação:** `src/lib/portal-auth.ts`
- **Utilitários:** `src/lib/portal-utils.ts`
- **Schemas de Validação:** `src/lib/schemas/portal.ts`

---

### 🔐 Autenticação

**Método:** Cookie httpOnly + JWT (HMAC-SHA256)

**Detalhes:**
- **Cookie:** `ls_portal_session` (httpOnly, Secure em produção)
- **Token JWT contém:**
  - `protocol`: Protocolo do projeto (ex: "LS-2026-000123")
  - `exp`: Timestamp Unix de expiração
  - `nonce`: UUID único para prevenir replay attacks
  - `iat`: Timestamp de criação
- **Expiração:** 7 dias
- **PIN:** Hash bcrypt (10 rounds), nunca armazenado em texto puro
- **Validação:** Middleware verifica expiração e protocol na rota

**Fluxo de Login:**
1. Cliente informa Protocolo e PIN (6 dígitos)
2. Sistema normaliza protocolo (trim + uppercase) e PIN (trim)
3. Busca projeto no banco de dados
4. Verifica PIN com bcrypt.compare()
5. Cria sessão JWT e retorna cookie httpOnly
6. Redireciona para dashboard do projeto

**Proteções:**
- Rate limiting: 5 tentativas / 15 minutos por IP + protocol
- Validação de protocolo case-insensitive
- Mensagens de erro específicas (PROTOCOL_NOT_FOUND, INVALID_PIN)
- Logs de auditoria para todas as tentativas de login

---

### 📄 Funcionalidades do Portal do Cliente

#### 1. Login (`/studio/portal`)

**Características:**
- Interface glassmorphism com tema dark
- Validação em tempo real de protocolo e PIN
- Mensagens de erro contextuais:
  - "Protocolo não encontrado" com dica de formato
  - "PIN inválido" com dica de 6 dígitos
- Normalização automática:
  - Protocolo convertido para maiúsculas
  - Espaços removidos automaticamente
- Botão "Voltar" para retornar ao site principal
- Loading state durante autenticação

**Validações:**
- Protocolo obrigatório (mínimo 1 caractere)
- PIN obrigatório (mínimo 1 caractere, máximo 6 dígitos)
- Schema Zod: `portalLoginSchema` em `src/lib/schemas/portal.ts`

---

#### 2. Dashboard do Projeto (`/studio/portal/[protocol]`)

**Informações Exibidas:**

**Cabeçalho:**
- Título: "Portal do Cliente"
- Protocolo do projeto
- Título do projeto (se configurado)
- Botão "Sair" para logout

**Card Principal:**
- Nome do cliente
- Tipo de serviço (formatado)
- Status do projeto (badge colorido)
- Barra de progresso (baseada em steps concluídos)

**Timeline de Steps:**
- Lista de etapas do projeto com estados:
  - ✅ **DONE** (Concluído): Ícone verde CheckCircle2
  - ⏱️ **ACTIVE** (Ativo): Ícone índigo Clock (animado)
  - ⭕ **PENDING** (Pendente): Ícone cinza Circle
- Título e descrição de cada step
- Data de conclusão (se aplicável)
- **Steps filtrados:** PREVIA_ENTREGUE e AJUSTES não são exibidos

**Bloco Financeiro:**
- Valor Total (R$)
- Valor de Entrada (R$)
- Valor Pago (R$) - em verde
- Saldo Pendente (R$) - em vermelho se > 0, verde se = 0
- Botão "Ver Instruções de Pagamento" (se saldo > 0):
  - Exibe alert com informações de pagamento
  - Instruções para contato

**Ações Rápidas:**
- Botão "Ver Arquivos" → `/studio/portal/[protocol]/files`

**Proteções:**
- Verificação de sessão em todas as requisições
- Redirecionamento automático para login se não autenticado
- Validação de protocolo na sessão vs. protocolo na URL

---

#### 3. Página de Arquivos (`/studio/portal/[protocol]/files`)

**Estrutura:**

**Seção: Arquivos do Projeto**
- Badge de status: "Liberado" (verde) ou "Bloqueado" (vermelho)
- Lista de todos os arquivos FINAL (liberados ou bloqueados)

**Para cada arquivo:**
- Ícone de status:
  - ✅ CheckCircle2 (verde) se liberado
  - 🔒 Lock (vermelho) se bloqueado
- Nome do arquivo
- Versão (ex: "Projeto Final R1")
- Data de upload (formato pt-BR)
- Botão de download:
  - Habilitado se `canDownloadFinal()` retorna true
  - Desabilitado se bloqueado
  - Estado de loading durante download

**Regras de Liberação:**

Arquivos são liberados quando **TODAS** as condições são atendidas:

1. ✅ `finalRelease == true` (liberação manual habilitada pelo admin)
2. ✅ Step "FINAL_PRONTO" está "DONE" **OU** Step "REVISAO" está "DONE"
3. ✅ Arquivo não está bloqueado (`isLocked == false`)

**Nota:** O saldo pendente não bloqueia mais a liberação se o admin habilitar `finalRelease`.

**Mensagens:**
- Se bloqueado: "Os arquivos serão liberados após o pagamento completo do saldo e conclusão do step correspondente (Final Pronto ou Revisão)."

**Download:**
- Endpoint: `/api/portal/files/[id]/download`
- Streaming de arquivo
- Validação de permissões antes de servir
- Headers de segurança:
  - `Content-Disposition: attachment`
  - `Cache-Control: no-store, no-cache`
  - `Content-Type` baseado na extensão
- Auditoria completa de downloads

---

### 🔒 Segurança do Portal do Cliente

**Proteções Implementadas:**

1. **Autenticação:**
   - JWT com assinatura HMAC-SHA256
   - Cookie httpOnly (não acessível via JavaScript)
   - Expiração automática (7 dias)
   - Nonce único por sessão

2. **Rate Limiting:**
   - Login: 5 tentativas / 15 minutos (por IP + protocol)
   - Implementado via Redis (se disponível) ou memória

3. **Validação de Acesso:**
   - Middleware verifica protocolo na sessão vs. URL
   - Bloqueio de acesso a projetos de outros protocolos
   - Path traversal protection em downloads

4. **Auditoria:**
   - Logs de todas as ações:
     - Login (sucesso/falha)
     - Logout
     - Visualização de projeto
     - Download de arquivo (sucesso/bloqueado)
   - Campos registrados:
     - Request ID
     - Protocol
     - IP Address
     - User Agent
     - Timestamp
     - Resultado (sucesso/erro)

5. **Proteção de Arquivos:**
   - Validação de path (previne path traversal)
   - Verificação de propriedade (arquivo pertence ao protocolo)
   - Streaming seguro (nunca expõe storagePath)
   - Validação de permissões antes de servir

---

## 👨‍💼 Portal Admin

### 📍 Localização dos Arquivos

#### Frontend (Páginas)
- **Login:** `src/app/studio/admin/login/page.tsx`
- **Dashboard:** `src/app/studio/admin/page.tsx`
- **Novo Projeto:** `src/app/studio/admin/project/new/page.tsx`
- **Detalhes do Projeto:** `src/app/studio/admin/project/[id]/page.tsx`
- **Configurações:** `src/app/studio/admin/settings/page.tsx`
- **Auditoria:** `src/app/studio/admin/audit/page.tsx`

#### Backend (APIs)
- **Login:** `src/app/api/admin/portal/login/route.ts`
- **Logout:** `src/app/api/admin/portal/logout/route.ts`
- **Senha Admin:** `src/app/api/admin/portal/password/route.ts`
- **Listar Projetos:** `src/app/api/admin/portal/projects/route.ts`
- **Criar Projeto:** `src/app/api/admin/portal/project/route.ts` (POST)
- **Buscar Projeto:** `src/app/api/admin/portal/project/[id]/route.ts` (GET)
- **Atualizar Projeto:** `src/app/api/admin/portal/project/[id]/route.ts` (PATCH)
- **Excluir Projeto:** `src/app/api/admin/portal/project/[id]/route.ts` (DELETE)
- **Atualizar Steps:** `src/app/api/admin/portal/project/[id]/steps/route.ts`
- **Registrar Pagamento:** `src/app/api/admin/portal/project/[id]/payment/route.ts` (POST)
- **Atualizar Pagamento:** `src/app/api/admin/portal/project/[id]/payment/route.ts` (PATCH)
- **Excluir Pagamento:** `src/app/api/admin/portal/project/[id]/payment/route.ts` (DELETE)
- **Upload de Arquivo:** `src/app/api/admin/portal/project/[id]/files/upload/route.ts`
- **Excluir Arquivo:** `src/app/api/admin/portal/project/[id]/files/[fileId]/route.ts` (DELETE)
- **Auditoria:** `src/app/api/admin/portal/audit/route.ts`
- **Limpeza:** `src/app/api/admin/portal/cleanup/route.ts`
- **Debug:** `src/app/api/admin/portal/debug-projects/route.ts`

#### Bibliotecas e Utilitários
- **Autenticação:** `src/lib/portal-auth.ts` (compartilhado)
- **Utilitários:** `src/lib/portal-utils.ts` (compartilhado)
- **Schemas de Validação:** `src/lib/schemas/admin.ts`
- **Configuração Admin:** `src/lib/admin-config.ts`

---

### 🔐 Autenticação Admin

**Método:** Cookie httpOnly + JWT (HMAC-SHA256)

**Detalhes:**
- **Cookie:** `ls_admin_session` (httpOnly, Secure em produção)
- **Token JWT contém:**
  - `authenticated: true`
  - `exp`: Timestamp Unix de expiração
  - `nonce`: UUID único
  - `iat`: Timestamp de criação
- **Expiração:** 7 dias
- **Senha:** Hash bcrypt armazenado em `AdminConfig` (tabela do banco)
- **Fallback:** `ADMIN_KEY` (variável de ambiente) se não houver senha no banco
- **Validação:** Middleware verifica expiração e autenticação

**Fluxo de Login:**
1. Admin informa senha
2. Sistema busca senha em `AdminConfig` (chave: "admin_password")
3. Se não existir, usa `ADMIN_KEY` do ambiente
4. Compara hash com bcrypt.compare()
5. Cria sessão JWT e retorna cookie httpOnly
6. Redireciona para dashboard

**Proteções:**
- Rate limiting: 5 tentativas / 15 minutos por IP
- Senha mínima: 24 caracteres (se configurada via API)
- Logs de auditoria para todas as tentativas

---

### 📄 Funcionalidades do Portal Admin

#### 1. Login (`/studio/admin/login`)

**Características:**
- Interface glassmorphism com tema dark
- Primeira vez: permite criar senha diretamente
- Validação de senha forte (mínimo 24 caracteres)
- Mensagens de erro contextuais
- Botão "Voltar" para retornar ao site

**Validações:**
- Senha obrigatória (mínimo 1 caractere para login)
- Schema Zod: `adminLoginSchema` em `src/lib/schemas/admin.ts`

---

#### 2. Dashboard Admin (`/studio/admin`)

**Funcionalidades:**

**Cabeçalho:**
- Título: "Admin Portal"
- Botões:
  - "Auditoria" → `/studio/admin/audit`
  - "Configurações" → `/studio/admin/settings`
  - "Novo Projeto" → `/studio/admin/project/new`
  - "Sair" (logout)

**Busca:**
- Campo de busca em tempo real
- Busca por:
  - Protocolo
  - Título do projeto
  - Nome do cliente
- Filtro aplicado instantaneamente

**Lista de Projetos:**
- Cards de projeto com:
  - Protocolo (destaque)
  - Status (badge colorido)
  - Título do projeto (se configurado)
  - Nome do cliente
  - Email do cliente (se disponível)
  - Valores financeiros:
    - Total (R$)
    - Pago (R$)
    - Saldo (R$)
  - Botões de ação:
    - "Ver" → `/studio/admin/project/[id]`
    - "Excluir" (com confirmação dupla)

**Exclusão de Projeto:**
- Confirmação dupla:
  1. Dialog de confirmação
  2. Prompt para digitar "EXCLUIR"
- Remove:
  - Arquivos do disco
  - Registros do banco (cascade: steps, files, payments)
- Logs de auditoria completos

---

#### 3. Criar Novo Projeto (`/studio/admin/project/new`)

**Formulário:**

**Campos:**
1. **Título do Projeto** (opcional):
   - Texto livre (máximo 500 caracteres)
   - Exemplo: "Projeto de Georreferenciamento de Fazenda São Tomás - Rio Verde (GO)"
   - Pode ser adicionado/editado depois

2. **Nome do Cliente** (obrigatório):
   - Texto (máximo 255 caracteres)

3. **Email do Cliente** (opcional):
   - Validação de formato email

4. **Telefone do Cliente** (opcional):
   - Texto (máximo 50 caracteres)

5. **Tipo de Serviço** (obrigatório):
   - Select com opções:
     - PERICIA_EVIDENCIAS (Perícia e Evidências)
     - PERICIA_AMBIENTAL (Perícia Ambiental)
     - AVALIACAO_RURAL (Avaliação Rural)
     - CAR (CAR)
     - GEOREF (Georreferenciamento)
     - OUTROS (Outros)

6. **Valor Total** (obrigatório):
   - Número positivo (R$)
   - Validação: > 0

7. **Valor de Entrada** (obrigatório):
   - Número não negativo (R$)
   - Validação: >= 0 e <= Valor Total

**Processo de Criação:**
1. Validação com Zod (`createProjectSchema`)
2. Geração automática:
   - Protocolo: `LS-YYYY-NNNNNN` (ex: LS-2026-000123)
   - PIN: 6 dígitos aleatórios
   - Hash do PIN (bcrypt)
3. Criação do projeto no banco:
   - Status inicial: `TRIAGEM`
   - `paidValue`: 0
   - `balanceValue`: `totalValue`
   - `finalRelease`: false
4. Criação de steps padrão (11 steps)
5. Retorno de sucesso com:
   - ID do projeto
   - Protocolo
   - PIN (exibido apenas uma vez)

**Tela de Sucesso:**
- Exibe protocolo e PIN
- Aviso: "⚠️ Anote o PIN! Ele não será exibido novamente."
- Botões:
  - "Voltar" → Dashboard
  - "Ver Projeto" → Detalhes do projeto

**Proteções:**
- Validação robusta de dados
- Tratamento de erro de migration (campo `title`)
- Logs de auditoria completos

---

#### 4. Detalhes do Projeto (`/studio/admin/project/[id]`)

**Seções Principais:**

**Cabeçalho:**
- Protocolo (destaque)
- Título do projeto (editável via botão "Editar Título")
- Nome do cliente
- Status (badge colorido)
- Botão "Voltar" → Dashboard

**Informações do Projeto:**
- **Título:** Exibido com botão "Editar Título"
  - Prompt para editar
  - Validação de migration (se campo não existir)
  - Mensagens de erro contextuais
- **Cliente:**
  - Nome (editável)
  - Email (editável)
  - Telefone (editável)
- **Serviço:**
  - Tipo de serviço (editável via select)
- **Valores:**
  - Valor Total (editável)
  - Valor de Entrada (editável)
  - Validação: entrada <= total
  - Recalculo automático de saldo
- **Status:**
  - Select com todos os status disponíveis
  - Atualização imediata
- **Liberação Final:**
  - Toggle "Liberar Entrega Final"
  - Habilita/desabilita `finalRelease`
- **PIN:**
  - Botão "Resetar PIN"
  - Gera novo PIN de 6 dígitos
  - Exibe apenas uma vez

**Timeline de Steps:**
- Lista de todos os steps do projeto
- Para cada step:
  - Título (editável)
  - Estado: PENDING / ACTIVE / DONE
  - Botões de ação:
    - "Marcar como Pendente"
    - "Marcar como Ativo"
    - "Marcar como Concluído"
  - Renomeação de step "REVISAO":
    - Permite renomear para R1, R2, R3, etc.
    - Atualização em tempo real
- **Steps excluídos da exibição:**
  - PREVIA_ENTREGUE
  - AJUSTES
- **Steps padrão criados:**
  1. Triagem Recebida
  2. Validação de Dados
  3. Proposta e Assinatura
  4. Entrada Confirmada
  5. Processamento - Fase 1
  6. Processamento - Fase 2
  7. QA Interno
  8. Final Pronto
  9. Revisão (pode ser renomeado)
  10. Saldo Pendente
  11. Liberado

**Upload de Arquivos:**
- Botão "Upload do Projeto"
- Dialog com campos:
  - **Versão:** Texto livre (ex: "Projeto Final", "Projeto Final R1", "Projeto Final R2")
  - **Arquivo:** Input file
- Validações:
  - Extensão permitida (PDF, ZIP, JPG, PNG, GeoJSON, SHP, etc.)
  - Tamanho máximo: 100 MB
  - Bloqueio de executáveis (.exe, .bat, .sh, etc.)
- Processamento:
  - Scan de vírus (ClamAV, se habilitado)
  - Armazenamento em: `uploads/portal/[protocol]/[filename]`
  - Criação de registro no banco:
    - `kind: FINAL`
    - `isLocked`: baseado em saldo e `finalRelease`
  - Versionamento automático
- Todos os arquivos são visíveis ao cliente (liberados ou bloqueados)

**Exclusão de Arquivos:**
- Botão "Excluir" em cada arquivo
- Confirmação antes de excluir
- Remove:
  - Arquivo do disco
  - Registro do banco
- Logs de auditoria

**Pagamentos:**
- Lista de todos os pagamentos do projeto
- Para cada pagamento:
  - Método (PIX, BOLETO, CARTAO, AJUSTE)
  - Valor (R$)
  - Status (PENDING, CONFIRMED, CANCELED)
  - Data de criação
  - Nota/observações
  - Botões:
    - "Editar" (permite alterar método, valor, status, nota)
    - "Excluir" (com confirmação)
- Botão "Adicionar Pagamento":
  - Dialog com campos:
    - Método (select)
    - Valor (número positivo)
    - Status (select, default: CONFIRMED)
    - Nota (opcional, máximo 1000 caracteres)
  - Recalculo automático de saldo após criação
- **Recalculo de Saldo:**
  - Executado automaticamente após:
    - Criar pagamento
    - Atualizar pagamento
    - Excluir pagamento
  - Fórmula: `balanceValue = max(totalValue - paidValue, 0)`
  - `paidValue` = soma de todos os pagamentos com status CONFIRMED

**Proteções:**
- Validação de todos os dados com Zod
- Tratamento de erros de migration
- Logs de auditoria para todas as ações
- Validação de arquivos (extensão, tamanho, vírus)

---

#### 5. Configurações (`/studio/admin/settings`)

**Funcionalidades:**
- Alterar senha admin
- Configurações gerais (futuro)

**Alterar Senha:**
- Formulário com:
  - Senha atual (opcional, se já existir)
  - Nova senha (mínimo 24 caracteres)
  - Confirmação de senha
- Validação:
  - Senha forte (mínimo 24 caracteres)
  - Confirmação deve coincidir
- Armazenamento:
  - Hash bcrypt em `AdminConfig` (chave: "admin_password")
- Logs de auditoria

---

#### 6. Auditoria (`/studio/admin/audit`)

**Funcionalidades:**
- Lista de eventos de auditoria
- Filtros:
  - Por protocolo
  - Por ação
  - Por data
  - Por sucesso/erro
- Paginação
- Exportação (futuro)

**Eventos Registrados:**
- Login/Logout (portal e admin)
- Criação/Atualização/Exclusão de projetos
- Upload/Download/Exclusão de arquivos
- Criação/Atualização/Exclusão de pagamentos
- Atualização de steps
- Alteração de configurações

**Campos por Evento:**
- Request ID
- Protocol (se aplicável)
- Ação
- Tipo de entidade
- ID da entidade
- IP Address
- User Agent
- Timestamp
- Sucesso/Erro
- Mensagem de erro (se houver)
- Metadados (JSON)

---

### 🔒 Segurança do Portal Admin

**Proteções Implementadas:**

1. **Autenticação:**
   - JWT com assinatura HMAC-SHA256
   - Cookie httpOnly
   - Expiração automática (7 dias)
   - Nonce único por sessão

2. **Rate Limiting:**
   - Login: 5 tentativas / 15 minutos (por IP)

3. **Validação de Dados:**
   - Zod schemas para todas as entradas
   - Sanitização de strings
   - Validação de tipos
   - Validação de ranges (valores, tamanhos)

4. **Upload de Arquivos:**
   - Validação de extensão (whitelist)
   - Validação de tamanho (máximo 100 MB)
   - Bloqueio de executáveis
   - Scan de vírus (ClamAV, opcional)
   - Nome de arquivo sanitizado
   - Path traversal protection

5. **Auditoria:**
   - Logs de todas as ações administrativas
   - Request ID em todas as requisições
   - IP Address e User Agent registrados
   - Metadados estruturados (JSON)

6. **Proteção de Dados:**
   - PIN nunca exposto após criação
   - Senhas sempre hasheadas (bcrypt)
   - Paths de arquivos nunca expostos ao cliente
   - Validação de propriedade antes de operações

---

## 🔌 APIs e Endpoints

### Portal do Cliente

#### `POST /api/portal/login`
**Descrição:** Autenticação do cliente com protocolo e PIN

**Request Body:**
```json
{
  "protocol": "LS-2026-000123",
  "pin": "123456"
}
```

**Response (Sucesso):**
```json
{
  "success": true,
  "protocol": "LS-2026-000123"
}
```

**Response (Erro):**
```json
{
  "error": "Protocolo não encontrado",
  "errorType": "PROTOCOL_NOT_FOUND"
}
```

**Proteções:**
- Rate limiting: 5 tentativas / 15 minutos
- Validação de protocolo e PIN
- Logs de auditoria

---

#### `POST /api/portal/logout`
**Descrição:** Logout do cliente

**Response:**
```json
{
  "success": true
}
```

---

#### `GET /api/portal/project/[protocol]`
**Descrição:** Buscar dados do projeto

**Response:**
```json
{
  "project": {
    "id": "...",
    "protocol": "LS-2026-000123",
    "title": "Projeto de Georreferenciamento...",
    "clientName": "João Silva",
    "clientEmail": "joao@example.com",
    "clientPhone": "(11) 99999-9999",
    "serviceType": "GEOREF",
    "status": "EM_PRODUCAO",
    "totalValue": 10000.00,
    "entryValue": 3000.00,
    "paidValue": 3000.00,
    "balanceValue": 7000.00,
    "finalRelease": false,
    "progress": 45,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
}
```

**Proteções:**
- Verificação de sessão
- Validação de protocolo na sessão vs. URL

---

#### `GET /api/portal/project/[protocol]/steps`
**Descrição:** Buscar steps do projeto

**Response:**
```json
{
  "steps": [
    {
      "id": "...",
      "stepKey": "TRIAGEM_RECEBIDA",
      "title": "Triagem Recebida",
      "description": "...",
      "state": "DONE",
      "startedAt": "2026-01-01T00:00:00Z",
      "finishedAt": "2026-01-01T00:00:00Z",
      "order": 1
    }
  ]
}
```

---

#### `GET /api/portal/project/[protocol]/files`
**Descrição:** Buscar arquivos do projeto com permissões

**Response:**
```json
{
  "preview": {
    "canDownload": false,
    "files": []
  },
  "final": {
    "canDownload": true,
    "files": [
      {
        "id": "...",
        "kind": "FINAL",
        "filename": "Projeto Final R1.pdf",
        "version": "Projeto Final R1",
        "uploadedAt": "2026-01-01T00:00:00Z"
      }
    ]
  }
}
```

**Proteções:**
- Verificação de sessão
- Cálculo de permissões via `canDownloadFinal()`

---

#### `GET /api/portal/files/[id]/download`
**Descrição:** Download de arquivo

**Response:**
- Stream do arquivo
- Headers:
  - `Content-Type`: baseado na extensão
  - `Content-Disposition`: attachment
  - `Cache-Control`: no-store, no-cache

**Proteções:**
- Verificação de sessão
- Validação de propriedade (arquivo pertence ao protocolo)
- Validação de permissões (`canDownloadFinal()`)
- Path traversal protection
- Logs de auditoria

---

### Portal Admin

#### `POST /api/admin/portal/login`
**Descrição:** Autenticação do admin

**Request Body:**
```json
{
  "adminKey": "senha_admin_aqui"
}
```

**Response (Sucesso):**
```json
{
  "success": true
}
```

**Proteções:**
- Rate limiting: 5 tentativas / 15 minutos
- Validação de senha (AdminConfig ou ADMIN_KEY)

---

#### `POST /api/admin/portal/logout`
**Descrição:** Logout do admin

**Response:**
```json
{
  "success": true
}
```

---

#### `POST /api/admin/portal/password`
**Descrição:** Criar/atualizar senha admin

**Request Body:**
```json
{
  "password": "nova_senha_minimo_24_caracteres"
}
```

**Response:**
```json
{
  "success": true
}
```

---

#### `GET /api/admin/portal/projects`
**Descrição:** Listar todos os projetos

**Response:**
```json
{
  "projects": [
    {
      "id": "...",
      "protocol": "LS-2026-000123",
      "title": "...",
      "clientName": "...",
      "clientEmail": "...",
      "serviceType": "...",
      "status": "...",
      "totalValue": 10000.00,
      "paidValue": 3000.00,
      "balanceValue": 7000.00,
      "finalRelease": false,
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

**Query Parameters:**
- `search`: Busca por protocolo, título ou cliente (futuro)

---

#### `POST /api/admin/portal/project`
**Descrição:** Criar novo projeto

**Request Body:**
```json
{
  "title": "Projeto de Georreferenciamento...",
  "clientName": "João Silva",
  "clientEmail": "joao@example.com",
  "clientPhone": "(11) 99999-9999",
  "serviceType": "GEOREF",
  "totalValue": 10000.00,
  "entryValue": 3000.00
}
```

**Response:**
```json
{
  "success": true,
  "project": {
    "id": "...",
    "protocol": "LS-2026-000123",
    "pin": "123456"
  },
  "warning": "..." // Se campo title não disponível
}
```

**Proteções:**
- Validação com `createProjectSchema`
- Geração automática de protocolo e PIN
- Criação de steps padrão
- Tratamento de erro de migration

---

#### `GET /api/admin/portal/project/[id]`
**Descrição:** Buscar projeto por ID ou protocolo

**Response:**
```json
{
  "project": {
    "id": "...",
    "protocol": "LS-2026-000123",
    "title": "...",
    "clientName": "...",
    "steps": [...],
    "files": [...],
    "payments": [...]
  }
}
```

---

#### `PATCH /api/admin/portal/project/[id]`
**Descrição:** Atualizar projeto

**Request Body:**
```json
{
  "title": "Novo título",
  "clientName": "Novo nome",
  "totalValue": 12000.00,
  "entryValue": 4000.00,
  "status": "EM_PRODUCAO",
  "finalRelease": true,
  "resetPin": false
}
```

**Response:**
```json
{
  "success": true,
  "project": {...},
  "warning": "..." // Se campo title não disponível
}
```

**Proteções:**
- Validação com `updateProjectSchema`
- Recalculo automático de saldo
- Tratamento de erro de migration
- Logs de auditoria

---

#### `DELETE /api/admin/portal/project/[id]`
**Descrição:** Excluir projeto

**Response:**
```json
{
  "success": true
}
```

**Proteções:**
- Remoção de arquivos do disco
- Cascade delete no banco
- Logs de auditoria

---

#### `POST /api/admin/portal/project/[id]/steps`
**Descrição:** Atualizar step do projeto

**Request Body:**
```json
{
  "stepId": "...",
  "state": "DONE"
}
```

**Response:**
```json
{
  "success": true,
  "step": {...}
}
```

---

#### `POST /api/admin/portal/project/[id]/payment`
**Descrição:** Registrar pagamento

**Request Body:**
```json
{
  "method": "PIX",
  "amount": 3000.00,
  "status": "CONFIRMED",
  "note": "Comprovante anexado"
}
```

**Response:**
```json
{
  "success": true,
  "payment": {...}
}
```

**Proteções:**
- Validação com `createPaymentSchema`
- Recalculo automático de saldo
- Logs de auditoria

---

#### `PATCH /api/admin/portal/project/[id]/payment`
**Descrição:** Atualizar pagamento

**Request Body:**
```json
{
  "method": "BOLETO",
  "amount": 3500.00,
  "status": "CONFIRMED",
  "note": "Atualizado"
}
```

**Query Parameters:**
- `paymentId`: ID do pagamento

**Response:**
```json
{
  "success": true,
  "payment": {...}
}
```

---

#### `DELETE /api/admin/portal/project/[id]/payment`
**Descrição:** Excluir pagamento

**Query Parameters:**
- `paymentId`: ID do pagamento

**Response:**
```json
{
  "success": true
}
```

---

#### `POST /api/admin/portal/project/[id]/files/upload`
**Descrição:** Upload de arquivo

**Request:** FormData
- `file`: Arquivo
- `kind`: "FINAL"
- `version`: "Projeto Final R1"

**Response:**
```json
{
  "success": true,
  "file": {
    "id": "...",
    "filename": "Projeto Final R1.pdf",
    "version": "Projeto Final R1",
    "kind": "FINAL"
  }
}
```

**Proteções:**
- Validação de extensão (whitelist)
- Validação de tamanho (máximo 100 MB)
- Scan de vírus (ClamAV, opcional)
- Path traversal protection
- Logs de auditoria

---

#### `DELETE /api/admin/portal/project/[id]/files/[fileId]`
**Descrição:** Excluir arquivo

**Response:**
```json
{
  "success": true
}
```

**Proteções:**
- Remoção de arquivo do disco
- Remoção de registro do banco
- Logs de auditoria

---

#### `GET /api/admin/portal/audit`
**Descrição:** Listar eventos de auditoria

**Query Parameters:**
- `protocol`: Filtrar por protocolo
- `action`: Filtrar por ação
- `limit`: Limite de resultados
- `offset`: Offset para paginação

**Response:**
```json
{
  "events": [
    {
      "id": "...",
      "requestId": "...",
      "protocol": "LS-2026-000123",
      "action": "portal_login",
      "entityType": "Project",
      "entityId": "...",
      "ipAddress": "192.168.1.1",
      "userAgent": "...",
      "success": true,
      "createdAt": "2026-01-01T00:00:00Z",
      "metadata": {...}
    }
  ],
  "total": 100
}
```

---

## 🗂️ Estrutura de Arquivos

### Portal do Cliente

```
src/
├── app/
│   ├── studio/
│   │   └── portal/
│   │       ├── page.tsx                    # Login
│   │       └── [protocol]/
│   │           ├── page.tsx                # Dashboard
│   │           └── files/
│   │               └── page.tsx            # Arquivos
│   └── api/
│       └── portal/
│           ├── login/
│           │   └── route.ts                # POST /api/portal/login
│           ├── logout/
│           │   └── route.ts                # POST /api/portal/logout
│           ├── project/
│           │   └── [protocol]/
│           │       ├── route.ts            # GET /api/portal/project/[protocol]
│           │       ├── steps/
│           │       │   └── route.ts        # GET /api/portal/project/[protocol]/steps
│           │       └── files/
│           │           └── route.ts        # GET /api/portal/project/[protocol]/files
│           └── files/
│               └── [id]/
│                   └── download/
│                       └── route.ts        # GET /api/portal/files/[id]/download
└── lib/
    ├── portal-auth.ts                      # Autenticação (compartilhado)
    ├── portal-utils.ts                     # Utilitários (compartilhado)
    └── schemas/
        └── portal.ts                       # Schemas Zod do portal
```

### Portal Admin

```
src/
├── app/
│   ├── studio/
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx                # Login
│   │       ├── page.tsx                    # Dashboard
│   │       ├── project/
│   │       │   ├── new/
│   │       │   │   └── page.tsx            # Criar projeto
│   │       │   └── [id]/
│   │       │       └── page.tsx            # Detalhes do projeto
│   │       ├── settings/
│   │       │   └── page.tsx                # Configurações
│   │       └── audit/
│   │           └── page.tsx                # Auditoria
│   └── api/
│       └── admin/
│           └── portal/
│               ├── login/
│               │   └── route.ts            # POST /api/admin/portal/login
│               ├── logout/
│               │   └── route.ts            # POST /api/admin/portal/logout
│               ├── password/
│               │   └── route.ts            # POST /api/admin/portal/password
│               ├── projects/
│               │   └── route.ts            # GET /api/admin/portal/projects
│               ├── project/
│               │   ├── route.ts             # POST /api/admin/portal/project
│               │   └── [id]/
│               │       ├── route.ts        # GET/PATCH/DELETE /api/admin/portal/project/[id]
│               │       ├── steps/
│               │       │   └── route.ts    # POST /api/admin/portal/project/[id]/steps
│               │       ├── payment/
│               │       │   └── route.ts    # POST/PATCH/DELETE /api/admin/portal/project/[id]/payment
│               │       └── files/
│               │           ├── upload/
│               │           │   └── route.ts # POST /api/admin/portal/project/[id]/files/upload
│               │           └── [fileId]/
│               │               └── route.ts # DELETE /api/admin/portal/project/[id]/files/[fileId]
│               ├── audit/
│               │   └── route.ts            # GET /api/admin/portal/audit
│               ├── cleanup/
│               │   └── route.ts            # GET/POST /api/admin/portal/cleanup
│               └── debug-projects/
│                   └── route.ts            # GET /api/admin/portal/debug-projects
└── lib/
    ├── portal-auth.ts                      # Autenticação (compartilhado)
    ├── portal-utils.ts                     # Utilitários (compartilhado)
    ├── admin-config.ts                    # Configuração admin
    └── schemas/
        └── admin.ts                        # Schemas Zod do admin
```

---

## 🛡️ Segurança e Autenticação

### Autenticação

**Portal do Cliente:**
- Método: Cookie httpOnly + JWT (HMAC-SHA256)
- Cookie: `ls_portal_session`
- Token: protocol, exp, nonce, iat
- Expiração: 7 dias
- PIN: Hash bcrypt (10 rounds)

**Portal Admin:**
- Método: Cookie httpOnly + JWT (HMAC-SHA256)
- Cookie: `ls_admin_session`
- Token: authenticated, exp, nonce, iat
- Expiração: 7 dias
- Senha: Hash bcrypt armazenado em AdminConfig ou ADMIN_KEY (env)

### Rate Limiting

**Portal do Cliente:**
- Login: 5 tentativas / 15 minutos (por IP + protocol)

**Portal Admin:**
- Login: 5 tentativas / 15 minutos (por IP)

**Implementação:**
- Redis (se disponível) ou memória
- Helper: `src/lib/rate-limit/`

### Validação de Dados

**Schemas Zod:**
- `portalLoginSchema`: Login do portal
- `adminLoginSchema`: Login do admin
- `adminPasswordSchema`: Senha admin
- `createProjectSchema`: Criar projeto
- `updateProjectSchema`: Atualizar projeto
- `updateStepsSchema`: Atualizar steps
- `createPaymentSchema`: Criar pagamento
- `updatePaymentSchema`: Atualizar pagamento
- `uploadFileSchema`: Upload de arquivo

### Proteção de Arquivos

**Upload:**
- Whitelist de extensões
- Tamanho máximo: 100 MB
- Bloqueio de executáveis
- Scan de vírus (ClamAV, opcional)
- Nome sanitizado
- Path traversal protection

**Download:**
- Verificação de sessão
- Validação de propriedade
- Validação de permissões
- Path traversal protection
- Streaming seguro

### Auditoria

**Eventos Registrados:**
- Login/Logout (sucesso/falha)
- Criação/Atualização/Exclusão de projetos
- Upload/Download/Exclusão de arquivos
- Criação/Atualização/Exclusão de pagamentos
- Atualização de steps
- Alteração de configurações

**Campos:**
- Request ID
- Protocol (se aplicável)
- Ação
- Tipo de entidade
- ID da entidade
- IP Address
- User Agent
- Timestamp
- Sucesso/Erro
- Mensagem de erro
- Metadados (JSON)

**Tabela:** `AuditLog` no banco de dados

---

## 📊 Funcionalidades Detalhadas

### Steps do Projeto

**Steps Padrão (11):**
1. Triagem Recebida
2. Validação de Dados
3. Proposta e Assinatura
4. Entrada Confirmada
5. Processamento - Fase 1
6. Processamento - Fase 2
7. QA Interno
8. Final Pronto
9. Revisão (pode ser renomeado: R1, R2, R3, etc.)
10. Saldo Pendente
11. Liberado

**Estados:**
- `PENDING`: Pendente
- `ACTIVE`: Ativo (em andamento)
- `DONE`: Concluído

**Funcionalidades:**
- Atualização de estado (PENDING/ACTIVE/DONE)
- Renomeação de título
- Renomeação especial para step "REVISAO"
- Cálculo de progresso baseado em steps DONE

**Steps Removidos:**
- PREVIA_ENTREGUE (não existe mais)
- AJUSTES (não existe mais)

---

### Sistema de Pagamentos

**Métodos:**
- PIX
- BOLETO
- CARTAO
- AJUSTE

**Status:**
- `PENDING`: Pendente
- `CONFIRMED`: Confirmado (conta para paidValue)
- `CANCELED`: Cancelado

**Funcionalidades:**
- Criar pagamento
- Editar pagamento (método, valor, status, nota)
- Excluir pagamento
- Recalculo automático de saldo após qualquer operação

**Cálculo de Saldo:**
```typescript
paidValue = soma de todos os pagamentos com status CONFIRMED
balanceValue = max(totalValue - paidValue, 0)
```

---

### Upload de Arquivos

**Tipos:**
- `FINAL`: Arquivos finais do projeto

**Processo:**
1. Validação de extensão (whitelist)
2. Validação de tamanho (máximo 100 MB)
3. Scan de vírus (ClamAV, se habilitado)
4. Geração de nome seguro
5. Armazenamento em `uploads/portal/[protocol]/[filename]`
6. Criação de registro no banco:
   - `kind: FINAL`
   - `isLocked`: baseado em saldo e `finalRelease`
   - `version`: versão informada pelo admin
7. Todos os arquivos são visíveis ao cliente (liberados ou bloqueados)

**Extensões Permitidas:**
- PDF, ZIP, JPG, PNG, GeoJSON, SHP, etc.
- Bloqueio de executáveis (.exe, .bat, .sh, etc.)

---

### Liberação de Arquivos

**Regras (TODAS devem ser atendidas):**

1. ✅ `finalRelease == true` (liberação manual habilitada pelo admin)
2. ✅ Step "FINAL_PRONTO" está "DONE" **OU** Step "REVISAO" está "DONE"
3. ✅ Arquivo não está bloqueado (`isLocked == false`)

**Nota:** O saldo pendente não bloqueia mais a liberação se o admin habilitar `finalRelease`.

**Função:** `canDownloadFinal()` em `src/lib/portal-utils.ts`

---

### Título do Projeto

**Funcionalidade:**
- Campo opcional (máximo 500 caracteres)
- Pode ser adicionado na criação do projeto
- Pode ser editado depois
- Exibido no dashboard do cliente e admin

**Exemplo:**
"Projeto de Georreferenciamento de Fazenda São Tomás - Rio Verde (GO)"

**Migration:**
- Campo `title` adicionado à tabela `Project`
- Migration: `20260125000000_add_project_title`
- Tratamento de erro se migration não aplicada

---

## 📝 Observações Finais

### Tecnologias Utilizadas

- **Framework:** Next.js 16.1.1 (App Router)
- **Banco de Dados:** PostgreSQL (Prisma ORM)
- **Autenticação:** JWT (jose), bcrypt
- **Validação:** Zod
- **Upload:** FormData, fs/promises
- **Scan de Vírus:** ClamAV (opcional)
- **Rate Limiting:** Redis ou memória
- **Auditoria:** Tabela AuditLog no banco

### Padrões de Código

- **TypeScript:** Tipagem estrita
- **Schemas Zod:** Validação de todas as entradas
- **Error Handling:** Try-catch em todas as operações
- **Logs Estruturados:** JSON em produção
- **Request ID:** Correlação de requisições
- **Auditoria:** Todas as ações críticas registradas

### Segurança

- **Big Tech Level:** Proteções de nível enterprise
- **CSP:** Content Security Policy com nonce
- **Rate Limiting:** Proteção contra brute force
- **Path Traversal:** Proteção em todos os acessos a arquivos
- **XSS:** Sanitização de HTML
- **SSRF:** Allowlist de URLs
- **Auditoria:** Logs completos de todas as ações

---

**Documento gerado em:** Janeiro 2025  
**Versão:** 1.0  
**Status:** Completo
