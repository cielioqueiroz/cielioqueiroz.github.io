'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Mudar pra tema ${isDark ? 'claro' : 'escuro'}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-accent hover:text-accent dark:border-slate-800 dark:text-slate-200 dark:hover:border-accent dark:hover:text-accent"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
