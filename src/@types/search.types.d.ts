import { Equipment } from './equipment.types'

export { SearchResult, SearchResultMetadata, PopularKeyword }

type SearchResult = {
  metadata: SearchResultMetadata
  content: Equipment[]
}

type SearchResultMetadata = {
  contextId: string
  offset: number
  /**
   * 총 페이지 수
   */
  totalOffset: number
  /**
   * 총 데이터 수
   */
  totalSize: number
  size: number
  isEmpty: boolean
  isLast: boolean
}

type PopularKeyword = {
  keyword: string
  hitCount: number
}
