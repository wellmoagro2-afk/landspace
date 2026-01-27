# 🎓 Guia Educacional: Vercel NOT_FOUND Error

## 1. 🔧 Sugestão de Correção Imediata

### Solução Rápida (90% dos casos)

**Problema:** O deployment foi criado, mas não foi promovido para Production.

**Correção:**
1. Acesse: https://vercel.com/wellmoagro2-afk/landspace/deployments
2. Encontre o deployment mais recente com status "Ready" (verde)
3. Clique no deployment → "..." (três pontos) → **"Promote to Production"**
4. Aguarde 1-2 minutos para propagação
5. Teste: https://landspace-lemon.vercel.app

**Por que funciona:** O domínio customizado (`landspace-lemon.vercel.app`) sempre aponta para o deployment marcado como "Current" em Production. Se nenhum deployment estiver marcado, o domínio retorna 404.

---

## 2. 🔍 Causa Raiz: O Que Está Acontecendo?

### O Que o Código Estava Fazendo vs. O Que Precisava Fazer

#### ❌ O Que Estava Acontecendo:
```
1. Push para repositório → Vercel detecta mudança
2. Vercel cria um novo deployment (build + deploy)
3. Build completa com sucesso ✅
4. Deployment fica em status "Ready" ✅
5. MAS: Deployment não é automaticamente promovido para Production ❌
6. Domínio customizado ainda aponta para deployment antigo/deletado
7. Resultado: 404 NOT_FOUND
```

#### ✅ O Que Precisava Acontecer:
```
1. Push para repositório → Vercel detecta mudança
2. Vercel cria um novo deployment
3. Build completa com sucesso ✅
4. Deployment fica em status "Ready" ✅
5. Deployment é automaticamente promovido para Production ✅
6. Domínio customizado aponta para o novo deployment
7. Resultado: App carrega corretamente ✅
```

### Condições Que Disparam Este Erro

1. **Deployment Preview não promovido:**
   - Push para branch que não é `main` (ou branch de produção configurada)
   - Deployment fica como "Preview" e não é promovido automaticamente

2. **Configuração de Production Branch:**
   - Settings → Git → Production Branch não está configurada corretamente
   - Ou a branch atual não é a branch de produção

3. **Deployment Protection ativo:**
   - Proteção de deployment requer aprovação manual
   - Deployment fica "Ready" mas não é promovido até aprovação

4. **Deployment anterior deletado:**
   - Deployment que estava em Production foi deletado
   - Domínio fica "órfão" sem deployment ativo

5. **Primeiro deploy:**
   - Primeiro deployment nunca foi promovido manualmente
   - Domínio foi adicionado antes do primeiro deployment

### O Que Levou a Este Erro?

**Conceito mal compreendido:** A diferença entre **Build** e **Deployment Promotion**

- **Build:** Compila o código e cria os arquivos necessários
- **Deployment:** Torna o build acessível via URL
- **Promotion:** Marca um deployment específico como "Production" (atual)

**O que aconteceu:**
- Você (ou o sistema) assumiu que "build bem-sucedido" = "app disponível"
- Na verdade: "build bem-sucedido" + "promotion para Production" = "app disponível"

---

## 3. 📚 Conceito Subjacente: Como o Vercel Funciona

### Por Que Este Erro Existe?

O erro NOT_FOUND existe para proteger você de **servir conteúdo incorreto ou não testado**.

#### Modelo Mental Correto:

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENTS                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   PREVIEW    │         │  PRODUCTION  │             │
│  │  Deployments │         │  Deployment  │             │
│  │              │         │              │             │
│  │  • PR #123   │         │  • Current   │◄─── Domínio │
│  │  • PR #124   │         │  • Active    │    aponta   │
│  │  • branch-x  │         │              │    aqui     │
│  └──────────────┘         └──────────────┘             │
│                                                          │
│  Cada push cria um NOVO deployment                       │
│  Apenas UM deployment pode ser "Production"             │
│  Domínios customizados SEMPRE apontam para Production   │
└─────────────────────────────────────────────────────────┘
```

### O Que Está Sendo Protegido?

1. **Rollback Automático:**
   - Se um deployment quebra, você pode voltar para o anterior
   - Sem promotion automática, você tem controle sobre quando "ir ao ar"

2. **Testes Antes de Produção:**
   - Preview deployments permitem testar antes de promover
   - Evita que código quebrado vá direto para produção

3. **Múltiplos Ambientes:**
   - Você pode ter vários deployments simultâneos
   - Apenas um é "Production" (o que os usuários veem)

### Como Isso Se Encaixa no Framework?

**Vercel = Plataforma de Deploy (não apenas hosting)**

- **GitHub Actions / CI/CD:** Build e testa
- **Vercel:** Deploy, serve, e gerencia múltiplos ambientes
- **Next.js:** Framework que roda dentro do deployment

**Fluxo Completo:**
```
Código → Git → Vercel Detecta → Build → Deployment → Promotion → Production
                                                      ↑
                                              (pode ser manual ou automático)
