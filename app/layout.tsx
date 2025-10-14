import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { CustomCursor } from '@/app/components/CustomCursor'
import { AppProviders } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'QuoteFast - AI-Powered Quote Generation & Business Management',
    template: '%s | QuoteFast',
  },
  description: 'Automatiseer je offertes met AI. Beheer klanten, facturatie en workflows op één plek. Start vandaag je gratis trial en transformeer je business.',
  keywords: [
    'AI offertes',
    'automatische facturatie',
    'klantbeheer',
    'business management',
    'SaaS',
    'startup tools',
    'offerte software'
  ],
  authors: [{ name: 'QuoteFast Team', url: 'https://quotefast.com' }],
  creator: 'QuoteFast',
  publisher: 'QuoteFast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quotefast.com'),
  alternates: {
    canonical: '/',
    languages: {
      'nl-NL': '/nl',
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName: 'QuoteFast',
    description: 'Automatiseer je offertes met AI en beheeer je business efficiënter. Start vandaag je gratis trial!',
    title: 'QuoteFast - AI Offerte Software & Business Management',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'QuoteFast AI Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuoteFast - AI-Powered Quote Generation',
    description: 'Transformeer je offerteproces met AI. Sneller, slimmer, professioneler.',
    images: ['/twitter-image.jpg'],
    creator: '@QuoteFastApp',
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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#000000',
  applicationName: 'QuoteFast',
  referrer: 'origin-when-cross-origin',
  other: {
    'application-name': 'QuoteFast',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'QuoteFast',
    'google': 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <CustomCursor />
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
