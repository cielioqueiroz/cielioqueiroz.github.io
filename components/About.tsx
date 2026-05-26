import { site } from '@/config/site';

export function About() {
  return (
    <section id="sobre" className="section border-t border-slate-200 dark:border-slate-800">
      <div className="container-page">
        <h2 className="heading mb-10">
          <span className="text-accent">#</span> Sobre mim
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {site.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="card">
              <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                Experiência
              </p>
              <p className="text-2xl font-bold">9+ anos</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Gestão administrativa e financeira
              </p>
            </div>
            <div className="card">
              <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                Formação
              </p>
              <p className="text-lg font-semibold">Administração</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">UNOPAR — 2022</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
