import React from 'react'
import List from '../list/ListWindow'
import Bedge from '../bedge/Bedge'
import ListItem_SearchHistory from '../list/listItem/ListItem_SearchHistory'
import { SearchSection_Before_Props } from '@/src/@types/components/search/searchSection.interface'

export default function SearchSection_Before({
  popularSearchKeywords,
  searchHistory,
  removeSearchHistory,
  removeAllSearchHistory,
  search,
}: SearchSection_Before_Props) {
  return (
    <>
      {Boolean(popularSearchKeywords.length) && (
        <section className="flex flex-col px-2 py-6 pb-4 gap-6">
          <h3 className="typograph-16">
            지금 <strong className="font-semibold">인기 검색어</strong>에요
          </h3>
          <div className="w-full flex gap-2 overflow-auto hide-scrollbar">
            {popularSearchKeywords.map((keyword, idx) => (
              <article
                key={keyword + '-' + idx}
                onClick={() => search(keyword)}
                className="cursor-pointer"
              >
                <Bedge text={keyword} />
              </article>
            ))}
          </div>
        </section>
      )}
      {searchHistory.length ? (
        <section className="flex flex-col px-2 py-6 pb-4 h-full">
          <div className="w-full flex justify-between items-center">
            <h3 className="typograph-16">
              <strong className="font-semibold">최근 검색</strong>
            </h3>
            <span
              className="typograph-12 text-@-text-label cursor-pointer"
              onClick={removeAllSearchHistory}
            >
              전체 삭제
            </span>
          </div>
          <List
            items={searchHistory}
            Component={({ item, index }) =>
              ListItem_SearchHistory({ item, index, search, removeSearchHistory })
            }
          />
        </section>
      ) : (
        <></>
      )}
    </>
  )
}
