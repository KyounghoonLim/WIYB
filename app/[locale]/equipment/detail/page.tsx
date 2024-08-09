'use client'

import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import EquipmentDetailNav from './(components)/EquipmentDetailNav'
import Island_EquipGraph from './(components)/islands/Island_EquipGraph'
import Island_EquipImage from './(components)/islands/Island_EquipImage'
import Island_EquipSpec from './(components)/islands/Island_EquipSpec'
import Island_EquipTitle from './(components)/islands/Island_EquipTitle'
import useSWR from 'swr'
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PATH } from '@/src/constants/path.constant'
import Island_EquipReviews from './(components)/islands/Island_EquipReviews'

export default function EquipmentDetailPage({
  searchParams: { id },
}: {
  searchParams: { id: string }
}) {
  const { data: equip, error } = useSWR(id, getEquipmentDetailApi)
  const { replace } = useRouter()

  useLayoutEffect(() => {
    if (!error) return
    else replace(PATH.LOGIN)
  }, [error])

  return (
    <main className="SCROLLABLE-CONTAINER gap-4">
      <EquipmentDetailNav equip={equip} />
      <Island_EquipImage imageUrl={equip?.imageUrls[0]} />
      <Island_EquipTitle {...{ ...equip }} />
      <Island_EquipSpec {...{ equip }} />
      <Island_EquipGraph {...{ ...equip }} />
      <Island_EquipReviews {...{ ...equip }} />
    </main>
  )
}
