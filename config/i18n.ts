/**
 * Dicionário PT/EN — fonte única de TEXTO DE INTERFACE.
 *
 * O que mora aqui: rótulos, títulos de seção, mensagens de estado.
 * O que NÃO mora aqui:
 *   - dados factuais (experiência, certificados, números) → config/site.ts
 *   - conteúdo do portfólio (estudos de caso)            → content/case-studies.ts
 *
 * Todas as rotas vivem em `app/[locale]`. O português é o padrão e não tem
 * prefixo na URL (o middleware cuida disso), então use `localePath()` para
 * montar qualquer link interno em vez de escrever o caminho na mão.
 */

import { site } from './site';

export const LOCALES = ['pt', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Caminho interno para um idioma. O padrão fica na raiz (`/sobre`), os demais
 * ganham prefixo (`/en/sobre`). `trailingSlash: true` está ligado no
 * next.config, então o retorno sempre termina em barra.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const joined = `${prefix}${clean === '/' ? '/' : clean}`;
  return joined.endsWith('/') ? joined : `${joined}/`;
}

/**
 * Mapa hreflang para um caminho, idêntico em todas as páginas do site.
 * Mora aqui, e não no layout, porque arquivos de rota do App Router só podem
 * exportar os símbolos que o Next reconhece — um helper exportado de
 * `layout.tsx` reprova na validação de tipos das rotas.
 */
export function languageAlternates(path = '/'): Record<string, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l === 'pt' ? 'pt-BR' : l, `${site.url}${localePath(l, path)}`])
  );
}

export type LedeSegment = { text: string; em?: boolean };

