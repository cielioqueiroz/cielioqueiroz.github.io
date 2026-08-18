import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/config/i18n';

/**
 * Roteamento de idioma sem duplicar rotas.
 *
 * Toda página vive em `app/[locale]/…`, mas o português é o idioma padrão e
 * já está indexado na raiz — então ele NÃO ganha prefixo na URL:
 *
 *   /            → reescreve para /pt            (URL continua `/`)
 *   /projetos/x  → reescreve para /pt/projetos/x (URL continua `/projetos/x`)
 *   /en/…        → passa direto
 *   /pt/…        → redireciona 308 removendo o prefixo (evita conteúdo duplicado)
 *
 * Sem isso, ou o português mudaria de endereço (quebrando os links já
 * indexados) ou a árvore de componentes teria que ser copiada por idioma.
 */

const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

/**
 * Qual idioma prefixa este caminho, ignorando maiúsculas. `/EN/` digitado na
 * barra de endereço levava a um 404 antes desta normalização.
 */
function matchLocalePrefix(pathname: string, locale: string): boolean {
  const lower = pathname.toLowerCase();
  return lower === `/${locale}` || lower.startsWith(`/${locale}/`);
}

/** Garante a barra final que o `trailingSlash: true` exige. */
function withTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /pt e /pt/... não são endereços válidos: o padrão mora na raiz. Já
  // devolvemos o caminho com barra final para não encadear um segundo
  // redirect do trailingSlash em cima deste.
  if (matchLocalePrefix(pathname, DEFAULT_LOCALE)) {
    const url = request.nextUrl.clone();
    url.pathname = withTrailingSlash(pathname.slice(`/${DEFAULT_LOCALE}`.length) || '/');
    return NextResponse.redirect(url, 308);
  }

  // Idiomas com prefixo já batem com o segmento [locale]. Se veio em caixa
  // diferente da canônica, redireciona para a forma minúscula — senão o mesmo
  // conteúdo responderia em duas URLs.
  const prefixed = PREFIXED.find((l) => matchLocalePrefix(pathname, l));
  if (prefixed) {
    const canonical = `/${prefixed}${pathname.slice(prefixed.length + 1)}`;
    if (pathname !== canonical) {
      const url = request.nextUrl.clone();
      url.pathname = withTrailingSlash(canonical);
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  // Resto: é português, reescrito para dentro de [locale] sem mudar a URL.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Tudo, menos assets, rotas internas do Next e arquivos de metadados.
    '/((?!_next/|favicon\\.ico|icon\\.svg|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|opengraph-image|twitter-image|fonts/|portrait\\.).*)',
  ],
};
