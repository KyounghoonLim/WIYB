import { Union } from 'types/union.types'

export const STORAGE_TYPE = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
} as const

export type StorageType = Union<typeof STORAGE_TYPE>

/// browser storage keys ///
export const STORAGE_KEY = {
  LOGIN: {
    SUCCESS_FALLBACK: 'lsfb',
  },
} as const
