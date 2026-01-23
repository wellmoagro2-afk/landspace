<!-- FILE: geostudio_content_bundle.md -->
# LandSpace GeoStudio — Content Bundle (Rotas + Conteúdo)

Este arquivo consolida **todo o conteúdo** do GeoStudio em um único lugar, organizado por rotas.  
Use como base para **Next.js/MDX**, CMS ou páginas estáticas.

---

## COMPONENTES GLOBAIS (reutilizáveis)

### CTA (padrão)
**Headline:** Pronto para transformar dados em decisão?  
**Texto:** Envie sua área e objetivo. Nós retornamos com pacote recomendado, cronograma e escopo fechado.  
**Botão Primary:** Solicitar orçamento  
**Botão Secondary:** Ver portfólio

### Rodapé (escopo e revisões) — inserir em todas as páginas
- **Revisões inclusas:** 2 rodadas (layout/simbologia/texto e ajustes pontuais).  
- **Mudança de escopo:** nova área, novo período, novos indicadores, novos datasets ou novo pacote → aditivo.  
- **Limitações:** resultados dependem de escala/qualidade dos dados; isso é explicitado no relatório.  
- **Entregáveis padrão:** Atlas PDF + base geoespacial organizada + metadados + simbologia.

### Entregáveis padrão (cards “O que você recebe”)
1) Atlas cartográfico (PDF) com layouts técnicos editoriais  
2) Base geoespacial organizada (GeoPackage/FGDB) + metadados  
3) Camadas finais (GeoTIFF/Vetor) + simbologia (QML/SLD)  
4) Relatório técnico curto (método + resultados + limitações)  
5) (Opcional) figuras, séries temporais e sínteses para apresentação

---

# --- ROUTE: /geostudio ---

## Hero
**Headline:** Cartografia técnica para decisão pública, ambiental e agro.  
**Subheadline:** Mapas, modelos e relatórios prontos para planejamento territorial, gestão ambiental, bacias hidrográficas e agricultura de precisão — com base geoespacial organizada e padrão de qualidade auditável.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Seção — Soluções por objetivo (cards)
- Planejamento Urbano e Plano Diretor  
- ZEE e Ordenamento Territorial  
- Bacias, USLE/RUSLE e Conservação do Solo  
- PUC/SCUP e priorização conservacionista  
- Riscos Climáticos e Agroclima  
- Aptidão Agrícola (integrada)  
- Agricultura de precisão (zonas de manejo e VRA)  
- Florestal e restauração  
- Drone e fotogrametria

## Seção — Diferencial GeoStudio
- **Clareza cartográfica + rigor técnico:** mapas com leitura editorial e consistência geoespacial (CRS, NoData, alinhamento).  
- **Entregáveis reutilizáveis:** banco GIS pronto para gestão e atualização.  
- **Pacotes previsíveis:** escopo fechado, prazos padrão e revisões estruturadas.  
- **Escalável para projetos premium:** módulos avançados (cenários, multicritério, robustez).

## FAQ (curto)
**Vocês entregam só PDF?** Não. Entregamos atlas PDF + base geoespacial + metadados + simbologia.  
**Eu não tenho todos os dados.** Podemos compor com bases públicas e integrar dados do cliente.

## CTA final
(usar CTA padrão)

---

# --- ROUTE: /geostudio/pacotes ---

## Hero
**Headline:** Escolha o pacote pelo objetivo.  
**Subheadline:** Essencial para diagnóstico rápido, Profissional para modelagem e priorização, Premium para diretrizes e cenários.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Como funciona

## Seção — Níveis (cards)
### Essencial
- 6–12 mapas  
- Relatório 2–5 páginas  
- 10–20 dias úteis (típico)  
- 2 revisões

### Profissional
- 12–20 mapas + sínteses/modelos  
- Relatório 4–10 páginas  
- 20–45 dias úteis  
- 2 revisões

### Premium
- 20+ mapas + cenários/diretrizes  
- Relatório 8–15 páginas  
- 30–90 dias úteis  
- 2 revisões (extras opcionais)

