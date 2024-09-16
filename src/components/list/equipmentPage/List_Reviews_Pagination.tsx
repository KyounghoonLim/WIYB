'use client'

import Island from 'components/island/Island'
import List_Primary from 'components/list/List_Primary'
import ListItem_Review from 'components/list/listItems/ListItem_Review'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import Paginator from 'components/paginator/Paginator'
import { reviewContext } from 'providers/review/ReviewProvider'
import { useContext } from 'react'

export default function List_Reviews_Pagination() {
  const { contents, metadata, reviewOffset, setReviewOffset, isLoading } = useContext(reviewContext)

  return (
    <Paginator
      page={reviewOffset}
      onChange={setReviewOffset}
      totalPage={metadata?.totalOffset || 1}
    >
      {Boolean(contents?.length) ? (
        <Island className="w-full h-auto p-0 overflow-hidden">
          <List_Primary items={contents} Component={ListItem_Review} />
        </Island>
      ) : isLoading ? (
        <div className="w-full h-[500px] flex-col-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full h-[300px] flex-col-center text-text-label-000 pb-10">
          <p>작성된 리뷰가 없습니다.</p>
          <p>첫 리뷰를 작성해보세요!</p>
        </div>
      )}
    </Paginator>
  )
}
