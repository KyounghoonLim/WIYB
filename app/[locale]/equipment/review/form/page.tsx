'use client'

import { PATH } from '@/src/constants/path.constant'
import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import { useRouter } from 'next/navigation'
import React from 'react'
import useMySWR from '@/src/hooks/useMySWR'
import Review_Nav from '../(components)/Review_Nav'
import Review_InfoSection from '../(components)/Review_InfoSection'
import Review_Form from '../(components)/form/Review_Form'

export default function EquipmentReviewFormPage({
  searchParams: { id },
}: {
  searchParams: { id: string }
}) {
  const { replace } = useRouter()
  const { data: equip } = useMySWR(id, getEquipmentDetailApi, undefined, () => replace(PATH.LOGIN))

  return (
    <main className="CONTENT-CONTAINER px-0">
      <Review_Nav isForm={true} />
      <Review_InfoSection equip={equip} />
      <Review_Form id={id} />
    </main>
  )
}
