'use client';

import { useEffect, useState } from 'react';
import { site } from '@/config/site';

const PORTRAIT_SRC = '/portrait.webp';
const PORTRAIT_FALLBACK = '/portrait.jpg';
const PORTRAIT_W = 512;
const PORTRAIT_H = 518;

export function Portrait() {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const tryLoad = (url: string, onFail: () => void) => {
      const probe = new window.Image();
      probe.onload = () => {
        if (!cancelled) setSrc(url);
      };
      probe.onerror = () => {
        if (!cancelled) onFail();
      };
      probe.src = url;
    };

    tryLoad(PORTRAIT_SRC, () => {

      tryLoad(PORTRAIT_FALLBACK, () => {
        if (!cancelled) setFailed(true);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="portrait-frame aspect-[4/5]">
      <span className="crosshair tl" aria-hidden />
      <span className="crosshair tr" aria-hidden />
      <span className="crosshair bl" aria-hidden />
      <span className="crosshair br" aria-hidden />

{!src && (
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ zIndex: 1 }}
        >
          <span
            className="display italic leading-none"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(5rem, 22vw, 9rem)',
              color: 'var(--accent-ink)',
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {site.initials}
          </span>
          {failed && (
            <span
              className="mt-4 px-6 font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: 'var(--fg-muted)' }}
            >
              salve portrait.jpg em /public
            </span>
          )}
        </div>
      )}

      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`Retrato de ${site.name}`}
          width={PORTRAIT_W}
          height={PORTRAIT_H}
          loading="eager"
          decoding="async"
          style={{
            position: 'relative',
            zIndex: 2,
            animation: 'splash-fade-in 0.6s ease-out both',
          }}
        />
      )}
    </div>
  );
}
