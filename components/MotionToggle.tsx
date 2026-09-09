'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { getDict, type Locale } from '@/config/i18n';

const STORAGE_KEY = 'motion-paused';

/** Sinaliza a escolha no <html>, de onde o CSS e o ScrollFX a leem. */
function apply(paused: boolean) {
  document.documentElement.dataset.motion = paused ? 'paused' : 'on';
}

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
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);

    let stored = false;
    try {
      stored = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      // Navegação privada ou cookies bloqueados: segue com o padrão.
    }
    setPaused(stored);
    apply(stored);
  }, []);

  if (!visible) return null;

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // A escolha vale para esta visita; não poder guardar não é motivo de erro.
    }
    // O ScrollFX ouve isto para montar ou desmontar as cenas na hora.
    window.dispatchEvent(new CustomEvent('motionpreferencechange', { detail: { paused: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-[color:var(--accent-ink)]"
      style={{ color: 'var(--fg-muted)' }}
    >
      {paused ? <Play size={12} /> : <Pause size={12} />}
      {paused ? t.resume : t.pause}
    </button>
  );
}
