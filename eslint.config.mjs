import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/**
 * Configuração do ESLint em flat config.
 *
 * Saímos do `next lint` porque ele foi descontinuado no Next 15.5 e sumiu no
 * 16 — o CI ia quebrar sozinho num upgrade de rotina. O ESLint é chamado
 * direto (`npm run lint`), que é o caminho que continua existindo.
 *
 * Até o Next 15 o `eslint-config-next` só publicava o formato antigo, e o
 * `FlatCompat` do `@eslint/eslintrc` traduzia o preset. No 16 o preset passou
 * a ser flat nativo, e traduzir uma config já-flat estoura em referência
 * circular — o import direto é o que vale agora, e ainda traz de graça as
 * regras de jsx-a11y e react-hooks, que são as que importam num site que
 * promete acessibilidade.
 */
const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'redirect/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
];

export default config;
