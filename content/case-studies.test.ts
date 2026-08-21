import { describe, expect, it } from 'vitest';
import { caseStudies, type CaseStudy } from '@/content/case-studies';
import { LOCALES } from '@/config/i18n';

/**
 * Os estudos de caso já moraram como dois arrays paralelos, acoplados por
 * POSIÇÃO: mexer na ordem de um sem mexer no outro trocava o texto de um
 * projeto pelo de outro — em silêncio, no idioma que ninguém relê.
 *
 * A estrutura mudou (um registro, campos por idioma) e esse acidente ficou
 * impossível. O que ainda é possível é mais banal e igual de constrangedor
 * para quem lê: publicar um caso com o campo inglês vazio, ou repetido em
 * português, ou com um link quebrado num currículo.
 */

const PROSA: (keyof Pick<CaseStudy, 'summary' | 'context' | 'solution' | 'takeaway'>)[] = [
  'summary',
  'context',
  'solution',
  'takeaway',
];

describe('cada estudo de caso está completo nos dois idiomas', () => {
  it.each(caseStudies.map((cs) => [cs.slug, cs] as const))('%s', (_slug, cs) => {
    for (const locale of LOCALES) {
      expect(cs.name[locale].trim()).not.toBe('');
      for (const campo of PROSA) {
        expect(cs[campo][locale].trim(), `${campo} em ${locale}`).not.toBe('');
      }
    }
  });

  it('a prosa em inglês não é o texto português copiado', () => {
    // Nome e stack são nomes próprios e podem coincidir; texto redigido, não.
    const naoTraduzidos = caseStudies.flatMap((cs) =>
      PROSA.filter((campo) => cs[campo].pt === cs[campo].en).map((campo) => `${cs.slug}.${campo}`)
    );

    expect(naoTraduzidos).toEqual([]);
  });

  it('o resumo cabe numa meta description', () => {
    // O resumo vira `description` da página do projeto; acima de ~160
    // caracteres o Google corta no meio da frase.
    for (const cs of caseStudies) {
      for (const locale of LOCALES) {
        expect(cs.summary[locale].length, `${cs.slug} (${locale})`).toBeLessThanOrEqual(175);
      }
    }
  });
});

describe('endereço e identidade do caso', () => {
  it('o slug é único', () => {
    const slugs = caseStudies.map((cs) => cs.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it('o slug é seguro para URL — ele vira /projetos/[slug]', () => {
    for (const cs of caseStudies) {
      expect(cs.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(encodeURIComponent(cs.slug)).toBe(cs.slug);
    }
  });

  it('repositório e demo são URLs https válidas', () => {
    for (const cs of caseStudies) {
      for (const url of [cs.repo, cs.demo].filter(Boolean) as string[]) {
        expect(() => new URL(url), url).not.toThrow();
        expect(new URL(url).protocol).toBe('https:');
      }
    }
  });

  it('toda stack declarada tem pelo menos uma tecnologia, sem repetir', () => {
    for (const cs of caseStudies) {
      expect(cs.stack.length).toBeGreaterThan(0);
      expect(new Set(cs.stack).size).toBe(cs.stack.length);
    }
  });

  it('há pelo menos um caso publicado — a seção § 03 depende disso', () => {
    expect(caseStudies.length).toBeGreaterThan(0);
  });
});
