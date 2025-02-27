import { Union } from 'types/union.types'

export const DATE_FORMAT = {
  EN: 'MM.DD.YYYY',
  KO: 'YYYY.MM.DD',
} as const

export type DateFormatType = Union<typeof DATE_FORMAT>

/// DateInput Component ///
export const DATE_INPUT_SELECTION = {
  Y: 'y',
  M: 'm',
  D: 'd',
} as const

export type DateInputSelectionType = Union<typeof DATE_INPUT_SELECTION>

export const DATE_INPUT_DIRECTION = {
  PREV: 0,
  NEXT: 1,
} as const

export type DateInputDirectionType = Union<typeof DATE_INPUT_DIRECTION>

export const DATE_TO_SECOND_CONSTANT = {
  Y: 31536000,
  M: 2628000,
  D: 86400,
  h: 3600,
  m: 60,
} as const
