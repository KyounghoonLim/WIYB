import { Union } from 'types/union.types'

export const SEARCH_RANGE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  TOTAL: 'total',
} as const

export type SearchRangeType = Union<typeof SEARCH_RANGE>
