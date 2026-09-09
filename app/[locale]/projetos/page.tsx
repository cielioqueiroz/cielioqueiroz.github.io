import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, getDict, isLocale, type Locale } from '@/config/i18n';
import { sectionMetadata } from '@/lib/page-metadata';
import { SectionShell } from '@/components/SectionShell';
import { Projects } from '@/components/Projects';

const PATH = '/projetos';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getDict(locale).pages.projetos;
  return sectionMetadata({ locale, path: PATH, ...page });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <SectionShell locale={locale as Locale}>
      <Projects locale={locale as Locale} />
    </SectionShell>
  );
}
