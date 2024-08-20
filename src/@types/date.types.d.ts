import { Union } from 'types/union.types'
import { DATE_FORMAT, DATE_INPUT_DIRECTION, DATE_INPUT_SELECTION } from '../constants/date.constant'

export type DateFormatType = Union<typeof DATE_FORMAT>
export type DateInputSelectionType = Union<typeof DATE_INPUT_SELECTION>
export type DateInputDirectionType = Union<typeof DATE_INPUT_DIRECTION>
