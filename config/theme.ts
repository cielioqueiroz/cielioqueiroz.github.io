/**
 * FONTE ÚNICA DE COR DO PROJETO — "Obsidian & Champagne".
 *
 * Tudo que tem cor de tema lê daqui:
 *   - app/layout.tsx  → injeta as CSS vars (:root / .dark) e o themeColor
 *   - app/globals.css → usa as vars var(--bg), var(--accent), etc.
 *   - app/opengraph-image.tsx → importa `banner` (paleta do tema claro)
 *
 * Conceito: paleta editorial premium, sem cores vibrantes. O accent é um
 * champanhe quente (#C9A876) — não brilhante, não saturado. Em fundo claro,
 * vira marca-texto/tinta bronze; em fundo escuro (obsidiana), respira como
 * dourado pálido. As superfícies têm gradação curta entre --bg e --bg-deep
 * para sustentar profundidade 3D sem ruído.
 */

export const palette = {
  light: {
    '--bg': '#F4EFE6',
    '--bg-deep': '#ECE5D8',
    '--fg': '#1A1614',
    '--fg-soft': '#3A302C',
    '--fg-muted': '#6E5F54',
    '--rule': 'rgba(26,22,20,0.18)',
    '--accent': '#C9A876',
    '--accent-ink': '#6B5535',
    '--accent-2': '#57432A',
    '--accent-contrast': '#1A1614',
    '--accent-glow': 'rgba(201, 168, 118, 0.45)',
    '--danger': '#8C3A2A',
  },
  dark: {
    '--bg': '#0A0908',
    '--bg-deep': '#14110E',
    '--fg': '#E8DFD0',
    '--fg-soft': '#C7BCA8',
    '--fg-muted': '#93887A',
    '--rule': 'rgba(232,223,208,0.16)',
    '--accent': '#D4B896',
    '--accent-ink': '#D4B896',
    '--accent-2': '#C9A876',
    '--accent-contrast': '#0A0908',
    '--accent-glow': 'rgba(212, 184, 150, 0.30)',
    '--danger': '#C97A65',
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
 * Paleta do banner Open Graph (1200×630). Usa o tema CLARO — creme pérola
 * com tinta obsidiana e accent champanhe. Segue automaticamente `palette.light`.
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
