'use client'

import useMyQuery from 'hooks/useMyQuery'
import Bedge from '../bedge/Bedge'
import MyLink from '../link/MyLink'
import { getPopularKeywordsApi } from 'services/searchApi'

export default function Search_PopularItems() {
  const { data: popularSearchKeywords, error } = useMyQuery(
    ['popularSearchKeywords'],
    getPopularKeywordsApi
  )

  return (
    <>
      {popularSearchKeywords && !error && (
        <div className="w-[800px] h-14 flex-row-start gap-3 px-6">
          <p className="no-auto-size typograph-12 text-text-label-100">현재 인기 장비</p>
          <div className="w-full h-full flex-row-start gap-2 overflow-auto hide-scrollbar">
            {popularSearchKeywords.map((keyword, idx) => (
              <MyLink key={idx} href="#">
                <Bedge text={keyword} />
              </MyLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
