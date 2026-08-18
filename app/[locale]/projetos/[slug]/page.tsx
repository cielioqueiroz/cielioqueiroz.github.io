import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import { site } from '@/config/site';
import { jsonLd } from '@/lib/json-ld';
import {
  LOCALES,
  getDict,
  isLocale,
  languageAlternates,
  localePath,
  type Locale,
} from '@/config/i18n';
import { caseStudies, getCaseStudy, resolveCaseStudy } from '@/content/case-studies';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => caseStudies.map((cs) => ({ locale, slug: cs.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const cs = getCaseStudy(slug, locale);
  if (!cs) return { title: getDict(locale).projectPage.notFoundTitle };

  const t = getDict(locale).projectPage;
  const path = `/projetos/${cs.slug}`;
  const title = `${cs.name} — ${t.metaSuffix} · ${site.name}`;

  return {
    title,
    description: cs.summary,
    alternates: {
      canonical: `${site.url}${localePath(locale, path)}`,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description: cs.summary,
      url: `${site.url}${localePath(locale, path)}`,
      siteName: site.name,
      type: 'article',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description: cs.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const cs = getCaseStudy(slug, locale);
  if (!cs) notFound();

  const t = getDict(locale).projectPage;
  const backHref = `${localePath(locale)}#projetos`;

  // Próximo caso da lista, circular — dá para percorrer o portfólio inteiro
  // sem voltar para a home.
  const currentIndex = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = resolveCaseStudy(caseStudies[(currentIndex + 1) % caseStudies.length], locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: cs.name,
    abstract: cs.summary,
    author: { '@type': 'Person', name: site.fullName },
    url: `${site.url}${localePath(locale, `/projetos/${cs.slug}`)}`,
    codeRepository: cs.repo,
    keywords: cs.stack.join(', '),
    inLanguage: getDict(locale).htmlLang,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <Navbar locale={locale} />

      <main id="main">
        <article>
          {/* Capa — o número do caso em escala editorial, sem grid 3/9. */}
          <header className="frame pt-10 md:pt-14">
            <div
              className="animate-fade flex flex-wrap items-center justify-between gap-3 border-t pb-3"
              style={{ borderColor: 'var(--fg)' }}
            >
              <Link href={backHref} className="marker tabular pt-3 inline-flex items-center gap-2">
                <ArrowLeft size={12} />
                {t.back}
              </Link>
              <div className="kicker tabular pt-3">{t.kicker}</div>
            </div>

            <div className="pt-14 pb-16 md:pt-20 md:pb-24">
              <h1
                className="display animate-rise stagger-1"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(2.75rem, 9vw, 7rem)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.03em',
                }}
              >
                {cs.name}
                <span style={{ color: 'var(--accent-ink)' }}>.</span>
              </h1>

              <p
                className="body-serif mt-8 max-w-2xl animate-rise stagger-2 text-xl leading-[1.45] md:text-2xl"
                style={{ color: 'var(--fg-soft)' }}
              >
                {cs.summary}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3 animate-rise stagger-3">
                <a href={cs.repo} target="_blank" rel="noopener noreferrer" className="pill-solid group">
                  {t.repoBtn}
                  <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                </a>
                {cs.demo && (
                  <a href={cs.demo} target="_blank" rel="noopener noreferrer" className="pill group">
                    {t.demoBtn}
                    <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Corpo — coluna estreita de leitura, deslocada. Ritmo diferente do
              grid 3/9 que domina a home. */}
          <div className="frame pb-24 md:pb-32">
            <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-7 md:col-start-4">
                <section className="reveal">
                  <h2 className="section-label mb-5">{t.contextLabel}</h2>
                  <p className="text-[17px] leading-[1.7]" style={{ color: 'var(--fg-soft)' }}>
                    {cs.context}
                  </p>
                </section>

                <section className="reveal mt-14">
                  <h2 className="section-label mb-5">{t.solutionLabel}</h2>
                  <p className="text-[17px] leading-[1.7]" style={{ color: 'var(--fg-soft)' }}>
                    {cs.solution}
                  </p>
                </section>

                <section className="reveal mt-14">
                  <h2 className="section-label mb-5">{t.stackLabel}</h2>
                  <ul className="flex flex-wrap gap-2">
                    {cs.stack.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-[11px] uppercase tracking-[0.16em] px-3 py-1.5"
                        style={{ border: '1px solid var(--rule)', color: 'var(--fg-soft)' }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="reveal mt-16 border-t pt-10"
                  style={{ borderColor: 'var(--fg)' }}
                >
                  <h2 className="section-label mb-5">{t.takeawayLabel}</h2>
                  <p
                    className="body-serif text-2xl italic leading-[1.4] md:text-[28px]"
                    style={{ color: 'var(--fg)' }}
                  >
                    {cs.takeaway}
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Próximo caso — navegação, não conteúdo do artigo: por isso <nav> e
              não um <h2>, que competiria com as seções do estudo de caso. */}
          <nav aria-label={t.nextLabel} className="frame pb-24 md:pb-32">
            <Link
              href={localePath(locale, `/projetos/${next.slug}`)}
              className="group block border-t pt-10"
              style={{ borderColor: 'var(--fg)' }}
            >
              <p className="kicker mb-3">{t.nextLabel}</p>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p
                  className="display text-3xl leading-[1.05] transition-colors md:text-5xl group-hover:text-[color:var(--accent-ink)]"
                  style={{ fontWeight: 500 }}
                >
                  {next.name}
                </p>
                <ArrowRight
                  size={28}
                  strokeWidth={1.25}
                  className="transition-transform group-hover:translate-x-2"
                  style={{ color: 'var(--fg-muted)' }}
                />
              </div>
            </Link>
          </nav>
        </article>
      </main>

      <Footer locale={locale} />
    </>
  );
}
