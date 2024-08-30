import { Union } from 'types/union.types'

export { REVIEW_SORT }

const REVIEW_SORT = {
  POPULAR: 'likeCountDesc',
  DESC: 'createdDesc',
  ASC: 'createdAsc',
} as const

export type ReviewSortType = Union<typeof REVIEW_SORT>
