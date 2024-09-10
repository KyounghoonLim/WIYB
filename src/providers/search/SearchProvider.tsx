'use client'

import { createContext, useCallback, useContext } from 'react'
import { searchOptionContext } from './SearchOption.wrapper'
import useThrottle from 'hooks/useThrottle'
import { PATH } from 'constants/path.constant'
import SearchResult_Wrapper from './SearchResult.wrapper'
import dynamic from 'next/dynamic'

const SearchOption_Wrapper = dynamic(() => import('./SearchOption.wrapper'))

export const searchContext = createContext<{
  /**
   * 검색 페이지 이동용
   */
  goToSearch: (keyword: string) => void
}>(null)

/**
 * wrapper
 */
export default function SearchProvider({ children }) {
  return (
    <SearchOption_Wrapper>
      <SearchResult_Wrapper>
        <SearchProviderChild>{children}</SearchProviderChild>
      </SearchResult_Wrapper>
    </SearchOption_Wrapper>
  )
}

function SearchProviderChild({ children }) {
  const { setSearchKeyword, setSearchHistory } = useContext(searchOptionContext)
  const { throttling } = useThrottle()

  const goToSearch = useCallback(
    (keyword: string) => {
      if (keyword?.length < 2) {
        window.alert('검색은 두 글자 이상부터 가능합니다.')
      } else {
        setSearchKeyword(keyword)
        const searchParams = [
          keyword && `keyword=${keyword}`,
          // `sort=${searchSort}`,
          // Boolean(searchFilters.length) && `filters=${searchFilters.join(',')}`,
        ].filter((ele) => ele)

        throttling(() => {
          location.replace(PATH.SEARCH + '?' + searchParams.join('&'))
          keyword && setSearchHistory(keyword)
        })
      }
    },
    [setSearchHistory, setSearchKeyword, throttling]
  )

  return <searchContext.Provider value={{ goToSearch }}>{children}</searchContext.Provider>
}
