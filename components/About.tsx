import { site } from '@/config/site';

export function About() {
  const [first, ...rest] = site.about;
  const dropChar = first.charAt(0);
  const firstRest = first.slice(1);

  return (
    <section id="sobre" className="section">
      <div className="frame">
        
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">§ 02</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <h2 className="display text-display-md flex items-baseline gap-4" style={{ fontWeight: 500 }}>
              Sobre
              <span className="italic" style={{ color: 'var(--accent)', fontVariationSettings: "'opsz' 60" }}>
                mim.
              </span>
            </h2>
          </div>
        </div>

        <div className="reveal mt-16 grid gap-12 md:grid-cols-12 md:gap-x-8">
          
          <aside className="order-2 md:order-1 md:col-span-3 space-y-10">
            <div>
              <p className="kicker mb-3">Experiência</p>
              <p className="display text-5xl tabular md:text-6xl" style={{ fontWeight: 500 }}>
                15
                <span className="text-3xl align-top" style={{ color: 'var(--accent)' }}>+</span>
              </p>
              <p className="mt-2 text-[13px] leading-[1.5]" style={{ color: 'var(--fg-muted)' }}>
                anos em gestão administrativa &amp; financeira
              </p>
            </div>

            <div className="rule" />

            <div>
              <p className="kicker mb-3">Formação</p>
              <p className="body-serif text-2xl leading-[1.1]">Administração</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] tabular" style={{ color: 'var(--fg-muted)' }}>
                UNOPAR · 2022
              </p>
            </div>

            <div className="rule" />

            <div>
              <p className="kicker mb-3">Estuda agora</p>
              <ul className="space-y-2 text-[14px]" style={{ color: 'var(--fg-soft)' }}>
                <li className="flex items-center gap-2">
                  <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>→</span>
                  Next.js / App Router
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>→</span>
                  TypeScript avançado
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>→</span>
                  Engenharia de dados
                </li>
              </ul>
            </div>
          </aside>

<div className="order-1 md:order-2 md:col-span-9">
            
            <p className="body-serif text-[19px] leading-[1.65] md:text-[22px] md:leading-[1.55]" style={{ color: 'var(--fg-soft)' }}>
              <span
                className="float-left mr-3 mt-1 leading-[0.85]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 14vw, 7rem)',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                {dropChar}
              </span>
              {firstRest}
            </p>

<div className="mt-6 space-y-5 text-[17px] leading-[1.7]" style={{ color: 'var(--fg-soft)' }}>
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

<figure
              className="my-12 border-l-2 pl-6 md:my-16 md:pl-10"
              style={{ borderColor: 'var(--accent)' }}
            >
              <blockquote className="display hang text-2xl leading-[1.25] md:text-[34px]" style={{ fontWeight: 400, fontStyle: 'italic' }}>
                &ldquo;Cada planilha que automatizei me ensinou
                <span style={{ color: 'var(--accent)' }}> que código bom é, no fim, </span>
                gente economizando tempo.&rdquo;
              </blockquote>
              <figcaption className="kicker mt-4">— {site.shortName}, 2026</figcaption>
            </figure>

<div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--fg-muted)' }}>
              <span>◇ Frontend</span>
              <span>◇ Análise de dados</span>
              <span>◇ Automação</span>
              <span>◇ Gestão</span>
              <span>◇ Aprendizado contínuo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
