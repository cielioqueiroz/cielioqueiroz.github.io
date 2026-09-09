import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Sem paleta de cores aqui de propósito: a cor do site vem das CSS vars
      // geradas por config/theme.ts (`var(--fg)`, `var(--accent)`…), que é a
      // fonte única do tema. As paletas `paper/ink/cream/coal/petrol/danger`
      // que viviam neste arquivo eram restos dos temas anteriores e não eram
      // referenciadas por nenhuma classe — foram removidas.
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      /**
       * O peso faz parte da escala, junto do tamanho — e não repetido inline em
       * cada título. A Newsreader é variável (200–800), então o valor é livre,
       * e cai conforme o tamanho sobe: um traço que parece certo a 16px fica
       * pesado a 120px. É a mesma compensação óptica que o `opsz` faz sozinho
       * no desenho da letra, aplicada agora ao peso.
       */
      fontSize: {
        'display-xl': ['clamp(4rem, 13vw, 11rem)', { lineHeight: '0.88', letterSpacing: '-0.04em', fontWeight: '380' }],
        'display-lg': ['clamp(3rem, 9vw, 7.5rem)', { lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: '420' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '500' }],
      },
      animation: {
        'rise': 'rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'fade': 'fade 1s ease-out both',
        'ticker': 'ticker 38s linear infinite',
        'sweep': 'sweep 1.4s cubic-bezier(0.65, 0, 0.35, 1) both',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sweep: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
