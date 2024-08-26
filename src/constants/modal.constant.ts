import { Union } from 'types/union.types'

export const MODAL_TYPE = {
  REVIEW: 0,
} as const

export type ModalType = Union<typeof MODAL_TYPE>
