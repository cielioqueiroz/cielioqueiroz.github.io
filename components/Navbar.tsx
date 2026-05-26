'use client';

import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#skills', label: 'Skills' },
  { href: '#projetos', label: 'Projetos' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="text-lg font-bold tracking-tight">
          <span className="text-accent">{'<'}</span>
          {site.shortName}
          <span className="text-accent">{' />'}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-accent dark:text-slate-300 dark:hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
