'use client'

import { SEARCH_SORT, SearchSortType } from 'constants/search.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import dynamic from 'next/dynamic'
import { searchOptionContext } from 'providers/search/SearchOption.wrapper'
import { useCallback, useContext, useMemo } from 'react'
import { SelectOption } from 'types/components/select/select.interface'

const Select_Primary = dynamic(() => import('components/select/Select_Primary'), { ssr: false })

export default function Search_Sorts() {
  const { searchSort, setSearchSort } = useContext(searchOptionContext)
  const { t } = useMyTranslate('search.sort')

  const searchSortOptions = useMemo((): SelectOption[] => {
    return Object.keys(SEARCH_SORT).map((key) => ({
      value: SEARCH_SORT[key],
      label: t(key),
    }))
  }, [])

  const changeHandler = useCallback((value: string) => {
    setSearchSort(value as SearchSortType)
  }, [])

  return <Select_Primary options={searchSortOptions} value={searchSort} onChange={changeHandler} />
}
