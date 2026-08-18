import { site } from '@/config/site';

/**
 * Camada de acesso ao GitHub — roda NO SERVIDOR.
 *
 * Antes o navegador de cada visitante chamava a API direto: sem autenticação
 * o limite é 60 requisições por hora POR IP, então um recrutador atrás do NAT
 * de uma empresa podia abrir o site e encontrar a vitrine vazia. Além disso os
 * repositórios ficavam fora do HTML (invisíveis para buscadores) e a seção
 * piscava um skeleton em toda visita.
 *
 * Agora o fetch acontece no servidor e o resultado é cacheado por uma hora
 * (ISR). Com `GITHUB_TOKEN` no ambiente o limite sobe para 5.000/h; sem ele
 * continua funcionando, só com o limite menor — e agora compartilhado por
 * todos os visitantes em vez de um por IP.
 */

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

/** Uma hora: os repositórios não mudam com frequência que justifique menos. */
const REVALIDATE_SECONDS = 3600;

function authHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchUserRepos(): Promise<Repo[]> {
  const url = `${GITHUB_API}/users/${site.githubUsername}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...authHeaders(),
    },
    next: { revalidate: REVALIDATE_SECONDS },
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
 * ponte. Retorna os nomes na ordem em que estão fixados; em qualquer falha,
 * retorna [] — a ordenação cai na lista manual `featuredRepos` do config.
 */
export async function fetchPinnedRepoNames(): Promise<string[]> {
  try {
    const url = `https://gh-pinned-repos.egoist.dev/?username=${site.githubUsername}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
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

/** Nome do repositório em forma legível: `task-manager` → `Task Manager`. */
export function prettyRepoName(name: string): string {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export type Showcase =
  | { ok: true; repos: Repo[]; pinned: string[]; total: number; fetchedAt: string }
  | { ok: false; message: string };

/**
 * Ponto de entrada único da seção de projetos: busca, ordena e embrulha o erro
 * em vez de deixá-lo derrubar a página inteira. Uma falha do GitHub degrada a
 * vitrine, não o portfólio.
 */
export async function getShowcase(): Promise<Showcase> {
  try {
    const [repos, pinned] = await Promise.all([fetchUserRepos(), fetchPinnedRepoNames()]);
    return {
      ok: true,
      repos: sortRepos(repos, pinned),
      pinned,
      total: repos.length,
      fetchedAt: new Date().toISOString(),
    };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : 'GitHub API' };
  }
}
