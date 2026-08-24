import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';
import { computeDre } from '@/lib/dre';
import { dreModel } from '@/content/financials';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail, ArrowDownRight } from 'lucide-react';
import { Portrait } from './Portrait';
import { CVButton } from './CVButton';
import { CopyEmailButton } from './CopyEmailButton';
import { Tilt3D } from './Tilt3D';
import { Hero3DMount } from './Hero3DMount';
import { SplitReveal } from './SplitReveal';
import { AuroraBackdrop } from './AuroraBackdrop';

export function Hero({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale);
  const today = new Date().toLocaleDateString(t.numberLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  /**
   * A tese do site em quatro números.
   *
   * Eles moravam só na § 06, no fim da página — onde boa parte de quem abre o
   * site nunca chega. Na capa eles provam, na primeira tela, o que a tagline
   * apenas afirma: que aqui tem alguém que fala a língua do negócio.
   *
   * Custo: zero JavaScript novo. É a mesma função pura da DRE, executada no
   * servidor, com os mesmos valores que os testes travam.
   */
  const dre = computeDre(dreModel, 1);
  const pct = (id: string, signed = false) => {
    const v = dre.kpis.find((k) => k.id === id)?.value ?? 0;
    const n = (v * 100).toLocaleString(t.numberLocale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${signed && v >= 0 ? '+' : ''}${n}%`;
  };
  const heroKpis = [
    { label: t.hero.kpis.gross, value: pct('grossMargin') },
    { label: t.hero.kpis.ebitda, value: pct('ebitdaMargin') },
    { label: t.hero.kpis.net, value: pct('netMargin') },
    { label: t.hero.kpis.yoy, value: pct('revenueYoY', true) },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <AuroraBackdrop />
      <Hero3DMount />

      <div className="relative z-[2] frame pt-10 md:pt-14">
        <div className="animate-fade flex flex-wrap items-center justify-between gap-3 border-t pb-3" style={{ borderColor: 'var(--fg)' }}>
          <div className="kicker tabular pt-3">
            {t.hero.kicker}
          </div>
          <div className="kicker tabular pt-3">
            {site.location}
          </div>
          <div className="kicker tabular pt-3">
            {today}
          </div>
        </div>
      </div>

      <div className="relative z-[2] frame pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">

          <aside className="order-2 md:order-1 md:col-span-3 md:pt-4">

            <figure className="animate-rise stagger-1 mx-auto mb-6 max-w-[280px] md:max-w-none">
              {/* borderRadius no wrapper: a sombra depth-3 e o glare seguem o
                  raio — sem ele, o brilho branco desenha um retângulo por trás
                  da moldura arredondada */}
              <Tilt3D
                max={10}
                lift={18}
                spotlight={false}
                className="depth-3"
                style={{ borderRadius: 'var(--r-lg)' }}
              >
                <Portrait locale={locale} />
              </Tilt3D>
              <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] tabular" style={{ color: 'var(--fg-muted)' }}>
                <span>
                  <span style={{ color: 'var(--accent-ink)' }}>●</span> {t.hero.portrait}
                </span>
                <span>{t.hero.portraitNo}</span>
              </figcaption>
            </figure>

            <p className="marker mb-4 animate-rise stagger-2">
              <span className="inline-block w-8" style={{ borderTop: '2px solid var(--accent-ink)', verticalAlign: 'middle', marginRight: '0.5rem' }} />
              {t.hero.aboutCover}
            </p>
            <p className="animate-rise stagger-3 text-[14px] leading-[1.55]" style={{ color: 'var(--fg-soft)' }}>
              {t.hero.coverText}
            </p>

            <div className="rule mt-8 mb-6" />

            <dl className="animate-rise stagger-4 space-y-3 font-mono text-[11px] uppercase tracking-[0.16em] tabular">
              <div className="flex justify-between">
                <dt style={{ color: 'var(--fg-muted)' }}>{t.hero.statusLabel}</dt>
                <dd className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: 'var(--accent)' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
                  </span>
                  {t.hero.statusValue}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--fg-muted)' }}>{t.hero.focusLabel}</dt>
                <dd>{t.hero.focusValue}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--fg-muted)' }}>{t.hero.langsLabel}</dt>
                <dd>{t.hero.langsValue}</dd>
              </div>
            </dl>
          </aside>

<div className="order-1 md:order-2 md:col-span-9">
            <h1 className="display text-display-lg" style={{ fontWeight: 500 }}>
              <span className="block">
                <SplitReveal text="Ciélio" stagger={45} />
              </span>
              <span
                className="block italic"
                style={{ color: 'var(--accent-ink)' }}
              >
                <SplitReveal text="Queiroz" delay={280} stagger={50} italic />
                <span className="not-italic" style={{ color: 'var(--fg)' }}>.</span>
              </span>
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7 animate-rise stagger-4">
                <p className="body-serif text-2xl leading-[1.3] md:text-[28px]" style={{ color: 'var(--fg-soft)' }}>
                  {t.hero.lede.map((seg, i) =>
                    seg.em ? (
                      <em key={i} className="italic" style={{ color: 'var(--accent-ink)' }}>
                        {seg.text}
                      </em>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )}
                </p>
              </div>

              <div className="md:col-span-5 md:pl-8 animate-rise stagger-5" style={{ borderLeft: '1px solid var(--rule)' }}>
                <p className="kicker mb-3">{t.hero.summaryLabel}</p>
                <p className="text-sm leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
                  {t.hero.summaryText}
                </p>
              </div>
            </div>

<div className="mt-12 animate-rise stagger-6">
              <p className="kicker mb-4">{t.hero.kpisLabel}</p>
              <dl
                className="grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-6 sm:grid-cols-4"
                style={{ borderColor: 'var(--rule)' }}
              >
                {heroKpis.map((k) => (
                  <div key={k.label}>
                    <dt
                      className="font-mono text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {k.label}
                    </dt>
                    <dd
                      className="display tabular mt-2 text-[30px] leading-none md:text-[36px]"
                      style={{ fontWeight: 500 }}
                    >
                      {k.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.hero.kpisNote}
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 animate-rise stagger-6">
              <CVButton variant="solid" locale={locale} />
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group"
              >
                <FaLinkedin size={14} />
                LinkedIn
                <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group cursor-pointer"
              >
                <FaGithub size={14} />
                GitHub
                <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group cursor-pointer"
              >
                <FaInstagram size={14} />
                Instagram
                <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
              </a>

              <div
                role="group"
                aria-label={t.hero.emailGroupAria}
                className="group inline-flex items-center overflow-hidden font-mono text-[12px] uppercase tracking-[0.18em] transition-colors"
                style={{ border: '1.5px solid var(--fg)', borderRadius: 999, color: 'var(--fg)' }}
              >
                <a
                  href={`mailto:${site.socials.email}`}
                  className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 transition-colors hover:text-[color:var(--accent-ink)]"
                >
                  <Mail size={14} />
                  {t.hero.contact}
                  <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
                </a>
                <CopyEmailButton
                  locale={locale}
                  className="inline-flex items-center self-stretch border-l border-[var(--rule)] px-3 transition-colors hover:text-[color:var(--accent-ink)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

<div
        className="overflow-hidden border-y py-3 animate-fade"
        style={{ borderColor: 'var(--rule)' }}
      >
        <div className="flex w-max animate-ticker gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              {t.hero.ticker.map((item, j) => (
                <span key={j} style={j % 2 === 1 ? { color: 'var(--accent-ink)' } : undefined}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
