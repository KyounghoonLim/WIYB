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

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchFilters, setSearchFilters] = useState<string[]>([])
  const [searchSort, setSearchSort] = useState<SearchSortType>(SEARCH_SORT.DESC_REVIEW)

  const { searchHistory, setSearchHistory, removeSearchHistory, removeAllSearchHistory } =
    useSearchHistory()

  const searchParams = useSearchParams()

  const resetSearchOptions = useCallback(() => {
    setSearchSort(SEARCH_SORT.DESC_REVIEW)
    setSearchFilters((temp) => (temp?.length ? [] : temp))
  }, [])

  useLayoutEffect(() => {
    setSearchKeyword(searchParams.get('keyword') || '')
  }, [searchParams])

  return (
    <searchOptionContext.Provider
      value={{
        resetSearchOptions,
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
