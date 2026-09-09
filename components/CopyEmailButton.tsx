'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';

type Props = {
  /** Tamanho do ícone (px) */
  size?: number;
  /** Mostra rótulo textual ao lado do ícone */
  label?: boolean;
  /** Classe extra aplicada ao botão */
  className?: string;
  locale?: Locale;
};

export function CopyEmailButton({ size = 14, label = false, className, locale = 'pt' }: Props) {
  const [copied, setCopied] = useState(false);
  const t = getDict(locale).copyEmail;

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
      aria-label={copied ? t.ariaCopied : t.ariaCopy}
      className={className}
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
      {label && <span>{copied ? t.copied : t.copy}</span>}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? t.srCopied : ''}
      </span>
    </button>
  );
}
