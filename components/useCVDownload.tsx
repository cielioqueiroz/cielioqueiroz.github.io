'use client';

import { useCallback, useState } from 'react';
import { site } from '@/config/site';

/**
 * Gera o currículo em PDF sob demanda. O bundle do @react-pdf/renderer e o
 * CVDocument são carregados via dynamic import — ficam fora do chunk inicial.
 */

/**
 * Carrega o renderizador uma vez só. Guardar a promessa (e não o módulo)
 * também colapsa chamadas simultâneas: warm + clique disputam o mesmo import.
 */
let modules: Promise<{
  pdf: typeof import('@react-pdf/renderer')['pdf'];
  CVDocument: typeof import('./CVDocument')['CVDocument'];
}> | null = null;

function loadModules() {
  modules ??= Promise.all([import('@react-pdf/renderer'), import('./CVDocument')])
    .then(([{ pdf }, { CVDocument }]) => ({ pdf, CVDocument }))
    .catch((err) => {
      // Sem isto, um import que falhou (rede caiu) ficaria memoizado e toda
      // tentativa seguinte rejeitaria de imediato, sem nunca voltar à rede.
      modules = null;
      throw err;
    });
  return modules;
}

export function useCVDownload() {
  const [generating, setGenerating] = useState(false);
  const [failed, setFailed] = useState(false);

  /**
   * O renderizador é o pedaço mais pesado da página. Buscá-lo quando o ponteiro
   * chega ao botão troca a espera pelo tempo da intenção: no clique, só sobra a
   * renderização.
   */
  const warm = useCallback(() => {
    loadModules().catch(() => {});
  }, []);

  const download = async () => {
    if (generating) return;
    setGenerating(true);
    setFailed(false);
    try {
      const { pdf, CVDocument } = await loadModules();
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

  return { generating, failed, download, warm };
}
