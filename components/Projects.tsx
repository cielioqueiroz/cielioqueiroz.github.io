'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchUserRepos, fetchPinnedRepoNames, sortRepos, repoDisplayDescription, type Repo } from '@/lib/github';
import { site } from '@/config/site';
import { ArrowUpRight, Star, GitFork, RefreshCw } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

/** Quantos repositórios exibir na vitrine; o resto fica no "Ver tudo no GitHub". */
const MAX_VISIBLE = 10;

const langColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Python: '#3776AB',
  Java: '#B07219',
};

function formatPushed(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

function timeAgo(d: Date): string {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 5) return 'agora mesmo';
  if (s < 60) return `há ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h`;
  return d.toLocaleDateString('pt-BR');
}

function RepoRow({ repo, index, isPinned }: { repo: Repo; index: number; isPinned: boolean }) {
  const demoUrl =
    repo.homepage ||
    (repo.has_pages ? `https://${site.githubUsername}.github.io/${repo.name}` : null);
  const primaryUrl = demoUrl || repo.html_url;

  const prettyName = repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Tilt3D
      max={9}
      lift={14}
      className="group glass depth-2 h-full"
      style={{ borderRadius: 'var(--r-md)' }}
    >
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-full flex-col p-7 md:p-8"
        data-cursor
        data-cursor-label={demoUrl ? 'ver demo' : 'ver código'}
      >
        {/* topo: número + fixado / seta */}
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
                ◆ fixado
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

        {/* título + descrição */}
        <h3
          className="display mt-6 text-2xl leading-[1.12] transition-colors md:text-[30px] group-hover:text-[color:var(--accent-ink)]"
          style={{ fontWeight: 500 }}
        >
          {prettyName}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.55]" style={{ color: 'var(--fg-soft)' }}>
          {repoDisplayDescription(repo)}
        </p>

        {/* meta — empurrada para a base do card */}
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
          <span>{formatPushed(repo.pushed_at)}</span>
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
          {demoUrl && <span style={{ color: 'var(--accent-ink)' }}>◆ Demo ao vivo</span>}
        </div>
      </a>
    </Tilt3D>
  );
}

function SkeletonRow({ index }: { index: number }) {
  return (
    <div className="glass depth-1 flex h-full flex-col p-7 md:p-8" style={{ borderRadius: 'var(--r-md)' }}>
      <span
        className="display tabular text-5xl leading-none md:text-6xl"
        style={{ fontWeight: 500, color: 'var(--fg-muted)', opacity: 0.3 }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="mt-6 space-y-3">
        <div
          className="h-7 w-2/3 animate-pulse rounded-md md:h-8"
          style={{ background: 'color-mix(in srgb, var(--fg) 10%, transparent)' }}
        />
        <div
          className="h-4 w-5/6 animate-pulse rounded-md"
          style={{ background: 'color-mix(in srgb, var(--fg) 6%, transparent)' }}
        />
        <div
          className="h-4 w-1/3 animate-pulse rounded-md"
          style={{ background: 'color-mix(in srgb, var(--fg) 4%, transparent)' }}
        />
      </div>
    </div>
  );
}

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; repos: Repo[]; pinned: string[]; total: number; updatedAt: Date }
  | { kind: 'error'; message: string };

export function Projects() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [refreshTick, setRefreshTick] = useState(0);

  const load = useCallback(async () => {
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 12000);
    setState({ kind: 'loading' });
    try {
      const [repos, pinned] = await Promise.all([
        fetchUserRepos(ctrl.signal),
        fetchPinnedRepoNames(ctrl.signal),
      ]);
      clearTimeout(timeoutId);
      setState({
        kind: 'ok',
        repos: sortRepos(repos, pinned),
        pinned,
        total: repos.length,
        updatedAt: new Date(),
      });
    } catch (e) {
      clearTimeout(timeoutId);
      const msg =
        e instanceof Error
          ? e.message
          : 'Falha ao consultar GitHub.';
      setState({ kind: 'error', message: msg });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const id = setInterval(() => setRefreshTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && state.kind === 'ok') {
        const age = Date.now() - state.updatedAt.getTime();
        if (age > 60_000) void load();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [state, load]);

  const isLoading = state.kind === 'loading' || state.kind === 'idle';
  const allRepos = state.kind === 'ok' ? state.repos : [];
  const repos = allRepos.slice(0, MAX_VISIBLE);
  const total = state.kind === 'ok' ? state.total : 0;
  const pinnedSet = state.kind === 'ok' ? new Set(state.pinned) : new Set<string>();

  return (
    <section id="projetos" className="section">
      <div className="frame">
        
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">§ 03</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-display-md" style={{ fontWeight: 500 }}>
                Projetos <span className="italic" style={{ color: 'var(--accent-ink)' }}>arquivados</span>.
              </h2>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <p className="max-w-sm text-[13px] leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
                  Lista atualizada em tempo real via{' '}
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-grow"
                    style={{ color: 'var(--fg-soft)' }}
                  >
                    GitHub API
                  </a>
                  . Fixados (pinned) primeiro, depois por data de push.
                </p>
                <div className="flex items-center gap-3">
                  {state.kind === 'ok' && (
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] tabular"
                      style={{ color: 'var(--accent-ink)' }}
                      key={refreshTick}
                    >
                      <span
                        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                        style={{ background: 'var(--accent)' }}
                      />
                      Atualizado {timeAgo(state.updatedAt)}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => void load()}
                    disabled={isLoading}
                    aria-label="Atualizar lista"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110 disabled:opacity-50"
                    style={{ border: '1px solid var(--rule)', color: 'var(--fg-soft)' }}
                  >
                    <RefreshCw
                      size={12}
                      strokeWidth={1.5}
                      className={isLoading ? 'animate-spin' : ''}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          {state.kind === 'error' ? (
            <div className="rule-thick mb-0">
              <p
                className="body-serif mt-8 text-xl italic"
                style={{ color: 'var(--fg-muted)' }}
              >
                Não foi possível consultar a GitHub API agora ({state.message}). Tente{' '}
                <button
                  type="button"
                  onClick={() => void load()}
                  className="underline-grow"
                  style={{ color: 'var(--accent-ink)' }}
                >
                  recarregar
                </button>{' '}
                ou visite o{' '}
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-grow"
                  style={{ color: 'var(--accent-ink)' }}
                >
                  perfil no GitHub
                </a>
                .
              </p>
            </div>
          ) : isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} index={i} />
              ))}
            </div>
          ) : repos.length === 0 ? (
            <p className="body-serif text-xl italic" style={{ color: 'var(--fg-muted)' }}>
              Nenhum projeto público no momento. Visite o{' '}
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-grow"
                style={{ color: 'var(--accent-ink)' }}
              >
                perfil no GitHub
              </a>
              .
            </p>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                {repos.map((repo, i) => (
                  <RepoRow key={repo.id} repo={repo} index={i} isPinned={pinnedSet.has(repo.name)} />
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--fg-muted)' }}>
                  Exibindo {repos.length} de {total} repositórios públicos · dados via GitHub API
                </p>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill group"
                >
                  Ver tudo no GitHub <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
