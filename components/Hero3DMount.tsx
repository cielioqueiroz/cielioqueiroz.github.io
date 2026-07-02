'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => null,
});

export function Hero3DMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // A cena 3D é enfeite de desktop: em telas pequenas ou touch o custo de
    // GPU/bundle do three.js não se paga. Também pulamos hardware fraco
    // (≤2 núcleos). A cena monta mesmo com prefers-reduced-motion — nesse
    // caso ela aparece PARADA (sem rotação), mantendo a profundidade 3D.
    const desktop = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    const lowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (!desktop || lowEnd) return;

    const onIdle = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(cb);
      } else {
        setTimeout(cb, 200);
      }
    };
    onIdle(() => {
      setEnabled(true);
      // Defensivo: força o R3F a remedir o container após montar dentro de um
      // elemento já posicionado. Alguns ambientes não disparam o ResizeObserver
      // na montagem, deixando o canvas no default 300×150 — repetimos o resize
      // ao longo de ~1,5s para cobrir qualquer timing do dynamic import.
      let n = 0;
      const id = setInterval(() => {
        window.dispatchEvent(new Event('resize'));
        if (++n >= 8) clearInterval(id);
      }, 180);
    });
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        maskImage:
          'radial-gradient(ellipse 80% 70% at 72% 38%, black 45%, transparent 82%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 70% at 72% 38%, black 45%, transparent 82%)',
        opacity: 0.85,
      }}
    >
      <Hero3DScene />
    </div>
  );
}
