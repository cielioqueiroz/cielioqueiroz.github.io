'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/config/site';
import { LOCALES, getDict, localePath, type Locale } from '@/config/i18n';
import { ThemeToggle } from './ThemeToggle';
import { TransitionLink } from './TransitionLink';
import { Menu, X } from 'lucide-react';

export function Navbar({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).nav;
  const home = localePath(locale);
  const otherLocale = LOCALES.find((l) => l !== locale) ?? locale;

  // Cada item aponta para a rota da seção. O ativo sai do pathname, e não mais
  // de observar a rolagem: com uma seção por página, quem está aberto é fato,
  // não estimativa.
  const pathname = usePathname();
  const links = t.links.map((l) => ({ ...l, href: localePath(locale, l.href) }));

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
            href={`${home}#top`}
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
              >
              {site.shortName}
            </span>
            <span
              className="hidden font-mono text-[10px] uppercase tracking-[0.22em] lg:inline"
              style={{ color: 'var(--fg-muted)' }}
            >
              {t.edition}
            </span>
          </a>

<nav className="hidden items-center gap-5 md:flex lg:gap-7">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <TransitionLink
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? 'page' : undefined}
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
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <TransitionLink
              href={localePath(otherLocale)}
              aria-label={t.langAria}
              className="inline-flex h-10 items-center justify-center rounded-full px-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-contrast)] hover:border-[color:var(--accent)]"
              style={{ border: '1.5px solid var(--fg)', color: 'var(--fg)' }}
            >
              {t.langLabel}
            </TransitionLink>
            <ThemeToggle locale={locale} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.closeMenu : t.openMenu}
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
          <p className="kicker mb-8">{t.indexTitle}</p>
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
                <TransitionLink
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
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t pt-6" style={{ borderColor: 'var(--rule)' }}>
            <p className="kicker mb-3">{t.meets}</p>
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
                {t.contact}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
