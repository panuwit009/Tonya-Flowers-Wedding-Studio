import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Tonya Flowers Wedding Studio | Wedding Organizer in Lop Buri, Thailand',
  description:
    'Tonya Flowers Wedding Studio - Professional wedding organizer and floral design in Lop Buri, Thailand. We create beautiful, memorable weddings with elegant flower arrangements and full event planning services.',
  keywords: [
    // --- REPLACE THESE WITH YOUR OWN SEO KEYWORDS ---
    'wedding organizer Lop Buri',
    'wedding planner Thailand',
    'wedding flowers Lop Buri',
    'Tonya Flowers Wedding Studio',
    'floral design wedding',
    'wedding decoration Thailand',
    'จัดงานแต่งงาน ลพบุรี',
    'จัดดอกไม้งานแต่ง',
    'wedding organizer Thailand',
    // --- END SEO KEYWORDS ---
  ],
  openGraph: {
    title: 'Tonya Flowers Wedding Studio | Wedding Organizer in Lop Buri',
    description:
      'Professional wedding organizer and floral design in Lop Buri, Thailand. Creating beautiful, memorable weddings.',
    url: 'https://tonyaflowers.com',
    siteName: 'Tonya Flowers Wedding Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logo.jpg',
        width: 960,
        height: 960,
        alt: 'Tonya Flowers Wedding Studio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tonya Flowers Wedding Studio',
    description:
      'Professional wedding organizer and floral design in Lop Buri, Thailand.',
    images: ['/images/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#2D4A3E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
