import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Reejh Mann Di - Premium Fashion Collection',
  description: 'Discover the finest collection of traditional and modern clothing at Reejh Mann Di. Shop premium kurtas, sarees, accessories and more.',
  keywords: 'fashion, clothing, traditional wear, modern fashion, kurtas, sarees, accessories',
  authors: [{ name: 'Reejh Mann Di' }],
  creator: 'Reejh Mann Di',
  publisher: 'Reejh Mann Di',
  openGraph: {
    title: 'Reejh Mann Di - Premium Fashion Collection',
    description: 'Discover the finest collection of traditional and modern clothing',
    url: 'https://reejhmanndi.com',
    siteName: 'Reejh Mann Di',
    images: [
      {
        url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9083406c-bbb4-434e-8c5a-9ce3700244bf.png',
        width: 1200,
        height: 630,
        alt: 'Reejh Mann Di Fashion Collection'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reejh Mann Di - Premium Fashion Collection',
    description: 'Discover the finest collection of traditional and modern clothing',
    creator: '@reejhmanndi',
    images: ['https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/27952b4b-7b1c-41e8-89e0-9351af2c7671.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)}>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        'flex flex-col'
      )}>
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-center"
          expand={true}
          richColors
          closeButton
        />
      </body>
    </html>
  )
}