## Seção — O que você recebe
(usar cards padrão de entregáveis)

## Seção — Como escolher
- **Se você precisa entender o território:** Essencial  
- **Se você precisa priorizar/intervir:** Profissional  
- **Se você precisa decidir política/diretriz/cenário:** Premium

## CTA final
(usar CTA padrão)

---

# --- ROUTE: /geostudio/como-funciona ---

## Hero
**Headline:** Um processo claro. Entregáveis previsíveis.  
**Subheadline:** Do briefing à entrega final: método, QA e revisões estruturadas para reduzir incerteza e acelerar a decisão.  
**CTA Primary:** Enviar briefing  
**CTA Secondary:** Ver pacotes

## Etapas
### 1) Briefing e diagnóstico de dados (D+0 a D+2)
- conferência de área, escala, objetivo e dados disponíveis  
- recomendação de pacote + cronograma  
- identificação de riscos (escala, lacunas de dados, campo/drone)

### 2) Produção e modelagem
- processamento + validações  
- mapas e sínteses + relatório técnico  
- padronização de layouts e base geoespacial

### 3) Revisões (2 rodadas inclusas)
- layout, simbologia, textos, ajustes pontuais  
- alinhamento final com objetivo decisório

### 4) Entrega e handoff
- atlas PDF + base geoespacial + metadados + simbologia  
- checklist final de consistência (CRS, resolução, NoData, integridade)

## Seção — Prazos e SLA (resumo)
- prazos variam conforme escala, disponibilidade/qualidade dos dados e necessidade de campo  
- projetos premium podem incluir cronograma por fase (diagnóstico → síntese → diretrizes)

## CTA final
(usar CTA padrão)

---

# --- ROUTE: /geostudio/orcamento ---

## Hero
**Headline:** Solicite orçamento com briefing técnico rápido.  
**Subheadline:** Defina área, objetivo e prazo. Nós respondemos com pacote recomendado, cronograma e escopo fechado.  
**CTA Primary:** Enviar briefing

## Formulário (campos sugeridos)
- Tipo de projeto (urbano, ZEE, bacias/USLE, PUC/SCUP, riscos climáticos, aptidão, agro precisão, florestal, drone)  
- Área (upload shapefile/kml/geojson ou link)  
- Objetivo decisório  
- Prazos (desejado e limite)  
- Dados disponíveis (upload/lista)  
- Escala/nível de detalhe  
- Contato e instituição/empresa

## Nota de escopo (microcopy)
“Sem todos os dados? Sem problema. Podemos compor bases públicas e integrar as suas camadas.”

---

# --- ROUTE: /geostudio/portfolio ---

## Hero
**Headline:** Portfólio e casos de uso.  
**Subheadline:** Exemplos de mapas, atlas e bases geoespaciais entregues para diferentes finalidades — com foco em clareza, rastreabilidade e aplicação prática.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Seção — Estrutura recomendada de case (template)
- Contexto e objetivo decisório  
- Dados e escala  
- Métodos aplicados (alto nível)  
- Mapas principais (3–6)  
- Resultados e recomendações  
- Entregáveis (atlas/base/relatório)

---

# --- ROUTE: /geostudio/urbano-plano-diretor ---

## Hero
**Headline:** Planejamento urbano com base técnica e leitura clara.  
**Subheadline:** Diagnóstico territorial, mapas normativos e sínteses para Plano Diretor, zoneamento urbano, expansão e requalificação — com atlas e base GIS prontos para gestão.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver entregáveis

## Pacotes
### Essencial — Diagnóstico Territorial
**Inclui (exemplos de mapas):**
- limites, bairros/distritos, malha urbana  
- sistema viário (hierarquia) e centralidades  
- uso e ocupação do solo (atual)  
- áreas verdes/cobertura arbórea  
- hipsometria/declividade  
- hidrografia/APP (quando aplicável)  
**Prazo típico:** 10–15 dias úteis