```

---

## 4. ⚠️ Sinais de Alerta: Como Reconhecer Este Padrão

### O Que Procurar Para Evitar Este Erro

#### 1. **Build Passa, Mas App Não Carrega**
```bash
✅ Build completed successfully
✅ Deployment ready
❌ https://seu-dominio.vercel.app → 404
```
**Diagnóstico:** Deployment não promovido

#### 2. **Múltiplos Deployments "Ready"**
```
Deployments:
  - #123 (Ready) ← Mais recente, mas não é "Current"
  - #122 (Current) ← Production, mas antigo
```
**Diagnóstico:** Precisa promover o mais recente

#### 3. **Domínio Retorna 404, Mas URL do Deployment Funciona**
```
❌ https://seu-dominio.vercel.app → 404
✅ https://seu-projeto-abc123.vercel.app → Funciona
```
**Diagnóstico:** Domínio não associado ao deployment correto

#### 4. **Deployment Protection Ativo**
```
Deployment #123
Status: Ready (Awaiting Approval)
```
**Diagnóstico:** Precisa aprovar antes de promover

### Padrões Similares (Erros Relacionados)

#### A. **404 do Next.js (não do Vercel)**
```typescript
// Seu app retorna 404 para uma rota específica
// Isso é diferente! É um problema de roteamento no Next.js
```
**Diferença:** 
- Vercel 404 = "deployment não encontrado" (página branca, nada carrega)
- Next.js 404 = "rota não encontrada" (app carrega, mas página específica não existe)

#### B. **Build Falha, Mas Deployment Existe**
```
❌ Build failed
✅ Deployment #122 (Current) ainda funciona
```
**Diagnóstico:** Deployment anterior ainda está ativo (comportamento esperado)

#### C. **Domínio Não Configurado**
```
❌ https://seu-dominio.vercel.app → 404
✅ https://seu-projeto.vercel.app → Funciona
```
**Diagnóstico:** Domínio customizado não foi adicionado em Settings → Domains

### Code Smells / Padrões Que Indicam Este Problema

#### 1. **Configuração de Branch Incorreta**
```json
// vercel.json (se existir)
{
  "git": {
    "productionBranch": "main" // Deve ser sua branch de produção
  }
}
```
**Verificar:** Settings → Git → Production Branch

#### 2. **Deployment Protection Sem Aprovação**
```
Settings → Deployment Protection → Enabled
```
**Ação:** Desabilitar ou aprovar deployments manualmente

#### 3. **Múltiplos Projetos Vercel**
```
Projeto A: landspace (produção)
Projeto B: landspace-preview (preview)
```
**Problema:** Domínio pode estar apontando para projeto errado

---

## 5. 🔄 Alternativas e Trade-offs

### Abordagem 1: Auto-Promotion (Recomendado para Produção)

**Como funciona:**
- Configurar branch de produção (`main`) para auto-promotion
- Qualquer push para `main` automaticamente promove para Production

**Configuração:**
```
Settings → Git → Production Branch: main
```

**Prós:**
- ✅ Zero intervenção manual
- ✅ Deployments de produção sempre atualizados
- ✅ Ideal para CI/CD automatizado

**Contras:**
- ⚠️ Código vai direto para produção (sem teste manual)
- ⚠️ Precisa de testes robustos antes de merge

**Quando usar:** Produção estável, testes automatizados, CI/CD maduro

---

### Abordagem 2: Promotion Manual (Recomendado para Desenvolvimento)

**Como funciona:**
- Todos os deployments requerem promotion manual
- Você escolhe quando promover

**Configuração:**
```
Settings → Git → Production Branch: (deixar vazio ou desabilitar auto-promotion)
```

**Prós:**
- ✅ Controle total sobre quando ir ao ar
- ✅ Pode testar preview antes de promover
- ✅ Ideal para ambientes críticos

**Contras:**
- ⚠️ Requer intervenção manual (pode esquecer)
- ⚠️ Mais lento para ir ao ar

**Quando usar:** Ambientes críticos, necessidade de aprovação, testes manuais

---

### Abordagem 3: Deployment Protection (Híbrido)

**Como funciona:**
- Auto-promotion habilitado
- Mas requer aprovação de reviewer antes de promover

**Configuração:**
```
Settings → Deployment Protection → Enabled
Settings → Git → Production Branch: main
```

**Prós:**
- ✅ Combina velocidade com segurança
- ✅ Review antes de produção
- ✅ Ideal para equipes

**Contras:**
- ⚠️ Requer configuração de reviewers
- ⚠️ Pode atrasar deployments se reviewer não estiver disponível

**Quando usar:** Equipes, necessidade de code review, produção crítica

---

### Abordagem 4: Vercel CLI (CI/CD)

**Como funciona:**
- Script no CI/CD promove deployment após build bem-sucedido

**Exemplo (GitHub Actions):**
```yaml
- name: Deploy to Vercel
  run: vercel --prod

