/**
 * Orçamento de bundle — falha o build se o JS compartilhado crescer demais.
 *
 * "Performance como requisito" é uma das promessas escritas no PRODUCT.md e
 * repetida no estudo de caso deste portfólio. Sem um limite automático, essa
 * promessa depende de alguém lembrar de olhar o output do build.
 *
 * Lê o build-manifest do Next, soma os chunks carregados em toda página e
 * compara com o teto. Para atualizar o teto: mude BUDGET_KB e explique no
 * commit por que o aumento vale a pena.
 *
 * Até o Next 15 a conta era a interseção dos chunks de cada rota, tirada do
 * `app-build-manifest.json`. O Turbopack, que virou padrão no 16, não gera
 * esse arquivo — em compensação declara em `rootMainFiles` exatamente o
 * conjunto que toda rota carrega, que é o que queríamos calcular.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

/**
 * Teto do JS compartilhado por todas as rotas, em kB GZIPADOS — que é o que o
 * visitante baixa de fato, e o número que o `next build` reporta em
 * "First Load JS shared by all". Hoje o valor real é ~103 kB; a folga até 115
 * permite crescimento pequeno sem travar o desenvolvimento, mas trava um salto.
 */
const BUDGET_KB = 115;

const NEXT_DIR = path.resolve('.next');

async function sizeOf(file) {
  try {
    const buf = await fs.readFile(path.join(NEXT_DIR, file));
    // Cada chunk viaja gzipado separadamente — somar os tamanhos individuais
    // modela a transferência melhor do que gzipar tudo concatenado.
    return gzipSync(buf).length;
  } catch {
    return 0;
  }
}

async function main() {
  const manifestPath = path.join(NEXT_DIR, 'build-manifest.json');

  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  } catch {
    console.error('[budget] .next/build-manifest.json não encontrado. Rode `npm run build` antes.');
    process.exit(1);
  }

  // O custo que todo visitante paga, qualquer que seja a rota de entrada.
  const shared = (manifest.rootMainFiles ?? []).filter((f) => f.endsWith('.js'));
  if (shared.length === 0) {
    console.error('[budget] `rootMainFiles` vazio no manifest — build incompleto?');
    process.exit(1);
  }

  let total = 0;
  for (const file of shared) total += await sizeOf(file);

  const kb = total / 1024;
  const verdict = kb <= BUDGET_KB ? 'OK' : 'ESTOUROU';

  console.log(`[budget] JS compartilhado: ${kb.toFixed(1)} kB / teto ${BUDGET_KB} kB — ${verdict}`);
  console.log(`[budget] ${shared.length} chunk(s) carregados em toda rota.`);

  if (kb > BUDGET_KB) {
    console.error(
      `[budget] Excedeu em ${(kb - BUDGET_KB).toFixed(1)} kB. ` +
        'Reduza o bundle ou aumente BUDGET_KB explicando o motivo no commit.'
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
