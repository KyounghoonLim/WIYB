'use client'

import Island from 'components/island/Island'
import List_Primary from 'components/list/List_Primary'
import ListItem_Review from 'components/list/listItems/ListItem_Review'
import { reviewContext } from 'providers/ReviewProvider'
import { useContext } from 'react'

export default function Review_List() {
  const { reviews, isEndOfPage, goToNextPage } = useContext(reviewContext)
  console.log(isEndOfPage)
  return (
    <Island className="w-full h-auto p-0 overflow-hidden">
      <List_Primary items={reviews} Component={ListItem_Review} />
      {!isEndOfPage && (
        <button
          className="w-full h-[50px] typograph-14 border-t-[1px] border-neutral-100 border-solid hover:bg-neutral-100"
          onClick={goToNextPage}
        >
          더 가져오기
        </button>
      )}
    </Island>
  )
}
