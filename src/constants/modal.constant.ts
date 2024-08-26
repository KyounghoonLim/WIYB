import { Union } from 'types/union.types'

export const MODAL_TYPE = {
  REVIEW: 'review',
} as const

export type ModalType = Union<typeof MODAL_TYPE>
