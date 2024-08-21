import type { Metadata, Viewport } from 'next'
import '@/styles/global.css'
import QueryProvider from '@/providers/QueryProvider'
import SearchOptionProvider from 'providers/SearchOptionProvider'
import SearchProvider from 'providers/SearchProvider'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'WIYB',
  description: "What's In Your Golf Bag?",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

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
              <body className="APP-CONTAINER bg-bg-light">
                <nav className="NAV" />
                {children}
                <div id="float" />
                <footer className="FOOTER" />
                <div id="overlay" />
              </body>
            </SearchProvider>
          </SearchOptionProvider>
        </QueryProvider>
      </Suspense>
    </html>
  )
}
