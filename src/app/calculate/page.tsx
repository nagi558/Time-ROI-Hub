'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getHourlyWage, setHourlyWage } from '@/lib/storage'
import type { Category } from '@/types'

type BillingCycle = 'monthly' | 'yearly'

function CalculateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState<Category>(
    (searchParams.get('category') as Category) === 'subscription'
      ? 'subscription'
      : 'appliance',
  )
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [price, setPrice] = useState(searchParams.get('price') ?? '')
  const [timeSaved, setTimeSaved] = useState(searchParams.get('time') ?? '')
  const [wage, setWage] = useState(() => String(getHourlyWage()))

  const handleSubmit = () => {
    const p = Number(price)
    const t = Number(timeSaved)
    const w = Number(wage)

    if (!p || !t || !w) return

    const annualPrice =
      category === 'subscription' && billingCycle === 'monthly' ? p * 12 : p

    setHourlyWage(w)
    router.push(
      `/result?price=${annualPrice}&time=${t}&wage=${w}&category=${category}`,
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">投資の種類</label>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setCategory('appliance')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              category === 'appliance'
                ? 'bg-green-800 text-white font-semibold'
                : 'bg-white text-gray-600'
            }`}
          >
            家電
          </button>
          <button
            type="button"
            onClick={() => setCategory('subscription')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              category === 'subscription'
                ? 'bg-green-800 text-white font-semibold'
                : 'bg-white text-gray-600'
            }`}
          >
            サブスク
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          商品・サービス名（任意）
        </label>
        <input
          type="text"
          placeholder={
            category === 'subscription' ? '例）ChatGPT Plus' : '例）食洗機'
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
        />
      </div>

      {category === 'subscription' && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">支払い周期</label>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-green-800 text-white font-semibold'
                  : 'bg-white text-gray-600'
              }`}
            >
              月額
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-green-800 text-white font-semibold'
                  : 'bg-white text-gray-600'
              }`}
            >
              年額
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {category === 'subscription'
            ? billingCycle === 'monthly'
              ? '月額料金（円）'
              : '年額料金（円）'
            : '購入価格（円）'}
        </label>
        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-2">
          <span className="text-sm text-gray-500">¥</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={
              category === 'subscription'
                ? billingCycle === 'monthly'
                  ? '980'
                  : '9800'
                : '59800'
            }
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          1日あたりの時短時間
        </label>
        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-2">
          <input
            type="number"
            value={timeSaved}
            onChange={(e) => setTimeSaved(e.target.value)}
            placeholder="40"
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
          <span className="text-sm text-gray-500">分/日</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          あなたの時給（円）
        </label>
        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-2">
          <input
            type="number"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            placeholder="1500"
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
          <span className="text-sm text-gray-500">円/時</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-green-800 text-white text-sm font-semibold rounded-xl hover:bg-green-900 transition-colors"
        >
          計算する
        </button>
        <Link
          href="/presets"
          className="w-full py-4 text-center text-sm text-green-800 font-medium"
        >
          プリセットから選ぶ ›
        </Link>
        <Link
          href="/"
          className="w-full text-center text-sm text-gray-500 font-medium"
        >
          ← ホームへ戻る
        </Link>
      </div>
    </div>
  )
}

export default function CalculatePage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Time ROI Hub</p>
          <h1 className="text-2xl font-bold text-gray-900">
            投資回収シミュレーション
          </h1>
        </div>

        <Suspense
          fallback={<p className="text-sm text-gray-400">読み込み中...</p>}
        >
          <CalculateForm />
        </Suspense>
      </div>
    </main>
  )
}
