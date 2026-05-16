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

const verdictConfig = {
  buy: {
    label: '買い！',
    emoji: '😊',
    color: 'text-green-700',
    bg: 'bg-green-50',
    message: 'あなたの時間価値に基づくと、十分に元が取れる投資です。',
  },
  good: {
    label: 'アリ',
    emoji: '🙂',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    message: '悪くない投資です。用途に合えば購入を検討しましょう。',
  },
  maybe: {
    label: '微妙',
    emoji: '😐',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    message: '回収まで時間がかかります。本当に必要か考えましょう。',
  },
  pass: {
    label: 'やめとけ',
    emoji: '😞',
    color: 'text-red-700',
    bg: 'bg-red-50',
    message: '時間価値的にはコスパが悪い投資です。',
  },
}

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams

  const input: ROIInput = {
    price: toNumber(params.price),
    timeSavedPerDay: toNumber(params.time),
    hourlyWage: toNumber(params.wage, 1500),
  }

  const result = calcROI(input)
  const config = verdictConfig[result.verdict]

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">計算結果</h1>
        </div>

        <div
          className={`flex flex-col items-center gap-4 rounded-2xl p-6 ${config.bg}`}
        >
          <p className="text-sm font-medium text-gray-600">回収期間</p>
          <p className={`text-5xl font-bold ${config.color}`}>
            {formatMonths(result.paybackMonths)}
          </p>
          <p className="text-sm text-gray-600">実質のコスト削減額（1年）</p>
          <p className={`text-2xl font-bold ${config.color}`}>
            {formatYen(result.annualBenefit)}
          </p>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white`}
          >
            <span>{config.emoji}</span>
            <span className={`text-sm font-semibold ${config.color}`}>
              判定：{config.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 text-center">{config.message}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">計算の内訳</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">購入価格</span>
              <span className="font-medium">{formatYen(input.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">1日あたりの便益（時給換算）</span>
              <span className="font-medium">
                {formatYen(result.dailyBenefit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">月あたりの便益</span>
              <span className="font-medium">
                {formatYen(result.monthlyBenefit)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <span className="text-gray-500">回収期間</span>
              <span className="font-semibold">
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
        </div>
      </div>
    </main>
  )
}
