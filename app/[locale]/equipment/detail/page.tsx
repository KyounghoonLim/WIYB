'use client'

import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import EquipmentDetailNav from './(components)/EquipmentDetailNav'
import Island_EquipGraph from './(components)/islands/Island_EquipGraph'
import Island_EquipImage from './(components)/islands/Island_EquipImage'
import Island_EquipSpec from './(components)/islands/Island_EquipSpec'
import Island_EquipTitle from './(components)/islands/Island_EquipTitle'
import Island_EquipReviews from './(components)/islands/Island_EquipReviews'
import useMyQuery from '@/src/hooks/useMyQuery'

export default function EquipmentDetailPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: string }
}) {
  const { data: equip } = useMyQuery([id, type], getEquipmentDetailApi)

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
