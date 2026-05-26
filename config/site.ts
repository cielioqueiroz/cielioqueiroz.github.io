/**
 * Edite este arquivo pra atualizar os dados do portfólio.
 * Todo o resto do site lê daqui.
 */

export const site = {
  name: 'Cielio Queiroz',
  shortName: 'Cielio',
  title: 'Desenvolvedor Front-end',
  tagline: 'Construindo interfaces, automatizando processos e transformando dados em decisão.',
  location: 'Santana do Araguaia – PA',

  about: [
    'Sou Jacielio (Cielio) — administrador de formação com mais de 9 anos em gestão administrativa e financeira, agora mergulhando em desenvolvimento web e ciência de dados.',
    'Minha trajetória uniu contas a pagar/receber, fluxo de caixa e controle fiscal a projetos que tocaram React, Power BI, SQL e automação com n8n — sempre buscando otimizar processos e gerar resultado.',
    'Hoje crio interfaces modernas com React/Next.js e dashboards analíticos, conectando minha visão de negócio à capacidade de construir software que resolve problemas reais.',
  ],

  socials: {
    github: 'https://github.com/cielioqueiroz',
    linkedin: 'https://www.linkedin.com/in/jacielio-queiroz/',
    instagram: 'https://www.instagram.com/cielio.queiroz/',
    email: 'cielioqueiroz@hotmail.com',
  },

  githubUsername: 'cielioqueiroz',

  // Projetos em destaque (aparecem primeiro). Use o nome exato do repo.
  // Os demais repos aparecem depois, ordenados por última atualização.
  featuredRepos: [
    'calculadora-investimentos',
    'controle-financeiro',
    'crud-user-react',
    'task-manager',
    'app-weather',
    'dashboard-admin',
  ],

  // Repos a esconder (perfil readme, projetos antigos, etc.)
  hiddenRepos: ['cielioqueiroz', 'my-personal-portfolio'],

  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'HTML5', icon: 'FaHtml5', color: '#E34F26' },
        { name: 'CSS3', icon: 'FaCss3Alt', color: '#1572B6' },
        { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
        { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6' },
        { name: 'React', icon: 'FaReact', color: '#61DAFB' },
        { name: 'Next.js', icon: 'SiNextdotjs', color: '#000000' },
        { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4' },
        { name: 'Material UI', icon: 'SiMui', color: '#007FFF' },
        { name: 'Vite', icon: 'SiVite', color: '#646CFF' },
      ],
    },
    {
      category: 'Backend & Linguagens',
      items: [
        { name: 'Node.js', icon: 'FaNodeJs', color: '#339933' },
        { name: 'Python', icon: 'FaPython', color: '#3776AB' },
      ],
    },
    {
      category: 'Dados & BI',
      items: [
        { name: 'Power BI', icon: 'SiPowerbi', color: '#F2C811' },
        { name: 'SQL Server', icon: 'SiMicrosoftsqlserver', color: '#CC2927' },
        { name: 'Jupyter', icon: 'SiJupyter', color: '#F37626' },
        { name: 'Excel', icon: 'SiMicrosoftexcel', color: '#217346' },
      ],
    },
    {
      category: 'Automação & IA',
      items: [
        { name: 'n8n', icon: 'SiN8n', color: '#EA4B71' },
        { name: 'Power Apps', icon: 'SiMicrosoft', color: '#742774' },
        { name: 'ChatGPT / IA', icon: 'SiOpenai', color: '#10A37F' },
      ],
    },
    {
      category: 'Ferramentas',
      items: [
        { name: 'Git', icon: 'FaGitAlt', color: '#F05032' },
        { name: 'GitHub', icon: 'FaGithub', color: '#181717' },
        { name: 'VS Code', icon: 'SiVisualstudiocode', color: '#007ACC' },
      ],
    },
  ],
} as const;

export type Site = typeof site;
