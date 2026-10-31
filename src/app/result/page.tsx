import Link from 'next/link'
import type { Metadata } from 'next'
import { calcROI } from '@/lib/roi'
import { formatYen, formatMonths } from '@/lib/format'
import { SITE_URL } from '@/lib/site'
import type { ROIInput } from '@/types'

type Props = {
  searchParams: Promise<{
    price?: string
    time?: string
    wage?: string
    category?: string
    name?: string
  }>
}

const toNumber = (value?: string, fallback = 0): number => {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

const buildQuery = (params: Awaited<Props['searchParams']>): string => {
  const query = new URLSearchParams()
  if (params.price) query.set('price', params.price)
  if (params.time) query.set('time', params.time)
  if (params.wage) query.set('wage', params.wage)
  if (params.category) query.set('category', params.category)
  if (params.name) query.set('name', params.name)
  return query.toString()
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const queryString = buildQuery(params)
  const ogImageUrl = `${SITE_URL}/result/opengraph-image${
    queryString ? `?${queryString}` : ''
  }`

  return {
    title: '計算結果',
    robots: { index: false, follow: true },
    openGraph: {
      images: [ogImageUrl],
    },
  }
}

const resultMessage = {
    color: 'text-green-700',
    bg: 'bg-green-50',
    message: 'ライフスタイルや使用頻度も踏まえてご判断ください。',
}

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams
  const isSubscription = params.category === 'subscription'

  const input: ROIInput = {
    price: toNumber(params.price),
    timeSavedPerDay: toNumber(params.time),
    hourlyWage: toNumber(params.wage, 1500),
  }

  const result = calcROI(input)
  const priceLabel = isSubscription ? '年間費用' : '購入価格'
  const itemName = params.name?.trim() || (isSubscription ? 'サブスク' : '家電')

  const shareUrl = `${SITE_URL}/result?${buildQuery(params)}`

  const recovers = Number.isFinite(result.paybackMonths)

  const shareText = `${itemName}（${priceLabel}${formatYen(
    input.price,
  )}）を時給${formatYen(input.hourlyWage)}換算で計算したら、回収まで${formatMonths(
    result.paybackMonths,
  )}${
    recovers ? `、その後は「${formatYen(result.monthlyBenefit)}/月」分の時間の価値が浮く計算` : ''
  }でした。`

  const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent('元取り計算')}`

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">元取り計算</p>
          <h1 className="text-2xl font-bold text-gray-900">計算結果</h1>
        </div>

        <div
          className={`flex flex-col items-center gap-4 rounded-2xl p-6 ${resultMessage.bg}`}
        >
          <p className="text-sm font-medium text-gray-600">元が取れるまで</p>
          <p className={`text-5xl font-bold ${resultMessage.color}`}>
            {formatMonths(result.paybackMonths)}
          </p>
          {recovers && (
            <>
              <p className="text-sm text-gray-600">その後は</p>
              <p className={`text-2xl font-bold ${resultMessage.color}`}>
                「{formatYen(result.monthlyBenefit)}/月」
              </p>
              <p className="-mt-2 text-sm text-gray-700">分の時間の価値が浮きました</p>
              <p className="text-xs text-gray-500">浮いた時間 × あなたの時給 で計算しています</p>
            </>
          )}

          <p className="text-xs text-gray-500 text-center">{resultMessage.message}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">計算の内訳</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{priceLabel}</span>
              <span className="font-medium text-gray-900">{formatYen(input.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">1日あたりの浮いた時間の価値（時給換算）</span>
              <span className="font-medium text-gray-900">
                {formatYen(result.dailyBenefit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">月あたりの浮いた時間の価値（1日 × 30日）</span>
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
          <a
            href={tweetIntentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-black text-white text-center text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Xでシェアする
          </a>
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
