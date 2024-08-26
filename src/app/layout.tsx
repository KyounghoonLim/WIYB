import type { Metadata, Viewport } from 'next'
import '@/styles/global.css'
import QueryProvider from '@/providers/QueryProvider'
import SearchOptionProvider from 'providers/SearchOptionProvider'
import SearchProvider from 'providers/SearchProvider'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import ModalProvider from 'providers/ModalProvider'
import Nav from 'components/nav/Nav'

export const metadata: Metadata = {
  title: 'WIYB',
  description: "What's In Your Golf Bag?",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Suspense>
        <QueryProvider>
          <SearchOptionProvider>
            <SearchProvider>
              <ModalProvider>
                <body className="APP-CONTAINER bg-bg-light">
                  <Nav />
                  {children}
                  <footer className="FOOTER" />
                  <div id="modal" />
                  <div id="overlay" />
                </body>
              </ModalProvider>
            </SearchProvider>
          </SearchOptionProvider>
        </QueryProvider>
      </Suspense>
    </html>
  )
}
