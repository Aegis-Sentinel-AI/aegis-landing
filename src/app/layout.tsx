import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'AegisSentinel — AI-Driven Cybersecurity Protocol',
  description: 'Next-generation cybersecurity combining AI threat detection, Zero-Knowledge proofs, and L2 blockchain verification. GDPR & MiCA compliant.',
  keywords: ['cybersecurity', 'AI', 'blockchain', 'zero-knowledge proofs', 'GDPR', 'MiCA', 'enterprise security'],
  authors: [{ name: 'AegisSentinel' }],
  openGraph: {
    title: 'AegisSentinel — AI-Driven Cybersecurity Protocol',
    description: 'Next-generation cybersecurity combining AI threat detection, Zero-Knowledge proofs, and L2 blockchain verification.',
    url: 'https://aegissentinel.no',
    siteName: 'AegisSentinel',
    images: [
      {
        url: 'https://aegissentinel.no/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AegisSentinel — AI-Driven Cybersecurity Protocol',
    description: 'Next-generation cybersecurity combining AI threat detection, Zero-Knowledge proofs, and L2 blockchain verification.',
    site: '@AegisSentinel',
    images: ['https://aegissentinel.no/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-white antialiased relative">
        {children}
      </body>
    </html>
  )
}
