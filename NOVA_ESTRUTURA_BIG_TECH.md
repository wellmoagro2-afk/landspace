# 🚀 Nova Estrutura Editorial "Big Tech" - Briefings

**Versão:** 2.0  
**Data:** Janeiro 2026  
**Status:** Implementado

---

## 📋 Resumo

O schema do Keystatic foi completamente reconfigurado para suportar uma estrutura editorial rigorosa estilo "Big Tech", com campos compartimentados e especializados para cada seção do briefing.

---

## 🎯 Estrutura de Campos

### **METADADOS INICIAIS**
- ✅ `title` (Texto simples) - Obrigatório
- ✅ `abstract` (Área de texto - limite 200 palavras) - Obrigatório
- ✅ `keywords` (Lista de exatamente 3 termos) - Obrigatório

### **NÚCLEO ESTRATÉGICO**
- ✅ `introducao` (Editor de texto rico/Markdown)
  - Contexto e objetivos
  - Renderizado com fonte Serif

### **MATERIAL E MÉTODO (Compartimentado)**
- ✅ `area_estudo` (Markdown)
  - Foco em recorte espacial
  - Renderizado como subseção
  
- ✅ `bases_dados` (Markdown)
  - Fontes e resoluções
  - Renderizado como subseção
  
- ✅ `procedimentos` (Lista/Bullets)
  - Pipeline metodológico
  - **Renderizado como Fluxograma Vertical Sutil**
  - Círculos numerados com linhas finas
  - Comunica "Processo Tecnológico" visualmente

### **ANÁLISE TÉCNICA**
- ✅ `resultados_discussao` (Editor de texto rico com suporte a upload de imagem para o Mapa)
  - **Destaque máximo para o Mapa** (se disponível)
  - Mapa aparece antes do texto
  - Suporte a imagens inline
  
- ✅ `limitacoes_incertezas` (Texto curto - 1 parágrafo)
  - Caixa destacada com borda verde
  - Fonte Serif

### **FECHAMENTO**
- ✅ `conclusao` (Lista de bullets)
  - Achados e próximos passos
  - Renderizado como lista com bullets verdes
  
- ✅ `referencias` (Markdown padrão ABNT)
  - Formatação ABNT
  - Links suportados

### **IDENTIFICADORES**
- ✅ `volume` (Número) - Obrigatório
- ✅ `edition` (Número) - Obrigatório
- ✅ `doi` (Texto) - Opcional mas recomendado

---

## 🎨 Componentes Criados

### 1. **ProcedimentosFlowchart**
- **Arquivo:** `src/app/strategy/briefings/[slug]/components/ProcedimentosFlowchart.tsx`
- **Função:** Renderiza lista de procedimentos como fluxograma vertical
- **Visual:**
  - Linha vertical sutil
  - Círculos numerados (verde esmeralda)
  - Texto alinhado à direita
  - Comunica "Processo Tecnológico" instantaneamente

### 2. **MaterialMetodoSection**
- **Arquivo:** `src/app/strategy/briefings/[slug]/components/MaterialMetodoSection.tsx`
- **Função:** Renderiza seção completa "Material e Método"
- **Subseções:**
  - Área de Estudo
  - Bases de Dados
  - Procedimentos (com fluxograma)

### 3. **ResultadosDiscussaoSection**
- **Arquivo:** `src/app/strategy/briefings/[slug]/components/ResultadosDiscussaoSection.tsx`
- **Função:** Renderiza "Resultados e Discussão" com destaque máximo para o mapa
- **Características:**
  - Mapa aparece primeiro (se disponível)
  - Box destacado com glow verde
  - Suporte a conteúdo MDX rico

### 4. **IntroducaoSection**
- **Arquivo:** `src/app/strategy/briefings/[slug]/components/IntroducaoSection.tsx`
- **Função:** Renderiza seção "Introdução" (Núcleo Estratégico)

### 5. **LimitacoesIncertezasSection**
- **Arquivo:** `src/app/strategy/briefings/[slug]/components/LimitacoesIncertezasSection.tsx`
- **Função:** Renderiza "Limitações e Incertezas" em caixa destacada

### 6. **ConclusaoListSection**
- **Arquivo:** `src/app/strategy/briefings/[slug]/components/ConclusaoListSection.tsx`
- **Função:** Renderiza "Conclusão" como lista de bullets

---

## 📐 Ordem de Renderização

A página renderiza as seções na seguinte ordem:

1. **Cabeçalho** (ArticleHeader)
   - Título, Subtítulo, Resumo
   - Metadados (Volume, Edição, DOI, ID)

2. **Abstract & Keywords Box** (Web)

