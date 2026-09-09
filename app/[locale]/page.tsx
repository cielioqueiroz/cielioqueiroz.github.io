import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/config/i18n';
import { SectionShell } from '@/components/SectionShell';
import { Hero } from '@/components/Hero';
import { EditionIndex } from '@/components/EditionIndex';

/**
 * A capa — uma única árvore para todos os idiomas.
 *
 * As seções que moravam aqui viraram rotas próprias (`/sobre`, `/projetos`,
 * `/skills`, `/credenciais`, `/dados`): cada uma passa a ter título e
 * descrição próprios, que é o que um buscador indexa. Restam a capa e o
 * índice — o caminho para o resto da edição.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <SectionShell locale={locale as Locale}>
      <Hero locale={locale as Locale} />
      <EditionIndex locale={locale as Locale} />
    </SectionShell>
  );
}
