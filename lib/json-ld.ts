/**
 * Serializa um objeto para dentro de um <script type="application/ld+json">.
 *
 * `JSON.stringify` NAO escapa `<`, entao uma string contendo o fechamento de
 * script encerraria o bloco e o resto do documento viraria HTML executavel.
 * Hoje todo o dado vem de arquivos versionados, mas basta um campo passar a
 * vir da GitHub API ou de um CMS para isso virar XSS armazenado — e o custo
 * de blindar e este arquivo.
 *
 * Escapamos `<`, `>` e `&` como escapes unicode: continua JSON valido (todo
 * parser desfaz \uXXXX) e nenhum deles sobrevive como caractere de marcacao
 * no HTML.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
