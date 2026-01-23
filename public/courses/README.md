# Imagens dos Cursos

## Como adicionar imagens

Coloque as imagens dos cursos nesta pasta (`public/courses/`).

### Nomenclatura

As imagens devem ter o mesmo nome do `slug` do curso definido em `src/app/cursos/data.ts`:

- `transicao-uso-cobertura.png` - Para o curso "Transição de Uso e Cobertura da Terra"
- `qgis-do-zero.png` (ou `.jpg`) - Para o curso "QGIS do Zero ao Aplicado"
- `sensoriamento-sentinel.png` - Para o curso "Sensoriamento Remoto com Sentinel"
- `mapbiomas-workflow.png` - Para o curso "MapBiomas na Prática"

### Especificações Técnicas

**Recomendações:**
- **Formato:** PNG ou JPG
- **Dimensões:** 1200x675px (16:9) - ideal para qualidade
- **Tamanho:** Máximo 500KB por imagem (otimize antes de subir)
- **Qualidade:** Alta resolução para ficar nítido em telas retina

### Otimização

Antes de subir, otimize as imagens usando:
- [TinyPNG](https://tinypng.com/) - Para PNG
- [Squoosh](https://squoosh.app/) - Para JPG/PNG
- [ImageOptim](https://imageoptim.com/) - Para Mac

### Exemplo

Se você tem um curso com `slug: "meu-curso"`, a imagem deve ser:
```
public/courses/meu-curso.png
```

E no arquivo `data.ts`:
```typescript
{
  slug: "meu-curso",
  image: "/courses/meu-curso.png", // ← caminho relativo a /public
  // ...
}
```

### Adicionar novos cursos

1. Adicione a imagem em `public/courses/[slug].png`
2. Adicione os dados do curso em `src/app/cursos/data.ts`
3. A página individual será criada automaticamente em `/cursos/[slug]`

### Páginas Específicas

Alguns cursos têm páginas dedicadas customizadas:
- `transicao-uso-cobertura` → `/cursos/transicao-uso-cobertura` (página customizada)

Para criar uma página customizada, crie um arquivo em:
```
src/app/cursos/[slug]/page.tsx
```
