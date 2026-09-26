import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'time-roi-hub.vercel.app',
          },
        ],
        destination: 'https://www.mototorikeisan.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig