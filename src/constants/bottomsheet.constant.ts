import { Union } from '../@types/union.types'

/// 200ms ///
export const BOTTOMSHEET_ANIMATION_DURATION = 200 as const

export const BOTTOMSHEET_STATE = {
  CLOSE: 0,
  OPEN: 1,
} as const

export type BottomsheetState = Union<typeof BOTTOMSHEET_STATE>

export const BOTTOMSHEET_TYPE = {
  BOTTOMSHEET_SEARCH_FILTER: 1,
} as const

export type BottomSheetType = Union<typeof BOTTOMSHEET_TYPE>
