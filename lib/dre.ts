import type { DreModel } from '@/content/financials';

/**
 * Cascata da DRE a partir do modelo. Função pura: mesma entrada, mesma saída —
 * o componente só desenha o que ela devolve.
 *
 * Premissa que faz o cenário ter graça: deduções e CPV são variáveis
 * (acompanham a receita), enquanto despesas operacionais, depreciação e
 * resultado financeiro são fixos. É essa combinação que produz alavancagem
 * operacional — receita subindo 20% faz a margem líquida subir bem mais que
 * 20%, e caindo, o efeito é igualmente cruel.
 */

export type DreLineId =
  | 'grossRevenue'
  | 'deductions'
  | 'netRevenue'
  | 'cogs'
  | 'grossProfit'
  | 'opex'
  | 'ebitda'
  | 'depreciation'
  | 'ebit'
  | 'financialResult'
  | 'taxes'
  | 'netIncome';

export type DreLineKind = 'header' | 'subtotal' | 'highlight' | 'total' | 'line';

export type DreLine = {
  id: DreLineId;
  kind: DreLineKind;
  value: number;
  /** Análise vertical: participação sobre a receita bruta. */
  av: number;
};

export type DreKpiId = 'grossMargin' | 'ebitdaMargin' | 'netMargin' | 'revenueYoY';

export type DreKpi = { id: DreKpiId; value: number; kind: 'percent' | 'signedPercent' };

export type DreResult = {
  lines: DreLine[];
  kpis: DreKpi[];
  grossRevenue: number;
};

/**
 * @param model    premissas do cenário-base
 * @param multiplier 1 = cenário-base; 1.2 = receita 20% maior
 */
export function computeDre(model: DreModel, multiplier = 1): DreResult {
  const grossRevenue = model.grossRevenue * multiplier;

  const deductions = -(grossRevenue * model.deductionRate);
  const netRevenue = grossRevenue + deductions;

  const cogs = -(netRevenue * model.cogsRate);
  const grossProfit = netRevenue + cogs;

  // Fixos: não acompanham a receita.
  const opex = -model.fixedOpex;
  const ebitda = grossProfit + opex;

  const depreciation = -model.depreciation;
  const ebit = ebitda + depreciation;

  const financialResult = model.financialResult;
  const preTax = ebit + financialResult;

  // Prejuízo não gera imposto a pagar — sem isso o cenário negativo mostraria
  // um "imposto" positivo maquiando o resultado.
  const taxes = preTax > 0 ? -(preTax * model.effectiveTaxRate) : 0;
  const netIncome = preTax + taxes;

  const av = (v: number) => (grossRevenue === 0 ? 0 : v / grossRevenue);

  const lines: DreLine[] = [
    { id: 'grossRevenue', kind: 'header', value: grossRevenue, av: av(grossRevenue) },
    { id: 'deductions', kind: 'line', value: deductions, av: av(deductions) },
    { id: 'netRevenue', kind: 'subtotal', value: netRevenue, av: av(netRevenue) },
    { id: 'cogs', kind: 'line', value: cogs, av: av(cogs) },
    { id: 'grossProfit', kind: 'subtotal', value: grossProfit, av: av(grossProfit) },
    { id: 'opex', kind: 'line', value: opex, av: av(opex) },
    { id: 'ebitda', kind: 'highlight', value: ebitda, av: av(ebitda) },
    { id: 'depreciation', kind: 'line', value: depreciation, av: av(depreciation) },
    { id: 'ebit', kind: 'subtotal', value: ebit, av: av(ebit) },
    { id: 'financialResult', kind: 'line', value: financialResult, av: av(financialResult) },
    { id: 'taxes', kind: 'line', value: taxes, av: av(taxes) },
    { id: 'netIncome', kind: 'total', value: netIncome, av: av(netIncome) },
  ];

  const kpis: DreKpi[] = [
    { id: 'grossMargin', value: av(grossProfit), kind: 'percent' },
    { id: 'ebitdaMargin', value: av(ebitda), kind: 'percent' },
    { id: 'netMargin', value: av(netIncome), kind: 'percent' },
    { id: 'revenueYoY', value: model.yoyGrowth, kind: 'signedPercent' },
  ];

  return { lines, kpis, grossRevenue };
}
