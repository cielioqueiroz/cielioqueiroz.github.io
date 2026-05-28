# Recruiter Essentials — Design Spec

**Data:** 2026-05-28
**Escopo:** Itens 1-5 do roadmap de melhorias do portfólio
**Branch sugerida:** `feat/recruiter-essentials`

---

## 1. Objetivo

Reduzir o atrito entre "recrutador chega no portfólio" e "recrutador tem o CV em mãos e consegue conversar". Cinco itens individualmente pequenos, mas coesos no propósito de habilitar o caminho recrutador → contato:

1. **Botão "Baixar CV em PDF"** — geração dinâmica client-side a partir dos dados do portfólio
2. **Botão "Copiar e-mail"** com feedback — atrito menor que `mailto:`
3. **Página 404 customizada** com a mesma estética editorial
4. **SEO básico** — JSON-LD Person, sitemap.xml, robots.txt
5. **Skip-to-content link** + auditoria rápida WCAG AA

---

## 2. Restrições e contexto

- Stack: Next.js 15 (App Router) + Tailwind + TypeScript
- Deploy: GitHub Pages via `output: 'export'` — **sem runtime servidor**
- URL canônica: `https://cielioqueiroz.github.io`
- Identidade visual: editorial (Fraunces + Instrument Sans + JetBrains Mono), paleta terra, terracota `#C9461E` como acento. Manter — não desviar.
- Dados centralizados em `config/site.ts` (única fonte de verdade)

---

## 3. Mudanças em `config/site.ts`

Adicionar três campos novos. Telefone fica nos dados mas é **usado somente no PDF** — não renderizado no JSX público.

```ts
phone: '+55 (94) 99278-3184',

experience: [
  {
    role: 'Administrador Geral',
    company: 'Fazenda Três Palmeiras',
    start: '2020-03',
    end: '2024-10',
    achievements: [
      'Redução de ~15% em custos operacionais',
      'Reestruturação de processos administrativos',
      'Coordenação de equipes e melhoria de fluxos internos',
    ],
  },
  {
    role: 'Analista Administrativo e Financeiro',
    company: 'Supermercado Buriti',
    start: '2015-03',
    end: '2019-12',
    achievements: [
      'Contribuição para aumento de ~100% nas vendas em 2 anos',
      'Gestão de fluxo de caixa, contas a pagar e receber',
      'Conciliações bancárias e relatórios financeiros gerenciais',
    ],
  },
  {
    role: 'Assistente Administrativo',
    company: 'Supermercado Melo',
    start: '2008-04',
    end: '2015-02',
    achievements: [
      'Controle de estoque e conferência de mercadorias',
      'Lançamento de notas fiscais',
      'Suporte a fluxo de caixa e organização documental',
    ],
  },
],

education: [
  { degree: 'Administração de Empresas', school: 'UNOPAR', year: 2022 },
],
```

Datas em formato ISO `YYYY-MM` pra permitir ordenação e formatação por locale. O componente CV converte pra "Mar/2020".

---

## 4. Geração do PDF

### 4.1 Decisão de biblioteca

**`@react-pdf/renderer`** (v3.x). Alternativas consideradas:

| Lib | Por que não |
|---|---|
| `jsPDF` puro | Layout 100% manual, difícil de manter com mudanças de conteúdo |
| `jsPDF + html2canvas` | PDF vira imagem — texto não selecionável, ATS não parseia |
| `html2pdf.js` | Mesmo problema (canvas) |
| `pdfmake` | Estrutura declarativa OK, mas API menos ergonômica que JSX |

React-PDF gera texto real selecionável, aceita fontes customizadas, e a API JSX-like é fácil de manter junto com o resto do código React.

### 4.2 Lazy-loading

Bundle do React-PDF (~470KB minificado) **não pode entrar no chunk inicial**. Carregamento via `next/dynamic` ou dynamic import no handler do clique:

```tsx
// components/CVButton.tsx
'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { site } from '@/config/site';

export function CVButton({ variant = 'solid' }: { variant?: 'solid' | 'outline' }) {
  const [state, setState] = useState<'idle' | 'generating'>('idle');

  const generate = async () => {
    setState('generating');
    try {
      const [{ pdf }, { CVDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./CVDocument'),
      ]);
      const blob = await pdf(<CVDocument site={site} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Cielio_Queiroz_CV.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setState('idle');
    }
  };

  return (
    <button onClick={generate} className={variant === 'solid' ? 'pill-solid' : 'pill'}>
      <Download size={14} />
      {state === 'generating' ? 'Gerando...' : 'Baixar CV'}
    </button>
  );
}
```

