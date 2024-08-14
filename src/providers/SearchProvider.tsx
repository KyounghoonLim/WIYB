'use client'

import React, { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import useSearchHistory from '../hooks/search/useSearchHistory'
import usePopularSearchKeywords from '../hooks/search/usePopularSearchKeyword'
import { PATH } from '../constants/path.constant'
import useThrottle from '../hooks/useThrottle'
import {
  SEARCH_ENGINE,
  SEARCH_SORT,
  SearchEngineType,
  SearchSortType,
} from '../constants/search.constant'

export const searchContext = createContext<{
  /**
   * 검색 페이지로 이동
   * @param keyword 검색 키워드
   */
  goToSearch: (keyword: string) => void
  /**
   * 검색 컴포넌트 언마운트 시 검색 옵션 초기화
   */
  resetSearchOptions: () => void
  /**
   * 검색어 키워드
   */
  searchKeyword: string
  setSearchKeyword: Dispatch<SetStateAction<string>>
  /**
   * 검색 필터 리스트
   */
  searchFilters: string[]
  setSearchFilters: Dispatch<SetStateAction<string[]>>
  /**
   * 검색 정렬
   */
  searchSort: SearchSortType
  setSearchSort: Dispatch<SetStateAction<SearchSortType>>
  /**
   * 검색 엔진 버전
   */
  searchEngine: SearchEngineType
  setSearchEngine: Dispatch<SetStateAction<SearchEngineType>>
  /**
   * 검색 히스토리
   */
  searchHistory: string[]
  setSearchHistory: (keyword: string) => void
  removeSearchHistory: (keyword: string) => void
  removeAllSearchHistory: () => void
  popularSearchKeywords: string[]
}>(null)

export default function SearchProvider({ children }) {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchFilters, setSearchFilters] = useState<string[]>([])
  const [searchSort, setSearchSort] = useState<SearchSortType>(SEARCH_SORT.DESC_REVIEW)
  const [searchEngine, setSearchEngine] = useState<SearchEngineType>(SEARCH_ENGINE.V1)

  const { searchHistory, setSearchHistory, removeSearchHistory, removeAllSearchHistory } =
    useSearchHistory()
  const { popularSearchKeywords } = usePopularSearchKeywords()

  const { throttling } = useThrottle(true)

  const goToSearch = useCallback(
    (keyword: string) => {
      const searchParams = [
        `search=${keyword}`,
        `sort=${searchSort}`,
        Boolean(searchFilters.length) && `filters=${searchFilters.join(',')}`,
        `engine=${searchEngine}`,
      ].filter((ele) => ele)

      throttling(() => {
        setSearchKeyword(keyword)
        setSearchHistory(keyword)
        location.replace(PATH.SEARCH + '?' + searchParams.join('&'))
      })
    },
    [searchFilters, searchSort, searchEngine]
  )

  const resetSearchOptions = useCallback(() => {
    setSearchKeyword('')
    setSearchSort(SEARCH_SORT.DESC_REVIEW)
    setSearchEngine(SEARCH_ENGINE.V1)
    setSearchFilters([])
  }, [])

  return (
    <searchContext.Provider
      value={{
        goToSearch,
        resetSearchOptions,
        searchKeyword,
        setSearchKeyword,
        searchFilters,
        setSearchFilters,
        searchSort,
        setSearchSort,
        searchEngine,
        setSearchEngine,
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
