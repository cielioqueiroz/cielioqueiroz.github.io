import { getDict, type Locale } from '@/config/i18n';
import { cashflow, CASHFLOW_WATCH_THRESHOLD } from '@/content/financials';

/**
 * Fluxo de caixa familiar — Server Component.
 *
 * Os totais e o status de cada mês eram valores digitados à mão em
 * `config/site.ts`, ou seja, podiam divergir das linhas que os originam.
 * Agora são derivados: somar as linhas é a única fonte da verdade.
 */
export function CashflowTable({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.data;
  const numberLocale = dict.numberLocale;

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

  const rows = cashflow.map((r) => {
    const balance = r.income - r.expenses;
    const committed = r.income > 0 ? r.expenses / r.income : 0;
    return { ...r, balance, committed, watch: committed >= CASHFLOW_WATCH_THRESHOLD };
  });

  const totals = rows.reduce(
    (acc, r) => ({ income: acc.income + r.income, expenses: acc.expenses + r.expenses }),
    { income: 0, expenses: 0 }
  );
  const totalBalance = totals.income - totals.expenses;
  const totalCommitted = totals.income > 0 ? totals.expenses / totals.income : 0;

  const th =
    'px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.22em]';

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="glass depth-2 p-5">
          <p className="kicker mb-2">{t.incomeLabel}</p>
          <p className="display text-3xl tabular md:text-[34px]" style={{ fontWeight: 500 }}>
            {fmtBRL(totals.income)}
          </p>
        </div>
        <div className="glass depth-2 p-5">
          <p className="kicker mb-2">{t.expensesLabel}</p>
          <p
            className="display text-3xl tabular md:text-[34px]"
            style={{ fontWeight: 500, color: 'var(--fg-muted)' }}
          >
            {fmtBRL(totals.expenses)}
          </p>
        </div>
        <div className="glass depth-2 p-5">
          <p className="kicker mb-2">{t.balanceLabel}</p>
          <p
            className="display text-3xl tabular md:text-[34px]"
            style={{ fontWeight: 600, color: 'var(--accent-ink)' }}
          >
            {fmtBRL(totalBalance)}
          </p>
        </div>
        <div className="glass depth-2 p-5">
          <p className="kicker mb-2">{t.committedLabel}</p>
          <p className="display text-3xl tabular md:text-[34px]" style={{ fontWeight: 500 }}>
            {fmtPct(totalCommitted)}
          </p>
        </div>
      </div>

      <div
        className="overflow-x-auto"
        style={{ border: '2px solid var(--fg)', borderRadius: 'var(--r-lg)', background: 'var(--bg)' }}
      >
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--fg)' }}>
              <th
                className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.thMonth}
              </th>
              <th className={th} style={{ color: 'var(--fg-muted)' }}>{t.thIncome}</th>
              <th className={th} style={{ color: 'var(--fg-muted)' }}>{t.thExpenses}</th>
              <th className={th} style={{ color: 'var(--fg-muted)' }}>{t.thBalance}</th>
              <th className={th} style={{ color: 'var(--fg-muted)' }}>{t.thCommitted}</th>
              <th className={th} style={{ color: 'var(--fg-muted)' }}>{t.thStatus}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.month}
                style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}
                className="transition-colors hover:bg-[color:var(--bg-deep)]"
              >
                <td className="px-5 py-3 body-serif text-[16px]">{t.months[r.month] ?? r.month}</td>
                <td className="px-5 py-3 text-right tabular font-mono text-[14px]">
                  {fmtBRL(r.income)}
                </td>
                <td
                  className="px-5 py-3 text-right tabular font-mono text-[14px]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {fmtBRL(r.expenses)}
                </td>
                <td
                  className="px-5 py-3 text-right tabular font-mono text-[14px]"
                  style={{ color: 'var(--accent-ink)', fontWeight: 600 }}
                >
                  {fmtBRL(r.balance)}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="ml-auto flex w-32 items-center gap-2">
                    <div
                      className="relative h-1.5 flex-1 overflow-hidden rounded-full"
                      style={{ background: 'var(--rule)' }}
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${Math.min(100, r.committed * 100)}%`,
                          background: r.watch ? 'var(--danger)' : 'var(--accent-2)',
                        }}
                      />
                    </div>
                    <span
                      className="font-mono text-[11px] tabular"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {fmtPct(r.committed)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: r.watch ? 'var(--danger)' : 'var(--accent-2)' }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: r.watch ? 'var(--danger)' : 'var(--accent-2)' }}
                    />
                    {r.watch ? t.statuses.watch : t.statuses.positive}
                  </span>
                </td>
              </tr>
            ))}

            <tr
              style={{
                borderTop: '1px solid var(--fg)',
                background: 'color-mix(in srgb, var(--accent) 10%, var(--bg))',
              }}
            >
              <td className="px-5 py-4 display text-[17px]" style={{ fontWeight: 600, color: 'var(--accent-ink)' }}>
                {t.periodTotal}
              </td>
              <td className="px-5 py-4 text-right tabular font-mono text-[15px]" style={{ fontWeight: 600 }}>
                {fmtBRL(totals.income)}
              </td>
              <td
                className="px-5 py-4 text-right tabular font-mono text-[15px]"
                style={{ fontWeight: 600, color: 'var(--fg-muted)' }}
              >
                {fmtBRL(totals.expenses)}
              </td>
              <td
                className="px-5 py-4 text-right tabular font-mono text-[15px]"
                style={{ fontWeight: 700, color: 'var(--accent-ink)' }}
              >
                {fmtBRL(totalBalance)}
              </td>
              <td
                className="px-5 py-4 text-right tabular font-mono text-[13px]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {fmtPct(totalCommitted)}
              </td>
              <td
                className="px-5 py-4 text-right font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: 'var(--accent-2)' }}
              >
                {t.statuses.positive}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
