import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';
import { SkillIcon } from './SkillIcon';

export function Skills({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).skills;
  const totalItems = site.skills.reduce((a, g) => a + g.items.length, 0);

  return (
    <section id="skills" className="section" style={{ background: 'color-mix(in srgb, var(--bg-deep) 60%, var(--bg))' }}>
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
                {t.index(totalItems)}
              </p>
            </div>
          </div>
        </div>

<div className="mt-16 space-y-16">
          {site.skills.map((group, gIndex) => (
            <div
              key={group.category}
              className="reveal grid gap-y-8 md:grid-cols-12 md:gap-x-8"
            >

              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--accent-ink)' }}>
                  {String(gIndex + 1).padStart(2, '0')} / {String(site.skills.length).padStart(2, '0')}
                </p>
                <h3 className="display mt-3 text-2xl leading-[1.1] md:text-[28px]" style={{ fontWeight: 500 }}>
                  {t.categories[group.category] ?? group.category}
                </h3>
                <p className="mt-3 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
                  {t.tech(group.items.length)}
                </p>
              </div>

              {/* Grade em vez de uma linha por item: 22 tecnologias em lista
                  corrida gastavam mais de mil pixels de altura para dizer o que
                  cabe em nove fileiras. O ícone e o nome bastam — a numeração e
                  o rótulo de hover eram moldura que só existia porque a linha
                  era larga demais. */}
              <ul className="md:col-span-9 grid grid-cols-2 gap-x-6 sm:grid-cols-3 md:gap-x-8">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="group flex items-center gap-3 border-b py-3"
                    style={{ borderColor: 'var(--rule)' }}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--fg-soft)] transition-colors duration-300 group-hover:text-[color:var(--accent-ink)]">
                      <SkillIcon iconName={skill.icon} label={skill.name} size={18} />
                    </span>
                    <span
                      className="body-serif truncate text-[15px] leading-tight transition-colors duration-300 md:text-[17px]"
                      style={{ color: 'var(--fg)' }}
                    >
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
