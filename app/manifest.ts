import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { palette } from '@/config/theme';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.title}`,
    short_name: site.shortName,
    description: site.tagline,
    start_url: '/',
    display: 'standalone',
    // Identidade padrão do site é o tema escuro (Fumaça Grafite)
    background_color: palette.dark['--bg'],
    theme_color: palette.dark['--bg'],
    lang: 'pt-BR',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
