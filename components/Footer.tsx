import { site } from '@/config/site';
import { getDict, type Locale } from '@/config/i18n';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { CopyEmailButton } from './CopyEmailButton';
import { CVFooterRow } from './CVFooterRow';

export function Footer({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).footer;
  const year = new Date().getFullYear();

  const socials = [
    { icon: FaLinkedin, href: site.socials.linkedin, label: 'LinkedIn', handle: '/jacielio-queiroz' },
    { icon: FaGithub, href: site.socials.github, label: 'GitHub', handle: '@cielioqueiroz' },
    { icon: FaInstagram, href: site.socials.instagram, label: 'Instagram', handle: '@cielio.queiroz' },
    { icon: Mail, href: `mailto:${site.socials.email}`, label: t.emailLabel, handle: site.socials.email },
  ];

  const [mottoA, mottoHl1, mottoB, mottoHl2] = t.motto;

  return (
    <footer
      className="relative mt-12 pt-16 pb-12"
      style={{ background: 'color-mix(in srgb, var(--bg-deep) 70%, var(--bg))' }}
    >
      <div className="frame">

        <div className="grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">{t.marker}</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick" />
          </div>
        </div>

<div className="mt-14 md:mt-20">
          <p className="kicker mb-6">{t.talk}</p>
          <a
            href={`mailto:${site.socials.email}`}
            className="display block leading-[0.92] transition-colors hover:text-[color:var(--accent-ink)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(2rem, 8vw, 7rem)',
              wordBreak: 'break-word',
            }}
          >
            <span className="italic" >
              cielioqueiroz
            </span>
            <span style={{ color: 'var(--fg-muted)' }}>@</span>
            <wbr />
            hotmail<span style={{ color: 'var(--fg-muted)' }}>.com</span>
          </a>
          <div className="mt-6">
            <CopyEmailButton
              label
              locale={locale}
              className="inline-flex items-center gap-2 border-[1.5px] border-[var(--fg)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-contrast)]"
            />
          </div>
        </div>

<div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-4">
            <p className="kicker mb-4">{t.address}</p>
            <p className="body-serif text-lg leading-[1.4]">
              {site.location}
              <br />
              <span style={{ color: 'var(--fg-muted)' }}>{t.country}</span>
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="kicker mb-4">{t.meets}</p>
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
                      <Icon size={14} className="transition-colors group-hover:text-[color:var(--accent-ink)]" style={{ color: 'var(--fg-muted)' }} />
                      <span className="body-serif text-lg transition-colors group-hover:text-[color:var(--accent-ink)]">
                        {label}
                      </span>
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-right sm:text-[11px]"
                      style={{ color: 'var(--fg-muted)', wordBreak: 'break-all' }}
                    >
                      {handle} <span style={{ color: 'var(--accent-ink)' }}>↗</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <CVFooterRow locale={locale} />
              </li>
            </ul>
          </div>
        </div>

<div className="mt-20 grid gap-4 border-t pt-8 md:grid-cols-12 md:gap-x-8" style={{ borderColor: 'var(--fg)' }}>
          <p className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular" style={{ color: 'var(--fg-muted)' }}>
            © {year} · {site.name}
          </p>
          <p className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular md:text-center" style={{ color: 'var(--fg-muted)' }}>
            {mottoA}<span style={{ color: 'var(--accent-ink)' }}>{mottoHl1}</span>{mottoB}<span style={{ color: 'var(--accent-ink)' }}>{mottoHl2}</span>
          </p>
          <p className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.22em] tabular md:text-right" style={{ color: 'var(--fg-muted)' }}>
            {t.edition(year)}
          </p>
        </div>
      </div>
    </footer>
  );
}
