import { type ReactNode } from 'react';
import type { Locale } from '@/config/i18n';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * A moldura das páginas de seção — navbar, conteúdo, rodapé.
 *
 * Existe porque as cinco rotas que saíram da home têm exatamente a mesma
 * casca: sem isto, mudar o rodapé pediria cinco edições iguais, e a quinta
 * seria a esquecida.
 */
export function SectionShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
