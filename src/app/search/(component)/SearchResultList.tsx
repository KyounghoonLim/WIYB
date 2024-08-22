'use client'

import List_Primary from 'components/list/List_Primary'
import ListItem_SearchResult_Equipment from 'components/list/listItems/ListItem_SearchResult_Equipment'
import useIntersection from 'hooks/useIntersection'
import { searchResultContext } from 'providers/SearchResultProvider'
import { useContext } from 'react'
import SearchIcon from 'icons/icon_search.svg'

export default function SearchResultList() {
  const { searchResultContents, isEndOfPage, goToNextPage } = useContext(searchResultContext)
  const { intersectionRef } = useIntersection({
    onEnter: goToNextPage,
    condition: !isEndOfPage,
  })

  return (
    <article className="w-[724px] h-auto flex-col-start px-4 rounded-lg bg-white">
      {Boolean(searchResultContents.length) ? (
        <>
          <List_Primary items={searchResultContents} Component={ListItem_SearchResult_Equipment} />
          {!isEndOfPage && <div ref={intersectionRef} />}
        </>
      ) : (
        <div className="w-full h-[320px] typograph-16 text-neutral-light flex-col-center gap-3">
          <SearchIcon className="fill-neutral-light" />
          검색 결과가 없습니다.
        </div>
      )}
    </article>
  )
}
