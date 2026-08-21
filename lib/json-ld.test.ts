import { describe, expect, it } from 'vitest';
import { jsonLd } from '@/lib/json-ld';

/**
 * O JSON-LD é injetado dentro de um `<script>`. `JSON.stringify` não escapa
 * `<`, então uma string que contenha o fechamento da tag encerra o bloco e o
 * resto vira HTML executável. Hoje todo dado vem de arquivo versionado — mas o
 * dia em que um campo passar a vir da GitHub API, este teste é o que impede
 * que a blindagem tenha sido removida "porque não fazia nada".
 */

describe('jsonLd', () => {
  it('não deixa escapar o fechamento do script', () => {
    const payload = jsonLd({ name: '</script><img src=x onerror=alert(1)>' });

    expect(payload).not.toContain('</script>');
    expect(payload).not.toContain('<');
    expect(payload).not.toContain('>');
  });

  it('escapa também o & — entidades HTML não sobrevivem à serialização', () => {
    expect(jsonLd({ q: 'contas & caixa' })).toContain(String.raw`\u0026`);
  });

  it('continua sendo JSON válido: todo parser desfaz o escape unicode', () => {
    const original = {
      '@context': 'https://schema.org',
      name: 'Ciélio <b>Queiroz</b> & cia',
      list: [1, 2, 3],
    };

    expect(JSON.parse(jsonLd(original))).toEqual(original);
  });

  it('preserva acentuação sem escapar demais', () => {
    expect(JSON.parse(jsonLd({ cargo: 'Administração & Finanças' }))).toEqual({
      cargo: 'Administração & Finanças',
    });
  });
});
