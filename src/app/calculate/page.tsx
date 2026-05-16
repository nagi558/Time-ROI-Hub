'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getHourlyWage, setHourlyWage } from '@/lib/storage'

export default function CalculatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [price, setPrice] = useState(searchParams.get('price') ?? '')
  const [timeSaved, setTimeSaved] = useState(searchParams.get('time') ?? '')
  const [wage, setWage] = useState(() => String(getHourlyWage()))

  const handleSubmit = () => {
    const p = Number(price)
    const t = Number(timeSaved)
    const w = Number(wage)

    if (!p || !t || !w) return

    setHourlyWage(w)
    router.push(`/result?price=${p}&time=${t}&wage=${w}`)
  }

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Time ROI Hub</p>
          <h1 className="text-2xl font-bold text-gray-900">
            投資回収シミュレーション
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              投資の種類
            </label>
            <p className="text-sm text-gray-900 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50">
              家電
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              商品・サービス名（任意）
            </label>
            <input
              type="text"
              placeholder="例）食洗機"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              購入価格（円）
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-2">
              <span className="text-sm text-gray-500">¥</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="59800"
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

          <div className="flex flex-col gap-3">
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
          </div>
        </div>
      </div>
    </main>
  )
}
