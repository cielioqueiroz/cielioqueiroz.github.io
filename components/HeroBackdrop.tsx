'use client';

import { useEffect, useRef, useState } from 'react';
import { AuroraBackdrop } from './AuroraBackdrop';

const LOOP_END = 7.5; // segundos — corta antes do nome aparecer no vídeo

/**
 * Fundo do hero com orçamento de performance:
 * - SSR/mobile/poupança de dados/reduced-motion → aurora pure-CSS (nenhum byte de vídeo).
 * - Desktop com ponteiro fino → o vídeo (1,8 MB) monta só depois do idle,
 *   pra não competir com LCP; a aurora sai de cena quando ele entra.
 */
export function HeroBackdrop() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wantsVideo =
      window.matchMedia('(min-width: 768px) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !(navigator as { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!wantsVideo) return;

    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const idle = (cb: () => void) =>
      w.requestIdleCallback ? w.requestIdleCallback(cb) : window.setTimeout(cb, 250);
    idle(() => setVideoReady(true));
  }, []);

  useEffect(() => {
    if (!videoReady) return;
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= LOOP_END) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.play().catch(() => {});

    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [videoReady]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
      {videoReady ? (
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />
      ) : (
        <AuroraBackdrop />
      )}
    </div>
  );
}
