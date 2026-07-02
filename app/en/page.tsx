import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Certificates } from '@/components/Certificates';
import { DataShowcase } from '@/components/DataShowcase';
import { Projects } from '@/components/Projects';
import { Footer } from '@/components/Footer';
import { SetHtmlLang } from '@/components/SetHtmlLang';
import { site } from '@/config/site';
import { getDict } from '@/config/i18n';

const t = getDict('en');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: `${site.url}/en/`,
    languages: {
      'pt-BR': `${site.url}/`,
      en: `${site.url}/en/`,
    },
  },
  openGraph: {
    title: t.meta.title,
    description: t.meta.description,
    url: `${site.url}/en/`,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: t.meta.title,
    description: t.meta.description,
  },
};

export default function HomeEn() {
  return (
    <>
      <SetHtmlLang lang="en" />
      <Navbar locale="en" />
      <main id="main">
        <Hero locale="en" />
        <About locale="en" />
        <Projects locale="en" />
        <Skills locale="en" />
        <Certificates locale="en" />
        <DataShowcase locale="en" />
      </main>
      <Footer locale="en" />
    </>
  );
}
