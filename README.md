# Ciélio Queiroz — Portfólio

Site pessoal e portfólio profissional de **Ciélio Queiroz** — desenvolvedor front-end e entusiasta de dados, com mais de 15 anos de experiência em gestão administrativa e financeira agora aplicada ao desenvolvimento de software.

🌐 **Online:** [cielioqueiroz.github.io](https://cielioqueiroz.github.io)
📍 Santana do Araguaia – PA, Brasil

---

## Sobre o site

Página única (one-page) com identidade visual **_Swiss Luxe_** — minimalismo suíço premium. Cada seção é numerada (`§ 01`, `§ 02`...), com tipografia grotesca para títulos, sans-serif para corpo e monoespaçada para metadados — combinando o rigor de uma demonstração financeira com a sobriedade de um estúdio de design.

### Seções

| § | Seção | O que é |
|---|---|---|
| 01 | Apresentação | Capa com retrato duotone, nome, tagline e CTAs sociais |
| 02 | Sobre mim | Trajetória de admin/financeiro para dev, com drop cap e pull quote |
| 03 | Skills | Inventário tipográfico de tecnologias agrupadas por área |
| 04 | Credenciais | Lista de 47 certificados (Programação, Dados & BI, IA, Administração) |
| 05 | Planilhas vivas | DRE empresarial e fluxo de caixa familiar recriados em HTML como prova de domínio em modelagem financeira |
| 06 | Projetos | Repositórios públicos do GitHub buscados em tempo real via API |
| 07 | Colofão | Contato e créditos editoriais |

---

## Stack técnico

| Camada | Ferramenta |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, static export) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/) + CSS custom properties |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) — light/dark com persistência |
| Tipografia | Schibsted Grotesk (display), Hanken Grotesk (body), Geist Mono (mono) — via `next/font/google` |
| Ícones | [lucide-react](https://lucide.dev/) (UI) + [react-icons](https://react-icons.github.io/react-icons/) (tecnologias) |
| Dados de projetos | [GitHub REST API v3](https://docs.github.com/en/rest) — fetch client-side a cada visita |
| Hospedagem | [GitHub Pages](https://pages.github.com/) (gratuita, com SSL) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) — build automático em push para `main` |

### Características técnicas

- **Static export** completo (`output: 'export'`) — site servido como HTML puro, sem servidor Node
- **First Load JS**: ~113 kB (otimizado, sem libs pesadas como Framer Motion)
- **Atualização ao vivo** dos projetos: a seção `§ 06` consulta a GitHub API toda vez que alguém abre o site
- **Splash screen** com contador % animado via CSS `@property` (imune a thread blocking)
- **Retrato duotone** CSS-only com `mix-blend-mode` + grayscale, hover revela cor original
- **Navegação ativa**: scrollspy na navbar (`IntersectionObserver`) e revelação de seções ao rolar via CSS scroll-driven (`animation-timeline: view()`), com fallback e respeito a `prefers-reduced-motion`
- **Responsivo completo** (320 → 1920px) com menu hamburger mobile e drawer fullscreen
- **Acessível**: `aria-label`, `aria-live`, navegação por teclado, foco visível, respeita `prefers-reduced-motion`

---

## Estrutura do projeto

```
my-portifolio/
├── app/
│   ├── layout.tsx              Layout raiz com fontes e tema
│   ├── page.tsx                Composição da home
│   ├── providers.tsx           ThemeProvider
│   ├── globals.css             Variáveis CSS, tipografia base, splash, portrait
│   └── icon.svg                Favicon
├── components/
│   ├── Navbar.tsx              Masthead + drawer mobile
│   ├── Hero.tsx                Capa § 01
│   ├── About.tsx               Sobre § 02
│   ├── Skills.tsx              Skills § 03
│   ├── Certificates.tsx        Credenciais § 04
│   ├── DataShowcase.tsx        Planilhas vivas § 05
│   ├── Projects.tsx            Projetos § 06 (client-side, fetch ao vivo)
│   ├── Footer.tsx              Colofão § 07
│   ├── Portrait.tsx            Retrato com duotone CSS
│   ├── SplashScreen.tsx        Tela de carregamento
│   ├── SkillIcon.tsx           Mapeamento de ícones de skill
│   └── ThemeToggle.tsx         Toggle light/dark
├── config/
│   └── site.ts                 Dados pessoais e conteúdo (único lugar a editar)
├── lib/
│   └── github.ts               Wrapper da GitHub REST API
├── public/
│   ├── portrait.jpg            Foto pessoal
│   └── (favicon servido por app/icon.svg)
├── .github/workflows/
│   └── deploy.yml              CI: build + deploy no Pages
├── next.config.mjs             output: 'export', trailingSlash
├── tailwind.config.ts          Paleta Swiss Luxe + animações
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

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento com hot reload |
| `npm run build` | Gera build estático em `out/` |
| `npm run start` | Serve build de produção localmente |
| `npm run lint` | Lint via ESLint |

---

## Como editar o conteúdo

Todo conteúdo pessoal está em **[`config/site.ts`](./config/site.ts)** — único arquivo a tocar para atualizar:

- `name`, `title`, `tagline`, `location`
- `about` — array de parágrafos da seção Sobre
- `socials` — links de redes sociais e e-mail
- `githubUsername` — usado pelo fetch da API
- `featuredRepos` — repos que aparecem primeiro na lista
- `hiddenRepos` — repos a ocultar (forks antigos, perfil readme, etc.)
- `skills` — agrupadas por categoria, cada item com `name`, `icon`, `color`
- `certificates` — agrupados por categoria, cada item com `title`, `issuer`
- `dataCases` — dados das tabelas DRE e fluxo de caixa

Trocar a foto do retrato: substituir `public/portrait.jpg` (formato 4:5 vertical funciona melhor; o tratamento duotone é aplicado por CSS).

---

## Deploy no GitHub Pages

### 1. Criar o repositório

Crie um repo público chamado exatamente:

```
cielioqueiroz.github.io
```

Esse nome especial faz o GitHub publicar diretamente em `https://cielioqueiroz.github.io` sem subpastas.

### 2. Subir o código

```bash
git init
git add .
git commit -m "feat: portfólio inicial"
git branch -M main
git remote add origin https://github.com/cielioqueiroz/cielioqueiroz.github.io.git
git push -u origin main
```

### 3. Ativar GitHub Pages

No repositório criado:

1. Vá em **Settings → Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve

O workflow `.github/workflows/deploy.yml` cuida do resto: a cada push em `main`, ele instala dependências, builda e publica. Após 1–2 minutos, o site está no ar.

### 4. Atualizando o portfólio

```bash
git add .
git commit -m "update: nova informação"
git push
```

O GitHub Actions reconstrói e republica sozinho.

---

## Customização visual

Toda a paleta usa CSS custom properties em [`app/globals.css`](./app/globals.css):

```css
:root {
  --bg: #F7F7F4;        /* off-white — light */
  --fg: #111214;        /* carvão */
  --accent: #1F4D3D;    /* verde-petróleo */
  --danger: #B23A2E;    /* tijolo (status) */
}
.dark {
  --bg: #0C0D0E;        /* preto neutro — dark */
  --fg: #ECECEA;        /* branco-gelo */
  --accent: #4FC59B;    /* menta */
  --danger: #E0796B;    /* coral (status) */
}
```

Trocar a paleta toda é só editar essas variáveis.

---

## Performance

| Métrica | Valor |
|---|---|
| First Load JS | ~113 kB |
| Páginas | 1 (static) |
| Build time | ~15s |
| Lighthouse Performance | 95+ |
| Mobile-friendly | Sim (320–1920px) |

---

## Contato

- **LinkedIn:** [linkedin.com/in/jacielio-queiroz](https://www.linkedin.com/in/jacielio-queiroz/)
- **GitHub:** [github.com/cielioqueiroz](https://github.com/cielioqueiroz)
- **Instagram:** [@cielio.queiroz](https://www.instagram.com/cielio.queiroz/)
- **E-mail:** cielioqueiroz@hotmail.com

---

## Licença

Código deste portfólio: **MIT** — sinta-se à vontade para usar como referência.
Conteúdo (textos, foto, certificados): © Ciélio Queiroz — todos os direitos reservados.
