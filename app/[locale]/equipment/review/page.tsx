'use client'

import { PATH } from '@/src/constants/path.constant'
import { getEquipmentDetailApi, getEquipmentReviewsApi } from '@/src/services/equipmentApi'
import { useRouter } from 'next/navigation'
import React from 'react'
import useMySWR from '@/src/hooks/useMySWR'
import Review_InfoSection from './(components)/Review_InfoSection'
import Review_ReviewsSection from './(components)/Review_ReviewsSection'
import Review_Footer from './(components)/Review_Footer'
import Review_Nav from './(components)/Review_Nav'

export default function EquipmentReviewPage({
  searchParams: { id },
}: {
  searchParams: { id: string }
}) {
  const { replace } = useRouter()
  const { data: equip } = useMySWR(id, getEquipmentDetailApi, undefined, () => replace(PATH.LOGIN))
  const { data: reviews } = useMySWR(
    id + '-reviews',
    () => getEquipmentReviewsApi(id),
    undefined,
    () => replace(PATH.LOGIN)
  )

  return (
    <main className="CONTENT-CONTAINER px-0">
      <Review_Nav isForm={false} />
      <Review_InfoSection equip={equip} />
      <hr className="border-@-neutral-100" />
      <Review_ReviewsSection {...{ reviews }} />
      <Review_Footer id={id} />
    </main>
  )
}
