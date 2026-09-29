import type { Preset } from '@/types'

export const appliancePresets: Preset[] = [
  {
    slug: 'dishwasher',
    name: '食洗機',
    category: 'appliance',
    timeSavedPerDay: 30,
    defaultPrice: 100000,
  },
  {
    slug: 'drum-washer',
    name: 'ドラム式洗濯乾燥機',
    category: 'appliance',
    timeSavedPerDay: 21,
    defaultPrice: 200000,
  },
  {
    slug: 'robot-vacuum',
    name: 'ロボット掃除機',
    category: 'appliance',
    timeSavedPerDay: 14,
    defaultPrice: 40000,
  },
  {
    slug: 'dryer',
    name: 'ガス衣類乾燥機（乾太くんなど）',
    category: 'appliance',
    timeSavedPerDay: 12,
    defaultPrice: 200000,
  },
  {
    slug: 'electric-bicycle',
    name: '電動アシスト自転車',
    category: 'appliance',
    timeSavedPerDay: 10,
    defaultPrice: 140000,
  },
]

export const allPresets: Preset[] = [...appliancePresets]

export const getPresetBySlug = (slug: string): Preset | undefined =>
  allPresets.find((p) => p.slug === slug)
