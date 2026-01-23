# 📸 Guia Completo de Imagens - LandSpace

Este guia detalha todas as imagens necessárias para o site, incluindo tamanhos, qualidade e onde colocá-las.

**Última atualização:** Janeiro 2025

---

## 📁 Estrutura de Pastas

```
public/
├── courses/                         # Imagens dos cursos (21 cursos)
│   ├── transicao-uso-cobertura.png
│   ├── potencial-uso-conservacionista.png
│   ├── modelagem-perda-solos-rusle.png
│   ├── estudo-fragilidade-ambiental.png
│   ├── analise-vulnerabilidade-riscos-ambientais.png
│   ├── geoai-classificacao-uso-solo-sentinel-2.png
│   ├── geoai-monitoramento-historico-landsat.png
│   ├── geoai-alta-resolucao-cbers-4a.png
│   ├── geoai-mapeamento-radar-sentinel-1.png
│   ├── modelagem-espacializacao-climatica.png
│   ├── morfometria-bacias-hidrograficas.png
│   ├── monitoramento-remoto-qualidade-agua.png
│   ├── mapeamento-aereo-drones-vant.png
│   ├── monitoramento-inteligente-irrigacao.png
│   ├── estatistica-geoestatistica-agricola.png
│   ├── geotecnologias-como-metodo-cientifico.png
│   ├── erros-cartograficos-comprometem-mapa.png
│   ├── analise-ambiental-integrada-geossistemas.png
│   ├── introducao-cartografia-digital.png
│   ├── sensoriamento-remoto-fundamentos-analise-cientifica.png
│   └── geotecnologias-estudo-mudancas-climaticas.png
└── favicon.svg                      # Favicon do site
```

**Nota:** O logo é renderizado via SVG inline no componente `Header.tsx`, não há arquivo de imagem física.

---

## 🎨 Logo Principal

### Localização
- **Renderização:** SVG inline no componente `Header.tsx`
- **Onde aparece:** Header (topo de todas as páginas)

### Especificações Técnicas

O logo é um SVG composto por:
- **Bússola estilizada** com pontos cardeais
- **Cores:** `#0f172a` (azul marinho) e `#06b6d4` (ciano)
- **Dimensões:** 40x40px (viewBox: `0 0 40 40`)
- **Texto:** "LAND" (azul marinho) + "SPACE" (ciano) com linhas decorativas

### Fallback
Se necessário substituir por imagem, use:
- **Tamanho:** 80x80px a 120x120px (quadrado)
- **Formato:** PNG com transparência ou SVG
- **Resolução:** 2x (160x160px a 240x240px para retina)
- **Peso máximo:** 50KB (PNG) ou 20KB (SVG)
- **Fundo:** Transparente

---

## 📚 Imagens dos Cursos

### Localização
- **Caminho:** `public/courses/[slug-do-curso].png`
- **Onde aparece:** 
  - Cards de curso na Home e listagem (`CourseCard.tsx`)
  - Hero Section das páginas de detalhes
  - Sidebar de compra nas páginas de detalhes

### Especificações Técnicas

#### Tamanho e Proporção
- **Proporção:** 16:9 (aspect-video) - **OBRIGATÓRIO**
- **Largura mínima:** 1200px
- **Largura recomendada:** 1600px a 1920px
- **Altura:** Proporcional (ex: 1200x675px, 1600x900px, 1920x1080px)
- **Resolução:** 72-96 DPI (web)
- **Resolução Retina:** 2x (2400x1350px para máxima qualidade)

#### Formato e Qualidade
- **Formato:** PNG ou JPG
  - **PNG:** Se tiver transparência, texto ou gráficos vetoriais
  - **JPG:** Se for foto/imagem complexa (melhor compressão)
- **Qualidade JPG:** 85-90% (balanço qualidade/tamanho)
- **Peso máximo:** 300KB por imagem (otimizado)
- **Peso ideal:** 150-250KB
- **Otimização:** **OBRIGATÓRIA** antes de subir

### Nomenclatura

Use o `slug` do curso como nome do arquivo. Lista completa:

