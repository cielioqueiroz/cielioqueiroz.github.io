import { ImageResponse } from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';
import { site } from '@/config/site';

export const dynamic = 'force-static';
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Satori only accepts TTF/OTF (not woff2). We send an ancient User-Agent so
// Google Fonts CSS API serves us the TrueType fallback URL.
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

  const [frauncesDisplay, frauncesItalic, mono] = await Promise.all([
    loadGoogleFont('Fraunces:wght@500'),
    loadGoogleFont('Fraunces:ital,wght@1,500'),
    loadGoogleFont('JetBrains+Mono:wght@400'),
  ]);

  // Editorial palette (light theme tokens)
  const BG = '#F2EDE3';
  const BG_DEEP = '#E8E0CE';
  const FG = '#1A1815';
  const FG_SOFT = '#3D3933';
  const FG_MUTED = '#6B6557';
  const ACCENT = '#C9461E';
  const RULE = 'rgba(26, 24, 21, 0.18)';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BG,
          fontFamily: 'Fraunces',
          color: FG,
          position: 'relative',
        }}
      >
        {/* Atmosphere — radial wash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: `radial-gradient(ellipse 60% 50% at 12% 8%, rgba(201,70,30,0.10), transparent 60%), radial-gradient(ellipse 50% 45% at 95% 95%, rgba(58,74,47,0.08), transparent 60%)`,
          }}
        />

        {/* TOP STRIP */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 64px 18px',
            borderBottom: `1px solid ${FG}`,
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: FG_MUTED,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: ACCENT,
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: ACCENT,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: ACCENT,
                  opacity: 0.3,
                }}
              />
            </div>
            <span style={{ marginLeft: 14 }}>Edição 2026 · Portfólio</span>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            <span>Vol. I</span>
            <span>·</span>
            <span>Nº 01</span>
          </div>
        </div>

        {/* MIDDLE */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            padding: '52px 64px 36px',
            gap: 56,
            alignItems: 'stretch',
          }}
        >
          {/* PORTRAIT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 340,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                width: 340,
                height: 420,
                border: `1px solid ${RULE}`,
                background: BG_DEEP,
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                src={portraitDataUri}
                alt=""
                width={340}
                height={420}
                style={{
                  width: 340,
                  height: 420,
                  objectFit: 'cover',
                  opacity: 0.92,
                }}
              />
              {/* duotone overlay (terracota wash) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  background:
                    'linear-gradient(160deg, rgba(201,70,30,0.35) 0%, rgba(201,70,30,0.05) 55%, rgba(201,70,30,0.28) 100%)',
                }}
              />
              {/* vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  background:
                    'radial-gradient(ellipse at center, transparent 55%, rgba(26,24,21,0.35) 100%)',
                }}
              />
              {/* corner crosshairs */}
              {[
                { top: 10, left: 10 },
                { top: 10, right: 10 },
                { bottom: 10, left: 10 },
                { bottom: 10, right: 10 },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    width: 14,
                    height: 14,
                    ...pos,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 6,
                      left: 0,
                      width: 14,
                      height: 1,
                      background: ACCENT,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 6,
                      top: 0,
                      width: 1,
                      height: 14,
                      background: ACCENT,
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'JetBrains Mono',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: FG_MUTED,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: ACCENT }}>●</span> Retrato
              </span>
              <span>Nº 01 / 2026</span>
            </div>
          </div>

          {/* TEXT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              paddingTop: 4,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'JetBrains Mono',
                  fontSize: 13,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    width: 36,
                    height: 1,
                    background: ACCENT,
                  }}
                />
                <span>§ 01 — Apresentação</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: 132,
                  lineHeight: 0.92,
                  letterSpacing: '-0.035em',
                  fontWeight: 500,
                }}
              >
                <span style={{ color: FG }}>Ciélio</span>
                <span
                  style={{
                    fontFamily: 'Fraunces Italic',
                    fontStyle: 'italic',
                    color: ACCENT,
                    display: 'flex',
                  }}
                >
                  Queiroz<span style={{ color: FG }}>.</span>
                </span>
              </div>

              <div
                style={{
                  marginTop: 28,
                  fontSize: 26,
                  lineHeight: 1.3,
                  color: FG_SOFT,
                  maxWidth: 640,
                  display: 'flex',
                }}
              >
                <span>
                  Desenvolvedor{' '}
                  <span
                    style={{
                      fontFamily: 'Fraunces Italic',
                      fontStyle: 'italic',
                      color: ACCENT,
                    }}
                  >
                    front-end
                  </span>{' '}
                  &amp;{' '}
                  <span
                    style={{
                      fontFamily: 'Fraunces Italic',
                      fontStyle: 'italic',
                      color: ACCENT,
                    }}
                  >
                    analista de dados
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 64px 28px',
            borderTop: `1px solid ${FG}`,
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: FG_MUTED,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ color: ACCENT }}>◆</span>
            <span>React</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Next.js</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Power BI</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>SQL</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>n8n</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: FG,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: ACCENT,
                display: 'flex',
              }}
            />
            <span>cielioqueiroz.github.io</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Fraunces',
          data: frauncesDisplay,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Fraunces Italic',
          data: frauncesItalic,
          weight: 500,
          style: 'italic',
        },
        {
          name: 'JetBrains Mono',
          data: mono,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}
