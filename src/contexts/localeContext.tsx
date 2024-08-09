import { createContext } from 'react'
import { LocaleType } from '../@types/locale.types'

export const localeContext = createContext<{ locale: LocaleType }>({ locale: null })
