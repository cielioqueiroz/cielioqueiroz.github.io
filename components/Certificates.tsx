'use client';

import { useMemo, useState } from 'react';
import { site } from '@/config/site';

type Cert = (typeof site.certificates)[number];

export function Certificates() {
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

  return (
    <section id="certificados" className="section">
      <div className="frame">
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">§ 05</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-display-md" style={{ fontWeight: 500 }}>
                Credenciais <span className="italic" style={{ color: 'var(--accent)' }}>&amp;</span> formação.
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
                Arquivo · {String(total).padStart(2, '0')} certificados
              </p>
            </div>
          </div>
        </div>

        <div className="reveal mt-16 grid items-baseline gap-y-5 border-y py-8 md:grid-cols-12 md:gap-x-8" style={{ borderColor: 'var(--rule)' }}>
          <p className="kicker md:col-span-3">Diploma de graduação</p>
          <div className="md:col-span-9 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="display text-2xl leading-[1.1] md:text-[34px]" style={{ fontWeight: 500 }}>
              Bacharelado em Administração
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
              UNOPAR · 2022
            </p>
          </div>
        </div>

        {/* Filtro por categoria */}
        <div
          className="mt-12 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar certificados por categoria"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-pressed={selected === null}
            className={selected === null ? 'pill-solid' : 'pill'}
          >
            Todos
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
              {g.category}
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
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--accent)' }}>
                    {String(gi + 1).padStart(2, '0')} / {String(groups.length).padStart(2, '0')}
                  </p>
                  <h3 className="display mt-3 text-2xl leading-[1.1] md:text-[28px]" style={{ fontWeight: 500 }}>
                    {g.category}
                  </h3>
                  <p className="mt-3 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
                    {g.items.length} certificados
                  </p>
                </div>

                <ul className="md:col-span-9">
                  <li className="rule mb-2" aria-hidden />
                  {g.items.map((c, i) => (
                    <li
                      key={`${c.title}-${i}`}
                      className="group relative border-b py-4"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                        style={{
                          width: '100%',
                          background:
                            'linear-gradient(90deg, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%)',
                        }}
                      />
                      <div className="relative grid items-baseline gap-y-1.5 md:grid-cols-12 md:gap-x-6">
                        <div className="flex items-baseline gap-3 md:col-span-8 md:gap-4">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.18em] tabular shrink-0"
                            style={{ color: 'var(--fg-muted)' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="body-serif text-[16px] leading-[1.3] md:text-[19px]">
                            {c.title}
                          </span>
                        </div>

                        <div className="pl-8 md:col-span-4 md:pl-0 md:text-right">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: 'var(--fg-muted)' }}
                          >
                            {c.issuer}
                            <span
                              style={{ color: 'var(--accent)' }}
                              className="ml-2 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              ✓
                            </span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
