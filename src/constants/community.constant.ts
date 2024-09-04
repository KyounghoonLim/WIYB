import { Union } from 'types/union.types'

export const COMMUNITY_TYPE = {
  ALL: 'ALL',
  FREE: 'FREE',
  INFO: 'INFO',
  QNA: 'QNA',
  TIP: 'TIP',
} as const

export type CommunityType = Union<typeof COMMUNITY_TYPE>
