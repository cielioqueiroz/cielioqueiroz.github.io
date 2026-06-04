'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cursor customizado em duas camadas:
 *  - dot (pequeno, segue 1:1)
 *  - ring (maior, persegue com lag elástico)
 * Crescimento e label contextual quando passa sobre [data-cursor].
 * Esconde-se em mobile/touch e respeita prefers-reduced-motion.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let hoverScale = 1;
    let targetScale = 1;
    let currentLabel = '';

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        // Sem crescer o círculo — só revela o rótulo (ex.: "ver código").
        // Um leve realce (1.25) dá feedback sutil sem o anel gigante.
        targetScale = 1.25;
        currentLabel = target.dataset.cursorLabel ?? '';
      } else {
        targetScale = 1;
        currentLabel = '';
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      hoverScale += (targetScale - hoverScale) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hoverScale.toFixed(3)})`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${rx}px, ${ry + 28}px, 0) translate(-50%, 0)`;
        if (labelRef.current.textContent !== currentLabel) labelRef.current.textContent = currentLabel;
        labelRef.current.style.opacity = currentLabel ? '1' : '0';
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'background 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      <div
        ref={labelRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '4px 10px',
          borderRadius: 999,
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent-contrast)',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.25s ease',
          willChange: 'transform, opacity',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  );
}
