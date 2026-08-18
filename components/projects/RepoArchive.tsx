import { ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';
import { getShowcase } from '@/lib/github';
import { RepoCard } from './RepoCard';

/** Quantos repositórios exibir na vitrine; o resto fica no "Ver tudo no GitHub". */
const MAX_VISIBLE = 6;

/**
 * Vitrine de repositórios — Server Component.
 *
 * Não há mais estado de loading nem botão de recarregar: os dados chegam
 * prontos no HTML. O que era "ao vivo a cada visita" virou "revalidado de hora
 * em hora", que é mais honesto e não depende do navegador do visitante ter
 * cota sobrando na API do GitHub.
 */
export async function RepoArchive({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.projects;
  const showcase = await getShowcase();

  const fetchedLabel = showcase.ok
    ? new Date(showcase.fetchedAt).toLocaleDateString(dict.numberLocale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const repos = showcase.ok ? showcase.repos.slice(0, MAX_VISIBLE) : [];
  const pinned = new Set(showcase.ok ? showcase.pinned : []);

  return (
    <div className="mt-20 md:mt-28">
      <div
        className="reveal flex flex-wrap items-end justify-between gap-4 border-t pt-10"
        style={{ borderColor: 'var(--fg)' }}
      >
        <h3 className="display text-2xl leading-[1.1] md:text-[34px]" style={{ fontWeight: 500 }}>
          {t.archiveTitle}
        </h3>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <p className="max-w-sm text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
            {t.archiveDesc}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow"
              style={{ color: 'var(--fg-soft)' }}
            >
              GitHub API
            </a>
            {t.archiveDescAfter}
          </p>
          {fetchedLabel && (
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] tabular"
              style={{ color: 'var(--accent-ink)' }}
            >
              <span
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ background: 'var(--accent)' }}
              />
              {t.updated} {fetchedLabel}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {!showcase.ok ? (
          <p className="body-serif text-xl italic" style={{ color: 'var(--fg-muted)' }}>
            {t.errorPrefix} {t.errorOr}{' '}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow"
              style={{ color: 'var(--accent-ink)' }}
            >
              {t.errorProfile}
            </a>
            .
          </p>
        ) : repos.length === 0 ? (
          <p className="body-serif text-xl italic" style={{ color: 'var(--fg-muted)' }}>
            {t.empty}{' '}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow"
              style={{ color: 'var(--accent-ink)' }}
            >
              {t.errorProfile}
            </a>
            .
          </p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {repos.map((repo, i) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  index={i}
                  isPinned={pinned.has(repo.name)}
                  locale={locale}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.showing(repos.length, showcase.total)}
              </p>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group"
              >
                {t.viewAll}{' '}
                <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
