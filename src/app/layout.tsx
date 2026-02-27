import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

const SITE_URL = 'https://aegissentinel.online'

export const viewport: Viewport = {
  themeColor: '#0a0f1c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AegisSentinel — AI-Driven Cybersecurity Protocol',
    template: '%s | AegisSentinel',
  },
  description: 'Next-generation cybersecurity combining AI threat detection, Zero-Knowledge proofs, and L2 blockchain verification. Real-time protection for DeFi protocols, bridges, and wallets. GDPR & MiCA compliant.',
  keywords: ['cybersecurity', 'AI', 'blockchain', 'zero-knowledge proofs', 'GDPR', 'MiCA', 'enterprise security', 'DeFi security', 'Web3 security', 'smart contract audit', 'threat detection', 'AEGIS token'],
  authors: [{ name: 'AegisSentinel', url: SITE_URL }],
  creator: 'AegisSentinel',
  publisher: 'AegisSentinel',
  icons: {
    icon: [
      { url: '/Favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'AegisSentinel — AI-Driven Cybersecurity Protocol',
    description: 'Next-generation cybersecurity combining AI threat detection, Zero-Knowledge proofs, and L2 blockchain verification.',
    url: SITE_URL,
    siteName: 'AegisSentinel',
    images: [
      {
        url: '/OG-Image.png',
        width: 1200,
        height: 630,
        alt: 'AegisSentinel - Automated AI Defense for the Decentralized Era',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AegisSentinel — AI-Driven Cybersecurity Protocol',
    description: 'Next-generation cybersecurity combining AI threat detection, Zero-Knowledge proofs, and L2 blockchain verification.',
    site: '@AegisSentinelAi',
    creator: '@Srodland',
    images: ['/OG-Image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AegisSentinel',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo-full.jpg`,
        },
        sameAs: [
          'https://x.com/AegisSentinelAi',
          'https://github.com/AegisSentinel',
          'https://discord.gg/Z5NcWtqB',
        ],
        description: 'AI-driven cybersecurity protocol for Web3. Real-time threat detection, zero-knowledge proofs, and L2 blockchain verification.',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'AegisSentinel',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'AegisSentinel',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'AI-powered cybersecurity platform for DeFi and Web3',
        },
        description: 'Enterprise-grade AI threat detection with 35+ threat types, MITRE ATT&CK mapping, and cross-chain monitoring.',
      },
    ],
  }

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-white antialiased relative overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
