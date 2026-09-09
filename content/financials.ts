/**
 * Modelos financeiros da seção "Planilhas vivas".
 *
 * Antes eram linhas com valores já calculados dentro de `config/site.ts` — uma
 * foto de uma planilha. Aqui virou MODELO: entradas, premissas e a cascata
 * derivada delas, o que permite recalcular cenários no navegador.
 *
 * ⚠️ Correção aplicada na migração: a linha "(–) Despesas Operacionais" valia
 * 19.840.000, mas 35.320.000 − 19.840.000 = 15.480.000, que é o EBIT, não o
 * EBITDA de 18.120.000 declarado logo abaixo. A diferença era exatamente a
 * depreciação (2.640.000), ou seja, a linha somava D&A duas vezes e a DRE não
 * fechava. O valor correto ex-D&A é 17.200.000 — com ele a cascata inteira e
 * as quatro margens publicadas batem.
 */

export type DreModel = {
  /** Receita bruta do cenário-base, em reais. */
  grossRevenue: number;
  /** Crescimento da receita contra o ano anterior. */
  yoyGrowth: number;
  /** Deduções e impostos sobre venda — proporcionais à receita bruta. */
  deductionRate: number;
  /** CPV — proporcional à receita líquida (custo variável). */
  cogsRate: number;
  /** Despesas operacionais ex-depreciação — FIXAS: é daqui que vem a alavancagem. */
  fixedOpex: number;
  /** Depreciação e amortização — fixa, não caixa. */
  depreciation: number;
  /** Resultado financeiro — fixo (juros da dívida existente). */
  financialResult: number;
  /** Alíquota efetiva de IR + CSLL sobre o lucro antes dos impostos. */
  effectiveTaxRate: number;
};

export const dreModel: DreModel = {
  grossRevenue: 95_840_000,
  yoyGrowth: 0.156,
  deductionRate: 12_200_000 / 95_840_000,
  cogsRate: 48_320_000 / 83_640_000,
  fixedOpex: 17_200_000,
  depreciation: 2_640_000,
  financialResult: -1_140_000,
  effectiveTaxRate: 5_430_980 / 14_340_000,
};

export type CashflowRow = {
  month: string;
  income: number;
  expenses: number;
};

/** Fluxo de caixa familiar — dados observados, sem modelo por trás. */
export const cashflow: readonly CashflowRow[] = [
  { month: 'jan', income: 15_735, expenses: 13_967 },
  { month: 'feb', income: 16_120, expenses: 14_240 },
  { month: 'mar', income: 15_980, expenses: 15_320 },
  { month: 'apr', income: 16_540, expenses: 13_870 },
  { month: 'may', income: 17_200, expenses: 14_590 },
  { month: 'jun', income: 16_870, expenses: 15_840 },
];

/** Acima disso o mês entra em alerta: sobra pouco para imprevisto. */
export const CASHFLOW_WATCH_THRESHOLD = 0.92;
