/**
 * Dicionário PT/EN — fonte única de texto de interface.
 *
 * A rota `/` renderiza com `pt`; a rota `/en` renderiza com `en`.
 * Componentes de seção recebem `locale` (default 'pt') e leem daqui.
 * Dados factuais (experiência, certificados, números) continuam em
 * config/site.ts; aqui mora só o que muda com o idioma.
 */

export type Locale = 'pt' | 'en';

export type LedeSegment = { text: string; em?: boolean };

export type CaseStudy = {
  name: string;
  repo: string;
  demo: string | null;
  context: string;
  solution: string;
  stack: string[];
  takeaway: string;
};

const pt = {
  htmlLang: 'pt-BR',
  numberLocale: 'pt-BR',

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
    langHref: '/en/',
    langAria: 'Read this site in English',
  },

  hero: {
    kicker: '§ 01 — Apresentação',
    aboutCover: 'Sobre a capa',
    coverText:
      'Administrador formado, dev em formação. Construo interfaces e transformo planilhas em decisões.',
    portrait: 'Retrato',
    portraitNo: 'nº 01 / 2026',
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
    caseStudies: [
      {
        name: 'Gabarito AI',
        repo: 'https://github.com/cielioqueiroz/gabarito_AI',
        demo: 'https://gabarito-lyart.vercel.app',
        context:
          'Estudar para concurso público exige transformar um edital de dezenas de páginas em um plano de estudos executável — trabalho manual, repetitivo e fácil de abandonar.',
        solution:
          'Console de estudos com IA: o usuário sobe o edital em PDF e o app gera plano de estudos, flashcards com repetição espaçada (método Leitner) e questões comentadas usando o Claude, com autenticação e persistência no Supabase.',
        stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Claude API', 'Vercel'],
        takeaway:
          'IA em produção de verdade: prompts estruturados, custo por requisição e estados de carregamento honestos.',
      },
      {
        name: 'Calculadora de Investimentos',
        repo: 'https://github.com/cielioqueiroz/calculadora-investimentos',
        demo: 'https://cielioqueiroz.github.io/calculadora-investimentos/',
        context:
          'Quinze anos lidando com fluxo de caixa me ensinaram que juros compostos decidem qualquer plano — mas a maioria das calculadoras esconde as premissas do cálculo.',
        solution:
          'Simulador brasileiro de investimentos: juros compostos com aportes mensais, comparador de produtos, planejador de metas e cotações em tempo real (B3, cripto e câmbio) — tudo no navegador, sem backend.',
        stack: ['React', 'TypeScript', 'Vite'],
        takeaway:
          'Precisão numérica em JavaScript, consumo de APIs públicas e arquitetura front-end sem servidor.',
      },
      {
        name: 'Este portfólio',
        repo: 'https://github.com/cielioqueiroz/cielioqueiroz.github.io',
        demo: null,
        context:
          'Um dev em transição de carreira precisa provar competência sem histórico de empregos na área — então o próprio site vira o argumento técnico.',
        solution:
          'One-page estático em Next.js com tema de fonte única (um arquivo controla site, banner OG e manifest), CV em PDF gerado no navegador, vitrine de repositórios ao vivo via GitHub API, versão PT/EN e cena 3D em three.js.',
        stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'three.js', '@react-pdf/renderer'],
        takeaway:
          'Performance como requisito (LCP, bundle, reduced-motion) e acessibilidade AA de ponta a ponta.',
      },
    ] as CaseStudy[],
    archiveTitle: 'Arquivo ao vivo',
    archiveDesc: 'Lista atualizada em tempo real via ',
    archiveDescAfter: '. Fixados (pinned) primeiro, depois por data de push.',
    updated: 'Atualizado',
    refreshAria: 'Atualizar lista',
    errorPrefix: 'Não foi possível consultar a GitHub API agora',
    errorRetry: 'recarregar',
    errorOr: 'ou visite o',
    errorProfile: 'perfil no GitHub',
    empty: 'Nenhum projeto público no momento. Visite o',
    showing: (shown: number, total: number) =>
      `Exibindo ${shown} de ${total} repositórios públicos · dados via GitHub API`,
    viewAll: 'Ver tudo no GitHub',
    pinned: '◆ fixado',
    liveDemo: '◆ Demo ao vivo',
    cursorDemo: 'ver demo',
    cursorCode: 'ver código',
    timeAgo: {
      now: 'agora mesmo',
      s: (n: number) => `há ${n}s`,
      m: (n: number) => `há ${n} min`,
      h: (n: number) => `há ${n}h`,
    },
  },

  skills: {
    marker: '§ 04',
    headingA: 'Ferramentas',
    headingB: 'ofício.',
    index: (n: number) => `Índice · ${n} itens`,
    tech: (n: number) => `${n} tecnologias`,
    inUse: '◆ em uso',
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
    thAH: 'AH % (YoY)',
    swipeHint: '← Deslize para ver mais →',
    dreFootnote:
      'Fonte: planilha modelo · dados ilustrativos · AV (vertical) e AH (horizontal/YoY) calculados sobre receita bruta.',
    rowLabels: {} as Record<string, string>,
    kpiLabels: {} as Record<string, string>,
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
    months: {} as Record<string, string>,
    statuses: {} as Record<string, string>,
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
    langHref: '/',
    langAria: 'Ler este site em português',
  },

  hero: {
    kicker: '§ 01 — Introduction',
    aboutCover: 'About the cover',
    coverText:
      'Trained administrator, developer in the making. I build interfaces and turn spreadsheets into decisions.',
    portrait: 'Portrait',
    portraitNo: 'no. 01 / 2026',
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
    caseStudies: [
      {
        name: 'Gabarito AI',
        repo: 'https://github.com/cielioqueiroz/gabarito_AI',
        demo: 'https://gabarito-lyart.vercel.app',
        context:
          'Studying for Brazilian civil-service exams means turning a dense, dozens-of-pages syllabus into an actionable study plan — manual, repetitive work that is easy to abandon.',
        solution:
          'An AI study console: upload the official syllabus as a PDF and the app generates a study plan, spaced-repetition flashcards (Leitner method) and annotated practice questions using Claude, with auth and persistence on Supabase.',
        stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Claude API', 'Vercel'],
        takeaway:
          'Real production AI: structured prompts, per-request cost awareness and honest loading states.',
      },
      {
        name: 'Investment Calculator',
        repo: 'https://github.com/cielioqueiroz/calculadora-investimentos',
        demo: 'https://cielioqueiroz.github.io/calculadora-investimentos/',
        context:
          'Fifteen years of cash-flow management taught me that compound interest decides every plan — yet most calculators hide the assumptions behind the math.',
        solution:
          'A Brazilian investment simulator: compound interest with monthly contributions, product comparison, goal planning and real-time market data (B3, crypto, FX) — all in the browser, no backend.',
        stack: ['React', 'TypeScript', 'Vite'],
        takeaway:
          'Numeric precision in JavaScript, public API consumption and a serverless front-end architecture.',
      },
      {
        name: 'This portfolio',
        repo: 'https://github.com/cielioqueiroz/cielioqueiroz.github.io',
        demo: null,
        context:
          'A career-changing developer needs to prove competence without industry job history — so the site itself becomes the technical argument.',
        solution:
          'A static Next.js one-pager with a single-source theme (one file drives the site, OG banner and manifest), a PDF résumé generated in the browser, a live repository showcase via the GitHub API, a PT/EN version and a three.js 3D scene.',
        stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'three.js', '@react-pdf/renderer'],
        takeaway:
          'Performance as a requirement (LCP, bundle, reduced-motion) and end-to-end AA accessibility.',
      },
    ] as CaseStudy[],
    archiveTitle: 'Live archive',
    archiveDesc: 'List updated in real time via the ',
    archiveDescAfter: '. Pinned first, then by push date.',
    updated: 'Updated',
    refreshAria: 'Refresh list',
    errorPrefix: 'Could not reach the GitHub API right now',
    errorRetry: 'retry',
    errorOr: 'or visit the',
    errorProfile: 'GitHub profile',
    empty: 'No public projects at the moment. Visit the',
    showing: (shown: number, total: number) =>
      `Showing ${shown} of ${total} public repositories · data via GitHub API`,
    viewAll: 'View all on GitHub',
    pinned: '◆ pinned',
    liveDemo: '◆ Live demo',
    cursorDemo: 'view demo',
    cursorCode: 'view code',
    timeAgo: {
      now: 'just now',
      s: (n: number) => `${n}s ago`,
      m: (n: number) => `${n} min ago`,
      h: (n: number) => `${n}h ago`,
    },
  },

  skills: {
    marker: '§ 04',
    headingA: 'Tools',
    headingB: 'craft.',
    index: (n: number) => `Index · ${n} items`,
    tech: (n: number) => `${n} technologies`,
    inUse: '◆ in use',
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
    thAH: 'YoY %',
    swipeHint: '← Swipe to see more →',
    dreFootnote:
      'Source: model spreadsheet · illustrative data · vertical and YoY analysis calculated over gross revenue.',
    rowLabels: {
      'Receita Bruta de Vendas': 'Gross Sales Revenue',
      '(–) Deduções e Impostos': '(–) Deductions & Taxes',
      'Receita Líquida': 'Net Revenue',
      '(–) Custo dos Produtos Vendidos': '(–) Cost of Goods Sold',
      'Lucro Bruto': 'Gross Profit',
      '(–) Despesas Operacionais': '(–) Operating Expenses',
      'EBITDA': 'EBITDA',
      '(–) Depreciação e Amortização': '(–) Depreciation & Amortization',
      'EBIT': 'EBIT',
      'Resultado Financeiro': 'Financial Result',
      '(–) IR e CSLL': '(–) Income Taxes',
      'Lucro Líquido do Exercício': 'Net Income',
    },
    kpiLabels: {
      'Margem Bruta': 'Gross margin',
      'Margem EBITDA': 'EBITDA margin',
      'Margem Líquida': 'Net margin',
      'YoY Receita': 'Revenue YoY',
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
      'Janeiro': 'January',
      'Fevereiro': 'February',
      'Março': 'March',
      'Abril': 'April',
      'Maio': 'May',
      'Junho': 'June',
    },
    statuses: {
      'positivo': 'positive',
      'atenção': 'watch',
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
