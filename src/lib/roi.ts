import type { ROIInput, ROIResult } from '@/types'

export function calcROI(input: ROIInput): ROIResult {
  const dailyBenefit = (input.timeSavedPerDay / 60) * input.hourlyWage
  const monthlyBenefit = dailyBenefit * 30
  const annualBenefit = dailyBenefit * 365

  const paybackMonths =
    monthlyBenefit <= 0 ? Infinity : input.price / monthlyBenefit

  return {
    dailyBenefit,
    monthlyBenefit,
    annualBenefit,
    paybackMonths,
  }
}
