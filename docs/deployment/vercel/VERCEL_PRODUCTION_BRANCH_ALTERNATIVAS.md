# 🔍 Como Encontrar/Configurar Production Branch no Vercel

## ⚠️ Problema: Não Encontrei "Production Branch" em Settings → Git

A interface do Vercel pode variar. Aqui estão alternativas:

---

## 📍 Onde Pode Estar a Configuração

### Opção 1: Settings → Git → Production Branch
**Caminho completo:**
```
Projeto → Settings → Git → Production Branch
```

**Se não aparecer:**
- Pode estar em outro lugar (veja opções abaixo)
- Pode não existir se o projeto não está conectado ao Git
- Pode estar em uma versão diferente da interface

---

### Opção 2: Settings → General → Production Branch
**Caminho alternativo:**
```
Projeto → Settings → General → Production Branch
```

**O que procurar:**
- Seção "Git" ou "Repository"
- Campo "Production Branch" ou "Branch de Produção"
- Dropdown com branches disponíveis

---

### Opção 3: Verificar se Projeto Está Conectado ao Git

**Como verificar:**
1. Vá em **Settings → Git**
2. Veja se há uma seção mostrando:
   - Repositório conectado (ex: `wellmoagro2-afk/landspace`)
   - Branch conectada
   - Status da conexão

**Se não estiver conectado:**
- A opção "Production Branch" pode não aparecer
- Você precisa conectar o repositório primeiro

**Como conectar:**
1. Settings → Git → "Connect Git Repository"
2. Escolha o provedor (GitHub, GitLab, Bitbucket)
3. Autorize e selecione o repositório

---

### Opção 4: Verificar na Página de Deployments

**Como verificar:**
1. Vá em **Deployments**
2. Veja os deployments recentes
3. Verifique qual branch gerou cada deployment
4. O deployment de `main` (ou sua branch principal) deve ser promovido para Production

**Se todos os deployments forem de `main`:**
- O Vercel já está usando `main` como produção
- O problema pode ser apenas promotion manual

---

## ✅ Solução Imediata (Sem Configuração)

**Você NÃO precisa configurar Production Branch para resolver o NOT_FOUND agora!**

### Passo a Passo Simples:

1. **Vá em Deployments:**
   ```
   https://vercel.com/wellmoagro2-afk/landspace/deployments
   ```

2. **Encontre o deployment mais recente:**
   - Procure por status "Ready" (verde)
   - Veja qual branch gerou (provavelmente `main`)

3. **Promova manualmente:**
   - Clique no deployment
   - Clique em "..." (três pontos) ou "Promote"
   - Selecione "Promote to Production"

4. **Teste:**
   - Aguarde 1-2 minutos
   - Acesse: https://landspace-lemon.vercel.app
   - Deve funcionar agora!

---

## 🔍 Como Verificar Qual Branch Está Sendo Usada

### Método 1: Via Deployments
1. Acesse Deployments
2. Veja a coluna "Branch" ou "Source"
3. A branch que aparece mais frequentemente é a de produção

### Método 2: Via Settings → Git
1. Settings → Git
2. Veja qual repositório está conectado
3. Veja qual branch está configurada (se aparecer)

### Método 3: Via vercel.json (Se Existir)
```json
{
  "git": {
    "productionBranch": "main"
  }
}
```

**Criar/Editar `vercel.json` na raiz do projeto:**
```json
{
  "git": {
    "productionBranch": "main"
  }
}
```

---

## 🎯 Configuração Alternativa: vercel.json

**Se a UI não tiver a opção, use `vercel.json`:**

### Criar arquivo `vercel.json` na raiz do projeto:

```json
{
  "git": {
    "productionBranch": "main"
  }
}
```

**Onde colocar:**
```
D:\landspace\
  ├── vercel.json  ← Criar aqui
  ├── package.json
  ├── next.config.ts
  └── ...
```

**Depois:**
1. Commit o arquivo
2. Push para o repositório
3. Vercel detectará e aplicará a configuração

---

## 🔄 Como Funciona Auto-Promotion (Se Configurado)

### Com Production Branch Configurado:
```
Push para `main` → Build → Deploy → Auto-promote para Production ✅
```

### Sem Production Branch Configurado:
```
Push para `main` → Build → Deploy → Fica como Preview ⚠️
→ Precisa promover manualmente
```

---

## 📋 Checklist: O Que Fazer Agora

### Para Resolver o NOT_FOUND Imediatamente:
- [ ] Ir em Deployments
- [ ] Encontrar deployment mais recente (status "Ready")
- [ ] Clicar em "Promote to Production"
- [ ] Aguardar 1-2 minutos
- [ ] Testar domínio

### Para Configurar Auto-Promotion (Opcional):
- [ ] Verificar se projeto está conectado ao Git (Settings → Git)
- [ ] Se não estiver, conectar repositório
- [ ] Tentar encontrar "Production Branch" em Settings
- [ ] Se não encontrar, criar `vercel.json` com configuração
- [ ] Commit e push do `vercel.json`

---

## 🆘 Se Nada Funcionar

### Alternativa 1: Fazer Novo Deploy
```bash
# Fazer commit vazio para trigger novo deploy
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

**Isso criará um novo deployment que pode ser promovido.**

### Alternativa 2: Usar Vercel CLI
```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Listar deployments
vercel ls

# Promover deployment específico
vercel promote [deployment-url] --yes
```

### Alternativa 3: Verificar Permissões
- Você precisa ser **Owner** ou **Admin** do projeto
- Se não for, peça para alguém com permissão promover

---

## 💡 Dica: Como Saber Se Está Funcionando

**Sinais de que auto-promotion está configurado:**
- Deployments de `main` aparecem automaticamente como "Current" em Production
- Não precisa promover manualmente após push para `main`

**Sinais de que NÃO está configurado:**
- Deployments de `main` ficam como "Preview"
- Precisa promover manualmente sempre

---

## 📚 Referências

- **Vercel Docs - Git Integration:** https://vercel.com/docs/deployments/git
- **Vercel Docs - vercel.json:** https://vercel.com/docs/projects/configuration
- **Vercel CLI:** https://vercel.com/docs/cli

---

**Última atualização:** Janeiro 2025
