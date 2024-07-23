import { Union } from 'src/interfaces/union.types'

export const PATH = {
  MAIN: '/',
  /// auth ///
  LOGIN: '/login',
  PROFILE: '/profile',
  AUTH_SUCCESS: '/sign/success',
  AUTH_FAIL: '/sign/fail',
  /// create ///
  ONBOARDING: '/onboarding',
  /// kikiz ///
  KIKIZ: '/kikiz',
  KIKIZ_EDIT: '/kikiz/edit',
  /// fallback ///
  NOT_FOUND: '/not-found',
} as const

export type PathType = Union<typeof PATH>

export const SERVER_PATH = {
  AVATARS: '/resource/avatars',
  VOICES: '/resource/voices',
  BACKGROUNDS: '/resource/backgrounds',
  AUTH_TOKEN: '/auth/token',
  USER_PROFILE: '/user/profile',
  MY_AVATARS: '/chatbot/my',
} as const

export type ServerPathType = Union<typeof SERVER_PATH>
