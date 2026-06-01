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

export async function fetchUserRepos(signal?: AbortSignal): Promise<Repo[]> {
  const url = `${GITHUB_API}/users/${site.githubUsername}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal,
  });
  if (!res.ok) {
    throw new Error(`GitHub API retornou ${res.status}`);
  }
  const repos = (await res.json()) as Repo[];
  const hidden: readonly string[] = site.hiddenRepos;
  return repos.filter((r) => !r.fork && !r.archived && !hidden.includes(r.name));
}

/**
 * Lê os repositórios fixados (pinned) do perfil via endpoint público gratuito.
 * O GitHub só expõe pins pela API GraphQL autenticada; este serviço faz essa
 * ponte e tem CORS liberado, então funciona no navegador num site estático.
 * Retorna os nomes na ordem em que estão fixados. Em qualquer falha, retorna [].
 */
export async function fetchPinnedRepoNames(signal?: AbortSignal): Promise<string[]> {
  try {
    const url = `https://gh-pinned-repos.egoist.dev/?username=${site.githubUsername}`;
    const res = await fetch(url, { signal });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{ repo?: string }>;
    return data.map((p) => p.repo).filter((n): n is string => typeof n === 'string');
  } catch {
    return [];
  }
}

/**
 * Ordena os repositórios colocando os prioritários primeiro (na ordem dada) e o
 * restante por data de push, mais recente primeiro. A prioridade usa os pinned
 * quando disponíveis; senão cai na lista manual `featuredRepos` do config.
 */
export function sortRepos(repos: Repo[], pinnedNames: string[] = []): Repo[] {
  const priority = pinnedNames.length > 0 ? pinnedNames : [...site.featuredRepos];
  const priorityOrder = new Map<string, number>(priority.map((name, i) => [name, i]));
  const featured = repos
    .filter((r) => priorityOrder.has(r.name))
    .sort((a, b) => priorityOrder.get(a.name)! - priorityOrder.get(b.name)!);
  const rest = repos
    .filter((r) => !priorityOrder.has(r.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  return [...featured, ...rest];
}

export function repoDisplayDescription(repo: Repo): string {
  if (repo.description) return repo.description;
  const pretty = repo.name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `Projeto: ${pretty}`;
}
