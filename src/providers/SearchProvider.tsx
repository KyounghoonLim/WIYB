'use client'

import { createContext, useCallback, useContext } from 'react'
import { searchOptionContext } from './SearchOptionProvider'
import useThrottle from 'hooks/useThrottle'
import { PATH } from 'constants/path.constant'
import { useRouter } from 'next/navigation'

export const searchContext = createContext<{ searching: (keyword?: string) => void }>(null)

export default function SearchProvider({ children }) {
  const { searchKeyword, searchSort, searchFilters, setSearchKeyword, setSearchHistory } =
    useContext(searchOptionContext)
  const { throttling } = useThrottle()

  /// sort 는 잠시 제외 ///
  const searching = useCallback(
    (keyword?: string) => {
      keyword = keyword || searchKeyword
      if (keyword.length < 2) {
        window.alert('검색은 두 글자 이상부터 가능합니다.')
      } else {
        setSearchKeyword(keyword)
        const searchParams = [
          keyword && `keyword=${keyword}`,
          // `sort=${searchSort}`,
          Boolean(searchFilters.length) && `filters=${searchFilters.join(',')}`,
        ].filter((ele) => ele)

        throttling(() => {
          location.replace(PATH.SEARCH + '?' + searchParams.join('&'))
          keyword && setSearchHistory(keyword)
        })
      }
    },
    [searchKeyword, searchFilters, searchSort]
  )

  return <searchContext.Provider value={{ searching }}>{children}</searchContext.Provider>
}
