"use client";

import { useEffect } from "react";

/**
 * Cenas de rolagem — GSAP + ScrollTrigger.
 *
 * Vocabulário, por atributo:
 *   [data-scroll-heading]  título sobe acompanhando a rolagem (scrub)
 *   [data-scroll-card]     bloco entra ao aparecer e desfaz ao voltar
 *   [data-scroll-stagger]  filhos entram em cascata
 *   [data-scroll-image]    imagem desliza e assenta a escala
 *   [data-parallax="f"]    deslocamento contínuo; negativo sobe, positivo desce
 *
 * Nenhuma cena anima `opacity`: o conteúdo já nasce visível e o movimento é só
 * transform. Assim uma falha no carregamento do GSAP não deixa a página em
 * branco, e não há piscada entre o HTML chegar e a animação assumir.
 *
 * `.reveal` entra junto com os cards porque a regra CSS equivalente dependia de
 * `animation-timeline: view()`, que Firefox e Safari não suportam — lá o site
 * revelava nada. Aqui revela nos três.
 */
export function ScrollFX() {
  useEffect(() => {
    let cancelled = false;
    let media: gsap.MatchMedia | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();

      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 800px)",
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const mobile = Boolean(context.conditions.mobile);
          const select = gsap.utils.toArray as <T>(t: string) => T[];

          select<HTMLElement>("[data-scroll-heading]").forEach((heading) => {
            gsap.from(heading, {
              y: mobile ? 26 : 56,
              ease: "none",
              scrollTrigger: {
                trigger: heading,
                start: "top bottom",
                end: "top 55%",
                scrub: 0.6,
              },
            });
          });

          select<HTMLElement>(".reveal, [data-scroll-card]").forEach((card, i) => {
            gsap.from(card, {
              y: mobile ? 34 : 62,
              rotation: mobile ? 0 : i % 2 === 0 ? -1.2 : 1.2,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            });
          });

          select<HTMLElement>("[data-scroll-stagger]").forEach((group) => {
            gsap.from(Array.from(group.children), {
              y: mobile ? 18 : 34,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.05,
              scrollTrigger: {
                trigger: group,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          });

          select<HTMLElement>("[data-scroll-image]").forEach((image, i) => {
            const up = i % 2 === 0;
            gsap.fromTo(
              image,
              { yPercent: up ? -4 : 4, scale: 1.08 },
              {
                yPercent: up ? 4 : -4,
                scale: 1.01,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement ?? image,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });

          select<HTMLElement>("[data-parallax]").forEach((el) => {
            const factor = Number(el.dataset.parallax);
            if (!Number.isFinite(factor) || factor === 0) return;
            // Curso em pixels da janela, não da própria altura: um fundo que
            // cobre a seção inteira e um retrato de 280px devem andar junto.
            const travel = factor * window.innerHeight * (mobile ? 0.5 : 1);
            gsap.fromTo(
              el,
              { y: -travel / 2 },
              {
                y: travel / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("section") ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              },
            );
          });

          // As fontes chegam depois do primeiro cálculo e mudam a altura da
          // página; sem recalcular, todo gatilho abaixo da dobra fica deslocado.
          let alive = true;
          void document.fonts?.ready.then(() => {
            if (alive) ScrollTrigger.refresh();
          });
          return () => {
            alive = false;
          };
        },
      );
    })();

    return () => {
      cancelled = true;
      media?.revert();
    };
  }, []);

  return null;
}
