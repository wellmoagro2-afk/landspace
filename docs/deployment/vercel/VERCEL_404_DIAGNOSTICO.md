# Diagnóstico: Vercel 404 NOT_FOUND

## Contexto
- **Repo:** wellmoagro2-afk/landspace
- **Framework:** Next.js 16.1.1 (Turbopack)
- **Build:** ✅ Completo e bem-sucedido
- **Domínio:** landspace-lemon.vercel.app
- **Erro:** 404 NOT_FOUND da própria Vercel (não do Next.js)

## Hipóteses Priorizadas (Alta → Baixa Probabilidade)

### 🔴 HIPÓTESE 1: Deployment não promovido para Production (90% de probabilidade)
**Causa:** O build completou, mas o deployment não foi marcado como "Current" em Production.

**Evidências:**
- Build passou, mas o domínio não aponta para deployment ativo
- URL do deployment pode estar funcionando, mas o domínio customizado não

**Como verificar:**
1. Acesse: https://vercel.com/wellmoagro2-afk/landspace/deployments
2. Procure pelo deployment mais recente com status "Ready"
3. Verifique se há badge "Current" em Production
4. Se NÃO houver "Current", esse é o problema

**Solução:**
- Clique no deployment mais recente
- Clique em "..." (três pontos) → "Promote to Production"
- Ou use o botão "Promote" se disponível

---

### 🟡 HIPÓTESE 2: Domínio não associado ao deployment correto (70% de probabilidade)
**Causa:** O domínio `landspace-lemon.vercel.app` está apontando para um deployment antigo/deletado.

**Evidências:**
- Domínio existe, mas retorna 404
- Deployment URL funciona, mas domínio customizado não

**Como verificar:**
1. Acesse: https://vercel.com/wellmoagro2-afk/landspace/settings/domains
2. Verifique se `landspace-lemon.vercel.app` está listado
3. Clique no domínio e veja qual deployment está associado
4. Compare com o deployment mais recente

**Solução:**
- Se o domínio apontar para deployment antigo:
  1. Vá em Settings → Domains
  2. Remova o domínio (se necessário)
  3. Re-adicione o domínio (ele será associado ao deployment atual automaticamente)
- Ou promova o deployment correto para Production (Hipótese 1)

---

### 🟡 HIPÓTESE 3: Deployment deletado ou expirado (40% de probabilidade)
**Causa:** O deployment foi deletado manualmente ou expirou (preview deployments expiram após inatividade).

**Evidências:**
- URL do deployment retorna 404
- Histórico mostra deployment deletado

**Como verificar:**
1. Acesse: https://vercel.com/wellmoagro2-afk/landspace/deployments
2. Procure por deployments com status "Deleted" ou "Expired"
3. Verifique se o deployment que o domínio aponta ainda existe

**Solução:**
- Se o deployment foi deletado:
  1. Faça um novo deploy (push para main ou trigger manual)
  2. Promova o novo deployment para Production
  3. Verifique se o domínio foi atualizado automaticamente

---

### 🟢 HIPÓTESE 4: Problema com build output ou configuração (20% de probabilidade)
**Causa:** Build passou, mas o output não está no formato esperado pela Vercel.

**Evidências:**
- Build logs mostram sucesso, mas deployment não serve conteúdo
- Estrutura de arquivos diferente do esperado

**Como verificar:**
1. Acesse os logs do deployment: https://vercel.com/wellmoagro2-afk/landspace/deployments/[id]
2. Verifique se há warnings sobre build output
3. Confirme que `.next` foi gerado corretamente

**Solução:**
- Se houver problema de output:
  1. Verifique `next.config.ts` (já verificado - está OK)
  2. Confirme que não há `output: 'export'` (estático) quando deveria ser serverless
  3. Verifique se há `basePath` ou `assetPrefix` incorretos

---

## Solução Passo a Passo (UI do Vercel)

### Passo 1: Verificar Status do Deployment
1. Acesse: https://vercel.com/wellmoagro2-afk/landspace/deployments
2. Identifique o deployment mais recente com status "Ready" (verde)
3. Anote o ID/URL do deployment

