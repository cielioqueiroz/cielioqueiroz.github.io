import Link from 'next/link';
import { ArrowLeft, ArrowDownRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="frame pt-10 md:pt-14">
        <div
          className="animate-fade flex flex-wrap items-center justify-between gap-3 border-t pb-3"
          style={{ borderColor: 'var(--fg)' }}
        >
          <div className="marker tabular pt-3">§ E404 — Erratas</div>
          <div className="kicker tabular pt-3">cielioqueiroz.github.io</div>
        </div>
      </div>

      <div className="frame flex flex-1 flex-col justify-center py-20 md:py-28">
        <p className="marker mb-6 animate-rise stagger-1">
          <span
            className="mr-2 inline-block w-8 align-middle"
            style={{ borderTop: '2px solid var(--accent-ink)' }}
          />
          Erro 404
        </p>

        <h1
          className="display animate-rise stagger-2"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(3rem, 11vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="block">Esta edição</span>
          <span
            className="block italic"
            style={{ color: 'var(--accent-ink)', fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
          >
            não foi
          </span>
          <span className="block">
            impressa<span style={{ color: 'var(--accent-ink)' }}>.</span>
          </span>
        </h1>

        <p
          className="body-serif mt-10 max-w-xl animate-rise stagger-3 text-xl leading-[1.4] md:text-2xl"
          style={{ color: 'var(--fg-soft)' }}
        >
          A página que você procura saiu da pauta — ou nunca chegou à redação.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3 animate-rise stagger-4">
          <Link href="/" className="pill-solid group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Voltar à capa
          </Link>
          <Link href="/#sobre" className="pill">
            Índice da edição
            <ArrowDownRight size={14} />
          </Link>
        </div>
      </div>

      <div className="frame pb-10">
        <div
          className="border-t pt-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular"
          style={{ borderColor: 'var(--rule)', color: 'var(--fg-muted)' }}
        >
          Vol. I · Edição 2026
        </div>
      </div>
    </main>
  );
}
