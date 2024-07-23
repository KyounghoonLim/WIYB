export const LOGIN_TYPE = {
  GOOGLE: 'google',
  APPLE: 'apple',
  NAVER: 'naver',
  KAKAO: 'kakao',
  ANONYMOUS: 'anonymous',
}

export type LoginType = (typeof LOGIN_TYPE)[keyof typeof LOGIN_TYPE]

export const ALLOWED_REFFERER = {
  GOOGLE: 'https://accounts.google.com/',
}
