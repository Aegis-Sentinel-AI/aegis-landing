import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tokenomics — $SENTINEL Token',
  description: 'Explore the $SENTINEL token economics: allocation, vesting schedules, staking rewards, burn mechanics, and governance. Total supply 1B tokens with deflationary design.',
  openGraph: {
    title: 'Tokenomics — $SENTINEL Token | AegisSentinel',
    description: 'Explore the $SENTINEL token economics: allocation, vesting, staking, and governance.',
    url: 'https://aegissentinel.online/tokenomics',
  },
  twitter: {
    title: 'Tokenomics — $SENTINEL Token | AegisSentinel',
    description: 'Explore the $SENTINEL token economics: allocation, vesting, staking, and governance.',
  },
  alternates: {
    canonical: 'https://aegissentinel.online/tokenomics',
  },
}

export default function TokenomicsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