### 4.3 Fontes

Copiar `.ttf` de Fraunces, Instrument Sans e JetBrains Mono pra `public/fonts/cv/`. Registrar via `Font.register()` no topo de `CVDocument.tsx`:

```tsx
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Fraunces',
  fonts: [
    { src: '/fonts/cv/Fraunces-Regular.ttf' },
    { src: '/fonts/cv/Fraunces-Italic.ttf', fontStyle: 'italic' },
    { src: '/fonts/cv/Fraunces-Medium.ttf', fontWeight: 500 },
  ],
});
// idem InstrumentSans, JetBrainsMono
```

Fontes ficam no diretório público, servidas pelo GH Pages. Funciona offline depois do primeiro fetch.

### 4.4 Layout do PDF (2 páginas, single-column, híbrido editorial+ATS)

**Página 1:**

- **Header** (Fraunces 28pt, ~70mm de altura)
  - Linha 1: `Jaciélio (Ciélio)` regular + `QUEIROZ` italic terracota
  - Linha 2: "Desenvolvedor Front-end & Analista de Dados" (Instrument Sans 11pt)
  - Régua 1px terracota
  - Linha 3: contatos em JetBrains Mono 8pt, separados por `·`
    `Santana do Araguaia – PA · +55 (94) 99278-3184 · cielioqueiroz@hotmail.com · linkedin.com/in/jacielio-queiroz`
  - Linha 4: `Portfólio: cielioqueiroz.github.io` (destaque terracota)

- **§ 01 — Perfil** (3-4 linhas, condensadas do `about`)
  > Administrador formado com 17 anos em gestão administrativa e financeira (contas a pagar/receber, fluxo de caixa, conciliações), agora desenvolvedor front-end com React, Next.js e TypeScript. Visão de negócio aplicada a interfaces e dashboards que geram decisão.

- **§ 02 — Experiência** (3 cargos)
  Por cargo: cabeçalho `Role · Company` (Fraunces 12pt) + linha de período (mono 9pt terracota) + 3 bullets

- **§ 03 — Formação** (1 linha)
  `Administração de Empresas · UNOPAR · 2022`

**Página 2:**

- **§ 04 — Stack & Ferramentas**
  5 linhas (uma por categoria do `site.skills`): label da categoria à esquerda, tools separados por vírgula

- **§ 05 — Credenciais (47 certificados)**
  Por categoria do `site.certificates`:
  - Linha de cabeçalho: nome da categoria + contagem
  - 3-4 destaques (curados — não os 18 de Programação)
  - Fechamento: "Lista completa em cielioqueiroz.github.io"

- **Footer do PDF** (mono 8pt, todo `--fg-muted`)
  `Gerado em 28/05/2026 · Vol. I, Ed. 2026`

### 4.5 Acentos editoriais

Só onde não compromete parsing ATS:
- Sobrenome em italic terracota
- Marcadores `§ 01-05` em mono terracota, small caps
- Datas em mono tabular terracota
- Régua horizontal entre header e corpo
- Resto: texto preto em fundo branco, single column, sans-serif body, serif headings

### 4.6 Destaques de certificados (curadoria)

Pra Programação (18 certs), escolher 4 que vendem mais:
- Formação Full Stack JavaScript (50h) — Thiago M. Medeiros
- Santander Bootcamp Dev 2024 — Santander/DIO
- Responsive Web Design — freeCodeCamp
- Cibersegurança Nivelamento (80h) — Hackers do Bem

Dados & BI (13): Power BI Business Intelligence — Preditiva; Analista de Dados Power BI — EduLiv; Power BI Dashboard Fluxo de Caixa — LinkedIn Learning

IA & Automação (9): n8n em 1h — Hora de Codar; Agente de IA no n8n; ChatGPT para Desenvolvedores; Power Apps Expert — Viscari

Administração (9): Analista Financeiro; Fluxo de Caixa; Inglês para Negócios — LinkedIn Learning

Lista de destaques fica num array constante no topo de `CVDocument.tsx`, **não em** `site.ts` (é decisão editorial específica do CV).

---

## 5. Copy email (dual-action)

### 5.1 Hero

Pill `Contato` (que atualmente faz só `mailto:`) vira composto de dois controles:

