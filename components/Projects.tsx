import { fetchUserRepos, sortRepos, repoDisplayDescription, type Repo } from '@/lib/github';
import { site } from '@/config/site';
import { Github, ExternalLink, Star, GitFork, Circle } from 'lucide-react';

const langColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Python: '#3776AB',
  Java: '#B07219',
};

function RepoCard({ repo }: { repo: Repo }) {
  const demoUrl =
    repo.homepage ||
    (repo.has_pages ? `https://${site.githubUsername}.github.io/${repo.name}` : null);

  return (
    <article className="card flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight">
          {repo.name.replace(/[-_]/g, ' ')}
        </h3>
        <Github size={18} className="shrink-0 text-slate-400" />
      </div>

      <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {repoDisplayDescription(repo)}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <Circle
              size={10}
              fill={langColors[repo.language] || '#94a3b8'}
              className="border-0"
              style={{ color: langColors[repo.language] || '#94a3b8' }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star size={12} /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork size={12} /> {repo.forks_count}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200"
        >
          <Github size={14} /> Código
        </a>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <ExternalLink size={14} /> Demo
          </a>
        )}
      </div>
    </article>
  );
}

export async function Projects() {
  const repos = await fetchUserRepos();
  const sorted = sortRepos(repos);

  return (
    <section id="projetos" className="section border-t border-slate-200 dark:border-slate-800">
      <div className="container-page">
        <h2 className="heading mb-3">
          <span className="text-accent">#</span> Projetos
        </h2>
        <p className="mb-10 text-slate-600 dark:text-slate-400">
          Projetos pessoais hospedados no{' '}
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
          . Atualizados automaticamente.
        </p>

        {sorted.length === 0 ? (
          <p className="text-slate-500">
            Não foi possível carregar projetos no momento. Veja meu{' '}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              perfil no GitHub
            </a>
            .
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
