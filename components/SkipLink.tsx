import { getDict, type Locale } from '@/config/i18n';

export function SkipLink({ locale = 'pt' }: { locale?: Locale }) {
  return (
    <a href="#main" className="skip-link">
      {getDict(locale).skipLink}
    </a>
  );
}
