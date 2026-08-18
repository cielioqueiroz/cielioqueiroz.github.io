import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { LOCALES, localePath } from '@/config/i18n';
import { caseStudies } from '@/content/case-studies';

export const dynamic = 'force-static';

/**
 * Home e uma entrada por estudo de caso, em cada idioma. As páginas de projeto
 * são o conteúdo indexável de cauda longa do site — deixá-las fora do sitemap
 * anularia metade do motivo de elas existirem.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) => {
    const isDefault = locale === 'pt';

    const home = {
      url: `${site.url}${localePath(locale)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: isDefault ? 1 : 0.8,
    };

    const projects = caseStudies.map((cs) => ({
      url: `${site.url}${localePath(locale, `/projetos/${cs.slug}`)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: isDefault ? 0.7 : 0.6,
    }));

    return [home, ...projects];
  });
}
