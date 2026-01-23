# ✅ Checklist de Configuração - URLs Hotmart

Este checklist ajuda você a configurar corretamente todas as URLs de checkout da Hotmart no site LandSpace.

---

## 📋 Checklist Geral

### Antes de Começar
- [ ] Você tem uma conta ativa na Hotmart
- [ ] Todos os cursos estão criados na plataforma Hotmart
- [ ] Você tem as URLs de checkout de cada curso
- [ ] As URLs estão no formato correto: `https://pay.hotmart.com/[CODIGO]`

---

## 🔗 URLs de Checkout

### Como Obter as URLs na Hotmart

1. Acesse sua conta na Hotmart
2. Vá em **"Produtos"** ou **"Meus Produtos"**
3. Clique no curso desejado
4. Procure por **"Link de Vendas"** ou **"Checkout"**
5. Copie a URL completa (formato: `https://pay.hotmart.com/[CODIGO]`)

### Formato Correto das URLs

✅ **Correto:**
```
https://pay.hotmart.com/A12345678X
https://pay.hotmart.com/B87654321Y
```

❌ **Incorreto:**
```
https://pay.hotmart.com/SEU_CHECKOUT_AQUI
pay.hotmart.com/A12345678X
http://pay.hotmart.com/A12345678X (sem 's' no https)
```

---

## 📝 Configuração por Curso

### 1. Transição de Uso e Cobertura da Terra

**Arquivo:** `src/app/cursos/data.ts`  
**Linha aproximada:** 32

```typescript
{
  slug: "transicao-uso-cobertura",
  // ... outros campos ...
  hotmartCheckoutUrl: "https://pay.hotmart.com/SEU_CHECKOUT_AQUI", // ⚠️ SUBSTITUIR
}
```

**Checklist:**
- [ ] URL obtida na Hotmart
- [ ] URL no formato correto (`https://pay.hotmart.com/...`)
- [ ] URL testada (abre corretamente)
- [ ] Substituída no arquivo `src/app/cursos/data.ts`
- [ ] Testado no site (botão "Comprar na Hotmart" funciona)

**URL Configurada:** `_________________________________`

---

### 2. Potencial de Uso Conservacionista

**Arquivo:** `src/app/cursos/data.ts`  
**Linha aproximada:** 56

```typescript
{
  slug: "potencial-uso-conservacionista",
  // ... outros campos ...
  hotmartCheckoutUrl: "https://pay.hotmart.com/SEU_CHECKOUT_AQUI", // ⚠️ SUBSTITUIR
}
```

**Checklist:**
- [ ] URL obtida na Hotmart
- [ ] URL no formato correto (`https://pay.hotmart.com/...`)
- [ ] URL testada (abre corretamente)
- [ ] Substituída no arquivo `src/app/cursos/data.ts`
- [ ] Testado no site (botão "Comprar na Hotmart" funciona)

**URL Configurada:** `_________________________________`

---

### 3. Modelagem de Perda de Solos com a RUSLE

**Arquivo:** `src/app/cursos/data.ts`  
**Linha aproximada:** 80

```typescript
{
  slug: "modelagem-perda-solos-rusle",
  // ... outros campos ...
  hotmartCheckoutUrl: "https://pay.hotmart.com/SEU_CHECKOUT_AQUI", // ⚠️ SUBSTITUIR
}
```

**Checklist:**
- [ ] URL obtida na Hotmart
- [ ] URL no formato correto (`https://pay.hotmart.com/...`)
- [ ] URL testada (abre corretamente)
- [ ] Substituída no arquivo `src/app/cursos/data.ts`
- [ ] Testado no site (botão "Comprar na Hotmart" funciona)

**URL Configurada:** `_________________________________`

---

## 🔧 Passo a Passo de Configuração

### Passo 1: Abrir o Arquivo
1. Abra o arquivo `src/app/cursos/data.ts` no seu editor
2. Localize o curso que deseja configurar

### Passo 2: Localizar a URL
Procure pela linha:
```typescript
hotmartCheckoutUrl: "https://pay.hotmart.com/SEU_CHECKOUT_AQUI",
```

### Passo 3: Substituir
Substitua `"https://pay.hotmart.com/SEU_CHECKOUT_AQUI"` pela URL real:
```typescript
hotmartCheckoutUrl: "https://pay.hotmart.com/A12345678X",
```

### Passo 4: Salvar e Testar
1. Salve o arquivo
2. O servidor Next.js recarrega automaticamente
3. Navegue até a página do curso
4. Clique em "Comprar na Hotmart"
5. Verifique se redireciona corretamente

---

## 🧪 Testes de Validação

### Teste 1: Links nos Cards
- [ ] Homepage: Card do curso → Popup → "Comprar na Hotmart" → Redireciona corretamente
- [ ] Página `/cursos`: Card do curso → Popup → "Comprar na Hotmart" → Redireciona corretamente
- [ ] Página `/favoritos`: Card favoritado → "Comprar na Hotmart" → Redireciona corretamente

