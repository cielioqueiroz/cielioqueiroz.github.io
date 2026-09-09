import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getDict, localePath, type Locale } from '@/config/i18n';
import type { ResolvedCaseStudy } from '@/content/case-studies';

/**
 * Uma linha de estudo de caso na home. O texto completo vive na página
 * dedicada (`/projetos/[slug]`); aqui fica o resumo com o caminho para ela.
 */
export function CaseStudyRow({
  cs,
  index,
  locale,
}: {
  cs: ResolvedCaseStudy;
  index: number;
  locale: Locale;
}) {
  const t = getDict(locale).projects;
  const href = localePath(locale, `/projetos/${cs.slug}`);

  return (
    <article
      className="reveal grid gap-y-6 border-t pt-10 md:grid-cols-12 md:gap-x-8"
      style={{ borderColor: 'var(--fg)' }}
    >
      <div className="md:col-span-3">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em] tabular"
          style={{ color: 'var(--accent-ink)' }}
        >
          {t.caseLabel} {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="display mt-3 text-3xl leading-[1.05] md:text-[36px]" style={{ fontWeight: 500 }}>
          <Link href={href} className="underline-grow">
            {cs.name}
          </Link>
        </h3>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={href} className="pill-solid group">
            {t.readCase}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={cs.repo} target="_blank" rel="noopener noreferrer" className="pill group">
            {t.codeBtn}
            <ArrowUpRight size={13} className="transition-transform group-hover:rotate-45" />
          </a>
          {cs.demo && (
            <a href={cs.demo} target="_blank" rel="noopener noreferrer" className="pill group">
              {t.demoBtn}
              <ArrowUpRight size={13} className="transition-transform group-hover:rotate-45" />
            </a>
          )}
        </div>
      </div>

      <div className="md:col-span-9">
        {/* O print vem antes do texto: em trinta segundos de leitura, ver o
            sistema funcionando convence mais do que ler que ele funciona.
            `sizes` evita que o navegador baixe a versão de 1400px numa coluna
            que, no desktop, tem uns 700 — e as dimensões declaradas no
            conteúdo reservam o espaço antes do download, sem salto de layout. */}
        <figure className="mb-8 overflow-hidden" style={{ borderRadius: 'var(--r-md)', border: '1px solid var(--rule)' }}>
          <Image
            src={cs.shot.src}
            alt={t.shotAlt(cs.name)}
            width={cs.shot.width}
            height={cs.shot.height}
            sizes="(min-width: 768px) 66vw, 100vw"
            className="h-auto w-full"
          />
        </figure>

        <dl className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <dt className="kicker mb-2">{t.contextLabel}</dt>
            <dd className="text-[15px] leading-[1.65]" style={{ color: 'var(--fg-soft)' }}>
              {cs.context}
            </dd>
          </div>
          <div>
            <dt className="kicker mb-2">{t.solutionLabel}</dt>
            <dd className="text-[15px] leading-[1.65]" style={{ color: 'var(--fg-soft)' }}>
              {cs.solution}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
          <div>
            <p className="kicker mb-2">{t.stackLabel}</p>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.16em] leading-[2]"
              style={{ color: 'var(--fg-muted)' }}
            >
              {cs.stack.map((s, i) => (
                <span key={s}>
                  {i > 0 && <span style={{ color: 'var(--accent-ink)' }}> · </span>}
                  {s}
                </span>
              ))}
            </p>
          </div>
          <p
            className="body-serif max-w-md text-[16px] italic leading-[1.5] md:text-right"
            style={{ color: 'var(--fg-soft)' }}
          >
            <span className="kicker not-italic mr-2" style={{ color: 'var(--accent-ink)' }}>
              {t.takeawayLabel} →
            </span>
            {cs.takeaway}
          </p>
        </div>
      </div>
    </article>
  );
}
