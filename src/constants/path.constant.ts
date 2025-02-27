/**
 * web application paths
 */
export const PATH = {
  MAIN: '/',
  /// auth ///
  LOGIN: '/login',
  LOGIN_FAILURE: '/login/failure',
  SIGN: '/sign',
  /// user ///
  PROFILE: '/profile',
  /// search ///
  SEARCH: '/search',
  /// equipment ///
  EQUIPMENT_DETAIL: '/equipment',
  EQUIPMENT_POPULAR: '/equipment/popular',
  /// community ///
  COMMUNITY: '/community',
  COMMUNITY_FORM: '/community/form',
} as const

export const PATH_PARAMS = {
  EQUIPMENT_DETAIL: '/[equipmentType]/[equipmentId]',
  EQUIPMENT_POPULAR: '/[equipmentType]',
  COMMUNITY: '/[communityCategory]',
  COMMUNITY_POST: '/[postId]',
} as const

export const AUTHORITY_PATH = {
  ALL: [PATH.MAIN, PATH.SEARCH, PATH.EQUIPMENT_DETAIL, PATH.EQUIPMENT_POPULAR, PATH.COMMUNITY],
  GUEST: [PATH.LOGIN, PATH.LOGIN_FAILURE, PATH.SIGN],
  USER: [PATH.PROFILE, PATH.COMMUNITY_FORM],
} as const

/// api paths ///
export const SERVICE_PATH = {
  /// auth ///
  /**
   * OAUTH 로그인 API (GET)
   * API 서버에서 자동으로 리다이렉트 시킴.
   * ** 하위 패스로 provider 가 필요함.
   */
  LOGIN: '/oauth2/authorization',
  LOGOUT: '/logout',
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
  SEARCH: '/search/product',
  POPULAR_SEARCH_KEYWORDS: '/search/popular/keyword',
  /// equipment ///
  GET_EQUIPMENT: '/product/[id]/[type]',
  POPULAR_EQUIPMENTS_TOP5: '/product/popular/simple',
  POPULAR_EQUIPMENTS_TOP100: '/product/popular/all',
  POPULAR_EQUIPMENTS_METRIC: '/product/popular/metric',
  BOOKMARK_EQUIPMENT: '/product/[id]/bookmark',
  /// review ///
  REVIEW: '/product/[equipmentId]/review',
  LIKE_REVIEW: '/product/[equipmentId]/review/[reviewId]/like',
  /// community ///
  GET_COMMUNITY_POSTS: '/community/post',
  GET_COMMUNITY_POST_DETAIL: '/community/post/[postId]',
  POST_COMMUNITY_POST: '/community/post',
  UPDATE_COMMUNITY_POST: '/community/post/[postId]',
  DELETE_COMMUNITY_POST: '/community/post/[postId]',
  POST_COMMUNITY_COMMENT: '/community/post/[postId]/comment',
  UPDATE_COMMUNITY_COMMENT: '/community/post/[postId]/comment/[commentId]',
  REMOVE_COMMUNITY_COMMENT: '/community/post/[postId]/comment/[commentId]',
  /// common ///
  UPLOAD_IMAGE: '/image',
  /// constant ///
  CONSTANT_BRAND: '/static/brand',
  CONSTANT_EQUIPMENT_TYPE: '/static/equipment/type',
  /// token ///
  TOKEN_REFRESH: '/auth/token',
  TOKEN_VALIDATION: '/auth/token',
} as const
