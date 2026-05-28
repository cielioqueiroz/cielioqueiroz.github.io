import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Site } from '@/config/site';

/* ---- Fontes (instâncias estáticas servidas de /public/fonts/cv) ---- */
Font.register({
  family: 'Fraunces',
  fonts: [
    { src: '/fonts/cv/Fraunces-Regular.ttf' },
    { src: '/fonts/cv/Fraunces-Italic.ttf', fontStyle: 'italic' },
    { src: '/fonts/cv/Fraunces-Medium.ttf', fontWeight: 500 },
  ],
});
Font.register({
  family: 'InstrumentSans',
  fonts: [
    { src: '/fonts/cv/InstrumentSans-Regular.ttf' },
    { src: '/fonts/cv/InstrumentSans-Italic.ttf', fontStyle: 'italic' },
  ],
});
Font.register({
  family: 'JetBrainsMono',
  fonts: [{ src: '/fonts/cv/JetBrainsMono-Regular.ttf' }],
});

// Sem hifenização automática — evita quebras feias em palavras longas.
Font.registerHyphenationCallback((word) => [word]);

/* ---- Paleta (alinhada ao site, mas otimizada p/ impressão e ATS) ---- */
const C = {
  ink: '#1A1815',
  soft: '#3D3933',
  muted: '#6B6557',
  accent: '#C9461E',
  rule: '#D8D0C2',
  paper: '#FFFFFF',
};

/* ---- Curadoria editorial dos certificados (decisão do CV, não do site) ---- */
const CERT_HIGHLIGHTS: Record<string, string[]> = {
  Programação: [
    'Formação Full Stack JavaScript (50h) — Thiago M. Medeiros',
    'Santander Bootcamp Dev 2024 — Santander / DIO',
    'Responsive Web Design — freeCodeCamp',
    'Cibersegurança · Nivelamento (80h) — Hackers do Bem',
  ],
  'Dados & BI': [
    'Power BI para Business Intelligence e Data Science — Preditiva',
    'Analista de Dados com Power BI — EduLiv',
    'Power BI · Dashboard de Fluxo de Caixa — LinkedIn Learning',
  ],
  'IA & Automação': [
    'n8n em 1 hora — Hora de Codar',
    'Agente de IA no n8n — Hora de Codar',
    'ChatGPT para Desenvolvedores — Hora de Codar',
    'Power Apps Expert — Viscari',
  ],
  Administração: [
    'Analista Financeiro',
    'Fluxo de Caixa',
    'Inglês para Negócios — LinkedIn Learning',
  ],
};

const PROFILE =
  'Administrador formado com mais de 15 anos em gestão administrativa e financeira ' +
  '(contas a pagar/receber, fluxo de caixa, conciliações), agora desenvolvedor front-end ' +
  'com React, Next.js e TypeScript. Visão de negócio aplicada a interfaces e dashboards ' +
  'que geram decisão.';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const fmt = (iso: string) => {
  const [y, m] = iso.split('-');
  return `${MESES[Number(m) - 1]}/${y}`;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: C.paper,
    color: C.ink,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 46,
    fontFamily: 'InstrumentSans',
    fontSize: 9.5,
    lineHeight: 1.5,
  },

  /* Header */
  name: { fontFamily: 'Fraunces', fontSize: 28, lineHeight: 1 },
  nameAccent: { fontFamily: 'Fraunces', fontStyle: 'italic', color: C.accent },
  role: { fontSize: 11, color: C.soft, marginTop: 6 },
  headerRule: { height: 1.5, backgroundColor: C.accent, marginTop: 12, marginBottom: 10 },
  contactLine: { fontFamily: 'JetBrainsMono', fontSize: 8, color: C.muted },
  portfolioLine: { fontFamily: 'JetBrainsMono', fontSize: 8, color: C.accent, marginTop: 4 },

  /* Seções */
  section: { marginTop: 20 },
  marker: {
    fontFamily: 'JetBrainsMono',
    fontSize: 8,
    color: C.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  profile: { fontSize: 10, color: C.soft, lineHeight: 1.6 },

  /* Experiência */
  job: { marginBottom: 12 },
  jobHead: { fontFamily: 'Fraunces', fontSize: 12, color: C.ink },
  jobCompany: { fontStyle: 'italic', color: C.soft },
  jobPeriod: {
    fontFamily: 'JetBrainsMono',
    fontSize: 8.5,
    color: C.accent,
    marginTop: 2,
    marginBottom: 4,
  },
  bulletRow: { flexDirection: 'row', marginBottom: 2 },
  bulletDot: { color: C.accent, marginRight: 6 },
  bulletText: { flex: 1, color: C.soft },

  /* Formação / Stack — linhas label + valor */
  defRow: { flexDirection: 'row', marginBottom: 5 },
  defLabel: {
    width: 110,
    fontFamily: 'JetBrainsMono',
    fontSize: 8,
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingTop: 1,
  },
  defValue: { flex: 1, color: C.soft },

  /* Credenciais */
  certGroup: { marginBottom: 10 },
  certHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  certCat: { fontFamily: 'Fraunces', fontSize: 11, color: C.ink },
  certCount: { fontFamily: 'JetBrainsMono', fontSize: 8, color: C.accent },
  certItem: { color: C.soft, marginBottom: 1.5 },
  certClose: { fontStyle: 'italic', color: C.muted, marginTop: 2 },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 46,
    right: 46,
    fontFamily: 'JetBrainsMono',
    fontSize: 7.5,
    color: C.muted,
    textAlign: 'center',
    borderTopWidth: 0.5,
    borderTopColor: C.rule,
    paddingTop: 6,
  },
});

