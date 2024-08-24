import { Union } from 'types/union.types'

export { REVIEW_SORT, REVIEW_SORT_LABEL }

const REVIEW_SORT = {
  POPULAR: 'popular',
  DESC: 'releasedDesc',
  ASC: 'releasedAsc',
} as const

const REVIEW_SORT_LABEL = {
  POPULAR: '인기순',
  DESC: '최신순',
  ASC: '오래된 순',
} as const

export type ReviewSortType = Union<typeof REVIEW_SORT>
