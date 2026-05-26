import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { site } from '@/config/site';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
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
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
