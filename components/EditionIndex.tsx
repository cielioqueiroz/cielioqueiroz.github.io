import { ArrowRight } from 'lucide-react';
import { getDict, localePath, type Locale } from '@/config/i18n';
import { TransitionLink } from './TransitionLink';

/**
 * O índice da capa.
 *
 * Quando as seções saíram da home, a capa ficou sendo só o hero — e um
 * visitante que rolasse não encontrava mais nada. O índice devolve o caminho:
 * é a página dois de uma revista, listando o que a edição traz e onde.
 */
export function EditionIndex({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale);
  const entries = t.nav.links.map((link) => {
    const key = link.href.replace('/', '') as keyof typeof t.pages;
    return { ...link, description: t.pages[key].description };
  });

  return (
    <section id="indice" className="section">
      <div className="frame">
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">{t.index.kicker}</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <h2 data-scroll-heading className="display text-display-md">
              {t.nav.indexTitle}
            </h2>
          </div>
        </div>

        <ul data-scroll-stagger className="mt-14">
          {entries.map((entry) => (
            <li key={entry.href}>
              <TransitionLink
                href={localePath(locale, entry.href)}
                className="group grid gap-y-2 border-t py-8 md:grid-cols-12 md:gap-x-8"
                style={{ borderColor: 'var(--rule)' }}
              >
                <div className="md:col-span-3 flex items-baseline gap-4">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
                    style={{ color: 'var(--accent-ink)' }}
                  >
                    § {entry.n}
                  </span>
                  <span className="display text-2xl leading-[1.1] md:text-[30px]">
                    {entry.label}
                  </span>
                </div>

                <p
                  className="md:col-span-8 text-[15px] leading-[1.6]"
                  style={{ color: 'var(--fg-soft)' }}
                >
                  {entry.description}
                </p>

                <span
                  className="md:col-span-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] md:justify-end"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {t.index.read}
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
