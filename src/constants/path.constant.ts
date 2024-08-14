import { Union } from 's/@types/union.types'

export const PATH = {
  MAIN: '/main',
  /// auth ///
  LOGIN: '/login',
  SIGN: '/sign',
  /// user ///
  PROFILE: '/profile',
  /// search ///
  SEARCH: '/search',
  /// equipment ///
  EQUIPMENT_DETAIL: '/equipment/detail?id=[id]&type=[type]',
  EQUIPMENT_REVIEW: '/equipment/review?id=[id]&type=[type]',
  EQUIPMENT_REVIEW_FORM: '/equipment/review/form?id=[id]&type=[type]',
} as const

export const AUTH_REQUIRED_PATH = Object.values(PATH).reduce((prev, curr) => {
  if (curr === PATH.LOGIN || curr === PATH.SIGN) return prev
  else return [...prev, curr]
}, [])

export type PathType = Union<typeof PATH>

export const SERVICE_PATH = {
  /// auth ///
  /**
   * OAUTH 로그인 API (GET)
   * API 서버에서 자동으로 리다이렉트 시킴.
   * ** 하위 패스로 provider 가 필요함.
   */
  LOGIN: '/oauth2/authorization',
  LOGOUT: '/logout',
  TOKEN_REFRESH: '/auth/token',
  /// user ///
  /**
   * 회원가입 API (POST)
   * 최초 회원가입시 닉네임, 성별, 생년월일을 받음
   */
  SET_USER: '/user',
  /**
   * 유저 정보 가져오기 API (GET)
   * 하위 패스로 userId 를 추가하면 해당 사람의 정보,
   * 없으면 본인의 정보를 가져옴
   */
  GET_USER: '/user/profile',
  /**
   * 유저 정보 업데이트 API (PUT)
   * 프로필이미지?, 닉네임?, 핸디?, 신장?, 체중?
   */
  UPDATE_USER: '/user/profile',
  /**
   * 유저 데이터 삭제 API (DELETE)
   * ** 테스트용 **
   */
  DELETE_USER: '/user',
  /// search ///
  SEARCH: '/search',
  POPULAR_SEARCH_KEYWORDS: '/search/popular',
  /// equipment ///
  EQUIPMENT_DETAIL: '/product/[id]/[type]',
  EQUIPMENT_REVIEW: '/product/[id]/review',
  POPULAR_EQUIPMENTS: '/product/most/view/simple',
  /// common ///
  UPLOAD_IMAGE: '/image',
  /// constant ///
  CONSTANT_BRAND: '/static/brand',
  CONSTANT_EQUIPMENT_TYPE: '/static/equipment/type',
} as const
