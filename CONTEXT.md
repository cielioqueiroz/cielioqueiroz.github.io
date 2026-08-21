# Portfólio

Um portfólio pessoal publicado como se fosse uma **edição** de revista: seções numeradas,
duas línguas e uma seção de dados que recalcula ao vivo. Este arquivo fixa o vocabulário —
o site usa palavras vizinhas para coisas diferentes, e trocá-las gera bug de conteúdo que
nenhum tipo pega.

## Editorial

**Edição**:
O site inteiro, tratado como um número de revista (hoje `Vol. I · 2026`). É a unidade que
envelhece: quando o conteúdo gira, gira a edição.
_Evite_: versão, release.

**Seção**:
Um dos sete blocos numerados da capa ao colofão (`§ 01` … `§ 07`). A numeração é conteúdo,
não enfeite: é a mesma nos dois idiomas.
_Evite_: bloco, aba, página.

**Colofão**:
A seção § 07 — contato, créditos e ficha técnica. Fecha a edição.
_Evite_: rodapé, footer (o rodapé é o componente; o colofão é a seção).

**Kicker**:
A linha curta em maiúsculas que antecede um título. Rótulo editorial, nunca frase.
_Evite_: subtítulo, tagline.

## Projetos

**Estudo de caso**:
Um projeto que eu escolhi narrar: tem página própria, contexto, solução e aprendizado
redigidos por mim nos dois idiomas. São poucos e escritos à mão.
_Evite_: projeto, portfolio item, showcase.

**Repositório**:
Um repositório do GitHub, lido da API. Aparece com nome, descrição e linguagem — não tem
narrativa nem página própria.
_Evite_: projeto, repo destacado.

**Repositório fixado**:
Um repositório escolhido a dedo para abrir a vitrine, com selo próprio. Espelha os pins do
perfil do GitHub, mas é declarado no projeto — não é lido de lá.
_Evite_: destaque, featured, pin.

**Arquivo de repositórios**:
A vitrine que lista os repositórios dentro da § 03. É o "e tem mais" depois dos estudos de
caso; nunca o prato principal.
_Evite_: galeria, lista de projetos.

**Projetos (§ 03)**:
O nome da SEÇÃO que contém os estudos de caso e o arquivo de repositórios. Como termo de
domínio isolado, "projeto" é ambíguo — use "estudo de caso" ou "repositório".

**Slug**:
O identificador de um estudo de caso na URL. É o mesmo nos dois idiomas: trocar de língua
não muda o endereço do projeto.

## Planilhas vivas

**Planilhas vivas**:
O nome da seção § 06 — as demonstrações financeiras que recalculam no navegador em vez de
serem imagem de planilha. O menu abrevia para "Dados" por caber; o nome da coisa é este.
_Evite_: dashboard, gráficos, seção de dados.

**DRE**:
A demonstração de resultado do exercício modelada no site: premissas de entrada e as linhas
derivadas delas. É um MODELO, não uma tabela de valores digitados.
_Evite_: tabela, demonstrativo, P&L.

**Cascata**:
A sequência ordenada de linhas da DRE, da receita bruta ao lucro líquido, em que cada
subtotal é a soma exata do que veio acima. "A cascata fecha" é a invariante do modelo.
_Evite_: waterfall, fluxo.

**Cenário**:
Um deslocamento da receita bruta em relação ao caso-base (−30% a +30%) e o recálculo inteiro
que ele provoca. Cenário move receita; nunca muda premissa.
_Evite_: simulação, projeção, forecast.

**Caso-base**:
O cenário sem deslocamento — os números publicados, os mesmos que saem do servidor antes de
qualquer interação.
_Evite_: default, cenário 1.

**Custo variável / Custo fixo**:
Variável é o que acompanha a receita (deduções, CPV); fixo é o que não acompanha (despesas
operacionais, depreciação, resultado financeiro). A fronteira entre os dois é o que produz a
alavancagem — é premissa do modelo, não detalhe de cálculo.

**Alavancagem operacional**:
O efeito de ter custo fixo na cascata: o lucro se move mais que proporcionalmente à receita,
para cima e para baixo. É o argumento que a seção existe para demonstrar.

**Análise vertical (AV)**:
A participação de cada linha sobre a receita bruta do próprio cenário.
_Evite_: percentual, share.

**Fluxo de caixa**:
A tabela de entradas e saídas mensais do orçamento familiar. Dado observado, sem modelo por
trás — o oposto da DRE.
_Evite_: cashflow projetado, previsão.

## Credenciais

**Credencial**:
O guarda-chuva da § 05: tudo que comprova formação — o diploma e os certificados.

**Certificado**:
Um curso concluído, com título e instituição emissora. Agrupado por categoria.
_Evite_: curso, badge, formação.

**Diploma**:
A graduação. É um só, tem destaque próprio e não entra na contagem de certificados.

**Categoria**:
O agrupamento de um certificado ou de uma skill. É escrita em português nos dados e
traduzida na exibição em inglês — categoria sem tradução aparece em português para o leitor
estrangeiro.

## Idioma

**Idioma padrão**:
O português. Mora na raiz do domínio, sem prefixo na URL, porque é o endereço já indexado.
_Evite_: locale principal, fallback.

**Idioma prefixado**:
Todo idioma que não é o padrão — hoje só o inglês, servido sob prefixo na URL.

**Texto de interface**:
Rótulo, título de seção, mensagem de estado. Existe nos dois idiomas e é traduzido.
Não confundir com **conteúdo** (estudos de caso, dado factual), que é redigido, não traduzido
mecanicamente — e não confundir com **dado factual** (nomes de empresa, tecnologias, títulos
de certificado), que é igual nos dois idiomas por ser nome próprio.

## Identidade

**Fumaça Grafite**:
O conceito visual da edição: monocromático total — carvão quase-preto, texto cinza-claro e
luz branca como único accent. A "fumaça" são os brilhos difusos, todos acromáticos.
_Evite_: dark mode, tema escuro (o tema claro é o mesmo conceito invertido).

**Token de tema**:
Um valor de cor declarado uma única vez e consumido por tudo que precisa dele — página,
banner social, manifesto do app, currículo. Cor escrita fora do token é cor que vai divergir.

**Orçamento de bundle**:
O teto de JavaScript que todo visitante baixa, verificado a cada push. Não é meta: é limite —
estourar reprova o build.
_Evite_: meta de performance, budget de peso.