### Profissional — Conflitos, Risco e Propostas
**Inclui (além do Essencial):**
- conflitos de uso (APP, áreas frágeis)  
- risco (inundação/suscetibilidade quando possível)  
- diretrizes de expansão/adensamento (cenários)  
- síntese para minuta técnica  
**Prazo típico:** 20–35 dias úteis

### Premium — Zoneamento Propositivo e Diretrizes
**Inclui:**
- macrozoneamento e zonas especiais (conforme objetivo)  
- diretrizes por zona + mapas normativos prontos para discussão técnica  
**Prazo típico:** 30–60 dias úteis

## Dados mínimos necessários
- limite municipal/perímetro urbano (vetor)  
- foco do plano (mobilidade, expansão, drenagem, etc.)  
- bases municipais (vias/equipamentos), se houver

## FAQ
**Vocês produzem mapa normativo?** Sim (produto técnico-cartográfico); validação jurídica é do contratante.  
**Dá para integrar dados do município?** Sim, e melhora a precisão do diagnóstico.

## CTA final
(usar CTA padrão)

---

# --- ROUTE: /geostudio/zee-ordenamento ---

## Hero
**Headline:** ZEE com diagnóstico integrado e zonas aplicáveis.  
**Subheadline:** Integra meio físico, biótico e socioeconômico para construir potencialidades, vulnerabilidades e diretrizes por zona.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Pacotes
### Profissional — Diagnóstico Integrado + Síntese
- meio físico (relevo/solos/geologia conforme disponibilidade)  
- meio biótico (cobertura vegetal, fragmentação, conectividade)  
- socioeconômico (infraestrutura, pressões, dinâmica de ocupação)  
- restrições legais (APP/UC) quando aplicável  
- síntese (fragilidade/vulnerabilidade)

**Prazo típico:** 30–60 dias úteis

### Premium — Zonas do ZEE + Diretrizes + Cenários
- mapa final de zonas  
- diretrizes por zona (uso recomendado, condicionantes, prioridades)  
- cenários opcionais (conservação × produção × urbano)

**Prazo típico:** 45–90 dias úteis

## Dados mínimos necessários
- limite da área e objetivos do ZEE  
- bases locais e condicionantes legais (se houver)

## FAQ
**Pode ser municipal?** Sim; escala e dados definem detalhamento.  
**Critérios e pesos são documentados?** Sim, com rastreabilidade.

---

# --- ROUTE: /geostudio/bacias-usle-conservacao ---

## Hero
**Headline:** Bacias hidrográficas: do diagnóstico à intervenção.  
**Subheadline:** Delimitação, indicadores físicos, uso do solo e modelagem de erosão (USLE/RUSLE) para priorizar ações de conservação.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver entregáveis

## Pacotes
### Essencial — Diagnóstico físico-hidrológico
- delimitação de bacia/sub-bacias; drenagem e ordem de canais  
- hipsometria/declividade; densidade de drenagem (indicadores)  
- uso e cobertura do solo (atual)  
- APP e áreas sensíveis (quando aplicável)  
**Prazo típico:** 10–20 dias úteis

### Profissional — USLE/RUSLE + Hotspots + Priorização
- fatores (R, K, LS, C, P quando possível) com documentação  
- perda de solo (EP/ER conforme método)  
- hotspots e priorização por sub-bacia/APP  
- (opcional) sensibilidade/Monte Carlo  
**Prazo típico:** 20–40 dias úteis

### Premium — Integração avançada
- integração com PUC/SCUP e/ou fragilidade  
- cenários e priorização avançada  
**Prazo típico:** 30–60 dias úteis

## Dados mínimos necessários
- bacia/sub-bacia ou exutório  
- DEM/MDT; solos; uso/cobertura; chuva (ou metodologia definida)

## FAQ
**Entregam por sub-bacia?** Sim, como padrão.  
**Inclui recomendações?** Sim, como diretrizes técnicas no relatório.

---

# --- ROUTE: /geostudio/puc-scup ---

