# Product

## Register

brand

## Users

Recrutadores(as) tech, gestores de contratação e clientes em potencial no Brasil (PT-BR),
mais recrutadores internacionais na versão EN. Chegam via LinkedIn/GitHub, olham rápido
(30–90s) e decidem se aprofundam. Muitos em mobile.

## Product Purpose

Portfólio pessoal de Ciélio Queiroz — administrador/financeiro com 15+ anos migrando para
desenvolvimento front-end e dados. O site é a prova de competência: precisa demonstrar em si
mesmo o que o texto afirma (código limpo, performance, acabamento). Sucesso = contato de
recrutador / primeira vaga dev.

## Brand Personality

Editorial premium, calmo, confiável. Conceito atual: **"Fumaça Grafite"** — monocromático
total: carvão quase-preto, texto cinza-claro e luz branca como único accent. A "fumaça" são
os glows brancos difusos (aurora, sombras, spotlight), todos acromáticos — nenhuma cor
compete com os projetos. O tema claro é o gêmeo invertido: papel cinza-claro, tinta grafite.
Linguagem de capa de revista (kickers em mono, réguas, numeração de seção).
Voz: experiência de negócio + entusiasmo de quem está aprendendo em público.

## Anti-references

- Portfólio dev clichê: fundo escuro + neon roxo/ciano, partículas, "Hi, I'm X 👋".
- Landing SaaS genérica de IA (hero-metric, grids de cards idênticos, glassmorphism decorativo).
- Excesso de efeitos que derrubam performance em mobile — o site É o cartão de visita técnico.

## Design Principles

1. **O site é a prova** — performance, a11y e acabamento valem mais que qualquer texto.
   Verificável, não declarado: o orçamento de bundle e a suíte de testes rodam no CI
   (`npm run budget`, `npm test`). Regra que o site afirma e ninguém checa é texto de venda.
2. **Dados como diferencial** — mostrar a ponte admin/financeiro → dev em vez de esconder.
   A DRE é interativa de propósito: um modelo que recalcula prova mais que uma tabela impressa.
3. **Identidade única e coerente** — uma fonte de tema (`config/theme.ts`); tudo deriva dela.
4. **Menos efeitos, mais intenção** — cada animação precisa justificar seu custo.
   O splash screen foi removido por reprovar nesse critério: custava ~2,4s de LCP na primeira
   visita para carregar um site que já estava pronto.
5. **Nada duplicado por idioma** — todas as páginas vivem em `app/[locale]`. Conteúdo duplicado
   diverge; o que diverge fica errado em um dos lados sem ninguém perceber.

## Accessibility & Inclusion

Meta WCAG AA (contraste ≥4.5:1 em texto), `prefers-reduced-motion` respeitado,
navegação por teclado (skip-link localizado), ícones decorativos com aria-hidden,
e o `lang` do `<html>` correto já no HTML do servidor em ambos os idiomas.
