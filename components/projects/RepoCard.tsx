import { ArrowUpRight, Star, GitFork } from 'lucide-react';
import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';
import { prettyRepoName, type Repo } from '@/lib/github';
import { Tilt3D } from '../Tilt3D';

/** Cor da bolinha por linguagem — as do GitHub, para leitura instantânea. */
const langColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Python: '#3776AB',
  Java: '#B07219',
};

function formatPushed(iso: string, numberLocale: string): string {
  try {
    return new Date(iso).toLocaleDateString(numberLocale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function RepoCard({
  repo,
  index,
  isPinned,
  locale,
}: {
  repo: Repo;
  index: number;
  isPinned: boolean;
  locale: Locale;
}) {
  const dict = getDict(locale);
  const t = dict.projects;

  const demoUrl =
    repo.homepage || (repo.has_pages ? `https://${site.githubUsername}.github.io/${repo.name}` : null);
  const primaryUrl = demoUrl || repo.html_url;

  // A descrição de fallback passou a vir do dicionário: antes era uma string
  // em português cravada no lib/github.ts, que aparecia na versão inglesa.
  const description = repo.description ?? t.repoFallback(prettyRepoName(repo.name));

  return (
    <Tilt3D max={9} lift={14} className="group glass depth-2 h-full" style={{ borderRadius: 'var(--r-md)' }}>
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-full flex-col p-7 md:p-8"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-baseline gap-3">
            <span
              className="display tabular text-5xl leading-none md:text-6xl"
              style={{ fontWeight: 500, color: 'var(--fg-muted)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {isPinned && (
              <span
                className="font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--accent-ink)' }}
              >
                {t.pinned}
              </span>
            )}
          </div>
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-45 group-hover:scale-110"
            style={{ border: '1px solid var(--rule)', color: 'var(--fg-soft)' }}
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="transition-colors group-hover:text-[color:var(--accent-ink)]"
            />
          </span>
        </div>

        <h4
          className="display mt-6 text-2xl leading-[1.12] transition-colors md:text-[30px] group-hover:text-[color:var(--accent-ink)]"
          style={{ fontWeight: 500 }}
        >
          {prettyRepoName(repo.name)}
        </h4>
        <p className="mt-3 text-[15px] leading-[1.55]" style={{ color: 'var(--fg-soft)' }}>
          {description}
        </p>

        <div
          className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] tabular"
          style={{ color: 'var(--fg-muted)' }}
        >
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: langColors[repo.language] || '#94a3b8' }}
              />
              {repo.language}
            </span>
          )}
          <span>{formatPushed(repo.pushed_at, dict.numberLocale)}</span>
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star size={10} /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <GitFork size={10} /> {repo.forks_count}
            </span>
          )}
          {demoUrl && <span style={{ color: 'var(--accent-ink)' }}>{t.liveDemo}</span>}
        </div>
      </a>
    </Tilt3D>
  );
}
