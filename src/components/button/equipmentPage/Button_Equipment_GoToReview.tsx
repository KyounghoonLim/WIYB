'use client'

import MyLink from 'components/link/MyLink'
import Button_Primary from '../Button_Primary'
import ReviewIcon from 'icons/icon_review.svg'

export default function Button_Equipment_GoToReview() {
  return (
    <MyLink href="#" className="w-full">
      <Button_Primary
        icon={() => ReviewIcon({ className: 'fill-white' })}
        text="평가 점수/리뷰 작성하기"
      />
    </MyLink>
  )
}