const pt = {
  htmlLang: 'pt-BR',
  numberLocale: 'pt-BR',
  skipLink: 'Pular para o conteúdo',

  meta: {
    title: 'Ciélio Queiroz — Desenvolvedor Front-end & Analista de Dados',
    description:
      'Construindo interfaces, automatizando processos e transformando dados em decisão.',
  },

  nav: {
    links: [
      { href: '#sobre', label: 'Sobre', n: '02' },
      { href: '#projetos', label: 'Projetos', n: '03' },
      { href: '#skills', label: 'Skills', n: '04' },
      { href: '#certificados', label: 'Credenciais', n: '05' },
      { href: '#dados', label: 'Dados', n: '06' },
    ],
    edition: '· Edição 2026',
    indexTitle: 'Índice da edição',
    meets: 'Encontros',
    contact: 'Contato',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    themeToggleDark: 'Mudar pra tema escuro',
    themeToggleLight: 'Mudar pra tema claro',
    langLabel: 'EN',
    langAria: 'Read this site in English',
  },

  hero: {
    kicker: '§ 01 — Apresentação',
    aboutCover: 'Sobre a capa',
    coverText:
      'Administrador formado, dev em formação. Construo interfaces e transformo planilhas em decisões.',
    portrait: 'Retrato',
    portraitNo: 'nº 01 / 2026',
    portraitAlt: (name: string) => `Retrato de ${name}`,
    statusLabel: 'Status',
    statusValue: 'Disponível',
    focusLabel: 'Foco',
    focusValue: 'Frontend / Dados',
    langsLabel: 'Idiomas',
    langsValue: 'PT-BR · EN',
    lede: [
      { text: 'Desenvolvedor ' },
      { text: 'front-end', em: true },
      { text: ' e entusiasta de ' },
      { text: 'dados', em: true },
      { text: ' — escrevendo software depois de mais de quinze anos traduzindo números em planilhas.' },
    ] as LedeSegment[],
    summaryLabel: 'Resumo',
    summaryText:
      'React, Next.js, TypeScript · Power BI, SQL, Python · Automação com n8n. Aprendizado em loop desde 2024.',
    /** Os quatro números da DRE que sobem para a capa — a tese do site, provada antes de ser afirmada. */
    kpisLabel: 'Modelo em números',
    kpis: {
      gross: 'Margem bruta',
      ebitda: 'Margem EBITDA',
      net: 'Margem líquida',
      yoy: 'Receita a/a',
    },
    kpisNote: 'Cenário-base da § 06 — recalculável no site',
    contact: 'Contato',
    open: 'abrir',
    emailGroupAria: 'Contato por e-mail',
    ticker: [
      '◆ React · Next.js · TypeScript',
      '+15 anos · admin financeiro',
      '◆ Power BI · SQL Server · Excel',
      'n8n · ChatGPT · Power Apps',
      '◆ Pará — Brasil',
      'aprendendo em público',
    ],
  },

  about: {
    marker: '§ 02',
    headingA: 'Sobre',
    headingB: 'mim.',
    expLabel: 'Experiência',
    expText: 'anos em gestão administrativa & financeira',
    eduLabel: 'Formação',
    eduDegree: 'Administração',
    eduMeta: 'UNOPAR · 2022',
    studyLabel: 'Estuda agora',
    studyItems: ['Next.js / App Router', 'TypeScript avançado', 'Engenharia de dados'],
    paragraphs: [
      'Sou Jaciélio (Ciélio) Queiroz — administrador de formação com mais de 15 anos em gestão administrativa e financeira, agora mergulhando em desenvolvimento web e ciência de dados.',
      'Minha trajetória uniu contas a pagar/receber, fluxo de caixa e controle fiscal a projetos que tocaram React, Power BI, SQL e automação com n8n — sempre buscando otimizar processos e gerar resultado.',
      'Hoje crio interfaces modernas com React/Next.js e dashboards analíticos, conectando minha visão de negócio à capacidade de construir software que resolve problemas reais.',
    ],
    quoteBefore: '“Cada planilha que automatizei me ensinou',
    quoteHl: ' que código bom é, no fim, ',
    quoteAfter: 'gente economizando tempo.”',
    quoteAttribution: '— Ciélio Queiroz, 2026',
    chips: ['◇ Frontend', '◇ Análise de dados', '◇ Automação', '◇ Gestão', '◇ Aprendizado contínuo'],
  },

  projects: {
    marker: '§ 03',
    headingA: 'Projetos',
    headingB: 'selecionados',
    caseLabel: 'Caso',
    contextLabel: 'Contexto',
    solutionLabel: 'O que construí',
    stackLabel: 'Stack',
    takeawayLabel: 'Aprendizado',
    codeBtn: 'Código',
    demoBtn: 'Demo ao vivo',
    readCase: 'Ler o caso',
    archiveTitle: 'Arquivo ao vivo',
    archiveDesc: 'Lista sincronizada de hora em hora via ',
    archiveDescAfter: '. Fixados (pinned) primeiro, depois por data de push.',
    updated: 'Atualizado em',
    errorPrefix: 'Não foi possível consultar a GitHub API agora.',
    errorOr: 'Visite o',
    errorProfile: 'perfil no GitHub',
    empty: 'Nenhum projeto público no momento. Visite o',
    showing: (shown: number, total: number) =>
      `Exibindo ${shown} de ${total} repositórios públicos · dados via GitHub API`,
    viewAll: 'Ver tudo no GitHub',
    pinned: '◆ fixado',
    liveDemo: '◆ Demo ao vivo',
    /** Descrição de fallback para repositório sem `description` no GitHub. */
    repoFallback: (name: string) => `Projeto: ${name}`,
  },

  /** Página de detalhe de um estudo de caso — /projetos/[slug]. */
  projectPage: {
    back: 'Todos os projetos',
    kicker: 'Estudo de caso',
    contextLabel: 'O problema',
    solutionLabel: 'O que construí',
    stackLabel: 'Stack',
    takeawayLabel: 'O que aprendi',
    linksLabel: 'Links',
    repoBtn: 'Ver o código',
    demoBtn: 'Abrir demo',
    nextLabel: 'Próximo caso',
    notFoundTitle: 'Projeto não encontrado',
    notFoundText: 'Esse estudo de caso não existe (ou mudou de endereço).',
    notFoundCta: 'Voltar para os projetos',
    metaSuffix: 'Estudo de caso',
  },

  skills: {
    marker: '§ 04',
    headingA: 'Ferramentas',
    headingB: 'ofício.',
    index: (n: number) => `Índice · ${n} itens`,
    tech: (n: number) => `${n} tecnologias`,
    categories: {} as Record<string, string>,
  },

  certs: {
    marker: '§ 05',
    headingA: 'Credenciais',
    headingB: 'formação.',
    archive: (n: number) => `Arquivo · ${String(n).padStart(2, '0')} certificados`,
    degreeLabel: 'Diploma de graduação',
    degreeName: 'Bacharelado em Administração',
    degreeMeta: 'UNOPAR · 2022',
    filterAria: 'Filtrar certificados por categoria',
    all: 'Todos',
    count: (n: number) => `${n} certificados`,
    categories: {} as Record<string, string>,
    footnote: null as string | null,
  },

  data: {
    marker: '§ 06',
    headingA: 'Planilhas',
    headingB: 'vivas',
    desc: 'Modelos financeiros que produzo em Excel — recriados aqui em HTML editorial. Dados ilustrativos.',
    case01: 'Caso 01 · DRE empresarial',
    case02: 'Caso 02 · Fluxo familiar',
    dreTitle: 'DRE — Nexus Corporação S.A.',
    drePeriod: 'Exercício 2024',
    thAccount: 'Conta',
    thAmount: 'Valor (R$)',
    thAV: 'AV %',
    thDelta: 'Δ cenário',
    swipeHint: '← Deslize para ver mais →',
    dreFootnote:
      'Fonte: planilha modelo · dados ilustrativos · AV (vertical) calculada sobre a receita bruta.',
    scenarioLabel: 'Cenário de receita',
    scenarioHint:
      'Arraste para simular. Deduções e CPV acompanham a receita; despesas operacionais, depreciação e resultado financeiro são fixos — é essa combinação que gera alavancagem operacional.',
    scenarioBase: 'Cenário-base',
    scenarioReset: 'Voltar ao base',
    scenarioVsBase: 'vs. base',
    rowLabels: {
      grossRevenue: 'Receita Bruta de Vendas',
      deductions: '(–) Deduções e Impostos',
      netRevenue: 'Receita Líquida',
      cogs: '(–) Custo dos Produtos Vendidos',
      grossProfit: 'Lucro Bruto',
      opex: '(–) Despesas Operacionais',
      ebitda: 'EBITDA',
      depreciation: '(–) Depreciação e Amortização',
      ebit: 'EBIT',
      financialResult: 'Resultado Financeiro',
      taxes: '(–) IR e CSLL',
      netIncome: 'Lucro Líquido do Exercício',
    } as Record<string, string>,
    kpiLabels: {
      grossMargin: 'Margem Bruta',
      ebitdaMargin: 'Margem EBITDA',
      netMargin: 'Margem Líquida',
      revenueYoY: 'YoY Receita',
    } as Record<string, string>,
    fluxoTitle: 'Controle Financeiro Familiar',
    fluxoPeriod: 'Janeiro – Junho 2026',
    incomeLabel: 'Receitas',
    expensesLabel: 'Despesas',
    balanceLabel: 'Saldo do período',
    committedLabel: '% comprometido',
    thMonth: 'Mês',
    thIncome: 'Receitas',
    thExpenses: 'Despesas',
    thBalance: 'Saldo',
    thCommitted: 'Comprom.',
    thStatus: 'Status',
    months: {
      jan: 'Janeiro',
      feb: 'Fevereiro',
      mar: 'Março',
      apr: 'Abril',
      may: 'Maio',
      jun: 'Junho',
    } as Record<string, string>,
    statuses: {
      positive: 'positivo',
      watch: 'atenção',
    } as Record<string, string>,
    periodTotal: 'Total do período',
    totalStatus: 'positivo',
    fluxoFootnote:
      'Fonte: planilha “Controle Financeiro Familiar 2026” · construída em Excel · dashboard automático.',
  },

  footer: {
    marker: '§ 07 — Colofão',
    talk: 'Vamos conversar?',
    address: 'Endereço',
    country: 'Brasil',
    meets: 'Encontros',
    emailLabel: 'E-mail',
    cvLabel: 'Currículo',
    cvMeta: 'PDF',
    cvGenerating: 'Gerando…',
    motto: ['Da ', 'planilha', ' ao ', 'protótipo'],
    edition: (year: number) => `Vol. I · Edição ${year}`,
  },

  notFound: {
    section: '§ E404 — Erratas',
    kicker: 'Erro 404',
    titleA: 'Esta edição',
    titleB: 'não foi',
    titleC: 'impressa',
    text: 'A página que você procura saiu da pauta — ou nunca chegou à redação.',
    home: 'Voltar à capa',
    index: 'Índice da edição',
    edition: 'Vol. I · Edição 2026',
    metaTitle: 'Página não encontrada',
  },

  cv: {
    download: 'Baixar CV',
    generating: 'Gerando…',
  },

  copyEmail: {
    copy: 'Copiar',
    copied: 'Copiado',
    ariaCopy: 'Copiar e-mail',
    ariaCopied: 'E-mail copiado',
    srCopied: 'E-mail copiado para a área de transferência',
  },
};

