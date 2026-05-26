/**
 * Pós-build: o Next gera /opengraph-image e /twitter-image sem extensão.
 * GitHub Pages serve arquivos sem extensão como octet-stream, o que faz
 * WhatsApp/Twitter rejeitarem o preview. Aqui renomeamos para .png e
 * reescrevemos as referências nos HTMLs exportados.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('out');
const ROUTES = ['opengraph-image', 'twitter-image'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    })
  );
  return files.flat();
}

async function renameRoutes() {
  for (const route of ROUTES) {
    const src = path.join(OUT_DIR, route);
    const dest = path.join(OUT_DIR, `${route}.png`);
    try {
      await fs.access(src);
    } catch {
      console.warn(`[og] ${src} não existe — pulando.`);
      continue;
    }
    await fs.rename(src, dest);
    console.log(`[og] ${route} → ${route}.png`);
  }
}

async function rewriteHtml() {
  const all = await walk(OUT_DIR);
  const targets = all.filter((p) => p.endsWith('.html') || p.endsWith('.txt'));
  let touched = 0;
  for (const file of targets) {
    let content = await fs.readFile(file, 'utf8');
    let changed = false;
    for (const route of ROUTES) {
      // Captura /<route> seguido por ? ou " ou < (não confunde com .png já existente)
      const pattern = new RegExp(`/${route}(?=[?"<])`, 'g');
      if (pattern.test(content)) {
        content = content.replace(pattern, `/${route}.png`);
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(file, content, 'utf8');
      touched++;
    }
  }
  console.log(`[og] ${touched} arquivo(s) HTML atualizados.`);
}

async function main() {
  try {
    await fs.access(OUT_DIR);
  } catch {
    console.error('[og] out/ não encontrado. Rode `next build` antes.');
    process.exit(1);
  }
  await renameRoutes();
  await rewriteHtml();
  console.log('[og] Pronto.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
