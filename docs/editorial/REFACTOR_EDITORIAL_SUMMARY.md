# Refactor Editorial - Resumo das Alterações

## Objetivo
Unificar o tema editorial para 100% "paper & ink" (fundo claro, texto escuro) dentro do briefing, preservando todos os recursos com estética editorial consistente.

## Estrutura de Componentes (Antes → Depois)

### ANTES:
```
BriefingEditorialPage
├── EditorialShell (data-editorial="briefing")
│   ├── Topbar (cores hardcoded)
│   ├── BriefingBreadcrumbs (text-white ❌)
│   ├── ArticleHeader (cores hardcoded)
│   ├── RelatedMapInline
│   ├── RelatedPodcastInline
│   ├── ArticleBody (MDX)
│   ├── EditorialActionsClient (cores hardcoded)
│   ├── AttachmentSection (cores hardcoded)
│   ├── RelatedMapsSection (ContentCard dark ❌)
│   ├── RelatedBriefingsSection (ContentCard dark ❌)
│   └── Sidebar (cores hardcoded)
```

### DEPOIS:
```
BriefingEditorialPage
├── EditorialShell (data-editorial="briefing")
│   ├── Topbar (var(--editorial-hairline))
│   ├── BriefingBreadcrumbs (var(--editorial-ink-light) ✅)
│   ├── ArticleHeader (todas cores via CSS vars ✅)
│   ├── RelatedMapInline
│   ├── RelatedPodcastInline
│   ├── ArticleBody (MDX)
│   ├── EditorialActionsClient (todas cores via CSS vars ✅)
│   ├── AttachmentSection (todas cores via CSS vars ✅)
│   ├── RelatedMapsSection (editorial-related-rail ✅)
│   ├── RelatedBriefingsSection (editorial-related-rail ✅)
│   └── Sidebar (todas cores via CSS vars ✅)
```

## Arquivos Alterados

### 1. `BriefingBreadcrumbs.tsx`
**Problema:** Usava `text-[rgba(255,255,255,0.6)]` (texto branco em fundo claro)
**Solução:** Substituído por `var(--editorial-ink-light)` via inline styles

### 2. `RelatedMapsSection.tsx`
**Problema:** Usava `ContentCard` dark e `text-[rgba(255,255,255,0.92)]`
**Solução:** 
- Transformado em "related rail" editorial discreto
- Cards compactos com thumbnail pequena, título, resumo, link
- Todas as cores via CSS vars
- Se 1 mapa: "Mapa Relacionado", se mais: lista 2-3 + "Ver todos"

### 3. `RelatedBriefingsSection.tsx`
**Problema:** Usava `ContentCard` dark e `text-[rgba(255,255,255,0.92)]`
**Solução:**
- Transformado em "related rail" editorial discreto
- Cards compactos com thumbnail pequena, título, resumo, link
- Todas as cores via CSS vars

### 4. `editorial.css`
**Problema:** Regras agressivas com `!important` que quebravam herança
**Solução:**
- Removidas regras `!important` agressivas
- Criadas classes específicas: `.editorial-related-rail`, `.editorial-related-card`
- Mantidas apenas regras de isolamento necessárias

### 5. `ArticleHeader.tsx`
**Problema:** Cores hardcoded (`text-[#111111]`, `text-[#4B4B4B]`, etc.)
**Solução:** Todas as cores substituídas por CSS vars via inline styles

### 6. `AttachmentSection.tsx`
**Problema:** Cores hardcoded
**Solução:** Todas as cores substituídas por CSS vars via inline styles

### 7. `EditorialActionsClient.tsx`
**Problema:** Cores hardcoded
**Solução:** Todas as cores substituídas por CSS vars via inline styles + hover handlers

### 8. `BriefingEditorialPage.tsx`
**Problema:** Sidebar com cores hardcoded
**Solução:** Todas as cores substituídas por CSS vars via inline styles

## Variáveis CSS Editoriais (Fonte da Verdade)

```css
--editorial-paper: #F7F4EF;
--editorial-paper-alt: #FAFAF7;
--editorial-ink: #111111;
--editorial-ink-muted: #4B4B4B;
--editorial-ink-light: #6A6A6A;
--editorial-hairline: rgba(0, 0, 0, 0.12);
--editorial-accent: #00B86B;
--editorial-accent-hover: #00A85F;
```

## Critérios de Aceitação ✅

- ✅ Nenhum texto branco em fundo claro dentro do editorial
- ✅ "Mapas Relacionados" e "Outros Briefings" não competem com o headline (related rail discreto)
- ✅ A leitura (MDX) aparece com tipografia editorial, dropcap no primeiro parágrafo e links editoriais
- ✅ Ações (copiar/compartilhar/imprimir) continuam funcionando com estilo editorial
- ✅ Build OK, sem erros no console, sem async client component indevido
- ✅ Todas as cores usam variáveis CSS (fonte da verdade)
- ✅ Sem regras CSS agressivas que quebram herança

## Onde Cada Estilo Está Definido

### CSS (editorial.css):
- Variáveis CSS editoriais
- Estilos de prose (h2, h3, p, links, blockquote, etc.)
- Classes `.editorial-related-rail` e `.editorial-related-card`
- Print stylesheet

### Inline Styles (Componentes):
- Cores dinâmicas via `style={{ color: 'var(--editorial-ink)' }}`
- Hover handlers para interatividade
- Bordas via `style={{ borderColor: 'var(--editorial-hairline)' }}`

## Notas Técnicas

1. **Isolamento Editorial:** Mantido via `data-editorial="briefing"` no `EditorialShell`
2. **Responsividade:** Desktop 2 colunas (conteúdo + sidebar), mobile 1 coluna
3. **Performance:** Sem regras CSS agressivas, sem `!important` desnecessários
4. **Manutenibilidade:** Todas as cores centralizadas em variáveis CSS

## Validação

- ✅ Build sem erros
- ✅ Sem hydration mismatch
- ✅ Sem texto branco em fundo claro
- ✅ Related rails discretos e funcionais
- ✅ Ações preservadas e funcionais
- ✅ Print stylesheet mantido
