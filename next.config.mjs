/**
 * Cabeçalhos de segurança.
 *
 * Só passaram a ser possíveis quando o `output: 'export'` saiu: site
 * puramente estático não tem servidor para emitir cabeçalho. A CSP é escrita
 * à mão porque o conteúdo é conhecido e fechado — não há entrada de usuário
 * nem terceiros além dos listados abaixo.
 *
 * Duas frouxidões conscientes, ambas necessárias e verificadas no navegador:
 *
 * 'unsafe-inline' em script-src — o Next injeta scripts de hidratação inline
 * sem nonce no App Router estático. Usar nonce exigiria renderização dinâmica
 * em toda página, custando o cache.
 *
 * 'wasm-unsafe-eval' + `data:` em connect-src — o @react-pdf/renderer compila
 * um módulo WebAssembly carregado de um data: URI para gerar o currículo. Sem
 * os dois o botão "Baixar CV" falha silenciosamente (testado: CompileError por
 * violação de CSP). Usamos 'wasm-unsafe-eval', que libera só a compilação de
 * WASM, e NÃO 'unsafe-eval', que liberaria eval() de strings JS.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://va.vercel-scripts.com",
  // Tailwind e os tokens de tema são injetados como <style> inline.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // `data:` carrega o WASM do gerador de PDF; o resto é a telemetria da
  // Vercel. A GitHub API é consultada no servidor, não pelo navegador.
  "connect-src 'self' data: https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Redundante com frame-ancestors, mas cobre navegadores antigos.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'export'` foi removido: o deploy é no Vercel, não mais no GitHub
  // Pages. Isso destrava Image Optimization, ISR e o middleware de idioma que
  // mantém o português na raiz (`/`) sem duplicar a árvore de rotas.
  trailingSlash: true,
  devIndicators: false,
  poweredByHeader: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
