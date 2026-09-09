# Sair do export estático e hospedar no Vercel

O site nasceu como export estático no GitHub Pages. Isso proibia, de uma vez só: middleware
(logo, o roteamento de idioma acima), ISR, otimização de imagem e — o que passa despercebido
— qualquer cabeçalho HTTP, porque não existe servidor para emiti-los. Um site sem servidor
não tem como mandar CSP, HSTS ou `X-Content-Type-Options`.

Trocamos por Vercel com deploy a cada push. O domínio antigo do GitHub Pages continua no ar
servindo apenas um redirecionamento permanente para o endereço novo, publicado por um
workflow separado — os links já espalhados por aí não podem morrer.

## Consequências

- Ganhamos uma dependência de plataforma. O que amarra de verdade é ISR + middleware; o resto
  do site é Next comum e sairia daqui sem drama.
- O workflow do GitHub Pages não é sobra de configuração antiga: ele existe de propósito e
  publica só a página de redirecionamento.
