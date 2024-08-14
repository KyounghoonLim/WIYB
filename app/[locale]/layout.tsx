'use client'

import { LocaleType } from '@/src/@types/locale.types'
import LocaleProvider from '@/src/providers/LocaleProvider'

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: LocaleType }
  children: React.ReactNode
}) {
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>
}
