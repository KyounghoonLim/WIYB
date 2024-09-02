'use client'

import Island from 'components/island/Island'
import List_Primary from 'components/list/List_Primary'
import ListItem_Review from 'components/list/listItems/ListItem_Review'
import Paginator from 'components/paginator/Paginator'
import { reviewContext } from 'providers/review/ReviewProvider'
import { useContext } from 'react'

export default function Review_List_Pagination() {
  const { contents, metadata, reviewOffset, setReviewOffset } = useContext(reviewContext)

  return (
    <Paginator page={reviewOffset} onChange={setReviewOffset} totalPage={metadata?.totalOffset}>
      <Island className="w-full h-auto p-0 overflow-hidden">
        <List_Primary items={contents} Component={ListItem_Review} />
      </Island>
    </Paginator>
  )
}
