'use client'

import { equipmentContext } from 'providers/equipment/EquipmentProvider'
import equipmentDetailKeys from 'constants/json/equipment.detail.constant.json'
import { useContext, useMemo } from 'react'
import Island_Equipment_DetailInfo from 'components/island/equipmentPage/Island_Equipment_DetailInfo'
import useMyTranslate from 'hooks/useMyTranslate'

export default function Equipment_SpecList({ equipmentType }: { equipmentType: string }) {
  const { equipment } = useContext(equipmentContext)
  const { t } = useMyTranslate('equipment.detail')

  /**
   * 장비 종류에 따라 리스트 아이템이 달라지므로
   * 종류별로 정의된 keys 를 통해 정보를 가져옴
   */
  const equipmentKeys = useMemo((): string[] => {
    if (!equipment) return Array(equipmentDetailKeys[equipmentType]?.length).fill(undefined)
    else return equipmentDetailKeys[equipment?.type]
  }, [equipment, equipmentType])

  return (
    <>
      <div className="w-full flex-row-start gap-3 mb-[13.5px] overflow-auto hide-scrollbar">
        {equipmentKeys.map((key, index) => (
          <Island_Equipment_DetailInfo
            key={key + '-' + index}
            label={key && t(key)}
            value={equipment?.detail?.[key] || ' '}
          />
        ))}
      </div>
    </>
  )
}
