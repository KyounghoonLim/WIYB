'use client'

/// hooks ///
import { useContext, useLayoutEffect } from 'react'
import useTheme from '@/src/hooks/theme/useTheme'
/// components ///
import Portal from '../portal/Portal'
/// const ///
import { THEME } from '@/src/constants/theme.constant'
import SearchPopularKeywords from './SearchPopularKeywords'
import SearchHistoryList from './SearchHistoryList'
import SearchHeader from './SearchHeader'
import { searchContext } from '@/src/providers/SearchProvider'

export default function SearchContainer() {
  const { changeTheme } = useTheme()
  const { resetSearchOptions } = useContext(searchContext)

  useLayoutEffect(() => {
    document.body.classList.add('overflow-hidden')
    changeTheme(THEME.WHITE)

    return () => {
      document.body.classList.remove('overflow-hidden')
      resetSearchOptions()
      changeTheme(THEME.DEFAULT)
    }
  }, [changeTheme])

  return (
    <Portal target="search-portal">
      <div className="SEARCH-CONTAINER">
        {/* header section */}
        <SearchHeader />
        {/* recommand, history section */}
        <section className="h-full flex-col-start items-stretch px-4 pb-4">
          <SearchPopularKeywords />
          <SearchHistoryList />
        </section>
      </div>
    </Portal>
  )
}
