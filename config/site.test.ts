import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { SKILL_ICON_NAMES } from '@/components/skill-icons';

/**
 * `config/site.ts` é dado factual escrito à mão — o tipo é `typeof site`, então
 * o TypeScript aceita qualquer string que eu digitar. Estes testes cuidam do
 * que só um humano atento pegaria: nome de ícone errado, link quebrado,
 * certificado duplicado, período de experiência invertido.
 */

/**
 * Skills sem ícone disponível — decisão, não esquecimento: o Simple Icons
 * removeu as marcas da Microsoft, e o componente desenha as iniciais no lugar.
 * Se um nome sair daqui e também não existir no mapa, o teste acusa.
 */
const SEM_ICONE_DISPONIVEL = [
  'SiPowerbi',
  'SiMicrosoftsqlserver',
  'SiMicrosoftexcel',
  'SiMicrosoft',
  'SiVisualstudiocode',
];

/**
 * `site` é `as const`, então cada grupo tem um tipo de tupla próprio e o
 * `flatMap` não consegue unificá-los sozinho. Aqui a forma é declarada uma vez
 * e os dados passam a ser tratados como o que são: uma lista de skills.
 */
type SkillItem = { name: string; icon: string };

const skillItems: SkillItem[] = site.skills.flatMap((g) =>
  g.items.map((i) => ({ name: i.name, icon: i.icon }))
);

describe('skills', () => {
  it('todo ícone ou existe no mapa, ou está na lista de exceções', () => {
    const orfaos = skillItems
      .map((s) => s.icon)
      .filter((icon) => !SKILL_ICON_NAMES.includes(icon) && !SEM_ICONE_DISPONIVEL.includes(icon));

    expect(orfaos).toEqual([]);
  });

  it('a lista de exceções não guarda ícone que já voltou a existir', () => {
    const desnecessarias = SEM_ICONE_DISPONIVEL.filter((n) => SKILL_ICON_NAMES.includes(n));

    expect(desnecessarias).toEqual([]);
  });

  it('nenhuma exceção sobra para skill que não existe mais', () => {
    const usados = new Set(skillItems.map((s) => s.icon));
    expect(SEM_ICONE_DISPONIVEL.filter((n) => !usados.has(n))).toEqual([]);
  });

  it('não repete tecnologia entre categorias', () => {
    const nomes = skillItems.map((s) => s.name);
    expect(nomes.length).toBe(new Set(nomes).size);
  });

  it('nenhuma categoria fica vazia', () => {
    for (const g of site.skills) expect(g.items.length).toBeGreaterThan(0);
  });
});

describe('certificados', () => {
  it('não tem entrada duplicada', () => {
    const chaves = site.certificates.map((c) => `${c.title}|${c.issuer}`);
    const repetidas = chaves.filter((k, i) => chaves.indexOf(k) !== i);

    expect(repetidas).toEqual([]);
  });

  it('todo campo está preenchido', () => {
    for (const c of site.certificates) {
      expect(c.title.trim()).not.toBe('');
      expect(c.issuer.trim()).not.toBe('');
      expect(c.category.trim()).not.toBe('');
    }
  });

  it('vêm agrupados por categoria — a seção monta os grupos na ordem do array', () => {
    // Se um certificado for inserido fora do bloco da sua categoria, a lista
    // renderizada quebra o agrupamento sem nenhum erro.
    const ordem = site.certificates.map((c) => c.category);
    const primeiraOcorrencia = [...new Set(ordem)];
    const blocos = ordem.filter((c, i) => c !== ordem[i - 1]);

    expect(blocos).toEqual(primeiraOcorrencia);
  });
});

describe('links e identidade', () => {
  it('todas as redes são URLs absolutas em https', () => {
    const { email, ...links } = site.socials;

    for (const url of Object.values(links)) {
      expect(() => new URL(url)).not.toThrow();
      expect(new URL(url).protocol).toBe('https:');
    }
    expect(email).toContain('@');
  });

  it('a URL canônica não termina em barra — o localePath já traz a dele', () => {
    expect(site.url.endsWith('/')).toBe(false);
    expect(site.url).toBe(`https://${site.domain}`);
  });

  it('o GitHub configurado é o mesmo usuário da vitrine de repositórios', () => {
    expect(site.socials.github).toBe(`https://github.com/${site.githubUsername}`);
  });

  it('repositório escondido não aparece também como fixado', () => {
    const conflito = site.pinnedRepos.filter((r) => (site.hiddenRepos as readonly string[]).includes(r));

    expect(conflito).toEqual([]);
  });

  it('a lista de fixados não repete nome', () => {
    expect(new Set(site.pinnedRepos).size).toBe(site.pinnedRepos.length);
  });

  it('todo fixado é um nome de repositório plausível', () => {
    // Nome digitado errado não dá erro em lugar nenhum: o repositório
    // simplesmente não sobe para o topo, e ninguém percebe.
    for (const nome of site.pinnedRepos) {
      expect(nome).toMatch(/^[A-Za-z0-9._-]+$/);
    }
  });

  it('a vitrine mostra 6 cartões — fixar mais que isso esconde o excedente', () => {
    expect(site.pinnedRepos.length).toBeLessThanOrEqual(6);
  });
});

describe('experiência profissional', () => {
  it('cada período começa antes de terminar', () => {
    for (const job of site.experience) {
      expect(job.start <= job.end).toBe(true);
      expect(job.start).toMatch(/^\d{4}-\d{2}$/);
      expect(job.end).toMatch(/^\d{4}-\d{2}$/);
    }
  });

  it('vem da mais recente para a mais antiga, como o CV imprime', () => {
    const inicios = site.experience.map((j) => j.start);
    expect([...inicios].sort().reverse()).toEqual(inicios);
  });

  it('toda experiência lista pelo menos uma entrega', () => {
    for (const job of site.experience) {
      expect(job.achievements.length).toBeGreaterThan(0);
    }
  });
});
