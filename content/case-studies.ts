import type { Locale } from '@/config/i18n';

/**
 * Estudos de caso — CONTEÚDO do portfólio, não tradução de interface.
 *
 * Antes isto morava dentro de `config/i18n.ts`, duplicado em dois arrays
 * (pt e en) acoplados por posição: mexer na ordem de um sem mexer no outro
 * trocava o texto de um projeto pelo de outro silenciosamente. Aqui cada
 * caso é UM registro; só os campos redigidos variam por idioma.
 *
 * O `slug` é o mesmo nos dois idiomas — a URL do projeto não muda de
 * endereço quando o leitor troca de língua.
 */

export type CaseStudySlug = 'gabarito-ai' | 'calculadora-investimentos' | 'este-portfolio';

/** Texto que muda com o idioma. */
type Localized = Record<Locale, string>;

export type CaseStudy = {
  slug: CaseStudySlug;
  repo: string;
  demo: string | null;
  /** Tecnologias — nomes próprios, iguais nos dois idiomas. */
  stack: readonly string[];
  name: Localized;
  /** Uma linha para o card e para a meta description da página do projeto. */
  summary: Localized;
  context: Localized;
  solution: Localized;
  takeaway: Localized;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'gabarito-ai',
    repo: 'https://github.com/cielioqueiroz/gabarito_AI',
    demo: 'https://gabarito-lyart.vercel.app',
    stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Claude API', 'Vercel'],
    name: {
      pt: 'Gabarito AI',
      en: 'Gabarito AI',
    },
    summary: {
      pt: 'Console de estudos com IA que transforma um edital em PDF em plano de estudos, flashcards e questões comentadas.',
      en: 'An AI study console that turns a PDF exam syllabus into a study plan, flashcards and annotated practice questions.',
    },
    context: {
      pt: 'Estudar para concurso público exige transformar um edital de dezenas de páginas em um plano de estudos executável — trabalho manual, repetitivo e fácil de abandonar.',
      en: 'Studying for Brazilian civil-service exams means turning a dense, dozens-of-pages syllabus into an actionable study plan — manual, repetitive work that is easy to abandon.',
    },
    solution: {
      pt: 'Console de estudos com IA: o usuário sobe o edital em PDF e o app gera plano de estudos, flashcards com repetição espaçada (método Leitner) e questões comentadas usando o Claude, com autenticação e persistência no Supabase.',
      en: 'An AI study console: upload the official syllabus as a PDF and the app generates a study plan, spaced-repetition flashcards (Leitner method) and annotated practice questions using Claude, with auth and persistence on Supabase.',
    },
    takeaway: {
      pt: 'IA em produção de verdade: prompts estruturados, custo por requisição e estados de carregamento honestos.',
      en: 'Real production AI: structured prompts, per-request cost awareness and honest loading states.',
    },
  },
  {
    slug: 'calculadora-investimentos',
    repo: 'https://github.com/cielioqueiroz/calculadora-investimentos',
    demo: 'https://cielioqueiroz.github.io/calculadora-investimentos/',
    stack: ['React', 'TypeScript', 'Vite'],
    name: {
      pt: 'Calculadora de Investimentos',
      en: 'Investment Calculator',
    },
    summary: {
      pt: 'Simulador brasileiro de investimentos com juros compostos, comparador de produtos e cotações em tempo real — sem backend.',
      en: 'A Brazilian investment simulator with compound interest, product comparison and real-time market data — no backend.',
    },
    context: {
      pt: 'Quinze anos lidando com fluxo de caixa me ensinaram que juros compostos decidem qualquer plano — mas a maioria das calculadoras esconde as premissas do cálculo.',
      en: 'Fifteen years of cash-flow management taught me that compound interest decides every plan — yet most calculators hide the assumptions behind the math.',
    },
    solution: {
      pt: 'Simulador brasileiro de investimentos: juros compostos com aportes mensais, comparador de produtos, planejador de metas e cotações em tempo real (B3, cripto e câmbio) — tudo no navegador, sem backend.',
      en: 'A Brazilian investment simulator: compound interest with monthly contributions, product comparison, goal planning and real-time market data (B3, crypto, FX) — all in the browser, no backend.',
    },
    takeaway: {
      pt: 'Precisão numérica em JavaScript, consumo de APIs públicas e arquitetura front-end sem servidor.',
      en: 'Numeric precision in JavaScript, public API consumption and a serverless front-end architecture.',
    },
  },
  {
    slug: 'este-portfolio',
    repo: 'https://github.com/cielioqueiroz/cielioqueiroz.github.io',
    demo: null,
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'three.js', '@react-pdf/renderer'],
    name: {
      pt: 'Este portfólio',
      en: 'This portfolio',
    },
    summary: {
      pt: 'O próprio site como argumento técnico: tema de fonte única, CV em PDF no navegador e vitrine de repositórios ao vivo.',
      en: 'The site itself as the technical argument: single-source theme, in-browser PDF résumé and a live repository showcase.',
    },
    context: {
      pt: 'Um dev em transição de carreira precisa provar competência sem histórico de empregos na área — então o próprio site vira o argumento técnico.',
      en: 'A career-changing developer needs to prove competence without industry job history — so the site itself becomes the technical argument.',
    },
    solution: {
      pt: 'One-page em Next.js com tema de fonte única (um arquivo controla site, banner OG e manifest), CV em PDF gerado no navegador, vitrine de repositórios ao vivo via GitHub API, versão PT/EN e cena 3D em three.js.',
      en: 'A Next.js one-pager with a single-source theme (one file drives the site, OG banner and manifest), a PDF résumé generated in the browser, a live repository showcase via the GitHub API, a PT/EN version and a three.js 3D scene.',
    },
    takeaway: {
      pt: 'Performance como requisito (LCP, bundle, reduced-motion) e acessibilidade AA de ponta a ponta.',
      en: 'Performance as a requirement (LCP, bundle, reduced-motion) and end-to-end AA accessibility.',
    },
  },
];

/** Achata um caso para um único idioma — o formato que os componentes consomem. */
export type ResolvedCaseStudy = {
  slug: CaseStudySlug;
  repo: string;
  demo: string | null;
  stack: readonly string[];
  name: string;
  summary: string;
  context: string;
  solution: string;
  takeaway: string;
};

export function resolveCaseStudy(cs: CaseStudy, locale: Locale): ResolvedCaseStudy {
  return {
    slug: cs.slug,
    repo: cs.repo,
    demo: cs.demo,
    stack: cs.stack,
    name: cs.name[locale],
    summary: cs.summary[locale],
    context: cs.context[locale],
    solution: cs.solution[locale],
    takeaway: cs.takeaway[locale],
  };
}

export function getCaseStudies(locale: Locale): ResolvedCaseStudy[] {
  return caseStudies.map((cs) => resolveCaseStudy(cs, locale));
}

export function getCaseStudy(slug: string, locale: Locale): ResolvedCaseStudy | null {
  const found = caseStudies.find((cs) => cs.slug === slug);
  return found ? resolveCaseStudy(found, locale) : null;
}
