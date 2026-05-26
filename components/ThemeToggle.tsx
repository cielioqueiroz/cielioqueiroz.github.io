'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Mudar pra tema ${isDark ? 'claro' : 'escuro'}`}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
      style={{
        border: '1px solid var(--rule)',
        color: 'var(--fg-soft)',
      }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
      />
      <span className="relative transition-colors group-hover:text-[color:var(--accent)]">
        {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </span>
    </button>
  );
}
