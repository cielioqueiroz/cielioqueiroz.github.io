'use client';

import { useMemo, useState } from 'react';
import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';

type Cert = (typeof site.certificates)[number];

export function Certificates({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).certs;

  const groups = useMemo(() => {
    const acc: { category: string; items: Cert[] }[] = [];
    for (const c of site.certificates) {
      let g = acc.find((x) => x.category === c.category);
      if (!g) {
        g = { category: c.category, items: [] };
        acc.push(g);
      }
      g.items.push(c);
    }
    return acc;
  }, []);

  const total = site.certificates.length;
  const [selected, setSelected] = useState<string | null>(null);

  const visibleGroups = selected
    ? groups.filter((g) => g.category === selected)
    : groups;

  const categoryLabel = (cat: string) => t.categories[cat] ?? cat;

  return (
    <section id="certificados" className="section">
      <div className="frame">
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">{t.marker}</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-display-md" style={{ fontWeight: 500 }}>
                {t.headingA} <span className="italic" style={{ color: 'var(--accent-ink)' }}>&amp;</span> {t.headingB}
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
                {t.archive(total)}
              </p>
            </div>
          </div>
        </div>

        <div className="reveal mt-16 grid items-baseline gap-y-5 border-y py-8 md:grid-cols-12 md:gap-x-8" style={{ borderColor: 'var(--rule)' }}>
          <p className="kicker md:col-span-3">{t.degreeLabel}</p>
          <div className="md:col-span-9 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="display text-2xl leading-[1.1] md:text-[34px]" style={{ fontWeight: 500 }}>
              {t.degreeName}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
              {t.degreeMeta}
            </p>
          </div>
        </div>

        {/* Filtro por categoria */}
        <div
          className="mt-12 flex flex-wrap gap-2"
          role="group"
          aria-label={t.filterAria}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-pressed={selected === null}
            className={selected === null ? 'pill-solid' : 'pill'}
          >
            {t.all}
            <span className="tabular" style={{ opacity: 0.65 }}>{total}</span>
          </button>
          {groups.map((g) => (
            <button
              key={g.category}
              type="button"
              onClick={() => setSelected(g.category)}
              aria-pressed={selected === g.category}
              className={selected === g.category ? 'pill-solid' : 'pill'}
            >
              {categoryLabel(g.category)}
              <span className="tabular" style={{ opacity: 0.65 }}>{g.items.length}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 space-y-16">
          {visibleGroups.map((g) => {
            const gi = groups.findIndex((x) => x.category === g.category);
            return (
              <div key={g.category} className="reveal grid gap-y-6 md:grid-cols-12 md:gap-x-8">
                <div className="md:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--accent-ink)' }}>
                    {String(gi + 1).padStart(2, '0')} / {String(groups.length).padStart(2, '0')}
                  </p>
                  <h3 className="display mt-3 text-2xl leading-[1.1] md:text-[28px]" style={{ fontWeight: 500 }}>
                    {categoryLabel(g.category)}
                  </h3>
                  <p className="mt-3 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
                    {t.count(g.items.length)}
                  </p>
                </div>

                {/* Duas colunas: 49 certificados em linha corrida gastavam
                    quase três mil pixels de rolagem. Título e emissor empilhados
                    ocupam metade disso e continuam legíveis — a numeração por
                    item saiu porque a contagem já está no filtro acima. */}
                <ul className="md:col-span-9 grid gap-x-8 sm:grid-cols-2">
                  {g.items.map((c, i) => (
                    <li
                      key={`${c.title}-${i}`}
                      className="group border-b py-3"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <p className="body-serif text-[15px] leading-[1.35] md:text-[16px]">
                        {c.title}
                      </p>
                      <p
                        className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {c.issuer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {t.footnote && (
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}>
            {t.footnote}
          </p>
        )}
      </div>
    </section>
  );
}
