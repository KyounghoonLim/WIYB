import { Union } from 'types/union.types'

export { SEARCH_CATEGORY, SEARCH_SORT, SEARCH_SORT_LABEL }

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

const SEARCH_SORT_LABEL = {
  DESC_REVIEW: '리뷰순',
  DESC: '최신순',
  ASC: '오래된 순',
} as const

export type SearchSortType = Union<typeof SEARCH_SORT>
