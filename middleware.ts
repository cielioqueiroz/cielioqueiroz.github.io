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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /pt e /pt/... não são endereços válidos: o padrão mora na raiz.
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const stripped = pathname.slice(`/${DEFAULT_LOCALE}`.length) || '/';
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.redirect(url, 308);
  }

  // Idiomas com prefixo já batem com o segmento [locale].
  if (PREFIXED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
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
