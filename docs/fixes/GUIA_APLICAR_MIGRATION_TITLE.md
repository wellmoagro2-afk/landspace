# 📋 Guia Passo a Passo: Aplicar Migration do Campo `title`

**Data:** Janeiro 2025  
**Problema:** Erro "Campo 'title' ainda não está disponível" ao tentar adicionar título ao projeto

## ✅ Solução: Aplicar a Migration

A migration já foi criada em `prisma/migrations/20260125000000_add_project_title/migration.sql`, mas precisa ser aplicada ao banco de dados.

### Passo 1: Verificar se o servidor está rodando

Se o servidor Next.js estiver rodando, **pare-o** temporariamente (pressione `Ctrl+C` no terminal).

### Passo 2: Aplicar a Migration

Abra o terminal na raiz do projeto (`d:\landspace`) e execute:

**Para desenvolvimento:**
```bash
npm run db:migrate
```

**OU se preferir o comando direto:**
```bash
npx prisma migrate dev
```

**Para produção (Vercel/Deploy):**
```bash
npm run db:migrate:deploy
```

**OU:**
```bash
npx prisma migrate deploy
```

### Passo 3: Regenerar Prisma Client

Após aplicar a migration, regenere o Prisma Client:

```bash
npm run db:generate
```

**OU:**
```bash
npx prisma generate
```

### Passo 4: Reiniciar o Servidor

Se você parou o servidor no Passo 1, reinicie:

```bash
npm run dev
```

## 🔍 Verificação

Após aplicar a migration:

1. ✅ O comando `npm run db:migrate` deve mostrar sucesso
2. ✅ Tente adicionar um título a um projeto existente
3. ✅ Se funcionar, a migration foi aplicada com sucesso!

## ⚠️ Se Ainda Der Erro

Se após aplicar a migration ainda der erro:

1. **Verifique os logs do terminal** onde o servidor está rodando
2. **Verifique o console do navegador** (F12 → Console)
3. **Confirme que a migration foi aplicada:**
   ```bash
   npx prisma migrate status
   ```

## 📝 O Que a Migration Faz

A migration adiciona uma coluna `title` (TEXT, opcional) à tabela `Project`:

```sql
ALTER TABLE "Project" ADD COLUMN "title" TEXT;
```

Isso permite que você adicione e edite títulos de projetos sem afetar dados existentes.

## 🔒 Segurança

- ✅ Nenhuma regressão de segurança
- ✅ Migration apenas adiciona campo opcional
- ✅ Dados existentes não são afetados
- ✅ Campo pode ser NULL (opcional)

---

**Status:** Aguardando aplicação da migration pelo usuário