## Hero
**Headline:** Potencial conservacionista com robustez técnica.  
**Subheadline:** PUC/SCUP para priorizar manejo e conservação com classes interpretáveis, máscaras de robustez e integração com erosão e fragilidade.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Pacotes
### Profissional — PUC/SCUP (determinístico) + interpretação
- PUC e subclasses (conforme método)  
- síntese interpretativa e áreas prioritárias  
**Prazo típico:** 25–45 dias úteis

### Premium — Robustez + Integração
- máscaras de robustez (probabilístico quando aplicável)  
- integração com USLE/fragilidade e priorização  
**Prazo típico:** 30–50 dias úteis

## Dados mínimos necessários
- DEM/MDT + solos + litologia (ou equivalentes)  
- classes/limiares (ou padrão recomendado)

## FAQ
**Posso usar com máscara de uso/MapBiomas?** Sim.  
**Entregam mapas de incerteza?** Se contratado, sim.

---

# --- ROUTE: /geostudio/riscos-climaticos ---

## Hero
**Headline:** Riscos climáticos em mapas acionáveis.  
**Subheadline:** Variabilidade, extremos e indicadores (seca/veranicos/chuva intensa) para apoiar planejamento agrícola, defesa civil e gestão ambiental.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Pacotes
### Essencial — Exposição e indicadores
- variabilidade/anomalias de precipitação/temperatura  
- índices de seca (SPI/SPEI quando aplicável)  
- indicadores de veranicos/estiagens (conforme região/dados)  
- síntese de exposição por unidade territorial  
**Prazo típico:** 10–25 dias úteis

### Profissional — Índices + Síntese por cultura/território
- indicadores orientados ao objetivo (agro, urbano, bacia)  
- relatórios com leitura prática  
**Prazo típico:** 20–40 dias úteis

### Premium — Cenários e vulnerabilidade (quando aplicável)
- cenários e interpretação para decisão (dependendo do escopo)  
**Prazo típico:** 30–60 dias úteis

## Dados mínimos necessários
- área e período  
- finalidade (agro/urbano/bacia) e variáveis de interesse

## FAQ
**Entregam séries + mapas?** Sim, com sínteses e indicadores.  
**Serve para seguro agrícola?** Apoia; regras finais dependem de terceiros.

---

# --- ROUTE: /geostudio/aptidao-agricola-agroclima ---

## Hero
**Headline:** Aptidão agrícola para orientar o uso da terra com segurança.  
**Subheadline:** Integra clima, solo e relevo para classificar aptidão por cultura e manejo, com recomendações e limitações explicitadas.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Pacotes
### Profissional — Zoneamento Agroclimático + Aptidão Integrada
- aptidão climática por cultura (zonas/classes)  
- balanço hídrico (indicadores)  
- aptidão agrícola integrada (clima + solo + relevo)  
- janelas de plantio (quando aplicável)  
**Prazo típico:** 20–45 dias úteis

### Premium — Cenários (irrigado × sequeiro) + multiuso
- cenários e regras alternativas  
- priorização multiuso (produção × conservação, quando aplicável)  
**Prazo típico:** 30–60 dias úteis

## Dados mínimos necessários
- culturas-alvo e manejo  
- bases de solo e relevo; período histórico (ou autorização para compor)

## FAQ
**Substitui agronomia?** Não; complementa com base espacial.  
**Pode ser por talhão?** Se a escala e dados suportarem.

---

# --- ROUTE: /geostudio/agricultura-precisao ---

## Hero
**Headline:** Agricultura de precisão com zonas de manejo e prescrição.  
**Subheadline:** Produtividade, variabilidade espacial e recomendações operacionais com mapas compatíveis com seu fluxo (GIS e equipamentos).  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver entregáveis

## Pacotes
### Profissional — Zonas de manejo + produtividade + amostragem
- produtividade (quando houver) com validação/limpeza  
- zonas de manejo (clusters) com justificativa (NDVI/solo/topografia conforme dados)  
- estabilidade temporal (multi-safra) quando houver  
- plano de amostragem e mapas interpolados (se contratado)  
**Prazo típico:** 15–35 dias úteis

