import type { Metadata, Viewport } from 'next'
import '@/styles/global.css'
import QueryProvider from '@/providers/QueryProvider'

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
      <QueryProvider>
        <body className="APP-CONTAINER bg-bg-light">
          <nav className="NAV" />
          {children}
          <footer className="FOOTER" />
        </body>
      </QueryProvider>
    </html>
  )
}
