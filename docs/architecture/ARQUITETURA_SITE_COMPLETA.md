# Arquitetura Completa do Site LandSpace

**Mapa Mental e Descrição Detalhada de Páginas**

- **Data:** Janeiro 2025
- **Versão:** 3.0 (Atualizada com Hardening de Segurança Big Tech)

---

## 📋 Índice

- [Mapa Mental do Site](#mapa-mental-do-site)
- [Estrutura dos 5 Pilares](#estrutura-dos-5-pilares)
- [Descrição Detalhada de Cada Página](#descrição-detalhada-de-cada-página)
  - [1. Página Inicial (HOME)](#1-página-inicial-home)
  - [2. Pilar Tech](#2-pilar-tech)
  - [3. Pilar Studio](#3-pilar-studio)
  - [4. Portal do Cliente](#4-portal-do-cliente)
  - [5. Admin do Portal](#5-admin-do-portal)
  - [6. Pilar Strategy](#6-pilar-strategy)
  - [7. Pilar Academy](#7-pilar-academy)
  - [8. Pilar Labs](#8-pilar-labs)
  - [9. Páginas Secundárias](#9-páginas-secundárias-e-institucionais)
  - [10. Páginas Legais](#10-páginas-legais-e-institucionais)
- [11. Banco de Dados (Prisma)](#11-banco-de-dados-prisma)
- [12. API Routes](#12-api-routes)
- [13. Autenticação e Segurança](#13-autenticação-e-segurança)
- [14. Componentes Globais](#14-componentes-globais)
- [15. Contextos e Estado Global](#15-contextos-e-estado-global)
- [16. Utilitários e Bibliotecas](#16-utilitários-e-bibliotecas)
- [17. Variáveis de Ambiente](#17-variáveis-de-ambiente)
- [18. Problemas Conhecidos](#18-problemas-conhecidos-e-limitações)
- [19. Sugestões de Melhorias](#19-sugestões-de-melhorias-e-próximos-passos)
- [20. Estrutura de Arquivos](#20-estrutura-de-arquivos-atualizada)
- [21. Resumo Estatístico](#21-resumo-estatístico-atualizado)
- [22. Checklist para IA ChatGPT](#22-checklist-para-ia-chatgpt---problemas-e-soluções)
- [23. Comandos Úteis](#23-comandos-úteis-para-desenvolvimento)
- [24. Recursos e Referências](#24-recursos-e-referências)

---

## Mapa Mental do Site

```
LANDSPACE
    │
    ├── ESTRUTURA
    │   ├── LAYOUT
    │   │   ├── Root Layout
    │   │   └── Meta data
    │   ├── CONTEXTO
    │   │   └── Cart Context
    │   └── COMPONENTES
    │       ├── Header
    │       ├── Footer
    │       └── WhatsApp Button
    │
    ├── PÁGINAS
    │   ├── PÚBLICAS
    │   │   ├── Home
    │   │   ├── Tech
    │   │   ├── Studio
    │   │   ├── Strategy
    │   │   ├── Academy
    │   │   └── Labs
    │   │
    │   ├── PORTAL DO CLIENTE
    │   │   ├── Login (Protocol + PIN)
    │   │   ├── Dashboard (Steps/Status)
    │   │   └── Arquivos (Preview/Final)
    │   │
    │   └── ADMIN
    │       ├── Login Admin
    │       ├── Admin Panel
    │       └── Admin Upload
    │
    └── PÁGINAS SECUNDÁRIAS
        ├── Contato
        ├── Consultoria
        └── Soluções
```

---

## Estrutura dos 5 Pilares

### 1. TECH (`/tech`)
- Ferramentas de automação geoespacial
- Pipelines e soluções validadas
- Catálogo de produtos técnicos

### 2. STUDIO (`/studio`)
- Cartografia técnica e serviços especializados
- Portal do Cliente (MVP implementado)
- Serviços: Perícia, Avaliação Rural, CAR, Georreferenciamento, etc.

### 3. STRATEGY (`/strategy`)
- Briefings geopolíticos
- Mapas estratégicos
- Podcast
- Análises orientadas por dados

### 4. ACADEMY (`/academy`)
- Cursos e trilhas de formação
- Capacitação técnica avançada
- QGIS, R, GeoAI

### 5. LABS (`/labs`)
- Engenharia de Produto Geoespacial
- Validação e QA/QC
- Pesquisa aplicada

---

## Descrição Detalhada de Cada Página

### 1. Página Inicial (HOME)

**Localização:** `src/app/page.tsx`

**Descrição Geral:**
A página inicial apresenta os 5 pilares do ecossistema LandSpace com design dark premium, glassmorphism e animações em cascata.

#### Seções Principais

**1.1. Hero Section**
- Headline: "Ecossistema integrado de tecnologia, inteligência e estratégia geoespacial para a compreensão de sistemas complexos — do território ao cenário global."
- Subheadline: "Da validação científica à automação 4.0: inteligência geográfica para a decisão estratégica de alto nível."
- Grid interativo de 10 áreas de expertise técnica

**1.2. Barra de Autoridade (Dark Tech HUD)**
- 4 indicadores: Ferramentas Profissionais, Acesso Permanente, +260 Profissionais Ativos, Metodologia Validada

**1.3. Seção "Como entregamos" (5 Pilares)**
- Headline: "Cinco pilares conectados — com validação contínua pelo Labs."
- Subheadline: "Automação (Tech) → Serviços (Studio) → Inteligência (Strategy) → Formação (Academy) → Labs."
- Selo global: "Validado pelo LandSpace Labs (Pesquisa, Desenvolvimento e Validação)."
- Grid de 5 cards:
  - **Tech:** "Ferramentas de automação geotecnológicas"
  - **Studio:** "Cartografia, relatórios e serviços especializados"
  - **Strategy:** "Mapas estratégicos e análises geopolíticas globais"
  - **Academy:** "Cursos aplicados de alta performance e objetivos"
  - **Labs:** "Pesquisa aplicada, desenvolvimento e validação"

**1.4. Missão / Visão / Valores**
- **Missão:** "Acelerar decisões e operações geoespaciais com automação, inteligência e validação contínua."
- **Visão:** "Ser referência em uma plataforma geoespacial escalável — de pesquisa aplicada à entrega — para cenários complexos."
- **Valores:** Rigor técnico, Reprodutibilidade, Rastreabilidade, Transparência, Segurança, Educação

**1.5. CTA Final**
- Título: "Pronto para iniciar um projeto com a LandSpace?"
- Botão principal: "Solicitar protocolo de projeto →"
- Subtexto: "Triagem técnica • Escopo claro • QA/QC pelo Labs."
- Botões de exploração: Tech | Studio | Strategy | Academy | Labs

**Componentes Utilizados:**
- Header
- Footer
- WhatsAppButton

**Recursos Especiais:**
- Cascata de ativação digital no grid de expertise
- Animações de hover e transições suaves
- Efeitos de glow e glassmorphism
- Grid pattern de engenharia no fundo

---

### 2. Pilar Tech

**Localização:** `src/app/tech/page.tsx`

**Descrição Geral:**
Página do pilar Tech apresentando ferramentas de automação geoespacial robustas.

**Seções Principais:**
- Hero Section com tagline "Automação geoespacial por LandSpace."
- Grid de ferramentas e produtos técnicos
- Catálogo de soluções validadas
- Links para catálogo completo

**Componentes:**
- Header
- Footer
- WhatsAppButton

---

### 3. Pilar Studio

**Localização:** `src/app/studio/page.tsx`

**Descrição Geral:**
Página do pilar Studio apresentando cartografia técnica e serviços especializados para setores público, ambiental e do agronegócio.

**Seções Principais:**
- Hero Section: "Cartografia e serviços especializados para os setores público, ambiental e do agronegócio."
- Grid de serviços temáticos:
  - Perícia Ambiental
  - Perícia em Evidências
  - Avaliação Rural
  - CAR (Cadastro Ambiental Rural)
  - Georreferenciamento
  - EIA/RIMA
  - ZEE e Ordenamento Territorial
  - Planejamento Urbano e Plano Diretor
  - Bacias, USLE/RUSLE e Conservação do Solo
  - Fragilidade Ambiental
  - Recursos Hídricos
  - Riscos Climáticos
  - Riscos Geológicos
  - Monitoramento LULC
  - Agricultura de Precisão
  - Drone e Fotogrametria
  - Florestal e Restauração
  - Áreas Degradadas
  - Aptidão Agrícola e Agroclima
  - PUC/SCUP
  - Zoneamento Ambiental
- Seção "Acesso" com botão "Área do Cliente" → `/studio/portal`
- Link discreto "Admin" (apenas em dev)

**Páginas Temáticas:**
- `/studio/pericia-ambiental`
- `/studio/pericia-evidencias`
- `/studio/avaliacao-rural`
- `/studio/car`
- `/studio/georreferenciamento`
- `/studio/eia-rima`
- `/studio/zee-ordenamento`
- `/studio/urbano-plano-diretor`
- `/studio/bacias-usle-conservacao`
- `/studio/fragilidade-ambiental`
- `/studio/recursos-hidricos`
- `/studio/riscos-climaticos`
- `/studio/riscos-geologicos`
- `/studio/monitoramento-lulc`
- `/studio/agricultura-precisao`
- `/studio/drone-fotogrametria`
- `/studio/florestal-restauracao`
- `/studio/areas-degradadas`
- `/studio/aptidao-agricola-agroclima`
- `/studio/puc-scup`
- `/studio/zoneamento-ambiental`

**Componentes Utilizados:**
- Header
- Footer
- WhatsAppButton
- StudioServiceHero
- PackageCards
- DeliverablesList
- DataRequirements
- ScopeRules
- ProtocolCTA
- ServiceDetailModal
- ThematicPageTemplate

**Recursos Especiais:**
- Design glassmorphism com accent índigo (#6366f1)
- Cards de serviços com hover effects
- Modal de detalhes de serviços
- CTAs para solicitar orçamento

---

### 4. Portal do Cliente

**Localização:** `src/app/studio/portal/`

**Descrição Geral:**
MVP do Portal do Cliente implementado dentro do LandSpace Studio. Permite que clientes acompanhem projetos, visualizem steps, vejam entregáveis e baixem arquivos após pagamento.

#### Estrutura de Rotas

**4.1. Login** - `/studio/portal/page.tsx`
- Formulário: Protocolo + PIN
- Normalização: Protocol em UPPERCASE, PIN trim
- Validação de credenciais
- Mensagens de erro específicas (Protocolo não encontrado / PIN incorreto)
- Erro permanece visível até usuário fechar ou digitar novamente
- Redireciona para `/studio/portal/[protocol]` em caso de sucesso

**4.2. Dashboard do Projeto** - `/studio/portal/[protocol]/page.tsx`
- Informações do projeto: Protocol, Cliente, Serviço, Status
- Barra de progresso baseada em steps (DONE/total)
- Timeline/Stepper com steps (PENDING/ACTIVE/DONE)
- Bloco financeiro:
  - Valor total
  - Valor pago
  - Saldo pendente
  - Status de pagamento
- Ações rápidas:
  - Ver arquivos
  - Pagar saldo (mostra instruções Pix/Boleto)
  - "Já paguei" (upload de comprovante - futuro)

**4.3. Arquivos** - `/studio/portal/[protocol]/files/page.tsx`
- **Seção Preview:**
  - Liberado quando `paidValue >= entryValue`
  - Lista de arquivos PREVIEW disponíveis
  - Download via endpoint protegido
- **Seção Final:**
  - Liberado quando `balanceValue == 0` AND `finalRelease == true` AND `status >= FINAL_PRONTO`
  - Lista de arquivos FINAL disponíveis
  - Mostra lock e instruções se não liberado

**Autenticação:**
- Cookie httpOnly: `ls_portal_session`
- Token JWT (HMAC) com: protocol, exp (Unix timestamp), nonce
- Expiração: 7 dias
- Validação no middleware: verifica exp e protocol na rota

**Middleware:**
- Protege rotas `/studio/portal/[protocol]*`
- Redireciona para `/studio/portal` se não tiver sessão válida
- Bloqueia acesso se protocol do token != protocol da rota

**Componentes:**
- Cards glassmorphism com accent índigo (#6366f1)
- Timeline visual de steps
- Badges de status
- Bloqueio visual de downloads não liberados

---

### 5. Admin do Portal

**Localização:** `src/app/studio/admin/`

**Descrição Geral:**
Painel administrativo para gerenciar projetos do Portal do Cliente.

#### Estrutura de Rotas

**5.1. Login Admin** - `/studio/admin/login/page.tsx`
- Formulário de senha admin
- Primeira vez: permite criar senha diretamente
- Senha armazenada em AdminConfig (hash bcrypt)
- Fallback para ADMIN_KEY (env var) se não houver senha no banco
- Cookie httpOnly: `ls_admin_session`

**5.2. Dashboard Admin** - `/studio/admin/page.tsx`
- Lista de projetos com busca
- Cards de projeto: Protocol, Cliente, Status, Valor
- Botão "Excluir" em cada card
- Botão "Novo Projeto"
- Link para "Ver projeto" → `/studio/admin/project/[id]`

**5.3. Criar Projeto** - `/studio/admin/project/new/page.tsx`
- Formulário: Nome do cliente, Email, Telefone, Tipo de serviço, Valor total, Valor de entrada
- Gera protocol automaticamente (LS-YYYY-XXXXXX)
- Gera PIN aleatório (6 dígitos)
- Cria steps padrão automaticamente (12 steps)
- Retorna protocol e PIN para exibição

**5.4. Editar Projeto** - `/studio/admin/project/[id]/page.tsx`
- Informações do projeto
- Gerenciamento de steps (mudar estado: PENDING/ACTIVE/DONE)
- Registro de pagamentos
- Upload de arquivos (Preview/Final) com versionamento
- Liberação final (marcar finalRelease=true)
- Reset PIN
- Excluir projeto (com confirmação dupla)

**5.5. Auditoria** - `/studio/admin/audit/page.tsx`
- Lista de eventos de auditoria
- Filtros: ação, protocol, data
- Visualização de metadados

**5.6. Configurações** - `/studio/admin/settings/page.tsx`
- Alterar senha admin

**Autenticação:**
- Cookie httpOnly: `ls_admin_session`
- Token JWT (HMAC) com: authenticated, exp, nonce
- Validação no middleware
- Proteção de rotas `/studio/admin/*`

**Features:**
- Criação de projetos com protocol e PIN automáticos
- Gerenciamento completo de steps
- Registro de pagamentos (recalcula balance automaticamente)
- Upload de arquivos com validação (extensão, tamanho, executáveis bloqueados)
- Versionamento de arquivos
- Liberação condicional de downloads
- Exclusão de projetos (remove arquivos do disco e registros do banco)
- Auditoria completa de ações

---

### 6. Pilar Strategy

**Localização:** `src/app/strategy/`

**Descrição Geral:**
Pilar Strategy apresentando briefings geopolíticos, mapas estratégicos e podcast sobre recursos naturais, clima, conflitos e poder.

#### Estrutura de Rotas

**6.1. Home Strategy** - `/strategy/page.tsx`
- Hero Section: "Mapas estratégicos e análises geopolíticas globais"
- Grid de briefings em destaque
- Grid de mapas em destaque
- Grid de podcasts em destaque
- Links para cada seção

**6.2. Briefings** - `/strategy/briefings/page.tsx`
- Lista de todos os briefings
- Cards com thumbnail, título, resumo, tags
- Filtros por tags
- Link para briefing individual

**6.3. Briefing Individual** - `/strategy/briefings/[slug]/page.tsx`
- Conteúdo completo do briefing (MDX)
- Breadcrumbs
- TOC (Table of Contents)
- Ações: PDF, Compartilhar, Imprimir
- Mapas relacionados
- Briefings relacionados
- Barra sticky com ações

**6.4. Mapas** - `/strategy/maps/page.tsx`
- Lista de todos os mapas
- Cards com thumbnail, título, resumo
- Link para mapa individual

**6.5. Mapa Individual** - `/strategy/maps/[slug]/page.tsx`
- Visualização do mapa (iframe, URL ou HTML)
- Informações do mapa
- Briefings relacionados

**6.6. Podcast** - `/strategy/podcast/page.tsx`
- Lista de todos os podcasts
- Cards com thumbnail, título, duração
- Link para podcast individual

**6.7. Podcast Individual** - `/strategy/podcast/[slug]/page.tsx`
- Player de áudio
- Transcrição (se disponível)
- Informações do podcast

**6.8. Admin Strategy** - `/strategy/admin/*`
- Login admin
- Dashboard de briefings, mapas, podcasts
- Editor de briefings (MDX)
- Upload de PDFs
- Gerenciamento de conteúdo

**Banco de Dados:**
- Model Briefing: slug, title, subtitle, summary, tags, contentMdx, status, publishedAt, pdfUrl, youtubeUrl, relatedMaps
- Model Map: slug, title, summary, tags, mapEmbedType, mapEmbedData, status, publishedAt, relatedBriefing
- Model Podcast: slug, title, summary, tags, audioUrl, youtubeUrl, duration, status, publishedAt, transcriptUrl

**Componentes:**
- BriefingReaderClient
- BriefingEditorialPage
- BriefingPDFManager
- BriefingTOC
- RelatedBriefingsSection
- RelatedMapsSection
- MapDetailClient
- PodcastDetailClient

**Recursos Especiais:**
- Renderização MDX para briefings
- Preview de PDF
- Modo impressão otimizado
- Compartilhamento social
- SEO otimizado

---

### 7. Pilar Academy

**Localização:** `src/app/academy/`

**Descrição Geral:**
Pilar Academy apresentando cursos e trilhas de formação em geotecnologias.

#### Estrutura de Rotas

**7.1. Home Academy** - `/academy/page.tsx`
- Hero Section: "Cursos aplicados de alta performance e objetivos"
- Word Cloud interativa (AcademyPulseWordCloud)
- O que é a LandSpace Academy
- Grid de cursos da Academy
- Como ensinamos
- Áreas de capacitação
- Relação com ferramentas LandSpace

**7.2. Cursos da Academy** - `/academy/[slug]/page.tsx`
- Páginas individuais de curso:
  - `/academy/qgis-automacao`
  - `/academy/r-inteligencia-geoespacial`
  - `/academy/r-mudancas-uso-cobertura`
- Informações do curso
- Módulos
- Pré-requisitos
- Perfil profissional

**7.3. Favoritos** - `/academy/favoritos/page.tsx`
- Lista de cursos favoritados

**7.4. Suporte** - `/academy/suporte/page.tsx`
- Central de suporte

**Componentes:**
- AcademyCourseCard
- AcademyPulseWordCloud

**Recursos Especiais:**
- Word cloud interativa com termos de geotecnologias
- Cards de cursos com hover effects

---

### 8. Pilar Labs

**Localização:** `src/app/labs/page.tsx`

**Descrição Geral:**
Pilar Labs apresentando engenharia de produto geoespacial e validação.

**Seções Principais:**
- Hero Section: "Engenharia de Produto Geoespacial & Validação"
- O que é o Labs
- Validação contínua
- Pesquisa aplicada
- Desenvolvimento
- Padrões de qualidade

**Recursos Especiais:**
- Design consistente com outros pilares
- Ênfase em validação e QA/QC

---

### 9. Páginas Secundárias e Institucionais

**9.1. SOBRE** - `/sobre/page.tsx`
- Missão, visão, valores
- História da LandSpace
- Equipe

**9.2. CONTATO** - `/contato/page.tsx`
- Formulário de contato
- Email: contatos@landspace.io
- Link WhatsApp

**9.3. CONSULTORIA** - `/consultoria/page.tsx`
- Formulário de qualificação
- Processo de consultoria

**9.4. SOLUÇÕES CORPORATIVAS** - `/solucoes/page.tsx`
- Soluções para empresas
- Os 3 pilares corporativos

**9.5. CATÁLOGO** - `/catalogo/*`
- Catálogo completo de ferramentas
- Filtros e busca
- Páginas individuais de ferramenta

**9.6. INSIGHTS** - `/insights/*`
- Blog/artigos técnicos
- Lista de posts
- Post individual

**9.7. TRILHAS** - `/trilhas/page.tsx`
- Trilhas de aprendizado
- Trilha Acadêmica
- Trilha Ambiental e Territorial

**9.8. ROADMAP** - `/roadmap/page.tsx`
- Roadmap da plataforma
- Funcionalidades futuras

**9.9. PARCERIAS** - `/parcerias/page.tsx`
- Parcerias estratégicas

**9.10. SUPORTE** - `/suporte/page.tsx`
- Central de ajuda

---

### 10. Páginas Legais e Institucionais

**10.1. POLÍTICA DE PRIVACIDADE** - `/privacidade/page.tsx`
- Política completa de privacidade
- Seção "Portal do Cliente":
  - Dados coletados (nome, contato, protocolo)
  - Finalidade (acompanhamento de projeto e entrega)
  - Retenção padrão (12 meses)
  - Critérios de exclusão
  - Regra de liberação: entrega final condicionada à quitação do saldo

**10.2. TERMOS DE USO** - `/termos/page.tsx`
- Termos de uso do site

**10.3. POLÍTICA DE COOKIES** - `/cookies/page.tsx`
- Política de cookies

**Componente Legal:**
- LegalPageLayout.tsx (layout padronizado)

---

## 11. Banco de Dados (Prisma)

**Localização:** `prisma/schema.prisma`

### Models Principais

#### 11.1. Strategy (Briefings, Maps, Podcasts)
- **Briefing:** slug, title, subtitle, summary, tags, contentMdx, status, publishedAt, pdfUrl, youtubeUrl, relatedMaps
- **Map:** slug, title, summary, tags, mapEmbedType, mapEmbedData, status, publishedAt, relatedBriefing
- **Podcast:** slug, title, summary, tags, audioUrl, youtubeUrl, duration, status, publishedAt, transcriptUrl

#### 11.2. Portal do Cliente
- **Project:** id, protocol (unique), pinHash, clientName, clientEmail, clientPhone, serviceType, status, totalValue, entryValue, paidValue, balanceValue, finalRelease, createdAt, updatedAt
- **ProjectStep:** id, projectId, stepKey, title, description, state, startedAt, finishedAt, order
- **ProjectFile:** id, projectId, kind (PREVIEW/FINAL), filename, storagePath, version, isLocked, uploadedAt
- **Payment:** id, projectId, method, amount, status, note, createdAt, confirmedAt
- **AuditLog:** id, requestId, userId, protocol, action, entityType, entityId, metadata, ipAddress, userAgent, success, errorMessage, createdAt
- **AdminConfig:** id, key (unique), value, updatedAt, updatedBy

### Enums

- **ServiceType:** PERICIA_EVIDENCIAS, PERICIA_AMBIENTAL, AVALIACAO_RURAL, CAR, GEOREF, OUTROS
- **ProjectStatus:** TRIAGEM, VALIDACAO_DADOS, PROPOSTA, ENTRADA_PAGA, EM_PRODUCAO, QA_INTERNO, PREVIA_ENTREGUE, AJUSTES, FINAL_PRONTO, SALDO_PENDENTE, LIBERADO, ENCERRADO
- **StepState:** PENDING, ACTIVE, DONE
- **FileKind:** PREVIEW, FINAL
- **PaymentMethod:** PIX, BOLETO, CARTAO, AJUSTE
- **PaymentStatus:** PENDING, CONFIRMED, CANCELED
- **ContentStatus:** draft, published, archived
- **MapEmbedType:** iframe, url, html

### Compatibilidade
- **Dev:** SQLite (`file:./prisma/dev.db`)
- **Prod:** Postgres (configurar `DATABASE_URL`)

### Valores Monetários
- Usa Prisma Decimal (não Float)
- Serializado como number nas APIs (2 casas decimais)
- Recalculado sempre no backend

---

## 12. API Routes

### 12.1. Portal do Cliente - `/api/portal/*`

- **POST `/api/portal/login`**
  - Autenticação com protocol + PIN
  - Rate limiting (5 tentativas / 15 min)
  - Retorna erro específico (PROTOCOL_NOT_FOUND / INVALID_PIN)
  - Cria sessão httpOnly

- **POST `/api/portal/logout`**
  - Remove sessão

- **GET `/api/portal/project/[protocol]`**
  - Retorna dados do projeto

- **GET `/api/portal/project/[protocol]/steps`**
  - Retorna steps do projeto

- **GET `/api/portal/project/[protocol]/files`**
  - Retorna arquivos do projeto (com permissões)

- **GET `/api/portal/files/[id]/download`**
  - Download seguro de arquivo
  - Valida sessão e permissões
  - Streaming de arquivo
  - Headers: Content-Disposition, Cache-Control

### 12.2. Admin Portal - `/api/admin/portal/*`

- **POST `/api/admin/portal/login`**
  - Login admin com senha

- **POST `/api/admin/portal/logout`**
  - Logout admin

- **POST `/api/admin/portal/password`**
  - Criar/atualizar senha admin

- **POST `/api/admin/portal/project`**
  - Criar novo projeto
  - Gera protocol e PIN
  - Cria steps padrão

- **GET `/api/admin/portal/project/[id]`**
  - Buscar projeto por ID ou protocol

- **PATCH `/api/admin/portal/project/[id]`**
  - Atualizar projeto
  - Reset PIN

- **DELETE `/api/admin/portal/project/[id]`**
  - Excluir projeto
  - Remove arquivos do disco
  - Remove registros do banco (cascade)

- **POST `/api/admin/portal/project/[id]/steps`**
  - Atualizar steps do projeto

- **POST `/api/admin/portal/project/[id]/payment`**
  - Registrar pagamento
  - Recalcula balance automaticamente

- **POST `/api/admin/portal/project/[id]/files/upload`**
  - Upload de arquivo (Preview/Final)
  - Validação: extensão, tamanho, executáveis bloqueados
  - Versionamento
  - Scan de vírus (opcional, ClamAV)

- **GET `/api/admin/portal/projects`**
  - Lista de projetos (com busca)

- **GET `/api/admin/portal/audit`**
  - Lista de eventos de auditoria (com filtros)

- **GET `/api/admin/portal/cleanup`**
  - Estatísticas de limpeza

- **POST `/api/admin/portal/cleanup`**
  - Executar limpeza de arquivos antigos

### 12.3. Strategy Admin - `/api/admin/briefings/*`
- CRUD de briefings
- Upload de PDFs
- Gerenciamento de conteúdo

### 12.4. Contato - `/api/contato/route.ts`
- POST para processar formulário de contato
- Rate limiting: 10 tentativas/minuto por IP
- Request ID padronizado

### 12.5. Strategy Pulse - `/api/strategy/pulse/route.ts`
- GET para dados do GDELT
- Rate limiting: 100 tentativas/minuto por IP + 20/min por identidade
- SSRF protection: `safeFetchJson()` com allowlist `api.gdeltproject.org`
- Cache com TTL de 1 hora (`src/lib/gdelt/cache.ts`)
- Fallback para mock em caso de erro (determinístico com `QA_CSP=1`)
- Request ID padronizado

### 12.6. Strategy Consultancy - `/api/strategy/consultancy/route.ts`
- POST para formulário de consultoria
- Rate limiting: 10 tentativas/minuto por IP
- Request ID padronizado

### 12.7. Health/Ready Checks - `/api/health`, `/api/ready`
- `/api/health`: Liveness check (sempre 200)
- `/api/ready`: Readiness check (200 se DB OK, 503 se não)
- Request ID padronizado

### 12.8. CSRF Token - `/api/csrf/route.ts`
- GET para obter token CSRF
- Request ID padronizado

### Observabilidade
- **Request ID:** `x-request-id` em todas as requisições e respostas
- **Helper centralizado:** `src/lib/http/request-id.ts`
- **Logs estruturados:** `src/lib/logger.ts` com redaction de dados sensíveis
- **Correlação:** Request ID propagado em todas as rotas de API

---

## 13. Autenticação e Segurança

### 13.1. Portal do Cliente
- **Método:** Cookie httpOnly + JWT (HMAC)
- **Cookie:** `ls_portal_session`
- **Token contém:** protocol, exp (Unix timestamp), nonce
- **Expiração:** 7 dias
- **Validação:** middleware verifica exp e protocol na rota
- **PIN:** hash bcrypt (nunca em texto puro)
- **Path:** `/api/admin` (restrito ao path do cookie)

### 13.2. Admin Portal
- **Método:** Cookie httpOnly + JWT (HMAC)
- **Cookie:** `ls_admin_session`
- **Token contém:** authenticated, exp, nonce
- **Senha:** armazenada em `process.env.ADMIN_PASSWORD` (comparação com `crypto.timingSafeEqual`)
- **Runtime:** Node.js (forçado via `export const runtime = 'nodejs'`)
- **Path:** `/api/admin` (restrito ao path do cookie)
- **Rate Limiting:** 5 tentativas/minuto por IP (específico para `/api/admin/login`)

### 13.3. Middleware (`middleware.ts`)
- **Proteção de rotas:**
  - `/api/admin/*` → retorna 401 JSON (não redirect) se não autenticado
  - `/api/admin/login` e `/api/admin/logout` → bypass (acessíveis sem sessão)
  - `/studio/portal/[protocol]*` → redireciona para login se não autenticado
  - `/studio/admin/*` → redireciona para login se não autenticado
- **Validação:** JWT Edge-safe usando `jose.jwtVerify`
- **Request ID:** sempre presente em respostas 401 (reutiliza `x-request-id` do cliente ou gera novo)
- **Cache-Control:** `no-store` + `Pragma: no-cache` em todas as respostas 401

### 13.4. Rate Limiting (`src/lib/security/rateLimit.ts`)
- **Estratégia:** Fixed window (janela de tempo) com Map in-memory
- **Persistência:** `globalThis.__lsRateLimitStore` (sobrevive HMR em dev)
- **Aplicado em:**
  - `/api/admin/login`: 5 tentativas/minuto por IP
  - `/api/portal/login`: 5 tentativas/15min por IP + protocol
  - `/api/admin/portal/login`: 5 tentativas/15min por IP
  - `/api/strategy/pulse`: 100 tentativas/minuto por IP + 20/min por identidade
  - `/api/strategy/consultancy`: 10 tentativas/minuto por IP
  - `/api/contato`: 10 tentativas/minuto por IP
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`
- **Resposta 429:** JSON com `{ error: 'rate_limited', requestId, ... }` + `x-request-id`
- **Bypass:** `QA_CSP=1` em dev (para testes determinísticos)

### 13.5. SSRF Protection (`src/lib/security/ssrf.ts`)
- **Funções:**
  - `assertAllowedUrl()`: valida URL contra allowlist de hosts
  - `safeFetchJson()`: fetch seguro com timeout, validação de Content-Type e limite de tamanho
- **Proteções:**
  - HTTPS only
  - Allowlist de hosts (`api.gdeltproject.org`)
  - Bloqueio de credenciais embutidas em URL
  - Bloqueio de portas não padrão (apenas 443)
  - Bloqueio de IPs privados
  - Timeout com `AbortController` (5s padrão)
  - `redirect: 'error'` (não segue redirects)
  - Validação de `Content-Type: application/json`
  - Limite de payload: 1MB
- **Aplicado em:** `src/lib/gdelt/fetch.ts`

### 13.6. HTML Sanitization (`src/lib/sanitize-html.ts`)
- **Biblioteca:** `sanitize-html` (allowlist robusta)
- **Tags permitidas:** `p`, `br`, `strong`, `em`, `ul`, `ol`, `li`, `blockquote`, `code`, `pre`, `h1-h6`, `a`, `hr`, `span`
- **Atributos permitidos:** `a: ['href', 'name', 'target', 'rel']`
- **Esquemas permitidos:** `http`, `https`, `mailto`
- **Bloqueios:**
  - `javascript:`, `vbscript:`, `data:text/html`
  - Tags perigosas: `script`, `iframe`, `object`, `embed`, `svg`, `math`, `form`, `input`
  - Atributos perigosos: `on*`, `style`, `srcdoc`, `formaction`, `xlink:href`
- **Transformações:** `rel="noopener noreferrer"` em links externos com `target="_blank"`

### 13.7. MDX Security (`src/lib/mdx-security.ts`)
- **Wrapper:** `SafeMDXRemote` (`src/components/security/SafeMDXRemote.tsx`)
- **Validações (fail-fast):**
  - Bloqueia `import/export` (ESM)
  - Bloqueia expressões MDX `{...}`
  - Bloqueia tags perigosas: `script`, `iframe`, `object`, `embed`, `svg`, `math`, `form`, `input`, `style`, `link`, `meta`
  - Bloqueia atributos de evento (`on*`)
  - Bloqueia URLs perigosas: `javascript:`, `vbscript:`, `data:text/html`
  - Limite de tamanho: 200KB (DoS protection)
- **Redução de falsos positivos:** `stripCode()` remove code blocks antes de validar
- **Aplicado em:** Todos os usos de `MDXRemote` substituídos por `SafeMDXRemote`

### 13.8. Content Security Policy (`src/lib/security/csp.ts`, `src/proxy.ts`)
- **Nonce por request:** Base64URL gerado com Web Crypto
- **CSP strict:**
  - `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'` (prod) + `'unsafe-eval'` (dev)
  - `style-src 'self' 'nonce-${nonce}'` (sem `unsafe-inline`)
  - `style-src-attr 'unsafe-hashes'` com hashes SHA256 específicos
  - `default-src 'self'`
  - `frame-ancestors 'none'`
  - `upgrade-insecure-requests` (prod)
- **Aplicação:** Via `src/proxy.ts` (matcher global) e `src/app/layout.tsx` (renderização dinâmica)

### 13.9. Request ID e Observabilidade (`src/lib/http/request-id.ts`)
- **Helper centralizado:**
  - `getOrCreateRequestId()`: reutiliza `x-request-id` do cliente ou gera UUID
  - `jsonWithRequestId()`: cria NextResponse JSON com `x-request-id` no header e `requestId` no body (erros >=400)
  - `withRequestIdHeaders()`: adiciona `x-request-id` a qualquer Response
  - `setNoStore()`: adiciona `Cache-Control: no-store` + `Pragma: no-cache`
- **Aplicado em:** Todas as rotas de API (públicas e admin)
- **Logs estruturados:** `src/lib/logger.ts` com redaction de dados sensíveis

### 13.10. Upload Security
- **Validação:** `src/lib/upload-validation.ts`
  - Extensão de arquivo (allowlist)
  - Tamanho máximo
  - Bloqueio de executáveis
  - Nome de arquivo seguro (sanitização)
  - Path traversal prevention
- **Scan de vírus:** Opcional via ClamAV (`src/lib/virus-scan.ts`)
- **Storage:** Arquivos em `/uploads` (não em `/public` para evitar acesso direto)

### 13.11. Download Security
- **Validação de sessão:** JWT válido e não expirado
- **Validação de permissões:** Regras de liberação (Preview/Final)
- **Validação de protocol:** Arquivo pertence ao projeto da sessão
- **Streaming:** Nunca expor `storagePath` diretamente
- **Headers:** `Content-Disposition`, `Cache-Control: no-store`, `Pragma: no-cache`

### 13.12. Cache-Control Anti-Cache
- **Helper:** `setNoStore()` em `src/lib/http/request-id.ts`
- **Aplicado em:**
  - Todas as respostas de `/api/admin/login` (200/400/401/429/500)
  - Todas as respostas 429 do rate limiter
  - Todas as respostas 401 do middleware
- **Headers:** `Cache-Control: no-store` + `Pragma: no-cache`

### 13.13. Validação de Input (Zod)
- **Schemas:** `src/lib/schemas/` (admin, portal, contato, briefings)
- **Aplicado em:** Endpoints de API para validação de body/query params
- **Sanitização:** HTML sanitizado antes de armazenar (briefings, conteúdo MDX)

### 13.14. Timing Attack Protection
- **Admin Login:** `crypto.timingSafeEqual()` para comparação de senha
- **CSRF:** `constantTimeEqual()` (XOR em charCodeAt) em `src/lib/csrf-guard.ts`
- **PIN:** `bcrypt.compare()` (já é timing-safe)

### 13.15. Environment Variables (`src/lib/env.ts`)
- **Validação centralizada:** Sem fallbacks inseguros
- **Obrigatórias:** `SESSION_SECRET` (>=32), `PREVIEW_SECRET` (>=32), `DATABASE_URL`, `ADMIN_PASSWORD`
- **Opcionais:** `ADMIN_KEY` (>=24), `DRAFT_MODE_SECRET` (>=32), `REDIS_URL`, etc.
- **Fail-fast:** Lança erro se obrigatória faltar (nunca usa valor padrão inseguro)

---

## 14. Componentes Globais

### 14.1. HEADER - `src/components/Header.tsx`
- Navegação principal
- Logo "LandSpace"
- Links: Tech, Studio, Strategy, Academy, Labs
- Link "Portal" (ícone de usuário) → `/studio/portal`
- Botão de favoritos
- Sticky header com efeito de scroll
- Responsivo (menu mobile)

### 14.2. FOOTER - `src/components/Footer.tsx`
- Redes sociais
- Grid de tecnologias
- Menu de navegação
- Copyright e links legais
- Informação de segurança

### 14.3. WHATSAPP BUTTON - `src/components/WhatsAppButton.tsx`
- Botão flutuante fixo
- Link: https://wa.me/5564999082421
- Animação de pulse

### 14.4. COURSE CARD - `src/components/CourseCard.tsx`
- Card reutilizável para cursos
- Imagem, título, tags, preço
- Botão de compra/explorar

### 14.5. ACADEMY COURSE CARD - `src/components/AcademyCourseCard.tsx`
- Card específico para Academy

### 14.6. LOADING SCREEN - `src/components/LoadingScreen.tsx`
- Tela de carregamento inicial

### 14.7. LEGAL PAGE LAYOUT - `src/components/LegalPageLayout.tsx`
- Layout padronizado para páginas legais

### 14.8. STUDIO COMPONENTS
- StudioServiceHero
- PackageCards
- DeliverablesList
- DataRequirements
- ScopeRules
- ProtocolCTA
- ServiceDetailModal
- ThematicPageTemplate

### 14.9. STRATEGY COMPONENTS
- BriefingReaderClient
- BriefingEditorialPage
- BriefingPDFManager
- BriefingTOC
- RelatedBriefingsSection
- RelatedMapsSection
- MapDetailClient
- PodcastDetailClient

---

## 15. Contextos e Estado Global

### 15.1. CART CONTEXT - `src/contexts/CartContext.tsx`
- Gerenciamento de estado do carrinho
- Provider envolvendo a aplicação

---

## 16. Utilitários e Bibliotecas

### 16.1. PORTAL AUTH - `src/lib/portal-auth.ts`
- `generateProtocol()`: gera protocol LS-YYYY-XXXXXX
- `generatePin()`: gera PIN de 6 dígitos
- `hashPin()`: hash bcrypt do PIN
- `verifyPin()`: verifica PIN
- `loginPortal()`: autenticação portal
- `createPortalSession()`: cria sessão portal
- `getPortalSession()`: obtém sessão portal
- `createAdminSession()`: cria sessão admin
- `getAdminSession()`: obtém sessão admin
- `LoginResult`: tipo de retorno do login

### 16.2. PORTAL UTILS - `src/lib/portal-utils.ts`
- `recalculateProjectBalance()`: recalcula paidValue e balanceValue
- `getDefaultSteps()`: retorna steps padrão
- `createDefaultSteps()`: cria steps padrão para projeto
- `canDownloadPreview()`: verifica permissão de download Preview
- `canDownloadFinal()`: verifica permissão de download Final

### 16.3. RATE LIMITING - `src/lib/security/rateLimit.ts`
- `withRateLimit()`: HOC para aplicar rate limiting em handlers
- `getClientIp()`: obtém IP do cliente (x-forwarded-for, x-real-ip, cf-connecting-ip)
- `checkRateLimit()`: lógica de fixed window
- `parseIdentityFromBody()`: extrai identidade (email/username) do body
- **Store:** Map in-memory com `globalThis` para persistir em HMR
- **Bypass:** `QA_CSP=1` em dev (para testes determinísticos)

### 16.4. SSRF PROTECTION - `src/lib/security/ssrf.ts`
- `assertAllowedUrl()`: valida URL contra allowlist de hosts
- `safeFetchJson()`: fetch seguro com timeout, validação de Content-Type e limite de tamanho
- **Proteções:** HTTPS only, allowlist, bloqueio de credenciais/portas/IPs privados, timeout, redirect blocking

### 16.5. HTML SANITIZATION - `src/lib/sanitize-html.ts`
- `sanitizeHtml()`: sanitização robusta usando `sanitize-html` com allowlist estrita
- **Bloqueios:** javascript:, vbscript:, data: perigosos, tags/atributos perigosos
- **Transformações:** `rel="noopener noreferrer"` em links externos

### 16.6. MDX SECURITY - `src/lib/mdx-security.ts`
- `assertSafeMdx()`: validação fail-fast de conteúdo MDX
- `stripCode()`: remove code blocks para reduzir falsos positivos
- **Bloqueios:** import/export, expressões MDX, tags/atributos perigosos, URLs perigosas
- **Limite:** 200KB (DoS protection)

### 16.7. CSP - `src/lib/security/csp.ts`
- `generateNonce()`: gera nonce Base64URL
- `applyCSPHeaders()`: aplica CSP com nonce por request
- **Aplicação:** Via `src/proxy.ts` (matcher global)

### 16.8. REQUEST ID - `src/lib/http/request-id.ts`
- `getOrCreateRequestId()`: obtém ou cria Request ID
- `jsonWithRequestId()`: cria NextResponse JSON com request ID
- `withRequestIdHeaders()`: adiciona `x-request-id` a Response
- `setNoStore()`: adiciona headers anti-cache

### 16.9. OBSERVABILITY - `src/lib/observability.ts`
- `getRequestId()`: obtém ou gera request ID (legado, usar `getOrCreateRequestId`)
- `addRequestIdHeader()`: adiciona header x-request-id (legado, usar helpers de `request-id.ts`)
- `logStructured()`: log estruturado em JSON

### 16.10. LOGGER - `src/lib/logger.ts`
- `logSafe()`: log estruturado com redaction automática de dados sensíveis
- `redactSensitive()`: mascaramento de PINs, senhas, tokens

### 16.5. AUDIT - `src/lib/audit.ts`
- `auditLog()`: registra evento de auditoria
- `AuditActions`: enum de ações auditadas

### 16.6. UPLOAD VALIDATION - `src/lib/upload-validation.ts`
- `validateFileExtension()`: valida extensão
- `validateFileSize()`: valida tamanho
- `isExecutable()`: verifica se é executável
- `generateSafeFilename()`: gera nome seguro

### 16.7. UPLOAD CLEANUP - `src/lib/upload-cleanup.ts`
- `identifyOldFiles()`: identifica arquivos antigos
- `cleanupOldFiles()`: remove arquivos antigos
- Retenção: 12 meses após encerramento

### 16.8. VIRUS SCAN - `src/lib/virus-scan.ts`
- `scanFile()`: scan de vírus (ClamAV opcional)
- Fallback: aceita arquivo se ClamAV não disponível

### 16.9. ADMIN CONFIG - `src/lib/admin-config.ts`
- `getAdminPassword()`: obtém senha admin do banco
- `setAdminPassword()`: define senha admin no banco
- `verifyAdminPassword()`: verifica senha admin

### 16.10. BRANDING - `src/lib/branding.ts`
- Configuração de nomes dos pilares
- SEO metadata por página
- Helpers para acesso rápido

---

## 17. Variáveis de Ambiente

### Obrigatórias
- `DATABASE_URL`: URL do banco (PostgreSQL gerenciado em prod, SQLite apenas dev local)
- `DIRECT_URL`: URL direta para migrations (geralmente igual a DATABASE_URL, exceto em Neon que separa pooler vs direto)
- `SESSION_SECRET`: Secret para JWT (mínimo 32 caracteres, obrigatório)
- `PREVIEW_SECRET`: Secret para preview mode (mínimo 32 caracteres, obrigatório)
- `ADMIN_PASSWORD`: Senha admin para `/api/admin/login` (obrigatório, comparado com `crypto.timingSafeEqual`)

### Opcionais
- `ADMIN_KEY`: Chave admin (>=24 caracteres, opcional, não usado mais no login)
- `DRAFT_MODE_SECRET`: Secret para Draft Mode (>=32 caracteres, opcional mas recomendado)
- `REDIS_URL`: URL do Redis (para rate limiting persistente, opcional)
- `CLAMAV_ENABLED`: true/false (habilitar scan de vírus, opcional)
- `CLAMAV_SOCKET`: Caminho do socket ClamAV (opcional)
- `NODE_ENV`: development/production
- `USE_MOCK_GDELT`: true/false (usar mock do GDELT em dev/test, opcional)
- `QA_CSP`: 1 (habilitar modo QA determinístico, opcional)

---

## 18. Problemas Conhecidos e Limitações

### 18.1. Portal do Cliente - Login
**PROBLEMA:** Login pode falhar mesmo com credenciais corretas

**CAUSA POSSÍVEL:**
- Normalização de protocol (uppercase/trim) inconsistente
- Cache do navegador
- Problemas de encoding de caracteres

**STATUS:** Em investigação

**SOLUÇÃO TEMPORÁRIA:**
- Endpoint de teste: `/api/portal/test-login`
- Logs detalhados no console do servidor
- Mensagens de erro específicas na UI

### 18.2. Portal do Cliente - Erro desaparece rápido
**PROBLEMA:** Mensagem de erro desaparece automaticamente

**STATUS:** ✅ RESOLVIDO

**SOLUÇÃO:** Erro permanece visível até usuário fechar ou digitar novamente

### 18.3. Admin - Senha padrão não funciona
**PROBLEMA:** `change-me-in-production` não funciona

**STATUS:** ✅ RESOLVIDO

**SOLUÇÃO:** Senha agora é gerenciada via banco de dados (AdminConfig)

### 18.4. Upload de Arquivos - Tamanho máximo
**LIMITAÇÃO:** Tamanho máximo não configurado globalmente

**STATUS:** Configurado por endpoint

**RECOMENDAÇÃO:** Configurar limite global no Next.js

### 18.5. Rate Limiting - Persistência
**LIMITAÇÃO:** Rate limiting em memória não persiste entre reinicializações

**STATUS:** Funcional com Redis opcional

**RECOMENDAÇÃO:** Usar Redis em produção

### 18.6. Scan de Vírus - Opcional
**LIMITAÇÃO:** ClamAV não é obrigatório

**STATUS:** Funcional sem ClamAV (aceita arquivos)

**RECOMENDAÇÃO:** Configurar ClamAV em produção

---

## 19. Sugestões de Melhorias e Próximos Passos

### 19.1. PORTAL DO CLIENTE - Melhorias Urgentes
**PRIORIDADE:** 🔴 ALTA

#### a) Corrigir Login
- Investigar problema de normalização de protocol
- Adicionar testes unitários para `loginPortal()`
- Melhorar logs de debug
- Adicionar métricas de tentativas de login falhadas

#### b) Upload de Comprovante pelo Cliente
- Implementar endpoint `POST /api/portal/project/[protocol]/proof`
- Adicionar campo `proofUrl` em Payment
- UI para upload de comprovante na página do projeto
- Notificação admin quando comprovante é enviado

#### c) Notificações por Email
- Email quando projeto é criado (com protocol e PIN)
- Email quando step é atualizado
- Email quando arquivo é disponibilizado
- Email quando saldo está pendente
- Email quando entrega final é liberada

#### d) Melhorias de UX
- Loading states mais claros
- Feedback visual de ações (toast notifications)
- Confirmação antes de ações destrutivas
- Histórico de atividades do projeto
- Timeline interativa com mais detalhes

### 19.2. INTEGRAÇÃO BANCO DO BRASIL (Fase 2)
**PRIORIDADE:** 🟡 MÉDIA

#### a) Implementar BillingProvider
- Criar `BancoDoBrasilBillingProvider`
- Implementar `createPixCharge()`
- Implementar `createBoleto()`
- Implementar `confirmPaymentWebhook()`
- Configurar webhook URL no BB

#### b) Fluxo de Pagamento
- Botão "Pagar saldo" gera cobrança Pix/Boleto
- QR Code Pix exibido na página
- Boleto PDF disponível para download
- Webhook confirma pagamento automaticamente
- Notificação ao cliente quando pagamento é confirmado

#### c) Gestão de Cobranças
- Tabela PaymentCharge no banco
- Rastreamento de status de cobrança
- Reenvio de cobrança
- Cancelamento de cobrança

### 19.3. ADMIN PORTAL - Melhorias
**PRIORIDADE:** 🟡 MÉDIA

#### a) Dashboard Melhorado
- Gráficos de projetos por status
- Gráficos financeiros (receita, saldo pendente)
- Filtros avançados (data, valor, status)
- Exportação de relatórios (CSV, PDF)
- Busca avançada (múltiplos campos)

#### b) Gerenciamento de Steps
- Drag and drop para reordenar steps
- Templates de steps por tipo de serviço
- Notas internas em steps
- Anexos em steps

#### c) Gestão de Arquivos
- Preview de arquivos (imagens, PDFs)
- Histórico de versões
- Comparação de versões
- Download em lote
- Organização por pastas/tags

### 19.4. STRATEGY - Melhorias
**PRIORIDADE:** 🟢 BAIXA

#### a) Editor MDX Melhorado
- Preview em tempo real
- Suporte a mais componentes MDX
- Upload de imagens inline
- Autocomplete de tags
- Validação de links

#### b) SEO e Performance
- Sitemap dinâmico
- RSS feed para briefings
- Open Graph images automáticas
- Schema.org markup
- Lazy loading de mapas

#### c) Interatividade
- Comentários em briefings (opcional)
- Compartilhamento social melhorado
- Newsletter de novos briefings
- Favoritos de briefings

### 19.5. ACADEMY - Melhorias
**PRIORIDADE:** 🟢 BAIXA

#### a) Área do Aluno
- Progresso de cursos
- Certificados
- Fórum de discussão
- Materiais complementares

#### b) Integração com Hotmart
- Webhook de compra
- Sincronização de alunos
- Acesso automático após compra

### 19.6. INFRAESTRUTURA E DEVOPS
**PRIORIDADE:** 🔴 ALTA

#### a) CI/CD
- GitHub Actions para testes
- Deploy automático
- Rollback automático em caso de erro
- Testes E2E com Playwright

#### b) Monitoramento
- Sentry para erros
- Analytics (Plausible ou similar)
- Uptime monitoring
- Performance monitoring (Web Vitals)

#### c) Backup e Disaster Recovery
- Backup automático do banco (diário)
- Backup de arquivos (`/uploads`)
- Plano de recuperação documentado
- Testes de restore periódicos

#### d) Escalabilidade
- CDN para assets estáticos
- Cache de queries frequentes (Redis)
- Otimização de imagens (Next.js Image)
- Lazy loading de componentes pesados

### 19.7. SEGURANÇA - Melhorias
**PRIORIDADE:** 🔴 ALTA

#### a) Autenticação
- 2FA para admin (opcional)
- Rate limiting mais agressivo
- Bloqueio de IP após múltiplas tentativas
- Logs de segurança centralizados

#### b) Dados Sensíveis
- Criptografia de dados sensíveis no banco
- Mascaramento de PINs em logs
- Rotação de secrets
- Auditoria de acesso a dados sensíveis

#### c) Compliance
- LGPD compliance completo
- Política de retenção de dados
- Direito ao esquecimento
- Exportação de dados do usuário

### 19.8. TESTES
**PRIORIDADE:** 🟡 MÉDIA

#### a) Testes Unitários
- Utilitários (portal-auth, portal-utils)
- Cálculos financeiros
- Validações de upload
- Rate limiting

#### b) Testes de Integração
- Fluxo completo de login
- Criação de projeto
- Upload e download de arquivos
- Registro de pagamento

#### c) Testes E2E
- Fluxo completo do cliente (login → ver projeto → baixar arquivo)
- Fluxo completo do admin (login → criar projeto → upload → liberar)
- Testes de regressão

### 19.9. DOCUMENTAÇÃO
**PRIORIDADE:** 🟡 MÉDIA

#### a) Documentação Técnica
- API documentation (OpenAPI/Swagger)
- Diagramas de arquitetura
- Guias de desenvolvimento
- Troubleshooting guide

#### b) Documentação de Usuário
- Manual do cliente (como usar o portal)
- Manual do admin
- FAQ
- Vídeos tutoriais

### 19.10. PERFORMANCE
**PRIORIDADE:** 🟡 MÉDIA

#### a) Otimizações
- Code splitting mais agressivo
- Prefetch de rotas importantes
- Otimização de queries do Prisma
- Cache de páginas estáticas (ISR)

#### b) Bundle Size
- Análise de bundle size
- Remoção de dependências não usadas
- Tree shaking
- Lazy loading de bibliotecas pesadas

---

## 20. Estrutura de Arquivos Atualizada

```
src/
├── app/
│   ├── academy/                    # Pilar Academy
│   │   ├── cursos/
│   │   ├── favoritos/
│   │   ├── suporte/
│   │   ├── data.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── adm/                        # Redirect para admin
│   ├── api/
│   │   ├── admin/
│   │   │   ├── briefings/          # Admin Strategy
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   └── portal/             # Admin Portal APIs
│   │   ├── contato/
│   │   ├── portal/                 # Portal APIs
│   │   ├── preview/
│   │   └── strategy/
│   ├── catalogo/                   # Catálogo de ferramentas
│   ├── consultoria/
│   ├── contato/
│   ├── cookies/
│   ├── corporativo/
│   ├── favoritos/
│   ├── insights/                    # Blog/Artigos
│   ├── keystatic/                  # CMS (Keystatic)
│   ├── labs/                       # Pilar Labs
│   ├── lista-interesse/
│   ├── parcerias/
│   ├── politica-cookies/
│   ├── politica-privacidade/
│   ├── privacidade/
│   ├── roadmap/
│   ├── sobre/
│   ├── sobre-o-instrutor/
│   ├── strategy/                   # Pilar Strategy
│   │   ├── admin/                  # Admin Strategy
│   │   ├── briefings/
│   │   ├── consultancy/
│   │   ├── maps/
│   │   └── podcast/
│   ├── studio/                     # Pilar Studio
│   │   ├── admin/                  # Admin Portal
│   │   │   ├── audit/
│   │   │   ├── login/
│   │   │   ├── project/
│   │   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── portal/                 # Portal do Cliente
│   │   │   ├── [protocol]/
│   │   │   └── page.tsx
│   │   ├── components/
│   │   ├── [várias páginas temáticas]/
│   │   ├── _data/
│   │   ├── studio.data.ts
│   │   └── page.tsx
│   ├── suporte/
│   ├── tech/                       # Pilar Tech
│   ├── termos/
│   ├── termos-uso/
│   ├── trilhas/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    # Home
├── components/
│   ├── academy/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── CourseCard.tsx
│   ├── AcademyCourseCard.tsx
│   ├── LoadingScreen.tsx
│   └── LegalPageLayout.tsx
├── contexts/
│   └── CartContext.tsx
├── lib/
│   ├── portal-auth.ts
│   ├── portal-utils.ts
│   ├── billing-provider.ts
│   ├── rate-limit/
│   ├── rate-limit-redis.ts
│   ├── observability.ts
│   ├── audit.ts
│   ├── upload-validation.ts
│   ├── upload-cleanup.ts
│   ├── virus-scan.ts
│   ├── admin-config.ts
│   ├── branding.ts
│   ├── prisma.ts
│   └── utils.ts
├── middleware.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

---

## 21. Resumo Estatístico Atualizado

**TOTAL DE PÁGINAS:** ~80+ páginas
- 1 Home
- 5 Pilares (Tech, Studio, Strategy, Academy, Labs)
- 20+ Páginas temáticas do Studio
- 50+ Briefings/Maps/Podcasts (Strategy)
- Portal do Cliente (3 rotas principais)
- Admin Portal (6 rotas principais)
- Admin Strategy (múltiplas rotas)
- 10+ Páginas Institucionais/Legais
- Várias páginas secundárias

**COMPONENTES:** 20+ componentes principais  
**CONTEXTOS:** 1 (CartContext)  
**API ROUTES:** 30+ endpoints  
**ARQUIVOS DE DADOS:** 5+ (cursos, blog, academy, studio, strategy)  
**MODELS PRISMA:** 8 models principais

---

## 22. Checklist para IA ChatGPT - Problemas e Soluções

### 22.1. PROBLEMA: Login do Portal não funciona

**INVESTIGAÇÃO NECESSÁRIA:**
- Verificar normalização de protocol no banco vs. busca
- Verificar hash do PIN (bcrypt)
- Verificar logs do servidor durante tentativa de login
- Testar endpoint `/api/portal/test-login` com credenciais conhecidas
- Verificar se projeto existe no banco com protocol exato

**SOLUÇÃO SUGERIDA:**
- Adicionar índice único case-insensitive no protocol (se possível)
- Normalizar protocol sempre em UPPERCASE antes de salvar
- Adicionar teste unitário para `loginPortal()`
- Melhorar logs de debug com comparação caractere por caractere

### 22.2. PROBLEMA: Erro desaparece muito rápido
**STATUS:** ✅ RESOLVIDO
- Erro agora permanece visível até usuário fechar ou digitar novamente

### 22.3. PROBLEMA: Admin password não funciona
**STATUS:** ✅ RESOLVIDO
- Senha agora é gerenciada via banco de dados

### 22.4. PROBLEMA: Pagamento não está sendo contabilizado

**INVESTIGAÇÃO NECESSÁRIA:**
- Verificar se Payment está sendo criado com status CONFIRMED
- Verificar se `recalculateProjectBalance()` está sendo chamado
- Verificar valores no banco (paidValue, balanceValue)
- Verificar logs de auditoria do pagamento

**SOLUÇÃO SUGERIDA:**
- Adicionar trigger no banco para recalcular automaticamente
- Adicionar validação: paidValue nunca pode ser maior que totalValue
- Adicionar teste unitário para `recalculateProjectBalance()`

### 22.5. PROBLEMA: Arquivo não está sendo encontrado no download

**INVESTIGAÇÃO NECESSÁRIA:**
- Verificar se storagePath está correto
- Verificar se arquivo existe no disco
- Verificar permissões de leitura
- Verificar se projeto do arquivo corresponde ao protocol da sessão

**SOLUÇÃO SUGERIDA:**
- Adicionar validação de existência do arquivo antes de servir
- Adicionar log de erro detalhado se arquivo não encontrado
- Verificar path traversal prevention

### 22.6. PROBLEMA: Rate limiting não está funcionando

**INVESTIGAÇÃO NECESSÁRIA:**
- Verificar se Redis está configurado (se usando)
- Verificar se fallback in-memory está funcionando
- Verificar se `getClientIP()` está retornando IP correto
- Verificar logs de rate limit

**SOLUÇÃO SUGERIDA:**
- Adicionar teste unitário para rate limiting
- Verificar se headers Retry-After estão sendo enviados
- Adicionar métricas de rate limiting

### 22.7. PROBLEMA: Upload de arquivo grande falha

**INVESTIGAÇÃO NECESSÁRIA:**
- Verificar limite de tamanho no Next.js
- Verificar limite de tamanho no servidor (nginx/apache)
- Verificar timeout de upload
- Verificar espaço em disco

**SOLUÇÃO SUGERIDA:**
- Configurar bodyParser no Next.js
- Adicionar progress bar no upload
- Implementar upload em chunks (futuro)

### 22.8. PROBLEMA: Performance lenta em listagens

**INVESTIGAÇÃO NECESSÁRIA:**
- Verificar queries do Prisma (N+1 queries)
- Verificar índices no banco
- Verificar cache de páginas
- Verificar tamanho de bundle

**SOLUÇÃO SUGERIDA:**
- Adicionar paginação nas listagens
- Adicionar cache Redis para queries frequentes
- Otimizar queries com select específico
- Adicionar lazy loading

---

## 23. Comandos Úteis para Desenvolvimento

### Desenvolvimento
```bash
npm run dev                    # Inicia servidor de desenvolvimento
npm run build                  # Build de produção
npm run start                  # Inicia servidor de produção
```

### Banco de Dados
```bash
npm run db:generate            # Gera Prisma Client
npm run db:push                # Aplica schema ao banco (dev)
npm run db:migrate             # Cria migration (prod)
npm run db:seed                # Executa seed (cria projeto demo)
```

### Linting e Formatação
```bash
npm run lint                   # Executa ESLint
npm run type-check             # Verifica tipos TypeScript
```

### Testes (quando implementados)
```bash
npm run test                   # Executa testes unitários
npm run test:e2e               # Executa testes E2E
npm run test:watch             # Executa testes em modo watch
```

### Utilitários
```bash
npm run cleanup:uploads        # Limpa arquivos antigos (futuro)
```

---

## 24. Recursos e Referências

### Documentação
- `README.md`: Visão geral do projeto
- `README_PORTAL.md`: Documentação completa do Portal do Cliente
- `ARQUITETURA_SITE_COMPLETA.md`: Este arquivo

### Tecnologias
- **Next.js 16:** https://nextjs.org/docs
- **Prisma:** https://www.prisma.io/docs
- **Tailwind CSS 4:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

### Bibliotecas Principais
- `jose`: JWT/HMAC tokens
- `bcryptjs`: Hash de senhas
- `@prisma/client`: ORM
- `lucide-react`: Ícones

### Integrações Futuras
- Banco do Brasil API (Pix/Boleto)
- ClamAV (scan de vírus)
- Redis (rate limiting, cache)
- Sentry (monitoramento de erros)
- Plausible (analytics)

---

**Última atualização:** Janeiro 2025  
**Versão:** 3.0  
**Próxima revisão:** Após implementação de melhorias críticas

---

## 25. Hardening de Segurança Implementado (Big Tech Standard)

### ✅ Implementações Recentes (2025)

#### Rate Limiting
- ✅ Aplicado em todos os endpoints públicos (`/api/strategy/pulse`, `/api/strategy/consultancy`, `/api/contato`)
- ✅ Aplicado em todos os endpoints de login (admin, portal)
- ✅ Headers `X-RateLimit-*` e `Retry-After` padronizados
- ✅ Request ID incluído em respostas 429

#### SSRF Protection
- ✅ `assertAllowedUrl()` e `safeFetchJson()` implementados
- ✅ Aplicado em `src/lib/gdelt/fetch.ts`
- ✅ Allowlist de hosts, timeout, validação de Content-Type, limite de tamanho

#### HTML Sanitization
- ✅ Substituído regex por `sanitize-html` com allowlist robusta
- ✅ Bloqueio de `javascript:`, `vbscript:`, `data:` perigosos
- ✅ Bloqueio de tags/atributos perigosos
- ✅ `rel="noopener noreferrer"` em links externos

#### MDX Security
- ✅ `SafeMDXRemote` wrapper implementado
- ✅ Bloqueio de import/export, expressões MDX, tags/atributos perigosos
- ✅ Limite de tamanho (200KB)
- ✅ Redução de falsos positivos com `stripCode()`

#### CSP (Content Security Policy)
- ✅ Nonce por request (Base64URL)
- ✅ CSP strict sem `unsafe-inline` em scripts/styles
- ✅ `style-src-attr` com hashes SHA256 específicos
- ✅ Aplicado via `src/proxy.ts` e `src/app/layout.tsx`

#### Request ID Padronizado
- ✅ Helper centralizado em `src/lib/http/request-id.ts`
- ✅ Aplicado em todas as rotas de API (públicas e admin)
- ✅ `x-request-id` sempre presente em headers
- ✅ `requestId` no body de erros (>=400)

#### Cache-Control Anti-Cache
- ✅ `setNoStore()` helper implementado
- ✅ Aplicado em todas as respostas sensíveis (login, admin, rate limit)
- ✅ `Cache-Control: no-store` + `Pragma: no-cache`

#### Admin Login Hardening
- ✅ Runtime Node.js forçado (`export const runtime = 'nodejs'`)
- ✅ Validação robusta de body (text → JSON parse)
- ✅ `crypto.timingSafeEqual()` para comparação de senha
- ✅ `ADMIN_PASSWORD` de `process.env` (não mais do banco)
- ✅ Status codes corretos: 400 (bad request), 401 (credenciais inválidas), 500 (erro interno)

#### Middleware Admin API
- ✅ Rotas `/api/admin/*` retornam 401 JSON (não redirect)
- ✅ `/api/admin/login` e `/api/admin/logout` com bypass (acessíveis sem sessão)
- ✅ Request ID sempre presente
- ✅ Cache-Control: no-store em respostas 401

#### Environment Variables
- ✅ Validação centralizada em `src/lib/env.ts`
- ✅ Sem fallbacks inseguros
- ✅ Fail-fast se obrigatória faltar
- ✅ Validação de comprimentos mínimos

#### CI/CD Security
- ✅ GitHub Actions workflow (`.github/workflows/security.yml`)
- ✅ `npm audit --audit-level=high` como gate
- ✅ Dependency Review para pull requests
- ✅ Prisma Client generation no CI
- ✅ Validação de env vars no CI

### ⚠️ Pendências (Backlog)

#### P0 (Crítico)
- ❌ CSRF protection em todos os endpoints mutáveis (parcial - existe `csrf-guard.ts` mas não aplicado em todos)
- ❌ Rate limiting distribuído (Redis) em produção (atualmente in-memory)

#### P1 (Alto)
- ❌ Rotação de sessão (JWT fixo por 7 dias, sem refresh token)
- ❌ WAF/CDN em produção (Vercel tem básico, mas pode melhorar)
- ❌ Monitoramento de segurança (alertas, SIEM)

#### P2 (Médio)
- ❌ Lockout progressivo (exponencial) no rate limiting
- ❌ 2FA para admin (opcional)
- ❌ Criptografia de dados sensíveis no banco

---

**Documentação de Segurança:**
- `docs/SECURITY_AUDIT_BIGTECH.md`: Auditoria completa Big Tech
- `docs/SECURITY_BACKLOG.md`: Backlog priorizado de segurança
