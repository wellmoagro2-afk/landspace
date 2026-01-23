# Logo da LandSpace

## Como adicionar o logo

1. Coloque sua imagem do logo em `public/logo.png`
   - Ou renomeie para o formato que preferir (`.svg`, `.jpg`, etc.)

2. Atualize o caminho no arquivo `src/components/Header.tsx`:
   ```tsx
   <Image
     src="/logo.png"  // ← Altere aqui se usar outro nome/formato
     alt="LandSpace"
     // ...
   />
   ```

## Especificações Recomendadas

- **Formato:** PNG com transparência ou SVG (melhor para qualidade)
- **Dimensões:** 160x160px (será redimensionado para 40x40px no header)
- **Fundo:** Transparente (preferencial)
- **Estilo:** Minimalista, funciona bem em fundo claro

## Fallback

Se o logo não for encontrado, o sistema mostrará automaticamente "LS" com gradiente como fallback.




