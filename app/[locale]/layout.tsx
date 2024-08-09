'use client'

import { createContext } from 'react'
import { LocaleType } from '@/src/@types/locale.types'
import { createDummies } from '@/src/services/testApi'

export const localeContext = createContext<{ locale: LocaleType }>({ locale: null })

export default function LocaleProvider({
  params: { locale },
  children,
}: {
  params: { locale: LocaleType }
  children: React.ReactNode
}) {
  return (
    <localeContext.Provider value={{ locale }}>
      {/* {_ && (
        <button
          className="absolute top-0 right-0 z-overlay"
          onClick={() => {
            f();
            try {
              createDummies();
            } catch {
              /// pass
            }
          }}
        >
          create dummy
        </button>
      )} */}
      {children}
    </localeContext.Provider>
  )
}
