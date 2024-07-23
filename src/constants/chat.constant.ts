import { Union } from 'src/interfaces/union.types'

export const CHAT_TYPE = {
  MESSAGE: 'message',
  IMAGE: 'image',
  SELECTION: 'selection',
} as const

export type ChatType = Union<typeof CHAT_TYPE>

export const CHAT_SENDER_TYPE = {
  ASSISTANCE: 'assistance',
  USER: 'user',
  SYSTEM: 'system',
} as const

export type ChatSenderType = Union<typeof CHAT_SENDER_TYPE>
