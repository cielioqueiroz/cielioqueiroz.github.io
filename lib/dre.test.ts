import { describe, expect, it } from 'vitest';
import { computeDre } from '@/lib/dre';
import { dreModel, type DreModel } from '@/content/financials';

/**
 * O que estes testes protegem.
 *
 * O cabeçalho de `content/financials.ts` conta que a DRE publicada já esteve
 * ERRADA: a linha de despesas operacionais somava a depreciação duas vezes e
 * a cascata não fechava — 35.320.000 − 19.840.000 dava o EBIT, não o EBITDA
 * declarado logo abaixo. O erro passou porque nada verificava a soma.
 *
 * `cenário-base` abaixo é essa verificação: se qualquer premissa do modelo for
 * mexida sem querer, os números publicados deixam de bater e o teste avisa.
 * Os demais blocos travam as regras que dão sentido ao simulador — alavancagem
 * operacional, prejuízo sem imposto e a aritmética interna da cascata.
 */

const line = (id: string, multiplier = 1) => {
  const found = computeDre(dreModel, multiplier).lines.find((l) => l.id === id);
  if (!found) throw new Error(`linha ${id} não existe na cascata`);
  return found;
};

const value = (id: string, multiplier = 1) => line(id, multiplier).value;

describe('cenário-base — os números publicados no site', () => {
  // Fonte: os valores auditados no cabeçalho de content/financials.ts.
  it.each([
    ['grossRevenue', 95_840_000],
    ['deductions', -12_200_000],
    ['netRevenue', 83_640_000],
    ['cogs', -48_320_000],
    ['grossProfit', 35_320_000],
    ['opex', -17_200_000],
    ['ebitda', 18_120_000],
    ['depreciation', -2_640_000],
    ['ebit', 15_480_000],
    ['financialResult', -1_140_000],
    ['taxes', -5_430_980],
    ['netIncome', 8_909_020],
  ])('%s vale %i', (id, expected) => {
    expect(value(id)).toBeCloseTo(expected, 2);
  });

  it('mantém as quatro margens divulgadas', () => {
    const { kpis } = computeDre(dreModel, 1);
    const kpi = (id: string) => kpis.find((k) => k.id === id)?.value ?? NaN;

    expect(kpi('grossMargin')).toBeCloseTo(0.3685, 3);
    expect(kpi('ebitdaMargin')).toBeCloseTo(0.1891, 3);
    expect(kpi('netMargin')).toBeCloseTo(0.0930, 3);
    expect(kpi('revenueYoY')).toBe(dreModel.yoyGrowth);
  });
});

describe('a cascata fecha', () => {
  // Cada subtotal é a soma exata dos que vêm acima dele. É esta invariante
  // que a versão antiga da tabela violava.
  it.each([1, 0.7, 1.3, 0.85])('soma linha a linha no cenário ×%s', (m) => {
    expect(value('netRevenue', m)).toBeCloseTo(value('grossRevenue', m) + value('deductions', m), 6);
    expect(value('grossProfit', m)).toBeCloseTo(value('netRevenue', m) + value('cogs', m), 6);
    expect(value('ebitda', m)).toBeCloseTo(value('grossProfit', m) + value('opex', m), 6);
    expect(value('ebit', m)).toBeCloseTo(value('ebitda', m) + value('depreciation', m), 6);
    expect(value('netIncome', m)).toBeCloseTo(
      value('ebit', m) + value('financialResult', m) + value('taxes', m),
      6
    );
  });

  it('deduções, CPV, despesas e depreciação sempre saem negativas', () => {
    for (const m of [0.7, 1, 1.3]) {
      expect(value('deductions', m)).toBeLessThan(0);
      expect(value('cogs', m)).toBeLessThan(0);
      expect(value('opex', m)).toBeLessThan(0);
      expect(value('depreciation', m)).toBeLessThan(0);
    }
  });

  it('a análise vertical de cada linha é a participação sobre a receita bruta', () => {
    const { lines, grossRevenue } = computeDre(dreModel, 1.2);
    for (const l of lines) {
      expect(l.av).toBeCloseTo(l.value / grossRevenue, 9);
    }
  });
});

describe('alavancagem operacional — o argumento do simulador', () => {
  it('lucro líquido cresce mais que proporcionalmente à receita', () => {
    const base = value('netIncome', 1);
    const up = value('netIncome', 1.2);

    // Receita +20%; se as despesas fossem todas variáveis, o lucro subiria
    // exatamente 20%. Como opex/D&A são fixos, sobe bem mais.
    expect(up / base).toBeGreaterThan(1.2);
  });

  it('e afunda mais que proporcionalmente quando a receita cai', () => {
    const base = value('netIncome', 1);
    const down = value('netIncome', 0.8);

    expect(down / base).toBeLessThan(0.8);
  });

  it('a margem líquida se move na mesma direção da receita', () => {
    const margin = (m: number) => computeDre(dreModel, m).kpis.find((k) => k.id === 'netMargin')!.value;

    expect(margin(0.7)).toBeLessThan(margin(1));
    expect(margin(1)).toBeLessThan(margin(1.3));
  });
});

describe('cenários que quebravam a versão anterior', () => {
  it('prejuízo não gera imposto a pagar', () => {
    // Receita despencando 60% leva o resultado antes do IR para o negativo.
    const collapsed = computeDre(dreModel, 0.4);
    const preTax =
      collapsed.lines.find((l) => l.id === 'ebit')!.value +
      collapsed.lines.find((l) => l.id === 'financialResult')!.value;

    expect(preTax).toBeLessThan(0);
    expect(collapsed.lines.find((l) => l.id === 'taxes')!.value).toBe(0);
    // Sem essa regra o "imposto" viria positivo e maquiaria o prejuízo.
    expect(collapsed.lines.find((l) => l.id === 'netIncome')!.value).toBeLessThan(0);
  });

  it('receita zero não divide por zero na análise vertical', () => {
    const empty: DreModel = { ...dreModel, grossRevenue: 0 };
    const result = computeDre(empty, 1);

    for (const l of result.lines) {
      expect(Number.isFinite(l.av)).toBe(true);
      expect(l.av).toBe(0);
    }
  });

  it('multiplicador padrão é o cenário-base', () => {
    expect(computeDre(dreModel)).toEqual(computeDre(dreModel, 1));
  });

  it('é função pura: mesma entrada, mesma saída, sem mutar o modelo', () => {
    const snapshot = { ...dreModel };
    computeDre(dreModel, 1.3);

    expect(dreModel).toEqual(snapshot);
    expect(computeDre(dreModel, 1.3)).toEqual(computeDre(dreModel, 1.3));
  });
});
