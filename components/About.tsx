import { getDict, type Locale } from '@/config/i18n';

export function About({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).about;
  const [first, ...rest] = t.paragraphs;
  const dropChar = first.charAt(0);
  const firstRest = first.slice(1);

  return (
    <section id="sobre" className="section">
      <div className="frame">

        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">{t.marker}</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <h2 className="display text-display-md flex items-baseline gap-4" style={{ fontWeight: 500 }}>
              {t.headingA}
              <span className="italic" style={{ color: 'var(--accent-ink)' }}>
                {t.headingB}
              </span>
            </h2>
          </div>
        </div>

        <div className="reveal mt-16 grid gap-12 md:grid-cols-12 md:gap-x-8">

          <aside className="order-2 md:order-1 md:col-span-3 space-y-10">
            <div>
              <p className="kicker mb-3">{t.expLabel}</p>
              <p className="display text-5xl tabular md:text-6xl" style={{ fontWeight: 500 }}>
                15
                <span className="text-3xl align-top" style={{ color: 'var(--accent-ink)' }}>+</span>
              </p>
              <p className="mt-2 text-[13px] leading-[1.5]" style={{ color: 'var(--fg-muted)' }}>
                {t.expText}
              </p>
            </div>

            <div className="rule" />

            <div>
              <p className="kicker mb-3">{t.eduLabel}</p>
              <p className="body-serif text-2xl leading-[1.1]">{t.eduDegree}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] tabular" style={{ color: 'var(--fg-muted)' }}>
                {t.eduMeta}
              </p>
            </div>

            <div className="rule" />

            <div>
              <p className="kicker mb-3">{t.studyLabel}</p>
              <ul className="space-y-2 text-[14px]" style={{ color: 'var(--fg-soft)' }}>
                {t.studyItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="font-mono text-[10px]" style={{ color: 'var(--accent-ink)' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

<div className="order-1 md:order-2 md:col-span-9">

            <p className="body-serif text-[19px] leading-[1.65] md:text-[22px] md:leading-[1.55]" style={{ color: 'var(--fg-soft)' }}>
              <span
                className="float-left mr-3 mt-1 leading-[0.85]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 14vw, 7rem)',
                  color: 'var(--accent-ink)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                {dropChar}
              </span>
              {firstRest}
            </p>

<div className="mt-6 space-y-5 text-[17px] leading-[1.7]" style={{ color: 'var(--fg-soft)' }}>
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

<figure
              className="my-12 border-l-[3px] pl-6 md:my-16 md:pl-10"
              style={{ borderColor: 'var(--fg)' }}
            >
              <blockquote className="display hang text-2xl leading-[1.25] md:text-[34px]" style={{ fontWeight: 400, fontStyle: 'italic' }}>
                {t.quoteBefore}
                <span className="hl">{t.quoteHl}</span>
                {t.quoteAfter}
              </blockquote>
              <figcaption className="kicker mt-4">{t.quoteAttribution}</figcaption>
            </figure>

<div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--fg-muted)' }}>
              {t.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
