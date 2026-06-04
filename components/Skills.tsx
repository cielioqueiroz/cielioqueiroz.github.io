import { site } from '@/config/site';
import { SkillIcon } from './SkillIcon';

export function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'color-mix(in srgb, var(--bg-deep) 60%, var(--bg))' }}>
      <div className="frame">
        
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">§ 04</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="display text-display-md" style={{ fontWeight: 500 }}>
                Ferramentas <span className="italic" style={{ color: 'var(--accent-ink)' }}>&amp;</span> ofício.
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
                Índice · {site.skills.reduce((a, g) => a + g.items.length, 0)} itens
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
                  {group.category}
                </h3>
                <p className="mt-3 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
                  {group.items.length} tecnologias
                </p>
              </div>

<ul className="md:col-span-9">
                <li className="rule mb-2" aria-hidden />
                {group.items.map((skill, i) => (
                  <li
                    key={skill.name}
                    className="group relative flex items-center justify-between border-b py-4 transition-all duration-500 hover:[transform:translateX(6px)]"
                    style={{ borderColor: 'var(--rule)', perspective: '700px' }}
                  >

                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{
                        width: '100%',
                        background: `linear-gradient(90deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)`,
                      }}
                    />

                    <div className="relative flex items-center gap-5">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.18em] tabular w-6"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="flex h-8 w-8 items-center justify-center text-[color:var(--fg-soft)] transition-all duration-500 group-hover:text-[color:var(--accent-ink)] group-hover:[transform:translateZ(12px)_rotateY(-12deg)_scale(1.2)]"
                        style={{
                          transformStyle: 'preserve-3d',
                          filter: 'drop-shadow(0 4px 10px color-mix(in srgb, var(--accent) 25%, transparent))',
                        }}
                      >
                        <SkillIcon
                          iconName={skill.icon}
                          label={skill.name}
                          size={22}
                        />
                      </span>
                      <span
                        className="body-serif text-lg transition-colors md:text-xl"
                        style={{ color: 'var(--fg)' }}
                      >
                        {skill.name}
                      </span>
                    </div>

                    <span
                      className="relative font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                      style={{ color: 'var(--accent-ink)' }}
                    >
                      ◆ em uso
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
