'use client'

import { PATH } from '@/src/constants/path.constant'
import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import { useRouter } from 'next/navigation'
import React from 'react'
import useMySWR from '@/src/hooks/useMySWR'
import Review_Nav from '../(components)/Review_Nav'
import Review_InfoSection from '../(components)/Review_InfoSection'
import Review_Form from '../(components)/form/Review_Form'
import { EquipmentType } from '@/src/constants/equipment.constant'

export default function EquipmentReviewFormPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: EquipmentType }
}) {
  const { replace } = useRouter()
  const { data: equip } = useMySWR([id, type], getEquipmentDetailApi, undefined, () => replace(PATH.LOGIN))

  return (
    <main className="CONTENT-CONTAINER px-0">
      <Review_Nav isForm={true} />
      <Review_InfoSection equip={equip} />
      <Review_Form id={id} type={type} />
    </main>
  )
}
