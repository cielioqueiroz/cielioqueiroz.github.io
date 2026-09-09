import Link from 'next/link';
import { ArrowLeft, ArrowDownRight } from 'lucide-react';
import { site } from '@/config/site';
import { DEFAULT_LOCALE, getDict, localePath } from '@/config/i18n';

/**
 * O `not-found` do App Router não recebe `params`, então não há como saber o
 * idioma da URL que falhou. Usa o padrão — a alternativa seria transformar a
 * página em client component só para ler o pathname, o que custa mais do que
 * um 404 em português para um visitante de /en.
 */
export default function NotFound() {
  const locale = DEFAULT_LOCALE;
  const t = getDict(locale).notFound;

  return (
    <main className="flex min-h-screen flex-col">
      <div className="frame pt-10 md:pt-14">
        <div
          className="animate-fade flex flex-wrap items-center justify-between gap-3 border-t pb-3"
          style={{ borderColor: 'var(--fg)' }}
        >
          <div className="marker tabular pt-3">{t.section}</div>
          <div className="kicker tabular pt-3">{site.domain}</div>
        </div>
      </div>

      <div className="frame flex flex-1 flex-col justify-center py-20 md:py-28">
        <p className="marker mb-6 animate-rise stagger-1">
          <span
            className="mr-2 inline-block w-8 align-middle"
            style={{ borderTop: '2px solid var(--accent-ink)' }}
          />
          {t.kicker}
        </p>

        <h1
          className="display animate-rise stagger-2"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(3rem, 11vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="block">{t.titleA}</span>
          <span
            className="block italic"
            style={{ color: 'var(--accent-ink)' }}
          >
            {t.titleB}
          </span>
          <span className="block">
            {t.titleC}
            <span style={{ color: 'var(--accent-ink)' }}>.</span>
          </span>
        </h1>

        <p
          className="body-serif mt-10 max-w-xl animate-rise stagger-3 text-xl leading-[1.4] md:text-2xl"
          style={{ color: 'var(--fg-soft)' }}
        >
          {t.text}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3 animate-rise stagger-4">
          <Link href={localePath(locale)} className="pill-solid group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            {t.home}
          </Link>
          <Link href={`${localePath(locale)}#sobre`} className="pill">
            {t.index}
            <ArrowDownRight size={14} />
          </Link>
        </div>
      </div>

      <div className="frame pb-10">
        <div
          className="border-t pt-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular"
          style={{ borderColor: 'var(--rule)', color: 'var(--fg-muted)' }}
        >
          {t.edition}
        </div>
      </div>
    </main>
  );
}
