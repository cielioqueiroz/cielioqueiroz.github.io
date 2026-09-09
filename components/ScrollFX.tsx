"use client";

import { useEffect } from "react";

/**
 * Parallax ao rolar. Complementa `.reveal` (styles/motion.css), que já cuida da
 * revelação das seções via `animation-timeline: view()` — aqui só entra o
 * deslocamento em profundidade, que o CSS scroll-driven não resolve bem.
 *
 * Marque o elemento com `data-parallax="<fator>"`: negativo sobe, positivo
 * desce, em fração da própria altura ao longo da travessia da seção.
 */
export function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-parallax]");
    if (!targets.length) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        targets.forEach((el) => {
          const factor = Number(el.dataset.parallax);
          if (!Number.isFinite(factor) || factor === 0) return;

          gsap.to(el, {
            yPercent: factor * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
