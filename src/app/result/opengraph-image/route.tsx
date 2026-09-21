import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { calcROI } from '@/lib/roi'
import { formatMonths } from '@/lib/format'
import type { ROIInput } from '@/types'

export const runtime = 'edge'

const toNumber = (value: string | null, fallback = 0): number => {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

// OGP画像用: Satoriのデフォルトフォントで「¥」記号が表示崩れ(豆腐化)するため、
// 通貨記号を使わず「◯◯円」表記にする(formatYenは通常画面表示用のまま維持)。
const formatYenForImage = (value: number): string =>
  `${Math.round(value).toLocaleString('ja-JP')}円`

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const input: ROIInput = {
    price: toNumber(searchParams.get('price')),
    timeSavedPerDay: toNumber(searchParams.get('time')),
    hourlyWage: toNumber(searchParams.get('wage'), 1500),
  }
  const result = calcROI(input)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#065f46',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: 32,
              color: '#d1fae5',
              margin: 0,
            }}
          >
            回収期間
          </p>
          <p
            style={{
              fontSize: 128,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1,
            }}
          >
            {formatMonths(result.paybackMonths)}
          </p>
          <p
            style={{
              fontSize: 36,
              color: '#d1fae5',
              margin: 0,
              marginTop: 24,
            }}
          >
            実質のコスト削減額（1年）　{formatYenForImage(result.annualBenefit)}
          </p>
        </div>
        <p
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 32,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
          }}
        >
          元取り計算
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