export type Dict = typeof pt;

const en: Dict = {
  htmlLang: 'en',
  numberLocale: 'en-US',
  skipLink: 'Skip to content',

  meta: {
    title: 'Ciélio Queiroz — Front-end Developer & Data Analyst',
    description:
      'Building interfaces, automating processes, and turning data into decisions.',
  },

  nav: {
    links: [
      { href: '#sobre', label: 'About', n: '02' },
      { href: '#projetos', label: 'Projects', n: '03' },
      { href: '#skills', label: 'Skills', n: '04' },
      { href: '#certificados', label: 'Credentials', n: '05' },
      { href: '#dados', label: 'Data', n: '06' },
    ],
    edition: '· 2026 Edition',
    indexTitle: 'Table of contents',
    meets: 'Elsewhere',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    themeToggleDark: 'Switch to dark theme',
    themeToggleLight: 'Switch to light theme',
    langLabel: 'PT',
    langAria: 'Ler este site em português',
  },

  hero: {
    kicker: '§ 01 — Introduction',
    aboutCover: 'About the cover',
    coverText:
      'Trained administrator, developer in the making. I build interfaces and turn spreadsheets into decisions.',
    portrait: 'Portrait',
    portraitNo: 'no. 01 / 2026',
    portraitAlt: (name: string) => `Portrait of ${name}`,
    statusLabel: 'Status',
    statusValue: 'Available',
    focusLabel: 'Focus',
    focusValue: 'Frontend / Data',
    langsLabel: 'Languages',
    langsValue: 'PT-BR · EN',
    lede: [
      { text: 'Front-end ' },
      { text: 'developer', em: true },
      { text: ' and ' },
      { text: 'data', em: true },
      { text: ' enthusiast — writing software after fifteen-plus years translating numbers into spreadsheets.' },
    ] as LedeSegment[],
    summaryLabel: 'Summary',
    summaryText:
      'React, Next.js, TypeScript · Power BI, SQL, Python · Automation with n8n. Learning in public since 2024.',
    kpisLabel: 'The model, in numbers',
    kpis: {
      gross: 'Gross margin',
      ebitda: 'EBITDA margin',
      net: 'Net margin',
      yoy: 'Revenue YoY',
    },
    kpisNote: 'Base scenario from § 06 — recalculable on the site',
    contact: 'Contact',
    open: 'open',
    emailGroupAria: 'Contact by e-mail',
    ticker: [
      '◆ React · Next.js · TypeScript',
      '15+ years · finance & admin',
      '◆ Power BI · SQL Server · Excel',
      'n8n · ChatGPT · Power Apps',
      '◆ Pará — Brazil',
      'learning in public',
    ],
  },

  about: {
    marker: '§ 02',
    headingA: 'About',
    headingB: 'me.',
    expLabel: 'Experience',
    expText: 'years in administrative & financial management',
    eduLabel: 'Education',
    eduDegree: 'Business Administration',
    eduMeta: 'UNOPAR · 2022',
    studyLabel: 'Currently studying',
    studyItems: ['Next.js / App Router', 'Advanced TypeScript', 'Data engineering'],
    paragraphs: [
      "I'm Jaciélio (Ciélio) Queiroz — a business administrator by training with 15+ years in administrative and financial management, now diving into web development and data science.",
      'My path connected accounts payable/receivable, cash flow and tax control to projects involving React, Power BI, SQL and n8n automation — always chasing leaner processes and real results.',
      'Today I build modern interfaces with React/Next.js and analytical dashboards, pairing business insight with the ability to ship software that solves real problems.',
    ],
    quoteBefore: '“Every spreadsheet I automated taught me',
    quoteHl: ' that good code is, in the end, ',
    quoteAfter: 'people saving time.”',
    quoteAttribution: '— Ciélio Queiroz, 2026',
    chips: ['◇ Frontend', '◇ Data analysis', '◇ Automation', '◇ Management', '◇ Continuous learning'],
  },

  projects: {
    marker: '§ 03',
    headingA: 'Selected',
    headingB: 'work',
    caseLabel: 'Case',
    contextLabel: 'Context',
    solutionLabel: 'What I built',
    stackLabel: 'Stack',
    takeawayLabel: 'Takeaway',
    codeBtn: 'Code',
    demoBtn: 'Live demo',
    readCase: 'Read the case',
    archiveTitle: 'Live archive',
    archiveDesc: 'List synced hourly via the ',
    archiveDescAfter: '. Pinned first, then by push date.',
    updated: 'Updated on',
    errorPrefix: 'Could not reach the GitHub API right now.',
    errorOr: 'Visit the',
    errorProfile: 'GitHub profile',
    empty: 'No public projects at the moment. Visit the',
    showing: (shown: number, total: number) =>
      `Showing ${shown} of ${total} public repositories · data via GitHub API`,
    viewAll: 'View all on GitHub',
    pinned: '◆ pinned',
    liveDemo: '◆ Live demo',
    repoFallback: (name: string) => `Project: ${name}`,
  },

  projectPage: {
    back: 'All projects',
    kicker: 'Case study',
    contextLabel: 'The problem',
    solutionLabel: 'What I built',
    stackLabel: 'Stack',
    takeawayLabel: 'What I learned',
    linksLabel: 'Links',
    repoBtn: 'View the code',
    demoBtn: 'Open demo',
    nextLabel: 'Next case',
    notFoundTitle: 'Project not found',
    notFoundText: 'This case study does not exist (or moved somewhere else).',
    notFoundCta: 'Back to projects',
    metaSuffix: 'Case study',
  },

  skills: {
    marker: '§ 04',
    headingA: 'Tools',
    headingB: 'craft.',
    index: (n: number) => `Index · ${n} items`,
    tech: (n: number) => `${n} technologies`,
    categories: {
      'Frontend': 'Frontend',
      'Backend & Linguagens': 'Backend & Languages',
      'Dados & BI': 'Data & BI',
      'Automação & IA': 'Automation & AI',
      'Ferramentas': 'Tooling',
    },
  },

  certs: {
    marker: '§ 05',
    headingA: 'Credentials',
    headingB: 'education.',
    archive: (n: number) => `Archive · ${String(n).padStart(2, '0')} certificates`,
    degreeLabel: 'University degree',
    degreeName: "Bachelor's in Business Administration",
    degreeMeta: 'UNOPAR · 2022',
    filterAria: 'Filter certificates by category',
    all: 'All',
    count: (n: number) => `${n} certificates`,
    categories: {
      'Programação': 'Programming',
      'Dados & BI': 'Data & BI',
      'IA & Automação': 'AI & Automation',
      'Administração': 'Business & Management',
    },
    footnote: 'Certificate titles are kept in their original Portuguese.',
  },

  data: {
    marker: '§ 06',
    headingA: 'Living',
    headingB: 'spreadsheets',
    desc: 'Financial models I build in Excel — recreated here as editorial HTML. Illustrative data.',
    case01: 'Case 01 · Corporate income statement',
    case02: 'Case 02 · Household cash flow',
    dreTitle: 'Income Statement — Nexus Corporação S.A.',
    drePeriod: 'Fiscal year 2024',
    thAccount: 'Account',
    thAmount: 'Amount (R$)',
    thAV: 'Vertical %',
    thDelta: 'Δ scenario',
    swipeHint: '← Swipe to see more →',
    dreFootnote:
      'Source: model spreadsheet · illustrative data · vertical analysis calculated over gross revenue.',
    scenarioLabel: 'Revenue scenario',
    scenarioHint:
      'Drag to simulate. Deductions and COGS follow revenue; operating expenses, depreciation and financial result are fixed — that combination is what produces operating leverage.',
    scenarioBase: 'Base case',
    scenarioReset: 'Reset to base',
    scenarioVsBase: 'vs. base',
    rowLabels: {
      grossRevenue: 'Gross Sales Revenue',
      deductions: '(–) Deductions & Taxes',
      netRevenue: 'Net Revenue',
      cogs: '(–) Cost of Goods Sold',
      grossProfit: 'Gross Profit',
      opex: '(–) Operating Expenses',
      ebitda: 'EBITDA',
      depreciation: '(–) Depreciation & Amortization',
      ebit: 'EBIT',
      financialResult: 'Financial Result',
      taxes: '(–) Income Taxes',
      netIncome: 'Net Income',
    },
    kpiLabels: {
      grossMargin: 'Gross margin',
      ebitdaMargin: 'EBITDA margin',
      netMargin: 'Net margin',
      revenueYoY: 'Revenue YoY',
    },
    fluxoTitle: 'Household Budget Tracker',
    fluxoPeriod: 'January – June 2026',
    incomeLabel: 'Income',
    expensesLabel: 'Expenses',
    balanceLabel: 'Net balance',
    committedLabel: '% committed',
    thMonth: 'Month',
    thIncome: 'Income',
    thExpenses: 'Expenses',
    thBalance: 'Balance',
    thCommitted: 'Committed',
    thStatus: 'Status',
    months: {
      jan: 'January',
      feb: 'February',
      mar: 'March',
      apr: 'April',
      may: 'May',
      jun: 'June',
    },
    statuses: {
      positive: 'positive',
      watch: 'watch',
    },
    periodTotal: 'Period total',
    totalStatus: 'positive',
    fluxoFootnote:
      'Source: “Household Budget 2026” spreadsheet · built in Excel · automated dashboard.',
  },

  footer: {
    marker: '§ 07 — Colophon',
    talk: "Let's talk?",
    address: 'Address',
    country: 'Brazil',
    meets: 'Elsewhere',
    emailLabel: 'E-mail',
    cvLabel: 'Résumé',
    cvMeta: 'PDF · PT-BR',
    cvGenerating: 'Generating…',
    motto: ['From ', 'spreadsheet', ' to ', 'prototype'],
    edition: (year: number) => `Vol. I · ${year} Edition`,
  },

  notFound: {
    section: '§ E404 — Errata',
    kicker: 'Error 404',
    titleA: 'This edition',
    titleB: 'never went',
    titleC: 'to print',
    text: 'The page you are looking for was cut from the issue — or never reached the newsroom.',
    home: 'Back to the cover',
    index: 'Table of contents',
    edition: 'Vol. I · 2026 Edition',
    metaTitle: 'Page not found',
  },

  cv: {
    download: 'Download CV (PT-BR)',
    generating: 'Generating…',
  },

  copyEmail: {
    copy: 'Copy',
    copied: 'Copied',
    ariaCopy: 'Copy e-mail',
    ariaCopied: 'E-mail copied',
    srCopied: 'E-mail copied to clipboard',
  },
};

export const dicts: Record<Locale, Dict> = { pt, en };

export function getDict(locale: Locale = 'pt'): Dict {
  return dicts[locale];
}
