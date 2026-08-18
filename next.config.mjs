/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'export'` foi removido: o deploy é no Vercel, não mais no GitHub
  // Pages. Isso destrava Image Optimization, ISR e o middleware de idioma que
  // mantém o português na raiz (`/`) sem duplicar a árvore de rotas.
  trailingSlash: true,
  devIndicators: false,
};

export default nextConfig;
