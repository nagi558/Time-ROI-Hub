export const CATEGORIES = ['appliance', 'subscription'] as const

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
}

export type Preset = {
  slug: string
  name: string
  category: Category
  timeSavedPerDay: number
  defaultPrice: number
}

export type Article = {
  slug: string
  title: string
  description: string
  date: string
  contentHtml: string
  /** 関連記事のslug（テーマの近い2〜3本） */
  related: string[]
  /** 関連プリセットのslug */
  presets: string[]
}
