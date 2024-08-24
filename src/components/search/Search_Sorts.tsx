'use client'

import Select_Primary from 'components/select/Select_Primary'
import { SEARCH_SORT, SEARCH_SORT_LABEL, SearchSortType } from 'constants/search.constant'
import { searchOptionContext } from 'providers/SearchOptionProvider'
import { useCallback, useContext, useMemo } from 'react'
import { SelectOption } from 'types/components/select/select.interface'

export default function Search_Sorts() {
  const { searchSort, setSearchSort } = useContext(searchOptionContext)

  const searchSortOptions = useMemo((): SelectOption[] => {
    return Object.keys(SEARCH_SORT).map((key) => ({
      value: SEARCH_SORT[key],
      label: SEARCH_SORT_LABEL[key],
    }))
  }, [])

  const changeHandler = useCallback((value: string) => {
    setSearchSort(value as SearchSortType)
  }, [])

  return <Select_Primary options={searchSortOptions} value={searchSort} onChange={changeHandler} />
}
