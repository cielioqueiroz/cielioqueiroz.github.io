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
    title: 'Ciélio Queiroz — Frontend Developer · React, TypeScript, Next.js',
    description:
      'Frontend Developer especializado em React, TypeScript e Next.js, com integração de IA generativa e APIs REST.',
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
      'Frontend Developer. React, TypeScript e Next.js — com IA generativa integrada e 15 anos de negócio como fundação.',
    portrait: 'Retrato',
    portraitNo: 'nº 01 / 2026',
    portraitAlt: (name: string) => `Retrato de ${name}`,
    statusLabel: 'Status',
    statusValue: 'Disponível',
    focusLabel: 'Foco',
    focusValue: 'Frontend / IA',
    langsLabel: 'Idiomas',
    langsValue: 'PT-BR · EN',
    lede: [
      { text: '' },
      { text: 'Frontend Developer', em: true },
      { text: ' — React, TypeScript e Next.js — integrando ' },
      { text: 'IA generativa', em: true },
      { text: ' em produtos que resolvem problemas reais.' },
    ] as LedeSegment[],
    summaryLabel: 'Stack',
    summaryText:
      'React · Next.js · TypeScript · REST APIs · Claude / OpenAI · n8n. Quinze anos de negócio por trás de cada decisão de produto.',
    contact: 'Contato',
    open: 'abrir',
    emailGroupAria: 'Contato por e-mail',
    ticker: [
      '◆ React · Next.js · TypeScript',
      'REST APIs · integração de IA',
      '◆ Claude · OpenAI · n8n',
      '+15 anos de visão de negócio',
      '◆ Pará — Brasil',
      'aprendendo em público',
    ],
  },

  about: {
    marker: '§ 02',
    headingA: 'Sobre',
    headingB: 'mim.',
    expLabel: 'Experiência',
    expText: 'anos de negócio — a bagagem por trás de cada decisão de produto',
    eduLabel: 'Formação',
    eduDegree: 'Administração',
    eduMeta: 'UNOPAR · 2022',
    studyLabel: 'Estuda agora',
    studyItems: ['React / Next.js avançado', 'Integração de IA generativa', 'REST APIs · TypeScript'],
    paragraphs: [
      'Sou Ciélio Queiroz — Frontend Developer focado em React, TypeScript e Next.js, com um diferencial que poucos têm: mais de 15 anos resolvendo problemas reais de negócio antes de escrever a primeira linha de código.',
      'Construo interfaces que vão além do visual — consumo e integro APIs REST, implemento fluxos com IA generativa (Claude, OpenAI, n8n) e entrego experiências que fazem sentido para quem usa. Minha formação em administração me dá clareza sobre o que o produto precisa resolver, não só como ele deve parecer.',
      'Hoje estou focado em oportunidades como Frontend Developer ou React Developer, especialmente em produtos que usam IA para construir algo que realmente importa.',
    ],
    quoteBefore: '“Eu não aprendi a programar para mudar de carreira —',
    quoteHl: ' aprendi para construir o software ',
    quoteAfter: 'que eu sempre quis ter.”',
    quoteAttribution: '— Ciélio Queiroz, 2026',
    chips: ['◇ React', '◇ TypeScript', '◇ Next.js', '◇ REST APIs', '◇ Generative AI', '◇ AI Integration'],
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
    /** Alt do print — descreve o que a imagem mostra, não o arquivo. */
    shotAlt: (name: string) => `${name} em funcionamento`,
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
    failed: 'Não consegui gerar o PDF aqui.',
    failedCta: 'Peça por e-mail',
    failedMailSubject: 'Currículo — Ciélio Queiroz',
  },

  motion: {
    pause: 'Pausar movimento',
    resume: 'Ativar movimento',
  },

  style: {
    navLabel: 'Estilo',
    kicker: 'Sistema de design',
    titleA: 'Fumaça',
    titleB: 'Grafite',
    lede: 'O sistema que sustenta este site: uma paleta acromática, três famílias tipográficas e um punhado de peças que se repetem. Tudo o que está abaixo é lido do código — mudar o token muda esta página.',
    back: 'Voltar à capa',

    colorMarker: '§ 01 — Cor',
    colorTitle: 'Uma cor só, em muitas intensidades',
    colorDesc:
      'Monocromático por decisão, não por falta: os prints dos projetos já são coloridos, e qualquer cor de marca competiria com eles. O vermelho é funcional — marca número negativo — e não faz parte da identidade.',
    tokenHeader: 'Token',
    valueHeader: 'Valor',
    contrastHeader: 'Contraste',
    onSurface: (surface: string) => `sobre ${surface}`,
    contrastNote:
      'Razão calculada em tempo de build a partir da própria paleta, pelo padrão WCAG 2. Texto normal precisa de 4.5; a partir de 24px, 3.0 basta.',
    ruleNote:
      'A régua fica em 1.5 de propósito: é fio decorativo, que a norma isenta. Escurecê-la para passar num teste que não se aplica custaria o desenho.',

    typeMarker: '§ 02 — Tipografia',
    typeTitle: 'Três vozes',
    typeDesc:
      'Uma serifada com itálico de verdade para o que tem voz, uma sem serifa para o que tem função, e uma monoespaçada para o que é dado. A Newsreader é variável: um arquivo cobre de 200 a 800.',
    scaleLabel: 'Escala',
    axisLabel: 'Eixo de peso',
    sampleText: 'Frontend Developer',

    componentMarker: '§ 03 — Peças',
    componentTitle: 'O que se repete',
    componentDesc:
      'Cada peça existe uma vez no CSS e aparece em toda parte. A lista abaixo é a fonte, não uma reprodução dela.',

    motionMarker: '§ 04 — Movimento',
    motionTitle: 'Cenas de rolagem',
    motionDesc:
      'Cinco cenas, marcadas por atributo no HTML. Nenhuma anima opacidade: o conteúdo nasce visível, e se o JavaScript falhar a página fica parada, nunca em branco.',
    motionRespect:
      'Quem pede menos movimento no sistema não recebe nenhuma delas — e o controle no rodapé pausa tudo a qualquer momento.',
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
    title: 'Ciélio Queiroz — Frontend Developer · React, TypeScript, Next.js',
    description:
      'Frontend Developer specialized in React, TypeScript and Next.js, with generative AI integration and REST APIs.',
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
      'Frontend Developer. React, TypeScript and Next.js — with generative AI integrated and 15 years of business as the foundation.',
    portrait: 'Portrait',
    portraitNo: 'no. 01 / 2026',
    portraitAlt: (name: string) => `Portrait of ${name}`,
    statusLabel: 'Status',
    statusValue: 'Available',
    focusLabel: 'Focus',
    focusValue: 'Frontend / AI',
    langsLabel: 'Languages',
    langsValue: 'PT-BR · EN',
    lede: [
      { text: '' },
      { text: 'Frontend Developer', em: true },
      { text: ' — React, TypeScript and Next.js — integrating ' },
      { text: 'generative AI', em: true },
      { text: ' into products that solve real problems.' },
    ] as LedeSegment[],
    summaryLabel: 'Stack',
    summaryText:
      'React · Next.js · TypeScript · REST APIs · Claude / OpenAI · n8n. Fifteen years of business behind every product decision.',
    contact: 'Contact',
    open: 'open',
    emailGroupAria: 'Contact by e-mail',
    ticker: [
      '◆ React · Next.js · TypeScript',
      'REST APIs · AI integration',
      '◆ Claude · OpenAI · n8n',
      '15+ years of business insight',
      '◆ Pará — Brazil',
      'learning in public',
    ],
  },

  about: {
    marker: '§ 02',
    headingA: 'About',
    headingB: 'me.',
    expLabel: 'Experience',
    expText: 'years of business — the background behind every product decision',
    eduLabel: 'Education',
    eduDegree: 'Business Administration',
    eduMeta: 'UNOPAR · 2022',
    studyLabel: 'Currently studying',
    studyItems: ['Advanced React / Next.js', 'Generative AI integration', 'REST APIs · TypeScript'],
    paragraphs: [
      "I'm Ciélio Queiroz — a Frontend Developer focused on React, TypeScript and Next.js, with an edge few people have: 15+ years solving real business problems before writing my first line of code.",
      'I build interfaces that go beyond the visual — I consume and integrate REST APIs, implement generative AI flows (Claude, OpenAI, n8n) and ship experiences that make sense to the people using them. My background in business administration gives me clarity about what a product needs to solve, not just how it should look.',
      "Today I'm focused on Frontend Developer and React Developer opportunities, especially on products using AI to build something that genuinely matters.",
    ],
    quoteBefore: '“I didn’t learn to code to change careers —',
    quoteHl: ' I learned to build the software ',
    quoteAfter: 'I always wanted to have.”',
    quoteAttribution: '— Ciélio Queiroz, 2026',
    chips: ['◇ React', '◇ TypeScript', '◇ Next.js', '◇ REST APIs', '◇ Generative AI', '◇ AI Integration'],
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
    shotAlt: (name: string) => `${name} running`,
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
    failed: 'Could not generate the PDF here.',
    failedCta: 'Ask for it by e-mail',
    failedMailSubject: 'Résumé — Ciélio Queiroz',
  },

  motion: {
    pause: 'Pause motion',
    resume: 'Resume motion',
  },

  style: {
    navLabel: 'Style',
    kicker: 'Design system',
    titleA: 'Graphite',
    titleB: 'Smoke',
    lede: 'The system behind this site: an achromatic palette, three type families and a handful of parts that repeat. Everything below is read from the code — change the token and this page changes.',
    back: 'Back to the cover',

    colorMarker: '§ 01 — Colour',
    colorTitle: 'One colour, many intensities',
    colorDesc:
      'Monochrome by decision, not by omission: the project screenshots are already colourful, and any brand colour would compete with them. The red is functional — it marks negative numbers — and is not part of the identity.',
    tokenHeader: 'Token',
    valueHeader: 'Value',
    contrastHeader: 'Contrast',
    onSurface: (surface: string) => `on ${surface}`,
    contrastNote:
      'Ratio computed at build time from the palette itself, following WCAG 2. Normal text needs 4.5; from 24px up, 3.0 is enough.',
    ruleNote:
      'The rule sits at 1.5 on purpose: it is a decorative hairline, which the standard exempts. Darkening it to pass a test that does not apply would cost the design.',

    typeMarker: '§ 02 — Typography',
    typeTitle: 'Three voices',
    typeDesc:
      'A serif with a true italic for what has a voice, a sans for what has a function, and a mono for what is data. Newsreader is variable: one file covers 200 to 800.',
    scaleLabel: 'Scale',
    axisLabel: 'Weight axis',
    sampleText: 'Frontend Developer',

    componentMarker: '§ 03 — Parts',
    componentTitle: 'What repeats',
    componentDesc:
      'Each part exists once in the CSS and shows up everywhere. The list below is the source, not a reproduction of it.',

    motionMarker: '§ 04 — Motion',
    motionTitle: 'Scroll scenes',
    motionDesc:
      'Five scenes, marked by attribute in the HTML. None animates opacity: content is born visible, and if JavaScript fails the page stays still, never blank.',
    motionRespect:
      'Anyone asking for less motion at the system level gets none of them — and the control in the footer pauses everything at any time.',
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
