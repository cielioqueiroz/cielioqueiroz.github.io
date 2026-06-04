'use client';

import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#sobre', label: 'Sobre', n: '02' },
  { href: '#projetos', label: 'Projetos', n: '03' },
  { href: '#skills', label: 'Skills', n: '04' },
  { href: '#certificados', label: 'Credenciais', n: '05' },
  { href: '#dados', label: 'Dados', n: '06' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled || open ? 'backdrop-blur-xl' : ''
        }`}
        style={{
          background:
            scrolled || open ? 'color-mix(in srgb, var(--bg) 78%, transparent)' : 'transparent',
          borderBottom: scrolled || open ? '1px solid var(--rule)' : '1px solid transparent',
        }}
      >
        <div className="frame flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="group flex items-baseline gap-2 sm:gap-3"
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em] sm:text-[11px]"
              style={{ color: 'var(--accent-ink)' }}
            >
              Vol. I
            </span>
            <span
              className="display text-lg italic sm:text-xl md:text-2xl"
              style={{ fontVariationSettings: "'opsz' 24" }}
            >
              {site.shortName}
            </span>
            <span
              className="hidden font-mono text-[10px] uppercase tracking-[0.22em] lg:inline"
              style={{ color: 'var(--fg-muted)' }}
            >
              · Edição 2026
            </span>
          </a>

<nav className="hidden items-center gap-5 md:flex lg:gap-7">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className="group inline-flex items-baseline gap-1.5 text-sm transition-colors"
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.18em] transition-opacity"
                    style={{ color: 'var(--accent-ink)', opacity: isActive ? 1 : 0.6 }}
                  >
                    {l.n}
                  </span>
                  <span
                    className="underline-grow transition-colors"
                    style={{ color: isActive ? 'var(--fg)' : 'var(--fg-soft)' }}
                  >
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full transition-all duration-300"
                    style={{
                      background: 'var(--accent)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(0)',
                    }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden"
              style={{ border: '1.5px solid var(--fg)', color: 'var(--fg)' }}
            >
              {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

<div
        className={`fixed inset-x-0 bottom-0 top-16 z-30 md:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'var(--bg)' }}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`relative h-full overflow-y-auto px-6 pt-10 pb-20 transition-all duration-500 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <p className="kicker mb-8">Índice da edição</p>
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li
                key={l.href}
                style={{
                  transitionDelay: open ? `${i * 60}ms` : '0ms',
                }}
                className={`transition-all duration-500 ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b py-5"
                  style={{ borderColor: 'var(--rule)' }}
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className="font-mono text-[11px] tracking-[0.2em] tabular"
                      style={{ color: 'var(--accent-ink)' }}
                    >
                      {l.n}
                    </span>
                    <span className="display text-3xl leading-none" style={{ fontWeight: 500 }}>
                      {l.label}
                    </span>
                  </span>
                  <span
                    className="font-mono text-[20px] transition-transform group-hover:translate-x-1"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t pt-6" style={{ borderColor: 'var(--rule)' }}>
            <p className="kicker mb-3">Encontros</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-solid"
              >
                LinkedIn
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                GitHub
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                Instagram
              </a>
              <a href={`mailto:${site.socials.email}`} className="pill">
                Contato
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
