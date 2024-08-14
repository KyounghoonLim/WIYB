import { Review } from '@/src/@types/review.types'
import Button from '@/src/components/button/Button'
import Island from '@/src/components/island/Island'
import MyLink from '@/src/components/link/MyLink'
import ListPrimary from '@/src/components/list/ListPrimary'
import ListItem_Review from '@/src/components/list/listItem/ListItem_Review'
import { EquipmentType } from '@/src/constants/equipment.constant'
import { PATH } from '@/src/constants/path.constant'
import React from 'react'

export default function Island_EquipReviews({
  id,
  type,
  reviews,
  reviewCount,
}: {
  id: string
  type: EquipmentType
  reviews: Review[]
  reviewCount: number
}) {
  return (
    <>
      {Boolean(reviews?.length) && (
        <Island>
          <span className="typograph-14 flex">
            리뷰 <p className="font-bold">{reviewCount}</p>개
          </span>
          <ListPrimary items={reviews?.slice(0, 3)} Component={ListItem_Review} />
          {reviewCount > 3 && (
            <MyLink href={PATH.EQUIPMENT_REVIEW.replace('[id]', id).replace('[type]', type)}>
              <Button text="리뷰 더 보러 가기" className="mt-4" />
            </MyLink>
          )}
        </Island>
      )}
    </>
  )
}
