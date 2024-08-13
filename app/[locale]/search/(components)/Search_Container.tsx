'use client'

import SearchProvider from '@/src/providers/SearchProvider'
import Search_Items from './Search_Items'

export default function Search_Container({ search }: { search?: string }) {
  return (
    <SearchProvider>
      <Search_Items search={search} />
    </SearchProvider>
  )
}
