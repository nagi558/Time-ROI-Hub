import Link from 'next/link'
import type { Metadata } from 'next'
import { allPresets, getPresetBySlug } from '@/data/presets'
import { calcROI } from '@/lib/roi'
import { formatYen, formatMonths } from '@/lib/format'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allPresets.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const preset = getPresetBySlug(slug)
  if (!preset) return {}
  return {
    title: `${preset.name}は元が取れる？`,
    description: `${preset.name}の投資回収期間を時間単位で計算。あなたの時給で「買い」かどうか判定します。`,
  }
}

export default async function PresetDetailPage({ params }: Props) {
  const { slug } = await params
  const preset = getPresetBySlug(slug)

  if (!preset) notFound()

  const result = calcROI({
    price: preset.defaultPrice,
    timeSavedPerDay: preset.timeSavedPerDay,
    hourlyWage: 1500,
  })

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Time ROI Hub</p>
          <h1 className="text-2xl font-bold text-gray-900">{preset.name}</h1>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-2xl p-6 bg-green-50">
          <p className="text-sm font-medium text-gray-600">回収期間</p>
          <p className="text-5xl font-bold text-green-700">
            {formatMonths(result.paybackMonths)}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">計算条件</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">購入価格</span>
              <span className="font-medium text-gray-900">
                {formatYen(preset.defaultPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">時短時間</span>
              <span className="font-medium text-gray-900">{preset.timeSavedPerDay}分/日</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">時給</span>
              <span className="font-medium text-gray-900">¥1,500/時</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Link
            href={`/calculate?price=${preset.defaultPrice}&time=${preset.timeSavedPerDay}`}
            className="w-full py-4 bg-green-800 text-white text-center text-sm font-semibold rounded-xl hover:bg-green-900 transition-colors"
          >
            自分の時給で計算する
          </Link>
          <Link
            href="/presets"
            className="w-full py-4 text-center text-sm text-green-800 font-medium"
          >
            ← プリセット一覧に戻る
          </Link>
          <Link
            href="/"
            className="w-full text-center text-sm text-gray-500 font-medium"
          >
            ← ホームへ戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
