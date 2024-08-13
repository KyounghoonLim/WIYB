'use client'

import { PATH } from '@/src/constants/path.constant'
import { getEquipmentDetailApi } from '@/src/services/equipmentApi'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import EquipmentReviewNav from './(components)/EquipmentReviewNav'
import EquipmentReviewSection_1 from './(components)/EquipmentReviewSection_1'
import EquipmentReviewSection_2 from './(components)/EquipmentReviewSection_2'
import EquipmentReviewFooter from './(components)/EquipmentReviewFooter'
import EquipmentReviewForm from './(components)/form/EquipmentReviewForm'
import useMySWR from '@/src/hooks/useMySWR'

export default function EquipmentReviewPage({
  searchParams: { id, form },
}: {
  searchParams: { id: string; form: string }
}) {
  const { replace } = useRouter()
  const { data: equip } = useMySWR(id, getEquipmentDetailApi, undefined, () => replace(PATH.LOGIN))

  const [flag, setFlag] = useState<boolean>(Boolean(form))

  return (
    <main className="SCROLLABLE-CONTAINER px-0">
      <EquipmentReviewNav isForm={flag} close={() => setFlag(false)} />
      <EquipmentReviewSection_1 equip={equip} />
      {flag ? (
        <>
          <EquipmentReviewForm
            id={id}
            // onSucceed={() => setFlag(false)}
            // onFailed={() => setFlag(false)}
          />
        </>
      ) : (
        <>
          <hr className="border-@-neutral-100" />
          <EquipmentReviewSection_2 {...{ ...equip }} />
          <EquipmentReviewFooter id={id} open={() => setFlag(true)} />
        </>
      )}
    </main>
  )
}
