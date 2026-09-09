import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { site } from '@/config/site';
import { palette } from '@/config/theme';
import { contrastRatio, wcagLevel } from '@/lib/contrast';
import {
  LOCALES,
  getDict,
  isLocale,
  languageAlternates,
  localePath,
  type Locale,
} from '@/config/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

type Params = { locale: string };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).style;
  const title = `${t.titleA} ${t.titleB} — ${t.kicker} · ${site.name}`;

  return {
    title,
    description: t.lede,
    alternates: {
      canonical: `${site.url}${localePath(locale, '/estilo')}`,
      languages: languageAlternates('/estilo'),
    },
    openGraph: {
      title,
      description: t.lede,
      url: `${site.url}${localePath(locale, '/estilo')}`,
      siteName: site.name,
      type: 'article',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

/** Tokens de texto, na ordem em que a hierarquia os usa. */
const TEXT_TOKENS = ['--fg', '--fg-soft', '--fg-muted', '--accent-2', '--danger'] as const;
const SURFACES = ['--bg', '--bg-deep'] as const;

const TYPE_SCALE = [
  { token: 'display', label: 'Display', className: 'display text-display-md' },
  { token: 'body-serif', label: 'Serifada', className: 'body-serif text-2xl' },
  { token: 'corpo', label: 'Corpo', className: 'text-[17px]' },
  { token: 'kicker', label: 'Kicker', className: 'kicker' },
  { token: 'marker', label: 'Marker', className: 'marker' },
] as const;

const WEIGHTS = [200, 300, 400, 500, 600, 700, 800] as const;

const SCENES = [
  { attr: 'data-scroll-heading', pt: 'Título sobe acompanhando a rolagem', en: 'Heading rises with the scroll' },
  { attr: 'data-scroll-card', pt: 'Bloco entra ao aparecer, desfaz ao voltar', en: 'Block enters on reveal, reverses on the way back' },
  { attr: 'data-scroll-stagger', pt: 'Filhos entram em cascata', en: 'Children enter in cascade' },
  { attr: 'data-scroll-image', pt: 'Imagem desliza e assenta a escala', en: 'Image slides and settles its scale' },
  { attr: 'data-parallax', pt: 'Deslocamento contínuo, em fração da janela', en: 'Continuous shift, as a fraction of the viewport' },
] as const;

export default async function StylePage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const t = getDict(locale).style;

  return (
    <>
      <Navbar locale={locale} />

      <main id="main">
        <section className="section">
          <div className="frame">
            <Link
              href={localePath(locale)}
              className="kicker inline-flex items-center gap-2 transition-colors hover:text-[color:var(--accent-ink)]"
            >
              <ArrowLeft size={13} />
              {t.back}
            </Link>

            <div className="mt-10 grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="marker">{t.kicker}</p>
              </div>
              <div className="md:col-span-9">
                <div className="rule-thick mb-6" />
                <h1 data-scroll-heading className="display text-display-lg">
                  {t.titleA}{' '}
                  <span className="italic" style={{ color: 'var(--accent-ink)' }}>
                    {t.titleB}
                  </span>
                </h1>
                <p
                  className="body-serif mt-6 max-w-2xl text-[19px] leading-[1.6]"
                  style={{ color: 'var(--fg-soft)' }}
                >
                  {t.lede}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Cor ---------------- */}
        <section className="section" style={{ background: 'color-mix(in srgb, var(--bg-deep) 60%, var(--bg))' }}>
          <div className="frame">
            <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="marker">{t.colorMarker}</p>
              </div>
              <div className="md:col-span-9">
                <div className="rule-thick mb-6" />
                <h2 data-scroll-heading className="display text-display-md">
                  {t.colorTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-[1.65]" style={{ color: 'var(--fg-soft)' }}>
                  {t.colorDesc}
                </p>
              </div>
            </div>

            {(['light', 'dark'] as const).map((theme) => (
              <div key={theme} className="mt-14">
                <p className="kicker mb-4">
                  {theme === 'light' ? 'Tema claro' : 'Tema escuro'}
                </p>

                <div
                  className="overflow-hidden"
                  style={{ borderRadius: 'var(--r-md)', border: '1px solid var(--rule)' }}
                >
                  <div style={{ background: palette[theme]['--bg'], padding: '1.75rem' }}>
                    <ul data-scroll-stagger className="grid gap-x-8 sm:grid-cols-2">
                      {TEXT_TOKENS.map((token) => {
                        const value = palette[theme][token];
                        return (
                          <li
                            key={token}
                            className="flex items-baseline justify-between gap-4 border-b py-3"
                            style={{ borderColor: palette[theme]['--rule'] }}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden
                                style={{
                                  display: 'inline-block',
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  background: value,
                                  border: `1px solid ${palette[theme]['--rule']}`,
                                }}
                              />
                              <span
                                className="font-mono text-[11px] tracking-[0.1em]"
                                style={{ color: palette[theme]['--fg'] }}
                              >
                                {token}
                              </span>
                            </span>
                            <span className="flex items-center gap-4">
                              <span
                                className="font-mono text-[10px] tabular"
                                style={{ color: palette[theme]['--fg-muted'] }}
                              >
                                {value}
                              </span>
                              {SURFACES.map((surface) => {
                                const ratio = contrastRatio(value, palette[theme][surface]);
                                return (
                                  <span
                                    key={surface}
                                    className="font-mono text-[10px] tabular"
                                    title={`${token} ${t.onSurface(surface)}`}
                                    style={{ color: palette[theme]['--accent-2'] }}
                                  >
                                    {ratio.toFixed(2)}
                                    <span style={{ color: palette[theme]['--fg-muted'] }}>
                                      {' '}
                                      {wcagLevel(ratio)}
                                    </span>
                                  </span>
                                );
                              })}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <p className="mt-6 max-w-2xl text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
              {t.contrastNote}
            </p>
            <p className="mt-3 max-w-2xl text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
              {t.ruleNote}
            </p>
          </div>
        </section>

        {/* ---------------- Tipografia ---------------- */}
        <section className="section">
          <div className="frame">
            <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="marker">{t.typeMarker}</p>
              </div>
              <div className="md:col-span-9">
                <div className="rule-thick mb-6" />
                <h2 data-scroll-heading className="display text-display-md">
                  {t.typeTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-[1.65]" style={{ color: 'var(--fg-soft)' }}>
                  {t.typeDesc}
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-y-10 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="kicker">{t.scaleLabel}</p>
              </div>
              <ul data-scroll-stagger className="md:col-span-9">
                {TYPE_SCALE.map((step) => (
                  <li
                    key={step.token}
                    className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b py-5"
                    style={{ borderColor: 'var(--rule)' }}
                  >
                    <span className={step.className}>{t.sampleText}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--fg-muted)' }}>
                      .{step.token}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 grid gap-y-8 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="kicker">{t.axisLabel}</p>
                <p className="mt-2 font-mono text-[11px] tabular" style={{ color: 'var(--fg-muted)' }}>
                  Newsreader · 200–800
                </p>
              </div>
              <ul data-scroll-stagger className="md:col-span-9">
                {WEIGHTS.map((weight) => (
                  <li
                    key={weight}
                    className="flex items-baseline justify-between gap-6 border-b py-3"
                    style={{ borderColor: 'var(--rule)' }}
                  >
                    <span className="display text-2xl md:text-3xl" style={{ fontWeight: weight }}>
                      {t.sampleText}
                    </span>
                    <span className="font-mono text-[10px] tabular" style={{ color: 'var(--fg-muted)' }}>
                      {weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- Peças ---------------- */}
        <section className="section" style={{ background: 'color-mix(in srgb, var(--bg-deep) 60%, var(--bg))' }}>
          <div className="frame">
            <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="marker">{t.componentMarker}</p>
              </div>
              <div className="md:col-span-9">
                <div className="rule-thick mb-6" />
                <h2 data-scroll-heading className="display text-display-md">
                  {t.componentTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-[1.65]" style={{ color: 'var(--fg-soft)' }}>
                  {t.componentDesc}
                </p>
              </div>
            </div>

            <div data-scroll-card className="mt-14 grid gap-y-10 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="kicker">.pill · .pill-solid</p>
              </div>
              <div className="md:col-span-9 flex flex-wrap items-center gap-3">
                <span className="pill-solid">Sólido</span>
                <span className="pill">Contorno</span>
              </div>
            </div>

            <div data-scroll-card className="mt-10 grid gap-y-6 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="kicker">.rule · .rule-thick</p>
              </div>
              <div className="md:col-span-9">
                <div className="rule mb-5" />
                <div className="rule-thick" />
              </div>
            </div>

            <div data-scroll-card className="mt-10 grid gap-y-6 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="kicker">.hl · .hang</p>
              </div>
              <div className="md:col-span-9">
                <p className="body-serif text-xl leading-[1.5]" style={{ color: 'var(--fg-soft)' }}>
                  Um trecho comum com <span className="hl">o realce aplicado no meio</span> da frase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Movimento ---------------- */}
        <section className="section">
          <div className="frame">
            <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-3">
                <p className="marker">{t.motionMarker}</p>
              </div>
              <div className="md:col-span-9">
                <div className="rule-thick mb-6" />
                <h2 data-scroll-heading className="display text-display-md">
                  {t.motionTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-[1.65]" style={{ color: 'var(--fg-soft)' }}>
                  {t.motionDesc}
                </p>
              </div>
            </div>

            <ul data-scroll-stagger className="mt-14">
              {SCENES.map((scene) => (
                <li
                  key={scene.attr}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b py-4"
                  style={{ borderColor: 'var(--rule)' }}
                >
                  <code className="font-mono text-[12px]" style={{ color: 'var(--accent-ink)' }}>
                    [{scene.attr}]
                  </code>
                  <span className="text-[15px]" style={{ color: 'var(--fg-soft)' }}>
                    {locale === 'pt' ? scene.pt : scene.en}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-2xl text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
              {t.motionRespect}
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
