import { Equipment } from '@/src/@types/equipment.types'
import Portal from '@/src/components/portal/Portal'
import React from 'react'
import BackIcon from 'i/icon_back.svg'
import { useRouter } from 'next/navigation'

export default function EquipmentDetail_Nav({ equip }: { equip: Equipment }) {
  const { back } = useRouter()
  return (
    <Portal target="nav">
      <div className="w-full flex justify-between items-center relative">
        <BackIcon className="absolute left-0" onClick={back} />
        <h1 className="mx-auto">{equip?.name || ''}</h1>
      </div>
    </Portal>
  )
}
