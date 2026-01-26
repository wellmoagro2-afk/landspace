# Correções Definitivas - `/strategy/briefings/[slug]`

## Resumo do Diagnóstico

### Problemas Identificados e Corrigidos:

1. **Prisma/DB Instável**
   - ❌ Problema: Prisma sendo chamado diretamente no `page.tsx` sem tratamento de erros robusto
   - ✅ Solução: Criado `src/lib/briefingData.ts` com wrapper seguro que:
     - Prioriza fontes estáticas (Keystatic > MDX > Static > Prisma)
     - Trata erros graciosamente (não quebra build se Prisma falhar)
     - Compatível com dev (SQLite) e produção (Vercel/Postgres)

2. **MDXRemote Async Client Component**
   - ❌ Problema: Risco de usar MDXRemote em Client Component
   - ✅ Solução: Confirmado que `ArticleBody.tsx` é Server Component e usa `next-mdx-remote/rsc` corretamente

3. **Image Conflitos**
   - ❌ Problema: Risco de conflito com `window.Image` global
   - ✅ Solução: Todos os imports usam `import Image from "next/image"` corretamente
   - ✅ Adicionado `unoptimized` para URLs externas no componente `img` do MDX

4. **Performance - Lazy Loading**
   - ❌ Problema: Iframes de mapas carregando imediatamente
   - ✅ Solução: Criado `LazyMapEmbed.tsx` com IntersectionObserver para carregar apenas quando visível

5. **Feature Flags**
   - ✅ Criado `src/lib/featureFlags.ts` para controlar recursos:
     - `NEXT_PUBLIC_ENABLE_PDF` (default: false)
     - `NEXT_PUBLIC_ENABLE_MAP_DOWNLOAD` (default: true)
     - `NEXT_PUBLIC_ENABLE_MAP_EMBED` (default: true)

## Arquivos Alterados

### Novos Arquivos:
1. **`src/lib/featureFlags.ts`**
   - Feature flags centralizadas via env vars
   - Permite habilitar/desabilitar recursos sem alterar código

2. **`src/lib/briefingData.ts`**
   - Wrapper seguro para buscar briefing data
   - Fallback gracioso: Keystatic > MDX > Static > Prisma
   - Trata erros sem quebrar build

3. **`src/components/strategy/LazyMapEmbed.tsx`**
   - Client Component para lazy-load de iframes
   - Usa IntersectionObserver para carregar apenas quando visível
   - Placeholder elegante durante carregamento

### Arquivos Modificados:
1. **`src/app/strategy/briefings/[slug]/page.tsx`**
   - Substituído busca direta de Prisma por `getBriefingData()`
   - Código simplificado e mais robusto
   - Tratamento de erros melhorado

2. **`src/app/strategy/briefings/[slug]/components/AttachmentSection.tsx`**
   - Adicionado lazy-load para mapas (`LazyMapEmbed`)
   - Integrado feature flags para controlar visibilidade
   - Melhor performance com dynamic import

3. **`src/lib/editorial-mdx-components.tsx`**
   - Componente `img` melhorado com `unoptimized` para URLs externas
   - Garantia de uso correto de `next/image`

## Arquitetura Server/Client

### Server Components (✅ Correto):
- `page.tsx` - Busca dados no server
- `BriefingEditorialPage.tsx` - Coordena layout editorial
- `ArticleBody.tsx` - Renderiza MDX com `next-mdx-remote/rsc`
- `ArticleHeader.tsx` - Header do artigo
- `AttachmentSection.tsx` - Seção de anexos (com dynamic import para lazy-load)
- `RelatedBriefingsSection.tsx` - Briefings relacionados
- `RelatedMapsSection.tsx` - Mapas relacionados

### Client Components (✅ Correto):
- `EditorialActionsClient.tsx` - Ações (copy/share/print)
- `EditorialContentWrapper.tsx` - Wrapper para ações
- `LazyMapEmbed.tsx` - Lazy-load de mapas (IntersectionObserver)
- `PrintFooter.tsx` - Footer para impressão

## Recursos Preservados

✅ **Copiar link** - Funcional em `EditorialActionsClient.tsx`
✅ **Compartilhar** - Web Share API + fallback em `EditorialActionsClient.tsx`
✅ **Imprimir / Salvar PDF** - `window.print()` + print stylesheet premium
✅ **Anexos** - Vídeo relacionado, mapa relacionado (com lazy-load)
✅ **Relacionados** - Outros briefings + mapas relacionados
✅ **PDF** - Removido por padrão, mas pode ser reativado via feature flag

## Performance

✅ **Lazy-loading** - Mapas carregam apenas quando visíveis
✅ **Dynamic imports** - Componentes pesados carregados sob demanda
✅ **Server Components** - Menor bundle client
✅ **Imagens otimizadas** - `next/image` com sizes corretos

## Build e Navegação

### Para testar:
```bash
npm run build
npm run dev
```

### Checklist de Verificação:
- [ ] Build sem erros
- [ ] Dev server inicia sem erros
- [ ] Navegação entre briefings funciona
- [ ] MDX renderiza corretamente
- [ ] Imagens carregam
- [ ] Mapas lazy-load funcionam
- [ ] Ações (copy/share/print) funcionam
- [ ] Console sem erros

## Feature Flags

Adicione ao `.env.local`:
```env
# PDF (default: false - removido)
NEXT_PUBLIC_ENABLE_PDF=false

# Map Download (default: true)
NEXT_PUBLIC_ENABLE_MAP_DOWNLOAD=true

# Map Embed (default: true)
NEXT_PUBLIC_ENABLE_MAP_EMBED=true
```

## Notas Finais

- **Prisma**: Agora é opcional - se falhar, usa fontes estáticas
- **MDX**: Renderiza apenas no Server Component (sem async client)
- **Image**: Todos os imports corretos, sem conflitos
- **Performance**: Lazy-load implementado para embeds pesados
- **Feature Flags**: Sistema pronto para controlar recursos
