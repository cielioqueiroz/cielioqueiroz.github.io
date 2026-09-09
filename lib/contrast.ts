/**
 * Contraste WCAG a partir dos tokens do tema.
 *
 * Existe para que a página /estilo mostre a razão calculada, e não um número
 * digitado à mão que envelhece na primeira vez que alguém mexer na paleta.
 */

type RGB = readonly [number, number, number];

/**
 * Aceita `#rrggbb` e `rgba(r,g,b,a)` — os dois formatos que a paleta usa. Uma
 * cor translúcida (as réguas são) precisa do fundo sobre o qual ela aparece:
 * sem compor, o cálculo mede uma cor que ninguém vê.
 */
export function parseColor(input: string, over?: RGB): RGB {
  const value = input.trim();

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ] as const;
  }

  const match = value.match(
    /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+))?\s*\)/,
  );
  if (!match) throw new Error(`Cor não reconhecida: ${input}`);

  const rgb = [Number(match[1]), Number(match[2]), Number(match[3])] as const;
  const alpha = match[4] === undefined ? 1 : Number(match[4]);
  if (alpha >= 1 || !over) return rgb;

  return rgb.map((c, i) => alpha * c + (1 - alpha) * over[i]) as unknown as RGB;
}

/** Luminância relativa, WCAG 2.x. */
export function luminance([r, g, b]: RGB): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Razão de contraste entre duas cores — de 1 (idênticas) a 21 (preto/branco). */
export function contrastRatio(foreground: string, background: string): number {
  const bg = parseColor(background);
  const fg = parseColor(foreground, bg);
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

export type WcagLevel = 'AAA' | 'AA' | 'AA Grande' | 'Insuficiente';

/**
 * Classifica pelo texto normal: 4.5 para AA, 7 para AAA. O patamar de 3.0
 * ("AA Grande") vale para texto a partir de ~24px, e é onde caem os títulos.
 */
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Grande';
  return 'Insuficiente';
}
