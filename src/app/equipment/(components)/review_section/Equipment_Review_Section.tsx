'use client'

import { useContext } from 'react'
import { reviewContext } from 'providers/ReviewProvider'
import Button_Equipment_Review from 'components/button/equipmentPage/Button_Equipment_Review'
import Review_Sorts from 'components/review/Review_Sort'
import Review_List from 'components/review/Review_List'

export default function Equipment_Review_Section() {
  const { reviews } = useContext(reviewContext)
  return (
    <>
      {reviews?.length ? (
        <section className="w-[880px] h-auto flex-row-center">
          <article className="w-full h-full flex flex-col justify-evenly gap-4">
            <div className="w-full h-14 flex justify-between items-center">
              <div className="flex-row-start gap-6">
                <span className="typograph-16 flex-row-start no-auto-size">
                  리뷰&nbsp;
                  <h2 className="font-bold inline-block">{reviews.length}</h2>개
                </span>
                <Button_Equipment_Review className="w-[225px] h-[38px] typograph-14 rounded-lg" />
              </div>
              <Review_Sorts />
            </div>
            <Review_List />
          </article>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}
