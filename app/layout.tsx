import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Cosmic Recipe Hub - Discover Amazing Recipes',
  description: 'Explore delicious recipes from talented chefs around the world. Find your next favorite dish with detailed instructions and chef insights.',
  keywords: ['recipes', 'cooking', 'food', 'chefs', 'kitchen', 'ingredients'],
  openGraph: {
    title: 'Cosmic Recipe Hub',
    description: 'Discover amazing recipes from talented chefs',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}