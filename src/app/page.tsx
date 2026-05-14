import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time ROI Hub｜買い物を時間投資で判断する',
  description:
    '家電・サブスクが「時間的に得か」を3項目入力で即判定。投資回収期間をあなたの時給で自動計算。',
}

export default function Homepage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 tracking-widest">
            Time ROI Hub
          </p>
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-900">
            その買い物、
            <br />
            時間の投資として
            <br />
            得ですか？
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            あなたの時間をお金に換算して、
            <br />
            投資が何ヶ月で元が取れるかを
            <br />
            シミュレーションします。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/calculate"
            className="w-full py-4 bg-green-800 text-white text-center text-sm font-semibold rounded-xl hover:bg-green-900 transition-colors"
          >
            今すぐ計算する
          </Link>
          <Link
            href="/presets"
            className="w-full py-4 border border-gray-200 text-gray-700 text-center text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            人気の計算例を見る
          </Link>
        </div>

        <div className="flex justify-around pt-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xl">✏️</span>
            <span className="text-xs text-gray-500">シンプル入力</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xl">⏱️</span>
            <span className="text-xs text-gray-500">
              即時に回収期間
              <br />
              を表示
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xl">✅</span>
            <span className="text-xs text-gray-500">
              買い意思決定
              <br />
              をサポート
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