### Teste 2: Páginas de Detalhes
- [ ] Página `/cursos/transicao-uso-cobertura` → "Comprar na Hotmart" → Redireciona corretamente
- [ ] Página `/cursos/potencial-uso-conservacionista` → "Comprar na Hotmart" → Redireciona corretamente
- [ ] Página `/cursos/modelagem-perda-solos-rusle` → "Comprar na Hotmart" → Redireciona corretamente

### Testo 3: Páginas Específicas
- [ ] Página dedicada "Transição de Uso e Cobertura" → Botão de compra → Redireciona corretamente
- [ ] Página dedicada "Potencial de Uso Conservacionista" → Botão de compra → Redireciona corretamente
- [ ] Página dedicada "Modelagem de Perda de Solos" → Botão de compra → Redireciona corretamente

### Teste 4: Verificação de URL
- [ ] Todas as URLs começam com `https://`
- [ ] Todas as URLs contêm `pay.hotmart.com`
- [ ] Nenhuma URL contém `SEU_CHECKOUT_AQUI`
- [ ] Todas as URLs abrem corretamente no navegador

---

## 📍 Onde as URLs São Usadas

As URLs de checkout aparecem em:

1. **Cards de Curso** (`src/components/CourseCard.tsx`)
   - Popup ao passar o mouse
   - Botão "Comprar na Hotmart"

2. **Páginas de Detalhes** (`src/app/cursos/[slug]/page.tsx`)
   - Botão principal de compra
   - Sidebar com informações

3. **Páginas Dedicadas**
   - `src/app/cursos/transicao-uso-cobertura/page.tsx`
   - `src/app/cursos/potencial-uso-conservacionista/page.tsx`
   - `src/app/cursos/modelagem-perda-solos-rusle/page.tsx`

4. **Página de Favoritos** (`src/app/favoritos/page.tsx`)
   - Cards de cursos favoritados

---

## ⚠️ Problemas Comuns e Soluções

### Problema: URL não funciona
**Solução:**
- Verifique se copiou a URL completa
- Certifique-se de que começa com `https://`
- Teste a URL diretamente no navegador
- Verifique se o produto está ativo na Hotmart

### Problema: URL abre mas mostra erro
**Solução:**
- Verifique se o produto está publicado na Hotmart
- Confirme se o código do checkout está correto
- Verifique se há restrições de acesso no produto

### Problema: URL não aparece no site
**Solução:**
- Verifique se salvou o arquivo `data.ts`
- Confirme que o servidor recarregou (veja o terminal)
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se não há erros de sintaxe no arquivo

### Problema: URL funciona mas não redireciona
**Solução:**
- Verifique se a URL está entre aspas: `"https://..."`
- Confirme que não há espaços extras
- Verifique se não há quebra de linha na URL
- Teste em modo anônimo do navegador

---

## 📝 Template de Configuração Rápida

Copie e cole este template, substituindo as URLs:

```typescript
export const COURSES: Course[] = [
  {
    slug: "transicao-uso-cobertura",
    // ... outros campos ...
    hotmartCheckoutUrl: "https://pay.hotmart.com/[CODIGO_CURSO_1]",
  },
  {
    slug: "potencial-uso-conservacionista",
    // ... outros campos ...
    hotmartCheckoutUrl: "https://pay.hotmart.com/[CODIGO_CURSO_2]",
  },
  {
    slug: "modelagem-perda-solos-rusle",
    // ... outros campos ...
    hotmartCheckoutUrl: "https://pay.hotmart.com/[CODIGO_CURSO_3]",
  },
];
```

---

## ✅ Checklist Final

Antes de considerar a configuração completa:

- [ ] Todas as URLs foram substituídas
- [ ] Nenhuma URL contém `SEU_CHECKOUT_AQUI`
- [ ] Todas as URLs foram testadas manualmente
- [ ] Todos os botões "Comprar na Hotmart" funcionam
- [ ] Testado em diferentes páginas (homepage, listagem, detalhes)
- [ ] Testado em diferentes dispositivos (desktop, mobile)
- [ ] Verificado que o fluxo completo funciona: Site → Hotmart → Checkout

---

## 🎯 Próximos Passos Após Configuração

1. ✅ URLs configuradas
2. ⏳ Testar fluxo completo de compra (teste real)
3. ⏳ Verificar se os emails de confirmação da Hotmart estão funcionando
4. ⏳ Monitorar conversões e ajustar se necessário
5. ⏳ Adicionar tracking (Google Analytics, Facebook Pixel) se desejar

---

## 📞 Suporte

Se tiver problemas:
1. Verifique a documentação da Hotmart
2. Entre em contato com o suporte da Hotmart
3. Verifique os logs do console do navegador (F12)

---

**Última atualização:** Dezembro 2024




