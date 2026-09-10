import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { config, middleware } from '@/middleware';
import { caseStudies } from '@/content/case-studies';

/**
 * O middleware é a peça mais silenciosamente perigosa do projeto: erra e o
 * site inteiro muda de endereço ou responde 404 — e nada disso aparece em
 * desenvolvimento, onde a gente digita sempre a mesma URL certa.
 *
 * Estes testes travam o contrato descrito no próprio arquivo:
 *   /            → reescreve para /pt   (URL não muda)
 *   /pt/…        → 308 removendo o prefixo
 *   /en/…        → passa direto
 *   caixa alta   → 308 para a forma canônica minúscula
 *
 * O redirect precisa vir já com barra final: `trailingSlash: true` faria um
 * SEGUNDO redirect em cima do primeiro, e cadeia de redirect é penalidade de
 * SEO além de latência.
 */

const BASE = 'https://cielio-portfolio.vercel.app';

/**
 * `nextConfig` precisa ser passado à mão: em produção o Next injeta a config
 * do build no `NextURL`, e é dela que sai a normalização de barra final. Sem
 * isso o teste mediria um comportamento que não existe no site publicado.
 */
const run = (path: string) =>
  middleware(new NextRequest(new URL(path, BASE), { nextConfig: { trailingSlash: true } }));

/** Para onde o Next foi mandado internamente, sem mudar a URL do visitante. */
const rewriteTarget = (res: Response) => {
  const raw = res.headers.get('x-middleware-rewrite');
  return raw ? new URL(raw).pathname : null;
};

const redirectTarget = (res: Response) => {
  const raw = res.headers.get('location');
  return raw ? new URL(raw, BASE).pathname : null;
};

describe('português mora na raiz', () => {
  it.each([
    ['/', '/pt/'],
    ['/projetos/gabarito-ai/', '/pt/projetos/gabarito-ai/'],
    ['/qualquer-coisa/', '/pt/qualquer-coisa/'],
  ])('%s é reescrito para %s sem redirecionar', (from, to) => {
    const res = run(from);

    expect(res.status).toBe(200);
    expect(redirectTarget(res)).toBeNull();
    expect(rewriteTarget(res)).toBe(to);
  });
});

describe('/pt não é endereço válido', () => {
  it.each([
    ['/pt/', '/'],
    ['/pt', '/'],
    ['/pt/projetos/gabarito-ai/', '/projetos/gabarito-ai/'],
  ])('%s redireciona 308 para %s', (from, to) => {
    const res = run(from);

    expect(res.status).toBe(308);
    expect(redirectTarget(res)).toBe(to);
  });

  it('já devolve o destino com barra final, sem encadear um segundo redirect', () => {
    const target = redirectTarget(run('/pt/projetos/gabarito-ai'));

    expect(target).toBe('/projetos/gabarito-ai/');
    expect(target?.endsWith('/')).toBe(true);
  });
});

describe('inglês vive sob prefixo', () => {
  it.each(['/en/', '/en/projetos/gabarito-ai/'])('%s passa direto', (path) => {
    const res = run(path);

    expect(res.status).toBe(200);
    expect(res.headers.get('x-middleware-next')).toBe('1');
    expect(rewriteTarget(res)).toBeNull();
  });

  it('não confunde uma rota que apenas começa com as letras do idioma', () => {
    // `/energia/` começa com "en" mas não é o prefixo `/en/`.
    const res = run('/energia/');

    expect(rewriteTarget(res)).toBe('/pt/energia/');
  });
});

describe('caixa do idioma na URL', () => {
  it.each([
    ['/EN/', '/en/'],
    ['/En/projetos/gabarito-ai/', '/en/projetos/gabarito-ai/'],
    ['/PT/', '/'],
  ])('%s redireciona para a forma canônica %s', (from, to) => {
    const res = run(from);

    expect(res.status).toBe(308);
    expect(redirectTarget(res)).toBe(to);
  });

  it('a forma canônica não redireciona de novo — sem laço', () => {
    const first = run('/EN/');
    const target = redirectTarget(first)!;
    const second = run(target);

    expect(second.status).toBe(200);
    expect(redirectTarget(second)).toBeNull();
  });
});

describe('a query string sobrevive ao roteamento', () => {
  it('preserva os parâmetros no redirect', () => {
    const res = run('/pt/?utm_source=linkedin');

    expect(res.headers.get('location')).toContain('utm_source=linkedin');
  });
});

describe('o matcher separa página de arquivo', () => {
  /**
   * Este bloco existe por causa de um bug que chegou em produção: os prints dos
   * estudos de caso ficaram invisíveis porque o matcher mandava
   * `/projetos/x.webp` para o roteamento de idioma. Testar `middleware()` não
   * pegaria — a função nunca é chamada para esses caminhos, e é exatamente aí
   * que mora o erro. Quem decide é a configuração, então é ela que é testada.
   */
  const matcher = new RegExp(`^${config.matcher[0]}$`);

  it.each([
    '/',
    '/en/',
    '/pt/',
    '/projetos/praca-araguaia/',
    '/en/projetos/buscador-de-cv/',
    '/qualquer-coisa/',
  ])('%s é página e passa pelo middleware', (path) => {
    expect(matcher.test(path)).toBe(true);
  });

  it.each([
    '/projetos/praca-araguaia.webp',
    '/projetos/buscador-de-cv.webp',
    '/projetos/controle-financeiro.webp',
    '/portrait.webp',
    '/portrait.jpg',
    '/favicon.ico',
    '/icon.svg',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.webmanifest',
    '/fonts/cv/Newsreader-Regular.ttf',
    '/_next/static/chunk.js',
  ])('%s é arquivo e é servido direto', (path) => {
    expect(matcher.test(path)).toBe(false);
  });

  it.each(['/opengraph-image', '/twitter-image'])(
    '%s é rota de metadado sem extensão — precisa ficar nomeada',
    (path) => {
      expect(matcher.test(path)).toBe(false);
    }
  );

  it('todo print declarado no conteúdo é tratado como arquivo', () => {
    // A trava de verdade: se um print novo entrar num caminho que o matcher
    // considera página, ele some da tela sem quebrar build nem teste de rota.
    for (const cs of caseStudies) {
      expect(matcher.test(cs.shot.src), cs.shot.src).toBe(false);
    }
  });
});
