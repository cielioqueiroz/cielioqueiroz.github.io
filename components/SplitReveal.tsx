'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type SplitRevealProps = {
  text: string;
  /** Atraso inicial em ms. Default 0 */
  delay?: number;
  /** Atraso por caractere em ms. Default 30 */
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  /** Wrap em italic? Default false. */
  italic?: boolean;
};

/**
 * Texto que entra letra-a-letra com translateY+opacity, disparado por IntersectionObserver.
 * Espaços e quebras preservadas. Acessibilidade: aria-label expõe o texto original.
 */
export function SplitReveal({
  text,
  delay = 0,
  stagger = 30,
  className = '',
  style,
  italic = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.querySelectorAll<HTMLElement>('[data-char]').forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const chars = el.querySelectorAll<HTMLElement>('[data-char]');
          chars.forEach((c, i) => {
            c.style.transitionDelay = `${delay + i * stagger}ms`;
            c.style.opacity = '1';
            c.style.transform = 'translateY(0) rotateX(0deg)';
          });
          io.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  const chars: ReactNode[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === ' ') {
      chars.push(
        <span key={i} aria-hidden style={{ display: 'inline-block', width: '0.28em' }}>
          {' '}
        </span>
      );
    } else {
      chars.push(
        <span
          key={i}
          aria-hidden
          data-char
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(0.6em) rotateX(45deg)',
            transformOrigin: '50% 100%',
            transition: 'opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
            willChange: 'transform, opacity',
            fontStyle: italic ? 'italic' : undefined,
          }}
        >
          {ch}
        </span>
      );
    }
  }

  return (
    <span
      ref={ref}
      aria-label={text}
      className={className}
      style={{ display: 'inline-block', perspective: '800px', ...style }}
    >
      {chars}
    </span>
  );
}
