import { Union } from 'src/interfaces/union.types'

export const GENDER = {
  FEMALE: 'Female',
  MALE: 'Male',
  NON_BINARY: 'Non-binary',
} as const

export type GenderType = Union<typeof GENDER>
