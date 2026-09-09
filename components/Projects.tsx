import { getDict, type Locale } from '@/config/i18n';
import { getCaseStudies } from '@/content/case-studies';
import { CaseStudyRow } from './projects/CaseStudyRow';
import { RepoArchive } from './projects/RepoArchive';

/**
 * Seção § 03 — casca. Antes este arquivo tinha 482 linhas e fazia cinco
 * coisas: buscar da API, ordenar, gerenciar estado, desenhar estudos de caso
 * e desenhar cards. Cada uma dessas responsabilidades mora agora no seu
 * próprio arquivo em `components/projects/`.
 */
export function Projects({ locale = 'pt' }: { locale?: Locale }) {
  const t = getDict(locale).projects;
  const caseStudies = getCaseStudies(locale);

  return (
    <section id="projetos" className="section">
      <div className="frame">
        <div className="reveal grid items-end gap-y-3 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="marker">{t.marker}</p>
          </div>
          <div className="md:col-span-9">
            <div className="rule-thick mb-6" />
            <h2 className="display text-display-md" style={{ fontWeight: 500 }}>
              {t.headingA}{' '}
              <span className="italic" style={{ color: 'var(--accent-ink)' }}>
                {t.headingB}
              </span>
              .
            </h2>
          </div>
        </div>

        {/* Estudos de caso — problema → solução → aprendizado */}
        <div className="mt-14 space-y-12 md:mt-20 md:space-y-16">
          {caseStudies.map((cs, i) => (
            <CaseStudyRow key={cs.slug} cs={cs} index={i} locale={locale} />
          ))}
        </div>

        {/* Arquivo ao vivo — GitHub API, buscado no servidor */}
        <RepoArchive locale={locale} />
      </div>
    </section>
  );
}
