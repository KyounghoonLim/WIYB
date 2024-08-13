'use client'

import { searchContext } from '@/src/providers/SearchProvider'
import { useContext } from 'react'
import Bedge from '../bedge/Bedge'

export default function SearchPopularKeywords() {
  const { goToSearch, popularSearchKeywords } = useContext(searchContext)

  return (
    <>
      {Boolean(popularSearchKeywords?.length) && (
        <section className="w-full flex flex-col px-2 py-6 pb-4 gap-6">
          <h3 className="typograph-16">
            지금 <strong className="font-semibold">인기 검색어</strong>에요
          </h3>
          <div className="w-full flex gap-2 overflow-auto hide-scrollbar">
            {popularSearchKeywords.map((keyword, idx) => (
              <Bedge
                key={keyword + '-' + idx}
                text={keyword}
                onClick={goToSearch}
                className="cursor-pointer"
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
