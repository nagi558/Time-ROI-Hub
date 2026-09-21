import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '元取り計算のプライバシーポリシー。個人情報の取り扱い、広告配信について説明します。',
}

export default function PrivacyPage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">元取り計算</p>
          <h1 className="text-2xl font-bold text-gray-900">プライバシーポリシー</h1>
        </div>

        <div className="flex flex-col gap-5 text-sm text-gray-700 leading-relaxed">
          <p>
            元取り計算(以下「本サイト」)は、個人が運営するWebサービスです。
            本ページでは、本サイトにおける個人情報・アクセス情報の取り扱いについて説明します。
          </p>

          <section className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-900">1. 取得する情報</h2>
            <p>
              本サイトの計算機能(価格・時短時間・時給の入力によるROI計算)は、入力内容を
              サーバーに送信・保存せず、お使いの端末上でのみ処理します。本サイトが独自に
              氏名・メールアドレス等の個人情報を取得することはありません。
            </p>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-900">2. 広告について(Cookie等)</h2>
            <p>
              本サイトは、第三者配信の広告サービス(Googleアドセンス等)を利用する場合があります。
              このような広告配信事業者は、ユーザーの興味に応じた広告を表示するために、
              Cookie(クッキー)を使用することがあります。
            </p>
            <p>
              Cookieを利用することで、当サイトはユーザーのブラウザを識別できるようになりますが、
              個人を特定できる情報は含まれません。Cookieを無効にする方法や、Googleアドセンスに
              関する詳細は
              <a
                href="https://policies.google.com/technologies/ads?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google広告ポリシーと規約
              </a>
              をご確認ください。
            </p>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-900">3. アフィリエイトプログラムについて</h2>
            <p>
              本サイトは、Amazonアソシエイト・プログラムなど、各種アフィリエイトプログラムに
              参加する場合があります。本サイト経由の商品購入によって、本サイトは紹介料を
              受け取ることがあります。
            </p>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-900">4. アクセス解析ツールについて</h2>
            <p>
              本サイトは、サービス改善のためにアクセス解析ツール(Google Analytics、
              Google Search Console等)を
              利用することがあります。これらのツールはCookie等を使用してトラフィックデータを
              収集しますが、個人を特定する情報は含まれません。
            </p>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-900">5. 免責事項</h2>
            <p>
              本サイトが提供する計算結果は、入力された仮定値に基づく目安であり、
              実際の効果・費用対効果を保証するものではありません。購入の最終判断は
              ご自身の責任で行ってください。
            </p>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="font-semibold text-gray-900">6. プライバシーポリシーの変更</h2>
            <p>
              本サイトは、必要に応じて本ポリシーの内容を変更することがあります。変更後の
              プライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <p className="text-xs text-gray-400">制定日: 2026年9月18日</p>
        </div>

        <Link
          href="/"
          className="w-full py-4 text-center text-sm text-gray-500 font-medium"
        >
          トップに戻る
        </Link>
      </div>
    </main>
  )
}
