import { notFound } from 'next/navigation';
import { isLocale } from '@/config/i18n';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Certificates } from '@/components/Certificates';
import { DataShowcase } from '@/components/DataShowcase';
import { Projects } from '@/components/Projects';
import { Footer } from '@/components/Footer';

/**
 * Home — uma única árvore para todos os idiomas.
 *
 * Antes existiam `app/page.tsx` e `app/en/page.tsx` com a mesma lista de
 * componentes copiada, cada seção recebendo `locale="en"` na mão. Adicionar
 * uma seção exigia editar os dois arquivos; adicionar um idioma, três.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Navbar locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <About locale={locale} />
        <Projects locale={locale} />
        <Skills locale={locale} />
        <Certificates locale={locale} />
        <DataShowcase locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
