/**
 * FONTE ÚNICA DE COR DO PROJETO — "Mono Brutalist".
 *
 * Tudo que tem cor de tema lê daqui:
 *   - app/layout.tsx  → injeta as CSS vars (:root / .dark) e o themeColor
 *   - app/globals.css → usa as vars var(--bg), var(--accent), etc.
 *   - app/opengraph-image.tsx → importa `banner` (paleta do tema claro)
 *
 * REGRA: ao mudar o design, altere SÓ este arquivo. O app, a cor da barra do
 * navegador e o banner de compartilhamento (WhatsApp/redes) seguem juntos no
 * próximo build. A lima é MARCA-TEXTO (fundo/realce), nunca cor de texto em
 * fundo claro — por isso existe --accent-ink (texto) e --accent-contrast
 * (texto sobre a lima).
 */

export const palette = {
  light: {
    '--bg': '#FAFAF8',
    '--bg-deep': '#F0F0EC',
    '--fg': '#0A0A0A',
    '--fg-soft': '#2A2A28',
    '--fg-muted': '#5C5C58',
    '--rule': 'rgba(10,10,10,0.20)',
    '--accent': '#C6F24E',
    '--accent-ink': '#0A0A0A',
    '--accent-2': '#4F6F18',
    '--accent-contrast': '#0A0A0A',
    '--danger': '#B5341C',
  },
  dark: {
    '--bg': '#050505',
    '--bg-deep': '#0E0E0E',
    '--fg': '#EDEDED',
    '--fg-soft': '#C4C4C4',
    '--fg-muted': '#8C8C88',
    '--rule': 'rgba(237,237,237,0.18)',
    '--accent': '#C6F24E',
    '--accent-ink': '#C6F24E',
    '--accent-2': '#B7E84A',
    '--accent-contrast': '#0A0A0A',
    '--danger': '#E0796B',
  },
} as const;

/** Gera o CSS de variáveis injetado no <head> pelo layout. */
export function themeStyleCss(): string {
  const toVars = (o: Record<string, string>) =>
    Object.entries(o)
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
  return `:root{${toVars(palette.light)}}.dark{${toVars(palette.dark)}}`;
}

/** Cor da barra do navegador (PWA / mobile) por esquema. */
export const themeColor = {
  light: palette.light['--bg'],
  dark: palette.dark['--bg'],
} as const;

/**
 * Paleta do banner Open Graph (1200×630). Usa o tema CLARO — branco brutalista
 * com blocos lima e tinta preta. Segue automaticamente `palette.light`.
 */
export const banner = {
  BG: palette.light['--bg'],
  BG_DEEP: palette.light['--bg-deep'],
  FG: palette.light['--fg'],
  FG_SOFT: palette.light['--fg-soft'],
  FG_MUTED: palette.light['--fg-muted'],
  ACCENT: palette.light['--accent'],
  INK_ON_ACCENT: palette.light['--accent-contrast'],
  RULE: palette.light['--fg'],
} as const;
