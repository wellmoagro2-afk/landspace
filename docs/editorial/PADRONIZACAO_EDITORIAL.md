# Padronização de Nomenclatura e Microcopy - Editorial Strategy

## Resumo das Alterações

Padronização da nomenclatura e microcopy do "Editorial" na área `/strategy`, mantendo layout atual e sem alterar funcionalidades, rotas ou estilos globais.

## Objetivos Alcançados

✅ **Kicker padronizado**: "LANDSPACE • STRATEGY EDITORIAL" em caixa alta
✅ **Breadcrumbs padronizados**: "Strategy / Editorial / Briefings / [Título]"
✅ **Constantes centralizadas**: Evita hardcode espalhado
✅ **Sem mudanças fora do escopo**: Apenas `/strategy/**`

## Arquivos Alterados

### 1. Novo Arquivo: `src/lib/strategy/constants.ts`
**Criado para centralizar constantes:**
```typescript
export const STRATEGY_EDITORIAL_KICKER = "LANDSPACE • STRATEGY EDITORIAL";
export const STRATEGY_EDITORIAL_SHORT = "Editorial";
export const STRATEGY_LABEL = "Strategy";
export const STRATEGY_BRIEFINGS_LABEL = "Briefings";
export const STRATEGY_MAPS_LABEL = "Mapas";
export const STRATEGY_PODCAST_LABEL = "Podcast";
```

### 2. `src/app/strategy/briefings/[slug]/BriefingBreadcrumbs.tsx`
**Alterações:**
- Adicionado import das constantes
- Adicionado item "Editorial" no breadcrumb
- Sequência atualizada: Strategy / Editorial / Briefings / [Título]

**Antes:**
```tsx
Strategy > Briefings > [Título]
```

**Depois:**
```tsx
Strategy > Editorial > Briefings > [Título]
```

### 3. `src/app/strategy/briefings/[slug]/components/ArticleHeader.tsx`
**Alterações:**
- Kicker atualizado para usar constante `STRATEGY_EDITORIAL_KICKER`
- Texto alterado de "LandSpace Strategy • Briefing" para "LANDSPACE • STRATEGY EDITORIAL"

**Antes:**
```tsx
<span>LandSpace Strategy • Briefing</span>
```

**Depois:**
```tsx
<span>{STRATEGY_EDITORIAL_KICKER}</span>
```

### 4. `src/app/strategy/briefings/[slug]/BriefingEditorialPage.tsx`
**Alterações:**
- Topbar atualizado para usar constante `STRATEGY_EDITORIAL_KICKER`
- Adicionado breadcrumbs antes do ArticleHeader
- Import do BriefingBreadcrumbs adicionado

**Antes:**
```tsx
<a href="/strategy">LandSpace Editorial</a>
```

**Depois:**
```tsx
<a href="/strategy">{STRATEGY_EDITORIAL_KICKER}</a>
```

## Trechos Principais Alterados

### Kicker no ArticleHeader
```tsx
// Antes
<span className="text-xs font-sans uppercase tracking-widest text-[#6A6A6A]">
  LandSpace Strategy • Briefing
</span>

// Depois
<span className="text-xs font-sans uppercase tracking-widest text-[#6A6A6A]">
  {STRATEGY_EDITORIAL_KICKER}
</span>
```

### Topbar no BriefingEditorialPage
```tsx
// Antes
<a href="/strategy">LandSpace Editorial</a>

// Depois
<a href="/strategy">{STRATEGY_EDITORIAL_KICKER}</a>
```

### Breadcrumbs
```tsx
// Antes
Strategy > Briefings > [Título]

// Depois
Strategy > Editorial > Briefings > [Título]
```

## Validação

### Navegação Testada:
- ✅ `/strategy` - Página principal (sem alterações)
- ✅ `/strategy/briefings` - Listagem (sem alterações)
- ✅ `/strategy/briefings/[slug]` - Detalhe com kicker e breadcrumbs padronizados
- ✅ `/strategy/maps` - Sem alterações (não tem breadcrumbs/kicker)
- ✅ `/strategy/podcast` - Sem alterações (não tem breadcrumbs/kicker)

### Elementos Padronizados:
- ✅ Kicker: "LANDSPACE • STRATEGY EDITORIAL" (uppercase, tracking leve)
- ✅ Breadcrumbs: "Strategy / Editorial / Briefings / [Título]"
- ✅ Topbar: "LANDSPACE • STRATEGY EDITORIAL"

## Confirmação

✅ **Sem mudanças fora do escopo `/strategy`**
- Nenhum arquivo fora de `/src/app/strategy/**` foi alterado
- Nenhuma rota foi renomeada
- Nenhum estilo global foi alterado
- Componentes compartilhados não foram modificados (apenas usados dentro de `/strategy`)

## Notas

- O componente `BriefingBreadcrumbs` já existia mas não estava sendo usado no `BriefingEditorialPage`. Foi adicionado para consistência.
- O byline "Por LandSpace Editorial" foi mantido (não faz parte do kicker).
- Constantes centralizadas facilitam futuras mudanças de nomenclatura.
