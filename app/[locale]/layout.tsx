import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Rajdhani, Karla, Geist_Mono } from 'next/font/google';
import { site } from '@/config/site';
import { themeStyleCss, themeColor } from '@/config/theme';
import {
  LOCALES,
  getDict,
  isLocale,
  languageAlternates,
  localePath,
  type Locale,
} from '@/config/i18n';
import { Providers } from './providers';
import { SkipLink } from '@/components/SkipLink';
import '@/styles/globals.css';

/**
 * Layout raiz. Vive dentro de `[locale]` de propósito: é o único lugar onde o
 * atributo `lang` do <html> pode ser escrito já no HTML do servidor. Antes o
 * layout ficava na raiz com `lang="pt-BR"` fixo e um efeito no cliente
 * corrigia depois — o que significava que o HTML entregue ao Google e aos
 * leitores de tela em /en declarava português.
 */

// Rajdhani não é variável — pesos explícitos (500 texto display, 600/700 títulos)
const display = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.fullName,
  alternateName: site.shortName,
  jobTitle: site.title,
  url: site.url,
  image: `${site.url}/portrait.jpg`,
  email: `mailto:${site.socials.email}`,
  telephone: site.phone,
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.instagram],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santana do Araguaia',
    addressRegion: 'PA',
    addressCountry: 'BR',
  },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Power BI', 'SQL', 'Python', 'n8n'],
  alumniOf: { '@type': 'EducationalOrganization', name: 'UNOPAR' },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: themeColor.dark },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${site.url}${localePath(locale)}`,
      languages: languageAlternates('/'),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${site.url}${localePath(locale)}`,
      siteName: site.name,
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale as Locale);

  return (
    <html
      lang={t.htmlLang}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Tokens de cor — fonte única em config/theme.ts (app + banner seguem juntos) */}
        <style dangerouslySetInnerHTML={{ __html: themeStyleCss() }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SkipLink locale={locale} />
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
