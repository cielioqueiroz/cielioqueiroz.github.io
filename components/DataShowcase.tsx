import { getDict, type Locale } from '@/config/i18n';
import { DreScenario } from './data/DreScenario';
import { CashflowTable } from './data/CashflowTable';

/**
 * Seção § 06 — casca.
 *
 * Também é a quebra de ritmo da home: em vez do `grid 3/9 + régua + h2` que
 * as outras cinco seções repetem, aqui o cabeçalho é uma faixa de largura
 * total com o número da seção em escala tipográfica. Depois de rolar por
 * cinco seções idênticas, a diferença é o que faz o leitor perceber que
 * chegou na parte que interessa.
 */
export function DataShowcase({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).data;

  return (
    <section
      id="dados"
      className="section-bleed"
      style={{ background: 'color-mix(in srgb, var(--bg-deep) 60%, var(--bg))' }}
    >
      {/* Faixa de abertura em largura total — quebra o grid 3/9 da home. */}
      <div className="reveal border-y" style={{ borderColor: 'var(--fg)' }}>
        <div className="frame py-10 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <h2
              className="display"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              {t.headingA}{' '}
              <span className="italic" style={{ color: 'var(--accent-ink)' }}>
                {t.headingB}
              </span>
            </h2>
            <div className="max-w-sm">
              <p className="marker mb-3">{t.marker}</p>
              <p className="text-[14px] leading-[1.65]" style={{ color: 'var(--fg-muted)' }}>
                {t.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="frame">
        <article className="mt-16 md:mt-20">
          <header className="mb-6 grid items-baseline gap-y-2 md:grid-cols-12 md:gap-x-8">
            <p className="kicker md:col-span-3">{t.case01}</p>
            <div className="md:col-span-9 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-2xl leading-[1.1] md:text-[28px]" style={{ fontWeight: 500 }}>
                {t.dreTitle}
              </h3>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.drePeriod}
              </p>
            </div>
          </header>

          <DreScenario locale={locale} />

          <p
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'var(--fg-muted)' }}
          >
            {t.dreFootnote}
          </p>
        </article>

        <article className="mt-20 md:mt-28">
          <header className="mb-6 grid items-baseline gap-y-2 md:grid-cols-12 md:gap-x-8">
            <p className="kicker md:col-span-3">{t.case02}</p>
            <div className="md:col-span-9 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-2xl leading-[1.1] md:text-[28px]" style={{ fontWeight: 500 }}>
                {t.fluxoTitle}
              </h3>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.fluxoPeriod}
              </p>
            </div>
          </header>

          <CashflowTable locale={locale} />

          <p
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'var(--fg-muted)' }}
          >
            {t.fluxoFootnote}
          </p>
        </article>
      </div>
    </section>
  );
}