| Curso | Slug | Nome do Arquivo |
|-------|------|-----------------|
| Dinâmica e Transição de Uso e Cobertura da Terra | `transicao-uso-cobertura` | `transicao-uso-cobertura.png` |
| Planejamento de Uso Conservacionista do Solo | `potencial-uso-conservacionista` | `potencial-uso-conservacionista.png` |
| Modelagem de Perda de Solos com a RUSLE | `modelagem-perda-solos-rusle` | `modelagem-perda-solos-rusle.png` |
| Estudo de Fragilidade Ambiental | `estudo-fragilidade-ambiental` | `estudo-fragilidade-ambiental.png` |
| Análise de Vulnerabilidade e Riscos Ambientais | `analise-vulnerabilidade-riscos-ambientais` | `analise-vulnerabilidade-riscos-ambientais.png` |
| GeoAI: Classificação de Uso do Solo com Sentinel-2 | `geoai-classificacao-uso-solo-sentinel-2` | `geoai-classificacao-uso-solo-sentinel-2.png` |
| GeoAI: Monitoramento Histórico com Landsat | `geoai-monitoramento-historico-landsat` | `geoai-monitoramento-historico-landsat.png` |
| GeoAI: Alta Resolução com CBERS-4A | `geoai-alta-resolucao-cbers-4a` | `geoai-alta-resolucao-cbers-4a.png` |
| GeoAI: Mapeamento com Radar Sentinel-1 | `geoai-mapeamento-radar-sentinel-1` | `geoai-mapeamento-radar-sentinel-1.png` |
| Modelagem e Espacialização Climática | `modelagem-espacializacao-climatica` | `modelagem-espacializacao-climatica.png` |
| Morfometria de Bacias Hidrográficas | `morfometria-bacias-hidrograficas` | `morfometria-bacias-hidrograficas.png` |
| Monitoramento Remoto da Qualidade da Água | `monitoramento-remoto-qualidade-agua` | `monitoramento-remoto-qualidade-agua.png` |
| Mapeamento Aéreo com Drones (VANT) | `mapeamento-aereo-drones-vant` | `mapeamento-aereo-drones-vant.png` |
| Monitoramento Inteligente de Irrigação | `monitoramento-inteligente-irrigacao` | `monitoramento-inteligente-irrigacao.png` |
| Estatística e Geoestatística Agrícola | `estatistica-geoestatistica-agricola` | `estatistica-geoestatistica-agricola.png` |
| Geotecnologias como Suporte Científico | `geotecnologias-como-metodo-cientifico` | `geotecnologias-como-metodo-cientifico.png` |
| Erros Cartográficos que Comprometem Seu Mapa | `erros-cartograficos-comprometem-mapa` | `erros-cartograficos-comprometem-mapa.png` |
| Análise Ambiental Integrada por Geossistemas | `analise-ambiental-integrada-geossistemas` | `analise-ambiental-integrada-geossistemas.png` |
| Introdução à Cartografia Digital | `introducao-cartografia-digital` | `introducao-cartografia-digital.png` |
| Sensoriamento Remoto: Fundamentos para Análise Científica | `sensoriamento-remoto-fundamentos-analise-cientifica` | `sensoriamento-remoto-fundamentos-analise-cientifica.png` |
| Geotecnologias no Estudo das Mudanças Climáticas | `geotecnologias-estudo-mudancas-climaticas` | `geotecnologias-estudo-mudancas-climaticas.png` |

### Dicas de Design
- ✅ Imagem relacionada ao conteúdo do curso
- ✅ Texto legível (se houver)
- ✅ Cores que combinam com a paleta do site (slate, emerald, sky)
- ✅ Evitar imagens muito escuras (dificulta leitura de badges)
- ✅ Espaço para badges (canto superior direito para desconto, superior esquerdo para nível/duração)
- ✅ Imagem deve funcionar bem em crop 16:9 (aspect-video)
- ✅ Evitar elementos importantes nas bordas (podem ser cortados em diferentes tamanhos de tela)

