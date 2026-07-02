'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const COPY = {
  pt: {
    messages: [
      'Compondo tipografia',
      'Carregando projetos do GitHub',
      'Aplicando grain editorial',
      'Imprimindo a capa',
      'Revelando o retrato',
    ],
    producing: 'Em produção',
    edition: 'Vol. I · Edição 2026',
    loading: 'Carregando',
    ariaLabel: 'Carregando edição',
    meta: 'Portfólio · Frontend & Dados',
    place: 'Santana do Araguaia · PA',
  },
  en: {
    messages: [
      'Setting the type',
      'Fetching GitHub projects',
      'Applying editorial grain',
      'Printing the cover',
      'Revealing the portrait',
    ],
    producing: 'In production',
    edition: 'Vol. I · 2026 Edition',
    loading: 'Loading',
    ariaLabel: 'Loading edition',
    meta: 'Portfolio · Frontend & Data',
    place: 'Santana do Araguaia · PA',
  },
} as const;

const TOTAL_DURATION = 1600;
/** Chave por aba: o splash completo roda só na primeira visita da sessão. */
const SEEN_KEY = 'cq-splash-seen';

export function SplashScreen() {
  const pathname = usePathname();
  const t = COPY[pathname?.startsWith('/en') ? 'en' : 'pt'];

  const [msgIndex, setMsgIndex] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % t.messages.length);
    }, 380);
    return () => clearInterval(id);
  }, [t.messages.length]);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let unmountTimer: ReturnType<typeof setTimeout> | null = null;
    const mountedAt = performance.now();

    // Visita repetida na mesma sessão: dispensa o ritual e libera a página já.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // sessionStorage indisponível — segue o fluxo completo
    }
    if (seen) {
      setHiding(true);
      unmountTimer = setTimeout(() => setUnmounted(true), 400);
      return () => {
        if (unmountTimer) clearTimeout(unmountTimer);
      };
    }

    const start = () => {
      const elapsed = performance.now() - mountedAt;
      const wait = Math.max(0, TOTAL_DURATION + 200 - elapsed);
      hideTimer = setTimeout(() => {
        setHiding(true);
        unmountTimer = setTimeout(() => setUnmounted(true), 800);
      }, wait);
    };

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
    }

    const fallback = setTimeout(() => {
      setHiding(true);
      setTimeout(() => setUnmounted(true), 800);
    }, 4500);

    return () => {
      window.removeEventListener('load', start);
      if (hideTimer) clearTimeout(hideTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
      clearTimeout(fallback);
    };
  }, []);

  if (unmounted) return null;

  return (
    <div
      className={`splash ${hiding ? 'splash--hiding' : ''}`}
      aria-hidden={hiding}
      role="status"
      aria-live="polite"
      aria-label={t.ariaLabel}
    >

      <div className="splash__head">
        <span className="splash__kicker">
          <span className="splash__dot" />
          <span className="splash__dot splash__dot--2" />
          <span className="splash__dot splash__dot--3" />
          {t.producing}
        </span>
        <span className="splash__edition">{t.edition}</span>
      </div>

<div className="splash__center">
        <h1 className="splash__word">
          {t.loading}<span className="splash__word-dot">.</span>
        </h1>

        <div className="splash__counter" aria-hidden>
          <span className="splash__counter-bracket">[</span>
          <span className="splash__counter-num" />
          <span className="splash__counter-pct">%</span>
          <span className="splash__counter-bracket">]</span>
        </div>

<div className="splash__bar" aria-hidden>
          <div className="splash__bar-fill" />
          <div className="splash__bar-marks">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="splash__bar-mark" />
            ))}
          </div>
        </div>

<p className="splash__msg" key={msgIndex}>
          <span className="splash__msg-arrow">→</span>
          {t.messages[msgIndex]}
          <span className="splash__msg-cursor">_</span>
        </p>
      </div>

<div className="splash__foot">
        <span className="splash__meta">Ciélio Queiroz</span>
        <span className="splash__meta splash__meta--accent">{t.meta}</span>
        <span className="splash__meta">{t.place}</span>
      </div>
    </div>
  );
}
