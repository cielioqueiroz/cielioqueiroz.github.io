import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

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