### Exemplo de Layout Visual
```
┌─────────────────────────────────┐
│ [Nível] [Duração]    [% OFF]   │
│                                 │
│                                 │
│      Imagem Principal            │
│      (Centralizada)              │
│      Proporção 16:9              │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Como as Imagens São Usadas

1. **Cards de Curso (`CourseCard.tsx`):**
   - Container com `aspect-video` (16:9)
   - `object-cover` para preencher o espaço
   - Hover effect com `scale-105`
   - Fallback: gradiente cinza com texto "Imagem do curso"

2. **Páginas de Detalhes:**
   - Hero Section: altura variável (h-96 a h-[500px])
   - Sidebar: altura fixa (h-56)
   - Mesmo `object-cover` para consistência

### Ferramentas Recomendadas

#### Compressão e Otimização
- **[TinyPNG](https://tinypng.com/)** - Compressão PNG/JPG sem perda visível
- **[Squoosh](https://squoosh.app/)** - Otimização avançada com preview
- **[ImageOptim](https://imageoptim.com/)** - Mac (otimização automática)
- **[RIOT](http://luci.criosweb.ro/riot/)** - Windows (otimização com preview)

#### Redimensionamento
- **Photoshop/GIMP** - Controle total
- **[ResizeImage](https://resizeimage.net/)** - Online, rápido
- **[Bulk Resize Photos](https://bulkresizephotos.com/)** - Múltiplas imagens

#### Verificação de Peso
- Verifique o tamanho do arquivo antes de subir
- Use `ls -lh` (Linux/Mac) ou propriedades do arquivo (Windows)

---

## 👤 Fotos de Perfil (Depoimentos)

### Localização
- **Fonte:** URLs do Unsplash (armazenadas em `src/app/cursos/testimonials.ts`)
- **Onde aparece:** Seção de depoimentos nas páginas de curso

### Especificações Técnicas
- **Formato:** JPG (via Unsplash)
- **Tamanho:** 256x256px (quadrado)
- **Qualidade:** Alta (parâmetro `q=80`)
- **Crop:** `fit=facearea&facepad=2`
- **Renderização:** Tag `<img>` com `rounded-full`

### Lista de Perfis (12 depoimentos)

1. **Carlos Mendes** (Engenheiro Agrônomo)
   - URL: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80`

2. **Ana Paula Ramos** (Geógrafa e Consultora)
   - URL: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80`

3. **João Carvalho** (Analista Ambiental)
   - URL: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=256&h=256&q=80`

4. **Mariana Souza** (Mestranda em Geografia)
   - URL: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=facearea&facepad=2&w=256&h=256&q=80`

5. **Ricardo Gomes** (Engenheiro Florestal)
   - URL: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=256&h=256&q=80`

6. **Fernanda Lima** (Engenheira Civil)
   - URL: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=facearea&facepad=2&w=256&h=256&q=80`

7. **Pedro Henrique** (Especialista em GIS)
   - URL: `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=facearea&facepad=2&w=256&h=256&q=80`

8. **Camila Duarte** (Pesquisadora)
   - URL: `https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=facearea&facepad=2&w=256&h=256&q=80`

9. **Lucas Ferreira** (Biólogo)
   - URL: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=facearea&facepad=2&w=256&h=256&q=80`

10. **Roberto Silva** (Topógrafo)
    - URL: `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=facearea&facepad=2&w=256&h=256&q=80`

11. **Juliana Martins** (Gestora de Projetos)
    - URL: `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`

12. **Gabriel Costa** (Cientista de Dados)
    - URL: `https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=facearea&facepad=2&w=256&h=256&q=80`

**Nota:** As imagens são carregadas dinamicamente via URLs externas. Se precisar substituir por imagens locais, salve em `public/assets/testimonials/` e atualize o array em `testimonials.ts`.

---

## ✅ Checklist de Imagens

### Imagens dos Cursos (21 cursos)
- [ ] `transicao-uso-cobertura.png` (1200x675px, < 300KB)
- [ ] `potencial-uso-conservacionista.png` (1200x675px, < 300KB)
- [ ] `modelagem-perda-solos-rusle.png` (1200x675px, < 300KB)
- [ ] `estudo-fragilidade-ambiental.png` (1200x675px, < 300KB)
- [ ] `analise-vulnerabilidade-riscos-ambientais.png` (1200x675px, < 300KB)
- [ ] `geoai-classificacao-uso-solo-sentinel-2.png` (1200x675px, < 300KB)
- [ ] `geoai-monitoramento-historico-landsat.png` (1200x675px, < 300KB)
- [ ] `geoai-alta-resolucao-cbers-4a.png` (1200x675px, < 300KB)
- [ ] `geoai-mapeamento-radar-sentinel-1.png` (1200x675px, < 300KB)
- [ ] `modelagem-espacializacao-climatica.png` (1200x675px, < 300KB)
- [ ] `morfometria-bacias-hidrograficas.png` (1200x675px, < 300KB)
- [ ] `monitoramento-remoto-qualidade-agua.png` (1200x675px, < 300KB)
- [ ] `mapeamento-aereo-drones-vant.png` (1200x675px, < 300KB)
- [ ] `monitoramento-inteligente-irrigacao.png` (1200x675px, < 300KB)
- [ ] `estatistica-geoestatistica-agricola.png` (1200x675px, < 300KB)
- [ ] `geotecnologias-como-metodo-cientifico.png` (1200x675px, < 300KB)
- [ ] `erros-cartograficos-comprometem-mapa.png` (1200x675px, < 300KB)
- [ ] `analise-ambiental-integrada-geossistemas.png` (1200x675px, < 300KB)
- [ ] `introducao-cartografia-digital.png` (1200x675px, < 300KB)
- [ ] `sensoriamento-remoto-fundamentos-analise-cientifica.png` (1200x675px, < 300KB)
- [ ] `geotecnologias-estudo-mudancas-climaticas.png` (1200x675px, < 300KB)

