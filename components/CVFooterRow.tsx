'use client';

import { FileDown } from 'lucide-react';
import { useCVDownload } from './useCVDownload';
import { getDict, type Locale } from '@/config/i18n';

/** Linha "Currículo" para a lista Encontros do rodapé — mesma estética das rows de contato. */
export function CVFooterRow({ locale = 'pt' }: { locale?: Locale }) {
  const { generating, download } = useCVDownload();
  const t = getDict(locale).footer;

  return (
    <button
      type="button"
      onClick={download}
      disabled={generating}
      aria-busy={generating}
      className="group flex w-full items-center justify-between border-b py-2 text-left transition-colors"
      style={{ borderColor: 'var(--rule)', cursor: generating ? 'wait' : 'pointer' }}
    >
      <span className="flex items-center gap-4">
        <FileDown
          size={14}
          className="transition-colors group-hover:text-[color:var(--accent-ink)]"
          style={{ color: 'var(--fg-muted)' }}
        />
        <span className="body-serif text-lg transition-colors group-hover:text-[color:var(--accent-ink)]">
          {t.cvLabel}
        </span>
      </span>
      <span
        className="text-right font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]"
        style={{ color: 'var(--fg-muted)' }}
      >
        {generating ? t.cvGenerating : t.cvMeta} <span style={{ color: 'var(--accent-ink)' }}>↓</span>
      </span>
    </button>
  );
}
