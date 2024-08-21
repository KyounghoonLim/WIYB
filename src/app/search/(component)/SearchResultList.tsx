'use client'

import List_Primary from 'components/list/List_Primary'
import ListItem_SearchResult_Equipment from 'components/list/listItems/ListItem_SearchResult_Equipment'
import useIntersection from 'hooks/useIntersection'
import { searchResultContext } from 'providers/SearchResultProvider'
import { useContext } from 'react'
import NoResultIcon from 'icons/icon_no_result.svg'

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
        <div className="w-full h-[300px] typograph-14 text-text-label-000 flex-col-center gap-4">
          <NoResultIcon width={48} height={48} viewBox="0 0 24 24" className="fill-neutral-400" />
          검색 결과가 없습니다.
        </div>
      )}
    </article>
  )
}
