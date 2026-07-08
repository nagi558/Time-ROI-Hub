import Link from 'next/link'
import type { Metadata } from 'next'
import { calcROI } from '@/lib/roi'
import { formatYen, formatMonths } from '@/lib/format'
import type { ROIInput } from '@/types'

export const metadata: Metadata = {
  title: '計算結果',
}

type Props = {
  searchParams: Promise<{
    price?: string
    time?: string
    wage?: string
  }>
}

const toNumber = (value?: string, fallback = 0): number => {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

const resultMessage = {
    color: 'text-green-700',
    bg: 'bg-green-50',
    message: 'ライフスタイルや使用頻度も踏まえてご判断ください。',
}

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams

  const input: ROIInput = {
    price: toNumber(params.price),
    timeSavedPerDay: toNumber(params.time),
    hourlyWage: toNumber(params.wage, 1500),
  }

  const result = calcROI(input)

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Time ROI Hub</p>
          <h1 className="text-2xl font-bold text-gray-900">計算結果</h1>
        </div>

        <div
          className={`flex flex-col items-center gap-4 rounded-2xl p-6 ${resultMessage.bg}`}
        >
          <p className="text-sm font-medium text-gray-600">回収期間</p>
          <p className={`text-5xl font-bold ${resultMessage.color}`}>
            {formatMonths(result.paybackMonths)}
          </p>
          <p className="text-sm text-gray-600">実質のコスト削減額（1年）</p>
          <p className={`text-2xl font-bold ${resultMessage.color}`}>
            {formatYen(result.annualBenefit)}
          </p>

          <p className="text-xs text-gray-500 text-center">{resultMessage.message}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">計算の内訳</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">購入価格</span>
              <span className="font-medium text-gray-900">{formatYen(input.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">1日あたりの便益（時給換算）</span>
              <span className="font-medium text-gray-900">
                {formatYen(result.dailyBenefit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">月あたりの便益</span>
              <span className="font-medium text-gray-900">
                {formatYen(result.monthlyBenefit)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <span className="text-gray-500">回収期間</span>
              <span className="font-semibold text-gray-900">
                {formatMonths(result.paybackMonths)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/calculate"
            className="w-full py-4 bg-green-800 text-white text-center text-sm font-semibold rounded-xl hover:bg-green-900 transition-colors"
          >
            別の条件で計算する
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
