import { iconMap } from './skill-icons';

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
}: {
  iconName: string;
  label: string;
  size?: number;
}) {
  const Icon = iconMap[iconName];

  if (Icon) {
    return (
      <Icon size={size} aria-hidden focusable={false} />
    );
  }

  return (
    <div
      aria-hidden
      className="flex items-center justify-center rounded-lg font-bold"
      style={{
        width: size,
        height: size,
        background: 'color-mix(in srgb, currentColor 12%, transparent)',
        fontSize: size * 0.4,
        border: '1px solid color-mix(in srgb, currentColor 30%, transparent)',
      }}
    >
      {initials(label)}
    </div>
  );
}
