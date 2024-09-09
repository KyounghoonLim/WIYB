import '@/styles/global.css'
import type { Metadata, Viewport } from 'next'
import QueryProvider from '@/providers/QueryProvider'
import { Suspense } from 'react'
import ModalProvider from 'providers/ModalProvider'
import Nav from 'components/nav/Nav'
import LocaleProvider from 'providers/LocaleProvider'
import UserProvider from 'providers/UserProvider'
import ResourceProvider from 'providers/resource/resourceProvider'

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
    <html lang="ko">
      <Suspense>
        <LocaleProvider>
          <QueryProvider>
            <ResourceProvider>
              <UserProvider>
                <ModalProvider>
                  <body className="APP-CONTAINER bg-bg-light">
                    <Nav />
                    {children}
                    <footer className="FOOTER" />
                    <div id="modal" />
                    <div id="overlay" />
                  </body>
                </ModalProvider>
              </UserProvider>
            </ResourceProvider>
          </QueryProvider>
        </LocaleProvider>
      </Suspense>
    </html>
  )
}
