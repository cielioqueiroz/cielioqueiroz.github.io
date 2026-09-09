import { describe, expect, it } from 'vitest';
import { prettyRepoName, sortRepos, type Repo } from '@/lib/github';
import { site } from '@/config/site';

/**
 * A ordem da vitrine é conteúdo, não detalhe: os seis primeiros cartões são o
 * que um recrutador vê da minha produção. Já esteve errada — a lista de
 * prioridade vinha de um serviço de terceiros que passou a responder 404, e a
 * seção caiu para uma lista de reserva desatualizada sem avisar ninguém.
 *
 * Estes testes fixam a regra: fixado vem antes, na ordem em que está fixado; o
 * resto vem por data de push. E nada disso depende da rede.
 */

const repo = (name: string, pushed_at: string): Repo => ({
  id: name.length + pushed_at.length,
  name,
  description: null,
  html_url: `https://github.com/${site.githubUsername}/${name}`,
  homepage: null,
  language: 'TypeScript',
  stargazers_count: 0,
  forks_count: 0,
  topics: [],
  has_pages: false,
  pushed_at,
  fork: false,
  archived: false,
});

describe('sortRepos', () => {
  it('põe os fixados na frente, na ordem em que foram fixados', () => {
    const repos = [
      repo('praca-araguaia', '2026-08-19'),
      repo('projeto-antigo', '2026-08-21'),
      repo('app-weather', '2026-08-17'),
    ];

    expect(sortRepos(repos, ['app-weather', 'praca-araguaia']).map((r) => r.name)).toEqual([
      'app-weather',
      'praca-araguaia',
      'projeto-antigo',
    ]);
  });

  it('ordena o resto do mais recente para o mais antigo', () => {
    const repos = [
      repo('velho', '2024-01-01'),
      repo('novo', '2026-08-21'),
      repo('meio', '2026-01-15'),
    ];

    expect(sortRepos(repos, []).map((r) => r.name)).toEqual(['novo', 'meio', 'velho']);
  });

  it('um push recente não empurra repositório comum na frente de um fixado', () => {
    // O caso que estraga a vitrine: um exercício antigo recebe um commit de
    // ajuste e sobe para o topo do portfólio.
    const repos = [repo('exercicio-css', '2026-12-31'), repo('gabarito_AI', '2020-01-01')];

    expect(sortRepos(repos, ['gabarito_AI'])[0].name).toBe('gabarito_AI');
  });

  it('ignora nome fixado que não existe mais entre os repositórios', () => {
    const repos = [repo('app-weather', '2026-08-17')];

    expect(sortRepos(repos, ['repo-apagado', 'app-weather']).map((r) => r.name)).toEqual([
      'app-weather',
    ]);
  });

  it('usa a lista do config quando nenhuma é passada', () => {
    const repos = [repo('exercicio-antigo', '2026-12-31'), repo(site.pinnedRepos[0], '2020-01-01')];

    expect(sortRepos(repos)[0].name).toBe(site.pinnedRepos[0]);
  });

  it('não mexe no array que recebeu', () => {
    const repos = [repo('b', '2024-01-01'), repo('a', '2026-01-01')];
    const antes = repos.map((r) => r.name);

    sortRepos(repos, ['a']);

    expect(repos.map((r) => r.name)).toEqual(antes);
  });

  it('devolve todos os repositórios, sem perder nem duplicar', () => {
    const repos = ['a', 'b', 'c', 'd'].map((n, i) => repo(n, `2026-0${i + 1}-01`));
    const nomes = sortRepos(repos, ['c', 'a']).map((r) => r.name);

    expect(nomes.length).toBe(repos.length);
    expect(new Set(nomes).size).toBe(repos.length);
  });
});

describe('prettyRepoName', () => {
  it.each([
    ['task-manager', 'Task Manager'],
    ['gabarito_AI', 'Gabarito AI'],
    ['praca-araguaia', 'Praca Araguaia'],
    ['app-weather', 'App Weather'],
    ['calculadora-investimentos', 'Calculadora Investimentos'],
    ['controle-financeiro', 'Controle Financeiro'],
    // Conectivo em minúscula e sigla em caixa alta: "Buscador De Cv" era o
    // título que aparecia no cartão antes disso.
    ['buscador-de-cv', 'Buscador de CV'],
    ['calculadora-lucro-real', 'Calculadora Lucro Real'],
    ['generator-qr-code', 'Generator QR Code'],
  ])('%s → %s', (raw, esperado) => {
    expect(prettyRepoName(raw)).toBe(esperado);
  });

  it('conectivo que abre o nome continua maiúsculo', () => {
    expect(prettyRepoName('de-olho-no-caixa')).toBe('De Olho no Caixa');
  });
});
