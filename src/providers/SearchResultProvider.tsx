'use client'

import useMyQuery from 'hooks/useMyQuery'
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { searchApi } from 'services/searchApi'
import { SearchResult } from 'types/search.types'
import { searchOptionContext } from './SearchOptionProvider'
import { SearchSortType } from 'constants/search.constant'

export const searchResultContext = createContext<{
  searchResultContents: SearchResult['content']
  isEndOfPage: boolean
  goToNextPage: () => void
}>(null)

type SearchReqeusetSnapshot = {
  keyword: string
  sort: SearchSortType
  filters: string[]
  contextId: string
  offset: number
  size: number
}

export default function SearchResultProvider({ children }) {
  const { searchKeyword, searchSort, searchFilters } = useContext(searchOptionContext)

  /**
   * searchOptions 의 state 가 워터폴 방식으로 내려오기 때문에 딜레이가 발생
   * 따라서, searchOptions 가 바뀌었을 때 contextId, offset 을 초기화 해주기 위해
   * 비교를 위한 스냅샷 저장
   */
  const searchRequestSnapshot = useRef<SearchReqeusetSnapshot>()

  const [searchContextId, setSearchContextId] = useState<string>()
  const [searchOffset, setSearchOffset] = useState<number>(1)
  const [searchSize, setSearchSize] = useState<number>(20)

  const [searchResultContents, setSearchResultContents] = useState<SearchResult['content']>([])
  const [isEndOfPage, setIsEndOfPage] = useState<boolean>(false)

  const isSearchEnable = useMemo(() => {
    if (!searchRequestSnapshot.current) return true
    else {
      const { sort, filters } = searchRequestSnapshot.current
      const isOptionChanged = searchSort !== sort || searchFilters !== filters
      if (isOptionChanged) {
        /// 옵션이 변경되었는데 offset, contextId 를 유지하고 있는 경우 (초기화 해주어야 함)
        return !(searchOffset > 1 || searchContextId)
      } else {
        /// 최초 검색을 통해 결과를 가져왔을 때, contextId 의 변화로 중복 요청이 가는 것을 방지
        return !(searchOffset === 1 && searchContextId)
      }
    }
  }, [searchSort, searchFilters, searchContextId, searchOffset])

  const goToNextPage = useCallback(() => {
    setSearchOffset((temp) => temp + 1)
  }, [])

  const successHandler = useCallback(
    ({ metadata, content }: SearchResult) => {
      searchRequestSnapshot.current = {
        keyword: searchKeyword,
        sort: searchSort,
        filters: searchFilters,
        contextId: searchContextId,
        offset: searchOffset,
        size: searchSize,
      }
      setIsEndOfPage(metadata.isLast)
      setSearchContextId(metadata.contextId)
      setSearchResultContents((temp) => {
        if (metadata.offset === 1) return content
        else return [...temp, ...content]
      })
    },
    [searchKeyword, searchSort, searchFilters, searchContextId, searchOffset, searchSize]
  )

  /**
   * 검색어, 정렬방식, 필터, 컨텍스트 id, offset, size 가 변경되면 새로운 검색 요청이 감
   */
  useMyQuery(
    [searchKeyword, searchSort, searchFilters.join(','), searchContextId, searchOffset, searchSize],
    searchApi,
    { enabled: isSearchEnable },
    successHandler
  )

  /**
   * 검색 옵션이 변경되면 contextId, offset 을 초기화 함
   */
  useLayoutEffect(() => {
    if (document.scrollingElement.scrollTop > 422) {
      document.scrollingElement.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setSearchContextId(undefined)
    setSearchOffset(1)
  }, [searchSort, searchFilters])

  return (
    <searchResultContext.Provider value={{ searchResultContents, isEndOfPage, goToNextPage }}>
      {children}
    </searchResultContext.Provider>
  )
}