### Passo 2: Promover para Production
1. Clique no deployment mais recente
2. Procure por:
   - Badge "Current" (se já estiver em Production, pule para Passo 3)
   - Botão "Promote" ou "Promote to Production"
3. Clique em "Promote to Production"
4. Aguarde confirmação

### Passo 3: Verificar Domínio
1. Acesse: https://vercel.com/wellmoagro2-afk/landspace/settings/domains
2. Verifique se `landspace-lemon.vercel.app` está listado
3. Se não estiver:
   - Clique em "Add Domain"
   - Digite: `landspace-lemon.vercel.app`
   - Confirme
4. Se já estiver:
   - Clique no domínio
   - Verifique qual deployment está associado
   - Se for antigo, o domínio será atualizado automaticamente após promover o novo deployment

### Passo 4: Testar
1. Aguarde 1-2 minutos para propagação
2. Acesse: https://landspace-lemon.vercel.app
3. Deve carregar o app (não mais 404)

---

## Solução via CLI (Alternativa)

Se preferir usar CLI do Vercel:

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Login
vercel login

# Listar deployments
vercel ls

# Promover deployment específico para production
vercel promote [deployment-url] --yes

# Ou fazer novo deploy que automaticamente vai para production (se for main branch)
vercel --prod
```

---

## Checklist de Aceitação

Após aplicar a solução, verifique:

- [ ] Deployment mais recente está marcado como "Current" em Production
- [ ] Domínio `landspace-lemon.vercel.app` está associado ao deployment correto
- [ ] Acessar `https://landspace-lemon.vercel.app` retorna o app (não 404)
- [ ] A URL do deployment (`landspace-<hash>-wellmo-dos-santos-alves-projects.vercel.app`) também funciona
- [ ] Logs do deployment não mostram erros de runtime
- [ ] Build logs mostram sucesso completo

---

## Comandos Úteis para Diagnóstico

### Via Vercel Dashboard:
1. **Deployments:** https://vercel.com/wellmoagro2-afk/landspace/deployments
2. **Settings → Domains:** https://vercel.com/wellmoagro2-afk/landspace/settings/domains
3. **Settings → General:** https://vercel.com/wellmoagro2-afk/landspace/settings/general

### Via CLI:
```bash
# Ver informações do projeto
vercel inspect

# Ver deployments
vercel ls

# Ver logs de um deployment
vercel logs [deployment-url]
```

---

## O Que Fazer Se Nada Funcionar

1. **Verificar permissões:**
   - Confirme que você tem acesso de Admin/Owner no projeto
   - Verifique se não há "Deployment Protection" ativo bloqueando

2. **Fazer novo deploy:**
   - Faça um commit vazio: `git commit --allow-empty -m "trigger redeploy"`
   - Push: `git push origin main`
   - Isso forçará um novo deployment que será automaticamente promovido

3. **Contatar suporte:**
   - Se após todos os passos ainda houver 404, pode ser um bug da plataforma
   - Contate: https://vercel.com/support

---

## Prevenção Futura

Para evitar esse problema:

1. **Configurar auto-promote:**
   - Settings → Git → Production Branch
   - Garantir que `main` está configurada como production branch
   - Deployments de `main` serão automaticamente promovidos

2. **Monitorar deployments:**
   - Configure notificações para falhas de deploy
   - Verifique periodicamente se Production está atualizado

3. **Usar Vercel CLI em CI/CD:**
   - Integre `vercel promote` no pipeline após deploy bem-sucedido

---

## Notas Técnicas

- **404 NOT_FOUND da Vercel** é diferente de 404 do Next.js:
  - Vercel 404 = deployment/domínio não encontrado
  - Next.js 404 = rota não encontrada no app

- **Deployments Preview vs Production:**
  - Preview: criados para PRs/branches
  - Production: deployment ativo no domínio principal
  - Domínios customizados sempre apontam para Production

- **Build vs Deployment:**
  - Build pode passar, mas deployment pode falhar em runtime
  - Sempre verifique logs do deployment, não apenas do build
