'use client';

import { type CSSProperties } from 'react';

/**
 * Aurora backdrop — gradiente animado lento, multi-camada.
 * Pure-CSS, sem WebGL. Respira em ~26s, deslocando 3 elipses quentes.
 * Sit-behind: pointer-events none, z-index 0.
 */
export function AuroraBackdrop({ intensity = 1 }: { intensity?: number }) {
  const style: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.85 * intensity,
    maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, transparent 85%)',
    WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, transparent 85%)',
  };

  return (
    <div aria-hidden style={style} className="aurora-backdrop">
      <span className="aurora aurora--a" />
      <span className="aurora aurora--b" />
      <span className="aurora aurora--c" />
    </div>
  );
}
