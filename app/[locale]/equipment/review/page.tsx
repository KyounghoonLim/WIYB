'use client'

import { getEquipmentDetailApi, getEquipmentReviewsApi } from '@/src/services/equipmentApi'
import React, { useContext, useLayoutEffect } from 'react'
import Review_InfoSection from './(components)/Review_InfoSection'
import Review_ReviewsSection from './(components)/Review_ReviewsSection'
import Review_Footer from './(components)/Review_Footer'
import Review_Nav from './(components)/Review_Nav'
import { EquipmentType } from '@/src/constants/equipment.constant'
import useMyQuery from '@/src/hooks/useMyQuery'
import { themeContext } from '@/src/providers/ThemeProvider'
import { THEME } from '@/src/constants/theme.constant'

export default function EquipmentReviewPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: EquipmentType }
}) {
  const { setTheme } = useContext(themeContext)
  const { data: equip } = useMyQuery([id, type], getEquipmentDetailApi)
  const { data: reviews } = useMyQuery([id], getEquipmentReviewsApi)

  useLayoutEffect(() => {
    setTheme(THEME.WHITE)
    return () => setTheme(THEME.DEFAULT)
  }, [])

  return (
    <main className="CONTENT-CONTAINER bg-white px-0">
      <Review_Nav isForm={false} />
      <Review_InfoSection equip={equip} />
      <hr className="border-@-neutral-100" />
      <Review_ReviewsSection {...{ reviews }} />
      <Review_Footer id={id} type={type} />
    </main>
  )
}
