# 🎯 Admin Editorial - LandSpace Strategy

Sistema completo de administração editorial para Briefings, Mapas e Podcasts.

## 🚀 Setup Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin Authentication
ADMIN_PASSWORD="sua-senha-segura-aqui"

# Session Secret (mínimo 32 caracteres)
SESSION_SECRET="sua-chave-secreta-min-32-caracteres-para-sessao"

# Preview Mode Secret
PREVIEW_SECRET="sua-chave-secreta-para-preview-mode"
```

### 3. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npm run db:generate

# Criar banco e aplicar migrations
npm run db:migrate

# (Opcional) Abrir Prisma Studio para visualizar dados
npm run db:studio
```

### 4. Iniciar Servidor

```bash
npm run dev
```

## 📁 Estrutura

```
src/
├── app/
│   ├── api/
│   │   ├── admin/          # Rotas protegidas do admin
│   │   │   ├── login       # POST - Autenticação
│   │   │   ├── logout      # POST - Logout
│   │   │   ├── briefings/  # CRUD de briefings
│   │   │   └── upload      # Upload de imagens
│   │   └── preview         # Preview Mode
│   └── strategy/
│       ├── admin/          # UI do admin
│       │   ├── login       # Página de login
│       │   └── briefings/  # Listagem e editor
│       └── briefings/      # Páginas públicas
├── lib/
│   ├── auth.ts            # Autenticação (iron-session)
│   └── prisma.ts          # Cliente Prisma
└── middleware.ts          # Proteção de rotas

prisma/
└── schema.prisma          # Schema do banco
```

## 🔐 Autenticação

- **Login:** `/strategy/admin/login`
- **Senha:** Definida em `ADMIN_PASSWORD` no `.env`
- **Sessão:** Cookie httpOnly assinado (7 dias)
- **Proteção:** Middleware protege `/strategy/admin/*` e `/api/admin/*`

## 📝 Uso do Admin

### Criar Briefing

1. Acesse `/strategy/admin/briefings`
2. Clique em "Novo Briefing"
3. Preencha:
   - **Slug:** URL amigável (ex: `petroleo-poder-oriente-medio`)
   - **Título:** Título principal
   - **Subtítulo:** (opcional)
   - **Resumo:** Resumo curto
   - **Tags:** Array JSON (ex: `["Energia", "Geopolítica"]`)
   - **Conteúdo MDX:** Conteúdo completo em Markdown/MDX
   - **Status:** draft | published | archived
4. Clique em "Salvar"

### Preview "Como Público"

1. No editor, clique em "Ver como público"
2. Abre a página do briefing em modo preview
3. Mostra versão exata como será publicada

### Upload de Imagens

1. No editor, use o botão "Upload"
2. Selecione imagem (JPEG, PNG, WebP, GIF - máx 5MB)
3. Imagem salva em `/public/uploads/strategy/`
4. URL retornada para usar no conteúdo

## 🎨 Experiência de Leitura

### Componentes Editoriais Disponíveis

No conteúdo MDX, você pode usar:

```mdx
<Callout type="insight">
  Insight importante aqui
</Callout>

<Callout type="risco">
  Atenção: risco identificado
</Callout>

<Callout type="evidencia">
  Evidência baseada em dados
</Callout>

<Callout type="metodo">
  Metodologia aplicada
</Callout>

<Figure src="/image.jpg" alt="Descrição" caption="Legenda da imagem" />

<Quote author="Nome" role="Cargo">
  Citação importante
</Quote>

<MetricCard value="42%" label="Aumento" />

<Divider />
```

## 🔄 Preview Mode

O Next.js Preview Mode permite visualizar conteúdo draft antes de publicar:

1. No admin, clique em "Ver como público"
2. Gera URL: `/api/preview?secret=...&slug=...`
3. Abre briefing em modo preview
4. Mostra versão exata como será publicada

## 📊 Migração para Produção (Fase 2)

### Trocar SQLite → Postgres

1. Atualizar `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```

2. Rodar migrations:
   ```bash
   npm run db:migrate
   ```

### Upload para Storage Externo

**Opção A: Supabase Storage**
- Criar bucket no Supabase
- Atualizar `/api/admin/upload` para usar SDK do Supabase

**Opção B: Cloudflare R2**
- Configurar bucket R2
- Atualizar `/api/admin/upload` para usar SDK do R2

## ✅ Checklist de Testes

- [ ] Login com senha correta
- [ ] Login com senha incorreta (deve falhar)
- [ ] Acesso a `/strategy/admin` sem login (deve redirecionar)
- [ ] Criar briefing
- [ ] Editar briefing
- [ ] Deletar briefing
- [ ] Upload de imagem
- [ ] Preview "como público"
- [ ] Publicar briefing (status: published)
- [ ] Briefing publicado aparece em `/strategy/briefings`
- [ ] Briefing draft NÃO aparece em `/strategy/briefings` (sem preview)

## 🐛 Troubleshooting

### Erro: "ADMIN_PASSWORD não configurado"
- Verifique se `.env` existe e tem `ADMIN_PASSWORD`

### Erro: "Prisma Client não gerado"
- Execute: `npm run db:generate`

### Erro: "Database não existe"
- Execute: `npm run db:migrate`

### Erro: "Unauthorized" ao acessar admin
- Verifique se fez login corretamente
- Verifique se `SESSION_SECRET` está configurado

## 📚 Próximos Passos

- [ ] Implementar Mapas no admin
- [ ] Implementar Podcast no admin
- [ ] Adicionar validações mais robustas
- [ ] Adicionar histórico de versões
- [ ] Adicionar colaboração (múltiplos admins)
