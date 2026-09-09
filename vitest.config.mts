import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Configuração de teste.
 *
 * `environment: 'node'` porque tudo que é testado aqui roda no servidor ou é
 * função pura: o modelo da DRE, o middleware de idioma, os helpers de rota e a
 * integridade do conteúdo. Não há teste de componente — renderizar React
 * exigiria jsdom e uma pilha de dependências para provar o que o build já
 * prova. O que os testes protegem é a REGRA, não o pixel.
 *
 * O alias `@` repete o `paths` do tsconfig porque o Vitest não lê o tsconfig
 * sozinho; sem isso, cada import de `@/lib/...` quebraria no teste.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**'],
  },
});
