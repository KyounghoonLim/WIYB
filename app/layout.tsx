import Footer from '@/src/components/footer/Footer'
import Nav from '@/src/components/nav/Nav'
import { THEME } from '@/src/constants/theme.constant'
import type { Metadata, Viewport } from 'next'
import 's/styles/global.css'
import ThemeProvider from '../src/providers/ThemeProvider'
import RequestTimeProvider from '@/src/providers/RequestKeyProvider'
import SearchPortal from '@/src/components/search/SearchPortal'
import OverlayPortal from '@/src/components/overlay/OverlayPortal'
import SWRProvider from '@/src/providers/SWRProvider'
import BottomSheetPortal from '@/src/components/bottomSheet/BottomSheetPortal'
import UserProvider from '@/src/providers/UserProvider'
import BottomSheetProvider from '@/src/providers/BottomSheetProvider'
import SearchProvider from '@/src/providers/SearchProvider'

export const metadata: Metadata = {
  title: 'WIYB',
  description: "What's In Your Golf Bag?",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: THEME.DEFAULT,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <RequestTimeProvider>
        <ThemeProvider>
          <SWRProvider>
            <UserProvider>
              <SearchProvider>
                <BottomSheetProvider>
                  <body className="CONTAINER bg-@-bg-light">
                    <Nav />
                    {children}
                    <SearchPortal />
                    <BottomSheetPortal />
                    <OverlayPortal />
                    <Footer />
                  </body>
                </BottomSheetProvider>
              </SearchProvider>
            </UserProvider>
          </SWRProvider>
        </ThemeProvider>
      </RequestTimeProvider>
    </html>
  )
}
