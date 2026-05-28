'use client';

import { FileDown } from 'lucide-react';
import { useCVDownload } from './useCVDownload';

/** Linha "Currículo" para a lista Encontros do rodapé — mesma estética das rows de contato. */
export function CVFooterRow() {
  const { generating, download } = useCVDownload();

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
          className="transition-colors group-hover:text-[color:var(--accent)]"
          style={{ color: 'var(--fg-muted)' }}
        />
        <span className="body-serif text-lg transition-colors group-hover:text-[color:var(--accent)]">
          Currículo
        </span>
      </span>
      <span
        className="text-right font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]"
        style={{ color: 'var(--fg-muted)' }}
      >
        {generating ? 'Gerando…' : 'PDF'} <span style={{ color: 'var(--accent)' }}>↓</span>
      </span>
    </button>
  );
}
