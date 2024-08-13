'use client'

/// hooks ///
import { useLayoutEffect } from 'react'
import useTheme from '@/src/hooks/theme/useTheme'
/// components ///
import Portal from '../portal/Portal'
/// const ///
import { THEME } from '@/src/constants/theme.constant'
import SearchPopularKeywords from './SearchPopularKeywords'
import SearchHistoryList from './SearchHistoryList'
import SearchHeader from './SearchHeader'

export default function SearchContainer() {
  const { changeTheme } = useTheme()

  useLayoutEffect(() => {
    document.body.classList.add('overflow-hidden')
    changeTheme(THEME.WHITE)

    return () => {
      document.body.classList.remove('overflow-hidden')
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
