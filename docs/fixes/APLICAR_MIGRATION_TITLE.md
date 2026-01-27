# Como Aplicar a Migration do Campo `title`

**Data:** Janeiro 2025  
**Problema:** Campo `title` não está disponível no banco de dados

## 🔍 Diagnóstico

O campo `title` foi adicionado ao schema do Prisma (`prisma/schema.prisma`), mas a migration não foi aplicada ao banco de dados. Isso causa erros ao tentar criar ou atualizar projetos com título.

## ✅ Solução

### Passo 1: Aplicar a Migration

Execute um dos comandos abaixo:

**Para desenvolvimento:**
```bash
npm run db:migrate
# ou
npx prisma migrate dev
```

**Para produção:**
```bash
npm run db:migrate:deploy
# ou
npx prisma migrate deploy
```

### Passo 2: Regenerar Prisma Client

Após aplicar a migration, regenere o Prisma Client:

```bash
npm run db:generate
# ou
npx prisma generate
```

### Passo 3: Reiniciar o Servidor

Se o servidor estiver rodando, reinicie:

```bash
# Parar o servidor (Ctrl+C)
# Depois iniciar novamente
npm run dev
```

## 📋 Verificação

Após aplicar a migration, você pode verificar se funcionou:

1. Tente adicionar um título a um projeto existente
2. Se funcionar, a migration foi aplicada com sucesso
3. Se ainda der erro, verifique os logs do servidor para mais detalhes

## 🔒 Segurança

- Nenhuma regressão de segurança
- Migration apenas adiciona campo opcional
- Dados existentes não são afetados

---

**Status:** Aguardando aplicação da migration
