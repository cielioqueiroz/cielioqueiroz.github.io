# CSP escrita à mão, com duas frouxidões declaradas

A política de segurança de conteúdo é escrita à mão porque o conteúdo do site é conhecido e
fechado: não há entrada de usuário nem terceiros além dos listados. Duas permissões nela
parecem erro à primeira vista e não são — este registro existe para que ninguém "conserte":

- **`'unsafe-inline'` em `script-src`.** O Next injeta os scripts de hidratação inline sem
  nonce em página estática. Usar nonce obrigaria renderização dinâmica em todas as páginas,
  jogando fora o cache — pagar performance em toda visita para endurecer uma superfície que
  hoje não recebe dado de terceiro.
- **`'wasm-unsafe-eval'` e `data:` em `connect-src`.** O gerador do currículo em PDF compila
  um módulo WebAssembly carregado de um `data:` URI. Sem os dois, o botão de baixar o CV falha
  em silêncio. Usamos `'wasm-unsafe-eval'`, que libera só a compilação de WebAssembly, e
  deliberadamente NÃO `'unsafe-eval'`, que liberaria `eval()` de strings.

## Consequências

O dia em que qualquer texto renderizado passar a vir de fora (a API do GitHub, um CMS), o
`'unsafe-inline'` deixa de ser aceitável e a conta de mudar para nonce vence.
