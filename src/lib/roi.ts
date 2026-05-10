import type { ROIInput, ROIResult } from '@/types'

export function calcROI(input: ROIInput): ROIResult {
  const dailyBenefit = (input.timeSavedPerDay / 60) * input.hourlyWage
  const monthlyBenefit = dailyBenefit * 30
  const annualBenefit = dailyBenefit * 365

  const paybackMonths =
    monthlyBenefit <= 0 ? Infinity : input.price / monthlyBenefit

  const verdictScore =
    paybackMonths <= 3
      ? 100
      : paybackMonths <= 6
        ? 70
        : paybackMonths <= 12
          ? 40
          : 10

  const verdict =
    verdictScore === 100
      ? 'buy'
      : verdictScore === 70
        ? 'good'
        : verdictScore === 40
          ? 'maybe'
          : 'pass'

  return {
    dailyBenefit,
    monthlyBenefit,
    annualBenefit,
    paybackMonths,
    verdictScore,
    verdict,
  }
}
