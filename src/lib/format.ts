export const formatYen = (value: number): string =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value)

export const formatMonths = (months: number): string =>
  months === Infinity ? '回収不可' : `${months.toFixed(1)}ヶ月`
