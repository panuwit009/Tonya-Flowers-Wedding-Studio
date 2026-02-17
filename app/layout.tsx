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
  title: 'Tonya Flowers Wedding Studio | รับจัดงานแต่งงาน ลพบุรี',
  description:
    'Tonya Flowers Wedding Studio - รับจัดงานแต่งงานครบวงจร จัดดอกไม้ ตกแต่งสถานที่ ออกแบบธีมงานแต่ง ลพบุรี ประเทศไทย สร้างงานแต่งในฝันให้เป็นจริง',
  keywords: [
    // --- แก้ไข SEO KEYWORDS ของคุณที่นี่ ---
    'รับจัดงานแต่งงาน ลพบุรี',
    'wedding planner ลพบุรี',
    'จัดดอกไม้งานแต่ง',
    'Tonya Flowers Wedding Studio',
    'ตกแต่งงานแต่งงาน',
    'wedding organizer Thailand',
    'จัดงานแต่งงาน ราคา',
    'รับจัดดอกไม้สด งานแต่ง',
    'wedding planner Thailand',
    'จัดงานแต่งงานครบวงจร',
    'ร้านดอกไม้ ลพบุรี',
    'wedding decoration Thailand',
    // --- จบ SEO KEYWORDS ---
  ],
  openGraph: {
    title: 'Tonya Flowers Wedding Studio | รับจัดงานแต่งงาน ลพบุรี',
    description:
      'รับจัดงานแต่งงานครบวงจร จัดดอกไม้ ตกแต่งสถานที่ ออกแบบธีมงานแต่ง ลพบุรี ประเทศไทย',
    url: 'https://tonyaflowers.com',
    siteName: 'Tonya Flowers Wedding Studio',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/images/logo.jpg',
        width: 960,
        height: 960,
        alt: 'โลโก้ Tonya Flowers Wedding Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tonya Flowers Wedding Studio',
    description:
      'รับจัดงานแต่งงานครบวงจร จัดดอกไม้ ตกแต่งสถานที่ ลพบุรี ประเทศไทย',
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
    <html lang="th">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
