import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Rajdhani, Karla, Geist_Mono } from 'next/font/google';
import { site } from '@/config/site';
import { themeStyleCss, themeColor } from '@/config/theme';
import { Providers } from './providers';
import { SplashScreen } from '@/components/SplashScreen';
import { SkipLink } from '@/components/SkipLink';
import { MagneticCursor } from '@/components/MagneticCursor';
import './globals.css';

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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: themeColor.dark },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
  alternates: {
    canonical: `${site.url}/`,
    languages: {
      'pt-BR': `${site.url}/`,
      en: `${site.url}/en/`,
    },
  },
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    url: site.url,
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
        <MagneticCursor />
        <Providers>
          <SplashScreen />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
