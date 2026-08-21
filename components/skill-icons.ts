import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiVite,
  SiJupyter,
  SiOpenai,
  SiClaude,
  SiN8N,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

/**
 * Registro de ícones das skills — separado do componente porque é DADO, não
 * marcação: assim `config/site.test.ts` consegue conferir que todo `icon`
 * declarado em `config/site.ts` existe aqui, sem arrastar JSX para o teste.
 *
 * O que NÃO está aqui é decisão, não esquecimento: o Simple Icons removeu as
 * marcas da Microsoft (Power BI, Excel, SQL Server, Power Apps, VS Code) e o
 * `react-icons` não as expõe mais. Essas skills caem no bloco de iniciais do
 * componente, e o teste mantém a lista de exceções explícita — um nome de
 * ícone digitado errado não se disfarça de escolha de design.
 */
export const iconMap: Record<string, IconType> = {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiVite,
  SiJupyter,
  SiOpenai,
  SiClaude,
  SiN8N,
};

export const SKILL_ICON_NAMES: readonly string[] = Object.keys(iconMap);
