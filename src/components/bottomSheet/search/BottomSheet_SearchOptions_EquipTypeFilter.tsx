'use client'

import { useCallback, useContext } from 'react'
import Bedge from '../../bedge/Bedge'
import { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import useSearchResources from '@/src/hooks/constant/useSearchResources'
import { Resource_EquipmentType } from '@/src/@types/constant.types'

export default function BottomSheet_SearchOptions_EquipTypeFilter() {
  const { searchFilters, setSearchFilters } = useContext(searchContext)

  const { equipTypeList } = useSearchResources()

  const isExist = useCallback(
    (item: Resource_EquipmentType) => {
      return searchFilters.includes(item.name) || searchFilters.includes(item.nameKo)
    },
    [searchFilters]
  )

  const clickHandler = useCallback((equipType: Resource_EquipmentType) => {
    setSearchFilters((temp) => {
      if (temp.includes(equipType.name)) return temp.filter((ele) => ele !== equipType.name)
      else return [...temp, equipType.name]
    })
  }, [])

  return (
    <>
      {Boolean(equipTypeList?.length) && (
        <section className="w-full flex flex-col gap-4">
          <h3 className="typograph-14 text-@-text-label">장비 종류</h3>
          <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
            {equipTypeList.map((equipType) => (
              <Bedge
                key={equipType.name}
                text={equipType.nameKo || equipType.name}
                className={clsx(
                  'cursor-pointer',
                  isExist(equipType) && 'bg-@-button-primary hover:bg-@-button-hover text-white'
                )}
                onClick={() => clickHandler(equipType)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
