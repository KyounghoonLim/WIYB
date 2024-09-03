import { Union } from 'types/union.types'

export const COMMUNITY_CATEGORY = {
  ALL: 'ALL',
  FREE: 'FREE',
  INFO: 'INFO',
  QNA: 'QNA',
  TIP: 'TIP',
} as const

export type CommunityCategoryType = Union<typeof COMMUNITY_CATEGORY>