### Premium — Prescrição (VRA) + mapas operacionais
- prescrição para taxa variável (calcário/fertilizante/semente)  
- mapas operacionais e premissas documentadas  
**Prazo típico:** 10–25 dias úteis (após zonas)

## Dados mínimos necessários
- limites de talhões  
- NDVI/histórico; produtividade (se houver); amostras de solo (se houver)

## FAQ
**Entregam arquivo para equipamento?** Se o padrão do cliente for definido.  
**Sem produtividade dá para fazer?** Sim, com sensoriamento + variáveis ambientais.

---

# --- ROUTE: /geostudio/florestal-restauracao ---

## Hero
**Headline:** Conservação e restauração guiadas por evidência espacial.  
**Subheadline:** Fragmentação, conectividade, corredores e priorização de restauração para planejamento florestal e gestão ambiental.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Pacotes
### Profissional — Priorização + conectividade
- cobertura vegetal, fragmentação e conectividade (indicadores)  
- priorização de restauração (multicritério)  
- corredores ecológicos (método conforme escopo)  
- pressões/ameaças (borda, vias, dinâmica de perda, etc.)  
**Prazo típico:** 20–45 dias úteis

### Premium — Cenários + diretrizes + mitigação (quando aplicável)
- cenários alternativos e regras comparadas  
- apoio a mitigação/compensação quando aplicável  
**Prazo típico:** 30–60 dias úteis

## Dados mínimos necessários
- área e objetivo (restaurar, conectar, proteger)  
- camadas locais (UC, APP, projetos), se houver

## FAQ
**Fazem corredores ecológicos?** Sim, conforme critério e dados.  
**Integra PSA?** Pode integrar como camada de decisão.

---

# --- ROUTE: /geostudio/drone-fotogrametria ---

## Hero
**Headline:** Alta resolução para decisões de campo.  
**Subheadline:** Ortofoto, MDT/MDS e derivados para urbano e agro — com base pronta para GIS/CAD conforme escopo.  
**CTA Primary:** Solicitar orçamento  
**CTA Secondary:** Ver pacotes

## Pacotes
### Essencial — Ortofoto + modelos
- ortofoto + MDS/MDT (conforme objetivo)  
**Prazo típico:** 7–25 dias úteis (condicionado a campo/clima)

### Profissional — Derivados + mapas técnicos
- declividade, drenagem e produtos derivados quando aplicável  
**Prazo típico:** 10–30 dias úteis

### Premium — Volumetria, acompanhamento e inspeções
- módulos específicos sob demanda  
**Prazo típico:** sob cronograma do projeto

## Dados mínimos necessários
- área, objetivo, restrições operacionais e janela de voo  
- autorizações e logística (quando necessário)

## FAQ
**Vocês fazem o voo?** Depende do arranjo (cliente/parceiro).  
**Prazo depende do clima?** Sim, quando há aquisição em campo.

---

# --- ROUTE: /geostudio/servicos (opcional: página “catálogo completo”) ---

## Hero
**Headline:** Um catálogo completo de mapas para planejamento e gestão.  
**Subheadline:** Pacotes por objetivo, com entregáveis padronizados, base geoespacial organizada e metodologia transparente.

## Seção — Lista de serviços (links)
- Urbano e Plano Diretor  
- ZEE e Ordenamento Territorial  
- Bacias/USLE/Conservação  
- PUC/SCUP  
- Riscos Climáticos  
- Aptidão Agrícola e Agroclima  
- Agricultura de Precisão  
- Florestal e Restauração  
- Drone/Fotogrametria

---

## INSERIR EM TODAS AS PÁGINAS
- Seção “O que você recebe” (cards padrão)  
- Seção “Dados mínimos necessários”  
- FAQ (5–10)  
- Rodapé (escopo e revisões)  
- CTA final (CTA padrão)
