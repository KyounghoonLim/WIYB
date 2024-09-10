'use client'

import useMyQuery from 'hooks/useMyQuery'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { searchApi } from 'services/searchApi'
import { SearchResult } from 'types/search.types'
import { searchOptionContext } from './SearchOption.wrapper'
import { SearchSortType } from 'constants/search.constant'

export const searchResultContext = createContext<{
  contents: SearchResult['content']
  metadata: SearchResult['metadata']
  isLoading: boolean
  isEndOfPage: boolean
  searchOffset: number
  setSearchOffset: Dispatch<SetStateAction<number>>
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

export default function SearchResult_Wrapper({ children }: { children: ReactNode }) {
  const { searchKeyword, searchSort, searchFilters } = useContext(searchOptionContext)

  /**
   * searchOptions 의 state 가 워터폴 방식으로 내려오기 때문에 딜레이가 발생
   * 따라서, searchOptions 가 바뀌었을 때 contextId, offset 을 초기화 해주기 위해
   * 비교를 위한 스냅샷 저장
   */
  const searchRequestSnapshot = useRef<SearchReqeusetSnapshot>()

  const [searchContextId, setSearchContextId] = useState<string>(undefined)
  const [searchOffset, setSearchOffset] = useState<number>(1)
  const [searchSize] = useState<number>(20)

  const [contents, setContents] = useState<SearchResult['content']>([])
  const [metadata, setMetadata] = useState<SearchResult['metadata']>(null)
  const [isEndOfPage, setIsEndOfPage] = useState<boolean>(false)

  /**
   * 서치 옵션의 변화에 따라 중복 요청 등을 방지 하기 위함
   */
  const isSearchEnable = useMemo(() => {
    /// 검색 키워드가 없으면 검색 불가 ///
    if (!searchKeyword) return false
    /// 최초 검색시에는 키워드가 있는 경우 검색 가능 ///
    else if (!searchRequestSnapshot.current) return true
    else {
      const { sort, filters, contextId } = searchRequestSnapshot.current
      const isOptionChanged = searchSort !== sort || searchFilters !== filters
      const isFirstSearch = !contextId || contextId !== searchContextId
      /// 옵션이 변경된 경우 검색 가능 ///
      if (isOptionChanged) return true
      /// 첫 번째 검색인데 실제 페이지가 1인 경우 검색 불가 (contextId 로 인한 중복 검색 방지) ///
      else if (isFirstSearch && searchOffset === 1) return false
      else return true
    }
  }, [searchKeyword, searchSort, searchFilters, searchOffset, searchContextId])

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
      setContents(content)
      setMetadata(metadata)
      setIsEndOfPage(metadata.isLast)
      setSearchContextId(metadata.contextId)
      /**
       * 스크롤 페이지 최상단으로 이동
       */
      if (document.scrollingElement.scrollTop > 422) {
        document.scrollingElement.scrollTo({ top: 422, behavior: 'smooth' })
      }
    },
    [searchKeyword, searchSort, searchFilters, searchContextId, searchOffset, searchSize]
  )

  /**
   * 검색어, 정렬방식, 필터, 컨텍스트 id, offset, size 가 변경되면 새로운 검색 요청이 감
   */
  const { isLoading } = useMyQuery(
    [searchKeyword, searchSort, searchFilters.join(','), searchContextId, searchOffset, searchSize],
    searchApi,
    { enabled: isSearchEnable, staleTime: Infinity },
    successHandler
  )

  /**
   * 검색 옵션이 변경되면 offset 을 초기화 함
   */
  useLayoutEffect(() => {
    setSearchOffset(1)
  }, [searchSort, searchFilters])

  return (
    <searchResultContext.Provider
      value={{
        contents,
        metadata,
        isLoading,
        isEndOfPage,
        searchOffset,
        setSearchOffset,
        goToNextPage,
      }}
    >
      {children}
    </searchResultContext.Provider>
  )
}
