'use client';

import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { getDict, type Locale } from '@/config/i18n';
import { dreModel } from '@/content/financials';
import { computeDre } from '@/lib/dre';

/**
 * DRE com cenário — a parte interativa da seção "Planilhas vivas".
 *
 * A tabela era uma foto estática de uma planilha. Agora o visitante move a
 * receita entre −30% e +30% e vê a cascata inteira se refazer: com despesas
 * operacionais fixas, a margem líquida se move MUITO mais que a receita.
 * Esse é exatamente o argumento que o portfólio quer fazer — quinze anos de
 * modelagem financeira, demonstrados em vez de afirmados.
 *
 * O estado inicial é 1.0 (cenário-base), então o HTML do servidor já sai com
 * os números publicados: sem hidratação, a tabela continua correta e legível.
 */

const MIN = 0.7;
const MAX = 1.3;
const STEP = 0.01;

export function DreScenario({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.data;
  const numberLocale = dict.numberLocale;

  const [multiplier, setMultiplier] = useState(1);

  const base = useMemo(() => computeDre(dreModel, 1), []);
  const scenario = useMemo(() => computeDre(dreModel, multiplier), [multiplier]);

  const isBase = Math.abs(multiplier - 1) < 0.005;
  const deltaPct = (multiplier - 1) * 100;

  const fmtBRL = (v: number) =>
    v.toLocaleString(numberLocale, {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });

  const fmtPct = (v: number) =>
    (v * 100).toLocaleString(numberLocale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + '%';

  const fmtSignedPct = (v: number) => (v >= 0 ? '+' : '') + fmtPct(v);

  return (
    <>
      {/* Controle de cenário */}
      <div
        className="mb-6 flex flex-col gap-4 p-5 md:p-6"
        style={{ border: '1.5px solid var(--rule)', borderRadius: 'var(--r-md)' }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <label htmlFor="dre-scenario" className="kicker">
            {t.scenarioLabel}
          </label>
          <div className="flex items-center gap-3">
            <span
              className="display tabular text-2xl md:text-3xl"
              style={{ fontWeight: 600, color: isBase ? 'var(--fg-muted)' : 'var(--accent-ink)' }}
            >
              {isBase ? t.scenarioBase : `${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(0)}%`}
            </span>
            {!isBase && (
              <button
                type="button"
                onClick={() => setMultiplier(1)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{ border: '1px solid var(--rule)', color: 'var(--fg-soft)' }}
                aria-label={t.scenarioReset}
                title={t.scenarioReset}
              >
                <RotateCcw size={12} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>

        <input
          id="dre-scenario"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          className="dre-slider"
          aria-valuetext={`${deltaPct > 0 ? '+' : ''}${deltaPct.toFixed(0)}% ${t.scenarioVsBase}`}
        />

        <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
          {t.scenarioHint}
        </p>
      </div>

      {/* KPIs — com o delta contra o cenário-base */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {scenario.kpis.map((k, i) => {
          const baseKpi = base.kpis[i];
          const diff = k.value - baseKpi.value;
          const showDiff = !isBase && k.id !== 'revenueYoY' && Math.abs(diff) > 0.0005;

          return (
            <div key={k.id} className="glass depth-2 p-5">
              <p className="kicker mb-2">{t.kpiLabels[k.id] ?? k.id}</p>
              <p
                className="display text-3xl tabular md:text-[40px]"
                style={{ fontWeight: 600, color: 'var(--accent-ink)' }}
              >
                {k.kind === 'signedPercent' ? fmtSignedPct(k.value) : fmtPct(k.value)}
              </p>
              {showDiff && (
                <p
                  className="mt-1 font-mono text-[11px] tabular"
                  style={{ color: diff >= 0 ? 'var(--accent-2)' : 'var(--danger)' }}
                >
                  {diff >= 0 ? '▲' : '▼'} {fmtPct(Math.abs(diff))} {t.scenarioVsBase}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] md:hidden"
        style={{ color: 'var(--accent-ink)' }}
      >
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
              <th
                className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.thAccount}
              </th>
              <th
                className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.thAmount}
              </th>
              <th
                className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.thAV}
              </th>
              <th
                className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.thDelta}
              </th>
            </tr>
          </thead>
          <tbody>
            {scenario.lines.map((r, i) => {
              const isTotal = r.kind === 'total';
              const isHighlight = r.kind === 'highlight';
              const isSubtotal = r.kind === 'subtotal';
              const isHeader = r.kind === 'header';
              const negative = r.value < 0;

              const baseValue = base.lines[i].value;
              const delta = baseValue === 0 ? 0 : (r.value - baseValue) / Math.abs(baseValue);
              const deltaPositive = delta >= 0;

              return (
                <tr
                  key={r.id}
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
                      fontFamily: isTotal || isHighlight ? 'var(--font-display)' : undefined,
                      fontSize: isTotal ? '18px' : isHighlight ? '17px' : undefined,
                      color: isTotal ? 'var(--accent-ink)' : 'var(--fg)',
                    }}
                  >
                    {t.rowLabels[r.id] ?? r.id}
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
                    style={{
                      color: isBase
                        ? 'var(--fg-muted)'
                        : deltaPositive
                          ? 'var(--accent-2)'
                          : 'var(--danger)',
                    }}
                  >
                    {isBase ? '—' : fmtSignedPct(delta)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
