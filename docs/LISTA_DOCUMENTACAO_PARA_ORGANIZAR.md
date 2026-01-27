# 📚 Lista de Arquivos de Documentação para Organizar

**Data:** Janeiro 2025  
**Objetivo:** Mover todos os arquivos de documentação, relatórios e manuais para a pasta `docs/` para organizar o projeto.

## 📋 Arquivos na Raiz do Projeto (para mover para `docs/`)

### 🔐 Documentação de Segurança
1. **`ANALISE_SEGURANCA_ARQUITETURA.md`** - Análise completa de segurança Big Tech
2. **`HARDENING_CRITICO_RESUMO.md`** - Resumo de hardening crítico
3. **`HARDENING_GAPS_CORRIGIDOS.md`** - Gaps de segurança corrigidos
4. **`EXEMPLO_HANDLER_SEGURANCA.md`** - Exemplo de handler de segurança

### 🏗️ Arquitetura e Estrutura
5. **`ARQUITETURA_SITE_COMPLETA.md`** - Arquitetura completa do site
6. **`ARQUITETURA_SITE_COMPLETA.txt`** - Versão texto da arquitetura
7. **`NOVA_ESTRUTURA_BIG_TECH.md`** - Nova estrutura Big Tech

### 🔧 Correções e Diagnósticos
8. **`HYDRATION_ROOT_CAUSE_FIX.md`** - Correção root cause de hydration
9. **`HYDRATION_FIX.md`** - Correção de hydration
10. **`HYDRATION_MISMATCH_DEFINITIVE_FIX.md`** - Correção definitiva de hydration mismatch
11. **`FIX_404_HOME_ROUTE.md`** - Correção de 404 na rota home
12. **`FIX_MIDDLEWARE_PROXY_CONFLICT.md`** - Correção de conflito middleware/proxy
13. **`DIAGNOSTICO_LOGIN_500.md`** - Diagnóstico de erro 500 no login
14. **`CSP_INLINE_STYLES_PROGRESSO.md`** - Progresso de CSP inline styles

### 📝 Documentação Editorial
15. **`AJUSTES_EDITORIAL_STRATEGY.md`** - Ajustes na estratégia editorial
16. **`CORRECOES_BRIEFING.md`** - Correções de briefing
17. **`PADRONIZACAO_EDITORIAL.md`** - Padronização editorial
18. **`REFACTOR_EDITORIAL_SUMMARY.md`** - Resumo de refatoração editorial

### 📖 Manuais e Guias
19. **`MANUAL_EDICAO_BRIEFINGS.md`** - Manual de edição de briefings
20. **`MANUAL_EDICAO_BRIEFINGS.html`** - Versão HTML do manual
21. **`GUIA_IMAGENS.md`** - Guia de imagens
22. **`GUIA_IMAGENS.html`** - Versão HTML do guia
23. **`ESPECIFICACOES_IMAGENS_CURSOS.md`** - Especificações de imagens de cursos

### 🚀 Setup e Implementação
24. **`IMPLEMENTACAO_ADMIN_COMPLETA.md`** - Implementação completa do admin
25. **`SETUP_ADMIN.md`** - Setup do admin
26. **`KEYSTATIC_SETUP.md`** - Setup do Keystatic

### 📊 Checklists e Fluxos
27. **`CHECKLIST_HOTMART.md`** - Checklist Hotmart
28. **`CHECKLIST_HOTMART.html`** - Versão HTML do checklist
29. **`FLUXO_HOTMART.md`** - Fluxo Hotmart

### 🔍 Auditorias e Revisões
30. **`AUDITORIA_NAVEGACAO.md`** - Auditoria de navegação
31. **`REVISAO_NAVEGACAO_COMPLETA.md`** - Revisão completa de navegação

### 📚 READMEs
32. **`README.md`** - README principal (manter na raiz ou mover?)
33. **`README_ADMIN.md`** - README do Admin Portal
34. **`README_PORTAL.md`** - README do Portal do Cliente

### 🤖 Exemplos
35. **`EXEMPLO_HANDLER_CHATGPT.md`** - Exemplo de handler ChatGPT

### 📄 Outros
36. **`tsc-errors.txt`** - Erros do TypeScript (pode ser temporário/debug)
37. **`200_000`** - Arquivo sem extensão (verificar o que é)

## 📁 Arquivos em `public/` (manter ou mover?)

### READMEs em public/
38. **`public/README_LOGO.md`** - README sobre logos
39. **`public/maps/README.md`** - README sobre mapas
40. **`public/pdfs/README.md`** - README sobre PDFs
41. **`public/courses/README.md`** - README sobre cursos
42. **`public/briefings/maps/README.md`** - README sobre mapas em briefings
43. **`public/briefings/pdfs/README.md`** - README sobre PDFs em briefings
44. **`public/briefings/covers/README.md`** - README sobre capas em briefings

**Nota:** READMEs em `public/` podem ser mantidos onde estão (são documentação específica dos assets) ou movidos para `docs/public/`.

## 📁 Arquivos em `src/app/studio/` (verificar)