### Verificação Técnica
- [ ] Todas as imagens estão em proporção 16:9
- [ ] Todas as imagens foram otimizadas (peso < 300KB)
- [ ] Nomes dos arquivos correspondem aos slugs em `data.ts`
- [ ] Imagens testadas nos cards e páginas de detalhes
- [ ] Fallbacks funcionando (gradiente aparece quando imagem não carrega)

---

## 🛠️ Como Adicionar Novas Imagens

### 1. Preparar a Imagem
1. Redimensionar para **1200x675px** (mínimo) ou **1600x900px** (recomendado)
2. Garantir proporção **16:9** exata
3. Otimizar usando TinyPNG ou Squoosh
4. Verificar peso do arquivo (< 300KB)

### 2. Colocar no Local Correto
- Salvar em: `public/courses/[slug-do-curso].png`
- Verificar se o `slug` corresponde ao definido em `src/app/cursos/data.ts`

### 3. Verificar no Site
1. Rodar `npm run dev`
2. Navegar até `/cursos` (listagem)
3. Verificar se a imagem aparece no card
4. Clicar no curso e verificar Hero Section e Sidebar
5. Testar em diferentes tamanhos de tela (mobile, tablet, desktop)

### 4. Se a Imagem Não Aparecer
- ✅ Verificar se o nome do arquivo está correto (case-sensitive)
- ✅ Verificar se está na pasta `public/courses/`
- ✅ Verificar se o caminho no `data.ts` está correto: `image: "/courses/[slug].png"`
- ✅ Limpar cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
- ✅ Verificar console do navegador para erros 404

---

## 📊 Resumo de Especificações

| Tipo | Formato | Tamanho | Proporção | Peso Máx | Localização |
|------|---------|---------|-----------|----------|------------|
| Logo | SVG (inline) | 40x40px | 1:1 | - | `Header.tsx` |
| Curso | PNG/JPG | 1200x675px+ | 16:9 | 300KB | `public/courses/` |
| Depoimentos | JPG (URL) | 256x256px | 1:1 | - | Unsplash (via `testimonials.ts`) |

---

## 🎯 Dicas Finais

1. **Sempre otimize** as imagens antes de colocar no site
2. **Use nomes descritivos** mas sem espaços ou caracteres especiais (use hífens)
3. **Teste em diferentes dispositivos** (mobile, tablet, desktop)
4. **Mantenha consistência** no estilo visual das imagens
5. **Use ferramentas de compressão** para reduzir peso sem perder qualidade
6. **Respeite a proporção 16:9** - imagens fora de proporção serão cortadas
7. **Evite texto nas imagens** - use badges HTML/CSS sobrepostos quando possível

---

## 🔗 Links Úteis

- [TinyPNG](https://tinypng.com/) - Compressão de imagens (PNG/JPG)
- [Squoosh](https://squoosh.app/) - Otimização e compressão avançada
- [ImageOptim](https://imageoptim.com/) - Otimização automática (Mac)
- [RIOT](http://luci.criosweb.ro/riot/) - Otimização com preview (Windows)
- [ResizeImage](https://resizeimage.net/) - Redimensionamento online
- [Bulk Resize Photos](https://bulkresizephotos.com/) - Redimensionar múltiplas imagens

---

**Última atualização:** Janeiro 2025
