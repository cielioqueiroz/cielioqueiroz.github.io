import { describe, expect, it } from 'vitest';
import { contrastRatio, parseColor, wcagLevel } from './contrast';
import { palette } from '@/config/theme';

describe('parseColor', () => {
  it('lê hex de 6 e de 3 dígitos', () => {
    expect(parseColor('#ffffff')).toEqual([255, 255, 255]);
    expect(parseColor('#000')).toEqual([0, 0, 0]);
  });

  it('lê rgb e rgba', () => {
    expect(parseColor('rgb(18, 52, 86)')).toEqual([18, 52, 86]);
    expect(parseColor('rgba(255,255,255,1)')).toEqual([255, 255, 255]);
  });

  it('compõe a cor translúcida sobre o fundo informado', () => {
    // Branco a 50% sobre preto resulta no cinza médio.
    expect(parseColor('rgba(255,255,255,0.5)', [0, 0, 0])).toEqual([127.5, 127.5, 127.5]);
  });

  it('sem fundo, devolve o canal cru da cor translúcida', () => {
    expect(parseColor('rgba(255,255,255,0.5)')).toEqual([255, 255, 255]);
  });

  it('recusa o que não sabe ler, em vez de devolver preto silenciosamente', () => {
    expect(() => parseColor('cor-inventada')).toThrow();
  });
});

describe('contrastRatio', () => {
  it('dá 21 entre preto e branco, o extremo da escala', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('dá 1 entre a cor e ela mesma', () => {
    expect(contrastRatio('#3F3F44', '#3F3F44')).toBeCloseTo(1, 5);
  });

  it('não depende da ordem dos argumentos', () => {
    expect(contrastRatio('#131315', '#F4F4F3')).toBeCloseTo(
      contrastRatio('#F4F4F3', '#131315'),
      5,
    );
  });
});

describe('wcagLevel', () => {
  it('classifica pelos patamares da norma', () => {
    expect(wcagLevel(21)).toBe('AAA');
    expect(wcagLevel(7)).toBe('AAA');
    expect(wcagLevel(4.5)).toBe('AA');
    expect(wcagLevel(3)).toBe('AA Grande');
    expect(wcagLevel(2.9)).toBe('Insuficiente');
  });
});

/**
 * O contrato de acessibilidade da paleta, verificado a cada push: se alguém
 * clarear um cinza e o texto deixar de passar no AA, o teste reprova antes de
 * o site ir ao ar.
 */
describe('paleta Fumaça Grafite', () => {
  const TEXT_TOKENS = ['--fg', '--fg-soft', '--fg-muted', '--accent-2', '--danger'] as const;
  const SURFACES = ['--bg', '--bg-deep'] as const;

  for (const theme of ['light', 'dark'] as const) {
    for (const surface of SURFACES) {
      for (const token of TEXT_TOKENS) {
        it(`${theme}: ${token} sobre ${surface} passa no AA`, () => {
          const ratio = contrastRatio(palette[theme][token], palette[theme][surface]);
          expect(ratio).toBeGreaterThanOrEqual(4.5);
        });
      }
    }
  }
});
