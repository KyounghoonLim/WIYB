'use client'

import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import React, { useContext, useLayoutEffect } from 'react'
import Review_Nav from '../(components)/Review_Nav'
import Review_InfoSection from '../(components)/Review_InfoSection'
import Review_Form from '../(components)/form/Review_Form'
import { EquipmentType } from '@/src/constants/equipment.constant'
import useMyQuery from '@/src/hooks/useMyQuery'
import { themeContext } from '@/src/providers/ThemeProvider'
import { THEME } from '@/src/constants/theme.constant'

export default function EquipmentReviewFormPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: EquipmentType }
}) {
  const { setTheme } = useContext(themeContext)
  const { data: equip } = useMyQuery([id, type], getEquipmentDetailApi)

  useLayoutEffect(() => {
    setTheme(THEME.WHITE)
    return () => setTheme(THEME.DEFAULT)
  }, [])

  return (
    <main className="SCROLLABLE-CONTAINER bg-white px-0">
      <Review_Nav isForm={true} />
      <Review_InfoSection equip={equip} />
      <Review_Form id={id} type={type} />
    </main>
  )
}
