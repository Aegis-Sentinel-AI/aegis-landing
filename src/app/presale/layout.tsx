import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Presale — $AEGIS Token | AegisSentinel',
  description: 'Get up to 60% discount on $AEGIS tokens during the presale. AI-powered cybersecurity token — Early Bird LIVE on Arbitrum. Limited allocation, first-come first-served.',
  openGraph: {
    title: 'Presale — $AEGIS Token | AegisSentinel',
    description: 'Get up to 60% discount on $AEGIS tokens. AI-powered cybersecurity — Early Bird LIVE on Arbitrum.',
    url: 'https://aegissentinel.online/presale',
    images: [
      {
        url: 'https://aegissentinel.online/OG-Image.png',
        width: 1200,
        height: 630,
        alt: 'AegisSentinel Presale — $AEGIS Token',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Presale — $AEGIS Token | AegisSentinel',
    description: 'Get up to 60% discount on $AEGIS tokens. AI-powered cybersecurity — Early Bird LIVE on Arbitrum.',
    images: ['https://aegissentinel.online/OG-Image.png'],
  },
}

export default function PresaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
