import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { site } from '@/config/site';
import { Providers } from './providers';
import { SplashScreen } from '@/components/SplashScreen';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <SplashScreen />
          {children}
        </Providers>
      </body>
    </html>
  );
}
