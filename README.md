# LandSpace - Site Vitrine de Cursos

Site vitrine para apresentação de cursos de geotecnologias. As vendas e o acesso aos cursos acontecem na plataforma **Hotmart**.

## 🎯 Conceito

O site LandSpace funciona como uma **vitrine digital** que:
- Apresenta os cursos de forma atrativa
- Explica a proposta de valor e metodologia
- Redireciona para o checkout da Hotmart
- **NÃO** processa pagamentos (Hotmart faz isso)
- **NÃO** tem área do aluno própria (Hotmart cuida disso)

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+ e npm/yarn/pnpm
- Docker e Docker Compose (para banco de dados local)

### Setup Inicial

1. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   ```
   Edite `.env.local` e configure as variáveis obrigatórias:
   - `SESSION_SECRET`: mínimo 32 caracteres (obrigatório)
   - `DATABASE_URL`: URL do PostgreSQL (obrigatório)
   - `PREVIEW_SECRET`: mínimo 32 caracteres (obrigatório)
   
   **Gerar secrets seguros:**
   ```bash
   # Gerar SESSION_SECRET (32+ caracteres)
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Gerar PREVIEW_SECRET (32+ caracteres)
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
   **Exemplo de `.env.local` (PostgreSQL):**
   ```env
   SESSION_SECRET=seu-session-secret-aqui-minimo-32-caracteres
   DATABASE_URL=postgresql://user:password@localhost:5432/landspace
   PREVIEW_SECRET=seu-preview-secret-aqui-minimo-32-caracteres
   ```
   
   **Exemplo de `.env.local` (SQLite - desenvolvimento):**
   ```env
   SESSION_SECRET=seu-session-secret-aqui-minimo-32-caracteres
   DATABASE_URL=file:./dev.db
   PREVIEW_SECRET=seu-preview-secret-aqui-minimo-32-caracteres
   ```
   
   **Nota:** SQLite requer prefixo `file:` no DATABASE_URL. O script `check:env` valida automaticamente conforme o provider configurado no `prisma/schema.prisma`.
   
   **Importante:** O arquivo `prisma/prisma/dev.db` é local-only e não deve ser versionado (já está no `.gitignore`).

2. **Validar variáveis de ambiente (opcional):**
   ```bash
   npm run check:env
   ```

3. **Iniciar banco de dados PostgreSQL (desenvolvimento):**
   ```bash
   docker compose up -d
   ```

3. **Executar migrations do Prisma:**
   ```bash
   npm run db:migrate
   # ou
   npx prisma migrate dev
   ```

4. **Gerar Prisma Client:**
   ```bash
   npm run db:generate
   # ou
   npx prisma generate
   ```

5. **Executar seed (opcional, cria projeto demo):**
   ```bash
   npm run db:seed
   ```

6. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### 🚀 Rodar em Produção Local (next start)

Para testar o build de produção localmente:

1. **Garantir que todas as variáveis obrigatórias estão configuradas:**
   ```bash
   npm run check:env
   ```

2. **Criar build de produção:**
   ```bash
   npm run build
   ```

3. **Iniciar servidor de produção:**
   ```bash
   npm run start
   ```

**Importante:**
- O arquivo `.env.local` deve conter todas as variáveis obrigatórias
- Em produção, o sistema é **estrito**: variáveis faltando causarão erro na inicialização
- Nunca commite arquivos `.env.local` ou `.env` com valores reais (já está no `.gitignore`)

**Variáveis obrigatórias para produção:**
- `SESSION_SECRET` (mínimo 32 caracteres)
- `DATABASE_URL` (PostgreSQL)
- `PREVIEW_SECRET` (mínimo 32 caracteres)

**Variáveis opcionais (mas recomendadas):**
- `ADMIN_KEY` (mínimo 24 caracteres se configurado)
- `DRAFT_MODE_SECRET` (mínimo 32 caracteres)
- `REDIS_URL` (para rate limiting persistente)

### ⚠️ Importante

- **Produção:** SQLite não é permitido. Configure `DATABASE_URL` com uma URL PostgreSQL válida.
- **Desenvolvimento:** SQLite é permitido apenas localmente. Para desenvolvimento completo, use Docker Compose com PostgreSQL.
- **Segurança:** Nunca use valores hardcoded como "change-me-in-production" ou "preview-secret". Sempre gere secrets seguros.

### 🧪 Pipeline de QA para CSP

Validação automatizada da Content Security Policy (CSP) sem dependências externas:

```bash
npm run qa:csp
```

O pipeline executa de forma **determinística** usando a flag `QA_CSP=1`:
- Build e servidor rodam com `QA_CSP=1`
- Endpoints retornam mocks locais (sem chamar APIs externas como GDELT)
- Valida CSP em todas as rotas principais
- Não requer conectividade externa

**Documentação completa:** Veja [`docs/qa-csp.md`](./docs/qa-csp.md) para detalhes técnicos.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── cursos/
│   │   ├── data.ts          # Dados dos cursos
│   │   ├── page.tsx         # Listagem de cursos
│   │   └── [slug]/
│   │       └── page.tsx     # Página individual do curso
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Homepage
│   └── globals.css          # Estilos globais
├── components/
│   ├── Header.tsx            # Cabeçalho
│   ├── Footer.tsx           # Rodapé
│   ├── CourseCard.tsx       # Card de curso
│   └── WhatsAppButton.tsx   # Botão WhatsApp flutuante
└── lib/
    └── utils.ts             # Utilitários
```

## ⚙️ Configuração

### Adicionar/Editar Cursos

Edite o arquivo `src/app/cursos/data.ts`:

```typescript
{
  slug: "nome-do-curso",
  title: "Título do Curso",
  subtitle: "Descrição curta",
  level: "Iniciante" | "Intermediário" | "Avançado",
  duration: "12h",
  priceText: "A partir de R$ 197",
  hotmartCheckoutUrl: "https://pay.hotmart.com/SEU_CHECKOUT_AQUI", // ⚠️ IMPORTANTE - Veja CHECKLIST_HOTMART.md
  tags: ["QGIS", "Mapas"],
  image: "/courses/nome-do-curso.png", // Imagem em public/courses/
  bullets: ["O que você vai aprender 1", "O que você vai aprender 2"],
  outcome: "Resultado final do curso"
}
```

### Adicionar Imagens dos Cursos

📸 **Guia Completo:** Veja o arquivo [`GUIA_IMAGENS.md`](./GUIA_IMAGENS.md) para especificações detalhadas de todas as imagens (logo, cursos, instrutor), incluindo tamanhos, qualidade e onde colocá-las.

Coloque as imagens em `public/courses/` com o nome correspondente ao `slug` do curso.

**Recomendações:**
- Formato: PNG ou JPG
- Dimensões: 800x450px (16:9)
- Tamanho: até 500KB

## 📖 Documentação

- **`FLUXO_HOTMART.md`** - Entenda como funciona a integração com a Hotmart
- **`GUIA_IMAGENS.md`** - Guia completo de imagens (logo, cursos, instrutor) com especificações técnicas
- **`CHECKLIST_HOTMART.md`** - Checklist passo a passo para configurar URLs de checkout da Hotmart

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

## 📝 Próximos Passos

1. ✅ Site criado como vitrine
2. ⏳ Adicionar URLs reais dos checkouts da Hotmart
3. ⏳ Adicionar imagens dos cursos
4. ⏳ Configurar domínio e hospedagem
5. ⏳ Testar fluxo completo

## 📄 Licença

Este projeto é privado e proprietário da LandSpace.
