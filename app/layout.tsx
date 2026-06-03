import type { Metadata, Viewport } from 'next';
import { Schibsted_Grotesk, Hanken_Grotesk, Geist_Mono } from 'next/font/google';
import { site } from '@/config/site';
import { themeStyleCss, themeColor } from '@/config/theme';
import { Providers } from './providers';
import { SplashScreen } from '@/components/SplashScreen';
import { SkipLink } from '@/components/SkipLink';
import './globals.css';

const display = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Hanken_Grotesk({
  subsets: ['latin'],
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
  url: 'https://cielioqueiroz.github.io',
  image: 'https://cielioqueiroz.github.io/portrait.jpg',
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: themeColor.dark },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cielioqueiroz.github.io'),
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    url: 'https://cielioqueiroz.github.io',
    siteName: site.name,
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
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
        <SkipLink />
        <Providers>
          <SplashScreen />
          {children}
        </Providers>
      </body>
    </html>
  );
}
