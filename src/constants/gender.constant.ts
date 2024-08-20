import { Union } from 'types/union.types'

export const GENDER = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  SECRET: 'OTHER',
} as const

export type GenderType = Union<typeof GENDER>
