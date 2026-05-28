'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { site } from '@/config/site';

type Props = {
  /** Tamanho do ícone (px) */
  size?: number;
  /** Mostra rótulo textual ao lado do ícone */
  label?: boolean;
  /** Classe extra aplicada ao botão */
  className?: string;
};

export function CopyEmailButton({ size = 14, label = false, className }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.socials.email);
    } catch {
      // Fallback para navegadores sem Clipboard API (ou contexto não-seguro)
      const ta = document.createElement('textarea');
      ta.value = site.socials.email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* sem sorte — silencioso */
      }
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'E-mail copiado' : 'Copiar e-mail'}
      className={className}
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
      {label && <span>{copied ? 'Copiado' : 'Copiar'}</span>}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'E-mail copiado para a área de transferência' : ''}
      </span>
    </button>
  );
}
