'use client'

import { useContext, useLayoutEffect, useMemo, useState } from 'react'
import { searchContext } from '@/src/providers/SearchProvider'
import useMySWR from '@/src/hooks/useMySWR'
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
import { SEARCH_CATEGORY, SearchCategoryType } from '@/src/constants/search.constant'

export default function Search_Items({ search }: { search?: string }) {
  const { searchKeyword, setSearchKeyword } = useContext(searchContext)

  const [category, setCategory] = useState<SearchCategoryType>(SEARCH_CATEGORY.EQUIP)
  const [isEdited, setIsEdited] = useState<boolean>(false)

  const { data: searchResult } = useMySWR(search, searchApi)

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

  useLayoutEffect(() => {
    setSearchKeyword(search)
  }, [search, setSearchKeyword])

  useLayoutEffect(() => {
    if (!searchKeyword && !isEdited) return
    else if (!isEdited && search === searchKeyword) return
    else {
      setIsEdited(true)
    }
  }, [search, searchKeyword, isEdited])

  return (
    <>
      {Boolean(searchResult) ? (
        <>
          <SearchHeader />
          <section className="w-full h-full flex flex-col px-4 pb-4 gap-6">
            <Category
              value={category}
              items={Object.values(SEARCH_CATEGORY)}
              onChange={(value) => setCategory(value as SearchCategoryType)}
            />
            <div className="h-full flex flex-col gap-3">
              {
                <span className="flex typograph-16">
                  <h3 className="font-bold">{searchKeyword}</h3>
                  {searchResult[category].length ? ' 검색결과' : ' 에 대한 검색 결과가 없습니다.'}
                </span>
              }
              <div className="h-full">{searchListSwitch}</div>
            </div>
          </section>
        </>
      ) : (
        <LoadingSpinner />
      )}
      {isEdited && <SearchContainer />}
    </>
  )
}
