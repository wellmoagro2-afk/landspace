# Pipeline de QA para CSP

## Visão Geral

O pipeline automatizado `npm run qa:csp` valida a Content Security Policy (CSP) do site sem depender de serviços externos ou APIs de terceiros.

## Modo Determinístico

O pipeline usa a flag de ambiente `QA_CSP=1` para garantir execução determinística:

- **Build**: Executado com `QA_CSP=1`, evitando chamadas externas durante a compilação
- **Servidor**: Iniciado com `QA_CSP=1`, garantindo que endpoints retornem mocks locais
- **Validação**: CSP é validada sem necessidade de conectividade externa

## Endpoints com Suporte a QA_CSP

### `/api/strategy/pulse`

Quando `QA_CSP=1` está definido:

- Retorna dados mockados localmente (sem chamar GDELT API)
- Mantém o mesmo formato de resposta esperado pela UI
- Status HTTP 200
- Header `X-Cache-Status: QA_MOCK` para identificação

**Exemplo de resposta em modo QA:**
```json
{
  "success": true,
  "data": {
    "terms": [...],
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "nextUpdate": "2024-01-01T01:00:00.000Z"
  },
  "cached": false,
  "mock": true,
  "qaMode": true,
  "context": "strategy"
}
```

## Executando o Pipeline

```bash
npm run qa:csp
```

O pipeline executa as seguintes etapas:

1. **Kill processos na porta 3001**: Libera a porta para o servidor
2. **Remove .next**: Limpa build anterior
3. **Valida env vars**: Verifica variáveis de ambiente obrigatórias
4. **Build (webpack)**: Compila o projeto com `QA_CSP=1`
5. **Inicia servidor**: Sobe Next.js na porta 3001 com `QA_CSP=1`
6. **Aguarda /api/health**: Verifica readiness do servidor
7. **CSP routes check**: Valida CSP em todas as rotas principais
8. **Debug (se falhar)**: Executa scripts de debug para `/tech` e `/strategy`
9. **Cleanup**: Sempre mata o servidor no final

## Validação de CSP

O script `csp-routes-check.mjs` valida:

- Presença do header `Content-Security-Policy`
- Ausência de `'unsafe-inline'` em `script-src`, `style-src`, `style-src-elem`
- Presença de nonce em scripts/styles
- Hashes permitidos em `style-src-attr`
- Compatibilidade com rotas dinâmicas

## Troubleshooting

### Servidor não inicia

- Verifique se a porta 3001 está livre: `netstat -ano | findstr :3001`
- Confirme que as variáveis de ambiente estão configuradas (`.env.local`)

### CSP violations

- Execute os scripts de debug: `node scripts/debug-csp-strategy.mjs http://localhost:3001/strategy`
- Verifique os hashes em `src/lib/security/csp.ts`
- Confirme que não há inline styles/scripts não permitidos

### Timeout no health check

- Aumente o timeout em `waitForHealth()` se necessário
- Verifique logs do servidor para erros de inicialização

## Notas Técnicas

- O modo `QA_CSP=1` não relaxa a CSP, apenas substitui chamadas externas por mocks
- Todos os endpoints devem manter o mesmo formato de resposta em modo QA
- O pipeline é idempotente: pode ser executado múltiplas vezes sem efeitos colaterais
