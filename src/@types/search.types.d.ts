import { Equipment } from './equipment.types'

export { SearchResult, SearchResultMetadata, PopularKeyword }

type SearchResult = {
  metadata: SearchResultMetadata
  content: Equipment[]
}

type SearchResultMetadata = {
  contextId: string
  offset: number
  total: number
  size: number
  isEmpty: boolean
  isLast: boolean
}

type PopularKeyword = {
  keyword: string
  hitCount: number
}
