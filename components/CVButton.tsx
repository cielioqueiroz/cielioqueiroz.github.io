'use client';

import { Download, Loader2 } from 'lucide-react';
import { useCVDownload } from './useCVDownload';
import { getDict, type Locale } from '@/config/i18n';

export function CVButton({
  variant = 'outline',
  locale = 'pt',
}: {
  variant?: 'solid' | 'outline';
  locale?: Locale;
}) {
  const { generating, download } = useCVDownload();
  const t = getDict(locale).cv;

  return (
    <button
      type="button"
      onClick={download}
      disabled={generating}
      aria-busy={generating}
      className={variant === 'solid' ? 'pill-solid' : 'pill'}
      style={generating ? { opacity: 0.7, cursor: 'wait' } : undefined}
    >
      {generating ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Download size={14} />
      )}
      {generating ? t.generating : t.download}
    </button>
  );
}
