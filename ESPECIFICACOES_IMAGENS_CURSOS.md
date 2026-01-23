# 📐 Especificações de Imagens para Cursos - LandSpace

## 🎯 Resumo Executivo

**TODAS as imagens devem ter proporção 16:9 (aspect-video)**, mas os tamanhos ideais variam conforme o uso:

| Tipo de Imagem | Tamanho Ideal | Onde Usa | Peso Máximo |
|----------------|---------------|----------|-------------|
| **Card** | 1200x675px | Listagem/Home | 200KB |
| **Página (Hero)** | 1920x1080px | Hero Section | 300KB |
| **Vídeo (Thumbnail)** | 1920x1080px | Player de Vídeo | 300KB |
| **Sidebar** | 1200x675px | Sidebar de Compra | 200KB |

---

## 📱 1. Imagem do Card (`curso_X_card.png`)

### Onde aparece:
- Cards na Home Page
- Cards na página de listagem (`/cursos`)
- Quick View Popup (hover)

### Tamanho de Exibição:
- **Mobile:** ~350px de largura
- **Tablet:** ~400-500px de largura  
- **Desktop:** ~400px de largura (grid de 3 colunas)

### Tamanho Ideal da Imagem:
- **Largura:** 1200px
- **Altura:** 675px (16:9)
- **Resolução Retina (2x):** 2400x1350px (opcional, para máxima qualidade)
- **Peso máximo:** 200KB (otimizado)
- **Peso ideal:** 100-150KB

### Por quê?
O card é menor, então não precisa de resolução muito alta. 1200px é suficiente para telas retina e mantém o arquivo leve.

---

## 🖼️ 2. Imagem da Página (`curso_X_page.png`)

### Onde aparece:
- Hero Section da página de detalhes (grande, destaque)
- Sidebar de compra (pequena)

### Tamanho de Exibição:
- **Hero Section:**
  - Mobile: ~384px de altura (`h-96`)
  - Desktop: 500px de altura (`lg:h-[500px]`)
  - Largura: até ~800px (max-w-4xl)
- **Sidebar:**
  - Altura fixa: 224px (`h-56`)
  - Largura: ~100% do container

### Tamanho Ideal da Imagem:
- **Largura:** 1920px (Full HD)
- **Altura:** 1080px (16:9)
- **Resolução Retina (2x):** 3840x2160px (opcional, para máxima qualidade)
- **Peso máximo:** 300KB (otimizado)
- **Peso ideal:** 200-250KB

### Por quê?
A imagem do hero é grande e precisa de alta qualidade. 1920px garante nitidez em telas grandes e retina.

---

## 🎬 3. Imagem do Vídeo (`curso_X_video.png`)

### Onde aparece:
- Thumbnail do player de vídeo (com overlay escuro e botão de play)

### Tamanho de Exibição:
- **Aspect Ratio:** 16:9 (aspect-video)
- **Largura máxima:** ~896px (max-w-4xl)
- **Altura:** Proporcional (16:9)

### Tamanho Ideal da Imagem:
- **Largura:** 1920px (Full HD)
- **Altura:** 1080px (16:9)
- **Resolução Retina (2x):** 3840x2160px (opcional)
- **Peso máximo:** 300KB (otimizado)
- **Peso ideal:** 200-250KB

### Por quê?
O vídeo é um elemento de destaque e precisa de alta qualidade. 1920px garante nitidez mesmo com o overlay escuro.

---

## 📋 Resumo de Tamanhos

### Padrão Único (Recomendado):
Se você quiser usar **uma única imagem para todos os usos** (mais simples):

- **Tamanho:** 1920x1080px (Full HD)
- **Proporção:** 16:9 (obrigatório)
- **Peso:** 200-300KB (otimizado)
- **Formato:** JPG (85-90% qualidade) ou PNG (se tiver transparência)

### Otimização por Uso (Recomendado para Performance):
Se você quiser **otimizar o peso** (melhor performance):

| Uso | Tamanho | Peso |
|-----|---------|------|
| Card | 1200x675px | 100-150KB |
| Página/Vídeo | 1920x1080px | 200-250KB |

---

## 🎨 Formato e Qualidade

### JPG (Recomendado para fotos/imagens complexas):
- **Qualidade:** 85-90%
- **Vantagem:** Melhor compressão, arquivos menores
- **Use quando:** Imagem tem muitas cores, gradientes, fotos

### PNG (Recomendado para gráficos/texto):
- **Qualidade:** Sem perda (lossless)
- **Vantagem:** Preserva transparência e texto nítido
- **Use quando:** Imagem tem texto, gráficos vetoriais, transparência

---

## ⚡ Otimização Obrigatória

**NUNCA suba imagens sem otimizar!**

### Ferramentas Recomendadas:
1. **TinyPNG / TinyJPG** (online, gratuito)
2. **Squoosh** (Google, online, gratuito)
3. **ImageOptim** (Mac, gratuito)
4. **GIMP** (cortar e otimizar)

### Checklist:
- [ ] Imagem tem proporção 16:9?
- [ ] Tamanho está dentro do recomendado?
- [ ] Peso está abaixo do máximo?
- [ ] Imagem foi otimizada?
- [ ] Testou em diferentes tamanhos de tela?

---

## 📝 Nomenclatura

Use o padrão:
- `curso_1_card.png` - Imagem para o card
- `curso_1_page.png` - Imagem para a página (hero + sidebar)
- `curso_1_video.png` - Imagem para o vídeo (thumbnail)

Ou use o slug do curso:
- `transicao-uso-cobertura-card.png`
- `transicao-uso-cobertura-page.png`
- `transicao-uso-cobertura-video.png`

---

## 🔍 Verificação Final

Antes de subir, verifique:
1. ✅ Proporção 16:9
2. ✅ Tamanho dentro do recomendado
3. ✅ Peso otimizado
4. ✅ Nome do arquivo correto
5. ✅ Testou visualmente no site

---

**Última atualização:** 02/01/2026



