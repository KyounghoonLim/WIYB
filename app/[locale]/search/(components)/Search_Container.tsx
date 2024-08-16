//@ts-nocheck
'use client'

import { useContext, useLayoutEffect, useMemo, useState } from 'react'
import { searchContext } from '@/src/providers/SearchProvider'
/// apis ///
import { searchApi } from '@/src/services/searchApi'
/// components ///
import Category from '@/src/components/category/Category'
import ListItem_Equipment from '@/src/components/list/listItem/ListItem_Equipment'
import ListItem_User from '@/src/components/list/listItem/ListItem_User'
import ListWindow from '@/src/components/list/ListWindow'
import LoadingSpinner from '@/src/components/loading/LoadingSpinner'
import SearchHeader from '@/src/components/search/SearchHeader'
import SearchContainer from '@/src/components/search/SearchContainer'
/// constants ///
import {
  SEARCH_CATEGORY,
  SearchCategoryType,
  SearchEngineType,
  SearchSortType,
} from '@/src/constants/search.constant'
import useMyQuery from '@/src/hooks/useMyQuery'

export default function Search_Container({
  keyword,
  sort,
  engine,
  filters,
}: {
  keyword?: string
  sort?: string
  engine?: string
  filters?: string
}) {
  const { searchKeyword, setSearchKeyword, setSearchSort, setSearchEngine, setSearchFilters } =
    useContext(searchContext)

  const [category, setCategory] = useState<SearchCategoryType>(SEARCH_CATEGORY.EQUIP)
  const [isEdited, setIsEdited] = useState<boolean>(false)

  const { data: searchResult, isPending } = useMyQuery([keyword, sort, engine, filters], searchApi)

  const searchListSwitch = useMemo(() => {
    if (!searchResult) return <></>
    else {
      switch (category) {
        case SEARCH_CATEGORY.EQUIP: {
          return <ListWindow items={searchResult.equipments} Component={ListItem_Equipment} />
        }
        case SEARCH_CATEGORY.USER: {
          return <ListWindow items={searchResult.users} Component={ListItem_User} />
        }
      }
    }
  }, [category, searchResult])

  /// search provider 초기화 ///
  useLayoutEffect(() => setSearchKeyword(keyword || ''), [keyword])
  useLayoutEffect(() => setSearchSort(sort as SearchSortType), [sort])
  useLayoutEffect(() => setSearchEngine(engine as SearchEngineType), [engine])
  useLayoutEffect(() => setSearchFilters(filters?.split(',') || []), [filters])

  useLayoutEffect(() => {
    if (!searchKeyword && !isEdited) return
    else if (!isEdited && keyword === searchKeyword) return
    else {
      setIsEdited(true)
    }
  }, [keyword, searchKeyword, isEdited])

  return (
    <>
      <SearchHeader />
      <section className="w-full h-full flex flex-col px-4 pb-4 gap-6">
        <Category
          value={category}
          items={Object.values(SEARCH_CATEGORY)}
          onChange={(value) => setCategory(value as SearchCategoryType)}
        />
        <>
          {isPending ? (
            <LoadingSpinner />
          ) : (
            <div className="h-full flex flex-col gap-3">
              {Boolean(searchResult?.[category]?.length) ? (
                <div className="h-full">{searchListSwitch}</div>
              ) : (
                <span className="typograph-16">
                  <h3 className="font-bold inline-block">{searchKeyword}</h3>
                  {Boolean(searchResult?.[category]?.length)
                    ? ' 검색결과'
                    : ' 에 대한 검색 결과가 없습니다.'}
                </span>
              )}
            </div>
          )}
        </>
      </section>
      {isEdited && <SearchContainer />}
    </>
  )
}
