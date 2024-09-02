'use client'

import List_Primary from 'components/list/List_Primary'
import ListItem_SearchResult_Equipment from 'components/list/listItems/ListItem_SearchResult_Equipment'
import useIntersection from 'hooks/useIntersection'
import { useContext } from 'react'
import SearchIcon from 'icons/icon_search_secondary.svg'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import Island from 'components/island/Island'
import Search_Sorts from 'components/search/Search_Sorts'
import { searchResultContext } from 'providers/search/SearchResult.wrapper'

export default function List_SearchResult_Scroll() {
  const { contents, metadata, isLoading, isEndOfPage, goToNextPage } =
    useContext(searchResultContext)
  const { intersectionRef } = useIntersection({
    onEnter: goToNextPage,
    condition: !isEndOfPage,
  })

  return (
    <article className="w-[724px] h-auto flex-col-start gap-4">
      {Boolean(contents?.length) ? (
        <>
          <div className="w-full h-9 flex justify-between items-center">
            <span className="typograph-16 text-black">
              검색 결과&nbsp;
              <h3 className="font-bold inline-block">{metadata.totalSize}</h3>개
            </span>
            <Search_Sorts />
          </div>
          <Island>
            <List_Primary items={contents} Component={ListItem_SearchResult_Equipment} />
          </Island>
          {!isEndOfPage && <div ref={intersectionRef} />}
        </>
      ) : isLoading ? (
        <div className="w-full h-[320px] flex-col-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="w-full h-[320px] typograph-16 text-neutral-light flex-col-center gap-3">
            <SearchIcon className="fill-neutral-light" />
            검색 결과가 없습니다.
          </div>
        </>
      )}
    </article>
  )
}