```
┌────────────────────────────┐
│ ✉ Contato      ↗ │ 📋     │
└────────────────────────────┘
```

- Botão esquerdo: `<a href="mailto:...">` (mantém comportamento atual)
- Botão direito (ícone clipboard): `<button onClick={copyEmail}>`
- Separados por `border-left: 1px solid var(--rule)` interno
- Container `role="group" aria-label="Contato por e-mail"`

Após copiar:
- Ícone vira `✓` por 2s
- `aria-live="polite"` anuncia "E-mail copiado para a área de transferência"

### 5.2 Footer

Email gigante segue como `<a href="mailto:...">`. Adicionar botão discreto à direita do bloco:

```
cielioqueiroz@hotmail.com    [ 📋 Copiar ]
```

Mesmo feedback.

### 5.3 Implementação

```tsx
// components/CopyEmailButton.tsx
'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { site } from '@/config/site';

export function CopyEmailButton({ size = 14, label = false }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.socials.email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = site.socials.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={copy} aria-label="Copiar e-mail">
      {copied ? <Check size={size} /> : <Copy size={size} />}
      {label && <span>{copied ? 'Copiado' : 'Copiar'}</span>}
      <span className="sr-only" aria-live="polite">
        {copied ? 'E-mail copiado' : ''}
      </span>
    </button>
  );
}
```

---

## 6. Página 404 editorial

Arquivo: `app/not-found.tsx`. Standalone — sem Navbar, sem Footer.

```
§ E404 — Erratas                              cielioqueiroz.github.io

Esta edição
não foi
impressa.

A página que você procura saiu da pauta — ou nunca chegou à redação.

[ ← Voltar à capa ]   [ Índice da edição ]
```

- Mesma estrutura do Hero (frame, marker, animações `.animate-rise`)
- Título: Fraunces 8-12vw, "não foi" em italic terracota
- 2 pills: link para `/` e link para `/#sobre` (índice)
- Sem ilustração (mantém minimalismo editorial)

---

## 7. SEO bundle

### 7.1 JSON-LD Person

Inserido em `app/layout.tsx` como `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />`, dentro do `<head>` implícito do Next.

```ts
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jaciélio da Silva Queiroz',
  alternateName: 'Ciélio Queiroz',
  jobTitle: 'Desenvolvedor Front-end & Analista de Dados',
  url: 'https://cielioqueiroz.github.io',
  image: 'https://cielioqueiroz.github.io/portrait.jpg',
  sameAs: [
    'https://github.com/cielioqueiroz',
    'https://www.linkedin.com/in/jacielio-queiroz/',
    'https://www.instagram.com/cielio.queiroz/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santana do Araguaia',
    addressRegion: 'PA',
    addressCountry: 'BR',
  },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Power BI', 'SQL', 'Python', 'n8n'],
  alumniOf: { '@type': 'EducationalOrganization', name: 'UNOPAR' },
};
```

### 7.2 Sitemap

`app/sitemap.ts` — API nativa do Next 15, gera `sitemap.xml` no build.

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cielioqueiroz.github.io',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

### 7.3 Robots

`app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://cielioqueiroz.github.io/sitemap.xml',
  };
}
```

### 7.4 Verificação

Após build, confirmar que `out/sitemap.xml` e `out/robots.txt` existem (output do export estático).

---

## 8. Skip-to-content + a11y quick pass

### 8.1 Skip link

Componente `components/SkipLink.tsx`:

```tsx
export function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Pular para o conteúdo
    </a>
  );
}
```

CSS em `app/globals.css`:

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: var(--bg);
  color: var(--accent);
  border: 1px solid var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.skip-link:focus {
  left: 0.5rem;
  top: 0.5rem;
}
```

Inserido em `app/layout.tsx` como primeiro filho do `<body>`, antes do `<Providers>`.

### 8.2 `<main id="main">`

`app/page.tsx` envolve o conteúdo principal em `<main id="main">` (verificar se ainda não tem).

### 8.3 Quick a11y pass

Não é auditoria WCAG formal. Vou rodar uma checagem rápida em todos os componentes lidos durante a implementação e corrigir o óbvio:

- [ ] `aria-label` em todo botão só-ícone (ThemeToggle, hamburger, copy email, etc)
- [ ] `alt` text descritivo no `<Portrait>` ("Retrato de Ciélio Queiroz, perfil")
- [ ] `focus-visible:ring-2 ring-[--accent]` em todos os `.pill` e `.pill-solid`
- [ ] Contraste terracota `#C9461E` sobre creme — checar com checador embutido (deveria passar AA pra 14pt+)
- [ ] Contraste `--fg-muted` — verificar (provavelmente passa só pra texto grande)
- [ ] `prefers-reduced-motion: reduce` no globals.css desliga `.animate-*`
- [ ] Anúncio `aria-live` no botão copy
- [ ] `lang="pt-BR"` no `<html>` (já tem ✓)
- [ ] `tabindex` ordem segue ordem visual (verificar Navbar mobile menu)
- [ ] Botão hamburger do Navbar tem `aria-expanded` (já tem ✓)

