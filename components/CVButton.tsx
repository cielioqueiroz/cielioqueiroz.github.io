'use client';

import { Download, Loader2 } from 'lucide-react';
import { useCVDownload } from './useCVDownload';

export function CVButton({ variant = 'outline' }: { variant?: 'solid' | 'outline' }) {
  const { generating, download } = useCVDownload();

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
      {generating ? 'Gerando…' : 'Baixar CV'}
    </button>
  );
}
