'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import { EQUIPMENT_TYPE, EquipmentType } from 'constants/equipment.constant'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import { popularContext } from 'providers/equipment/PopularProvider'
import { useContext } from 'react'

export default function Popular_Categories() {
  const { category } = useContext(popularContext)
  const { t } = useMyTranslate('equipment.type')

  return (
    <>
      {/* 전체 */}
      <MyLink
        href={PATH.EQUIPMENT_POPULAR}
        className={clsx('h-[41px] typograph-14 auto-size', !category && 'font-bold')}
        useLoadingOverlay={false}
        replace
      >
        전체
      </MyLink>
      {/* 하위 카테고리 */}
      {Object.keys(EQUIPMENT_TYPE).map((equipmentType: EquipmentType) => (
        <MyLink
          key={equipmentType}
          href={
            PATH.EQUIPMENT_POPULAR +
            PATH_PARAMS.EQUIPMENT_POPULAR.replace('[equipmentType]', equipmentType)
          }
          className={clsx(
            'h-[41px] typograph-14 auto-size',
            equipmentType === category && 'font-bold'
          )}
          useLoadingOverlay={false}
          replace
        >
          {t(equipmentType)}
        </MyLink>
      ))}
    </>
  )
}
