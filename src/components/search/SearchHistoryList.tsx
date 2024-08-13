'use client'

import { searchContext } from '@/src/providers/SearchProvider'
import { useContext } from 'react'
import ListWindow from '../list/ListWindow'
import ListItem_SearchHistory from '../list/listItem/ListItem_SearchHistory'

export default function SearchHistoryList() {
  const { goToSearch, searchHistory, removeSearchHistory, removeAllSearchHistory } =
    useContext(searchContext)

  return (
    <>
      {Boolean(searchHistory.length) && (
        <section className="w-full h-full flex flex-col px-2 py-6 pb-4">
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
          <ListWindow
            items={searchHistory}
            Component={({ item, index }) =>
              ListItem_SearchHistory({ item, index, goToSearch, removeSearchHistory })
            }
          />
        </section>
      )}
    </>
  )
}
