import { Union } from 'types/union.types'

export const DROPDOWN_DIRECTION = {
  TOP_TO_BOTTOM: 0,
  LEFT_TO_RIGHT: 1,
  RIGHT_TO_LEFT: 2,
  BOTTOM_TO_TOP: 3,
} as const

export type DropdownDirectionType = Union<typeof DROPDOWN_DIRECTION>
