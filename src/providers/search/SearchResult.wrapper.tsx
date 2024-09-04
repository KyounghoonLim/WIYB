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

export default function SearchResult_Wrapper({
  children,
  useInfinityScroll,
}: {
  children: ReactNode
  useInfinityScroll?: boolean
}) {
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

  const [contents, setContents] = useState<SearchResult['content']>([])
  const [metadata, setMetadata] = useState<SearchResult['metadata']>(null)
  const [isEndOfPage, setIsEndOfPage] = useState<boolean>(false)

  /**
   * 서치 옵션의 변화에 따라 중복 요청 등을 방지 하기 위함
   */
  const isSearchEnable = useMemo(() => {
    if (!searchKeyword) return false
    else if (!searchRequestSnapshot.current) return true
    else {
      const { sort, filters } = searchRequestSnapshot.current
      const isOptionChanged = searchSort !== sort || searchFilters !== filters
      if (isOptionChanged) {
        /// 옵션이 변경되었는데 offset, contextId 를 유지하고 있는 경우 (초기화 해주어야 함)
        return !(searchOffset > 1 || searchContextId)
      } else {
        /// 최초 검색을 통해 결과를 가져왔을 때, contextId 의 변화로 중복 요청이 가는 것을 방지
        if (useInfinityScroll) return !(searchOffset === 1 && searchContextId)
        /// 페이지네이터를 사용하는 경우 offset 이 이전 offset 으로도 다시 갈 수 있기 때문에 로직 변경 ///
        else {
          const { keyword, offset, contextId } = searchRequestSnapshot.current
          if (offset === searchOffset && contextId === searchContextId && keyword !== searchKeyword)
            return false
          else return true
        }
      }
    }
  }, [searchKeyword, searchSort, searchFilters, searchContextId, searchOffset, useInfinityScroll])

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
      setContents((temp) => {
        if (!useInfinityScroll) return content
        else if (metadata.offset === 1) return content
        else return [...temp, ...content]
      })
      setMetadata(metadata)
    },
    [
      searchKeyword,
      searchSort,
      searchFilters,
      searchContextId,
      searchOffset,
      searchSize,
      useInfinityScroll,
    ]
  )

  /**
   * 검색어, 정렬방식, 필터, 컨텍스트 id, offset, size 가 변경되면 새로운 검색 요청이 감
   */
  const { isLoading } = useMyQuery(
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

  /**
   * 검색 페이지가 변경될 때 스크롤을 상단으로 올림
   * Pagination only
   */
  useLayoutEffect(() => {
    if (useInfinityScroll) return
    else {
      document.scrollingElement.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchOffset, useInfinityScroll])

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
