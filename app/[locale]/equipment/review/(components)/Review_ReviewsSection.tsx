import { Review } from '@/src/@types/review.types'
import Bedge from '@/src/components/bedge/Bedge'
import ListItem_Review from '@/src/components/list/listItem/ListItem_Review'
import ListWindow from '@/src/components/list/ListWindow'
import React from 'react'

export default function Review_ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="h-full flex flex-col p-4 pb-0">
      {reviews?.length > 0 ? (
        <>
          <div className="flex justify-between items-center h-11">
            <span className="flex typograph-16">
              리뷰 <p className="font-bold">{reviews?.length}</p>개
            </span>
            <Bedge text={'최신순'} />
          </div>
          <div className="w-full h-full">
            <ListWindow items={reviews} Component={ListItem_Review} />
          </div>
        </>
      ) : (
        <span className="w-full h-[200px] flex-row-center typograph-14 text-@-text-label">
          등록된 리뷰가 없습니다!
          <br />첫 리뷰를 등록해보세요 🤩
        </span>
      )}
    </section>
  )
}
