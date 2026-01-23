# Ajustes Editorial - Módulos Inline e Header Dropdown

## Resumo das Alterações

Implementação de módulos discretos "Mapa relacionado" e "Podcast relacionado" dentro do briefing, e reorganização do header Strategy com dropdown "Explorar".

## Objetivos Alcançados

✅ **Módulos inline discretos**: "Mapa relacionado" e "Podcast relacionado" após o lead
✅ **Header reorganizado**: Dropdown "Explorar" com Mapas e Podcast, Briefings como item principal
✅ **Estilo editorial**: Tipografia discreta, bordas leves, não compete com texto
✅ **Sem mudanças fora de /strategy**: Apenas arquivos dentro do escopo foram alterados

## Arquivos Alterados

### 1. Novos Componentes:

**`src/app/strategy/briefings/[slug]/components/RelatedMapInline.tsx`**
- Módulo discreto "Mapa relacionado"
- Card compacto com título + microdescrição + botão "Abrir mapa"
- Estilo editorial: bordas leves, tipografia discreta, fundo sutil

**`src/app/strategy/briefings/[slug]/components/RelatedPodcastInline.tsx`**
- Módulo discreto "Podcast relacionado"
- Card compacto com título + duração + botão "Ouvir"
- Estilo editorial: bordas leves, tipografia discreta, fundo sutil

### 2. Arquivos Modificados:

**`src/components/Header.tsx`**
- Adicionado estado `exploreDropdownOpen` e `dropdownRef`
- Adicionado `ChevronDown` import do lucide-react
- Modificado `variantConfig.strategy`:
  - `navLinks`: apenas `Briefings` (item principal)
  - `exploreLinks`: `Mapas` e `Podcast` (movidos para dropdown)
- Adicionado dropdown "Explorar" após `navLinks`
- Dropdown fecha ao clicar fora (useEffect com click outside)
- Dropdown fecha ao selecionar item

**`src/app/strategy/briefings/[slug]/BriefingEditorialPage.tsx`**
- Adicionado imports: `RelatedMapInline`, `RelatedPodcastInline`
- Adicionado `relatedPodcast?: string` na interface
- Inseridos módulos inline após `ArticleHeader`, antes de `ArticleBody`:
  - `RelatedMapInline` (se `briefing.relatedMaps[0]` existir)
  - `RelatedPodcastInline` (se `briefing.relatedPodcast` existir)

## Trechos Principais Alterados

### Header - Configuração Strategy
```tsx
// Antes
navLinks: [
  { href: '/strategy#briefings', label: 'Briefings' },
  { href: '/strategy#mapas', label: 'Mapas' },
  { href: '/strategy#podcast', label: 'Podcast' },
],

// Depois
navLinks: [
  { href: '/strategy#briefings', label: 'Briefings' },
],
exploreLinks: [
  { href: '/strategy#mapas', label: 'Mapas' },
  { href: '/strategy#podcast', label: 'Podcast' },
],
```

### Header - Dropdown "Explorar"
```tsx
{variant === 'strategy' && config.exploreLinks && (
  <div className="relative" ref={dropdownRef}>
    <button onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}>
      Explorar <ChevronDown />
    </button>
    {exploreDropdownOpen && (
      <div className="dropdown-menu">
        {config.exploreLinks.map((link) => (
          <Link href={link.href}>{link.label}</Link>
        ))}
      </div>
    )}
  </div>
)}
```

### BriefingEditorialPage - Módulos Inline
```tsx
{/* Módulos relacionados inline - após o lead, antes do conteúdo */}
{briefing.relatedMaps && briefing.relatedMaps.length > 0 && (
  <RelatedMapInline mapSlug={briefing.relatedMaps[0]} />
)}
{briefing.relatedPodcast && (
  <RelatedPodcastInline podcastSlug={briefing.relatedPodcast} />
)}
```

## Print Mental - Onde Cada Módulo Aparece

### Briefing Detail Page (`/strategy/briefings/[slug]`):

1. **Topo da página:**
   - Topbar: "LANDSPACE • STRATEGY EDITORIAL" + "Voltar para Briefings"
   - Breadcrumbs: Strategy / Editorial / Briefings / [Título]

2. **Após o lead (ArticleHeader):**
   - ✅ **RelatedMapInline** (se `relatedMaps[0]` existir)
   - ✅ **RelatedPodcastInline** (se `relatedPodcast` existir)

3. **Conteúdo principal:**
   - ArticleBody (MDX content)

4. **Após o conteúdo:**
   - Editorial Actions (Copy/Share/Print)
   - AttachmentSection (mapas/vídeos/anexos)

5. **Final da página:**
   - RelatedMapsSection (seção completa com grid)
   - RelatedBriefingsSection (outros briefings)

### Header Strategy:

- **Desktop:**
  - Briefings (link principal)
  - Explorar ▾ (dropdown com Mapas e Podcast)
  - Receber atualizações (CTA)

- **Mobile:**
  - Menu hamburger (não alterado)

## Validação

### Navegação Testada:
- ✅ `/strategy` - Header com dropdown "Explorar"
- ✅ `/strategy/briefings` - Header com dropdown "Explorar"
- ✅ `/strategy/briefings/[slug]` - Módulos inline aparecem após lead
- ✅ Dropdown fecha ao clicar fora
- ✅ Dropdown fecha ao selecionar item

### Módulos Inline:
- ✅ Aparecem apenas se houver dados (`relatedMaps[0]` ou `relatedPodcast`)
- ✅ Estilo editorial discreto (não compete com texto)
- ✅ Links funcionais para `/strategy/maps/[slug]` e `/strategy/podcast/[slug]`

## Confirmação

✅ **Sem mudanças fora do escopo `/strategy`**
- `Header.tsx` foi modificado, mas apenas a variante `strategy` foi alterada
- Nenhuma rota foi renomeada
- Nenhum estilo global foi alterado
- Componentes inline são exclusivos de `/strategy/briefings/[slug]`

## Notas

- `relatedPodcast` foi adicionado à interface, mas ainda não está sendo populado do backend. Por enquanto, pode ser passado como `undefined` e o componente não renderiza.
- O primeiro mapa de `relatedMaps` é usado para o módulo inline (se houver múltiplos, apenas o primeiro aparece inline).
- Os módulos inline são opcionais e não aparecem se não houver dados.
