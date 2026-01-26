# Fluxo de Vendas e Acesso - LandSpace + Hotmart

## Como Funciona

O site **LandSpace** funciona como uma **vitrine digital** dos cursos. Toda a parte comercial e de acesso acontece na **plataforma Hotmart**.

## Fluxo Completo

### 1. Descoberta (Site LandSpace)
- Usuário navega pelo site LandSpace
- Vê os cursos, descrições, preços e detalhes
- Pode ler sobre a metodologia e proposta de valor

### 2. Decisão de Compra (Site LandSpace)
- Usuário clica em **"Quero meu curso"** ou **"Comprar na Hotmart"**
- É redirecionado para o checkout da Hotmart

### 3. Compra (Plataforma Hotmart)
- Usuário faz o pagamento na Hotmart
- Hotmart processa o pagamento de forma segura
- Acesso é liberado automaticamente após confirmação

### 4. Acesso aos Cursos (Plataforma Hotmart)
- Usuário recebe email da Hotmart com instruções
- Acessa todas as aulas, materiais e suporte na área do aluno da Hotmart
- Certificados também são emitidos pela Hotmart (se configurado)

## O que o Site LandSpace NÃO faz

❌ **Não processa pagamentos** - Isso é feito pela Hotmart  
❌ **Não tem área do aluno própria** - Tudo acontece na Hotmart  
❌ **Não tem sistema de login** - Usuário só cria conta na Hotmart  
❌ **Não gerencia acesso aos cursos** - Hotmart cuida disso  
❌ **Não tem carrinho de compras** - Cada curso vai direto para o checkout da Hotmart  

## O que o Site LandSpace FAZ

✅ **Apresenta os cursos** de forma atrativa  
✅ **Explica a proposta de valor** e metodologia  
✅ **Mostra detalhes** de cada curso  
✅ **Redireciona para Hotmart** quando o usuário quer comprar  
✅ **Gera tráfego qualificado** para os produtos na Hotmart  

## Configuração dos Cursos

Cada curso no arquivo `src/app/cursos/data.ts` tem:

```typescript
{
  slug: "nome-do-curso",
  title: "Título do Curso",
  // ...
  hotmartCheckoutUrl: "https://pay.hotmart.com/SEU_CHECKOUT_AQUI"
}
```

**Importante:** Substitua `SEU_CHECKOUT_AQUI` pela URL real do checkout da Hotmart de cada curso.

## Benefícios dessa Abordagem

1. **Simplicidade**: Não precisa gerenciar pagamentos, área do aluno, etc.
2. **Segurança**: Hotmart cuida de toda a parte de segurança e compliance
3. **Foco**: Site foca apenas em apresentar os cursos de forma atrativa
4. **Escalabilidade**: Fácil adicionar novos cursos sem complexidade técnica
5. **Confiança**: Hotmart é uma plataforma conhecida e confiável

## Próximos Passos

1. ✅ Site criado como vitrine
2. ⏳ Adicionar URLs reais dos checkouts da Hotmart
3. ⏳ Adicionar imagens dos cursos
4. ⏳ Configurar domínio e hospedagem
5. ⏳ Testar fluxo completo: Site → Hotmart → Acesso




