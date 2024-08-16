import { EquipmentDetail } from '@/src/@types/equipment.types'
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
}: Pick<EquipmentDetail, 'id' | 'type' | 'reviews' | 'reviewCount'>) {
  return (
    <Island>
      <span className="typograph-14 flex">
        리뷰 <p className="font-bold">{reviewCount}</p>개
      </span>
      {reviewCount ? (
        <ListPrimary items={reviews?.slice(0, 3)} Component={ListItem_Review} />
      ) : (
        <div className="w-full h-32 flex-col-center flex-wrap typograph-20">
          리뷰가 없습니다.
          <span>
            <h3 className="font-bold inline">첫 리뷰</h3>를 남겨보세요!
          </span>
        </div>
      )}
      <MyLink href={PATH.EQUIPMENT_REVIEW.replace('[id]', id).replace('[type]', type)}>
        <Button text={reviewCount ? '리뷰 더 보러 가기' : '리뷰 보러 가기'} className="mt-4" />
      </MyLink>
    </Island>
  )
}
