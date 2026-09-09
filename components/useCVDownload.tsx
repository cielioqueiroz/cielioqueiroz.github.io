'use client';

import { useState } from 'react';
import { site } from '@/config/site';

/**
 * Gera o currículo em PDF sob demanda. O bundle do @react-pdf/renderer e o
 * CVDocument são carregados via dynamic import — ficam fora do chunk inicial.
 */
export function useCVDownload() {
  const [generating, setGenerating] = useState(false);
  const [failed, setFailed] = useState(false);

  const download = async () => {
    if (generating) return;
    setGenerating(true);
    setFailed(false);
    try {
      const [{ pdf }, { CVDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./CVDocument'),
      ]);
      const blob = await pdf(<CVDocument site={site} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // O nome do arquivo é a primeira coisa que o recrutador vê na pasta.
      a.download = 'Cielio-Queiroz-Frontend-Developer.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      // Sem isto a falha só existia no console: o botão parava de girar e o
      // visitante ficava sem currículo e sem explicação.
      console.error('Falha ao gerar o PDF do currículo:', err);
      setFailed(true);
    } finally {
      setGenerating(false);
    }
  };

  return { generating, failed, download };
}
