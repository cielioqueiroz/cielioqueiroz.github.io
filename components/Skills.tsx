import { site } from '@/config/site';
import { SkillIcon } from './SkillIcon';

export function Skills() {
  return (
    <section id="skills" className="section border-t border-slate-200 dark:border-slate-800">
      <div className="container-page">
        <h2 className="heading mb-3">
          <span className="text-accent">#</span> Skills
        </h2>
        <p className="mb-10 text-slate-600 dark:text-slate-400">
          Tecnologias que uso e estudo para construir soluções.
        </p>

        <div className="space-y-10">
          {site.skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {group.category}
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent"
                    title={skill.name}
                  >
                    <SkillIcon
                      iconName={skill.icon}
                      label={skill.name}
                      size={32}
                      color={skill.color}
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-accent dark:text-slate-300 dark:group-hover:text-accent">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