45. **`src/app/studio/servicos_e_organizacao.md`** - Documentação de serviços (pode ser conteúdo, não documentação técnica)

## ✅ Arquivos que JÁ estão em `docs/` (manter)

- `docs/EDITORIAL_GUIDELINES.md`
- `docs/FAVICON_VERCEL_SOLUCAO.md`
- `docs/LIMPAR_CACHE_NAVEGADOR.md`
- `docs/ONLINE_POSTGRES_VERCEL.md`
- `docs/qa-csp.md`
- `docs/SECURITY_AUDIT_BIGTECH.md`
- `docs/SECURITY_BACKLOG.md`
- `docs/VERCEL_404_DIAGNOSTICO.md`
- `docs/VERCEL_NOT_FOUND_EDUCATIONAL.md`
- `docs/VERCEL_PRODUCTION_BRANCH_ALTERNATIVAS.md`

## 🎯 Recomendação de Organização

### Estrutura sugerida para `docs/`:

```
docs/
├── architecture/              # Arquitetura e estrutura
│   ├── ARQUITETURA_SITE_COMPLETA.md
│   ├── ARQUITETURA_SITE_COMPLETA.txt
│   └── NOVA_ESTRUTURA_BIG_TECH.md
│
├── security/                  # Segurança e hardening
│   ├── ANALISE_SEGURANCA_ARQUITETURA.md
│   ├── HARDENING_CRITICO_RESUMO.md
│   ├── HARDENING_GAPS_CORRIGIDOS.md
│   ├── EXEMPLO_HANDLER_SEGURANCA.md
│   ├── SECURITY_AUDIT_BIGTECH.md (já existe)
│   └── SECURITY_BACKLOG.md (já existe)
│
├── fixes/                     # Correções e diagnósticos
│   ├── HYDRATION_ROOT_CAUSE_FIX.md
│   ├── HYDRATION_FIX.md
│   ├── HYDRATION_MISMATCH_DEFINITIVE_FIX.md
│   ├── FIX_404_HOME_ROUTE.md
│   ├── FIX_MIDDLEWARE_PROXY_CONFLICT.md
│   ├── DIAGNOSTICO_LOGIN_500.md
│   ├── CSP_INLINE_STYLES_PROGRESSO.md
│   ├── VERCEL_404_DIAGNOSTICO.md (já existe)
│   └── VERCEL_NOT_FOUND_EDUCATIONAL.md (já existe)
│
├── editorial/                 # Documentação editorial
│   ├── AJUSTES_EDITORIAL_STRATEGY.md
│   ├── CORRECOES_BRIEFING.md
│   ├── PADRONIZACAO_EDITORIAL.md
│   ├── REFACTOR_EDITORIAL_SUMMARY.md
│   └── EDITORIAL_GUIDELINES.md (já existe)
│
├── manuals/                   # Manuais e guias
│   ├── MANUAL_EDICAO_BRIEFINGS.md
│   ├── MANUAL_EDICAO_BRIEFINGS.html
│   ├── GUIA_IMAGENS.md
│   ├── GUIA_IMAGENS.html
│   └── ESPECIFICACOES_IMAGENS_CURSOS.md
│
├── setup/                     # Setup e implementação
│   ├── IMPLEMENTACAO_ADMIN_COMPLETA.md
│   ├── SETUP_ADMIN.md
│   ├── KEYSTATIC_SETUP.md
│   ├── FAVICON_VERCEL_SOLUCAO.md (já existe)
│   ├── LIMPAR_CACHE_NAVEGADOR.md (já existe)
│   └── ONLINE_POSTGRES_VERCEL.md (já existe)
│
├── checklists/                # Checklists e fluxos
│   ├── CHECKLIST_HOTMART.md
│   ├── CHECKLIST_HOTMART.html
│   └── FLUXO_HOTMART.md
│
├── audits/                    # Auditorias
│   ├── AUDITORIA_NAVEGACAO.md
│   └── REVISAO_NAVEGACAO_COMPLETA.md
│
├── examples/                  # Exemplos
│   ├── EXEMPLO_HANDLER_CHATGPT.md
│   └── EXEMPLO_HANDLER_SEGURANCA.md
│
├── readme/                    # READMEs
│   ├── README_ADMIN.md
│   └── README_PORTAL.md
│
└── vercel/                    # Documentação Vercel
    ├── VERCEL_PRODUCTION_BRANCH_ALTERNATIVAS.md (já existe)
    └── qa-csp.md (já existe)
```

## ⚠️ Arquivos a Verificar

1. **`README.md`** (raiz) - Decidir se mantém na raiz ou move para `docs/`
2. **`tsc-errors.txt`** - Pode ser temporário/debug, considerar adicionar ao `.gitignore`
3. **`200_000`** - Verificar o que é antes de mover
4. **`src/app/studio/servicos_e_organizacao.md`** - Verificar se é conteúdo ou documentação

## 📝 Total de Arquivos para Mover

**Raiz do projeto:** ~37 arquivos  
**Total estimado:** ~37-44 arquivos (dependendo dos READMEs em `public/`)

---

**Última atualização:** Janeiro 2025
