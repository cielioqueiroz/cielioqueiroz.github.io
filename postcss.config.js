module.exports = {
  plugins: {
    // Precisa vir antes do Tailwind: o Next compila cada arquivo CSS importado
    // como um módulo PostCSS independente, então os parciais em styles/ não
    // enxergariam as diretivas @tailwind e o `@layer` quebraria. Com
    // postcss-import os arquivos são inlinados antes, e o Tailwind processa
    // uma folha só.
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
