'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ComponentProps, type MouseEvent } from 'react';

/**
 * `next/link` que atravessa a View Transitions API quando o navegador tem.
 *
 * O Next só expõe isso atrás de `experimental.viewTransition`, que exige o
 * React do canal experimental; aqui o projeto está no React 19 estável, e
 * trocar o canal por um crossfade não paga. São vinte linhas fazendo o mesmo:
 * segurar a navegação, pedir a transição ao navegador, navegar dentro dela.
 *
 * Onde `startViewTransition` não existe — Firefox, hoje — nada é interceptado
 * e o Link se comporta como sempre. O CSS da transição mora em motion.css.
 */
export function TransitionLink({
  href,
  onClick,
  ...rest
}: ComponentProps<typeof Link>) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Clique com modificador é intenção de abrir noutro lugar; abrir em nova
    // aba não tem transição para fazer, e interceptar quebraria o gesto.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    const start = document.startViewTransition?.bind(document);
    if (!start) return;

    event.preventDefault();
    start(() => {
      router.push(String(href));
    });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
