import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

/**
 * Configuração do ESLint em flat config.
 *
 * Saímos do `next lint` porque ele foi descontinuado no Next 15.5 e some no
 * 16 — o CI ia quebrar sozinho num upgrade de rotina. Agora o ESLint é
 * chamado direto (`npm run lint`), que é o caminho que continua existindo.
 *
 * O `FlatCompat` está aqui porque o `eslint-config-next` ainda só publica o
 * formato antigo. Ele traduz o preset inteiro — incluindo as regras de
 * jsx-a11y e react-hooks, que são justamente as que importam num site que
 * promete acessibilidade — em vez de eu remontar uma lista parecida à mão e
 * perder cobertura sem perceber.
 */
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'redirect/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals'),
];

export default config;
