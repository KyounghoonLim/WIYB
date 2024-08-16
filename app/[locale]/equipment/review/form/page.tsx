'use client'

import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import React from 'react'
import Review_Nav from '../(components)/Review_Nav'
import Review_InfoSection from '../(components)/Review_InfoSection'
import Review_Form from '../(components)/form/Review_Form'
import { EquipmentType } from '@/src/constants/equipment.constant'
import useMyQuery from '@/src/hooks/useMyQuery'

export default function EquipmentReviewFormPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: EquipmentType }
}) {
  const { data: equip } = useMyQuery([id, type], getEquipmentDetailApi)

  return (
    <main className="CONTENT-CONTAINER px-0">
      <Review_Nav isForm={true} />
      <Review_InfoSection equip={equip} />
      <Review_Form id={id} type={type} />
    </main>
  )
}