const linkedinDisplay = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function CVDocument({ site }: { site: Site }) {
  const generatedOn = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const contacts = [
    site.location,
    site.phone,
    site.socials.email,
    linkedinDisplay(site.socials.linkedin),
  ].join('   ·   ');

  const certCount = (cat: string) =>
    site.certificates.filter((c) => c.category === cat).length;

  return (
    <Document
      title={`${site.name} — Currículo`}
      author={site.fullName}
      subject={site.title}
    >
      {/* ---------------- Página 1 ---------------- */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>
            Jaciélio (Ciélio) <Text style={styles.nameAccent}>Queiroz</Text>
          </Text>
          <Text style={styles.role}>{site.title}</Text>
          <View style={styles.headerRule} />
          <Text style={styles.contactLine}>{contacts}</Text>
          <Text style={styles.portfolioLine}>Portfólio: cielioqueiroz.github.io</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.marker}>§ 01 — Perfil</Text>
          <Text style={styles.profile}>{PROFILE}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.marker}>§ 02 — Experiência</Text>
          {site.experience.map((job) => (
            <View key={`${job.company}-${job.start}`} style={styles.job} wrap={false}>
              <Text style={styles.jobHead}>
                {job.role} <Text style={styles.jobCompany}>· {job.company}</Text>
              </Text>
              <Text style={styles.jobPeriod}>
                {fmt(job.start)} — {fmt(job.end)}
              </Text>
              {job.achievements.map((a, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>›</Text>
                  <Text style={styles.bulletText}>{a}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.marker}>§ 03 — Formação</Text>
          {site.education.map((ed) => (
            <View key={ed.degree} style={styles.defRow}>
              <Text style={styles.defLabel}>Graduação</Text>
              <Text style={styles.defValue}>
                {ed.degree} · {ed.school} · {ed.year}
              </Text>
            </View>
          ))}
        </View>
      </Page>

      {/* ---------------- Página 2 ---------------- */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.marker}>§ 04 — Stack &amp; Ferramentas</Text>
          {site.skills.map((group) => (
            <View key={group.category} style={styles.defRow}>
              <Text style={styles.defLabel}>{group.category}</Text>
              <Text style={styles.defValue}>
                {group.items.map((it) => it.name).join(', ')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.marker}>§ 05 — Credenciais</Text>
          {Object.entries(CERT_HIGHLIGHTS).map(([cat, items]) => (
            <View key={cat} style={styles.certGroup} wrap={false}>
              <View style={styles.certHead}>
                <Text style={styles.certCat}>{cat}</Text>
                <Text style={styles.certCount}>{certCount(cat)} certificados</Text>
              </View>
              {items.map((title, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>·</Text>
                  <Text style={styles.certItem}>{title}</Text>
                </View>
              ))}
            </View>
          ))}
          <Text style={styles.certClose}>
            Lista completa dos {site.certificates.length} certificados em cielioqueiroz.github.io
          </Text>
        </View>

        <Text style={styles.footer} fixed>
          Gerado em {generatedOn}  ·  Vol. I, Ed. 2026
        </Text>
      </Page>
    </Document>
  );
}
