import { Union } from '../@types/union.types'

export { SEARCH_CATEGORY, SEARCH_SORT, SEARCH_ENGINE }

const SEARCH_CATEGORY = {
  EQUIP: 'equipments',
  USER: 'users',
} as const

export type SearchCategoryType = Union<typeof SEARCH_CATEGORY>

const SEARCH_SORT = {
  DESC_REVIEW: 'reviewCountDesc',
  DESC: 'releasedDesc',
  ASC: 'releasedAsc',
} as const

export type SearchSortType = Union<typeof SEARCH_SORT>

const SEARCH_ENGINE = {
  V1: 'v1',
  V2: 'v2',
} as const

export type SearchEngineType = Union<typeof SEARCH_ENGINE>
