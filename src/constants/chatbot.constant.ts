import { Union } from 'src/interfaces/union.types'

export const CHATBOT_PRAMS = {
  NAME: 'name',
  GENDER: 'gender',
  PERSONALITY_ID: 'personalityId',
  SPEECH_ID: 'speechId',
  DESC: 'description',
  OWNER_NICKNAME: 'ownerNickname',
} as const

export type ChatbotPramsType = Union<typeof CHATBOT_PRAMS>

export const CHATBOT_ACCESS_TYPE = {
  PRIVATE: 'private',
  PUBLIC: 'public',
} as const

export type ChatbotAccessType = Union<typeof CHATBOT_ACCESS_TYPE>
