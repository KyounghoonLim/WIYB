'use client'

import { searchContext } from '@/src/providers/SearchProvider'
import { useCallback, useContext } from 'react'
import Bedge from '../bedge/Bedge'
import CloseIcon from 'i/icon_close.svg'

export default function SearchFilters() {
  const { searchFilters, setSearchFilters } = useContext(searchContext)

  const removeSearchFilter = useCallback((filter: string) => {
    setSearchFilters((temp) => temp.filter((_filter) => _filter !== filter))
  }, [])

  return (
    <div className="w-full flex-row-start gap-1 overflow-auto hide-scrollbar">
      {searchFilters.map((filter) => (
        <Bedge
          key={filter}
          text={filter}
          className="rounded-3xl bg-@-button-primary text-white pr-2"
        >
          <CloseIcon
            width={18}
            height={18}
            viewBox="0 0 24 24"
            className="cursor-pointer fill-white"
            onClick={() => removeSearchFilter(filter)}
          />
        </Bedge>
      ))}
    </div>
  )
}
