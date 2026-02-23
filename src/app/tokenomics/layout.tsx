import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tokenomics — $AEGIS Token',
  description: 'Explore the $AEGIS token economics: allocation, vesting schedules, staking rewards, burn mechanics, and governance. Total supply 1B tokens with deflationary design.',
  openGraph: {
    title: 'Tokenomics — $AEGIS Token | AegisSentinel',
    description: 'Explore the $AEGIS token economics: allocation, vesting, staking, and governance.',
    url: 'https://aegissentinel.online/tokenomics',
  },
  twitter: {
    title: 'Tokenomics — $AEGIS Token | AegisSentinel',
    description: 'Explore the $AEGIS token economics: allocation, vesting, staking, and governance.',
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
