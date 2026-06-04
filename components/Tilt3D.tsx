'use client';

import {
  useRef,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from 'react';

type Tilt3DProps = {
  children: ReactNode;
  /** Intensidade da rotação em graus. Default: 8 */
  max?: number;
  /** Profundidade do "lift" em px (translateZ). Default: 12 */
  lift?: number;
  /** Liga spotlight (consome .spotlight do globals.css). Default: true */
  spotlight?: boolean;
  /** Reflexo metálico que segue o cursor. Default: true */
  glare?: boolean;
  /** Escala no hover. Default: 1 (desligado) */
  scale?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Tilt 3D no eixo X/Y baseado na posição do cursor.
 * Respeita prefers-reduced-motion. Suaviza no leave.
 * Também publica --mx/--my (em %) para que .spotlight (globals.css)
 * possa desenhar o glow no ponto do cursor.
 */
export function Tilt3D({
  children,
  max = 8,
  lift = 12,
  spotlight = true,
  glare = true,
  scale = 1,
  className = '',
  style,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const apply = useCallback(
    (rx: number, ry: number, mx: number, my: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--mx', `${mx.toFixed(1)}%`);
      el.style.setProperty('--my', `${my.toFixed(1)}%`);
      el.style.transform = `perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(${lift}px) scale(${scale})`;
    },
    [lift, scale]
  );

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const ry = (px - 0.5) * 2 * max;
      const rx = -(py - 0.5) * 2 * max;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => apply(rx, ry, px * 100, py * 100));
    },
    [apply, max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, []);

  const baseStyle: CSSProperties = {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1)',
    willChange: 'transform',
    ...style,
  };

  const composedClass = `card-3d ${spotlight ? 'spotlight' : ''} ${className}`.trim();

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={composedClass}
      style={baseStyle}
    >
      {children}
      {glare && (
        <span
          aria-hidden
          className="tilt-glare"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0,
            transition: 'opacity 0.4s ease',
            background:
              'radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, #fff 38%, transparent), transparent 60%)',
            mixBlendMode: 'soft-light',
          }}
        />
      )}
    </div>
  );
}
