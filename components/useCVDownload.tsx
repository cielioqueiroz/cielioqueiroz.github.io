'use client';

import { useState } from 'react';
import { site } from '@/config/site';

/**
 * Gera o currículo em PDF sob demanda. O bundle do @react-pdf/renderer e o
 * CVDocument são carregados via dynamic import — ficam fora do chunk inicial.
 */
export function useCVDownload() {
  const [generating, setGenerating] = useState(false);

  const download = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const [{ pdf }, { CVDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./CVDocument'),
      ]);
      const blob = await pdf(<CVDocument site={site} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Cielio_Queiroz_CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Falha ao gerar o PDF do currículo:', err);
    } finally {
      setGenerating(false);
    }
  };

  return { generating, download };
}
