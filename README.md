# Ciélio Queiroz — Portfólio

Site pessoal e portfólio profissional de **Ciélio Queiroz** — desenvolvedor front-end e entusiasta de dados, com mais de 15 anos de experiência em gestão administrativa e financeira agora aplicada ao desenvolvimento de software.

🌐 **Online:** [cielio-portfolio.vercel.app](https://cielio-portfolio.vercel.app)
📍 Santana do Araguaia – PA, Brasil

> `cielioqueiroz.github.io` continua no ar, mas apenas como redirecionamento permanente para o Vercel. O conteúdo em `redirect/` é publicado pelo workflow `pages-redirect.yml`.

---

## Sobre o site

Página única com identidade visual **_Fumaça Grafite_** — monocromático total: carvão quase-preto, texto cinza-claro e luz branca como único accent. Cada seção é numerada (`§ 01`, `§ 02`…), com Rajdhani para display, Karla para corpo e Geist Mono para metadados.

Disponível em **português** (raiz do domínio) e **inglês** (`/en/`).

### Seções

| § | Seção | O que é |
|---|---|---|
| 01 | Apresentação | Capa com retrato, nome, tagline e CTAs sociais |
| 02 | Sobre mim | Trajetória de admin/financeiro para dev, com pull quote |
| 03 | Projetos | Estudos de caso com página própria + arquivo de repositórios do GitHub, abrindo pelos fixados |
| 04 | Skills | Inventário tipográfico de tecnologias agrupadas por área |
| 05 | Credenciais | Diploma e certificados, filtráveis por categoria |
| 06 | Planilhas vivas | DRE com simulador de cenário e fluxo de caixa familiar |
| 07 | Colofão | Contato e créditos editoriais |

---

## Stack técnico

| Camada | Ferramenta |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, renderização no servidor + ISR) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/) + CSS custom properties |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) — light/dark com persistência |
| Tipografia | Rajdhani (display), Karla (corpo), Geist Mono (mono) — via `next/font/google` |
| Ícones | [lucide-react](https://lucide.dev/) (UI) + [react-icons](https://react-icons.github.io/react-icons/) (tecnologias) |
| Dados de projetos | [GitHub REST API](https://docs.github.com/en/rest) — buscada no servidor, revalidada a cada hora |
| CV em PDF | [@react-pdf/renderer](https://react-pdf.org/) — gerado no navegador sob demanda |
| 3D | [three.js](https://threejs.org/) + React Three Fiber — shader de ondas no hero |
| Testes | [Vitest](https://vitest.dev/) — regra de negócio, roteamento e integridade de conteúdo |
| Hospedagem | [Vercel](https://vercel.com/) — deploy automático a cada push em `main` |

### Características técnicas

- **Roteamento i18n sem duplicação** — todas as páginas vivem em `app/[locale]`; o `middleware.ts` mantém o português na raiz (`/`) e prefixa apenas o inglês (`/en/`). O atributo `lang` do `<html>` sai correto já no HTML do servidor.
- **Repositórios renderizados no servidor** com revalidação horária (ISR): aparecem no HTML (indexáveis), sem estado de carregamento e sem gastar a cota da API do visitante. A vitrine abre pelos repositórios fixados no perfil, declarados em `config/site.ts` — sem depender de serviço de terceiro (ver [ADR 0005](./docs/adr/0005-fixados-mantidos-a-mao.md)).
- **Página por estudo de caso** (`/projetos/[slug]`) com metadados, `hreflang` e JSON-LD próprios.
- **DRE interativa** — um slider move a receita entre −30% e +30% e a cascata inteira se recalcula. Despesas operacionais são fixas no modelo, o que torna a alavancagem operacional visível.
- **Orçamento de bundle no CI** — `scripts/check-bundle-budget.mjs` falha o build se o JS compartilhado passar de 115 kB gzipados.
- **90 testes automatizados** rodando antes do build no CI. Cobrem o que o TypeScript não pega: a cascata da DRE fecha e reproduz os números publicados; o middleware não encadeia redirect nem deixa a mesma página responder em duas URLs; nenhuma categoria aparece sem tradução no site em inglês; nenhum estudo de caso vai ao ar com o campo em inglês vazio ou copiado do português.
- **Ondas 3D** via WebGL com shader GLSL — desativadas em hardware fraco (≤ 2 núcleos) e congeladas com `prefers-reduced-motion`.
- **Aurora CSS** — gradiente multi-camada animado em CSS puro, sem WebGL.
- **Revelação ao rolar** via CSS scroll-driven (`animation-timeline: view()`), com fallback e respeito a `prefers-reduced-motion`.
- **Responsivo completo** (320 → 1920px) com menu hamburger mobile e drawer fullscreen.
- **Acessível**: `aria-label`, navegação por teclado, foco visível, skip link localizado, `prefers-reduced-motion` respeitado em todas as animações.

---

## Estrutura do projeto

```
my-portifolio/
├── middleware.ts                Roteamento de idioma (pt na raiz, en com prefixo)
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx           Layout raiz — <html lang>, fontes, tema, metadados
│   │   ├── page.tsx             Composição da home
│   │   ├── not-found.tsx        404 editorial
│   │   ├── providers.tsx        ThemeProvider
│   │   └── projetos/[slug]/     Página de cada estudo de caso
│   ├── icon.svg                 Favicon
│   ├── manifest.ts              PWA manifest (cores vindas de config/theme.ts)
│   ├── opengraph-image.tsx      Banner OG 1200×630 gerado em build
│   ├── robots.ts / sitemap.ts   SEO — sitemap cobre as duas línguas
│   └── twitter-image.tsx
├── components/
│   ├── Navbar.tsx               Masthead + drawer mobile + scrollspy
│   ├── Hero.tsx                 Capa § 01
│   ├── About.tsx                Sobre § 02
│   ├── Projects.tsx             Projetos § 03 (casca)
│   │   └── projects/
│   │       ├── CaseStudyRow.tsx   Resumo de um caso na home
│   │       ├── RepoArchive.tsx    Vitrine do GitHub (server component)
│   │       └── RepoCard.tsx       Card de um repositório
│   ├── Skills.tsx               Skills § 04
│   ├── Certificates.tsx         Credenciais § 05
│   ├── DataShowcase.tsx         Planilhas vivas § 06 (casca)
│   │   └── data/
│   │       ├── DreScenario.tsx    DRE com slider de cenário (client)
│   │       └── CashflowTable.tsx  Fluxo de caixa (server)
│   ├── Footer.tsx               Colofão § 07
│   ├── Portrait.tsx             Retrato via next/image, com priority
│   ├── Hero3DMount.tsx          Loader lazy das ondas 3D
│   ├── Hero3DScene.tsx          Canvas WebGL com shader de ondas
│   ├── AuroraBackdrop.tsx       Gradiente aurora CSS
│   ├── Tilt3D.tsx               Tilt + glare em hover
│   ├── SplitReveal.tsx          Revelação de texto por linha
│   ├── CVDocument.tsx           Documento do CV em PDF
│   ├── SkillIcon.tsx            Mapeamento de ícones de skill
│   └── ThemeToggle.tsx          Toggle light/dark
├── config/
│   ├── site.ts                  Dados pessoais e factuais
│   ├── i18n.ts                  Textos de interface PT/EN + helpers de rota
│   └── theme.ts                 FONTE ÚNICA de cor (app, banner OG, manifest)
├── content/
│   ├── case-studies.ts          Estudos de caso (um registro, campos por idioma)
│   └── financials.ts            Modelo da DRE e do fluxo de caixa
├── lib/
│   ├── github.ts                Acesso à GitHub API (servidor, com cache)
│   └── dre.ts                   Cascata da DRE — função pura
├── styles/
│   ├── globals.css              Entrada (imports + diretivas Tailwind)
│   ├── base.css                 Reset, tokens de raio, textura de fundo
│   ├── layout.css               Grade, seções, réguas
│   ├── typography.css           Kicker, marker, display, realces
│   ├── surfaces.css             Vidro, elevação, aurora, tilt, retrato
│   ├── controls.css             Pills, skip link, slider da DRE
│   └── motion.css               Reveal e contrato de reduced-motion
├── scripts/
│   └── check-bundle-budget.mjs  Orçamento de JS no CI
├── CONTEXT.md                   Glossário do domínio — o vocabulário do projeto
├── docs/adr/                    Registros de decisão (por que é assim, não como)
├── *.test.ts                    Testes ao lado do que testam (Vitest)
├── .github/workflows/
│   ├── quality.yml              Testes + build + typecheck + lint + orçamento
│   └── pages-redirect.yml       Publica o redirect do domínio antigo
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Rodando localmente

Pré-requisito: **Node.js 20+**.

```bash
git clone https://github.com/cielioqueiroz/cielioqueiroz.github.io.git
cd cielioqueiroz.github.io
npm install
npm run dev
```

Abra `http://localhost:3000`.

### Variáveis de ambiente

Nenhuma é obrigatória. Uma é recomendada:

| Variável | Efeito |
|---|---|
| `GITHUB_TOKEN` | Autentica as chamadas à GitHub API. Sem ela o site funciona igual, só com o limite público de 60 requisições/hora (o cache de 1 hora deixa isso confortável mesmo assim). |

Copie `.env.example` para `.env.local` se quiser configurá-la.

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção localmente |
| `npm run lint` | Lint via ESLint (flat config, sem o `next lint` descontinuado) |
| `npm test` | Roda a suíte de testes uma vez |
| `npm run test:watch` | Testes em modo observador |
| `npm run budget` | Verifica o orçamento de bundle (exige `build` antes) |

---

## Vocabulário e decisões

Dois arquivos existem para quem for ler o código (inclusive eu, daqui a seis meses):

- **[`CONTEXT.md`](./CONTEXT.md)** — o glossário. O site usa palavras vizinhas para coisas
  diferentes: *estudo de caso* não é *repositório*, *cenário* não é *premissa*, *credencial*
  não é *certificado*. Trocar uma pela outra gera bug de conteúdo que nenhum tipo pega.
- **[`docs/adr/`](./docs/adr/)** — registros de decisão. Só entram decisões caras de reverter,
  surpreendentes para quem chega e resultado de uma escolha real: por que o português mora na
  raiz, por que o site saiu do export estático, por que os repositórios são buscados no
  servidor e por que a CSP tem duas frouxidões deliberadas.

---

## Como editar o conteúdo

O conteúdo está dividido por tipo — cada arquivo tem um motivo diferente para mudar:

| Arquivo | O que fica lá |
|---|---|
| [`config/site.ts`](./config/site.ts) | Dados factuais: nome, contato, experiência, formação, skills, certificados e a lista de **repositórios fixados** — fixou outro no GitHub? Atualize `pinnedRepos` aqui, é o que define a ordem da vitrine |
| [`config/i18n.ts`](./config/i18n.ts) | Textos de interface em PT e EN — rótulos, títulos de seção, mensagens |
| [`content/case-studies.ts`](./content/case-studies.ts) | Estudos de caso. Um registro por projeto, com os campos redigidos em cada idioma — adicionar um caso cria a página `/projetos/<slug>` automaticamente |
| [`content/financials.ts`](./content/financials.ts) | Premissas da DRE e linhas do fluxo de caixa |
| [`config/theme.ts`](./config/theme.ts) | **Todas** as cores. App, banner OG e manifest do PWA leem daqui |

Trocar a foto do retrato: substituir `public/portrait.webp` (formato 4:5 vertical funciona melhor).

---

## Deploy

O deploy é automático no **Vercel** via integração com o Git: todo push em `main` gera um novo deploy de produção. Pull requests ganham preview próprio.

O workflow `quality.yml` roda os testes, o build, o typecheck, o lint e o orçamento de bundle em cada push e PR — um erro aí não bloqueia o deploy do Vercel, mas sinaliza a regressão.

---

## Customização visual

Toda a cor do site vem de **[`config/theme.ts`](./config/theme.ts)** — é a fonte única. O arquivo exporta as paletas light e dark, e a partir delas são gerados:

- as CSS custom properties injetadas no `<head>` (`--bg`, `--fg`, `--accent`…);
- o `themeColor` da barra do navegador e do manifest PWA;
- a paleta do banner Open Graph.

Trocar o tema é editar esse arquivo — nada mais. Os arquivos em `styles/` consomem apenas as variáveis, nunca valores literais de cor.

---

## Licença

Código sob licença MIT. O conteúdo (textos, retrato, certificados) é pessoal e não está coberto pela licença.
