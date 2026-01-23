# 🚀 Setup Completo - Admin Editorial LandSpace

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## 🔧 Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
# Database (SQLite local)
DATABASE_URL="file:./dev.db"

# Admin Authentication
ADMIN_PASSWORD="sua-senha-super-segura-aqui"

# Session Secret (mínimo 32 caracteres)
SESSION_SECRET="sua-chave-secreta-min-32-caracteres-para-sessao-segura"

# Preview Mode Secret
PREVIEW_SECRET="sua-chave-secreta-para-preview-mode-editorial"
```

**⚠️ IMPORTANTE:**
- `SESSION_SECRET` deve ter no mínimo 32 caracteres
- Use senhas fortes em produção
- Nunca commite o `.env` no git

### 3. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npm run db:generate

# Criar banco e aplicar migrations
npm run db:migrate
```

Isso criará:
- `prisma/dev.db` (banco SQLite)
- Tabelas: `Briefing`, `Map`, `Podcast`

### 4. Iniciar Servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 🎯 Primeiro Acesso

1. Acesse: `http://localhost:3000/strategy/admin/login`
2. Digite a senha configurada em `ADMIN_PASSWORD`
3. Você será redirecionado para `/strategy/admin/briefings`

## 📝 Criar Primeiro Briefing

1. Clique em "Novo Briefing"
2. Preencha:
   - **Slug:** `meu-primeiro-briefing` (URL amigável)
   - **Título:** Título do briefing
   - **Resumo:** Resumo curto
   - **Tags:** `Tag1, Tag2, Tag3` (separadas por vírgula)
   - **Conteúdo MDX:** Conteúdo em Markdown/MDX
3. Clique em "Salvar rascunho" ou "Publicar"

## 🎨 Componentes Editoriais Disponíveis

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

<Figure src="/uploads/strategy/image.jpg" alt="Descrição" caption="Legenda" />

<Quote author="Nome" role="Cargo">
  Citação importante
</Quote>

<MetricCard value="42%" label="Aumento" />

<Divider />
```

## 🔍 Preview "Como Público"

1. No editor, clique em "Ver como público"
2. Abre a página do briefing em modo preview
3. Mostra versão exata como será publicada (mesmo se estiver em draft)

## 📤 Upload de Imagens

1. No editor, use o botão "Upload" ao lado do campo "Imagem de Capa"
2. Selecione imagem (JPEG, PNG, WebP, GIF - máx 5MB)
3. Imagem salva em `/public/uploads/strategy/`
4. URL retornada automaticamente (ex: `/uploads/strategy/1234567890-abc.jpg`)

## ✅ Checklist de Testes

- [ ] Login funciona
- [ ] Criar briefing funciona
- [ ] Editar briefing funciona
- [ ] Deletar briefing funciona
- [ ] Upload de imagem funciona
- [ ] Preview "como público" funciona
- [ ] Briefing publicado aparece em `/strategy/briefings`
- [ ] Briefing draft NÃO aparece (sem preview)
- [ ] TOC (Sumário) aparece na leitura
- [ ] Componentes editoriais renderizam corretamente

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

### Erro: Preview não funciona
- Verifique se `PREVIEW_SECRET` está configurado
- Verifique se o slug do briefing está correto

## 🔄 Migração para Produção (Fase 2)

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

## 📚 Estrutura de Arquivos

```
prisma/
  schema.prisma          # Schema do banco

src/
  app/
    api/
      admin/             # Rotas protegidas
        login
        logout
        briefings/       # CRUD
        upload           # Upload de imagens
        preview-url      # Gerar URL de preview
      preview            # Preview Mode
    strategy/
      admin/             # UI do admin
        login
        briefings/       # Listagem e editor
      briefings/         # Páginas públicas
  components/
    strategy/
      editorial/         # Componentes MDX
        Callout.tsx
        Figure.tsx
        Quote.tsx
        MetricCard.tsx
        Divider.tsx
        TableOfContents.tsx
  lib/
    auth.ts             # Autenticação
    prisma.ts           # Cliente Prisma
    mdx-components.tsx  # Componentes MDX
  middleware.ts         # Proteção de rotas
```

## 🎉 Pronto!

Agora você tem:
- ✅ Admin editorial completo
- ✅ Experiência de leitura "Big Tech"
- ✅ Preview Mode funcionando
- ✅ Upload de imagens
- ✅ Componentes editoriais
- ✅ TOC automático

**Próximos passos:** Criar seu primeiro briefing e publicar! 🚀
