# Portfólio — Cielio Queiroz

Portfólio pessoal construído com **Next.js 15** + **Tailwind CSS** + **TypeScript**, com deploy estático no **GitHub Pages**.

URL final: **https://cielioqueiroz.github.io**

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [next-themes](https://github.com/pacocoursey/next-themes) — dark mode com toggle
- [react-icons](https://react-icons.github.io/react-icons/) — ícones das tecnologias
- [lucide-react](https://lucide.dev/) — ícones de UI
- GitHub API — busca dos projetos em tempo de build

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Como editar os dados

Tudo de pessoal está em **[`config/site.ts`](./config/site.ts)**:

- `name`, `title`, `tagline`, `location`
- `about` — parágrafos da seção "Sobre mim"
- `socials` — links GitHub, LinkedIn, Instagram, Email
- `skills` — agrupadas por categoria
- `featuredRepos` — nomes de repos que aparecem primeiro
- `hiddenRepos` — repos a ocultar

Não precisa mexer em nada além disso pra atualizar o conteúdo.

## Deploy no GitHub Pages

### 1. Crie o repositório no GitHub

Vá em https://github.com/new e crie um repo público chamado **exatamente**:

```
cielioqueiroz.github.io
```

> O nome precisa ser igual ao seu username + `.github.io` pra URL ficar limpa em `https://cielioqueiroz.github.io`.

### 2. Suba este projeto

No PowerShell, dentro da pasta do projeto:

```powershell
git init
git add .
git commit -m "feat: portfolio inicial"
git branch -M main
git remote add origin https://github.com/cielioqueiroz/cielioqueiroz.github.io.git
git push -u origin main
```

### 3. Ative o GitHub Pages

No repositório criado, vá em **Settings → Pages** e em **Source** selecione **GitHub Actions**.

O workflow `.github/workflows/deploy.yml` cuida do build e publica automaticamente a cada push em `main`.

Aguarde 1–2 minutos e acesse: **https://cielioqueiroz.github.io**

## Atualizando o portfólio

Edite, comite e dê push:

```powershell
git add .
git commit -m "update: nova info"
git push
```

O Actions rebuilda e republica sozinho.

## Estrutura

```
.
├── app/                    # Páginas (App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── globals.css
├── components/             # Componentes React
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── SkillIcon.tsx
│   ├── Projects.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ThemeToggle.tsx
├── config/site.ts          # ★ TODOS OS DADOS PESSOAIS
├── lib/github.ts           # Fetch da GitHub API
├── .github/workflows/      # CI/CD
└── next.config.mjs         # output: 'export' pra Pages
```
