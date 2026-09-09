import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, getDict, isLocale, type Locale } from '@/config/i18n';
import { sectionMetadata } from '@/lib/page-metadata';
import { SectionShell } from '@/components/SectionShell';
import { Certificates } from '@/components/Certificates';

const PATH = '/credenciais';

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
  const page = getDict(locale).pages.credenciais;
  return sectionMetadata({ locale, path: PATH, ...page });
}

export default async function CredentialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <SectionShell locale={locale as Locale}>
      <Certificates locale={locale as Locale} />
    </SectionShell>
  );
}
