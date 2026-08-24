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

export type CaseStudySlug = 'buscador-de-cv' | 'praca-araguaia' | 'controle-financeiro';

/** Texto que muda com o idioma. */
type Localized = Record<Locale, string>;

/**
 * Print do sistema no ar. O arquivo mora em `/public/projetos/<slug>.webp` e as
 * dimensões são declaradas aqui porque o `next/image` precisa delas para
 * reservar o espaço antes de baixar a imagem — sem isso a seção salta quando
 * cada print carrega.
 */
export type CaseStudyShot = {
  src: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  repo: string;
  demo: string | null;
  /** Tecnologias — nomes próprios, iguais nos dois idiomas. */
  stack: readonly string[];
  shot: CaseStudyShot;
  name: Localized;
  /** Uma linha para o card e para a meta description da página do projeto. */
  summary: Localized;
  context: Localized;
  solution: Localized;
  takeaway: Localized;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'buscador-de-cv',
    repo: 'https://github.com/cielioqueiroz/buscador-de-cv',
    demo: 'https://vaga-certa-sooty.vercel.app',
    stack: ['Next.js 15', 'TypeScript', 'Gemini', 'Zod', 'Tailwind CSS', 'Vitest', 'Vercel'],
    shot: { src: '/projetos/buscador-de-cv.webp', width: 1400, height: 875 },
    name: {
      pt: 'Vaga Certa',
      en: 'Vaga Certa',
    },
    summary: {
      pt: 'Envie o currículo e a IA devolve vagas reais no Brasil com nota de 0 a 100, os motivos do match e o link oficial de candidatura.',
      en: 'Upload your résumé and the AI returns real job openings in Brazil scored 0 to 100, with the reasons behind each match and the official application link.',
    },
    context: {
      pt: 'Procurar vaga é ler dezenas de anúncios para descobrir que quase nenhum combina. O filtro é manual, repetitivo e cansa muito antes de dar resultado — e quem está em transição de carreira é justamente quem menos consegue avaliar sozinho se o próprio perfil serve.',
      en: 'Job hunting means reading dozens of listings to find out almost none fit. The filtering is manual, repetitive and exhausting long before it pays off — and career changers are exactly the people least able to judge on their own whether their profile fits.',
    },
    solution: {
      pt: 'A IA lê o currículo e extrai cargo, senioridade e habilidades; três fontes públicas são consultadas em paralelo e cada vaga volta com nota, os pontos a favor e o que falta no perfil. A resposta do modelo é validada contra um schema antes de virar tela — sem cadastro, sem guardar o CV.',
      en: 'The AI reads the résumé and extracts role, seniority and skills; three public sources are queried in parallel and every opening comes back with a score, the points in favour and what the profile is missing. The model output is validated against a schema before it reaches the screen — no sign-up, no résumé stored.',
    },
    takeaway: {
      pt: 'Resposta de LLM só vira produto com formato garantido: schema na saída, validação antes de renderizar — e a nota tem que explicar por que é aquela nota.',
      en: 'An LLM answer only becomes a product when its shape is guaranteed: schema on the output, validation before rendering — and the score has to explain itself.',
    },
  },
  {
    slug: 'praca-araguaia',
    repo: 'https://github.com/cielioqueiroz/praca-araguaia',
    demo: 'https://agroapp-bay.vercel.app',
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel Cron', 'Tailwind CSS'],
    shot: { src: '/projetos/praca-araguaia.webp', width: 1400, height: 632 },
    name: {
      pt: 'Praça Araguaia',
      en: 'Praça Araguaia',
    },
    summary: {
      pt: 'Cotações diárias do agro no Vale do Araguaia — boi, grão e câmbio — coletadas sozinhas e resumidas no Termômetro da Praça.',
      en: 'Daily agricultural prices for the Araguaia valley — cattle, grain and currency — collected automatically and summed up in a single market thermometer.',
    },
    context: {
      pt: 'No sul do Pará o produtor decide venda com preço que chega por WhatsApp e conversa de praça. A informação existe e é pública, mas está espalhada em fontes que não falam a língua de quem está na lida — e chega tarde para quem precisa fechar negócio hoje.',
      en: 'In southern Pará, ranchers decide when to sell based on prices that arrive by WhatsApp and word of mouth. The information exists and is public, but it is scattered across sources that do not speak the language of the people working the land — and it arrives too late for anyone closing a deal today.',
    },
    solution: {
      pt: 'Doze cotações coletadas por rotina agendada, guardadas em Postgres e publicadas com revalidação — mais boletim diário, previsão de chuva e o Termômetro da Praça, que traduz o conjunto em uma leitura só: a praça está aquecida ou parada.',
      en: 'Twelve price feeds gathered by a scheduled job, stored in Postgres and published with revalidation — plus a daily bulletin, rainfall forecast and the market thermometer, which turns the whole set into a single reading: is the market hot or flat.',
    },
    takeaway: {
      pt: 'A parte difícil não foi coletar o dado, foi decidir o que mostrar. Informação que não chega na linguagem de quem decide não é informação, é arquivo.',
      en: 'Gathering the data was not the hard part — deciding what to show was. Information that does not reach the decision-maker in their own language is not information, it is an archive.',
    },
  },
  {
    slug: 'controle-financeiro',
    repo: 'https://github.com/cielioqueiroz/controle-financeiro',
    demo: 'https://capital-financeiro.vercel.app',
    stack: ['React 19', 'TypeScript', 'Vite', 'Neon', 'PostgreSQL', 'Tailwind CSS'],
    shot: { src: '/projetos/controle-financeiro.webp', width: 1400, height: 582 },
    name: {
      pt: 'Capital Financeiro',
      en: 'Capital Financeiro',
    },
    summary: {
      pt: 'Importe a fatura ou o extrato em PDF e veja para onde o dinheiro foi — leitura no navegador, categorização automática e gráficos por competência.',
      en: 'Import a bank statement or card bill as PDF and see where the money went — parsed in the browser, categorised automatically and charted by billing period.',
    },
    context: {
      pt: 'São quinze anos fazendo a mesma conciliação à mão: transformar PDF em linha, linha em categoria, categoria em decisão. O trabalho nunca muda, só o mês — e o erro de digitação só aparece quando o total não fecha, se alguém conferir.',
      en: 'Fifteen years doing the same reconciliation by hand: turn PDF into rows, rows into categories, categories into a decision. The work never changes, only the month — and a typo only surfaces when the total refuses to add up, if anyone checks.',
    },
    solution: {
      pt: 'O PDF é lido dentro do navegador e não sai da máquina. O app extrai os lançamentos e confere a soma contra o total impresso no próprio documento antes de guardar qualquer coisa; só então categoriza, separa por competência e desenha os gráficos.',
      en: 'The PDF is parsed inside the browser and never leaves the machine. The app extracts the entries and checks their sum against the total printed on the document itself before storing anything; only then does it categorise, split by billing period and draw the charts.',
    },
    takeaway: {
      pt: 'Conferir contra o gabarito do próprio documento. Importador que não fecha com o total impresso não falha — ele mente com confiança, e o erro só aparece meses depois.',
      en: 'Check against the answer key printed on the document. An importer that does not match the stated total does not fail loudly — it lies confidently, and the error surfaces months later.',
    },
  },
];

/** Achata um caso para um único idioma — o formato que os componentes consomem. */
export type ResolvedCaseStudy = {
  slug: CaseStudySlug;
  repo: string;
  demo: string | null;
  stack: readonly string[];
  shot: CaseStudyShot;
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
    shot: cs.shot,
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
