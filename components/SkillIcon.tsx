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
} from 'react-icons/si';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
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
};

function initials(name: string): string {
  const cleaned = name.replace(/\s*\/.*$/, '').trim();
  const words = cleaned.split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function SkillIcon({
  iconName,
  label,
  size = 32,
  color,
}: {
  iconName: string;
  label: string;
  size?: number;
  color?: string;
}) {
  const Icon = iconMap[iconName];

  if (Icon) {
    return <Icon size={size} style={color ? { color } : undefined} />;
  }

  return (
    <div
      aria-hidden
      className="flex items-center justify-center rounded-md font-bold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? '#64748b',
        fontSize: size * 0.4,
      }}
    >
      {initials(label)}
    </div>
  );
}
