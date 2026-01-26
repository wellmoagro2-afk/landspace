# Keystatic CMS - Guia de Uso

Este projeto usa o **Keystatic CMS** para gerenciar conteúdo de Briefings, Mapas e Podcasts de forma Git-based.

## 📋 Índice

1. [Acesso ao Admin](#acesso-ao-admin)
2. [Criar um Briefing](#criar-um-briefing)
3. [Preview Público (Draft Mode)](#preview-público-draft-mode)
4. [Publicar Conteúdo](#publicar-conteúdo)
5. [Estrutura de Arquivos](#estrutura-de-arquivos)

## 🔐 Acesso ao Admin

1. Acesse: `http://localhost:3000/keystatic` (em desenvolvimento)
2. Em produção, acesse: `https://seudominio.com/keystatic`

**Nota:** O Keystatic salva os arquivos diretamente no repositório Git, então você precisa ter permissões de escrita no repositório.

## ✍️ Criar um Briefing

1. Acesse `/keystatic`
2. Clique em **"Briefings"** no menu lateral
3. Clique em **"Create entry"**
4. Preencha os campos:
   - **Slug**: URL amigável (ex: `amazonia-soberania`)
   - **Título**: Título do briefing
   - **Subtítulo**: (opcional)
   - **Resumo**: Descrição curta
   - **Data de Publicação**: Data de publicação
   - **Tags**: Adicione tags relevantes
   - **Imagem de Capa**: Faça upload da imagem
   - **Arquivo PDF**: Faça upload do PDF
   - **URL do Mapa (Embed)**: URL do iframe do mapa
   - **URL do Mapa**: URL para abrir o mapa
   - **Arquivo do Mapa**: Arquivo para download
   - **URL do YouTube**: (opcional)
   - **Mapas Relacionados**: Slugs dos mapas relacionados
   - **Conteúdo**: Editor visual para escrever o conteúdo em MDX

5. Clique em **"Save"**

O arquivo será salvo em: `src/content/keystatic/briefings/[slug].mdx`

## 👁️ Preview Público (Draft Mode)

O Draft Mode permite visualizar conteúdo não publicado como se estivesse no site público.

### Habilitar Draft Mode

1. Acesse a URL de preview (gerada pelo Keystatic ou manualmente):
   ```
   http://localhost:3000/api/draft/enable?secret=SEU_SECRET&slug=nome-do-briefing
   ```

2. Configure a variável de ambiente `DRAFT_MODE_SECRET` no arquivo `.env.local`:
   ```env
   DRAFT_MODE_SECRET=seu-secret-super-seguro-aqui
   ```

3. Substitua `SEU_SECRET` na URL pelo valor de `DRAFT_MODE_SECRET`

### Desabilitar Draft Mode

Acesse:
```
http://localhost:3000/api/draft/disable
```

Ou simplesmente feche a aba do navegador (o cookie será limpo automaticamente).

### Como Funciona

- Quando Draft Mode está **ativo**: Todas as páginas mostram conteúdo draft/não publicado
- Quando Draft Mode está **inativo**: Apenas conteúdo publicado é exibido

## 🚀 Publicar Conteúdo

### Método 1: Via Git (Recomendado)

1. **Criar/editar conteúdo no Keystatic** (`/keystatic`)
2. **Salvar** - O arquivo será criado/modificado em `src/content/keystatic/`
3. **Commit e Push**:
   ```bash
   git add .
   git commit -m "Adiciona briefing: [título]"
   git push
   ```
4. **Vercel faz deploy automaticamente** - O conteúdo estará disponível em produção

### Método 2: Preview Local

1. Crie/edite o conteúdo no Keystatic
2. Use Draft Mode para visualizar antes de publicar
3. Quando estiver satisfeito, faça commit e push

## 📁 Estrutura de Arquivos

```
src/
├── content/
│   └── keystatic/
│       ├── briefings/
│       │   └── [slug].mdx
│       ├── maps/
│       │   └── [slug].mdx
│       └── podcasts/
│           └── [slug].mdx
├── lib/
│   └── keystatic/
│       └── briefings.ts  # Funções para ler conteúdo do Keystatic
└── app/
    ├── keystatic/
    │   └── [[...params]]/
    │       └── route.ts  # Rota do admin
    └── api/
        └── draft/
            ├── enable/
            │   └── route.ts  # Habilitar Draft Mode
            └── disable/
                └── route.ts  # Desabilitar Draft Mode

public/
└── strategy/
    ├── briefings/
    │   ├── covers/      # Imagens de capa
    │   ├── pdfs/       # Arquivos PDF
    │   ├── maps/       # Arquivos de mapas
    │   └── images/     # Imagens do conteúdo
    ├── maps/
    └── podcasts/
        └── covers/
```

## 🔄 Prioridade de Conteúdo

O sistema busca conteúdo na seguinte ordem:

1. **Keystatic** (`src/content/keystatic/`)
2. **Prisma** (banco de dados - apenas se não estiver em Draft Mode)
3. **MDX antigo** (`src/content/briefings/`)
4. **Estáticos** (`src/content/strategy/briefings.ts`)

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Secret para habilitar Draft Mode
DRAFT_MODE_SECRET=seu-secret-super-seguro-aqui

# Outras variáveis existentes...
DATABASE_URL=...
```

### Keystatic Config

A configuração está em `keystatic.config.ts` na raiz do projeto.

## 🐛 Troubleshooting

### Admin não abre

- Verifique se o servidor está rodando: `npm run dev`
- Verifique se a rota `/keystatic` está acessível
- Verifique os logs do console

### Draft Mode não funciona

- Verifique se `DRAFT_MODE_SECRET` está configurado
- Verifique se o secret na URL está correto
- Limpe os cookies do navegador

### Conteúdo não aparece

- Verifique se o arquivo foi salvo em `src/content/keystatic/`
- Verifique se a data de publicação não está no futuro (a menos que Draft Mode esteja ativo)
- Verifique os logs do servidor

## 📚 Recursos

- [Documentação do Keystatic](https://keystatic.com/docs)
- [Next.js Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)
