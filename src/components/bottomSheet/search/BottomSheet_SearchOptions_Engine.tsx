'use client'

import { useContext, useMemo } from 'react'
import Bedge from '../../bedge/Bedge'
import { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import { SEARCH_ENGINE } from '@/src/constants/search.constant'

export default function BottomSheet_SearchOptions_Engine() {
  const { searchEngine, setSearchEngine } = useContext(searchContext)

  const engineOptions = useMemo(() => {
    return Object.values(SEARCH_ENGINE).map((value) => {
      switch (value) {
        case SEARCH_ENGINE.V1:
          return { label: 'V1', value }
        case SEARCH_ENGINE.V2:
          return { label: 'V2', value }
      }
    })
  }, [])

  return (
    <section className="w-full flex flex-col gap-4">
      <h3 className="typograph-14 text-@-text-label">검색 엔진</h3>
      <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
        {engineOptions.map((option) => (
          <Bedge
            key={option.value}
            text={option.label}
            className={clsx(
              'cursor-pointer',
              searchEngine === option.value &&
                'bg-@-button-primary hover:bg-@-button-hover text-white'
            )}
            onClick={() => setSearchEngine(option.value)}
          />
        ))}
      </div>
    </section>
  )
}
