import { Union } from 'src/interfaces/union.types'

export const LANGUAGE = {
  EN: 'en-US',
  KO: 'ko-KR',
  JA: 'ja-JP',
} as const

export const SHORTEN_LANGUAGE = {
  EN: 'en',
  KO: 'ko',
  JA: 'ja',
} as const

export type LanguageType = Union<typeof LANGUAGE>
export type ShortenLanguageType = Union<typeof SHORTEN_LANGUAGE>
