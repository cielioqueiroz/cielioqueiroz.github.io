/// <reference types="next" />
/// <reference types="next/image-types/global" />

/**
 * Declaracoes de tipo versionadas.
 *
 * As duas referencias acima tambem vivem em `next-env.d.ts`, mas aquele
 * arquivo e GERADO pelo `next build`/`next dev` e esta no .gitignore. Num
 * clone limpo — que e exatamente o caso do CI — ele nao existe, e o
 * `tsc --noEmit` falhava ao ver `import portrait from '@/public/portrait.webp'`
 * em components/Portrait.tsx.
 *
 * Repetir aqui torna o typecheck independente de artefato de build.
 */

declare module '*.css';
