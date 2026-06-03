import { ImageResponse } from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';
import { site } from '@/config/site';
import { banner } from '@/config/theme';

export const dynamic = 'force-static';
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Satori só aceita TTF/OTF (não woff2). Enviamos um User-Agent antigo para a
// API de CSS do Google Fonts servir a URL TrueType de fallback.
async function loadGoogleFont(spec: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`;
  const css = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux i686; rv:7.0) Gecko/20100101 Firefox/7.0',
    },
  }).then((r) => r.text());
  const match = css.match(
    /src:\s*url\((https:[^)]+)\)\s*format\('(woff|truetype|opentype)'\)/
  );
  if (!match) throw new Error(`Font not found for: ${spec}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const portraitPath = path.join(process.cwd(), 'public', 'portrait.jpg');
  const portraitBuffer = await fs.readFile(portraitPath);
  const portraitDataUri = `data:image/jpeg;base64,${portraitBuffer.toString('base64')}`;

  const [grotesk, groteskMed, mono] = await Promise.all([
    loadGoogleFont('Schibsted+Grotesk:wght@800'),
    loadGoogleFont('Schibsted+Grotesk:wght@500'),
    loadGoogleFont('Geist+Mono:wght@500'),
  ]);

  // Paleta "Mono Brutalist" — segue config/theme.ts (tema claro).
  const { BG, BG_DEEP, FG, FG_MUTED, ACCENT, INK_ON_ACCENT, RULE } = banner;

  const monoLabel = {
    fontFamily: 'Geist Mono',
    fontSize: 15,
    letterSpacing: '0.24em',
    textTransform: 'uppercase' as const,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BG,
          fontFamily: 'Schibsted Grotesk',
          color: FG,
          position: 'relative',
        }}
      >
        {/* Moldura brutalista */}
        <div
          style={{
            position: 'absolute',
            inset: 18,
            display: 'flex',
            border: `3px solid ${RULE}`,
          }}
        />
        {/* Wash lima no canto superior direito */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 360,
            height: 240,
            display: 'flex',
            background: `radial-gradient(ellipse 100% 100% at 100% 0%, ${ACCENT}, transparent 70%)`,
            opacity: 0.5,
          }}
        />

        {/* TOPO */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '18px 18px 0',
            padding: '26px 44px 22px',
            borderBottom: `3px solid ${RULE}`,
            ...monoLabel,
            color: FG_MUTED,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 7 }}>
              <div style={{ width: 11, height: 11, background: ACCENT }} />
              <div style={{ width: 11, height: 11, background: FG }} />
              <div style={{ width: 11, height: 11, background: FG }} />
            </div>
            <span>Portfólio · Edição 2026</span>
          </div>
          <span>Vol. I / Nº 01</span>
        </div>

        {/* MEIO */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            margin: '0 18px',
            padding: '46px 44px 30px',
            gap: 52,
            alignItems: 'center',
          }}
        >
          {/* RETRATO */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: 312,
              height: 392,
              border: `3px solid ${FG}`,
              background: BG_DEEP,
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src={portraitDataUri}
              alt=""
              width={312}
              height={392}
              style={{ width: 312, height: 392, objectFit: 'cover' }}
            />
            {/* duotone lima */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                background: `linear-gradient(150deg, ${ACCENT} 0%, transparent 48%, ${ACCENT} 100%)`,
                opacity: 0.4,
              }}
            />
            {/* crosshairs nos cantos */}
            {[
              { top: 9, left: 9 },
              { top: 9, right: 9 },
              { bottom: 9, left: 9 },
              { bottom: 9, right: 9 },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', display: 'flex', width: 16, height: 16, ...pos }}>
                <div style={{ position: 'absolute', top: 7, left: 0, width: 16, height: 2, background: FG }} />
                <div style={{ position: 'absolute', left: 7, top: 0, width: 2, height: 16, background: FG }} />
              </div>
            ))}
          </div>

          {/* TEXTO */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* tag lima */}
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: ACCENT,
                color: INK_ON_ACCENT,
                padding: '8px 14px',
                marginBottom: 26,
                ...monoLabel,
                fontSize: 14,
                letterSpacing: '0.2em',
              }}
            >
              § 01 — Apresentação
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Schibsted Grotesk',
                fontWeight: 800,
                fontSize: 116,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'flex', color: FG }}>Ciélio</span>
              <span style={{ display: 'flex' }}>
                <span style={{ display: 'flex', background: ACCENT, color: INK_ON_ACCENT, padding: '0 14px' }}>
                  Queiroz
                </span>
              </span>
            </div>

            <div
              style={{
                marginTop: 30,
                display: 'flex',
                fontFamily: 'Geist Mono',
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.35,
                letterSpacing: '0.02em',
                color: FG_MUTED,
                maxWidth: 600,
              }}
            >
              <span>Desenvolvedor front-end &amp; analista de dados</span>
            </div>
          </div>
        </div>

        {/* RODAPÉ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 18px 18px',
            padding: '22px 44px 26px',
            borderTop: `3px solid ${RULE}`,
            ...monoLabel,
            fontSize: 14,
            color: FG_MUTED,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 10, height: 10, background: ACCENT }} />
            <span>React</span>
            <span>·</span>
            <span>Next.js</span>
            <span>·</span>
            <span>Power BI</span>
            <span>·</span>
            <span>SQL</span>
            <span>·</span>
            <span>n8n</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: FG }}>
            <span>cielioqueiroz.github.io</span>
            <div style={{ width: 10, height: 10, background: ACCENT }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Schibsted Grotesk', data: grotesk, weight: 800, style: 'normal' },
        { name: 'Schibsted Grotesk', data: groteskMed, weight: 500, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 500, style: 'normal' },
      ],
    }
  );
}