- name: Promote deployment
  run: vercel promote ${{ env.VERCEL_DEPLOYMENT_URL }} --yes
```

**Prós:**
- ✅ Controle total no pipeline
- ✅ Pode adicionar condições (testes, etc.)
- ✅ Ideal para automação avançada

**Contras:**
- ⚠️ Requer configuração de CI/CD
- ⚠️ Mais complexo de manter

**Quando usar:** Pipelines complexos, múltiplos ambientes, automação avançada

---

## 📋 Checklist de Prevenção

### Configuração Inicial (Fazer Uma Vez)

- [ ] **Production Branch configurada:**
  - Settings → Git → Production Branch: `main` (ou sua branch de produção)

- [ ] **Auto-promotion habilitado:**
  - Se quiser deployments automáticos, habilitar auto-promotion
  - Se quiser controle manual, deixar desabilitado

- [ ] **Domínio configurado:**
  - Settings → Domains → Adicionar domínio customizado
  - Verificar que aponta para projeto correto

- [ ] **Deployment Protection (opcional):**
  - Se precisar de aprovação, habilitar
  - Configurar reviewers

### Verificação Após Cada Deploy

- [ ] **Deployment criado:**
  - Verificar que novo deployment aparece em Deployments

- [ ] **Build bem-sucedido:**
  - Status deve ser "Ready" (verde)

- [ ] **Promotion (se manual):**
  - Verificar se deployment foi promovido para Production
  - Badge "Current" deve aparecer

- [ ] **Domínio funcionando:**
  - Testar domínio customizado
  - Deve carregar app (não 404)

### Monitoramento Contínuo

- [ ] **Notificações configuradas:**
  - Settings → Notifications → Falhas de deploy
  - Receber alertas quando deployment falha

- [ ] **Dashboard regular:**
  - Verificar periodicamente se Production está atualizado
  - Comparar deployment atual com último commit

---

## 🎯 Resumo: Mental Model Correto

### O Que Você Precisa Entender

1. **Build ≠ Deployment ≠ Production**
   - Build: Compila código
   - Deployment: Torna build acessível
   - Production: Marca deployment como "atual"

2. **Domínios Sempre Apontam para Production**
   - Domínio customizado = sempre Production
   - URL do deployment = deployment específico

3. **Múltiplos Deployments Podem Existir Simultaneamente**
   - Preview deployments para PRs
   - Production deployment para usuários
   - Apenas um pode ser "Current"

4. **Promotion Pode Ser Automático ou Manual**
   - Automático: Push para branch de produção
   - Manual: Clicar em "Promote to Production"

### A Regra de Ouro

> **"Build bem-sucedido não significa app disponível. Sempre verifique se o deployment foi promovido para Production."**

---

## 🔗 Recursos Adicionais

- **Documentação Vercel:** https://vercel.com/docs/deployments/overview
- **CLI Vercel:** https://vercel.com/docs/cli
- **Deployment Protection:** https://vercel.com/docs/deployments/deployment-protection
- **Domains:** https://vercel.com/docs/domains-and-aliases

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0
