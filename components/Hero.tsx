import { site } from '@/config/site';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail, ArrowDownRight } from 'lucide-react';
import { Portrait } from './Portrait';
import { CVButton } from './CVButton';
import { CopyEmailButton } from './CopyEmailButton';

const today = new Date().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function Hero() {
  return (
    <section id="top" className="relative">
      
      <div className="frame pt-10 md:pt-14">
        <div className="animate-fade flex flex-wrap items-center justify-between gap-3 border-t pb-3" style={{ borderColor: 'var(--fg)' }}>
          <div className="kicker tabular pt-3">
            § 01 — Apresentação
          </div>
          <div className="kicker tabular pt-3">
            {site.location}
          </div>
          <div className="kicker tabular pt-3">
            {today}
          </div>
        </div>
      </div>

      <div className="frame pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          
          <aside className="order-2 md:order-1 md:col-span-3 md:pt-4">
            
            <figure className="animate-rise stagger-1 mx-auto mb-6 max-w-[280px] md:max-w-none">
              <Portrait />
              <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] tabular" style={{ color: 'var(--fg-muted)' }}>
                <span>
                  <span style={{ color: 'var(--accent)' }}>●</span> Retrato
                </span>
                <span>nº 01 / 2026</span>
              </figcaption>
            </figure>

            <p className="marker mb-4 animate-rise stagger-2">
              <span className="inline-block w-8" style={{ borderTop: '1px solid var(--accent)', verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Sobre a capa
            </p>
            <p className="animate-rise stagger-3 text-[14px] leading-[1.55]" style={{ color: 'var(--fg-soft)' }}>
              Administrador formado, dev em formação. Construo interfaces e
              transformo planilhas em decisões.
            </p>

            <div className="rule mt-8 mb-6" />

            <dl className="animate-rise stagger-4 space-y-3 font-mono text-[11px] uppercase tracking-[0.16em] tabular">
              <div className="flex justify-between">
                <dt style={{ color: 'var(--fg-muted)' }}>Status</dt>
                <dd className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: 'var(--accent)' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
                  </span>
                  Disponível
                </dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--fg-muted)' }}>Foco</dt>
                <dd>Frontend / Dados</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--fg-muted)' }}>Idiomas</dt>
                <dd>PT-BR · EN</dd>
              </div>
            </dl>
          </aside>

<div className="order-1 md:order-2 md:col-span-9">
            <h1 className="display text-display-lg animate-rise stagger-2" style={{ fontWeight: 500 }}>
              <span className="block">Ciélio</span>
              <span className="block italic" style={{ color: 'var(--accent)', fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}>
                Queiroz<span style={{ color: 'var(--fg)' }}>.</span>
              </span>
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7 animate-rise stagger-4">
                <p className="body-serif text-2xl leading-[1.3] md:text-[28px]" style={{ color: 'var(--fg-soft)' }}>
                  Desenvolvedor <em className="italic" style={{ color: 'var(--accent)' }}>front-end</em> e
                  entusiasta de <em className="italic" style={{ color: 'var(--accent)' }}>dados</em> — escrevendo
                  software depois de mais de quinze anos traduzindo números em planilhas.
                </p>
              </div>

              <div className="md:col-span-5 md:pl-8 animate-rise stagger-5" style={{ borderLeft: '1px solid var(--rule)' }}>
                <p className="kicker mb-3">Resumo</p>
                <p className="text-sm leading-[1.6]" style={{ color: 'var(--fg-muted)' }}>
                  React, Next.js, TypeScript &nbsp;·&nbsp; Power&nbsp;BI, SQL, Python
                  &nbsp;·&nbsp; Automação com n8n. Aprendizado em loop desde 2024.
                </p>
              </div>
            </div>

<div className="mt-14 flex flex-wrap items-center gap-3 animate-rise stagger-6">
              <CVButton variant="solid" />
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group"
              >
                <FaLinkedin size={14} />
                LinkedIn
                <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
              </a>
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="pill group cursor-pointer">
                <FaGithub size={14} />
                GitHub
                <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
              </a>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="pill group cursor-pointer">
                <FaInstagram size={14} />
                Instagram
                <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
              </a>

              <div
                role="group"
                aria-label="Contato por e-mail"
                className="group inline-flex items-center overflow-hidden rounded-full font-mono text-[12px] uppercase tracking-[0.18em] transition-colors"
                style={{ border: '1px solid var(--rule)', color: 'var(--fg)' }}
              >
                <a
                  href={`mailto:${site.socials.email}`}
                  className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 transition-colors hover:text-[color:var(--accent)]"
                >
                  <Mail size={14} />
                  Contato
                  <ArrowDownRight size={14} className="transition-transform group-hover:-rotate-45" />
                </a>
                <CopyEmailButton
                  className="inline-flex items-center self-stretch border-l border-[var(--rule)] px-3 transition-colors hover:text-[color:var(--accent)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

<div
        className="overflow-hidden border-y py-3 animate-fade"
        style={{ borderColor: 'var(--rule)' }}
      >
        <div className="flex w-max animate-ticker gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-muted)' }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span>◆ React &nbsp;·&nbsp; Next.js &nbsp;·&nbsp; TypeScript</span>
              <span style={{ color: 'var(--accent)' }}>+15 anos · admin financeiro</span>
              <span>◆ Power BI &nbsp;·&nbsp; SQL Server &nbsp;·&nbsp; Excel</span>
              <span style={{ color: 'var(--accent)' }}>n8n · ChatGPT · Power Apps</span>
              <span>◆ Pará — Brasil</span>
              <span style={{ color: 'var(--accent)' }}>aprendendo em público</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