3. **Introdução** (Núcleo Estratégico)
   - Se `introducao` estiver preenchido

4. **Material e Método** (Compartimentado)
   - Área de Estudo
   - Bases de Dados
   - Procedimentos (Fluxograma)

5. **Resultados e Discussão**
   - **Mapa em destaque** (se disponível)
   - Conteúdo MDX

6. **Limitações e Incertezas**
   - Caixa destacada

7. **Conclusão**
   - Lista de bullets

8. **Referências**
   - Padrão ABNT

9. **QR Code** (apenas print)

10. **Rodapé** (apenas print)

---

## 🎨 Tipografia e Estilos

### Web (Tela)
- **Títulos H2:** Sans-serif (Outfit/Geist), Verde Esmeralda (#10b981)
- **Corpo do Texto:** Serif (Merriweather), Cinza Gelo (#e2e8f0)
- **Metadados:** Monospace (JetBrains Mono), Verde Menta (#4ade80)

### Print/PDF
- **Corpo do Texto:** Serif, 11pt, Preto (#000000)
- **Fundo:** Branco (#FFFFFF)
- **Títulos:** Verde Esmeralda (#10b981)

---

## 🔄 Compatibilidade com Estrutura Legada

O sistema mantém **compatibilidade total** com briefings antigos:

- Se `introducao` ou `resultados_discussao` estiverem preenchidos → Usa **nova estrutura**
- Caso contrário → Usa **estrutura legada** (Desenvolvimento + Conclusão)

Campos legados ainda funcionam:
- `desenvolvimento` (MDX)
- `conclusao` (MDX ou string)
- `content` (MDX legado)

---

## 📝 Exemplo de Uso no Keystatic

### 1. Acesse `/keystatic`

### 2. Crie/Edite um Briefing

### 3. Preencha os Campos na Ordem:

**METADADOS INICIAIS:**
- Título: "Análise Geoespacial do Estreito de Ormuz"
- Abstract: (máx. 200 palavras)
- Keywords: (exatamente 3)

**NÚCLEO ESTRATÉGICO:**
- Introdução: (Editor MDX)

**MATERIAL E MÉTODO:**
- Área de Estudo: (Markdown - recorte espacial)
- Bases de Dados: (Markdown - fontes)
- Procedimentos: (Lista - cada item = uma etapa do fluxograma)

**ANÁLISE TÉCNICA:**
- Resultados e Discussão: (Editor MDX - mapa aparece automaticamente se configurado)
- Limitações e Incertezas: (Texto curto - 1 parágrafo)

**FECHAMENTO:**
- Conclusão: (Lista - cada item = um bullet)
- Referências: (Markdown ABNT)

**IDENTIFICADORES:**
- Volume: 1
- Edição: 1
- DOI: 10.xxxx/xxxx

---

## 🎯 Fluxograma de Procedimentos

O campo `procedimentos` é renderizado como um **Fluxograma Vertical Sutil**:

```
┌─ 1 ─┐
│     │
└─ 2 ─┘
│     │
└─ 3 ─┘
```

**Características:**
- Linha vertical sutil (opacidade 30%)
- Círculos numerados (verde esmeralda)
- Background verde claro (10% opacidade)
- Border verde esmeralda
- Fonte Monospace para números
- Espaçamento generoso entre itens

**Visual:** Comunica "Processo Tecnológico" instantaneamente, muito mais rápido que texto corrido.

---

## ✅ Checklist de Implementação

- [x] Schema do Keystatic atualizado
- [x] Componente ProcedimentosFlowchart criado
- [x] Componente MaterialMetodoSection criado
- [x] Componente ResultadosDiscussaoSection criado
- [x] Componente IntroducaoSection criado
- [x] Componente LimitacoesIncertezasSection criado
- [x] Componente ConclusaoListSection criado
- [x] Interfaces TypeScript atualizadas
- [x] BriefingEditorialPage atualizado
- [x] Estilos CSS adicionados
- [x] Compatibilidade com estrutura legada mantida
- [x] Ordem de renderização correta
- [x] Tipografia conforme EDITORIAL_GUIDELINES.md

---

## 🚀 Próximos Passos

1. **Testar no Keystatic:**
   - Criar um briefing de teste com a nova estrutura
   - Verificar renderização de todas as seções
   - Testar fluxograma de procedimentos

2. **Validar Impressão/PDF:**
   - Verificar ordem das seções no PDF
   - Confirmar estilos de print
   - Validar quebra de páginas

3. **Migrar Briefings Existentes:**
   - Converter briefings antigos para nova estrutura (opcional)
   - Manter compatibilidade com legado

---

**LandSpace Strategy Editorial**  
*Intelligence Division*  
Última atualização: Janeiro 2026
