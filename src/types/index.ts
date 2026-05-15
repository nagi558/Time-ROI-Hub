export const CATEGORIES = ['appliance'] as const

export type Category = (typeof CATEGORIES)[number]

export type ROIInput = {
  price: number
  timeSavedPerDay: number
  hourlyWage: number
  productName?: string
  category?: Category
}

export type ROIResult = {
  dailyBenefit: number
  monthlyBenefit: number
  annualBenefit: number
  paybackMonths: number
  verdictScore: number
  verdict: 'buy' | 'good' | 'maybe' | 'pass'
}

export type Preset = {
  slug: string
  name: string
  category: Category
  timeSavedPerDay: number
  defaultPrice: number
}
