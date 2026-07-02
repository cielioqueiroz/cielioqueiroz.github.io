import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';
import { Tilt3D } from './Tilt3D';

export function DataShowcase({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).data;
  const numberLocale = getDict(locale).numberLocale;

  const fmtBRL = (v: number) =>
    v.toLocaleString(numberLocale, { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const fmtPct = (v: number) =>
    (v * 100).toLocaleString(numberLocale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + '%';

  const fmtSignedPct = (v: number) =>
    (v >= 0 ? '+' : '') + (v * 100).toLocaleString(numberLocale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + '%';

  const rowLabel = (label: string) => t.rowLabels[label] ?? label;
  const kpiLabel = (label: string) => t.kpiLabels[label] ?? label;
  const monthLabel = (m: string) => t.months[m] ?? m;
  const statusLabel = (s: string) => t.statuses[s] ?? s;

  const dre = site.dataCases.dre;
  const fx = site.dataCases.fluxo;

  return (
    <section
      id="dados"
      className="section"
      style={{ background: 'color-mix(in srgb, var(--bg-deep) 60%, var(--bg))' }}
    >
      <div className="frame">

        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">{t.marker}</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-display-md" style={{ fontWeight: 500 }}>
                {t.headingA} <span className="italic" style={{ color: 'var(--accent-ink)' }}>{t.headingB}</span>.
              </h2>
              <p className="max-w-sm text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
                {t.desc}
              </p>
            </div>
          </div>
        </div>

<article className="mt-16 md:mt-20">
          <header className="mb-6 grid items-baseline gap-y-2 md:grid-cols-12 md:gap-x-8">
            <p className="kicker md:col-span-3">{t.case01}</p>
            <div className="md:col-span-9 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-2xl leading-[1.1] md:text-[28px]" style={{ fontWeight: 500 }}>
                {t.dreTitle}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
                {t.drePeriod}
              </p>
            </div>
          </header>

<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {dre.kpis.map((k) => (
              <Tilt3D key={k.label} max={12} lift={16} className="glass depth-2 p-5">
                <p className="kicker mb-2">{kpiLabel(k.label)}</p>
                <p className="display text-3xl tabular md:text-[40px]" style={{ fontWeight: 600, color: 'var(--accent-ink)' }}>
                  {k.value}
                </p>
              </Tilt3D>
            ))}
          </div>

<p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] md:hidden" style={{ color: 'var(--accent-ink)' }}>
            {t.swipeHint}
          </p>

<div
            className="overflow-x-auto"
            style={{
              border: '2px solid var(--fg)',
              borderRadius: 'var(--r-lg)',
              background: 'var(--bg)',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--fg)' }}>
                  <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>
                    {t.thAccount}
                  </th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>
                    {t.thAmount}
                  </th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>
                    {t.thAV}
                  </th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>
                    {t.thAH}
                  </th>
                </tr>
              </thead>
              <tbody>
                {dre.rows.map((r, i) => {
                  const kind = (r as { kind?: string }).kind;
                  const isTotal = kind === 'total';
                  const isHighlight = kind === 'highlight';
                  const isSubtotal = kind === 'subtotal';
                  const isHeader = kind === 'header';
                  const negative = r.value < 0;
                  const ahPositive = r.ah >= 0;

                  return (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-[color:var(--bg-deep)]"
                      style={{
                        borderTop: i === 0 ? 'none' : '1px solid var(--rule)',
                        background: isTotal
                          ? 'color-mix(in srgb, var(--accent) 12%, var(--bg))'
                          : isHighlight
                          ? 'color-mix(in srgb, var(--accent) 6%, var(--bg))'
                          : undefined,
                      }}
                    >
                      <td
                        className="px-5 py-3 text-[15px] leading-tight"
                        style={{
                          fontWeight: isTotal || isHighlight || isSubtotal || isHeader ? 600 : 400,
                          fontFamily:
                            isTotal || isHighlight ? 'var(--font-display)' : undefined,
                          fontSize: isTotal ? '18px' : isHighlight ? '17px' : undefined,
                          color: isTotal ? 'var(--accent-ink)' : 'var(--fg)',
                        }}
                      >
                        {rowLabel(r.label)}
                      </td>
                      <td
                        className="px-5 py-3 text-right tabular"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: isTotal ? '17px' : '14px',
                          fontWeight: isTotal || isHighlight ? 600 : 500,
                          color: isTotal
                            ? 'var(--accent-ink)'
                            : negative
                            ? 'var(--fg-muted)'
                            : 'var(--fg)',
                        }}
                      >
                        {negative ? `(${fmtBRL(Math.abs(r.value))})` : fmtBRL(r.value)}
                      </td>
                      <td
                        className="px-5 py-3 text-right tabular font-mono text-[13px]"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {fmtPct(r.av)}
                      </td>
                      <td
                        className="px-5 py-3 text-right tabular font-mono text-[13px]"
                        style={{ color: ahPositive ? 'var(--accent-2)' : 'var(--danger)' }}
                      >
                        {fmtSignedPct(r.ah)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}>
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
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
                {t.fluxoPeriod}
              </p>
            </div>
          </header>

<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Tilt3D max={12} lift={16} className="glass depth-2 p-5">
              <p className="kicker mb-2">{t.incomeLabel}</p>
              <p className="display text-3xl tabular md:text-[34px]" style={{ fontWeight: 500 }}>
                {fmtBRL(fx.totals.receitas)}
              </p>
            </Tilt3D>
            <Tilt3D max={12} lift={16} className="glass depth-2 p-5">
              <p className="kicker mb-2">{t.expensesLabel}</p>
              <p className="display text-3xl tabular md:text-[34px]" style={{ fontWeight: 500, color: 'var(--fg-muted)' }}>
                {fmtBRL(fx.totals.despesas)}
              </p>
            </Tilt3D>
            <Tilt3D max={12} lift={16} className="glass depth-2 p-5">
              <p className="kicker mb-2">{t.balanceLabel}</p>
              <p className="display text-3xl tabular md:text-[34px]" style={{ fontWeight: 600, color: 'var(--accent-ink)' }}>
                {fmtBRL(fx.totals.saldo)}
              </p>
            </Tilt3D>
            <Tilt3D max={12} lift={16} className="glass depth-2 p-5">
              <p className="kicker mb-2">{t.committedLabel}</p>
              <p className="display text-3xl tabular md:text-[34px]" style={{ fontWeight: 500 }}>
                {fmtPct(fx.totals.pctComprometido)}
              </p>
            </Tilt3D>
          </div>

          <div className="overflow-x-auto" style={{ border: '2px solid var(--fg)', borderRadius: 'var(--r-lg)', background: 'var(--bg)' }}>
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--fg)' }}>
                  <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>{t.thMonth}</th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>{t.thIncome}</th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>{t.thExpenses}</th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>{t.thBalance}</th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>{t.thCommitted}</th>
                  <th className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>{t.thStatus}</th>
                </tr>
              </thead>
              <tbody>
                {fx.rows.map((r, i) => {
                  const pct = r.receitas > 0 ? r.despesas / r.receitas : 0;
                  const isAtencao = r.status === 'atenção';
                  const barW = Math.min(100, pct * 100);
                  return (
                    <tr
                      key={r.mes}
                      style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}
                      className="transition-colors hover:bg-[color:var(--bg-deep)]"
                    >
                      <td className="px-5 py-3 body-serif text-[16px]">{monthLabel(r.mes)}</td>
                      <td className="px-5 py-3 text-right tabular font-mono text-[14px]">{fmtBRL(r.receitas)}</td>
                      <td className="px-5 py-3 text-right tabular font-mono text-[14px]" style={{ color: 'var(--fg-muted)' }}>{fmtBRL(r.despesas)}</td>
                      <td className="px-5 py-3 text-right tabular font-mono text-[14px]" style={{ color: 'var(--accent-ink)', fontWeight: 600 }}>{fmtBRL(r.saldo)}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="ml-auto flex w-32 items-center gap-2">
                          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--rule)' }}>
                            <span
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                width: `${barW}%`,
                                background: isAtencao ? 'var(--danger)' : 'var(--accent-2)',
                              }}
                            />
                          </div>
                          <span className="font-mono text-[11px] tabular" style={{ color: 'var(--fg-muted)' }}>
                            {fmtPct(pct)}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
                          style={{ color: isAtencao ? 'var(--danger)' : 'var(--accent-2)' }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: isAtencao ? 'var(--danger)' : 'var(--accent-2)' }}
                          />
                          {statusLabel(r.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: '1px solid var(--fg)', background: 'color-mix(in srgb, var(--accent) 10%, var(--bg))' }}>
                  <td className="px-5 py-4 display text-[17px]" style={{ fontWeight: 600, color: 'var(--accent-ink)' }}>{t.periodTotal}</td>
                  <td className="px-5 py-4 text-right tabular font-mono text-[15px]" style={{ fontWeight: 600 }}>{fmtBRL(fx.totals.receitas)}</td>
                  <td className="px-5 py-4 text-right tabular font-mono text-[15px]" style={{ fontWeight: 600, color: 'var(--fg-muted)' }}>{fmtBRL(fx.totals.despesas)}</td>
                  <td className="px-5 py-4 text-right tabular font-mono text-[15px]" style={{ fontWeight: 700, color: 'var(--accent-ink)' }}>{fmtBRL(fx.totals.saldo)}</td>
                  <td className="px-5 py-4 text-right tabular font-mono text-[13px]" style={{ color: 'var(--fg-muted)' }}>{fmtPct(fx.totals.pctComprometido)}</td>
                  <td className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--accent-2)' }}>{t.totalStatus}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}>
            {t.fluxoFootnote}
          </p>
        </article>
      </div>
    </section>
  );
}
