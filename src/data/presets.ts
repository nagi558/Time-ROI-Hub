import type { Preset } from '@/types'

export const appliancePresets: Preset[] = [
  {
    slug: 'dishwasher',
    name: '食洗機（標準モデル）',
    category: 'appliance',
    timeSavedPerDay: 40,
    defaultPrice: 59800,
  },
  {
    slug: 'drum-washer',
    name: 'ドラム式洗濯乾燥機',
    category: 'appliance',
    timeSavedPerDay: 35,
    defaultPrice: 150000,
  },
  {
    slug: 'robot-vacuum',
    name: 'ロボット掃除機',
    category: 'appliance',
    timeSavedPerDay: 30,
    defaultPrice: 40000,
  },
  {
    slug: 'dryer',
    name: '乾燥機（衣類）',
    category: 'appliance',
    timeSavedPerDay: 20,
    defaultPrice: 50000,
  },
  {
    slug: 'electric-bicycle',
    name: '電動アシスト自転車',
    category: 'appliance',
    timeSavedPerDay: 15,
    defaultPrice: 80000,
  },
]

export const allPresets: Preset[] = [...appliancePresets]

export const getPresetBySlug = (slug: string): Preset | undefined =>
  allPresets.find((p) => p.slug === slug)
