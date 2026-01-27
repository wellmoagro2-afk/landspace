# Progresso: Remoção de Inline Styles para CSP

**Data:** Janeiro 2025  
**Status:** 🟡 Em Progresso

---

## ✅ Casos Críticos Corrigidos

### 1. Progress Bar (Portal)
- ✅ **Arquivo:** `src/app/studio/portal/[protocol]/page.tsx`
- ✅ **Mudança:** Substituído `style={{ width: '${progress}%' }}` por SVG com atributo `width`
- ✅ **Implementação:** SVG com `viewBox` e `preserveAspectRatio`

### 2. WhatsAppButton
- ✅ **Arquivo:** `src/components/WhatsAppButton.tsx`
- ✅ **Mudança:** Removido `<style dangerouslySetInnerHTML>`
- ✅ **Implementação:** CSS movido para `WhatsAppButton.module.css`
- ✅ **Classes:** Todas as classes convertidas para CSS Modules

### 3. StrategyMap
- ✅ **Arquivo:** `src/components/strategy/StrategyMap.tsx`
- ✅ **Mudança:** Removido `<style jsx global>`
- ✅ **Implementação:** CSS movido para `globals.css` (estilos globais para Mapbox/MapLibre)

### 4. JSON-LD (ScholarlyArticleJsonLd)
- ✅ **Arquivo:** `src/app/strategy/briefings/[slug]/components/ScholarlyArticleJsonLd.tsx`
- ✅ **Mudança:** Substituído `<script>` por `next/script`
- ✅ **Implementação:** `Script` component com `strategy="beforeInteractive"`

### 5. BriefingClient (Sanitização)
- ✅ **Arquivo:** `src/app/strategy/briefings/[slug]/BriefingClient.tsx`
- ✅ **Mudança:** Adicionada sanitização em `briefing.content`
- ✅ **Implementação:** `sanitizeHtml()` remove `<script>`, atributos `on*`, e `style`

### 6. Casos Simples Corrigidos
- ✅ `src/components/home/MVVCompact.tsx` - Cores convertidas para classes Tailwind
- ✅ `src/components/home/Hero.tsx` - Alguns casos de cores e animationDelay

---

## 📋 Padrões de Substituição

### Cores Simples
```tsx
// ❌ Antes
style={{ color: '#9fb7c9' }}

// ✅ Depois
className="text-[#9fb7c9]"
```

### Background Colors
```tsx
// ❌ Antes
style={{ backgroundColor: 'rgba(159, 183, 201, 0.1)' }}

// ✅ Depois
className="bg-[rgba(159,183,201,0.1)]"
```

### Animation Delay
```tsx
// ❌ Antes
style={{ animationDelay: '1s' }}

// ✅ Depois
className="delay-1000"

// Para delays customizados:
className="delay-[2000ms]"
```

### Border Colors
```tsx
// ❌ Antes
style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}

// ✅ Depois
className="border-[rgba(99,102,241,0.1)]"
```

### Filters (Drop Shadow)
```tsx
// ❌ Antes
style={{ filter: 'drop-shadow(0 1px 2px rgba(11, 18, 32, 0.6))' }}

// ✅ Depois (se possível)
className="drop-shadow-[0_1px_2px_rgba(11,18,32,0.6)]"

// Ou mover para CSS Module/globals.css
```

### Background Gradients
```tsx
// ❌ Antes
style={{ background: 'linear-gradient(to right, #9fb7c9, #8aa5b8)' }}

// ✅ Depois (CSS Module ou globals.css)
// Criar classe em CSS Module:
// .gradientButton {
//   background: linear-gradient(to right, #9fb7c9, #8aa5b8);
// }
```

### Background Images (Data URIs)
```tsx
// ❌ Antes
style={{ backgroundImage: `url("data:image/svg+xml,...")` }}

// ✅ Depois (CSS Module ou globals.css)
// Mover para CSS Module com classe
```

---

## 🟡 Casos Restantes (326 ocorrências)

### Arquivos com Mais Ocorrências
1. `src/components/home/Hero.tsx` - Gradients, filters, background images
2. `src/components/home/FinalCTA.tsx` - Gradients, onMouseEnter/Leave handlers
3. `src/app/strategy/briefings/[slug]/components/*` - Múltiplos componentes com estilos inline
4. `src/components/strategy/*` - Componentes de estratégia
5. `src/app/tech/page.tsx` - Página Tech com muitos estilos
6. `src/app/strategy/consultancy/page.tsx` - Página de consultoria

### Estratégia para Casos Complexos

#### 1. Gradients e Backgrounds Complexos
- Criar classes em CSS Modules ou `globals.css`
- Usar variáveis CSS quando possível
- Exemplo: `.hero-gradient` em `globals.css`

#### 2. Filters e Drop Shadows
- Mover para CSS Modules
- Usar classes Tailwind arbitrárias quando possível: `drop-shadow-[...]`

#### 3. Event Handlers com Style (onMouseEnter/Leave)
- Substituir por classes CSS com `:hover`
- Usar `group` do Tailwind quando necessário
- Exemplo: `group-hover:bg-[...]`

#### 4. Background Images (Data URIs)
- Mover para CSS Modules
- Ou converter para SVG inline (se pequeno)

---

## 🔧 Utilitários Criados

### `src/lib/sanitize-html.ts`
- Remove tags `<script>`
- Remove atributos `on*` (onclick, onerror, etc.)
- Remove atributo `style`
- Usado em `BriefingClient` para sanitizar `briefing.content`

### CSS Modules Criados
- `src/components/WhatsAppButton.module.css` - Estilos do WhatsApp widget
- `src/components/strategy/StrategyMap.module.css` - (não usado, movido para globals.css)

---

## 📝 Próximos Passos

1. **Sistema de Substituição Automática** (se possível)
   - Criar script Node.js para substituir padrões comuns
   - Validar manualmente após substituição

2. **CSS Modules para Casos Complexos**
   - Criar módulos CSS para cada componente com muitos estilos
   - Migrar gradients, filters, backgrounds complexos

3. **Variáveis CSS**
   - Mover valores repetidos para variáveis CSS em `globals.css`
   - Exemplo: `--ls-accent-color: #9fb7c9;`

4. **Validação Final**
   - Buscar por `style={{` e garantir ZERO ocorrências
   - Buscar por `<style` e garantir apenas casos permitidos
   - Buscar por `dangerouslySetInnerHTML` e validar sanitização

---

## ✅ Checklist de Validação

- [x] Progress bar sem inline style
- [x] WhatsAppButton sem `<style dangerouslySetInnerHTML>`
- [x] StrategyMap sem `<style jsx global>`
- [x] JSON-LD usando `next/script`
- [x] BriefingClient com sanitização
- [ ] Todos os `style={{` removidos (326 restantes)
- [ ] Todos os `<style` removidos (exceto casos permitidos)
- [ ] Todos os `dangerouslySetInnerHTML` sanitizados

---

**Última atualização:** Janeiro 2025  
**Status:** 🟡 Em Progresso - Casos críticos corrigidos, 326 ocorrências restantes
