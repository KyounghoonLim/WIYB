import { createContext } from 'react'
import { LocaleType } from '../@types/locale.types'

export const localeContext = createContext<{ locale: LocaleType }>({ locale: null })

export default function LocaleProvider({ children, locale }) {
  return <localeContext.Provider value={{ locale }}>{children}</localeContext.Provider>
}
