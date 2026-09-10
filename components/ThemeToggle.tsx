'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { getDict, type Locale } from '@/config/i18n';

export function ThemeToggle({ locale = 'pt' }: { locale?: Locale }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const t = getDict(locale).nav;

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t.themeToggleLight : t.themeToggleDark}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-colors duration-200"
      style={{
        border: '1.5px solid var(--fg)',
        color: 'var(--fg)',
      }}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: 'var(--accent)' }}
      />
      <span className="relative transition-colors group-hover:text-[color:var(--accent-contrast)]">
        {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </span>
    </button>
  );
}
