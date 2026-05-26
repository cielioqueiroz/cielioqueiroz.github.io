import { site } from '@/config/site';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: FaLinkedin, href: site.socials.linkedin, label: 'LinkedIn', handle: '/jacielio-queiroz' },
    { icon: FaGithub, href: site.socials.github, label: 'GitHub', handle: '@cielioqueiroz' },
    { icon: FaInstagram, href: site.socials.instagram, label: 'Instagram', handle: '@cielio.queiroz' },
    { icon: Mail, href: `mailto:${site.socials.email}`, label: 'E-mail', handle: site.socials.email },
  ];

  return (
    <footer
      className="relative mt-12 pt-16 pb-12"
      style={{ background: 'color-mix(in srgb, var(--bg-deep) 70%, var(--bg))' }}
    >
      <div className="frame">
        
        <div className="grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">§ 07 — Colofão</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick" />
          </div>
        </div>

<div className="mt-14 md:mt-20">
          <p className="kicker mb-6">Vamos conversar?</p>
          <a
            href={`mailto:${site.socials.email}`}
            className="display block leading-[0.92] transition-colors hover:text-[color:var(--accent)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(2rem, 8vw, 7rem)',
              wordBreak: 'break-word',
            }}
          >
            <span className="italic" style={{ fontVariationSettings: "'opsz' 144" }}>
              cielioqueiroz
            </span>
            <span style={{ color: 'var(--fg-muted)' }}>@</span>
            <wbr />
            hotmail<span style={{ color: 'var(--fg-muted)' }}>.com</span>
          </a>
        </div>

<div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-4">
            <p className="kicker mb-4">Endereço</p>
            <p className="body-serif text-lg leading-[1.4]">
              {site.location}
              <br />
              <span style={{ color: 'var(--fg-muted)' }}>Brasil</span>
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="kicker mb-4">Encontros</p>
            <ul className="space-y-3">
              {socials.map(({ icon: Icon, href, label, handle }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b py-2 transition-colors"
                    style={{ borderColor: 'var(--rule)' }}
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={14} className="transition-colors group-hover:text-[color:var(--accent)]" style={{ color: 'var(--fg-muted)' }} />
                      <span className="body-serif text-lg transition-colors group-hover:text-[color:var(--accent)]">
                        {label}
                      </span>
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-right sm:text-[11px]"
                      style={{ color: 'var(--fg-muted)', wordBreak: 'break-all' }}
                    >
                      {handle} <span style={{ color: 'var(--accent)' }}>↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

<div className="mt-20 grid gap-4 border-t pt-8 md:grid-cols-12 md:gap-x-8" style={{ borderColor: 'var(--fg)' }}>
          <p className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
            © {year} · {site.name}
          </p>
          <p className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular md:text-center" style={{ color: 'var(--fg-muted)' }}>
            Da <span style={{ color: 'var(--accent)' }}>planilha</span> ao <span style={{ color: 'var(--accent)' }}>protótipo</span>
          </p>
          <p className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular md:text-right" style={{ color: 'var(--fg-muted)' }}>
            Vol. I · Edição {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
