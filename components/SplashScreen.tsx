'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Compondo tipografia',
  'Carregando projetos do GitHub',
  'Aplicando grain editorial',
  'Imprimindo a capa',
  'Revelando o retrato',
];

const TOTAL_DURATION = 1600;

export function SplashScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 380);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let unmountTimer: ReturnType<typeof setTimeout> | null = null;
    const mountedAt = performance.now();

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
      aria-label="Carregando edição"
    >
      
      <div className="splash__head">
        <span className="splash__kicker">
          <span className="splash__dot" />
          <span className="splash__dot splash__dot--2" />
          <span className="splash__dot splash__dot--3" />
          Em produção
        </span>
        <span className="splash__edition">Vol. I · Edição 2026</span>
      </div>

<div className="splash__center">
        <h1 className="splash__word">
          Carregando<span className="splash__word-dot">.</span>
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
          {MESSAGES[msgIndex]}
          <span className="splash__msg-cursor">_</span>
        </p>
      </div>

<div className="splash__foot">
        <span className="splash__meta">Ciélio Queiroz</span>
        <span className="splash__meta splash__meta--accent">
          Portfólio · Frontend &amp; Dados
        </span>
        <span className="splash__meta">Santana do Araguaia · PA</span>
      </div>
    </div>
  );
}