Achados ficam em `docs/a11y-quick-pass.md` (markdown simples, formato checklist). Críticos vão no mesmo PR; não-críticos viram issues pra próximo ciclo.

---

## 9. Mapa final de arquivos

**Novos:**

- `components/CVButton.tsx`
- `components/CVDocument.tsx`
- `components/CopyEmailButton.tsx`
- `components/SkipLink.tsx`
- `app/not-found.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `public/fonts/cv/Fraunces-{Regular,Italic,Medium}.ttf`
- `public/fonts/cv/InstrumentSans-{Regular,Italic}.ttf`
- `public/fonts/cv/JetBrainsMono-Regular.ttf`
- `docs/a11y-quick-pass.md`

**Modificados:**

- `config/site.ts` (+ `phone`, `experience`, `education`)
- `package.json` (+ `@react-pdf/renderer`)
- `app/layout.tsx` (+ JSON-LD, + SkipLink)
- `app/page.tsx` (+ `<main id="main">` se ainda não estiver)
- `app/globals.css` (+ `.skip-link`, + `@media (prefers-reduced-motion: reduce)`)
- `components/Hero.tsx` (pill Contato dual-action + pill CVButton)
- `components/Footer.tsx` (CopyEmailButton no email gigante + linha Currículo na lista Encontros)
- `components/Portrait.tsx` (alt text descritivo, se necessário)
- `components/ThemeToggle.tsx` (aria-label se faltar)

---

## 10. Critérios de aceitação

- [ ] Clicar "Baixar CV" gera um PDF de 2 páginas com layout especificado, baixa como `Cielio_Queiroz_CV.pdf`
- [ ] PDF aberto em leitor padrão tem texto selecionável (não imagem)
- [ ] Bundle inicial da home não regrediu mais de 5KB (react-pdf NÃO entra no chunk principal)
- [ ] Clicar "📋" no Hero copia o email e mostra feedback `✓ Copiado` por 2s
- [ ] Tab navigation com skip link funciona: Tab no top da página → skip link aparece → Enter pula pra `<main>`
- [ ] `out/sitemap.xml`, `out/robots.txt` existem após `npm run build`
- [ ] `<script type="application/ld+json">` aparece no `<head>` da home com schema Person válido (testar em [schema validator](https://validator.schema.org/))
- [ ] Acessar URL inexistente (ex: `/abc`) mostra a 404 customizada
- [ ] `npm run lint` passa
- [ ] `npm run build` passa sem warning novo

---

## 11. Fora de escopo (próximos ciclos)

- i18n PT/EN (item 9 — sub-projeto separado)
- Featured Projects com case studies expandidos (item 8)
- Filtro/busca nos Certificados (item 6)
- Timeline visual da trajetória (item 7)
- Print stylesheet pra o site (item 10 — duplicaria o esforço do PDF)
- Auditoria Lighthouse completa (item 14 — depois desta base)
- Otimização do portrait.jpg (item 16 — checagem rápida, não é design)

---

## 12. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Bundle do React-PDF inflado | Dynamic import + verificação manual com `npm run build` checando chunk sizes |
| Fontes Fraunces não carregam no PDF (CORS, missing file) | Fallback de fonte registrada em Font.register; teste com browser DevTools |
| Clipboard API indisponível (Safari antigo, contexto não-HTTPS local) | Fallback `document.execCommand('copy')` no `CopyEmailButton` |
| 404 do Next quebra com `output: 'export'` | Verificar que `out/404.html` existe após build; GH Pages serve automaticamente |
| Sitemap/robots não gerados com export estático | Confirmar que Next 15 + output:'export' suporta `app/sitemap.ts` (suporta sim na v15) |
| Contraste terracota não passa AA | Se falhar, escurecer o tom de fundo creme em ~3% ou só usar acento em textos ≥14pt bold |
