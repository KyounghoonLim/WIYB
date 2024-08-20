import { dummy_popularSearchKeywords } from '@/@dummy'
import { SearchResult } from 'types/search.types'
import { SERVICE_PATH } from 'constants/path.constant'
import { SEARCH_ENGINE, SearchEngineType, SearchSortType } from '../constants/search.constant'
import myAxios from '../utils/axios/myAxios'

export { searchApi, getPopularKeywordsApi }

/**
 *
 * @param keyword 검색어 키워드
 * @param filter 필터링 (브랜드명, 장비종류) constant api 에 종속, 복수선택 가능
 * 복수 선택시, (,) 로 구분해서 join 한 문자열
 * @param sort 정렬
 * @returns
 */
function searchApi(
  keyword: string,
  sort: SearchSortType,
  engine: SearchEngineType,
  filters?: string
): Promise<SearchResult> {
  const params = {
    keyword,
    filters,
    sort,
  }

  const pathname = SERVICE_PATH.SEARCH + (engine === SEARCH_ENGINE.V1 ? '' : '/v2')

  return myAxios.get(pathname, {
    params,
  })
}

function getPopularKeywordsApi(): Promise<string[]> {
  return Promise.resolve(dummy_popularSearchKeywords)
  // return myAxios.get(SERVICE_PATH.POPULAR_SEARCH_KEYWORDS)
}
