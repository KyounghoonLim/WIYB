'use client'

import useMyQuery_Suspense from '@/src/hooks/useMyQuery_Suspense'
import EquipmentDetail_Nav from './EquipmentDetail_Nav'
import Island_EquipGraph from './islands/Island_EquipGraph'
import Island_EquipImage from './islands/Island_EquipImage'
import Island_EquipReviews from './islands/Island_EquipReviews'
import Island_EquipSpec from './islands/Island_EquipSpec'
import Island_EquipTitle from './islands/Island_EquipTitle'
import { getEquipmentDetailApi } from '@/src/services/equipmentApi'

export default function EquipmentDetail_Container({ id, type }: { id: string; type: string }) {
  const { data: equip } = useMyQuery_Suspense([id, type], getEquipmentDetailApi)

  return (
    <>
      <EquipmentDetail_Nav equip={equip} />
      <Island_EquipImage imageUrl={equip?.imageUrls[0]} />
      <Island_EquipTitle {...{ ...equip }} />
      <Island_EquipSpec {...{ equip }} />
      <Island_EquipGraph {...{ ...equip }} />
      <Island_EquipReviews {...{ ...equip }} />
    </>
  )
}
