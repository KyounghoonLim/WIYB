'use client'

import clsx from 'clsx'
import { EQUIPMENT_TYPE, EquipmentType } from 'constants/equipment.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import { popularContext } from 'providers/equipment/PopluarProvider'
import { useContext } from 'react'

export default function Popluar_Categories() {
  const { type, setType } = useContext(popularContext)
  const { t } = useMyTranslate('equipment.type')
  return (
    <>
      {/* 전체 */}
      <button
        className={clsx('typograph-14 auto-size', !type && 'font-bold')}
        onClick={() => setType(null)}
      >
        전체
      </button>
      {/* 하위 카테고리 */}
      {Object.keys(EQUIPMENT_TYPE).map((equipType: EquipmentType) => (
        <button
          key={equipType}
          className={clsx('typograph-14 auto-size', equipType === type && 'font-bold')}
          onClick={() => setType(equipType)}
        >
          {t(equipType)}
        </button>
      ))}
    </>
  )
}
