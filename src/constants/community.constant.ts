import { Union } from 'types/union.types'

export const COMMUNITY_CATRGORY = {
  ALL: 'all',
  GENERAL: 'general',
  INFO: 'info',
  QNA: 'qna',
  TIP: 'tip',
} as const

export type CommunityCategory = Union<typeof COMMUNITY_CATRGORY>
