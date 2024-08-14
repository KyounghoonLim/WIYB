'use client'

import { useContext, useMemo } from 'react'
import Bedge from '../../bedge/Bedge'
import { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import { SEARCH_SORT } from '@/src/constants/search.constant'

export default function BottomSheet_SearchOptions_Sort() {
  const { searchSort, setSearchSort } = useContext(searchContext)

  const sortOptions = useMemo(() => {
    return Object.values(SEARCH_SORT).map((value) => {
      switch (value) {
        case SEARCH_SORT.ASC:
          return { label: '오래된 순', value }
        case SEARCH_SORT.DESC:
          return { label: '최신순', value }
        case SEARCH_SORT.DESC_REVIEW:
          return { label: '리뷰 많은 순', value }
      }
    })
  }, [])

  return (
    <section className="w-full flex flex-col gap-4">
      <h3 className="typograph-14 text-@-text-label">정렬</h3>
      <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
        {sortOptions.map((option) => (
          <Bedge
            key={option.value}
            text={option.label}
            className={clsx(
              'cursor-pointer',
              searchSort === option.value &&
                'bg-@-button-primary hover:bg-@-button-hover text-white'
            )}
            onClick={() => setSearchSort(option.value)}
          />
        ))}
      </div>
    </section>
  )
}
