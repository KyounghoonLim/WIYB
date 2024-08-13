import React, { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import useSearchHistory from '../hooks/search/useSearchHistory'
import usePopularSearchKeywords from '../hooks/search/usePopularSearchKeyword'
import { PATH } from '../constants/path.constant'
import useThrottle from '../hooks/useThrottle'

export const searchContext = createContext<{
  goToSearch: (keyword: string) => void
  searchKeyword: string
  setSearchKeyword: Dispatch<SetStateAction<string>>
  searchHistory: string[]
  setSearchHistory: (keyword: string) => void
  removeSearchHistory: (keyword: string) => void
  removeAllSearchHistory: () => void
  popularSearchKeywords: string[]
}>(null)

export default function SearchProvider({ children }) {
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const { searchHistory, setSearchHistory, removeSearchHistory, removeAllSearchHistory } =
    useSearchHistory()
  const { popularSearchKeywords } = usePopularSearchKeywords()

  const { throttling } = useThrottle(true)

  const goToSearch = useCallback((keyword: string) => {
    throttling(() => {
      setSearchKeyword(keyword)
      setSearchHistory(keyword)
      location.replace(PATH.SEARCH + `?search=${keyword}`)
    })
  }, [])

  return (
    <searchContext.Provider
      value={{
        goToSearch,
        searchKeyword,
        setSearchKeyword,
        searchHistory,
        setSearchHistory,
        removeSearchHistory,
        removeAllSearchHistory,
        popularSearchKeywords,
      }}
    >
      {children}
    </searchContext.Provider>
  )
}
