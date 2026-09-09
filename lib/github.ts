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
 * Ordena a vitrine: os repositórios fixados primeiro, na ordem em que estão
 * fixados no perfil, e o resto por data de push — mais recente antes.
 *
 * A lista de fixados vem de `config/site.ts`, não da rede. Havia aqui uma
 * chamada a um serviço de terceiros que espelhava os pins do GitHub; ele
 * responde 404 há tempo suficiente para a vitrine estar exibindo, em silêncio,
 * a lista de reserva — exercícios antigos de CSS no topo do portfólio, que é
 * exatamente o oposto do que a seção existe para fazer. Falha silenciosa é
 * pior que ausência de recurso: agora não há terceiro no caminho.
 */
export function sortRepos(repos: Repo[], pinnedNames: readonly string[] = site.pinnedRepos): Repo[] {
  const priorityOrder = new Map<string, number>(pinnedNames.map((name, i) => [name, i]));
  const featured = repos
    .filter((r) => priorityOrder.has(r.name))
    .sort((a, b) => priorityOrder.get(a.name)! - priorityOrder.get(b.name)!);
  const rest = repos
    .filter((r) => !priorityOrder.has(r.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  return [...featured, ...rest];
}

/** Palavras que só ficam maiúsculas quando abrem o nome. */
const CONECTIVOS = new Set([
  'de', 'da', 'do', 'das', 'dos',
  'no', 'na', 'nos', 'nas',
  'ao', 'aos', 'e', 'para', 'com', 'em',
]);

/** Siglas que perdem o sentido em caixa de título: `cv` vira `CV`, não `Cv`. */
const SIGLAS = new Set(['cv', 'ai', 'ia', 'api', 'pdf', 'sql', 'crud', 'qr', 'imc', 'erp', 'rh']);

/**
 * Nome do repositório em forma legível, para o título do cartão:
 * `task-manager` vira `Task Manager`, `buscador-de-cv` vira `Buscador de CV`.
 *
 * A caixa de título ingênua produz "Buscador De Cv" — o tipo de detalhe que
 * denuncia automação preguiçosa justamente no cartão que o recrutador lê.
 */
export function prettyRepoName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((palavra, i) => {
      const lower = palavra.toLowerCase();
      if (SIGLAS.has(lower)) return lower.toUpperCase();
      if (i > 0 && CONECTIVOS.has(lower)) return lower;
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
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
    const repos = await fetchUserRepos();
    const pinned = [...site.pinnedRepos];
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
