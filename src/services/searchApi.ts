import { dummy_popularSearchKeywords } from '@/@dummy'
import { PopularKeyword, SearchResult } from 'types/search.types'
import { SERVICE_PATH } from 'constants/path.constant'
import { SearchSortType } from 'constants/search.constant'
import myAxios from 'utils/axios/myAxios'

export { searchApi, getPopularKeywordsApi }

/**
 *
 * @param keyword 검색어 키워드
 * @param sort 정렬
 * @param filter 필터링 (브랜드명, 장비종류) constant api 에 종속, 복수선택 가능
 * 복수 선택시, (,) 로 구분해서 join 한 문자열
 * @param contextId 검색 세션 id, 최초 1회에는 없어도 되나 이후 페이징에서는 같은 세션 id 를 물고 가야함
 * @param offset 검색 페이징
 * @param size 검색 결과 반환 갯수
 * @returns
 */
function searchApi(
  keyword: string,
  sort: SearchSortType,
  filters?: string,
  contextId?: string,
  offset?: number,
  size?: number
): Promise<SearchResult> {
  const params = {
    keyword,
    filters,
    sort,
    contextId,
    offset,
    size,
  }

  return myAxios.get(SERVICE_PATH.SEARCH, {
    params,
  })
}

function getPopularKeywordsApi(): Promise<PopularKeyword[]> {
  return myAxios.get(SERVICE_PATH.POPULAR_SEARCH_KEYWORDS)
}
