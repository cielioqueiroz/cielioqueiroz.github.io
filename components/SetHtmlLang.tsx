'use client';

import { useEffect } from 'react';

/**
 * O root layout é compartilhado entre `/` (pt-BR) e `/en`, então o atributo
 * lang do <html> é corrigido no cliente. Os metadados hreflang cobrem o SEO.
 */
export function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
