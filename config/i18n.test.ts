import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALES, dicts, getDict, isLocale, languageAlternates, localePath } from '@/config/i18n';
import { site } from '@/config/site';

/**
 * Duas classes de erro moram aqui, e nenhuma delas o TypeScript pega.
 *
 * 1. ROTA. `localePath` é a única forma legítima de montar link interno: o
 *    português vive na raiz e o inglês sob prefixo, e `trailingSlash: true`
 *    exige barra final. Um caminho montado errado vira 308 desnecessário —
 *    ou, no hreflang e no sitemap, uma URL que não existe.
 *
 * 2. TRADUÇÃO SILENCIOSA. `Dict = typeof pt` garante que o inglês tenha as
 *    mesmas CHAVES, não que os dados casem. Os mapas de categoria são
 *    `Record<string, string>`: uma categoria nova em `site.ts` sem par no
 *    dicionário inglês aparece em português para o leitor estrangeiro, sem
 *    erro de build e sem tela vermelha.
 */

/** Percorre as duas árvores comparando o formato das chaves, não os valores. */
function keyShape(value: unknown, path = ''): string[] {
  if (value === null || typeof value !== 'object') return [path];
  if (Array.isArray(value)) return [`${path}[]`];
  return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
    // Mapas de categoria são dados, não formato: comparados à parte, abaixo.
    k === 'categories' ? [`${path}.${k}`] : keyShape(v, `${path}.${k}`)
  );
}

describe('localePath monta o caminho interno', () => {
  it.each([
    ['pt', '/', '/'],
    ['pt', '/projetos/gabarito-ai', '/projetos/gabarito-ai/'],
    ['pt', 'projetos/gabarito-ai', '/projetos/gabarito-ai/'],
    ['en', '/', '/en/'],
    ['en', '/projetos/gabarito-ai', '/en/projetos/gabarito-ai/'],
  ] as const)('%s + %s → %s', (locale, path, expected) => {
    expect(localePath(locale, path)).toBe(expected);
  });

  it('o idioma padrão nunca ganha prefixo — a raiz já está indexada assim', () => {
    expect(localePath(DEFAULT_LOCALE, '/')).not.toContain(DEFAULT_LOCALE);
  });

  it('todo caminho sai com barra final, como o trailingSlash exige', () => {
    for (const locale of LOCALES) {
      for (const path of ['/', '/projetos/', '/projetos/x', 'sobre']) {
        expect(localePath(locale, path).endsWith('/')).toBe(true);
      }
    }
  });

  it('é idempotente: repassar o resultado não empilha barra nem prefixo', () => {
    const once = localePath('en', '/projetos/x');

    expect(once).toBe('/en/projetos/x/');
    expect(once).not.toContain('//');
  });
});

describe('languageAlternates alimenta hreflang e sitemap', () => {
  const alternates = languageAlternates('/projetos/gabarito-ai');

  it('usa os códigos que o Google espera', () => {
    expect(Object.keys(alternates).sort()).toEqual(['en', 'pt-BR']);
  });

  it('devolve URL absoluta na origem canônica', () => {
    for (const url of Object.values(alternates)) {
      expect(url.startsWith(site.url)).toBe(true);
      expect(() => new URL(url)).not.toThrow();
    }
  });

  it('aponta para o mesmo conteúdo nos dois idiomas', () => {
    expect(alternates['pt-BR']).toBe(`${site.url}/projetos/gabarito-ai/`);
    expect(alternates['en']).toBe(`${site.url}/en/projetos/gabarito-ai/`);
  });
});

describe('isLocale', () => {
  it('aceita só os idiomas publicados', () => {
    expect(isLocale('pt')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('es')).toBe(false);
    expect(isLocale('EN')).toBe(false); // a normalização de caixa é do middleware
  });

  it('getDict cai no padrão quando chamado sem argumento', () => {
    expect(getDict()).toBe(dicts[DEFAULT_LOCALE]);
  });
});

describe('os dois dicionários andam juntos', () => {
  it('têm exatamente as mesmas chaves', () => {
    expect(keyShape(dicts.en)).toEqual(keyShape(dicts.pt));
  });

  it('o índice do menu aponta para as mesmas seções, na mesma ordem', () => {
    // Este par já esteve acoplado por posição em outro arquivo e trocou o
    // texto de um item pelo de outro. Aqui a checagem é explícita.
    expect(dicts.en.nav.links.map((l) => [l.href, l.n])).toEqual(
      dicts.pt.nav.links.map((l) => [l.href, l.n])
    );
  });

  it('a numeração editorial das seções é a mesma nos dois idiomas', () => {
    const numbers = (d: typeof dicts.pt) =>
      [d.about, d.projects, d.skills, d.certs, d.data, d.footer].map((s) =>
        s.marker.match(/§\s*\d+/)?.[0]
      );

    expect(numbers(dicts.en)).toEqual(numbers(dicts.pt));
    expect(numbers(dicts.pt)).not.toContain(undefined);
  });

  it('cada idioma declara o próprio lang e o locale de número', () => {
    expect(dicts.pt.htmlLang).toBe('pt-BR');
    expect(dicts.en.htmlLang).toBe('en');
    expect(() => (1234.5).toLocaleString(dicts.en.numberLocale)).not.toThrow();
    expect(() => (1234.5).toLocaleString(dicts.pt.numberLocale)).not.toThrow();
  });
});

describe('nenhuma categoria aparece sem tradução no site em inglês', () => {
  it('cobre todas as categorias de certificado', () => {
    const usadas = [...new Set(site.certificates.map((c) => c.category))];
    const traduzidas = Object.keys(dicts.en.certs.categories);

    expect(usadas.filter((c) => !traduzidas.includes(c))).toEqual([]);
  });

  it('cobre todas as categorias de skill', () => {
    const usadas = site.skills.map((g) => g.category);
    const traduzidas = Object.keys(dicts.en.skills.categories);

    expect(usadas.filter((c) => !traduzidas.includes(c))).toEqual([]);
  });

  it('e não carrega tradução para categoria que não existe mais', () => {
    const certs = new Set<string>(site.certificates.map((c) => c.category));
    const skills = new Set<string>(site.skills.map((g) => g.category));

    expect(Object.keys(dicts.en.certs.categories).filter((c) => !certs.has(c))).toEqual([]);
    expect(Object.keys(dicts.en.skills.categories).filter((c) => !skills.has(c))).toEqual([]);
  });
});
