"use client";

import { useEffect } from "react";

/**
 * Parallax ao rolar. Complementa `.reveal` (styles/motion.css), que já cuida da
 * revelação das seções via `animation-timeline: view()` — aqui só entra o
 * deslocamento em profundidade, que o CSS scroll-driven não resolve bem.
 *
 * Marque o elemento com `data-parallax="<fator>"`: negativo sobe, positivo
 * desce, em fração da altura da janela ao longo da travessia da seção.
 *
 * Feito à mão em vez de GSAP porque a CSP do projeto (ver next.config.mjs)
 * proíbe 'unsafe-eval', de que o GSAP depende para compilar seus setters.
 */
export function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    )
      .map((el) => ({
        el,
        section: el.closest("section") ?? el,
        factor: Number(el.dataset.parallax),
      }))
      .filter(({ factor }) => Number.isFinite(factor) && factor !== 0);

    if (!targets.length) return;

    let frame = 0;

    const render = () => {
      frame = 0;
      const viewport = window.innerHeight;

      for (const { el, section, factor } of targets) {
        const { top, height } = section.getBoundingClientRect();
        if (top > viewport || top + height < 0) continue;

        // 0 quando a seção entra por baixo, 1 quando sai por cima.
        const progress = (viewport - top) / (viewport + height);
        const shift = (progress - 0.5) * factor * viewport;
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const { el } of targets) el.style.transform = "";
    };
  }, []);

  return null;
}
