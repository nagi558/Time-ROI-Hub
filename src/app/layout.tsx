import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Time ROI Hub｜買い物を時間投資で判断する',
    template: '%s｜Time ROI Hub',
  },
  description:
    '家電・サブスクが「時間的に得か」を3項目入力ですぐわかる。投資回収期間をあなたの時給で自動計算します。',
  openGraph: {
    images: ['/time-roi-hub-ogp.png'],
  },
  verification: {
    google: 'ISBK00_99d_uzoBExzV4XpDXkEUMgvCvAgaikqoggjw',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  )
}

