'use client'

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'
import useSearchHistory from 'hooks/search/useSearchHistory'
import { SEARCH_SORT, SearchSortType } from 'constants/search.constant'
import { Resource_Brand, Resource_EquipmentType } from 'types/resource.types'
import { useSearchParams } from 'next/navigation'
import { resourceContext } from 'providers/resource/resourceProvider'

export const searchOptionContext = createContext<{
  /**
   * 검색 필터 초기화
   */
  resetSearchFilters: () => void
  /**
   * 검색어 키워드
   *
   * searchParams 로 초기화 됨.
   *
   * 검색 키워드 캐싱 용도 (form 과 1:1 동기화 되지 않음. 초기화만 도움)
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
   * 검색 히스토리
   */
  searchHistory: string[]
  setSearchHistory: (keyword: string) => void
  removeSearchHistory: (keyword: string) => void
  removeAllSearchHistory: () => void
  /**
   * 검색어 필터 리소스
   */
  brandResource: Resource_Brand[]
  equipmentTypeResource: Resource_EquipmentType[]
}>(null)

export default function SearchOption_Wrapper({ children }) {
  const { brandResource, equipmentTypeResource } = useContext(resourceContext)

  const searchParams = useSearchParams()

  const [searchKeyword, setSearchKeyword] = useState<string>(searchParams?.get('keyword') || '')
  const [searchFilters, setSearchFilters] = useState<string[]>([])
  const [searchSort, setSearchSort] = useState<SearchSortType>(SEARCH_SORT.DESC_REVIEW)

  const { searchHistory, setSearchHistory, removeSearchHistory, removeAllSearchHistory } =
    useSearchHistory()

  const resetSearchFilters = useCallback(() => {
    setSearchFilters([])
  }, [])

  return (
    <searchOptionContext.Provider
      value={{
        resetSearchFilters,
        searchKeyword,
        setSearchKeyword,
        searchFilters,
        setSearchFilters,
        searchSort,
        setSearchSort,
        searchHistory,
        setSearchHistory,
        removeSearchHistory,
        removeAllSearchHistory,
        brandResource,
        equipmentTypeResource,
      }}
    >
      {children}
    </searchOptionContext.Provider>
  )
}
