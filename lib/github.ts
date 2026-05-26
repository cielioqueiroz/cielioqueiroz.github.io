import { site } from '@/config/site';

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  has_pages: boolean;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const GITHUB_API = 'https://api.github.com';

export async function fetchUserRepos(): Promise<Repo[]> {
  const url = `${GITHUB_API}/users/${site.githubUsername}/repos?per_page=100&sort=updated`;
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status}: ${res.statusText}`);
      return [];
    }
    const repos = (await res.json()) as Repo[];
    const hidden: readonly string[] = site.hiddenRepos;
    return repos.filter((r) => !r.fork && !r.archived && !hidden.includes(r.name));
  } catch (err) {
    console.warn('Failed to fetch GitHub repos:', err);
    return [];
  }
}

/**
 * Ordena repos: featured (na ordem de site.featuredRepos) primeiro, depois o resto por data de push.
 */
export function sortRepos(repos: Repo[]): Repo[] {
  const featuredOrder = new Map<string, number>(
    site.featuredRepos.map((name, i) => [name, i])
  );
  const featured = repos
    .filter((r) => featuredOrder.has(r.name))
    .sort((a, b) => (featuredOrder.get(a.name)! - featuredOrder.get(b.name)!));
  const rest = repos
    .filter((r) => !featuredOrder.has(r.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  return [...featured, ...rest];
}

/**
 * Gera uma descrição amigável a partir do nome do repo quando description é nula.
 */
export function repoDisplayDescription(repo: Repo): string {
  if (repo.description) return repo.description;
  const pretty = repo.name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `Projeto: ${pretty}`;
}
