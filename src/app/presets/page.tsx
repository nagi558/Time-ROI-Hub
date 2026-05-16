import Link from 'next/link'
import type { Metadata } from 'next'
import { allPresets } from '@/data/presets'
import { calcROI } from '@/lib/roi'
import { formatMonths } from '@/lib/format'

export const metadata: Metadata = {
  title: '人気プリセット一覧',
  description:
    '食洗機・ロボット掃除機など人気家電の時間ROIをワンタップで確認。',
}

export default function PresetsPage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">
            人気の家電プリセット
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          {allPresets.map((preset) => {
            const result = calcROI({
              price: preset.defaultPrice,
              timeSavedPerDay: preset.timeSavedPerDay,
              hourlyWage: 1500,
            })

            return (
              <Link
                key={preset.slug}
                href={`/presets/${preset.slug}`}
                className="flex items-center justify-between px-4 py-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {preset.name}
                </span>
                <span className="text-sm font-semibold text-green-700">
                  {formatMonths(result.paybackMonths)}
                </span>
              </Link>
            )
          })}
        </div>

        <Link
          href="/calculate"
          className="w-full py-4 bg-green-800 text-white text-center text-sm font-semibold rounded-xl hover:bg-green-900 transition-colors"
        >
          自分の条件で計算する
        </Link>
      </div>
    </main>
  )
}
