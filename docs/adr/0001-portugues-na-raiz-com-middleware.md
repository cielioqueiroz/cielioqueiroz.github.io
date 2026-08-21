# Português na raiz, inglês com prefixo, uma árvore só de rotas

O App Router não tem roteamento de idioma embutido, e o site já estava indexado com o
português na raiz do domínio. As três saídas eram: mover o português para `/pt/` (quebra
todos os links já indexados), duplicar a árvore de componentes por idioma (dois lugares para
consertar cada bug), ou reescrever no middleware. Escolhemos a terceira: toda página vive em
`app/[locale]`, o middleware reescreve a raiz para o idioma padrão sem mudar a URL do
visitante e redireciona `/pt/…` de volta para a raiz.

## Consequências

- O custo é um middleware rodando em toda requisição de página, e o cuidado de sempre montar
  link interno pelo helper de rota em vez de escrever o caminho na mão.
- Redirect precisa sair já com barra final. O objeto de URL do Next reaplica a forma da URL
  que chegou ao ser serializado, desfazendo em silêncio a barra que acabamos de acrescentar —
  e o resultado é uma cadeia de dois 308. Há teste travando exatamente isso.
- As URLs de projeto usam a palavra portuguesa (`/en/projetos/…` no site em inglês). É deriva
  conhecida e ainda não resolvida: trocar o segmento exige redirect permanente do antigo.
