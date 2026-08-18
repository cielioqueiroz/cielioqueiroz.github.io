import Image from 'next/image';
import { getDict, type Locale } from '@/config/i18n';
import { site } from '@/config/site';
import portrait from '@/public/portrait.webp';

/**
 * Retrato do hero — Server Component.
 *
 * Antes era client: renderizava vazio, esperava o JS carregar, sondava
 * `/portrait.webp` com `new Image()` e só então definia o `src`. Como esta é
 * a maior imagem acima da dobra, essa cascata atrasava o LCP em toda visita
 * para proteger contra um arquivo que está versionado no repositório.
 *
 * Agora a imagem vai no HTML com `priority`, dimensões vindas do import
 * estático (zero layout shift) e placeholder borrado durante o carregamento.
 */
export function Portrait({ locale = 'pt' }: { locale?: Locale }) {
  const alt = getDict(locale).hero.portraitAlt(site.name);

  return (
    <div className="portrait-frame aspect-[4/5]">
      <span className="crosshair tl" aria-hidden />
      <span className="crosshair tr" aria-hidden />
      <span className="crosshair bl" aria-hidden />
      <span className="crosshair br" aria-hidden />

      <Image
        src={portrait}
        alt={alt}
        priority
        placeholder="blur"
        sizes="(max-width: 768px) 280px, 320px"
        style={{ position: 'relative', zIndex: 2 }}
      />
    </div>
  );
}
