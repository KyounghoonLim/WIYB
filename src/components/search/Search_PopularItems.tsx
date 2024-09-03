'use client'

import useMyQuery from 'hooks/useMyQuery'
import Badge from '../badge/Badge'
import MyLink from '../link/MyLink'
import { getPopularSearchKeywordsApi } from 'services/searchApi'
import { PATH } from 'constants/path.constant'

export default function Search_PopularItems() {
  const { data: popularSearchKeywords, error } = useMyQuery(
    ['popularSearchKeywords'],
    getPopularSearchKeywordsApi
  )

  return (
    <>
      {popularSearchKeywords && !error && (
        <div className="w-[800px] h-14 flex-row-start gap-3 px-6">
          <p className="no-auto-size typograph-12 text-text-label-100">현재 인기 장비</p>
          <div className="w-full h-full flex-row-start gap-2 overflow-auto hide-scrollbar">
            {popularSearchKeywords.map((keyword, idx) => (
              <MyLink
                key={idx}
                href={{
                  pathname: PATH.SEARCH,
                  query: {
                    keyword: keyword.keyword,
                  },
                }}
              >
                <Badge text={keyword.keyword} />
              </MyLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
