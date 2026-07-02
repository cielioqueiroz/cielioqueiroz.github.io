/**
 * FONTE ÚNICA DE COR DO PROJETO — "Fumaça Grafite".
 *
 * Tudo que tem cor de tema lê daqui:
 *   - app/layout.tsx  → injeta as CSS vars (:root / .dark) e o themeColor
 *   - app/globals.css → usa as vars var(--bg), var(--accent), etc.
 *   - app/opengraph-image.tsx → importa `banner` (paleta do tema ESCURO)
 *   - app/manifest.ts → cores do PWA
 *
 * Conceito: monocromático total. Carvão quase-preto, texto cinza-claro e
 * LUZ BRANCA como único accent — a "fumaça" são os glows brancos difusos
 * (aurora, sombras, spotlight) que já existem no CSS e agora ficam
 * acromáticos. Nenhuma cor compete com os projetos; o vermelho dessaturado
 * de --danger é funcional (números negativos), não identidade.
 * O tema claro é o gêmeo invertido: papel cinza-claro + tinta grafite.
 */

export const palette = {
  light: {
    '--bg': '#F4F4F3',
    '--bg-deep': '#E9E9E7',
    '--fg': '#131315',
    '--fg-soft': '#3F3F44',
    '--fg-muted': '#63636A',
    '--rule': 'rgba(19,19,21,0.18)',
    '--accent': '#131315',
    '--accent-ink': '#000000',
    '--accent-2': '#4C4C52',
    '--accent-contrast': '#F4F4F3',
    '--accent-glow': 'rgba(19,19,21,0.10)',
    '--danger': '#B23B30',
  },
  dark: {
    '--bg': '#0C0C0D',
    '--bg-deep': '#141416',
    '--fg': '#F0F0F0',
    '--fg-soft': '#B5B5B7',
    '--fg-muted': '#8F8F94',
    '--rule': 'rgba(240,240,240,0.16)',
    '--accent': '#FFFFFF',
    '--accent-ink': '#FFFFFF',
    '--accent-2': '#C9C9CE',
    '--accent-contrast': '#0C0C0D',
    '--accent-glow': 'rgba(255,255,255,0.16)',
    '--danger': '#E0847A',
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
 * Paleta do banner Open Graph (1200×630). Usa o tema ESCURO — carvão com
 * fumaça branca, a identidade padrão do site. Segue `palette.dark`.
 */
export const banner = {
  BG: palette.dark['--bg'],
  BG_DEEP: palette.dark['--bg-deep'],
  FG: palette.dark['--fg'],
  FG_SOFT: palette.dark['--fg-soft'],
  FG_MUTED: palette.dark['--fg-muted'],
  ACCENT: palette.dark['--accent'],
  INK_ON_ACCENT: palette.dark['--accent-contrast'],
  RULE: palette.dark['--fg'],
} as const;
