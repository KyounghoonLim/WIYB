import { EquipmentDetail } from '@/src/@types/equipment.types'
import { Review } from '@/src/@types/review.types'
import Button from '@/src/components/button/Button'
import Island from '@/src/components/island/Island'
import ListPrimary from '@/src/components/list/ListPrimary'
import ListItem_Review from '@/src/components/list/listItem/ListItem_Review'
import { PATH } from '@/src/constants/path.constant'
import Link from 'next/link'
import React from 'react'

export default function Island_EquipReviews({
  id,
  reviews,
  reviewCount,
}: {
  id: string
  reviews: Review[]
  reviewCount: number
}) {
  return (
    <>
      {reviews && (
        <Island>
          <ListPrimary items={reviews?.slice(0, 3)} Component={ListItem_Review} />
          {reviewCount > 3 && (
            <Link href={PATH.EQUIPMENT_REVIEW + `?id=${id}`}>
              <Button text="리뷰 더 보러 가기" className="mt-4" />
            </Link>
          )}
        </Island>
      )}
    </>
  )
}
