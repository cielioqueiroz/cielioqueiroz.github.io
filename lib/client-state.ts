'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Leitura de estado que só existe no cliente, sem `setState` dentro de efeito.
 *
 * O padrão comum — `useState(false)` mais um efeito que chama `setState(true)`
 * — funciona, mas renderiza duas vezes toda vez, e o `react-hooks` do Next 16
 * passou a reprovar por isso. `useSyncExternalStore` resolve na origem: o
 * React pede um retrato para o servidor e outro para o cliente, e usa cada um
 * onde vale, sem render extra.
 */

/** Nunca notifica: o valor de hidratação muda uma vez e não volta atrás. */
const noSubscribe = () => () => {};

/** `false` durante a renderização no servidor, `true` depois de hidratar. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
}

/**
 * O valor de uma media query, acompanhando mudanças. No servidor devolve
 * `false` — não há janela para consultar, e o componente decide o que fazer
 * com isso.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const MOTION_STORAGE_KEY = 'motion-paused';
export const MOTION_EVENT = 'motionpreferencechange';

/**
 * A preferência de pausar o movimento, compartilhada entre quem a controla
 * (MotionToggle) e quem obedece (ScrollFX).
 *
 * Mora aqui, e não em cada componente, porque são dois lendo a mesma coisa:
 * duplicar a leitura é como os dois acabam discordando.
 */
export function useMotionPaused(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener(MOTION_EVENT, onChange);
    // `storage` cobre a mesma pessoa com o site aberto em duas abas.
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(MOTION_EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  return useSyncExternalStore(subscribe, readMotionPaused, () => false);
}

/** Leitura tolerante: navegação privada e cookies bloqueados fazem isto lançar. */
export function readMotionPaused(): boolean {
  try {
    return localStorage.getItem(MOTION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Grava a preferência e avisa quem estiver ouvindo, na mesma aba. */
export function setMotionPaused(paused: boolean): void {
  try {
    localStorage.setItem(MOTION_STORAGE_KEY, String(paused));
  } catch {
    // A escolha vale para esta visita; não poder guardar não é motivo de erro.
  }
  document.documentElement.dataset.motion = paused ? 'paused' : 'on';
  window.dispatchEvent(new CustomEvent(MOTION_EVENT));
}
