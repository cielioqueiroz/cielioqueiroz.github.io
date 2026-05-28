# Auditoria rápida de acessibilidade

**Data:** 2026-05-28
**Escopo:** checagem rápida (não é auditoria WCAG formal) feita junto com o lote de essenciais do recrutador.
**Alvo:** WCAG 2.1 AA no óbvio.

## Checklist

| Item | Estado | Nota |
|---|---|---|
| `aria-label` em botões só-ícone | ✅ | ThemeToggle, hamburger do Navbar, CopyEmailButton |
| `alt` descritivo no retrato | ✅ | `Retrato de Ciélio Queiroz` em `Portrait.tsx` |
| Foco visível em links/pills | ✅ | `*:focus-visible` global (outline 2px terracota) em `globals.css` |
| `aria-expanded` no menu mobile | ✅ | Já existia no hamburger |
| `lang="pt-BR"` no `<html>` | ✅ | Já existia |
| Skip-to-content | ✅ | Novo: `SkipLink` + `<main id="main">` |
| `aria-live` no copiar e-mail | ✅ | Novo: `role="status" aria-live="polite"` no CopyEmailButton |
| `aria-busy` na geração do PDF | ✅ | Novo: CVButton / CVFooterRow |
| `prefers-reduced-motion` | ✅ | Novo: desliga `.animate-*`, ticker, spin e zera transições |
| Ordem de tab segue ordem visual | ✅ | Navbar, Hero e Footer verificados |

## Achados não-críticos (próximo ciclo)

- **Contraste do terracota em texto pequeno (tema claro):** `#C9461E` sobre o creme `#F2EDE3`
  fica em ~4:1 — passa AA para texto grande (markers `§`, títulos), mas é borderline para
  o corpo mono de 10–11px. Hoje o terracota nesse tamanho é usado só em rótulos curtos e
  decorativos (kickers/markers), então o impacto é baixo. Se for promover terracota a texto
  de leitura pequeno, escurecer para `terra.dark #A83A18`.
- **`--fg-muted` em texto pequeno:** usado em metadados mono; passa confortável para o tamanho
  atual, mas vale revisar se algum trecho descer abaixo de 11px.

## Fora deste pass

- Auditoria Lighthouse completa (item 14 do roadmap).
- Teste com leitor de tela real (NVDA/VoiceOver).
