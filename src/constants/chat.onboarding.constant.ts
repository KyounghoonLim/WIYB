import { Union } from 'src/interfaces/union.types'

export const CHAT_TYPE_ONBOARDING = {
  PLAIN: 'plain',
  RESOURCE: 'resource',
  QUESTION: 'question',
  HELP_TEXT: 'helptext',
} as const

export type ChatTypeOnboarding = Union<typeof CHAT_TYPE_ONBOARDING>
