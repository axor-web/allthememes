import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { StoreProvider } from '@/redux/StoreProvider'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'All The Memes',
  description: 'Find Your Meme!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Header></Header>
        <main>
          <StoreProvider>
            { children }
          </StoreProvider>
        </main>
        <Footer></Footer>
      </body>
    </html>
  )
}
