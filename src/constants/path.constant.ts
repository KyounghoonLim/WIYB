import { Union } from "s/@types/union.types";

export const PATH = {
  MAIN: "/main",
  /// auth ///
  LOGIN: "/login",
  SIGN: "/sign",
  AUTH_SUCCESS: "/sign/success",
  AUTH_FAIL: "/sign/fail",
  PROFILE: "/profile",
  /// fallback ///
  NOT_FOUND: "/not-found",
} as const;

export type PathType = Union<typeof PATH>;

export const SERVER_PATH = {
  AVATARS: "/resource/avatars",
  VOICES: "/resource/voices",
  BACKGROUNDS: "/resource/backgrounds",
  AUTH_TOKEN: "/auth/token",
  USER_PROFILE: "/user/profile",
  MY_AVATARS: "/chatbot/my",
} as const;

export type ServerPathType = Union<typeof SERVER_PATH>;
