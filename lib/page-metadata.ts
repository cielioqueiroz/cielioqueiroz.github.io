import type { Metadata } from 'next';
import { site } from '@/config/site';
import { languageAlternates, localePath, type Locale } from '@/config/i18n';

/**
 * Metadata de uma página de seção.
 *
 * Canônica, hreflang e Open Graph seguem sempre o mesmo formato; escrever isso
 * à mão em cada rota é como a canônica de uma delas acaba apontando para outra.
 */
export function sectionMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${site.url}${localePath(locale, path)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
