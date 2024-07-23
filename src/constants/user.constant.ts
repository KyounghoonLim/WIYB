import { Union } from 'src/interfaces/union.types'

export const ACCOUNT_TYPE = {
  VERIFIED: 'verified',
  ANONYMOUS: 'anonymous',
} as const

export type AccountType = Union<typeof ACCOUNT_TYPE>
