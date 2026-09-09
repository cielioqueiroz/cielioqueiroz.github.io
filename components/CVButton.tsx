'use client';

import { Download, Loader2 } from 'lucide-react';
import { useCVDownload } from './useCVDownload';
import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';

export function CVButton({
  variant = 'outline',
  locale = 'pt',
}: {
  variant?: 'solid' | 'outline';
  locale?: Locale;
}) {
  const { generating, failed, download, warm } = useCVDownload();
  const t = getDict(locale).cv;

  return (
    <span className="inline-flex flex-col gap-1.5">
      <button
        type="button"
        onClick={download}
        onPointerEnter={warm}
        onFocus={warm}
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

      {failed && (
        <span
          role="alert"
          className="font-mono text-[10px] leading-[1.4]"
          style={{ color: 'var(--fg-muted)' }}
        >
          {t.failed}{' '}
          <a
            href={`mailto:${site.socials.email}?subject=${encodeURIComponent(t.failedMailSubject)}`}
            style={{ color: 'var(--accent-ink)', textDecoration: 'underline' }}
          >
            {t.failedCta}
          </a>
        </span>
      )}
    </span>
  );
}
