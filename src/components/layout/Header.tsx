import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full px-6 py-4">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
        Time ROI Hub
      </Link>
    </header>
  )
}
