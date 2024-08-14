export const AUTH_PROVIDER = {
  GOOGLE: "google",
  NAVER: "naver",
  KAKAO: "kakao",
};

export type AuthProviderType = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
