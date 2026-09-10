'use client';

import { Pause, Play } from 'lucide-react';
import { getDict, type Locale } from '@/config/i18n';
import { useMediaQuery, useMotionPaused, setMotionPaused } from '@/lib/client-state';

/**
 * Pausa as cenas de rolagem.
 *
 * `prefers-reduced-motion` já é respeitado, mas ele é uma preferência de
 * sistema: quem só quer sossego nesta página não vai mudar a configuração do
 * computador para isso. Este botão é a versão local dessa escolha, e fica
 * guardada entre visitas.
 *
 * Só aparece se houver movimento a pausar — sob `prefers-reduced-motion`
 * nenhuma cena roda, e um botão que não faz nada é ruído.
 */
export function MotionToggle({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).motion;
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const paused = useMotionPaused();

  // No servidor `reduced` é `false`, então o botão sai no HTML e some na
  // hidratação de quem pediu menos movimento — o contrário deixaria quem quer
  // o controle sem ele até o JavaScript chegar.
  if (reduced) return null;

  return (
    <button
      type="button"
      onClick={() => setMotionPaused(!paused)}
      aria-pressed={paused}
      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-[color:var(--accent-ink)]"
      style={{ color: 'var(--fg-muted)' }}
    >
      {paused ? <Play size={12} /> : <Pause size={12} />}
      {paused ? t.resume : t.pause}
    </button>
  );
}
