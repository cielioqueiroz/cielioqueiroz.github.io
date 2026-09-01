import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
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

describe('o print de cada caso', () => {
  /**
   * Lê largura e altura direto do cabeçalho do WebP, sem dependência nova.
   * Layout de um WebP com compressão lossy:
   *   0..3  "RIFF"   8..11 "WEBP"   12..15 "VP8 "
   *   23..25 start code 9d 01 2a
   *   26..27 largura e 28..29 altura — 14 bits, little-endian.
   */
  const dimensoes = (buf: Buffer) => {
    expect(buf.subarray(0, 4).toString('ascii')).toBe('RIFF');
    expect(buf.subarray(8, 12).toString('ascii')).toBe('WEBP');
    expect(buf.subarray(12, 16).toString('ascii')).toBe('VP8 ');
    expect(buf.subarray(23, 26).toString('hex')).toBe('9d012a');
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  };

  const arquivo = (cs: CaseStudy) => path.join(process.cwd(), 'public', cs.shot.src);

  it.each(caseStudies.map((cs) => [cs.slug, cs] as const))('%s tem o arquivo no lugar', (_slug, cs) => {
    expect(existsSync(arquivo(cs))).toBe(true);
  });

  it.each(caseStudies.map((cs) => [cs.slug, cs] as const))(
    '%s declara as dimensões reais do arquivo',
    (_slug, cs) => {
      // Dimensão errada aqui não quebra nada visível no build: só faz a seção
      // saltar quando a imagem termina de carregar, no navegador de quem lê.
      expect(dimensoes(readFileSync(arquivo(cs)))).toEqual({
        width: cs.shot.width,
        height: cs.shot.height,
      });
    }
  );

  it('o caminho do print segue o slug', () => {
    for (const cs of caseStudies) {
      expect(cs.shot.src).toBe(`/projetos/${cs.slug}.webp`);
    }
  });

  it('nenhum print passa de 120 kB', () => {
    // São cinco imagens acima da dobra da § 03; juntas elas não podem custar
    // mais que o próprio JavaScript do site.
    for (const cs of caseStudies) {
      const kb = readFileSync(arquivo(cs)).length / 1024;
      expect(kb, `${cs.slug}: ${kb.toFixed(0)} kB`).toBeLessThanOrEqual(120);
    }
  });
});
