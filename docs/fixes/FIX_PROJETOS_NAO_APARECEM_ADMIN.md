# Fix: Projetos não aparecem no Admin Portal

**Data:** Janeiro 2025  
**Problema:** Projetos deixaram de aparecer no Admin Portal após adicionar campo `title`

## 🔍 Causa Raiz

O campo `title` foi adicionado ao schema do Prisma, mas a migration não foi aplicada ao banco de dados. Quando a API tenta fazer `select: { title: true }`, o Prisma tenta buscar um campo que não existe no banco, causando um erro silencioso.

## ✅ Solução Aplicada

1. **Removido `select` explícito** da query de listagem de projetos
2. **Tornado campo `title` opcional** na serialização (usando `(p as any).title || null`)
3. **Removida busca por `title`** temporariamente até migration ser aplicada

## 📋 Próximos Passos

Para habilitar completamente o campo `title`:

1. **Aplicar a migration:**
   ```bash
   npm run db:migrate
   # ou
   npx prisma migrate deploy
   ```

2. **Regenerar Prisma Client:**
   ```bash
   npm run db:generate
   # ou
   npx prisma generate
   ```

3. **Reativar busca por título** em `src/app/api/admin/portal/projects/route.ts`:
   - Descomentar linha de busca por `title` no `where.OR`
   - O campo `title` já será incluído automaticamente sem `select` explícito

## 🔒 Segurança

- Nenhuma regressão de segurança
- Validação Zod mantida
- Autenticação admin intacta

---

**Status:** ✅ Corrigido temporariamente - aguardando aplicação da migration
