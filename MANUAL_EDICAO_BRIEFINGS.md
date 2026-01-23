# 📘 Manual Completo de Edição de Briefings - LandSpace Strategy Editorial

**Versão:** 3.0 - Estrutura "Big Tech"  
**Última Atualização:** Janeiro 2026  
**Sistema:** Keystatic CMS + Next.js  
**Estrutura:** Nova arquitetura editorial compartimentada

---

## 📋 Índice

1. [Acesso ao Sistema](#acesso-ao-sistema)
2. [Nova Estrutura "Big Tech"](#nova-estrutura-big-tech)
3. [Campos Obrigatórios](#campos-obrigatórios)
4. [Núcleo Estratégico](#núcleo-estratégico)
5. [Material e Método (Compartimentado)](#material-e-método-compartimentado)
6. [Análise Técnica](#análise-técnica)
7. [Fechamento](#fechamento)
8. [Campos Opcionais](#campos-opcionais)
9. [Padrões Editoriais](#padrões-editoriais)
10. [Metadados e Identificação](#metadados-e-identificação)
11. [Multimídia e Recursos](#multimídia-e-recursos)
12. [Validação e Publicação](#validação-e-publicação)
13. [Exemplo Completo](#exemplo-completo)
14. [Troubleshooting](#troubleshooting)

---

## 🔐 Acesso ao Sistema

### Desenvolvimento Local
```
http://localhost:3000/keystatic
```

### Produção
```
https://landspace.io/keystatic
```

**Nota:** O Keystatic salva os arquivos diretamente no repositório Git. Certifique-se de ter permissões de escrita.

---

## 🚀 Nova Estrutura "Big Tech"

A partir da versão 3.0, o sistema utiliza uma estrutura editorial rigorosa estilo "Big Tech", com campos compartimentados e especializados. Esta estrutura garante maior organização, clareza metodológica e visualização profissional dos processos técnicos.

### **Principais Mudanças:**

1. **Compartimentação do Material e Método:**
   - Área de Estudo (recorte espacial)
   - Bases de Dados (fontes e resoluções)
   - Procedimentos (renderizado como fluxograma visual)

2. **Destaque Máximo para o Mapa:**
   - Mapa aparece automaticamente na seção "Resultados e Discussão"
   - Visualização destacada com glow verde

3. **Fluxograma de Procedimentos:**
   - Lista de procedimentos renderizada como fluxograma vertical
   - Círculos numerados com linhas finas
   - Comunica "Processo Tecnológico" visualmente

4. **Conclusão em Bullets:**
   - Lista de achados e próximos passos
   - Formato mais direto e objetivo

### **Compatibilidade:**

O sistema mantém **compatibilidade total** com briefings antigos:
- Se usar os novos campos (`introducao`, `resultados_discussao`) → **Nova estrutura**
- Se usar campos legados (`desenvolvimento`, `conclusao` como string) → **Estrutura legada**

---

## ✅ Campos Obrigatórios

### 1. **Slug** (URL Amigável)
- **Tipo:** Texto
- **Formato:** Apenas letras minúsculas, números e hífens
- **Exemplo:** `petroleo-poder-oriente-medio`
- **Regras:**
  - Sem espaços
  - Sem caracteres especiais (exceto hífen)
  - Único (não pode repetir)
  - Descritivo do conteúdo

### 2. **Título**
- **Tipo:** Texto
- **Limite:** Sem limite específico, mas recomendado até 100 caracteres
- **Formato:** Título principal do briefing
- **Exemplo:** `"Petróleo e Poder no Oriente Médio"`
- **Regras:**
  - Impactante e estratégico
  - Claro e objetivo
  - Sem ponto final

### 3. **Resumo (Summary)**
- **Tipo:** Texto Multilinha
- **Limite:** Recomendado 150-200 palavras
- **Formato:** Descrição curta do briefing
- **Exemplo:** 
  ```
  Este relatório analisa as tensões geopolíticas no Estreito de Ormuz 
  e seu impacto no preço do barril de petróleo, mapeando as rotas de 
  exportação e dependências energéticas globais através de visualizações 
  interativas e análises estratégicas.
  ```
- **Regras:**
  - Aparece na listagem de briefings
  - Deve ser informativo e atraente
  - Não deve repetir o título

### 4. **Abstract (Resumo Executivo)**
- **Tipo:** Texto Multilinha
- **Limite:** Máximo 200 palavras (OBRIGATÓRIO)
- **Formato:** Resumo acadêmico completo
- **Exemplo:**
  ```
  Este relatório analisa as tensões geopolíticas no Estreito de Ormuz 
  e seu impacto no preço do barril de petróleo. Através de uma análise 
  geoespacial detalhada, examinamos como o controle sobre recursos 
  petrolíferos molda relações de poder, conflitos e alianças estratégicas 
  na região. O estudo mapeia as principais rotas de exportação, identifica 
  pontos críticos de vulnerabilidade no sistema energético global e avalia 
  as implicações para a segurança energética de países importadores. Os 
  resultados demonstram que aproximadamente 21% do petróleo mundial transita 
  pelo Estreito de Ormuz, tornando-o um ponto crítico de vulnerabilidade 
  estratégica. A análise revela padrões de dependência energética que criam 
  vulnerabilidades significativas para economias globais, especialmente na 
  Ásia e Europa.
  ```
- **Regras:**
  - Aparece no cabeçalho do PDF/impressão
  - Deve ser completo e acadêmico
  - Contar palavras rigorosamente (máx. 200)
  - Usado para indexação (Google Scholar, Zotero, Mendeley)

### 5. **Palavras-chave (Keywords)**
- **Tipo:** Array de Texto
- **Quantidade:** Exatamente 3 palavras-chave (OBRIGATÓRIO)
- **Formato:** Termos técnicos principais
- **Exemplo:**
  ```
  - "Geopolítica"
  - "Petróleo"
  - "Oriente Médio"
  ```
- **Regras:**
  - Exatamente 3 (nem mais, nem menos)
  - Termos técnicos e específicos
  - Primeira letra maiúscula
  - Sem aspas no valor (apenas na lista)

### 6. **Data de Publicação (Published At)**
- **Tipo:** Data
- **Formato:** YYYY-MM-DD
- **Exemplo:** `2026-01-15`
- **Regras:**
  - Data real de publicação
  - Não pode ser futura (exceto em Draft Mode)
  - Usada para ordenação e filtros

### 7. **Volume**
- **Tipo:** Número Inteiro
- **Padrão:** 1
- **Descrição:** Volume da publicação (ex: 1 para 2026)
- **Exemplo:** `1`
- **Regras:**
  - Geralmente corresponde ao ano (Volume 1 = 2026)
  - Incrementa a cada ano

### 8. **Edição**
- **Tipo:** Número Inteiro
- **Descrição:** Número sequencial da edição
- **Exemplo:** `1`, `2`, `3`...
- **Regras:**
  - Sequencial dentro do volume
  - Primeira edição do volume = 1

---

## 🎯 Núcleo Estratégico

### **Introdução**
- **Tipo:** Editor de Texto Rico (MDX)
- **Campo:** `introducao`
- **Descrição:** Contexto e objetivos do briefing
- **Formato:** Markdown completo com suporte a:
  - Formatação (negrito, itálico, listas)
  - Links
  - Imagens
  - Divisores
- **Exemplo:**
  ```markdown
  ## Contexto Geopolítico
  
  O Estreito de Ormuz representa um ponto crítico...
  
  ## Objetivos
  
  Este briefing tem como objetivo:
  
  1. Mapear as rotas de exportação
  2. Identificar vulnerabilidades estratégicas
  3. Avaliar implicações para segurança energética
  ```
- **Renderização:**
  - Fonte: Serif (Merriweather)
  - Tamanho: 19px (web) / 11pt (print)
  - Alinhamento: Justificado

---

## 🔬 Material e Método (Compartimentado)

A seção Material e Método é dividida em três subseções especializadas:

### **1. Área de Estudo**
- **Tipo:** Editor Markdown
- **Campo:** `area_estudo`
- **Foco:** Recorte espacial da análise
- **Conteúdo Típico:**
  - Delimitação geográfica
  - Coordenadas e extensão
  - Características da área
  - Justificativa do recorte
- **Exemplo:**
  ```markdown
  A análise concentra-se na região do **Estreito de Ormuz**, 
  localizado entre o Irã e Omã, com coordenadas aproximadas 
  de 26°30'N, 56°15'E. Esta área compreende aproximadamente 
  39 km de largura no ponto mais estreito...
  ```

### **2. Bases de Dados**
- **Tipo:** Editor Markdown
- **Campo:** `bases_dados`
- **Foco:** Fontes e resoluções utilizadas
- **Conteúdo Típico:**
  - Lista de fontes de dados
  - Resoluções espaciais e temporais
  - Período de coleta
  - Limitações dos dados
- **Exemplo:**
  ```markdown
  ### Fontes Principais
  
  - **Satélites:** Landsat 8/9, Sentinel-2
  - **Resolução Espacial:** 10-30 metros
  - **Resolução Temporal:** 16 dias
  - **Período:** 2020-2025
  
  ### Dados Auxiliares
  
  - Base cartográfica: OpenStreetMap
  - Dados administrativos: GADM
  ```

### **3. Procedimentos (Pipeline Metodológico)**
- **Tipo:** Lista/Bullets
- **Campo:** `procedimentos`
- **Formato:** Array de strings (cada item = uma etapa)
- **Renderização:** **Fluxograma Vertical Sutil**
  - Círculos numerados (verde esmeralda)
  - Linha vertical sutil conectando as etapas
  - Visual que comunica "Processo Tecnológico"
- **Exemplo:**
  ```
  Etapa 1: Aquisição de imagens satelitais
  Etapa 2: Pré-processamento e correção atmosférica
  Etapa 3: Classificação supervisionada usando Random Forest
  Etapa 4: Validação com dados de campo
  Etapa 5: Análise de mudanças temporais
  Etapa 6: Geração de mapas temáticos
  ```
- **Visual no Site:**
  ```
  ┌─ 1 ─┐ Aquisição de imagens satelitais
  │     │
  └─ 2 ─┘ Pré-processamento e correção atmosférica
  │     │
  └─ 3 ─┘ Classificação supervisionada usando Random Forest
  │     │
  └─ 4 ─┘ Validação com dados de campo
  │     │
  └─ 5 ─┘ Análise de mudanças temporais
  │     │
  └─ 6 ─┘ Geração de mapas temáticos
  ```
- **Dicas:**
  - Cada item deve ser uma etapa completa e clara
  - Use linguagem técnica mas acessível
  - Ordem cronológica do processo
  - Máximo recomendado: 8-10 etapas

---

## 📊 Análise Técnica

### **1. Resultados e Discussão**
- **Tipo:** Editor de Texto Rico (MDX) com suporte a imagens
- **Campo:** `resultados_discussao`
- **Características Especiais:**
  - **Destaque máximo para o Mapa** (se configurado)
  - Mapa aparece automaticamente no topo da seção
  - Box destacado com glow verde
  - Suporte completo a Markdown
- **Conteúdo Típico:**
  - Apresentação dos resultados principais
  - Discussão dos achados
  - Comparação com literatura
  - Implicações estratégicas
- **Exemplo:**
  ```markdown
  ## Principais Resultados
  
  A análise revelou que aproximadamente **21% do petróleo mundial** 
  transita pelo Estreito de Ormuz...
  
  ### Padrões Identificados
  
  1. Concentração de rotas no canal principal
  2. Variação sazonal do tráfego
  3. Dependência crítica de países asiáticos
  
  ## Discussão
  
  Estes resultados indicam uma vulnerabilidade estratégica significativa...
  ```
- **Mapa em Destaque:**
  - Se `mapEmbedUrl`, `mapUrl` ou `mapDownloadPath` estiverem configurados
  - Mapa aparece automaticamente antes do texto
  - Visualização destacada com borda e glow verde
  - Altura mínima: 600px

### **2. Limitações e Incertezas**
- **Tipo:** Texto Curto (1 parágrafo)
- **Campo:** `limitacoes_incertezas`
- **Formato:** Texto simples (não Markdown)
- **Limite:** 1 parágrafo (recomendado 100-200 palavras)
- **Renderização:**
  - Caixa destacada com fundo verde claro (5% opacidade)
  - Borda esquerda verde esmeralda (4px)
  - Fonte Serif, tamanho ligeiramente maior
- **Exemplo:**
  ```
  Esta análise está sujeita a limitações relacionadas à disponibilidade 
  de dados em tempo real sobre o tráfego marítimo. As estimativas de 
  volume de petróleo são baseadas em dados agregados e podem não refletir 
  variações diárias. Além disso, fatores geopolíticos dinâmicos podem 
  alterar rapidamente os padrões identificados.
  ```
- **Dicas:**
  - Seja honesto e transparente
  - Identifique limitações metodológicas
  - Mencione incertezas dos dados
  - Evite listas (apenas parágrafo corrido)

---

## 🎯 Fechamento

### **1. Conclusão**
- **Tipo:** Lista de Bullets
- **Campo:** `conclusao`
- **Formato:** Array de strings (cada item = um bullet)
- **Conteúdo:** Achados principais e próximos passos
- **Renderização:**
  - Lista com bullets verdes (círculos pequenos)
  - Glow sutil nos bullets
  - Espaçamento generoso entre itens
- **Exemplo:**
  ```
  Achado 1: O Estreito de Ormuz concentra 21% do petróleo mundial
  Achado 2: Países asiáticos apresentam maior dependência energética
  Achado 3: Variações sazonais afetam significativamente os padrões de tráfego
  Próximo Passo 1: Desenvolver modelo preditivo de interrupções
  Próximo Passo 2: Expandir análise para outros estreitos estratégicos
  ```
- **Visual no Site:**
  ```
  • Achado 1: O Estreito de Ormuz concentra 21% do petróleo mundial
  • Achado 2: Países asiáticos apresentam maior dependência energética
  • Próximo Passo 1: Desenvolver modelo preditivo de interrupções
  ```
- **Dicas:**
  - Separe achados de próximos passos (ou misture se preferir)
  - Seja específico e acionável
  - Máximo recomendado: 5-8 itens

### **2. Referências**
- **Tipo:** Editor Markdown
- **Campo:** `referencias`
- **Formato:** Padrão ABNT NBR 6023
- **Características:**
  - Ordem alfabética
  - Formatação ABNT rigorosa
  - Links suportados
- **Exemplo:**
  ```markdown
  AGÊNCIA INTERNACIONAL DE ENERGIA. World Energy Outlook 2024. 
  Paris: IEA, 2024. Disponível em: https://www.iea.org/reports/world-energy-outlook-2024. 
  Acesso em: 15 jan. 2026.
  
  SILVA, J. P. Geopolítica do Petróleo no Oriente Médio. 
  São Paulo: Editora XYZ, 2023.
  
  SMITH, A. B.; JONES, C. D. Maritime Chokepoints and Global Energy Security. 
  Energy Policy, v. 45, p. 123-145, 2024.
  ```
- **Regras:**
  - Sistema Autor-Data nas citações
  - Referências em ordem alfabética
  - Formato ABNT NBR 6023
  - Links para recursos online

---

## 📝 Campos Opcionais (mas Recomendados)

### 9. **Subtítulo**
- **Tipo:** Texto
- **Formato:** Subtítulo descritivo
- **Exemplo:** `"Uma Análise Geoespacial das Tensões Geopolíticas e Impactos no Mercado Energético Global"`
- **Regras:**
  - Complementa o título
  - Mais descritivo que o título
  - Opcional, mas recomendado

### 10. **ID do Briefing (Briefing ID)**
- **Tipo:** Texto
- **Formato:** `LS-STR-YYYY-XXX`
- **Exemplo:** `LS-STR-2026-001`
- **Regras:**
  - Se vazio, será gerado automaticamente
  - Formato: `LS-STR-[ANO]-[NÚMERO]`
  - Recomendado preencher manualmente para controle

### 11. **DOI (Digital Object Identifier)**
- **Tipo:** Texto
- **Formato:** `10.xxxx/xxxx`
- **Exemplo:** `10.5281/zenodo.1234567`
- **Regras:**
  - Obrigatório para publicações acadêmicas
  - Obter via Zenodo, ResearchGate ou similar
  - Aparece no rodapé do PDF
  - Sem "https://doi.org/" (apenas o número)

### 12. **Tags**
- **Tipo:** Array de Texto
- **Formato:** Tags para categorização
- **Exemplo:**
  ```
  - "Energia"
  - "Geopolítica"
  - "Oriente Médio"
  - "Petróleo"
  ```
- **Regras:**
  - Diferente de Keywords (mais amplas)
  - Usadas para filtros e navegação
  - Múltiplas tags permitidas

### 13. **Imagem de Capa (Cover Image)**
- **Tipo:** Upload de Imagem
- **Diretório:** `public/strategy/briefings/covers/`
- **Formatos:** JPEG, PNG, WebP
- **Recomendação:** 
  - Resolução mínima: 1200x630px
  - Proporção: 16:9 ou similar
  - Peso: Máximo 500KB (otimizado)
- **Regras:**
  - Aparece na listagem e no topo do briefing
  - Deve ser relevante ao conteúdo

### 14. **Arquivo PDF**
- **Tipo:** Upload de Arquivo
- **Diretório:** `public/strategy/briefings/pdfs/`
- **Formato:** PDF
- **Regras:**
  - Versão final para download
  - Deve incluir cabeçalho do journal
  - Deve incluir rodapé com DOI

---

## 📐 Estrutura do Conteúdo (Nova Ordem)

### **Ordem de Renderização na Página:**

1. **Metadados Iniciais**
   - Título, Subtítulo, Resumo
   - Abstract & Keywords Box

2. **Introdução** (Núcleo Estratégico)
   - Contexto e objetivos
   - Editor MDX completo

3. **Material e Método** (Compartimentado)
   - Área de Estudo
   - Bases de Dados
   - Procedimentos (Fluxograma Visual)

4. **Resultados e Discussão**
   - **Mapa em Destaque** (se configurado)
   - Conteúdo MDX rico

5. **Limitações e Incertezas**
   - Caixa destacada (1 parágrafo)

6. **Conclusão**
   - Lista de bullets (achados e próximos passos)

7. **Referências**
   - Padrão ABNT

8. **QR Code** (apenas print)

9. **Rodapé** (apenas print)

### **Campos Legados (Compatibilidade)**

O sistema mantém compatibilidade com briefings antigos:

- **`desenvolvimento`** (MDX) - Campo legado
- **`conclusao`** (MDX ou string) - Campo legado
- **`content`** (MDX) - Campo legado

**Quando usar legado:**
- Briefings criados antes da versão 3.0
- Migração gradual para nova estrutura

**Recomendação:** Migrar para nova estrutura quando possível

---

## 🎨 Padrões Editoriais

### Tipografia

#### Web (Tela)
- **Corpo do Texto:** 
  - Fonte: Merriweather (Serif)
  - Tamanho: 19px
  - Espaçamento: 1.8
  - Alinhamento: Justificado
  - Cor: `#e2e8f0` (War Room Text)

- **Títulos H1:**
  - Fonte: Outfit/Geist (Sans-serif)
  - Tamanho: 2.5rem (40px)
  - Peso: Semibold
  - Cor: `#10b981` (Verde Esmeralda)
  - Text-shadow: Glow verde

- **Títulos H2:**
  - Fonte: Serif
  - Tamanho: 2rem (32px)
  - Peso: 600
  - Cor: `#10b981`
  - Margin-top: 3rem

- **Metadados:**
  - Fonte: JetBrains Mono (Monospace)
  - Tamanho: 9pt
  - Cor: `#4ade80` (Verde Menta)

#### Print/PDF
- **Corpo do Texto:**
  - Fonte: Georgia, 'Times New Roman', Serif
  - Tamanho: 11pt
  - Espaçamento: 1.5
  - Alinhamento: Justificado
  - Cor: `#000000` (Preto)

- **Fundo:** `#FFFFFF` (Branco)
- **Títulos:** Verde Esmeralda `#10b981`

### Estrutura do Documento (Ordem)

1. **Cabeçalho do Journal** (apenas print)
   - Logo LandSpace Strategy
   - Metadata box (indexação)
   - QR Code para mapa interativo
   - Referência completa: `Volume (Ano) ID`

2. **Informações do Autor** (apenas print)
   - Nome: "Wellmo dos Santos Alves, PhD"
   - Ícone ORCID
   - Afiliação completa

3. **Título**
   - Subtítulo** (se houver)

4. **Abstract & Keywords Box** (Web)
   - Abstract completo
   - Keywords listadas

5. **Desenvolvimento**
   - Corpo principal
   - Seções e subseções
   - Mapas e ilustrações

6. **Conclusão**
   - Síntese
   - Recomendações estratégicas

7. **Referências**
   - Padrão ABNT NBR 6023
   - Ordem alfabética

8. **QR Code** (apenas print, última página)
   - Link para versão interativa

9. **Rodapé** (apenas print)
   - DOI
   - Copyright
   - Número da página

---

## 🏷️ Metadados e Identificação

### ID Técnico (Briefing ID)

**Formato:** `LS-STR-YYYY-XXX`

- **LS:** LandSpace
- **STR:** Strategy
- **YYYY:** Ano (4 dígitos)
- **XXX:** Número sequencial (3 dígitos, zero à esquerda)

**Exemplos:**
- `LS-STR-2026-001` (Primeiro briefing de 2026)
- `LS-STR-2026-002` (Segundo briefing de 2026)
- `LS-STR-2027-001` (Primeiro briefing de 2027)

**Geração Automática:**
- Se o campo estiver vazio, o sistema gera automaticamente
- Baseado no ano da data de publicação e número sequencial

### DOI (Digital Object Identifier)

**Formato:** `10.xxxx/xxxx`

**Onde Obter:**
1. **Zenodo** (Recomendado - gratuito)
   - Acesse: https://zenodo.org
   - Crie conta/login
   - Faça upload do PDF
   - Copie o DOI gerado

2. **ResearchGate**
   - Upload de publicação
   - DOI gerado automaticamente

3. **Outros repositórios acadêmicos**

**Exemplo:** `10.5281/zenodo.1234567`

**Importante:**
- Não incluir "https://doi.org/" no campo
- Apenas o número do DOI
- O sistema adiciona o link automaticamente

### Referência Completa no Cabeçalho

**Formato:** `Volume (Ano) ID`

**Exemplo:** `1 (2026) LS-STR-2026-001`

Aparece no topo do PDF/impressão.

---

## 🗺️ Multimídia e Recursos

### Mapas

#### URL do Mapa (Embed)
- **Tipo:** Texto (URL)
- **Formato:** URL completa do iframe
- **Exemplo:** `https://www.google.com/maps/embed?pb=...`
- **Uso:** Embed do mapa na página

#### URL do Mapa
- **Tipo:** Texto (URL)
- **Formato:** URL para abrir o mapa
- **Exemplo:** `https://www.google.com/maps/@25,45,5z`
- **Uso:** Link externo para o mapa

#### Arquivo do Mapa para Download
- **Tipo:** Upload de Arquivo
- **Diretório:** `public/strategy/briefings/maps/`
- **Formatos:** PNG, JPEG, PDF
- **Recomendação:**
  - Resolução: Mínimo 300 DPI
  - Formato: PNG (transparência) ou PDF (vetor)
  - Peso: Otimizado para web

### Vídeo (YouTube)

#### URL do YouTube
- **Tipo:** Texto (URL)
- **Formato:** URL completa do YouTube
- **Exemplo:** `https://www.youtube.com/watch?v=example-petroleo`
- **Regras:**
  - URL completa (não apenas ID)
  - Vídeo relacionado ao briefing
  - Aparece na seção de anexos

### Mapas Relacionados

- **Tipo:** Array de Texto (Slugs)
- **Formato:** Slugs dos mapas relacionados
- **Exemplo:**
  ```
  - "conflitos-hidricos-transfronteiricos"
  - "fluxos-petroleo-global"
  ```
- **Regras:**
  - Apenas slugs (não títulos)
  - Mapas devem existir no sistema
  - Aparecem na seção de anexos

### Podcast Relacionado

- **Tipo:** Texto (Slug)
- **Formato:** Slug do podcast
- **Exemplo:** `petroleo-geopolitica-mapas`
- **Regras:**
  - Apenas slug (não título)
  - Podcast deve existir no sistema
  - Aparece na seção de anexos

---

## ✅ Validação e Publicação

### Checklist Antes de Publicar

#### Campos Obrigatórios
- [ ] Slug preenchido e único
- [ ] Título preenchido
- [ ] Resumo (Summary) preenchido
- [ ] Abstract preenchido (máx. 200 palavras)
- [ ] Keywords preenchidas (exatamente 3)
- [ ] Data de publicação definida
- [ ] Volume definido
- [ ] Edição definida

#### Conteúdo (Nova Estrutura)
- [ ] Introdução preenchida
- [ ] Material e Método:
  - [ ] Área de Estudo (recomendado)
  - [ ] Bases de Dados (recomendado)
  - [ ] Procedimentos (lista com etapas)
- [ ] Resultados e Discussão preenchidos
- [ ] Limitações e Incertezas (recomendado)
- [ ] Conclusão (lista de bullets)
- [ ] Referências preenchidas (padrão ABNT)

#### Conteúdo (Estrutura Legada - Compatibilidade)
- [ ] Desenvolvimento preenchido (se usar legado)
- [ ] Conclusão preenchida (se usar legado)

#### Metadados
- [ ] Briefing ID definido (ou deixar gerar automaticamente)
- [ ] DOI obtido e preenchido (recomendado)
- [ ] Tags adicionadas

#### Multimídia
- [ ] Imagem de capa adicionada (recomendado)
- [ ] Mapa embed/URL configurado (se aplicável)
- [ ] PDF gerado e enviado (se aplicável)

#### Revisão
- [ ] Texto revisado (ortografia e gramática)
- [ ] Referências no padrão ABNT
- [ ] Abstract com máximo 200 palavras
- [ ] Keywords exatamente 3
- [ ] Links funcionando
- [ ] Imagens otimizadas

### Processo de Publicação

1. **Criar/Editar no Keystatic**
   - Acesse `/keystatic`
   - Crie novo briefing ou edite existente
   - Preencha todos os campos obrigatórios

2. **Salvar**
   - Clique em "Save"
   - Arquivo salvo em `src/content/keystatic/briefings/[slug].mdx`

3. **Preview (Draft Mode)**
   - Use Draft Mode para visualizar antes de publicar
   - Acesse: `/api/draft/enable?secret=SEU_SECRET&slug=nome-do-briefing`
   - Verifique tudo está correto

4. **Commit e Push (Git)**
   ```bash
   git add .
   git commit -m "Adiciona briefing: [título]"
   git push
   ```

5. **Deploy Automático**
   - Vercel faz deploy automaticamente
   - Briefing disponível em produção

### Draft Mode

**Habilitar:**
```
http://localhost:3000/api/draft/enable?secret=SEU_SECRET&slug=nome-do-briefing
```

**Desabilitar:**
```
http://localhost:3000/api/draft/disable
```

**Uso:**
- Visualizar conteúdo não publicado
- Testar antes de fazer commit
- Revisar alterações

---

## 📄 Exemplo Completo (Nova Estrutura)

### Frontmatter (YAML)

```yaml
---
slug: petroleo-poder-oriente-medio
title: "Petróleo e Poder no Oriente Médio"
subtitle: "Uma Análise Geoespacial das Tensões Geopolíticas e Impactos no Mercado Energético Global"
summary: "Este relatório analisa as tensões geopolíticas no Estreito de Ormuz e seu impacto no preço do barril de petróleo, mapeando as rotas de exportação e dependências energéticas globais através de visualizações interativas e análises estratégicas."
abstract: "Este relatório analisa as tensões geopolíticas no Estreito de Ormuz e seu impacto no preço do barril de petróleo. Através de uma análise geoespacial detalhada, examinamos como o controle sobre recursos petrolíferos molda relações de poder, conflitos e alianças estratégicas na região. O estudo mapeia as principais rotas de exportação, identifica pontos críticos de vulnerabilidade no sistema energético global e avalia as implicações para a segurança energética de países importadores. Os resultados demonstram que aproximadamente 21% do petróleo mundial transita pelo Estreito de Ormuz, tornando-o um ponto crítico de vulnerabilidade estratégica. A análise revela padrões de dependência energética que criam vulnerabilidades significativas para economias globais, especialmente na Ásia e Europa."
keywords:
  - "Geopolítica"
  - "Petróleo"
  - "Oriente Médio"
publishedAt: "2026-01-15"
volume: 1
edition: 1
briefingId: "LS-STR-2026-001"
doi: "10.5281/zenodo.1234567"
tags:
  - "Energia"
  - "Geopolítica"
  - "Oriente Médio"
  - "Petróleo"
---
```

### Conteúdo (Nova Estrutura Big Tech)

#### 1. Introdução (Núcleo Estratégico)

```markdown
## Contexto Geopolítico

O Oriente Médio concentra aproximadamente **48% das reservas mundiais de petróleo**, tornando-se o epicentro das dinâmicas energéticas globais. Esta análise examina como o controle sobre recursos petrolíferos molda relações de poder, conflitos e alianças estratégicas na região.

## Objetivos

Este briefing tem como objetivo:

1. Mapear as principais rotas de exportação de petróleo
2. Identificar pontos críticos de vulnerabilidade estratégica
3. Avaliar implicações para a segurança energética global
```

#### 2. Material e Método

**Área de Estudo:**
```markdown
A análise concentra-se na região do **Estreito de Ormuz**, localizado entre o Irã e Omã, com coordenadas aproximadas de 26°30'N, 56°15'E. Esta área compreende aproximadamente 39 km de largura no ponto mais estreito e representa um dos chokepoints mais críticos do sistema energético global.
```

**Bases de Dados:**
```markdown
### Fontes Principais

- **Dados de Tráfego Marítimo:** MarineTraffic API (resolução: 1 hora)
- **Dados de Produção:** Agência Internacional de Energia (IEA)
- **Dados Geopolíticos:** Global Conflict Tracker
- **Período de Análise:** 2020-2025

### Resoluções

- **Espacial:** 1 km (agregação de rotas)
- **Temporal:** Diária (agregação horária)
```

**Procedimentos:**
```
Aquisição de dados de tráfego marítimo via API MarineTraffic
Filtragem de navios petroleiros (tipo: tanker)
Agregação espacial por rotas principais
Cálculo de volumes diários de tráfego
Análise de padrões sazonais e tendências
Identificação de pontos críticos de congestionamento
Geração de mapas temáticos de vulnerabilidade
Validação com dados históricos de interrupções
```

#### 3. Resultados e Discussão

```markdown
## Principais Resultados

A análise revelou que aproximadamente **21% do petróleo mundial** transita pelo Estreito de Ormuz, com um volume médio diário de 21 milhões de barris.

### Padrões Identificados

1. **Concentração de Rotas:** 85% do tráfego utiliza o canal principal
2. **Variação Sazonal:** Picos de tráfego durante o inverno (hemisfério norte)
3. **Dependência Crítica:** China, Índia e Japão representam 60% do tráfego

## Discussão

Estes resultados indicam uma vulnerabilidade estratégica significativa. Qualquer interrupção no Estreito de Ormuz teria impacto imediato nos preços globais de petróleo e poderia desencadear crises energéticas em múltiplos países.
```

**Nota:** O mapa (se configurado) aparecerá automaticamente no topo desta seção.

#### 4. Limitações e Incertezas

```
Esta análise está sujeita a limitações relacionadas à disponibilidade de dados em tempo real sobre o tráfego marítimo. As estimativas de volume de petróleo são baseadas em dados agregados e podem não refletir variações diárias. Além disso, fatores geopolíticos dinâmicos podem alterar rapidamente os padrões identificados, especialmente em contextos de tensão regional.
```

#### 5. Conclusão (Lista de Bullets)

```
O Estreito de Ormuz concentra 21% do petróleo mundial, representando um ponto crítico de vulnerabilidade estratégica
Países asiáticos (China, Índia, Japão) apresentam maior dependência energética desta rota
Variações sazonais afetam significativamente os padrões de tráfego, com picos no inverno
Desenvolver modelo preditivo de interrupções baseado em dados históricos
Expandir análise para outros estreitos estratégicos (Malaca, Bab el-Mandeb)
Criar sistema de alerta precoce para monitoramento de tensões geopolíticas
```

#### 6. Referências

```markdown
AGÊNCIA INTERNACIONAL DE ENERGIA. World Energy Outlook 2024. Paris: IEA, 2024. Disponível em: https://www.iea.org/reports/world-energy-outlook-2024. Acesso em: 15 jan. 2026.

SILVA, J. P. Geopolítica do Petróleo no Oriente Médio. São Paulo: Editora XYZ, 2023.

SMITH, A. B.; JONES, C. D. Maritime Chokepoints and Global Energy Security. Energy Policy, v. 45, p. 123-145, 2024.
```

---

## 🔧 Troubleshooting

### Erro: "Abstract deve ter no máximo 200 palavras"
- **Solução:** Conte as palavras rigorosamente
- **Dica:** Use um contador de palavras online
- **Limite:** Exatamente 200 palavras ou menos

### Erro: "Keywords deve ter exatamente 3 itens"
- **Solução:** Adicione exatamente 3 palavras-chave
- **Não pode:** 2 ou 4 ou mais
- **Deve ser:** Exatamente 3

### Fluxograma de Procedimentos não aparece
- **Verificar:**
  - Campo `procedimentos` está preenchido
  - É uma lista (array), não texto corrido
  - Cada item é uma etapa completa
- **Solução:** Adicione itens na lista de procedimentos (não use texto corrido)

### Mapa não aparece em destaque
- **Verificar:**
  - `mapEmbedUrl`, `mapUrl` ou `mapDownloadPath` configurados
  - Mapa aparece automaticamente na seção "Resultados e Discussão"
- **Solução:** Configure pelo menos um dos campos de mapa

### Conclusão não renderiza como lista
- **Verificar:**
  - Campo `conclusao` é uma lista (array), não texto
  - Cada item é um bullet separado
- **Solução:** Use lista de bullets, não texto corrido

### Erro: "Slug já existe"
- **Solução:** Escolha um slug diferente
- **Dica:** Adicione número ou palavra diferente
- **Exemplo:** `petroleo-poder-oriente-medio-2`

### Briefing não aparece na listagem
- **Verificar:**
  - Data de publicação não está no futuro
  - Draft Mode está desabilitado (se quiser publicar)
  - Arquivo foi salvo corretamente
  - Commit e push foram feitos (em produção)

### Imagens não aparecem
- **Verificar:**
  - Caminho correto no upload
  - Formato suportado (JPEG, PNG, WebP)
  - Tamanho do arquivo (otimizar se necessário)

### PDF não gera corretamente
- **Verificar:**
  - Abstract preenchido
  - Keywords preenchidas (3 itens)
  - DOI preenchido (se aplicável)
  - Volume e Edição definidos

---

## 📚 Recursos Adicionais

### Documentação
- [Keystatic Docs](https://keystatic.com/docs)
- [Next.js Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)
- [ABNT NBR 6023](https://www.abnt.org.br) - Referências Bibliográficas

### Ferramentas Úteis
- **Contador de Palavras:** [WordCounter](https://www.wordcounter.net)
- **DOI:** [Zenodo](https://zenodo.org) - Repositório acadêmico gratuito
- **Otimização de Imagens:** [TinyPNG](https://tinypng.com)

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte este manual primeiro
2. Verifique a seção Troubleshooting
3. Consulte a documentação do Keystatic
4. Entre em contato com a equipe técnica

---

## 🆕 Migração da Estrutura Legada

Se você tem briefings criados com a estrutura antiga e quer migrar para a nova estrutura "Big Tech":

### **Passo a Passo:**

1. **Acesse o briefing no Keystatic** (`/keystatic`)

2. **Copie o conteúdo:**
   - `desenvolvimento` → Divida entre `introducao` e `resultados_discussao`
   - `conclusao` (se for texto) → Converta para lista de bullets

3. **Preencha os novos campos:**
   - **Introdução:** Contexto e objetivos (parte inicial do desenvolvimento)
   - **Resultados e Discussão:** Análise e resultados (parte final do desenvolvimento)
   - **Material e Método:** Crie as três subseções
   - **Conclusão:** Converta para lista de bullets

4. **Salve e teste:**
   - Verifique se tudo renderiza corretamente
   - Teste o fluxograma de procedimentos
   - Confirme que o mapa aparece em destaque

### **Nota Importante:**

- Briefings antigos continuam funcionando normalmente
- A migração é opcional
- Você pode usar a estrutura legada se preferir

---

**LandSpace Strategy Editorial**  
*Intelligence Division*  
**Versão:** 3.0 - Estrutura "Big Tech"  
Última atualização: Janeiro 2026
