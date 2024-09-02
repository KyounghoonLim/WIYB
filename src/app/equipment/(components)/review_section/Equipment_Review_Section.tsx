'use client'

import { useContext } from 'react'
import { reviewContext } from 'providers/review/ReviewProvider'
import Button_Equipment_Review from 'components/button/equipmentPage/Button_Equipment_Review'
import Review_Sorts from 'components/review/Review_Sort'
import Review_List_Scroll from 'components/review/Review_List_Scroll'
import Review_List_Pagination from 'components/review/Review_List_Pagination'

export default function Equipment_Review_Section() {
  const { contents } = useContext(reviewContext)

  return (
    <section className="w-[880px] h-auto flex-row-center">
      <article className="w-full h-full flex flex-col justify-evenly gap-4">
        <div className="w-full h-14 flex justify-between items-center">
          <div className="flex-row-start gap-6">
            <span className="typograph-16 flex-row-start no-auto-size">
              리뷰&nbsp;
              <h2 className="font-bold inline-block">{contents.length}</h2>개
            </span>
            <Button_Equipment_Review className="w-[225px] h-[38px] typograph-14 rounded-lg" />
          </div>
          <Review_Sorts />
        </div>
        {Boolean(contents?.length) ? (
          // <Review_List_Scroll />
          <Review_List_Pagination />
        ) : (
          <div className="w-full h-36 flex-col-center text-text-label-000 pb-10">
            <p>작성된 리뷰가 없습니다.</p>
            <p>첫 리뷰를 작성해보세요!</p>
          </div>
        )}
      </article>
    </section>
  )
}
